// const Category = require('../models/catogory.model');
// const { MongoError, ValidationError } = require('mongoose');

// const updateCategoryStatus = async (req, res, active) => {
//   try {
//     const categoryId = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(categoryId)) {
//       return res.status(400).json({ message: 'Invalid category ID' });
//     }
//     const category = await Category.findByIdAndUpdate(categoryId, { active }, { new: true });
//     res.json(category);
//   } catch (err) {
//     if (err instanceof MongoError || err instanceof ValidationError) {
//       return res.status(400).json({ message: `Error updating category: ${err.message}` });
//     }
//     throw err;
//   }
// };

// /**
//  * Activate a category
//  * @param {object} req - Express request object
//  * @param {object} res - Express response object
//  * @description Activates a category
//  */
// exports.activate = async (req, res) => {
//   updateCategoryStatus(req, res, true);
// };

// /**
//  * Deactivate a category
//  * @param {object} req - Express request object
//  * @param {object} res - Express response object
//  * @description Deactivates a category
//  */
// exports.deactivate = async (req, res) => {
//   updateCategoryStatus(req, res, false);
// };

const Category = require('../models/catogory.model');

const updateCategoryStatus = async (req, res, active) => {
  try {
    const categoryId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }
    const category = await Category.findByIdAndUpdate(categoryId, { active }, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    if (err instanceof MongoError || err instanceof ValidationError) {
      return res.status(400).json({ message: `Error updating category: ${err.message}` });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.activate = async (req, res) => {
  updateCategoryStatus(req, res, true);
};

exports.deactivate = async (req, res) => {
  updateCategoryStatus(req, res, false);
};