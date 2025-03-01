import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../../assets/css/admin/product/addproduct.css'

function Addproduct() {

    const [categories, setCategories] = useState([]);
    const [fetchproducts, setfetchproducts] = useState([]);
    const [addproducts, setaddproducts] = useState({
        category_id: "",
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
        updated_by: ""


    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:4800/getcategory");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);


    const navigate = useNavigate();

    useEffect(() => {
        getproducts();
    }, [navigate]);


    const getproducts = async (e) => {
        try {
            const res = await axios.get("http://localhost:4800/getproducts");
            setfetchproducts(res.data)

        } catch (error) {
            console.error(error);

        }

    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formdata = new FormData();
            formdata.append("category_id", addproducts.category_id);
            formdata.append("title", addproducts.title);
            formdata.append("price", addproducts.price);
            formdata.append("discount", addproducts.discount);
            formdata.append("tax", addproducts.tax);
            formdata.append("memory", addproducts.memory);
            formdata.append("size", addproducts.size);
            formdata.append("storage", addproducts.storage);

            // Append multiple images
            for (let i = 0; i < addproducts.img.length; i++) {
                formdata.append("img", addproducts.img[i]);
            }

            formdata.append("description", addproducts.description);
            formdata.append("status", addproducts.status);
            formdata.append("created_by", addproducts.created_by);
            formdata.append("updated_by", addproducts.updated_by);
            await axios.post("http://localhost:4800/addproducts", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setaddproducts({
                category_id: "",
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
            getproducts();
            navigate(`/admin/products/Categories/${addproducts.category_id}`);
        } catch (error) {
            console.log(error);
        }
    };




    const handleChange = (e) => {
        const { name, value } = e.target
        setaddproducts((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        const files = e.target.files;
        setaddproducts((prev) => ({
            ...prev,
            img: files,
        }));
    };




    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    return (
        <div className='main-addproduct-container'>
            <form onSubmit={handleSubmit}>
                <div className='header-addproduct'>
                    <div className='header-addproduct-txt'>
                        <p>Add Product</p>
                    </div>
                    <div className='header-addproduct-btns'>
                        <div className='header-addproduct-cancel'>
                            <NavLink to={`/admin/products/Categories/${addproducts.category_id}`}><button><i class="fa-solid fa-xmark"></i><p>cancel</p></button></NavLink>
                        </div>
                        <div className='header-addproduct-add'>
                            <button type='submit'><p>Add Product</p></button>
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
                                    <input type='text' placeholder='Type product name here. . .' name='title' value={addproducts.title} onChange={handleChange} required />
                                </div>
                                <div className='addproduct-input-description'>
                                    <div>
                                        <label>Description</label>
                                    </div>
                                    <textarea
                                        id="message" rows="6" placeholder="Type product description here. . ." name='description' value={addproducts.description} onChange={handleChange} required>
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
                                        <button type='button'>Add Image</button>
                                    </label>
                                    <input type="file" name="img" ref={fileInputRef} id="upload" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} multiple required />
                                </div>
                            </div>
                            <div className='item1-addproduct-container'>
                                <div className='addproduct-input-price'>
                                    <p>Pricing</p>
                                    <div>
                                        <label>Base Price</label>
                                    </div>
                                    <input type='text' placeholder='₹ Type base price here. . .' name='price' value={addproducts.price} onChange={handleChange} required />
                                </div>
                                <div className='addproduct-subinput-price'>
                                    <div className='addproduct-input-discount'>
                                        <div>
                                            <label>Discount Percentage</label>
                                        </div>
                                        <input type='text' placeholder='Type discount precentage. . .' name='discount' value={addproducts.discount} onChange={handleChange} />
                                    </div>
                                    <div className='addproduct-input-tax'>
                                        <div>
                                            <label>Tax Class</label>
                                        </div>
                                        <input type='text' placeholder='Type Tax amount in % . .  .' name='tax' value={addproducts.tax} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sub2-addproduct-container'>
                            <div className='item2-addproduct-container'>
                                <p>Category</p>
                                <div className='addproduct-input-category'>
                                    <div>
                                        <label>Product Category</label>
                                    </div>
                                    <select type='text' placeholder='category_id' name='category_id' value={addproducts.category_id} onChange={handleChange} required>
                                        <option value="" disabled selected>Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.category_id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='item2-addproduct-container'>
                                <p>Status</p>
                                <div className='addproduct-input-status'>
                                    <div>
                                        <label>Product Status</label>
                                    </div>
                                    <select placeholder='Select a category' name='status' value={addproducts.status} onChange={handleChange} required >
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
                                    <input type='text' placeholder='memory. . .' name='memory' value={addproducts.memory} onChange={handleChange} required />
                                </div>
                                <div className='addproduct-input-about'>
                                    <div>
                                        <label>Size</label>
                                    </div>
                                    <input type='text' placeholder='Size. . .' name='size' value={addproducts.size} onChange={handleChange} required />
                                </div>
                                <div className='addproduct-input-about'>
                                    <div>
                                        <label>Storage</label>
                                    </div>
                                    <input type='text' placeholder='Storage. . .' name='storage' value={addproducts.storage} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className='item2-addproduct-container'>
                                <div className='addproduct-input-create'>
                                    <div>
                                        <label>Created_By</label>
                                    </div>
                                    <input type='text' name='created_by' value={addproducts.created_by} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Addproduct
