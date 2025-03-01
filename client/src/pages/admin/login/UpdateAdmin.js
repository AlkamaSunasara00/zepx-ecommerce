import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../assets/css/admin/login/addadmin.css';
import { useRef } from "react";
import { NavLink } from 'react-router-dom';
const port = process.env.REACT_APP_URL;

const UpdateAdmin = () => {
    const [editadmin, seteditadmin] = useState({
        img: null,
        username: "",
        email: "",
        contact: "",
        address: "",
        role: "",
        status: "",
        password: ""
    });
    const location = useLocation();
    const navigate = useNavigate();


    const fetchadminbyid = async (id) => {
        try {
            const res = await axios.get(`${port}/getadminbyid/${id}`)

            seteditadmin(res.data[0])
        }

        catch (error) {
            console.error(error);

        }
    };


    const handlechange = (e) => {
        const { name, value } = e.target
        seteditadmin((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        seteditadmin((prev) => ({
            ...prev,
            [name]: files[0]
        }))
    };

    //  const fileInputRef = useRef(null);
    //     const handleButtonClick = () => {
    //         fileInputRef.current.click();
    //     };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData();
            formdata.append("img", editadmin.img);
            formdata.append("username", editadmin.username);
            formdata.append("email", editadmin.email);
            formdata.append("contact", editadmin.contact);
            formdata.append("address", editadmin.address);
            formdata.append("role", editadmin.role);
            formdata.append("status", editadmin.status);
            formdata.append("password", editadmin.password);



            await axios.put(`${port}/updateadmin/${location.state.id}`, formdata,


            )
            seteditadmin({
                img: null,
                username: "",
                email: "",
                contact: "",
                address: "",
                role: "",
                status: "",
                password: ""
            })
            navigate("/admin/admin-manage")
        } catch (error) {
            console.error(error);

        }
    }

    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };




    useEffect(() => {
        fetchadminbyid(location.state.id);
    }, [location.state.id]);
    return (
        <div className='main-addadmin-container'>
            <div className='header-addadmin'>
                <div className='header-addadmin-txt'>
                    Add Admin
                </div>
                <div className='header-addadmin-btns'>
                    <div className="header-addadmin-cancel">
                        <NavLink to={'/admin/category'}><button><i class="fa-solid fa-xmark"></i><p>cancel</p></button></NavLink>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="header-addadmin-addadmin">
                            <button type='submit' ><p>Update Admin</p></button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="addadmin-container">


                <form onSubmit={handleSubmit}>
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
                                    <button type='button' >Update Image</button>
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
                                <input type='text' placeholder='Type UserName here. . .' name='username' value={editadmin.username} onChange={handlechange} />
                            </div>
                            <div className='sub2-addadmin-input-description'>
                                <div className='addadmin-input-create'>
                                    <div>
                                        <label>Email</label>
                                    </div>
                                    <input type='text' name='email' value={editadmin.email} onChange={handlechange} />
                                </div>
                                <div className='addadmin-input-create'>
                                    <div>
                                        <label>Contact</label>
                                    </div>
                                    <input type='text' name='contact' value={editadmin.contact} onChange={handlechange} />
                                </div>
                                <div className='addadmin-input-create'>
                                    <div>
                                        <label>Address</label>
                                    </div>
                                    <input type='text' name='address' value={editadmin.address} onChange={handlechange} />
                                </div>
                                <div className='addadmin-input-create'>
                                    <div>
                                        <label>Role</label>
                                    </div>
                                    <input type='text' name='role' value={editadmin.role} onChange={handlechange} />
                                </div>
                                <div className='addadmin-input-create'>
                                    <div>
                                        <label>Status</label>

                                    </div>
                                    {/* <select name="status" value={editadmin.status} onChange={handlechange} width="47%" >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select> */}
                                    <select placeholder='Select a category' name="status" value={editadmin.status} onChange={handlechange} >
                                        <option value="" disabled selected>Select a status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>   
                                    {/* <input type='text' name='status' value={editadmin.status} onChange={handlechange} /> */}
                                </div>
                                <div className='addadmin-input-create'>
                                    <div>
                                        <label>Password</label>
                                    </div>
                                    <input type='text' name='password' value={editadmin.password} onChange={handlechange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateAdmin