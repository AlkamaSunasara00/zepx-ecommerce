import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { CartContext } from "../../context/CartContext";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "../../assets/css/cart.css";

function Cart() {
    const { cartItems, updateQuantity, deleteCart } = useContext(CartContext);

    const subTotal = cartItems.reduce((acc, item) => {
        return acc + (item.product ? item.quantity * item.product.price : 0);
    }, 0);

    const tax = cartItems.reduce((acc, item) => {
        return acc + (item.product ? (item.quantity * item.product.price * item.product.tax) / 100 : 0);
    }, 0);

    const discount = cartItems.reduce((acc, item) => {
        return acc + (item.product ? (item.quantity * item.product.price * item.product.discount) / 100 : 0);
    }, 0);

    const total = subTotal + tax - discount;

    const truncateString = (str, maxLength) => {
        return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    };

    return (
        <>
            <Navbar />
            <div className="cart2-container">
                <div className="cart-content">
                    <div className="cart-items">
                        <div className="cart-header">
                            <h3>Shopping Cart</h3>
                        </div>
                        <div className="cart-item-header">
                            <p>Products</p>
                        </div>
                        {cartItems.filter(item => item.product).map((item, index) => (
                            <div className="cart-item" key={item.product_id}>
                                <div className="cart-item-details">
                                    <div className="cart-item-remove">
                                        <i className="fa-solid fa-xmark" onClick={() => deleteCart(item.product_id)}></i>
                                    </div>
                                    <div className="cart-img">
                                        {JSON.parse(item.product.img || "[]")[0] && (
                                            <img src={`/uploads/${JSON.parse(item.product.img || "[]")[0]}`} alt="product" width="100px" />
                                        )}
                                    </div>
                                    <div className="cart-item-name">
                                        <p>{truncateString(item.product.title)}</p>
                                    </div>
                                </div>
                                <div className="cart2-item-header">
                                    <p>Price</p>
                                    <p>Quantity</p>
                                    <p>Total</p>
                                </div>
                                <div className="all-cart-item">
                                    <div>
                                        <p className="cart-item-price">₹{item.product.price}</p>
                                    </div>
                                    <div className="cart-item-quantity">
                                        <button onClick={() => updateQuantity(item.product_id, Number(item.quantity) - 1)}>-</button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => updateQuantity(item.product_id, Number(item.quantity) + 1)}>+</button>
                                    </div>
                                    <div className="cart-item-total">
                                        <p>₹{item.quantity * item.product.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="cart2-content">
                    <div>
                        <div className="cart2-header">
                            <h5>Card Totals</h5>
                        </div>
                        <div className="cart2-items">
                            <p>Sub-total</p>
                            <p>₹{subTotal.toFixed(2)}</p>
                        </div>
                        <div className="cart2-items">
                            <p>Shipping</p>
                            <p>₹0.00</p>
                        </div>
                        <div className="cart2-items">
                            <p>Discount 0%</p>
                            <p>-₹{discount.toFixed(2)}</p>
                        </div>
                        <div className="cart2-items">
                            <p>Tax 5%</p>
                            <p>₹{tax.toFixed(2)}</p>
                        </div>
                        <div className="cart-verticle"></div>
                        <div className="cart2-total">
                            <h5>Total</h5>
                            <h5>₹{total.toFixed(2)}</h5>
                        </div>
                        <div className="cart2-btn">
                            <NavLink
                                to={"/checkout"}
                            >
                                <button>Buy Now</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-container">
                <div className="cart-sub-container">
                    <div className="cart-content">
                        <div className="sub1-cart">
                            <div className="sub1-item1">
                                <h3>Shopping Cart</h3>
                            </div>
                            <div className="sub1-item2">
                                <div className="item2-cart1">
                                    <p>Products</p>
                                </div>
                                <div className="item2-cart2">
                                    <p>Price</p>
                                    <p>Quantity</p>
                                    <p>Total</p>
                                </div>
                            </div>
                            {cartItems.filter(item => item.product).map((item, index) => (
                                <div className="sub1-item3" key={item.product_id}>
                                    <div className="item3-cart1">
                                        <div className="cart-icon">
                                            {/* <i className="fa-solid fa-x" onClick={() => deleteCart(item.product_id)}></i> */}
                                            <i className="fa-solid fa-x" onClick={() => deleteCart(item.cart_id || item.product_id)}></i>
                                        </div>
                                        <div className="item3-cart2">
                                            <div className="cart-img">
                                                {item.product && item.product.img ? (
                                                    JSON.parse(item.product.img || "[]")[0] && (
                                                        <img src={`/uploads/${JSON.parse(item.product.img || "[]")[0]}`} alt="product" width="100px" />
                                                    )
                                                ) : (
                                                    <p>No Image Available</p>
                                                )}
                                            </div>
                                            <span>
                                                <p>{truncateString(item.product?.title || "Unknown Product", 17)}</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item3-cart3">
                                        <p>₹{item.product.price}</p>
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(item.product_id, Number(item.quantity) - 1)}>-</button>
                                            <p>{item.quantity}</p>
                                            <button onClick={() => updateQuantity(item.product_id, Number(item.quantity) + 1)}>+</button>
                                        </div>
                                        <p>₹{item.quantity * item.product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="cart2-content">
                        <div>
                            <div className="cart2-header">
                                <h5>Card Totals</h5>
                            </div>
                            <div className="cart2-items">
                                <p>Sub-total</p>
                                <p>₹{subTotal.toFixed(2)}</p>
                            </div>
                            <div className="cart2-items">
                                <p>Shipping</p>
                                <p>₹0.00</p>
                            </div>
                            <div className="cart2-items">
                                <p>Discount</p>
                                <p>-₹{discount.toFixed(2)}</p>
                            </div>
                            <div className="cart2-items">
                                <p>Tax</p>
                                <p>{tax.toFixed(2)}</p>
                            </div>
                            <div className="cart-verticle"></div>
                            <div className="cart2-total">
                                <h5>Total</h5>
                                <h5>₹{total.toFixed(2)}</h5>
                            </div>
                            <div className="cart2-btn">
                              <NavLink to={"/checkout"}> <button>Buy Now</button></NavLink> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cart;