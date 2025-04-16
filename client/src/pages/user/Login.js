

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import "../../assets/css/login.css";
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from "../../context/CartContext";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff } from 'lucide-react'; // For eye icons

const clientId = "275485862744-n1e777sqv229944ff3jj5so0h6tdijce.apps.googleusercontent.com";


function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(CartContext);
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        axios.get("http://localhost:4800/auth/user", { withCredentials: true })
            .then(response => console.log(response.data))
            .catch(error => console.error("Error fetching user:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4800/checkusers", loginInfo);

            if (response.data.status === "inactive") {
                alert("Your account is inactive. Contact support.");
                return;
            }

            if (response.data.user_id) {
                localStorage.setItem("user_id", response.data.user_id);
                localStorage.setItem("isLoggedIn", "true");
                setUser(response.data.user_id);

                if (response.data.username) {
                    localStorage.setItem("username", response.data.username);
                } else {
                    console.warn("Warning: Username is missing in response data!");
                }

                alert("Login successful");
                navigate("/");
            } else {
                alert("Invalid login response");
            }
        } catch (error) {
            console.error(error);
            alert("Invalid username or password");
        }
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
                navigate("/");
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
                <div className='login-container'>
                    <div className='login'>
                        <div className='img-login'>
                            <img src={require('../../assets/images/security.png')} alt='Login Security' />
                        </div>
                        <div className='info-login'>
                            <div className='logo-login'>
                                <img src={require('../../assets/images/logo.png')} alt='Logo' />
                            </div>
                            <form className="form" onSubmit={handleSubmit}>
                                <p className="title">Login</p>
                                <div className="flex">
                                    <div>
                                        <div>
                                            <label>Username</label>
                                        </div>
                                        <input type="text" id='username' placeholder="Enter Your Name" name='username' value={loginInfo.username} onChange={handleChange} required />
                                    </div>
                                    {/* <div>
                                        <div>
                                            <label>Password</label>
                                        </div>
                                        <input required placeholder="Enter Your Password" type='password' className="input" name='password' value={loginInfo.password} onChange={handleChange} />
                                    </div> */}
                                    <div className='password_input' style={{ position: "relative" }}>
                                        <label>Password</label>
                                        <input
                                            required
                                            placeholder="Enter Your Password"
                                            type={showPassword ? "text" : "password"}
                                            className="input"
                                            name="password"
                                            value={loginInfo.password}
                                            onChange={handleChange}
                                        />
                                        <span
                                            onClick={togglePasswordVisibility}
                                            style={{

                                            }}
                                        >
                                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                        </span>
                                    </div>

                                </div>
                                <p>
                                    <NavLink to={'/forgotpassword'} style={{ color: "red" }}>Forgot Password?</NavLink>
                                </p>
                                <div className='submit-login'>
                                    <button type="submit" className="submit">
                                        Login
                                    </button>
                                </div>
                            </form>

                            <div className='or'><p>OR</p></div>

                            {/* ✅ Google Login Button */}
                            <div className="google-login">
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() => console.log("Google Login Failed")}
                                />
                            </div>

                            <div className='submit2-login'>
                                <p>Don't have an account? <span><NavLink to={'/signup'}>Sign up now</NavLink></span></p>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        </GoogleOAuthProvider>
    );
}

export default Login;