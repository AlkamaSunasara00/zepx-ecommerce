import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../../assets/css/admin/login/addadmin.css';
// import { NavLink, useNavigate } from 'react-router-dom';

const port = process.env.REACT_APP_URL;

const AddAdmin = () => {
    const [fetchadmin, setfetchadmin] = useState([]);
    const [newadmin, setNewadmin] = useState({
        img: null,
        username: "",
        email: "",
        contact: "",
        address: "",
        role: "",
        status: "",
        password: ""

    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchadmins();
    }, [navigate]);


    const fetchadmins = async (e) => {
        try {
            const res = await axios.get(`${port}/admins`);
            setfetchadmin(res.data)

        } catch (error) {
            console.error(error);

        }

    }


    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData();
            formdata.append("img", newadmin.img);
            formdata.append("username", newadmin.username);
            formdata.append("email", newadmin.email);
            formdata.append("contact", newadmin.contact);
            formdata.append("address", newadmin.address);
            formdata.append("role", newadmin.role);
            formdata.append("status", newadmin.status);
            formdata.append("password", newadmin.password);

            await axios.post(`${port}/addadmins`, formdata, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            // console.log(newadmin);

            fetchadmins();
            setNewadmin({
                img: null,
                username: "",
                email: "",
                contact: "",
                address: "",
                role: "",
                status: "",
                password: ""

            });
            navigate("/admin/admin-manage")
        } catch (error) {
            console.error(error);

        }


    }

    const handlechange = (e) => {
        const { name, value } = e.target;

        setNewadmin((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setNewadmin((prev) => ({
            ...prev,
            [name]: files[0]
        }))
    };

    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='main-addadmin-container'>
            <div className='header-addadmin'>
                <div className='header-addadmin-txt'>
                    Add Admin
                </div>
                <div className='header-addadmin-btns'>
                    <div className="header-addadmin-cancel">
                        <NavLink to={'/admin/admin-manage'}><button><i class="fa-solid fa-xmark"></i><p>cancel</p></button></NavLink>
                    </div>
                    <form onSubmit={handlesubmit}>
                        <div className="header-addadmin-addadmin">
                            <button type='submit' ><p>Add Admin</p></button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="addadmin-container">


                <form onSubmit={handlesubmit}>
                    <div className="sub-addadmin-container">
                        <div className="sub1-addadmin-container">
                            <p>Thumbnail</p>
                            <div className='item1-addadmin-para' ><p>Photo</p></div>
                            <div className='addadmin-input-photo' onClick={handleButtonClick}>
                                <div className='addadmin-input-photo-icon'>
                                    <i class="fa-regular fa-image"></i>
                                </div>
                                <div className='addadmin-input-photo-txt'>
                                    <p>click here to add image</p>
                                </div>
                                <label id="upload">
                                    <button type='button' >Add Image</button>
                                </label>
                                <input type="file" name="img" ref={fileInputRef} id="upload" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
                            </div>

                        </div>
                        <div className="sub2-addadmin-conatiner">
                            <p>General Information</p>
                            <div className='sub2-addadmin-input-name'>
                                <div>
                                    <label>UserName</label>
                                </div>
                                <input type='text' placeholder='Type UserName here. . .' name='username' value={newadmin.username} onChange={handlechange} />
                            </div>
                            <div className='sub2-addadmin-input-description'>
                                <div className='addadmin-input-create'>
                                    <div>
                                        <label>Email</label>
                                    </div>
                                    <input type='text' name='email' value={newadmin.email} onChange={handlechange} />
                                </div>
                                <div className='addadmin-input-create'>
                                    <div>
                                        <label>Contact</label>
                                    </div>
                                    <input type='text' name='contact' value={newadmin.contact} onChange={handlechange} />
                                </div>
                                <div className='addadmin-input-create'>
                                    <div>
                                        <label>Address</label>
                                    </div>
                                    <input type='text' name='address' value={newadmin.address} onChange={handlechange} />
                                </div>
                                <div className='addadmin-input-create'>
                                    <div>
                                        <label>Role</label>
                                    </div>
                                    <input type='text' name='role' value={newadmin.role} onChange={handlechange} />
                                </div>
                                <div className='addadmin-input-create'>
                                    <div>
                                        <label>Status</label>

                                    </div>
                                   
                                    <select placeholder='Select a category' name="status" value={newadmin.status} onChange={handlechange} >
                                        <option value="" disabled selected>Select a status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>   
                                </div>
                                <div className='addadmin-input-create'>
                                    <div>
                                        <label>Password</label>
                                    </div>
                                    <input type='text' name='password' value={newadmin.password} onChange={handlechange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAdmin