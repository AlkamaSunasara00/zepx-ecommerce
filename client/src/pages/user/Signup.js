import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import "../../assets/css/signup.css";
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { CartContext } from "../../context/CartContext";
import { Eye, EyeOff } from 'lucide-react';

const clientId = "275485862744-n1e777sqv229944ff3jj5so0h6tdijce.apps.googleusercontent.com";


function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [fetchdata, setfetchdata] = useState([]);
    const { setUser } = useContext(CartContext);

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

    useEffect(() => {
        axios.get("http://localhost:4800/auth/user", { withCredentials: true })
            .then(response => console.log(response.data))
            .catch(error => console.error("Error fetching user:", error));
    }, []);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



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

    // ✅ Google Login Success Handler
    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const response = await axios.post("http://localhost:4800/auth/google/verify", {
                token: credentialResponse.credential
            });

            if (response.data.user_id) {
                localStorage.setItem("user_id", response.data.user_id);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("isLoggedIn", "true");
                setUser(response.data.user_id);
                alert("Google login successful!");
                Navigate("/");
            } else {
                alert("Google login failed.");
            }
        } catch (error) {
            console.error("Google Login Error:", error);
            alert("Google Login failed!");
        }
    };


    return (
        <GoogleOAuthProvider clientId={clientId}>
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
                                    {/* <div>
                                    <div>
                                        <label>Password</label>
                                    </div>
                                    <input required placeholder="Enter Your pasword" type='password' className="input" name='password' value={newUser.password} onChange={handlechange} />
                                </div> */}
                                    <div className='password_input' style={{ position: "relative" }}>
                                        <label>Password</label>
                                        <input required placeholder="Enter Your pasword" type={showPassword ? "text" : "password"} className="input" name='password' value={newUser.password} onChange={handlechange} />
                                        <span
                                            onClick={togglePasswordVisibility}
                                            style={{

                                            }}
                                        >
                                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                        </span>
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
                                <div className='orr'><p>OR</p></div>

                                {/* ✅ Google Login Button */}
                                <div className="google-signup">
                                    <GoogleLogin
                                        onSuccess={handleGoogleLogin}
                                        onError={() => console.log("Google Login Failed")}
                                    />
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
        </GoogleOAuthProvider>

    )
}

export default Signup