import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../assets/css/admin/login/login.css"; // Keep your existing CSS file
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const [fetchdata, setfetchdata] = useState([]);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();



    const handlechange = (e) => {
        const { name, value } = e.target;

        setLoginInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await axios.get("http://localhost:4800/admins");
                setfetchdata(res.data);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
        };
        fetchAdmin();
    }, []);


   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:4800/checkadmins", {
            identifier: loginInfo.identifier, 
            password: loginInfo.password
        });

        if (response.data.status === "inactive") {
            alert("Your account is inactive. Contact support.");
            return;
        }

        if (response.data.admin_id) {
            localStorage.setItem("admin_id", response.data.admin_id);
            localStorage.setItem("isLoggedIn", "true");

            alert("Login successfully");
            navigate("/admin/dashboard");
        } else {
            alert("Invalid login response");
        }
    } catch (error) {
        console.error(error);

        if (error.response) {
            alert(error.response.data.error); // Show exact backend message
        } else {
            alert("Invalid username or password");
        }
    }
};

    
    



    return (
        <div className="all-login">
            <div className="loginn wrap">
                <h1 className="h1" id="login">Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="email"
                        name="identifier"
                        placeholder="Email"
                        value={loginInfo.identifier} 
                        onChange={handlechange}
                        // pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={loginInfo.password}
                        onChange={handlechange}
                        required
                    />
                   <button className="button type1" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;