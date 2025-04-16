// Import in orders.js in routes


const express = require("express");
const router = express.Router();
const order = require("../../controller/orders/orders");


router.post('/create', order.createOrder);

// Create a Razorpay order
router.post('/create-razorpay-order', order.createRazorpayOrder);

// Verify Razorpay payment
router.post('/verify-payment', order.verifyPayment);

module.exports = router;