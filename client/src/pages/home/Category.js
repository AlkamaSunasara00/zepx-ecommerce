import React, { useEffect, useState, useRef } from 'react';
import "../../assets/css/category.css";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const port = process.env.REACT_APP_URL;

function Category() {
    const [fetchcategory, setfetchcategory] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const sectionRef = useRef(null);
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        getcategory();
    }, []);

    const getcategory = async () => {
        try {
            const res = await axios.get(`${port}/getcategory`);
            setfetchcategory(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), 200); // Delay to ensure smooth appearance
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            <div className='container'>
                <div ref={sectionRef} className={`category ${isVisible ? "visible" : ""}`}>
                    <div className='category-section'>
                        <div className='category-heading'>
                            <h3>Newest Collection Available</h3>
                        </div>
                        <div className='category-content category-content-one'>
                            {fetchcategory.map((item, index) => (
                                <NavLink key={index} to={`/product/products/${item.category_id}`}>
                                    <div className='category-item'>
                                        <div className='category-item-img'>
                                            <img src={`../uploads/${item.img}`} alt='category' />
                                        </div>
                                        <div className='category-item-name'>
                                            <p>{item.name}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            ))}
                        </div>

                        <div className='category-slider'>
                            <div className='product-slider-section'>
                                <button className="prev-btn" onClick={() => sliderRef.current.scrollBy({ left: -200, behavior: "smooth" })}>
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>

                                <div className='category-slider-content' ref={sliderRef}>
                                    {fetchcategory.map((item, index) => (
                                        <div key={index} className='category-slider-card'>
                                            <div className='category-img'>
                                                <img src={`../uploads/${item.img}`} alt='category' />
                                            </div>
                                            <div className='product-name'>
                                                <p>{item.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="next-btn" onClick={() => sliderRef.current.scrollBy({ left: 200, behavior: "smooth" })}>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
