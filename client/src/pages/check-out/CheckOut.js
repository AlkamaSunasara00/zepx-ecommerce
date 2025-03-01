import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/checkout.css"
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

function CheckOut() {


    const location = useLocation();
    const navigate = useNavigate();

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
                address: ""
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

    const truncateString = (str, maxLength) => {
        if (str && str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        } else {
            return str;
        }
    };



    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='checkOut'>
                    <form>
                        <div className='checkOut-section'>
                            <div className='chekout-address'>
                                <div className='chekout-address-section'>
                                    <div className='chekout-address-heading'>
                                        <p>Billing Information</p>
                                    </div>
                                    <div className='chekout-address-information'>
                                        <div className='chekout-name-section'>
                                            <div className='chekout-name'>
                                                <div className='div'>
                                                    <label>User Name</label>
                                                </div>
                                                <div className='checkout-names'>
                                                    <input
                                                        type="text"
                                                        placeholder='First name'
                                                        id="firstName"
                                                        name="first_name"
                                                        value={editdata.first_name || ""}
                                                        onChange={handleChange}
                                                    />
                                                    <input type='text' placeholder='Last name'  id="lastName" name="last_name" value={editdata.last_name || ""} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className='chekout-compnay-name'>
                                                <div className='div'>
                                                    <label>Compnay Name <span className='optional'>(Optional)</span></label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='Enter Your Compnay Name' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='checkout-address'>
                                            <div className='checkout-address-section'>
                                                <div className='div'>
                                                    <label>Address</label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='Enter Your Address'  id="address" name="address" value={editdata.address || ""} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className='checkout-zipcode'>
                                                <div className='div'>
                                                    <label>Zip Code</label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='ex.123456' required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='checkout-conatct'>
                                            <div className='checkout-email checkout-conatct-info'>
                                                <div className='div'>
                                                    <label>Email</label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='example.@gmail.com' id="email" name="email" value={editdata.email || ""} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className='checkout-number checkout-conatct-info'>
                                                <div className='div'>
                                                    <label>Phone Number</label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='ex.1234567890' value={editdata.contact || ""} id="contact" name="contact" onChange={handleChange} required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='chekout-payment-section'>
                                    <div className='payment-section'>
                                        <div className='payment-section-heading'>
                                            <p>Payment Option</p>
                                        </div>
                                        <div className='payment-type-section'>
                                            <div className='payment-type'>
                                                <i class="fa-solid fa-hand-holding-dollar"></i>
                                                <p>Cash on Delivery</p>
                                                <input type='radio' required />
                                            </div>
                                            <div className='payment-type payment'>
                                                <i class="fa-solid fa-credit-card"></i>
                                                <p>Online Payment</p>
                                                <input type='radio' required />
                                            </div>
                                            <div className='payment-type'>
                                                <i class="fa-brands fa-google-wallet"></i>
                                                <p>My Wallet</p>
                                                <input type='radio' required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='chekout-additionl-section'>
                                    <div className='additionl-section-heading'>
                                        <p>Additional Information</p>
                                    </div>
                                    <div className='div'>
                                        <label>Order Notes <span className='optional'>(Optional)</span></label>
                                    </div>
                                    <div className='div'>
                                        <textarea type='text' placeholder='Notes about your order, e.g. special notes for delivery' />
                                    </div>
                                </div>
                            </div>
                            <div className='chekout-product'>
                                <div className='chekout-product-section'>
                                    <div className='chekout-product-heading'>
                                        <p>Order Summery</p>
                                    </div>
                                    <div className='chekout-item-contiant'>
                                        <div className='chekout-item'>
                                            <div className='chekout-item-img-section'>
                                                <div className='chekout-item-img'>
                                                    <img src={require("../../assets/images/item1.png")} alt='' />
                                                </div>
                                            </div>
                                            <div className='chekout-item-section'>
                                                <div className='chekout-item-name'>
                                                    <p>{truncateString("2020 Apple MacBook Pro with Apple M1 Chip (14-inch, 16GB RAM, 1TB SSD Storage) - Space Gray", 31)}</p>
                                                </div>
                                                <div className='chekout-item-quantity'>
                                                    <p className='checkout-bill-font'>1 × <span>₹120000</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='chekout-bill'>
                                        <div className='checkout-bill-price'>
                                            <p className='checkout-bill-font'>Sub-total</p>
                                            <p>₹1,20,000</p>
                                        </div>
                                        <div className='checkout-bill-price'>
                                            <p className='checkout-bill-font'>Shipping</p>
                                            <p>Free</p>
                                        </div>
                                        <div className='checkout-bill-price'>
                                            <p className='checkout-bill-font'>Discount</p>
                                            <p>₹19,000</p>
                                        </div>
                                        <div className='checkout-bill-price checkout-bill-border'>
                                            <p className='checkout-bill-font'>Tax</p>
                                            <p>₹7,429</p>
                                        </div>
                                        <div className='checkout-bill-total'>
                                            <p>Total</p>
                                            <p>₹1,06,429</p>
                                        </div>
                                    </div>
                                    <div className="chekout-product-button">
                                        <button>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CheckOut