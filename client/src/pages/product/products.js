import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import "../../assets/css/product.css";

const port = process.env.REACT_APP_URL;


function Products() {
    const { id } = useParams();
    const [fetchProducts, setFetchProducts] = useState([]);
    const [category, setCategory] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true); // Loading state
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Fetch products by category ID
    useEffect(() => {
        if (id) {
            getProductsById(id);
            getcategory(id);
        } else {
            getAllProducts();
        }
    }, [id]);

    const getProductsById = async () => {
        try {
            const res = await axios.get(`http://localhost:4800/getproductsbycategoryid/${id}`);
            setFetchProducts(res.data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error(error);
            setLoading(false); // Set loading to false in case of error
        }
    };

    const getAllProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:4800/getproducts`);
            setFetchProducts(res.data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error(error);
            setLoading(false); // Set loading to false in case of error
        }
    };

    const getcategory = async () => {
        try {
            const res = await axios.get(`http://localhost:4800/getcategorybyid/${id}`);
            setCategory(res.data[0]);
            localStorage.setItem("name", res.data[0].name);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    // Filter products based on search term
    useEffect(() => {
        const results = fetchProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, fetchProducts]);



    // Truncate product name if it exceeds the max length
    const truncateString = (str, maxLength) => {
        return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    };

    return (
        <div>
            <div className='container'>
                <div className='product-search-section'>
                    <input
                        type='text'
                        placeholder='Search products...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='product-section'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => {
                            const discountAmount = (item.price * item.discount) / 100;
                            const discountedPrice = item.price - discountAmount;

                            return (
                                <NavLink to={`/item/${item.product_id}`} key={item.product_id}>
                                    <div className='products-card'>
                                        <div className='products-img'>
                                            {JSON.parse(item.img || "[]")[0] && (
                                                <img src={`/uploads/${JSON.parse(item.img || "[]")[0]}`} alt="product" width="100px" />
                                            )}
                                        </div>
                                        <div className='products-name'>
                                            <p>{truncateString(item.title, 26)}</p>
                                        </div>
                                        <div className='products-price'>
                                            <p className='products-original-price'>₹{item.price}</p>
                                            <p className='products-discount-price'>₹{discountedPrice.toFixed(2)}</p>
                                        </div>
                                        <div className='products-disc'>
                                            <p>{item.discount}% off</p>
                                        </div>
                                    </div>
                                </NavLink>
                            );
                        })
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;