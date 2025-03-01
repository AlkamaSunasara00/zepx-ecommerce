import React, { useState, useEffect,useRef } from 'react'
import { NavLink, Outlet } from "react-router-dom"
import "../../assets/css/product.css"
import Navbar from '../navbar/Navbar'

const port = process.env.REACT_APP_URL;


function Product() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dropdownRef = useRef(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const fetchProducts = async () => {
        try {
            const response = await fetch(`${port}/getproducts`);
            const data = await response.json();
            setProducts(data);
            setFilteredProducts(data); // Initially set all products as filtered
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${port}/getcategory`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);



    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdowns = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdowns();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='product'>
                    <div className='product-container'>
                        <aside>
                            <div className='sidebar-category-section'>
                                <div className='sidebar-category'>
                                    <div className='sidebar-category-heading'>
                                        <h6>CATEGORY</h6>
                                    </div>
                                    <ul>
                                        {categories.map((category) => (
                                            <NavLink to={`/product/products/${category.category_id}`} key={category.category_id}>
                                                <li>
                                                    <p>{category.name}</p>
                                                </li>
                                            </NavLink>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='sidebar-hamburg-section'>
                                    <div className='sidebar-hamburg' onClick={toggleDropdown}>
                                        <i className="fa-solid fa-bars"></i>
                                    </div>
                                    {isDropdownOpen && (
                                        <div className='sidebar-hamburg-dropdown' ref={dropdownRef}>
                                            <div className='sidebar-hamburg-heading'>
                                                <h6>CATEGORY</h6>
                                            </div>
                                            <div className='sidebar-hamburg-category'>
                                                <ul>
                                                    {categories.map((category) => (
                                                        <NavLink to={`/product/products/${category.category_id}`}>
                                                            <li key={category.category_id} value={category.category_id}>
                                                                <p>{category.name}</p>
                                                            </li>
                                                        </NavLink>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                        </aside>
                        <main>
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;