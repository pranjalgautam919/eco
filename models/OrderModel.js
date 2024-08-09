const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, validate: { validator: (v) => v > 0, message: 'Quantity must be a positive integer' } },
    subtotal: { type: Number }
  }],
  total: { type: Number, required: true },
  tax: { type: Number },
  shippingCost: { type: Number },
  status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  shippingAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String }
  },
  paymentMethod: {
    method: { type: String, validate: { validator: (v) => ['credit card', 'paypal', 'bank transfer'].includes(v), message: 'Invalid payment method' } },
    status: { type: String }
  },
  paymentDate: { type: Date },
  deliveryDate: { type: Date },
  cancelledAt: { type: Date },
  cancelledReason: { type: String },
  currency: { type: String },
  discount: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;