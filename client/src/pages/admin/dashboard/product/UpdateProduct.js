import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../../../../assets/css/admin/product/addproduct.css'

function UpdateProduct() {

    const [editproducts, seteditproducts] = useState({
        title: "",
        price: "",
        discount: "",
        tax: "",
        memory: "",
        size: "",
        storage: "",
        img: null,
        description: "",
        status: "",
        created_by: "",
        updated_by: "",
    });
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchproductsbyid(location.state.id);
    }, [location.state.id]);
    console.log(location.state.id)


    const fetchproductsbyid = async (id) => {
        try {
            const res = await axios.get(`http://localhost:4800/getproductbyid/${id}`)
            seteditproducts(res.data[0])
        }

        catch (error) {
            console.error(error);

        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        seteditproducts((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        const files = e.target.files;
        seteditproducts((prev) => ({
            ...prev,
            img: files,  // Directly assign multiple files
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formdata = new FormData();
            //   formdata.append("category_id", editproducts.category_id);
            formdata.append("title", editproducts.title);
            formdata.append("price", editproducts.price);
            formdata.append("discount", editproducts.discount);
            formdata.append("tax", editproducts.tax);
            formdata.append("memory", editproducts.memory);
            formdata.append("size", editproducts.size);
            formdata.append("storage", editproducts.storage);

            // Append multiple images
            for (let i = 0; i < editproducts.img.length; i++) {
                formdata.append("img", editproducts.img[i]);
            }

            formdata.append("description", editproducts.description);
            formdata.append("status", editproducts.status);
            formdata.append("created_by", editproducts.created_by);
            formdata.append("updated_by", editproducts.updated_by);

            await axios.patch(`http://localhost:4800/updateproduct/${location.state.id}`, formdata);

            seteditproducts({
                title: "",
                price: "",
                discount: "",
                tax: "",
                memory: "",
                size: "",
                storage: "",
                img: null,
                description: "",
                status: "",
                created_by: "",
                updated_by: "",
            });

            navigate(`/admin/products/Categories/${editproducts.category_id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    return (
        <div className='main-addproduct-container'>
            <form  onSubmit={handleSubmit}>
                <div className='header-addproduct'>
                    <div className='header-addproduct-txt'>
                        <p>Edit Product</p>
                    </div>
                    <div className='header-addproduct-btns'>
                        <div className='header-addproduct-cancel'>
                            <NavLink to={`/admin/products/Categories/${editproducts.category_id}`}><button><i class="fa-solid fa-xmark"></i><p>cancel</p></button></NavLink>
                        </div>
                        <div className='header-addproduct-add'>
                            <button type='submit'><p>Edit Product</p></button>
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
                                    <input type='text' placeholder='Type product name here. . .' name='title' value={editproducts.title} onChange={handleChange} required/>
                                </div>
                                <div className='addproduct-input-description'>
                                    <div>
                                        <label>Description</label>
                                    </div>
                                    <textarea
                                        id="message" rows="6" placeholder="Type product description here. . ." name='description' value={editproducts.description} onChange={handleChange} required>
                                    </textarea>
                                </div>
                            </div>
                            <div className='item1-addproduct-container'>
                                <p>Media</p>
                                <div className='item1-addproduct-para' ><p>Photo</p></div>
                                <div className='addproduct-input-photo' onClick={handleButtonClick}>
                                    <div className='addproduct-input-photo-icon'>
                                        <i class="fa-regular fa-image"></i>
                                    </div>
                                    <div className='addproduct-input-photo-txt'>
                                        <p>click here to add image</p>
                                    </div>
                                    <label id="upload">
                                        <button type='button' >Add Image</button>
                                    </label>
                                    <input type="file" name="img" ref={fileInputRef} id="upload" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} multiple />
                                </div>
                            </div>
                            <div className='item1-addproduct-container'>
                                <div className='addproduct-input-price'>
                                    <p>Pricing</p>
                                    <div>
                                        <label>Base Price</label>
                                    </div>
                                    <input type='text' placeholder='₹ Type base price here. . .' name='price' value={editproducts.price} onChange={handleChange}/>
                                </div>
                                <div className='addproduct-subinput-price'>
                                    <div className='addproduct-input-discount'>
                                        <div>
                                            <label>Discount Percentage</label>
                                        </div>
                                        <input type='text' placeholder='Type discount precentage. . .' name='discount' value={editproducts.discount} onChange={handleChange}/>
                                    </div>
                                    <div className='addproduct-input-tax'>
                                        <div>
                                            <label>Tax Class</label>
                                        </div>
                                        <input type='text' placeholder='Type Tax amount in % . .  .' name='tax' value={editproducts.tax} onChange={handleChange} />
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
                                    <select placeholder='Select a category' name="status" value={editproducts.status} onChange={handleChange}>
                                        <option value="" disabled selected>Select a status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className='item2-addproduct-container'>
                                <p>About Product</p>
                                <div className='addproduct-input-about'>
                                    <div>
                                        <label>Memory</label>
                                    </div>
                                    <input type='text' placeholder='memory. . .' name='memory' value={editproducts.memory} onChange={handleChange} />
                                </div>
                                <div className='addproduct-input-about'>
                                    <div>
                                        <label>Size</label>
                                    </div>
                                    <input type='text' placeholder='Size. . .' name='size' value={editproducts.size} onChange={handleChange} />
                                </div>
                                <div className='addproduct-input-about'>
                                    <div>
                                        <label>Storage</label>
                                    </div>
                                    <input type='text' placeholder='Storage. . .' name='storage' value={editproducts.storage} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='item2-addproduct-container'>
                                <div className='addproduct-input-create'>
                                    <div>
                                        <label>Created_By</label>
                                    </div>
                                    <input type='text'  name='created_by' value={editproducts.created_by} onChange={handleChange} readOnly/>
                                </div>
                                <div className='addproduct-input-create'>
                                    <div>
                                        <label>Updated_By</label>
                                    </div>
                                    <input type='text' name='updated_by' value={editproducts.updated_by} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateProduct