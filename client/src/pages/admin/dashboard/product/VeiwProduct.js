import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, NavLink } from 'react-router-dom';
import '../../../../assets/css/admin/product/addproduct.css';

const port = process.env.REACT_APP_URL;


function VeiwProduct() {
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const productId = location.state.id;
        if (productId) {
            fetchProductById(productId);
        }
    }, [location.state.id]);

    const fetchProductById = async (id) => {
        try {
            const res = await axios.get(`${port}/getproductbyid/${id}`);
            setProduct(res.data[0]);
            setImages(JSON.parse(res.data[0].img || "[]"));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='main-addproduct-container'>
            <form>
                <div className='header-addproduct'>
                    <div className='header-addproduct-txt'>
                        <p>View Product</p>
                    </div>
                    <div className='header-addproduct-btns'>
                        <div className='header-addproduct-cancel'>
                            <NavLink to={`/admin/products/Categories/${product.category_id}`}>
                                <button>
                                    <i className="fa-solid fa-xmark"></i>
                                    <p>cancel</p>
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className='addproduct-container'>
                    <div className='sub-addproduct-container'>
                        <div className='sub1-addproduct-container'>
                            <div className='item1-addproduct-container'>
                                <p>General Information</p>
                                <div className='addproduct-input-name'>
                                    <div>
                                        <label>Product Name</label>
                                    </div>
                                    <input type='text' value={product.title || ''} readOnly />
                                </div>
                                <div className='addproduct-input-description'>
                                    <div>
                                        <label>Description</label>
                                    </div>
                                    <textarea id="message" rows="6" value={product.description || ''} readOnly></textarea>
                                </div>
                            </div>
                            <div className='item1-addproduct-container'>
                                <p>Media</p>
                                <div className='item1-addproduct-para'>
                                    <p>Photo</p>
                                </div>
                                {/* Display images here if you have them */}
                                {/* {product.img && JSON.parse(product.img).map((img, index) => (
                                    <img key={index} src={http://localhost:4800/uploads/${img}} alt={Product ${index}} style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }} />
                                ))} */}
                                <div className='Veiw-imgs'>
                                    {images.map((img, index) => (
                                        <div className="Veiw-img">
                                            <img
                                                src={`/uploads/${img}`}
                                                alt={`Thumbnail ${index + 1}`}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='item1-addproduct-container'>
                                <div className='addproduct-input-price'>
                                    <p>Pricing</p>
                                    <div>
                                        <label>Base Price</label>
                                    </div>
                                    <input type='text' value={product.price || ''} readOnly />
                                </div>
                                <div className='addproduct-subinput-price'>
                                    <div className='addproduct-input-discount'>
                                        <div>
                                            <label>Discount Percentage</label>
                                        </div>
                                        <input type='text' value={product.discount || ''} readOnly />
                                    </div>
                                    <div className='addproduct-input-tax'>
                                        <div>
                                            <label>Tax Class</label>
                                        </div>
                                        <input type='text' value={product.tax || ''} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sub2-addproduct-container'>
                            <div className='item2-addproduct-container'>
                                <p>Status</p>
                                <div className='addproduct-input-status'>
                                    <div>
                                        <label>Product Status</label>
                                    </div>
                                    <input type='text' value={product.status === "1" ? "Active" : "Inactive"} readOnly />
                                </div>
                            </div>
                            <div className='item2-addproduct-container'>
                                <p>About Product</p>
                                <div className='addproduct-input-about'>
                                    <div>
                                        <label>Memory</label>
                                    </div>
                                    <input type='text' value={product.memory || ''} readOnly />
                                </div>
                                <div className='addproduct-input-about'>
                                    <div>
                                        <label>Size</label>
                                    </div>
                                    <input type='text' value={product.size || ''} readOnly />
                                </div>
                                <div className='addproduct-input-about'>
                                    <div>
                                        <label>Storage</label>
                                    </div>
                                    <input type='text' value={product.storage || ''} readOnly />
                                </div>
                            </div>
                            <div className='item2-addproduct-container'>
                                <div className='addproduct-input-create'>
                                    <div>
                                        <label>Created_By</label>
                                    </div>
                                    <input type='text' value={product.created_by || ''} readOnly />
                                </div>
                                <div className='addproduct-input-create'>
                                    <div>
                                        <label>Updated_By</label>
                                    </div>
                                    <input type='text' value={product.updated_by || ''} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default VeiwProduct;