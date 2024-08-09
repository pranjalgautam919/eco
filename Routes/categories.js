// const express = require('express');
// const router = express.Router();
// const Category = require('../models/catogory.model');

// // Get all categories
// router.get('/', async (req, res) => {
//   try {
//     const categories = await Category.find().exec();
//     res.json(categories);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Get a single category by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id).exec();
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
//     res.json(category);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Create a new category
// router.post('/', async (req, res) => {
//   const { name, description, status, parent } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: "Please enter category name" });
//   }

//   try {
//     const category = new Category({ name, description, status, parent });
//     const savedCategory = await category.save();
//     res.status(201).json(savedCategory);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Update a category by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
//     res.json(category);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete a category by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const category = await Category.findByIdAndRemove(req.params.id);
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
//     res.json({ message: 'Category deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const categoriesController = require('../Controller/categoryController');
const  categoryStatusController  = require('../Controller/categoryStatusController.js')
// const pricingController = require('../Controller/pricingController');
const jwt  = require('../midleware/jwt.js');

 
router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);

router.use(jwt.authenticate);
router.use(jwt.authorize(['admin', 'moderator']));
router.post('/', categoriesController.createCategory);
router.put('/:id', categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

router.put('/:id/activate', categoryStatusController.activate);
router.put('/:id/deactivate', categoryStatusController.deactivate);

module.exports = router;
