// backend/models/Order.js
const base = require('../config/airtableConfig');

const Order = {
  // Create a new order
  create: async (userDetails, orderItems) => {
    const createdOrder = await base('Orders').create([
      {
        fields: {
          userName: userDetails.name,
          userEmail: userDetails.email,
          userAddress: userDetails.address,
          orderedItems: JSON.stringify(orderItems), // Save ordered items as JSON string
          orderStatus: 'PENDING', // Default status
        },
      },
    ]);
    return createdOrder;
  },

  // Retrieve all orders
  getAll: async () => {
    const orders = await base('Orders').select().all();
    return orders.map((order) => ({
      id: order.id,
      userName: order.fields.userName,
      userEmail: order.fields.userEmail,
      userAddress: order.fields.userAddress,
      orderedItems: JSON.parse(order.fields.orderedItems), // Parse JSON to object
      orderStatus: order.fields.orderStatus,
    }));
  },
};

module.exports = Order;
