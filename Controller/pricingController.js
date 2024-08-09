// pricingController.js
const Category = require('../models/catogory.model');
const PricingRule = require('../models/pricingRule.model');
const Discount = require('../models/discount.model');

exports.calculatePrice = async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId).exec();
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const pricingRules = await PricingRule.find({ category: categoryId }).exec();
  const discounts = await Discount.find({ category: categoryId }).exec();

  const originalPrice = category.price;
  let discountedPrice = originalPrice;

  // Apply pricing rules
  pricingRules.forEach((rule) => {
    if (rule.type === 'percentage') {
      discountedPrice *= (1 - rule.value / 100);
    } else if (rule.type === 'fixed') {
      discountedPrice -= rule.value;
    }
  });

  // Apply discounts
  discounts.forEach((discount) => {
    if (discount.type === 'percentage') {
      discountedPrice *= (1 - discount.value / 100);
    } else if (discount.type === 'fixed') {
      discountedPrice -= discount.value;
    }
  });

  res.json({ price: discountedPrice });
};