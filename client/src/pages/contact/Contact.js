import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../../assets/css/contact.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";

const port=process.env.REACT_APP_URL;

function Contact() {
  const [fetchcontact, setFetchcontact] = useState([]);
  const [addcontact, setAddcontact] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contact: "",
        message: ""
  });
  const userId = localStorage.getItem("user_id"); 

  const navigate = useNavigate()

  useEffect(() => {
         getContact();
     }, []);

  const getContact = async (e) => {
    try {
      const res = await axios.get(`${port}/getcontact`);
      setFetchcontact(res.data);
     

    } catch (error) {
      console.error(error);

    }

  };

const  handlechnage = (e) => {
    const { name, value } = e.target;
    setAddcontact((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User not logged in. Please login to contact with us");
      navigate("/login") // Clearer message
      return;
    }
    try {

      await axios.post(`${port}/addcontact`,{ ...addcontact,user_id:userId});
      // console.log(newUser);

      setAddcontact({
        first_name: "",
        last_name: "",
        email: "",
        contact: "",
        message: ""
      });
      getContact();

      alert("thanks for contact with us")
    } catch (error) {
      console.error(error);

    }


  }

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <div className="content-container">
          <div className="sub-container">
            <div className="left-section">
              <div className="header-section">
                <h2>Contact Information</h2>
                <p>Do you have any questions? We will gladly answer them!</p>
              </div>
              <div className="details-section">
                <ul >
                  <li className="contact-item"> <i class="fa-solid fa-phone"></i><p>+91 73569 83829</p></li>
                  <li className="contact-item"> <i class="fa-regular fa-envelope"></i><p>zepx2025@gmail.com</p></li>
                  <li className="contact-item">
                    <i class="fa-solid fa-location-dot"></i><p>7th Avenue, GJ<br />
                      zepX , Calicut</p>
                  </li>
                </ul>
              </div>
              <div className="social-icons">
                <span className="icon"><i class="fa-brands fa-facebook"></i></span>
                <span className="icon"><i class="fa-brands fa-instagram"></i></span>
                <span className="icon"><i class="fa-brands fa-youtube"></i></span>
                <span className="icon"><i class="fa-brands fa-twitter"></i></span>
              </div>
            </div>
            <div className="right-section">
              <form className="form" onSubmit={handlesubmit}>
                <h2>Contact-Us</h2>
                <div className="sub-form">
                  <div className="form-group" id="group1">
                    <div>
                      <label htmlFor="first-name">First Name</label>
                    </div>
                    <input
                      id="first-name"
                      required
                      placeholder="Enter Your FirstName"
                      type="text"
                      className="input"
                      name="first_name"
                      value={addcontact.first_name}
                      onChange={handlechnage}
                    />
                  </div>
                  <div className="form-group" id="group2" >
                    <div>
                      <label htmlFor="last-name">Last Name</label>
                    </div>
                    <input
                      id="last-name"
                      required
                      placeholder="Enter Your LastName"
                      type="text"
                      className="input"
                      name="last_name"
                      value={addcontact.last_name}
                      onChange={handlechnage}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div>
                    <label htmlFor="email">Email</label>
                  </div>
                  <input
                    id="email"
                    required
                    placeholder="example@gmail.com"
                    type="email"
                    className="input"
                    name="email"
                    value={addcontact.email}
                    onChange={handlechnage}
                  />
                </div>
                <div className="form-group">
                  <div>
                    <label htmlFor="phone">Phone Number</label>
                  </div>
                  <input
                    id="phone"
                    required
                    type="tel"
                    placeholder="ex: 9923451679"
                    className="input"
                    pattern="[0-9]{10}"
                    name="contact"
                    value={addcontact.contact}
                    onChange={handlechnage}
                  />
                </div>
                <div className="form-group1">
                  <div>
                    <label htmlFor="message">Message</label>
                  </div>
                  <textarea
                    id="message"
                    required
                    rows="3"
                    placeholder="Write your message..."
                    className="input01"
                    name="message"
                    value={addcontact.message}
                    onChange={handlechnage}
                  ></textarea>
                </div>
                <button className="submit" type="submit">
                  <span className="text">Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;