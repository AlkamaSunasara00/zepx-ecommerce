// import React, { useRef, useEffect, useState } from "react";
// import axios from "axios";
// import "../../assets/css/watchBanner.css"
// import "../../assets/css/mobileSection.css"
// import { NavLink } from "react-router-dom";

// const port = process.env.REACT_APP_URL;

// function WatchBanner() {
//     const sliderRef = useRef(null);
//     const [products, setProducts] = useState([]);
//     const [categoryName, setCategoryName] = useState(""); // Store category name in component state
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [totalSlides, setTotalSlides] = useState(0);
//     const cardsPerSlide = 4;

//     const getProducts = async () => {
//         try {
//             const res = await axios.get(`${port}/getproducts`);
//             const watchCategoryId = 2; // Smartwatch category ID

//             // Get category information
//             if (res.data.some(p => p.category_id === watchCategoryId)) {
//                 const categoryRes = await axios.get(`${port}/getcategorybyid/${watchCategoryId}`);
//                 if (categoryRes.data.length > 0) {
//                     // Store in component state instead of localStorage
//                     setCategoryName(categoryRes.data[0].name);
//                 }
//             }

//             const filteredProducts = res.data.filter(p => p.category_id === watchCategoryId);
//             setProducts(filteredProducts);
//             setTotalSlides(Math.ceil(filteredProducts.length - cardsPerSlide + 1));
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         getProducts();
//     }, []);

//     const scrollLeft = () => {
//         if (currentSlide > 0) {
//             const newSlide = currentSlide - 1;
//             setCurrentSlide(newSlide);
//             scrollToSlide(newSlide);
//         }
//     };

//     const scrollRight = () => {
//         if (currentSlide < totalSlides - 1) {
//             const newSlide = currentSlide + 1;
//             setCurrentSlide(newSlide);
//             scrollToSlide(newSlide);
//         }
//     };

//     const scrollToSlide = (slideIndex) => {
//         if (sliderRef.current) {
//             const card = sliderRef.current.querySelector('.product-slider-card');
//             if (card) {
//                 const cardWidth = card.offsetWidth + 20; // Include margin
//                 sliderRef.current.scrollTo({
//                     left: slideIndex * cardWidth,
//                     behavior: "smooth"
//                 });
//             }
//         }
//     };

    // const truncateString = (str, maxLength) => {
    //     return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    // };

//     return (
//         <div>
//             <div className='container'>
//                 <div className='watch-banner'>
//                     <div className='watch-banner-section one'>
//                         <div className='watch-banner-content'>
//                             <div className='watch-banner-img'>
//                                 <img src={require("../../assets/images/watchBack.png")} alt='' />
//                             </div>
//                             <div className='watch-banner-name'>
//                                 <h2>{categoryName || "Smart Watch"}</h2>
//                             </div>
//                             <div className='watch-banner-img'>
//                                 <img src={require("../../assets/images/watchFront.png")} alt='' />
//                             </div>
//                         </div>
//                     </div>
                    // <div className='watch-banner-section two'>
                    //     <div className='watch-banner-name'>
                    //         <h2>{categoryName || "Smart Watch"}</h2>
                    //     </div>
                    //     <div className='watch-banner-content'>
                    //         <div className='watch-banner-img'>
                    //             <img src={require("../../assets/images/watchBack.png")} alt='' />
                    //         </div>
                    //         <div className='watch-banner-img'>
                    //             <img src={require("../../assets/images/watchFront.png")} alt='' />
                    //         </div>
                    //     </div>
                    // </div>
//                 </div>

//                 <div className='product-slider'>
//                     <div className='product-slider-section'>
//                         {currentSlide > 0 && (
//                             <button className="prev-btn" onClick={scrollLeft}>
//                                 <i className="fa-solid fa-chevron-left"></i>
//                             </button>
//                         )}
//                         <div className='product-slider-content' ref={sliderRef}>
//                             {products.map((item) => {
//                                 const parseimage = JSON.parse(item.img || "[]");
//                                 return (
//                                     <div key={item.id} className='product-slider-card'>
//                                         <NavLink to={`/item/${item.product_id}`} state={{ categoryName: categoryName }}>
//                                             <div className='product-img'>
//                                                 {parseimage[0] && (
//                                                     <img src={`./uploads/${parseimage[0]}`} alt="product" />
//                                                 )}
//                                             </div>
//                                             <div className='product-name'>
//                                                 <h3>{truncateString(item.title, 8)}</h3>
//                                             </div>
//                                             <div className='product-price'>
//                                                 <p>From ₹{item.price}</p>
//                                             </div>
//                                             <div className='product-button'>
//                                                 <button>Buy</button>
//                                             </div>
//                                         </NavLink>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                         {currentSlide < totalSlides - 1 && (
//                             <button className="next-btn" onClick={scrollRight}>
//                                 <i className="fa-solid fa-chevron-right"></i>
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default WatchBanner











import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/watchBanner.css";
import "../../assets/css/mobileSection.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const port = process.env.REACT_APP_URL;

function WatchBanner() {
    const sliderRef = useRef(null);
    const bannerRef = useRef(null);
    const sliderSectionRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [isBannerVisible, setIsBannerVisible] = useState(false);
    const [isSliderVisible, setIsSliderVisible] = useState(false);
    const cardsPerSlide = 4;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${port}/getproducts`);
                const watchCategoryId = 2;

                if (res.data.some(p => p.category_id === watchCategoryId)) {
                    const categoryRes = await axios.get(`${port}/getcategorybyid/${watchCategoryId}`);
                    if (categoryRes.data.length > 0) {
                        setCategoryName(categoryRes.data[0].name);
                    }
                }

                const filteredProducts = res.data.filter(p => p.category_id === watchCategoryId);
                setProducts(filteredProducts);
                setTotalSlides(Math.max(1, Math.ceil(filteredProducts.length / cardsPerSlide)));
            } catch (error) {
                console.error(error);
            }
        };

        getProducts();
    }, []);

    // 🛠️ **Intersection Observer for Banner**
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsBannerVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.9 }
        );

        if (bannerRef.current) {
            observer.observe(bannerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // 🛠️ **Intersection Observer for Product Slider**
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsSliderVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sliderSectionRef.current) {
            observer.observe(sliderSectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // 🛠️ **Debounce Scroll Events**
    const scrollToSlide = (slideIndex) => {
        if (sliderRef.current) {
            const card = sliderRef.current.querySelector(".product-slider-card");
            if (card) {
                const cardWidth = card.offsetWidth + 20;
                sliderRef.current.scrollTo({
                    left: slideIndex * cardWidth,
                    behavior: "smooth",
                });
            }
        }
    };

    const handleSlideChange = (direction) => {
        setCurrentSlide((prev) => {
            let newSlide = direction === "left" ? prev - 1 : prev + 1;
            newSlide = Math.max(0, Math.min(newSlide, totalSlides - 1));
            scrollToSlide(newSlide);
            return newSlide;
        });
    };


    const truncateString = (str, maxLength) => {
        return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    };

    return (
        <div className="container">
            {/* 🏷️ **Watch Banner Section** */}
            <div className="watch-banner">
                <motion.div
                    ref={bannerRef}
                    className="watch-banner-section one"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isBannerVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <div className="watch-banner-content">
                        <div className="watch-banner-img">
                            <img src={require("../../assets/images/watchBack.png")} alt="" />
                        </div>
                        <div className="watch-banner-name">
                            <h2>{categoryName || "Smart Watch"}</h2>
                        </div>
                        <div className="watch-banner-img">
                            <img src={require("../../assets/images/watchFront.png")} alt="" />
                        </div>
                    </div>
                </motion.div>
                <div className='watch-banner-section two'>
                        <div className='watch-banner-name'>
                            <h2>{categoryName || "Smart Watch"}</h2>
                        </div>
                        <div className='watch-banner-content'>
                            <div className='watch-banner-img'>
                                <img src={require("../../assets/images/watchBack.png")} alt='' />
                            </div>
                            <div className='watch-banner-img'>
                                <img src={require("../../assets/images/watchFront.png")} alt='' />
                            </div>
                        </div>
                    </div>
            </div>

            {/* 🏷️ **Product Slider Section** */}
            <motion.div 
                ref={sliderSectionRef} 
                initial={{ opacity: 0, y: 50 }} 
                animate={isSliderVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className={`product-slider ${isSliderVisible ? "visible" : ""}`}>
                    <div className="product-slider-section">
                        {currentSlide > 0 && (
                            <button className="prev-btn" onClick={() => handleSlideChange("left")}>
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
                            <button className="next-btn" onClick={() => handleSlideChange("right")}>
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default WatchBanner;

