// category.model.js
// const mongoose = require('mongoose');

// const categorySchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter category name"]
//   },
//   description: {
//     type: String,
//     required: false
//   },
//   status: {
//     type: String,
//     enum: ['active', 'inactive'],
//     default: 'active'
//   },
//   parent: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     default: null
//   }


// }, {
//   timestamps: true
// });

// const Category = mongoose.model("category", categorySchema);
// module.exports = Category;

// models/category.model.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  // parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Category', categorySchema);