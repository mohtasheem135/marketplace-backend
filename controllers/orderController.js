// backend/controllers/orderController.js
const Order = require('../models/Order');

// Place an order
exports.placeOrder = async (req, res) => {
  try {
    const { userDetails, basket } = req.body;

    // Ensure both userDetails and basket are provided
    if (!userDetails || !basket || basket.length === 0) {
      return res.status(400).json({ error: 'User details and basket are required' });
    }

    // Create the order with a default order status
    const newOrder = await Order.create(userDetails, basket);
    res.json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
