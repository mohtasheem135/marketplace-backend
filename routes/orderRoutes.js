// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Place a new order
router.post('/', orderController.placeOrder);

// Retrieve all orders
router.get('/', orderController.getOrders);

module.exports = router;
