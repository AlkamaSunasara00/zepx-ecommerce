import React, { useEffect, useState, useContext } from 'react';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import "../../assets/css/item.css";
import { CartContext } from '../../context/CartContext';

const port = process.env.REACT_APP_URL;


function Item() {
    const { id } = useParams();
    const location = useLocation();
    const { addToCart } = useContext(CartContext);
    const [data, setData] = useState({});
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState({});
    const [counter, setCounter] = useState(1);

    // Get categoryName passed in location state if available
    const categoryNameFromState = location.state?.categoryName;

    useEffect(() => {
        const fetchproductsbyid = async (id) => {
            try {
                const res = await axios.get(`${port}/getproductbyid/${id}`);
                setData(res.data[0]);
                setImages(JSON.parse(res.data[0].img || "[]"));

                // Fetch category directly using the product's category_id
                if (res.data[0] && res.data[0].category_id) {
                    const categoryRes = await axios.get(`${port}/getcategorybyid/${res.data[0].category_id}`);
                    if (categoryRes.data[0]) {
                        setCategory(categoryRes.data[0]);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchproductsbyid(id);
    }, [id]);

    // Use categoryNameFromState as a fallback if available
    useEffect(() => {
        if (categoryNameFromState && !category.name) {
            const getCategoryByName = async () => {
                try {
                    const res = await axios.get(`${port}/getcategorybyname/${categoryNameFromState}`);
                    if (res.data[0]) {
                        setCategory(res.data[0]);
                    }
                } catch (error) {
                    console.error("Error fetching category by name:", error);
                }
            };
            getCategoryByName();
        }
    }, [categoryNameFromState, category.name]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const changeImage = (index) => {
        setCurrentIndex(index);
    };

    const addValue = () => {
        setCounter(Math.min(counter + 1, 10));
    };

    const removeValue = () => {
        setCounter(Math.max(counter - 1, 1));
    };

    const taxAmount = (data.price * data.tax) / 100;
    const discountAmount = (data.price * data.discount) / 100;
    const discountedPrice = data.price - discountAmount;
    const total = data.price + data.shipping + taxAmount - discountAmount;

    return (
        <div>
            <Navbar />
            <div className='item-container'>
                <div className='item'>
                    <div className='item-section'>
                        <div className='item-img-section'>
                            <div className='item-main-img-section'>
                                <div className='item-main-img'>
                                    {images && (
                                        <img src={`/uploads/${images[currentIndex]}`} alt="Product Image" />
                                    )}
                                </div>
                            </div>
                            <div className='item-slider-img'>
                                <div className='item-slider-img-section'>
                                    {images.map((img, index) => (
                                        <div key={index} className={`item-slider-img-box ${index === currentIndex ? "active" : ""}`}>
                                            <div className="item-slider-imgs">
                                                <img
                                                    src={`/uploads/${img}`}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    onClick={() => changeImage(index)}
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='item-slider-keys'>
                                    <button className='slider-prev' onClick={prevImage}><i className="fa-solid fa-chevron-left"></i></button>
                                    <button className='slider-next' onClick={nextImage}><i className="fa-solid fa-chevron-right"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className='item-about-section'>
                            <div className='item-name'>
                                <p>{data.title}</p>
                            </div>
                            <div className='item-Category'>
                                <div className='item-about'>
                                    <p>Category: <span>{category && category.name}</span></p>
                                </div>
                                <div className='item-about'>
                                    <p>
                                        Availability: <span className={Number(data.status) === 1 ? "in-stock" : "out-of-stock"}>
                                            {Number(data.status) === 1 ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className='item-price-section'>
                                <div className=' item-price'>
                                    <p className='item-price-discount-price'>₹{discountedPrice.toFixed(2)}</p>
                                    <p className='item-price-original-price'>₹{data.price}</p>
                                </div>
                                <div className=' item-disc'>
                                    <p className='item-discount'>{data.discount}% OFF</p>
                                </div>
                            </div>
                            <div className='item-information'>
                                <div className='item-info'>
                                    <div className='item-info-heading'>
                                        <p>Memory</p>
                                    </div>
                                    <div>
                                        <input type='text' placeholder={data.memory} readOnly />
                                    </div>
                                </div>
                                <div className='item-info'>
                                    <div className='item-info-heading'>
                                        <p>Size</p>
                                    </div>
                                    <div>
                                        <input type='text' placeholder={data.size} readOnly />
                                    </div>
                                </div>
                                <div className='item-info'>
                                    <div className='item-info-heading'>
                                        <p>Storage</p>
                                    </div>
                                    <div>
                                        <input type='text' placeholder={data.storage} readOnly />
                                    </div>
                                </div>
                            </div>

                            {Number(data.status) === 0 && (
                                <div className="out-of-stock-buttons"> 
                                    <div className='item-button'>
                                        <div className='item-quantity-button'>
                                            <button id="decrease" disabled>-</button>
                                            <span id="count">{counter}</span>
                                            <button id="increase" disabled>+</button>
                                        </div>
                                        <div className='item-cart-button'>
                                            <button disabled>Add To Cart</button>
                                        </div>
                                    </div>
                                    <div className='item-buy-button'>
                                        <button disabled>Buy Now</button>
                                    </div>
                                </div>
                            )}

                            {/* Status === 1 होने पर enable बटन दिखाएं */}
                            {Number(data.status) === 1 && (
                                <div>
                                    <div className='item-button'>
                                        <div className='item-quantity-button'>
                                            <button id="decrease" onClick={removeValue}>-</button>
                                            <span id="count">{counter}</span>
                                            <button id="increase" onClick={addValue}>+</button>
                                        </div>
                                        <div className='item-cart-button'>
                                            <button onClick={() => addToCart(data, counter)}>Add To Cart</button>
                                        </div>
                                    </div>

                                    <div className='item-buy-button'>
                                        <NavLink to={"/checkout"}><button>Buy Now</button></NavLink>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='item-description'>
                        <div className='item-description-heading'>
                            <p>DESCRIPTION</p>
                        </div>
                        <div className='item-description-body'>
                            <div className='item-description-content'>
                                <div className='item-description-content-heading description-heading'>
                                    <p>Description</p>
                                </div>
                                <div className='item-description-content-about'>
                                    <p>{data.description}</p>
                                </div>
                            </div>
                            <div className='item-description-features'>
                                <div className='item-description-features-heading description-heading'>
                                    <p>Feature</p>
                                </div>
                                <div className='item-description-features-about'>
                                    <ul>
                                        <li><i className="fa-solid fa-award"></i> Free 1 Year Warranty</li>
                                        <li><i className="fa-solid fa-truck"></i> Free Shipping & Fasted Delivery</li>
                                        <li><i className="fa-solid fa-handshake"></i> 100% Money-back guarantee</li>
                                        <li><i className="fa-solid fa-headphones"></i> 24/7 Customer support</li>
                                        <li><i className="fa-solid fa-credit-card"></i> Secure payment method</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='item-description-shipping'>
                                <div className='item-description-shipping-heading description-heading'>
                                    <p>Shipping Information</p>
                                </div>
                                <div className='item-description-shipping-about'>
                                    <ul>
                                        <li>Courier:<span> 2 - 4 days, free shipping</span></li>
                                        <li>Local Shipping:<span> up to one week, $19.00</span></li>
                                        <li>UPS Ground Shipping:<span> 4 - 6 days, $29.00</span></li>
                                        <li>Unishop Global Export:<span> 3 - 4 days, $39.00</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Item;