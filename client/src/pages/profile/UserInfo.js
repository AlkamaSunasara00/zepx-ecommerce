import React, { useEffect, useState } from "react";
import "../../assets/css/userinfo.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

const UserInfo = () => {

  const [editdata, setEditdata] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    contact: "",
    address: "",
    img: null
  });
  const [error, setError] = useState(null);


  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null); 

  const userId = location.state?.user_id || localStorage.getItem("user_id");

  const fetchdatabyid = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4800/getuserbyid/${id}`);
      setEditdata(response.data[0])
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditdata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEditdata((prev) => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("first_name", editdata.first_name);
      formdata.append("last_name", editdata.last_name);
      formdata.append("username", editdata.username);
      formdata.append("email", editdata.email);
      formdata.append("contact", editdata.contact);
      formdata.append("address", editdata.address);
      if (editdata.img) formdata.append("img", editdata.img);

      await axios.put(`http://localhost:4800/updatedata/${userId}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setEditdata({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        contact: "",
        address: "",
        img: null
      });
      navigate("/user");
    } catch (error) {
      setError("Error updating user data. Please try again.");
    }
  };
  useEffect(() => {
    if (userId) {
      fetchdatabyid(userId);
    } else {
      navigate("/login");
    }
  }, [userId]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="content-account">
      <div className="sub1-account">
        <p>Account Setting</p>
      </div>
      <form className="sub2-account" onSubmit={handleSubmit}>
        <div className="item1-account">
          <div className="img-account">
            <img
              src={editdata.img instanceof File ? URL.createObjectURL(editdata.img) : editdata.img ? `/uploads/${editdata.img}` : "/uploads/profile.jpg"}
              alt="User"
            />
            <div className="file-upload" >
              <label id="upload">
              <button type="button" className="upload-btn" onClick={handleButtonClick}>Upload</button>
              </label>
              <input
                type="file"
                name="img"
                ref={fileInputRef}
                id="upload"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>

          </div>
        </div>
        <div className="item2-account">
          <div className="items">
            <div className="all-account">
              <div className="label-account">
                <label htmlFor="firstName"><p>First Name</p></label>
              </div>
              <div className="input-account">
                <input
                  type="text"
                  id="firstName"
                  name="first_name"
                  value={editdata.first_name || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="all-account">
              <div className="label-account">
                <label htmlFor="lastName"><p>Last Name</p></label>
              </div>
              <div className="input-account">
                <input
                  type="text"
                  id="lastName"
                  name="last_name"
                  value={editdata.last_name || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="items">
            <div className="all-account">
              <div className="label-account">
                <label htmlFor="username"><p>Username</p></label>
              </div>
              <div className="input-account">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editdata.username || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="all-account">
              <div className="label-account">
                <label htmlFor="email"><p>Email</p></label>
              </div>
              <div className="input-account">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editdata.email || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="items">
            <div className="all-account">
              <div className="label-account">
                <label htmlFor="contact"><p>Contact</p></label>
              </div>
              <div className="input-account">
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={editdata.contact || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="all-account">
              <div className="label-account">
                <label htmlFor="address"><p>Address</p></label>
              </div>
              <div className="input-account">
                <textarea
                  id="address"
                  name="address"
                  value={editdata.address || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="account-btn">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
