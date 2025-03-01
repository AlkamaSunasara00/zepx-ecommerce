import React, { useEffect, useState, useRef } from 'react'
import "../../assets/css/category.css"
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';


// const port = process.env.REACT_APP_URL;
const port = process.env.REACT_APP_URL;


function Category() {
    const [fetchcategory, setfetchcategory] = useState([]);

    const sliderRef = useRef(null);
    const navigate = useNavigate();

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    useEffect(() => {
        getcategory();
    }, []);

    const getcategory = async (e) => {
        try {
            const res = await axios.get(`${port}/getcategory`);
            setfetchcategory(res.data)

        } catch (error) {
            console.error(error);

        }

    }

    const truncateString = (str, maxLength) => {
        return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    };

    return (
        <div>
            <div className='contener'>
                <div className='category'>
                    <div className='category-section'>
                        <div className='category-heading'>
                            <h3>Newest Collection Available</h3>
                        </div>
                        <div className='category-content category-content-one'>
                            {fetchcategory.map((item) => (
                                <NavLink to={`/product/products/${item.category_id}`}>
                                    <div className='category-item'>
                                        <div className='category-item-img'>
                                            <img src={`../uploads/${item.img}`} alt='category1' />
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

                                <button className="prev-btn" onClick={scrollLeft}><i class="fa-solid fa-chevron-left"></i></button>

                                <div className='category-slider-content' ref={sliderRef}>
                                    {fetchcategory.map((item) => (
                                        <div className='category-slider-card'>
                                            <div className='category-img'>
                                                <img src={`../uploads/${item.img}`} alt='category1' />
                                            </div>
                                            <div className='product-name'>
                                                <p>{item.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="next-btn" onClick={scrollRight}><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category