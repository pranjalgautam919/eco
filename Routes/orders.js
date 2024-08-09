const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order for the current user
router.post('/orders', orderController.createUserOrder);

// Get all orders for the current user
router.get('/orders', orderController.getUserOrders);

// Get a single order by ID for the current user
router.get('/orders/:id', orderController.getUserOrder);

// Remove a product from an order for the current user
router.delete('/orders/:id/products/:productId', orderController.removeProductFromOrder);

// Cancel an order for the current user
router.patch('/orders/:id/cancel', orderController.cancelOrder);

module.exports = router;