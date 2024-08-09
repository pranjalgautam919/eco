// // category.controller.js
// const Category = require('../models/catogory.model');

// /**
//  * Create a new category
//  * @param {object} req - Express request object
//  * @param {object} res - Express response object
//  * @description Creates a new category and returns it
//  */
// exports.create = async (req, res) => {
//   try {
//     const category = new Category(req.body);
//     await category.save();
//     res.status(201).json(category);
//   } catch (err) {
//     res.status(400).json({ message: `Error creating category: ${err.message}` });
//   }
// };

// /**
//  * Get all categories
//  * @param {object} req - Express request object
//  * @param {object} res - Express response object
//  * @description Returns all categories
//  */
// exports.getAll = async (req, res) => {
//   try {
//     const categories = await Category.find().exec();
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ message: `Error fetching categories: ${err.message}` });
//   }
// };

// /**
//  * Get a category by ID
//  * @param {object} req - Express request object
//  * @param {object} res - Express response object
//  * @description Returns a category by ID
//  */
// exports.getById = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id).exec();
//     if (!category) {
//       res.status(404).json({ message: 'Category not found' });
//     } else {
//       res.json(category);
//     }
//   } catch (err) {
//     res.status(500).json({ message: `Error fetching category: ${err.message}` });
//   }
// };

// /**
//  * Update a category
//  * @param {object} req - Express request object
//  * @param {object} res - Express response object
//  * @description Updates a category and returns it
//  */
// exports.update = async (req, res) => {
//   try {
//     const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(category);
//   } catch (err) {
//     res.status(400).json({ message: `Error updating category: ${err.message}` });
//   }
// };

// /**
//  * Delete a category
//  * @param {object} req - Express request object
//  * @param {object} res - Express response object
//  * @description Deletes a category
//  */
// exports.delete = async (req, res) => {
//   try {
//     await Category.findByIdAndRemove(req.params.id);
//     res.status(204).json({ message: 'Category deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: `Error deleting category: ${err.message}` });
//   }
// };


const Category = require('../models/catogory.model');

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.getCategoryById = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  res.json(category);
};

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.json(category);
};

exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  await Category.findByIdAndRemove(id);
  res.json({ message: 'Category deleted successfully' });
};