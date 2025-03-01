import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "../../assets/css/signup.css";
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';


function Signup() {
    const [fetchdata, setfetchdata] = useState([]);
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        contact: "",
        first_name: "",
        last_name: "",
        address: "",
        img: ""
    });
    const Navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (e) => {
        try {
            const res = await axios.get("http://localhost:4800/users");
            setfetchdata(res.data)

        } catch (error) {
            console.error(error);

        }
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {

            await axios.post("http://localhost:4800/addusers", newUser);
            fetchUsers();
            setNewUser({
                username: "",
                email: "",
                password: "",
                contact: "",
                first_name: "",
                last_name: "",
                address: "",
                img: ""
            });
            Navigate("/Login")
        } catch (error) {
            console.error(error);

        }
    }
    const handlechange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>

            <Navbar />
            <div className='signup-container'>
                <div className='signup'>
                    <div className='img-signup'>
                        <img src={require('../../assets/images/security.png')} alt='image' />
                    </div>
                    <div className='info-signup'>
                        <div className='logo-signup'>
                            <img src={require('../../assets/images/logo.png')} alt="Logo" />
                        </div>
                        <form className="form" onSubmit={handlesubmit}>
                            <p className="title">Signup</p>
                            <div className="flex">
                                <div>
                                    <div>
                                        <label>Username</label>
                                    </div>
                                    <input type="text" id='username' placeholder="Enter Your Name" name='username' value={newUser.username} onChange={handlechange} required />
                                </div>
                                <div>
                                    <div>
                                        <label>Email</label>
                                    </div>
                                    <input type="email" id='email' placeholder="Example@gmail.com" name='email' value={newUser.email} onChange={handlechange} required />
                                </div>
                                <div>
                                    <div>
                                        <label>Password</label>
                                    </div>
                                    <input required placeholder="Enter Your pasword" type='password' className="input" name='password' value={newUser.password} onChange={handlechange} />
                                </div>
                                <div>
                                    <div>
                                        <label>Phone Number</label>
                                    </div>
                                    <input type="tel" id='Phone Number' placeholder="Enter your Number" pattern="[0-9]{10}" name='contact' value={newUser.contact} onChange={handlechange} required />
                                </div>
                            </div>
                            <div className='submit-signup'>
                                <button type="submit" className="submit">
                                    Signup
                                </button>
                            </div>
                            <div className='submit2-signup'>
                                <p>Already have an account? <span><NavLink to={'/login'}>Login Now</NavLink></span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Signup