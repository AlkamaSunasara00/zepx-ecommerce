import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/mobileSection.css";
import "../../assets/css/mobileBanner.css";
import { NavLink } from "react-router-dom";

const port = process.env.REACT_APP_URL;

function MobileSlider() {
    const sliderRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState(""); // Store category name in component state
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const cardsPerSlide = 4;

    const getProducts = async () => {   
        try {
            const res = await axios.get(`${port}/getproducts`);
            const mobileCategoryId = 1; // Mobile category ID
            
            // Get category information
            if (res.data.some(p => p.category_id === mobileCategoryId)) {
                const categoryRes = await axios.get(`${port}/getcategorybyid/${mobileCategoryId}`);
                if (categoryRes.data.length > 0) {
                    // Store in component state instead of localStorage
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

    const scrollToSlide = (slideIndex) => {
        if (sliderRef.current) {
            const card = sliderRef.current.querySelector('.product-slider-card');
            if (card) {
                const cardWidth = card.offsetWidth + 20; // Include margin
                sliderRef.current.scrollTo({
                    left: slideIndex * cardWidth,
                    behavior: "smooth"
                });
            }
        }
    };

    const truncateString = (str, maxLength) => {
        return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    };

    return (
        <div>
            <div className='container'>
                <div className='product-slider'>
                    <div className='product-slider-section'>
                        <div className='product-slider-heading'>
                            <h3>Newest {categoryName || "zepX"} Collection</h3>
                        </div>
                        {currentSlide > 0 && (
                            <button className="prev-btn" onClick={scrollLeft}>
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                        )}
                        <div className='product-slider-content' ref={sliderRef}>
                            {products.map((item) => {
                                const parseimage = JSON.parse(item.img || "[]");
                                return (
                                    <div key={item.id} className='product-slider-card'>
                                        <NavLink to={`/item/${item.product_id}`} state={{ categoryName: categoryName }}>
                                            <div className='product-img'>
                                                {parseimage[0] && (
                                                    <img src={`./uploads/${parseimage[0]}`} alt="product" />
                                                )}
                                            </div>
                                            <div className='product-name'>
                                                <h3>{truncateString(item.title, 8)}</h3>
                                            </div>
                                            <div className='product-price'>
                                                <p>From ₹{item.price}</p>
                                            </div>
                                            <div className='product-button'>
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
            </div>
        </div>
    );
}

export default MobileSlider;