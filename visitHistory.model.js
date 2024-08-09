// // discount.model.js
// const mongoose = require('mongoose');

// const discountSchema = new mongoose.Schema({
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category'
//   },
//   type: {
//     type: String,
//     enum: ['percentage', 'fixed']
//   },
//   value: {
//     type: Number,
//     required: true
//   },
//   startDate: {
//     type: Date,
//     default: Date.now
//   },
//   endDate: {
//     type: Date,
//     default: null
//   }
// });

// const Discount = mongoose.model('Discount', discountSchema);

// module.exports = Discount;

// visitHistory.model.js
const mongoose = require('mongoose');

const visitHistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  visit_date: Date,
});

const VisitHistory = mongoose.model('VisitHistory', visitHistorySchema);

module.exports = VisitHistory;