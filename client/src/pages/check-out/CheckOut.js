// Add this to your CheckOut.js file
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/checkout.css";
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const port = process.env.REACT_APP_URL;

function CheckOut() {
    const location = useLocation();
    const navigate = useNavigate();

    const fromCart = location.state?.fromCart;
    const fromItem = location.state?.fromItem;

    // Get data based on source page
    const cartItems = location.state?.cartItems || [];
    const cartSummary = location.state?.summary || {};

    // Single product data (from Item.js)
    const singleItem = location.state?.singleItem || {};
    const productData = fromItem ? singleItem.product : location.state?.productData;
    const productQuantity = fromItem ? singleItem.quantity : (location.state?.quantity || 1);

    const [userId, setUserId] = useState(localStorage.getItem('user_id') || null);
    console.log(userId)
    // State for form data
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        company_name: '',
        address: '',
        zip_code: '',
        email: '',
        phone_number: '',
        payment_option: 'online_payment', // Default to online payment
        order_notes: ''
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle radio button changes for payment options
    const handlePaymentOptionChange = (option) => {
        setFormData({
            ...formData,
            payment_option: option
        });
    };

    // Get product images
    const productImages = productData && productData.img ? JSON.parse(productData.img || "[]") : [];
    const productImage = productImages.length > 0 ? productImages[0] : null;

    const truncateString = (str, maxLength) => {
        if (str && str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        } else {
            return str;
        }
    };


    const calculateOrderSummary = () => {
        // If coming from Cart page
        if (fromCart) {
            return {
                subtotal: cartSummary.subTotal || 0,
                shipping: cartSummary.shipping || 0,
                discount: cartSummary.discount || 0,
                tax: cartSummary.tax || 0,
                total: cartSummary.total || 0
            };
        }

        // If coming from Item page with singleItem
        if (fromItem && singleItem && singleItem.product) {
            const product = singleItem.product;
            const quantity = singleItem.quantity;

            // Calculate according to your logic
            const taxAmount = (product.price * product.tax) / 100 * quantity;
            const discountAmount = (product.price * product.discount) / 100 * quantity;
            const subtotal = product.price * quantity;
            const shipping = product.shipping || 0;
            const total = subtotal + shipping + taxAmount - discountAmount;

            return {
                subtotal,
                shipping,
                discount: discountAmount,
                tax: taxAmount,
                total
            };
        }

        // Fallback calculation if neither of the above conditions match
        if (!productData) return {
            subtotal: 0,
            shipping: 0,
            discount: 0,
            tax: 0,
            total: 0
        };

        // Calculate according to your logic
        const price = productData.price;
        const quantity = productQuantity;
        const subtotal = price * quantity;
        const shipping = productData.shipping || 0;
        const taxAmount = (price * productData.tax) / 100 * quantity;
        const discountAmount = (price * productData.discount) / 100 * quantity;
        const total = subtotal + shipping + taxAmount - discountAmount;

        return {
            subtotal,
            shipping,
            discount: discountAmount,
            tax: taxAmount,
            total
        };
    };

    const orderSummary = calculateOrderSummary();

    // Function to initialize Razorpay
    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data (basic validation)
        if (formData.payment_option === 'online_payment') {
            if (!formData.first_name || !formData.last_name || !formData.address ||
                !formData.zip_code || !formData.email || !formData.phone_number) {
                alert('Please fill in all required fields');
                return;
            }
        }


        try {
            // Prepare order data
            const orderData = {
                user_id: userId,
                user_details: {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    company_name: formData.company_name,
                    address: formData.address,
                    zip_code: formData.zip_code,
                    email: formData.email,
                    phone_number: formData.phone_number,
                    payment_option: formData.payment_option,
                    order_notes: formData.order_notes
                },
                order_details: {
                    total_amount: orderSummary.total,
                    items: fromCart ? cartItems.map(item => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                        item_price: item.product.price
                    })) : [{
                        product_id: productData.id || productData.product_id,
                        quantity: productQuantity,
                        item_price: productData.price
                    }]
                }
            };

            // Handle different payment methods
            if (formData.payment_option === 'cash_on_delivery') {
                // Create order with COD payment method
                const response = await axios.post(`${port}/create`, {
                    ...orderData,
                    payment_method: 'cash_on_delivery'
                });

                alert('Order placed successfully!');
                navigate('/order-confirmation', { state: { orderDetails: response.data } });
            }
            else if (formData.payment_option === 'online_payment') {
                // Initialize Razorpay
                const res = await initializeRazorpay();

                if (!res) {
                    alert('Razorpay SDK failed to load. Check your internet connection.');
                    return;
                }

                // Create order on the server
                const orderResponse = await axios.post(`${port}/create-razorpay-order`, {
                    amount: orderSummary.total * 100, // Razorpay expects amount in paise
                    orderData: orderData
                });

                const options = {
                    key: "rzp_test_8qnxpQBWpWTRCH", // Replace with your test key
                    amount: orderSummary.total * 100,
                    currency: "INR",
                    // image: require('../../assets/images/Untitled design.png'),
                    name: "zepx",
                    description: "Purchase Transaction",
                    order_id: orderResponse.data.razorpayOrderId,
                    handler: async function (response) {
                        // Handle successful payment
                        try {
                            const paymentVerification = await axios.post(`${port}/verify-payment`, {
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature,
                                orderId: orderResponse.data.orderId
                            });

                            alert('Payment successful!');
                            navigate('/order-confirmation', { state: { orderDetails: paymentVerification.data } });
                        } catch (error) {
                            console.error("Payment verification failed:", error);
                            alert('Payment verification failed. Please contact support.');
                        }
                    },
                    prefill: {
                        name: `${formData.first_name} ${formData.last_name}`,
                        email: formData.email,
                        contact: formData.phone_number
                    },
                    notes: {
                        address: formData.address
                    },
                    theme: {
                        color: "#1E1F20",
                        // image: "https://i.imgur.com/logo.png"
                        image: "https://www.razorpay.com/assets/razorpay-logo.svg"
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            }
            else if (formData.payment_option === 'wallet') {
                // Implement wallet payment logic if needed
                alert('Wallet payment not implemented yet');
            }
        } catch (error) {
            console.error("Error processing order:", error);
            alert('Failed to process order. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='checkOut'>
                    <form onSubmit={handleSubmit}>
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
                                                        name="first_name"
                                                        value={formData.first_name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                    <input
                                                        type='text'
                                                        placeholder='Last name'
                                                        name="last_name"
                                                        value={formData.last_name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className='chekout-compnay-name'>
                                                <div className='div'>
                                                    <label>Company Name <span className='optional'>(Optional)</span></label>
                                                </div>
                                                <div className='div'>
                                                    <input
                                                        type='text'
                                                        placeholder='Enter Your Company Name'
                                                        name="company_name"
                                                        value={formData.company_name}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='checkout-address'>
                                            <div className='checkout-address-section'>
                                                <div className='div'>
                                                    <label>Address</label>
                                                </div>
                                                <div className='div'>
                                                    <input
                                                        type='text'
                                                        placeholder='Enter Your Address'
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className='checkout-zipcode'>
                                                <div className='div'>
                                                    <label>Zip Code</label>
                                                </div>
                                                <div className='div'>
                                                    <input
                                                        type='text'
                                                        placeholder='ex.123456'
                                                        name="zip_code"
                                                        value={formData.zip_code}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='checkout-conatct'>
                                            <div className='checkout-email checkout-conatct-info'>
                                                <div className='div'>
                                                    <label>Email</label>
                                                </div>
                                                <div className='div'>
                                                    <input
                                                        type='email'
                                                        placeholder='example@gmail.com'
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className='checkout-number checkout-conatct-info'>
                                                <div className='div'>
                                                    <label>Phone Number</label>
                                                </div>
                                                <div className='div'>
                                                    <input
                                                        type='text'
                                                        placeholder='ex.1234567890'
                                                        name="phone_number"
                                                        value={formData.phone_number}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
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
                                                <i className="fa-solid fa-hand-holding-dollar"></i>
                                                <p>Cash on Delivery</p>
                                                <input
                                                    type='radio'
                                                    name="payment"
                                                    checked={formData.payment_option === 'cash_on_delivery'}
                                                    onChange={() => handlePaymentOptionChange('cash_on_delivery')}
                                                />
                                            </div>
                                            <div className='payment-type payment'>
                                                <i className="fa-solid fa-credit-card"></i>
                                                <p>Online Payment</p>
                                                <input
                                                    type='radio'
                                                    name="payment"
                                                    checked={formData.payment_option === 'online_payment'}
                                                    onChange={() => handlePaymentOptionChange('online_payment')}
                                                />
                                            </div>
                                            <div className='payment-type'>
                                                <i className="fa-brands fa-google-wallet"></i>
                                                <p>My Wallet</p>
                                                <input
                                                    type='radio'
                                                    name="payment"
                                                    checked={formData.payment_option === 'wallet'}
                                                    onChange={() => handlePaymentOptionChange('wallet')}
                                                />
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
                                        <textarea
                                            placeholder='Notes about your order, e.g. special notes for delivery'
                                            name="order_notes"
                                            value={formData.order_notes}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='chekout-product'>
                                <div className='chekout-product-section'>
                                    <div className='chekout-product-heading'>
                                        <p>Order Summary</p>
                                    </div>

                                    {/* Display cart items if coming from cart */}
                                    {fromCart && cartItems.length > 0 ? (
                                        <div className='chekout-item-contiant'>
                                            {cartItems.filter(item => item.product).map((item, index) => (
                                                <div className='chekout-item' key={item.product_id}>
                                                    <div className='chekout-item-img-section'>
                                                        <div className='chekout-item-img'>
                                                            {item.product && item.product.img ? (
                                                                JSON.parse(item.product.img || "[]")[0] && (
                                                                    <img src={`/uploads/${JSON.parse(item.product.img || "[]")[0]}`} alt={item.product.title} />
                                                                )
                                                            ) : (
                                                                <img src={require("../../assets/images/item1.png")} alt='Product' />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className='chekout-item-section'>
                                                        <div className='chekout-item-name'>
                                                            <p>{truncateString(item.product.title, 28)}</p>
                                                        </div>
                                                        <div className='chekout-item-quantity'>
                                                            <p className='checkout-bill-font'>{item.quantity} × <span>₹{item.product.price}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : fromItem && productData ? (
                                        // Display single product if coming from item page
                                        <div className='chekout-item-contiant'>
                                            <div className='chekout-item'>
                                                <div className='chekout-item-img-section'>
                                                    <div className='chekout-item-img'>
                                                        {productImage ? (
                                                            <img src={`/uploads/${productImage}`} alt={productData.title} />
                                                        ) : (
                                                            <img src={require("../../assets/images/item1.png")} alt='Product' />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='chekout-item-section'>
                                                    <div className='chekout-item-name'>
                                                        <p>{truncateString(productData.title, 31)}</p>
                                                    </div>
                                                    <div className='chekout-item-quantity'>
                                                        <p className='checkout-bill-font'>{productQuantity} × <span>₹{productData.price}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='chekout-item-contiant'>
                                            <p>No product selected. Please go back and select a product.</p>
                                        </div>
                                    )}

                                    <div className='chekout-bill'>
                                        <div className='checkout-bill-price'>
                                            <p className='checkout-bill-font'>Sub-total</p>
                                            <p>₹{orderSummary.subtotal.toFixed(0)}.00</p>
                                        </div>
                                        <div className='checkout-bill-price'>
                                            <p className='checkout-bill-font'>Shipping</p>
                                            <p>{orderSummary.shipping > 0 ? `₹${orderSummary.shipping.toFixed(0)}.00` : 'Free'}</p>
                                        </div>
                                        <div className='checkout-bill-price'>
                                            <p className='checkout-bill-font'>Discount</p>
                                            <p>–₹{orderSummary.discount.toFixed(0)}.00</p>
                                        </div>
                                        <div className='checkout-bill-price checkout-bill-border'>
                                            <p className='checkout-bill-font'>Tax</p>
                                            <p>₹{orderSummary.tax.toFixed(0)}.00</p>
                                        </div>
                                        <div className='checkout-bill-total'>
                                            <p>Total</p>
                                            <p>₹{orderSummary.total.toFixed(0)}.00</p>
                                        </div>
                                    </div>
                                    <div className="chekout-product-button">
                                        <button type="submit">Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CheckOut;