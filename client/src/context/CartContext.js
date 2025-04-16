import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

const port = process.env.REACT_APP_URL;


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(localStorage.getItem("user_id"));

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        setUser(userId); // Update user state whenever localStorage changes
    }, []);

    useEffect(() => {  // This useEffect handles cart updates based on user
        const userId = localStorage.getItem("user_id");
        if (userId) {
            mergeLocalStorageCart(userId);
            fetchCart(userId);
        } else {
            fetchCart(null);
        }
    }, [user]);

    const mergeLocalStorageCart = async (userId) => {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (localCart.length > 0) {
            try {
                await axios.post(`${port}/mergeCart`, {
                    user_id: userId,
                    cartItems: localCart,
                });
                localStorage.removeItem("cart");
                fetchCart(userId);
            } catch (error) {
                console.error("Error merging cart:", error);
            }
        }
    };

    const fetchCart = async (userId) => {
        try {
            let cartData = [];
            if (userId) {
                const res = await axios.get(`${port}/getCartByUserId/${userId}`);
                cartData = res.data;
            } else {
                cartData = JSON.parse(localStorage.getItem("cart")) || [];
            }
            const uniqueCart = cartData.reduce((acc, item) => {
                let existing = acc.find(i => i.product_id === item.product_id);
                if (existing) {
                    existing.quantity += item.quantity;
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);
            fetchProductDetails(uniqueCart);
            if (!userId) {
                localStorage.setItem("cart", JSON.stringify(uniqueCart));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProductDetails = async (cartData) => {
        try {
            const updatedCart = await Promise.all(
                cartData.map(async (item) => {
                    if (!item.product) {
                        const productRes = await axios.get(`${port}/getproductbyid/${item.product_id}`);
                        if (productRes.data.length > 0) {
                            return { ...item, product: productRes.data[0] };
                        }
                    }
                    return item;
                })
            );
            setCartItems(updatedCart);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        newQuantity = parseInt(newQuantity, 10);
        if (newQuantity < 1) return;
        if (newQuantity > 10) newQuantity = 10;
        const updatedCart = cartItems.map((item) =>
            item.product_id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        try {
            await axios.post(`${port}/updateCartQuantity`, {
                user_id: localStorage.getItem("user_id"),
                product_id: productId,
                quantity: newQuantity,
            });
            fetchCart(localStorage.getItem("user_id")); // Refresh cart after quantity update
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCart = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            try {
                const userId = localStorage.getItem("user_id");
                if (userId) {
                    await axios.delete(`${port}/deleteCart/${productId}`);
                }
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const updatedCart = cart.filter(item => item.product_id !== productId);
                if (updatedCart.length === 0) {
                    localStorage.removeItem("cart");
                } else {
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                }
                fetchCart(userId); // Refresh cart after delete
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    const addToCart = async (data, counter) => {
        if (user) {
            try {
                const userId = user;
                const cartResponse = await axios.get(`${port}/getCartByUserId/${userId}`);
                const existingCart = cartResponse.data;
                let existingItem = existingCart.find(item => item.product_id === data.product_id);
                if (existingItem) {
                    let newQuantity = Number(existingItem.quantity) + Number(counter);
                    newQuantity = Math.min(newQuantity, 10);
                    await axios.post(`${port}/updateCartQuantity`, {
                        user_id: userId,
                        product_id: data.product_id,
                        quantity: newQuantity,
                        total_amount: newQuantity * data.price
                    });
                } else {
                    const newQuantity = Math.min(Number(counter), 10);
                    await axios.post(`${port}/addToCart`, {
                        user_id: userId,
                        product_id: data.product_id,
                        quantity: newQuantity,
                        total_amount: newQuantity * data.price
                    });
                }
                alert("Item added to cart!");
                fetchCart(userId); // Refresh cart after adding to cart
            } catch (error) {
                console.error(error);
            }
        } else {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingItem = cart.find(item => item.product_id === data.product_id);
            if (existingItem) {
                let newQuantity = existingItem.quantity + Number(counter);
                newQuantity = Math.min(newQuantity, 10);
                existingItem.quantity = newQuantity;
            } else {
                const newQuantity = Math.min(Number(counter), 10);
                cart.push({
                    product_id: data.product_id,
                    title: data.title,
                    price: data.price,
                    quantity: newQuantity
                });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Item added to local storage");
            fetchCart(null); // Refresh cart after adding to local storage
        }
    };

    const value = {
        cartItems,
        setCartItems,
        updateQuantity,
        deleteCart,
        addToCart,
        user, // Expose the user state
        setUser, // Expose the setUser function
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};