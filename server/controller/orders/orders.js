// Import in orders.js in controller

const connection = require("../../connection/connection");

const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay with your test keys
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_8qnxpQBWpWTRCH',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '8ZYWNr1w2pLNAjJ2hUlydUor'
});


// In the createOrder function (for Cash on Delivery)
const createOrder = async (req, res) => {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const { user_details, order_details } = req.body;
        const payment_method = req.body.payment_method || 'pending';
        const user_id = req.body.user_id || null;

        // Validate user_id (existing code)
        const [userExists] = await conn.execute(
            'SELECT 1 FROM user WHERE user_id = ?',
            [user_id]
        );

        const orderStatus = payment_method === 'cash_on_delivery' ? 'confirmed' : 'pending';

        // Create order first
        const [orderResult] = await conn.execute(
            `INSERT INTO orders (user_id, order_date, total_amount, order_status, payment_method) 
            VALUES (?, CURRENT_TIMESTAMP(), ?, ?, ?)`,
            [
                user_id,
                order_details.total_amount,
                orderStatus,
                payment_method
            ]
        );

        const order_id = orderResult.insertId;

        // Then create shipping address with order_id
        const [addressResult] = await conn.execute(
            `INSERT INTO shipping_address 
            (order_id, first_name, last_name, company_name, address, zip_code, email, phone_number, payment_option, order_notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                order_id, // Add the order_id here
                user_details.first_name,
                user_details.last_name,
                user_details.company_name || '', 
                user_details.address,
                user_details.zip_code,
                user_details.email,
                user_details.phone_number,
                user_details.payment_option,
                user_details.order_notes || ''
            ]
        );

        const shipping_address_id = addressResult.insertId;

        // Insert items into order_items table (existing code)
        for (const item of order_details.items) {
            await conn.execute(
                `INSERT INTO order_items (order_id, product_id, quantity, item_price) 
                VALUES (?, ?, ?, ?)`,
                [order_id, item.product_id, item.quantity, item.item_price]
            );
        }

        // If cash on delivery, add payment record (existing code)
        if (payment_method === 'cash_on_delivery') {
            await conn.execute(
                `INSERT INTO payments (order_id, payment_date, payment_amount, payment_status)
                VALUES (?, CURRENT_TIMESTAMP(), ?, ?)`,
                [order_id, order_details.total_amount, 'pending']
            );
        }

        await conn.commit();

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            orderId: order_id,
            shippingAddressId: shipping_address_id
        });
    } catch (error) {
        await conn.rollback();
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message
        });
    } finally {
        conn.release();
    }
};

// Similarly update the createRazorpayOrder function
const createRazorpayOrder = async (req, res) => {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const { amount, orderData } = req.body;
        const { user_details, order_details } = orderData;
        const user_id = orderData.user_id || null;

        // Validate user_id (existing code)
        const [userExists] = await conn.execute(
            'SELECT 1 FROM user WHERE user_id = ?',
            [user_id]
        );

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(amount * 1),
            currency: 'INR',
            receipt: 'order_receipt_' + Date.now(),
            payment_capture: 1
        });

        // Create order first
        const [orderResult] = await conn.execute(
            `INSERT INTO orders (user_id, order_date, total_amount, order_status, payment_method) 
            VALUES (?, CURRENT_TIMESTAMP(), ?, ?, ?)`,
            [
                user_id,
                order_details.total_amount,
                'pending',
                'online_payment'
            ]
        );

        const order_id = orderResult.insertId;

        // Then create shipping address with order_id
        const [addressResult] = await conn.execute(
            `INSERT INTO shipping_address 
            (order_id, first_name, last_name, company_name, address, zip_code, email, phone_number, payment_option, order_notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                order_id, // Add the order_id here
                user_details.first_name,
                user_details.last_name,
                user_details.company_name || null,
                user_details.address,
                user_details.zip_code,
                user_details.email,
                user_details.phone_number,
                user_details.payment_option,
                user_details.order_notes || null
            ]
        );

        const shipping_address_id = addressResult.insertId;

        // Insert items into order_items table (existing code)
        for (const item of order_details.items) {
            await conn.execute(
                `INSERT INTO order_items (order_id, product_id, quantity, item_price) 
                VALUES (?, ?, ?, ?)`,
                [order_id, item.product_id, item.quantity, item.item_price]
            );
        }

        // Store razorpay order ID in payments table (existing code)
        await conn.execute(
            `INSERT INTO payments (order_id, payment_date, payment_amount, payment_status, razorpay_order_id)
            VALUES (?, CURRENT_TIMESTAMP(), ?, ?, ?)`,
            [order_id, order_details.total_amount, 'created', razorpayOrder.id]
        );

        await conn.commit();

        res.status(200).json({
            success: true,
            orderId: order_id,
            razorpayOrderId: razorpayOrder.id,
            amount: amount,
            currency: 'INR',
            shippingAddressId: shipping_address_id
        });
    } catch (error) {
        await conn.rollback();
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to create Razorpay order',
            error: error.message
        });
    } finally {
        conn.release();
    }
};

const verifyPayment = async (req, res) => {
    const conn = await connection.getConnection();

    try {
        const { razorpayPaymentId, razorpayOrderId, razorpaySignature, orderId } = req.body;

        // Verify signature
        const generatedSignature = crypto
            .createHmac('sha256', '8ZYWNr1w2pLNAjJ2hUlydUor') // Replace with your test secret key
            .update(razorpayOrderId + '|' + razorpayPaymentId)
            .digest('hex');

        if (generatedSignature !== razorpaySignature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }

        // Update payment status in database
        await conn.execute(
            `UPDATE payments 
            SET payment_status = 'completed', razorpay_payment_id = ?, razorpay_signature = ? 
            WHERE order_id = ? AND razorpay_order_id = ?`,
            [razorpayPaymentId, razorpaySignature, orderId, razorpayOrderId]
        );

        // Update order status
        await conn.execute(
           ` UPDATE orders SET order_status = 'confirmed' WHERE order_id = ?`,
            [orderId]
        );

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            orderId: orderId,
            paymentId: razorpayPaymentId
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify payment',
            error: error.message
        });
    } finally {
        conn.release();
    }
};

module.exports = { createOrder, createRazorpayOrder, verifyPayment }