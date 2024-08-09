// const Order = require('../models/OrderModel');

// // Create a new order
// exports.createOrder = async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();
//     res.status(201).json({ message: 'Order created successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error creating order' });
//   }
// };

// // Get all orders
// exports.getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate('userId', 'name email').populate('products.product', 'name price');
//     res.json(orders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching orders' });
//   }
// };

// // Get a single order by ID
// exports.getOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const order = await Order.findById(orderId).populate('userId', 'name email').populate('products.product', 'name price');
//     if (!order) {
//       res.status(404).json({ message: 'Order not found' });
//     } else {
//       res.json(order);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching order' });
//   }
// };

// // Update an order
// exports.updateOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const order = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
//     if (!order) {
//       res.status(404).json({ message: 'Order not found' });
//     } else {
//       res.json(order);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error updating order' });
//   }
// };

// // Delete an order
// exports.deleteOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     await Order.findByIdAndRemove(orderId);
//     res.json({ message: 'Order deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error deleting order' });
//   }
// };

// const Order = require('../models/OrderModel');
// const Joi = require('joi');

// // Create a new order
// exports.createOrder = async (req, res) => {
//   try {
//     const schema = Joi.object({
//       userId: Joi.string().required(),
//       products: Joi.array().required(),
//     });
//     const { error } = schema.validate(req.body);
//     if (error) {
//       res.status(400).json({ message: error.details[0].message });
//       return;
//     }

//     const order = new Order(req.body);
//     await order.save();
//     res.status(201).json({ message: 'Order created successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error creating order' });
//   }
// };

// // Get all orders
// exports.getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate('userId', 'name email').populate('products.product', 'name price');
//     res.json(orders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching orders' });
//   }
// };

// // Get a single order by ID
// exports.getOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const order = await getOrderById(orderId);
//     if (!order) {
//       res.status(404).json({ message: 'Order not found' });
//     } else {
//       res.json(order);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching order' });
//   }
// };

// // Update an order (cancel order)
// exports.cancelOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const order = await getOrderById(orderId);
//     if (!order) {
//       res.status(404).json({ message: 'Order not found' });
//     } else {
//       order.status = 'cancelled';
//       order.cancelledAt = Date.now();
//       order.cancelledReason = req.body.cancelledReason;
//       await order.save();
//       res.status(201).json({ message: 'Order cancelled successfully' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error cancelling order' });
//   }
// };

// // Delete an order
// exports.deleteOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     await Order.findByIdAndRemove(orderId);
//     res.json({ message: 'Order deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error deleting order' });
//   }
// };

// // Helper function to retrieve an order by ID
// async function getOrderById(orderId) {
//   return await Order.findById(orderId).populate('userId', 'name email').populate('products.product', 'name price');
// }

const Order = require('../models/OrderModel');
const Product = require('../models/product.model');
const Joi = require('joi');
const PurchaseHistory = require('../models/PurchaseHistoryModel');
const VisitHistory = require('../models/VisitHistoryModel');

// Create a new order for the current user
exports.createUserOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const discountPercentage = await calculateDiscount(userId);
    const schema = Joi.object({
      products: Joi.array().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const order = new Order({
      userId: req.user._id,
      products: req.body.products,
      discountPercentage,
    });
    await order.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// Get all orders for the current user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('products.product', 'name price');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Get a single order by ID for the current user
exports.getUserOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await getOrderById(orderId);
    if (!order || order.userId.toString() !== req.user._id.toString()) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json(order);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

// Remove a product from an order for the current user
exports.removeProductFromOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const productId = req.params.productId;
    const order = await getOrderById(orderId);
    if (!order || order.userId.toString() !== req.user._id.toString()) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      const productIndex = order.products.findIndex((product) => product.product.toString() === productId);
      if (productIndex !== -1) {
        order.products.splice(productIndex, 1);
        await order.save();
        res.json(order);
      } else {
        res.status(404).json({ message: 'Product not found in order' });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error removing product from order' });
  }
};

// Cancel an order for the current user
exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await getOrderById(orderId);
    if (!order || order.userId.toString() !== req.user._id.toString()) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      order.status = 'cancelled';
      order.cancelledAt = Date.now();
      order.cancelledReason = req.body.cancelledReason;
      await order.save();
      res.status(201).json({ message: 'Order cancelled successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error cancelling order' });
  }
};

// Helper function to retrieve an order by ID
async function getOrderById(orderId) {
  return await Order.findById(orderId).populate('products.product', 'name price');
}
async function calculateDiscount(userId) {
  const purchaseHistory = await PurchaseHistory.find({ userId });
  const visitHistory = await VisitHistory.find({ userId });

  const purchaseCount = purchaseHistory.length;
  const visitCount = visitHistory.length;

  let discountPercentage = 0;

  if (purchaseCount >= 5) {
    discountPercentage = 10; // 10% discount for 5 or more purchases
  } else if (purchaseCount >= 3) {
    discountPercentage = 5; // 5% discount for 3 or more purchases
  }

  if (visitCount >= 10) {
    discountPercentage += 5; // additional 5% discount for 10 or more visits
  }
}  