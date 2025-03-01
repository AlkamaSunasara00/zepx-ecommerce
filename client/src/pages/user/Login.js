import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../assets/css/login.css";
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { NavLink, useNavigate } from 'react-router-dom';


function Login() {
    const [fetchdata, setfetchdata] = useState([]);
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });
    const Navigate = useNavigate();
      const username = localStorage.getItem("username");
    
    console.log("Stored Username in localStorage:", username);
    



    const handlechange = (e) => {
        const { name, value } = e.target;

        setLoginInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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
    
                // Store the username in localStorage
                if (response.data.username) {
                    localStorage.setItem("username", response.data.username);
                } else {
                    console.warn("Warning: Username is missing in response data!");
                }
    
                alert("Login successfully");
                Navigate("/");
            } else {
                alert("Invalid login response");
            }
        } catch (error) {
            console.error(error);
            alert("Invalid username or password");
        }
    };
    
    
    


    return (
        <>
            <Navbar />
            <div className='login-container'>
                <div className='login'>
                    <div className='img-login'>
                        <img src={require('../../assets/images/security.png')} alt='image' />
                    </div>
                    <div className='info-login'>
                        <div className='logo-login'>
                            <img src={require('../../assets/images/logo.png')} />
                        </div>
                        <form className="form" onSubmit={handleSubmit}>
                            <p className="title">Login</p>
                            <div className="flex">
                                <div>
                                    <div>
                                        <label>Username</label>
                                    </div>
                                    <input type="text" id='username' placeholder="Enter Your Name" name='username' value={loginInfo.username} onChange={handlechange} required />
                                </div>
                                <div>
                                    <div>
                                        <label>Password</label>
                                    </div>
                                    <input required placeholder="Enter Your pasword" type='password' className="input" name='password' value={loginInfo.password} onChange={handlechange} />
                                </div>
                            </div>
                            <div className='submit-login'>
                                <button type="submit" className="submit">
                                    Login
                                </button>
                            </div>
                            <div className='submit2-login'>
                                <p>Don't have an account? <span><NavLink to={'/signup'}>Sign up now</NavLink></span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Login



























// import React, { useState } from 'react';
// import axios from 'axios';
// import "../../assets/css/login.css";
// import Navbar from '../navbar/Navbar';
// import Footer from '../footer/Footer';
// import { NavLink, useNavigate } from 'react-router-dom';

// function Login() {
//     const [loginInfo, setLoginInfo] = useState({
//         username: "",
//         password: "",
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setLoginInfo((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:4800/checkusers", loginInfo);
            
//             if (response.data.success) {
//                 localStorage.setItem("userId", response.data.user.id);
//                 alert("Login successful");
//                 navigate("/");

//             } else {
//                 alert("Invalid username or password");
//             }
//         } catch (error) {
//             console.error(error);
//             alert("An error occurred. Please try again.");
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div className='login-container'>
//                 <div className='login'>
//                     <div className='img-login'>
//                         <img src={require('../../assets/images/security.png')} alt='Security' />
//                     </div>
//                     <div className='info-login'>
//                         <div className='logo-login'>
//                             <img src={require('../../assets/images/logo.png')} alt="Logo" />
//                         </div>
//                         <form className="form" onSubmit={handleSubmit}>
//                             <p className="title">Login</p>
//                             <div className="flex">
//                                 <div>
//                                     <label>Username</label>
//                                     <input type="text" placeholder="Enter Your Name" name='username' value={loginInfo.username} onChange={handleChange} required />
//                                 </div>
//                                 <div>
//                                     <label>Password</label>
//                                     <input type='password' placeholder="Enter Your Password" name='password' value={loginInfo.password} onChange={handleChange} required />
//                                 </div>
//                             </div>
//                             <div className='submit-login'>
//                                 <button type="submit" className="submit">Login</button>
//                             </div>
//                             <div className='submit2-login'>
//                                 <p>Don't have an account? <span><NavLink to={'/signup'}>Sign up now</NavLink></span></p>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default Login;
