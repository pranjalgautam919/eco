// const express = require('express');
// const router = express.Router();
// const Product = require('../models/product.model');
// const { ObjectId } = require('mongodb');
// const _ = require('lodash');


// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find().populate('category').exec();
//     res.json(products);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Get a single product by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate('category').exec();
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Create a new product
// router.post('/', async (req, res) => {
//   console.log(req.body);
//   const { name, description, price, category } = req.body;

//   if (!name || !price || !category) {
//     return res.status(400).json({ message: "Please enter required fields" });
//   }

//   try {
//     const categoryId = new ObjectId(category);
//     const product = new Product({ name, description, price, category: categoryId });
//     const savedProduct = await product.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Update a product by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'description', 'price', 'category']), { new: true });
//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// router.delete('/:id', async (req, res) => {
//   const { id } = req.body; 
//   try {
//       const product = await Product.findByIdAndDelete(id);
//       if (!product) {
//           return res.status(404).json({ message: 'Product not found' });
//       }
//       res.status(200).json({ message: 'Product deleted successfully', product });
//   } catch (error) {
//       res.status(500).json({ message: 'Error deleting product', error });
//   }
// });



// module.exports = router;

// products.routes.js
const express = require('express');
const router = express.Router();
const productsController = require('../Controller/productsController');
const productStatusController = require('../Controller/productStatusController');
const jwt = require('../midleware/jwt.js');


router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

router.use(jwt.authenticate);
router.use(jwt.authorize(['admin', 'moderator']));
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);
router.patch('/:id/apply-discount', productsController.applyDiscount);
router.put('/:id/activate', productStatusController.activate);
router.put('/:id/deactivate', productStatusController.deactivate);

module.exports = router;