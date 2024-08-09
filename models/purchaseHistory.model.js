// // pricingRule.model.js
// const mongoose = require('mongoose');

// const pricingRuleSchema = new mongoose.Schema({
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

// const PricingRule = mongoose.model('PricingRule', pricingRuleSchema);

// module.exports = PricingRule;

// purchaseHistory.model.js
const mongoose = require('mongoose');

const purchaseHistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  purchase_date: Date,
});

const PurchaseHistory = mongoose.model('PurchaseHistory', purchaseHistorySchema);

module.exports = PurchaseHistory;