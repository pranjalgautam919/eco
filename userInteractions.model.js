const mongoose = require('mongoose');

const userInteractionsSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User' },
  searchQuery: String,
  productId: { type: String, ref: 'Product' },
  visitCount: Number,
  lastVisit: Date
});

const UserInteractions = mongoose.model('UserInteractions', userInteractionsSchema);

module.exports = UserInteractions;