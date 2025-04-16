import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/mobileSection.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const port = process.env.REACT_APP_URL;

function MobileSlider() {
    const sliderRef = useRef(null);
    const sectionRef = useRef(null); // Ref for visibility animation
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [isVisible, setIsVisible] = useState(false); // State to track visibility
    const cardsPerSlide = 4;


    // const sectionVariants = {
    //     hidden: { opacity: 0, y: 50 },
    //     visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    // };
    
    const getProducts = async () => {   
        try {
            const res = await axios.get(`${port}/getproducts`);
            const mobileCategoryId = 1;
            
            if (res.data.some(p => p.category_id === mobileCategoryId)) {
                const categoryRes = await axios.get(`${port}/getcategorybyid/${mobileCategoryId}`);
                if (categoryRes.data.length > 0) {
                    setCategoryName(categoryRes.data[0].name);
                }
            }
            
            const filteredProducts = res.data.filter(p => p.category_id === mobileCategoryId);
            setProducts(filteredProducts);
            setTotalSlides(Math.ceil(filteredProducts.length - cardsPerSlide + 1));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // Intersection Observer for animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.4 } // Trigger when 30% is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const scrollLeft = () => {
        if (currentSlide > 0) {
            const newSlide = currentSlide - 1;
            setCurrentSlide(newSlide);
            scrollToSlide(newSlide);
        }
    };

    const scrollRight = () => {
        if (currentSlide < totalSlides - 1) {
            const newSlide = currentSlide + 1;
            setCurrentSlide(newSlide);
            scrollToSlide(newSlide);
        }
    };

    // const scrollToSlide = (slideIndex) => {
    //     if (sliderRef.current) {
    //         const card = sliderRef.current.querySelector('.product-slider-card');
    //         if (card) {
    //             const cardWidth = card.offsetWidth + 20; 
    //             sliderRef.current.scrollTo({
    //                 left: slideIndex * cardWidth,
    //                 behavior: "smooth"
    //             });
    //         }
    //     }
    // };

    const scrollToSlide = (slideIndex) => {
        if (sliderRef.current) {
            const card = sliderRef.current.querySelector('.product-slider-card');
            if (card) {
                const cardWidth = card.offsetWidth + 20; 
                sliderRef.current.scrollTo({
                    left: slideIndex * cardWidth,
                    behavior: "smooth"
                });
    
                // Add fade-in effect
                sliderRef.current.style.opacity = "0.5";
                setTimeout(() => {
                    sliderRef.current.style.opacity = "1";
                }, 300);
            }
        }
    };

    const truncateString = (str, maxLength) => {
        return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    };

    return (
        <div className="container">
              <motion.div
        ref={sectionRef}
        className="container"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
    >
            <div ref={sectionRef} className={`product-slider ${isVisible ? "visible" : ""}`}>
                <div className="product-slider-section">
                    <div className="product-slider-heading">
                        <h3>Newest {categoryName || "zepX"} Collection</h3>
                    </div>
                    {currentSlide > 0 && (
                        <button className="prev-btn" onClick={scrollLeft}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                    )}
                    <div className="product-slider-content" ref={sliderRef}>
                        {products.map((item) => {
                            const parseimage = JSON.parse(item.img || "[]");
                            return (
                                <div key={item.id} className="product-slider-card">
                                    <NavLink to={`/item/${item.product_id}`} state={{ categoryName }}>
                                        <div className="product-img">
                                            {parseimage[0] && (
                                                <img src={`./uploads/${parseimage[0]}`} alt="product" />
                                            )}
                                        </div>
                                        <div className="product-name">
                                            <h3>{truncateString(item.title, 13)}</h3>
                                        </div>
                                        <div className="product-price">
                                            <p>₹{item.price}</p>
                                        </div>
                                        <div className="product-button">
                                            <button>Buy</button>
                                        </div>
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                    {currentSlide < totalSlides - 1 && (
                        <button className="next-btn" onClick={scrollRight}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    )}
                </div>
            </div>
            </motion.div>
        </div>
    );
}

export default MobileSlider;
