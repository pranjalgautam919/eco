// productsController.js
const Product = require('../models/product.model');
const calculateDiscount = require('../utils/calculateDiscount');
const PurchaseHistory = require('../models/purchaseHistory.model');
const VisitHistory = require('../models/visitHistory.model')

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndRemove(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

exports.applyDiscount = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      const user = req.user;
      const purchaseHistory = await PurchaseHistory.find({ user_id: user._id });
      const visitHistory = await VisitHistory.find({ user_id: user._id, category_id: product.category_id });
      const { discountAmount, discountedPrice } = calculateDiscount(user, product, purchaseHistory, visitHistory);
      product.price = discountedPrice;
      await product.save();
      res.json(product);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error applying discount' });
  }
};
