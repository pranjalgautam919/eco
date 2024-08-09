const MAX_DISCOUNT = 20;
const LOYALTY_DISCOUNT_RATE = 5;
const VISIT_DISCOUNT_RATE = 2;
const PURCHASE_HISTORY_THRESHOLD = 5;
const VISIT_HISTORY_THRESHOLD = 5;

const calculateDiscount = (user, product, purchaseHistory, visitHistory) => {
  if (!user || !product || !purchaseHistory || !visitHistory) {
    throw new Error('Invalid input parameters');
  }

  if (!Array.isArray(purchaseHistory) || !Array.isArray(visitHistory)) {
    throw new Error('Invalid input types');
  }

  let discountAmount = 0;
  let discountedPrice = product.price;

  try {
    discountAmount += calculateLoyaltyDiscount(purchaseHistory, product, LOYALTY_DISCOUNT_RATE);
    discountAmount += calculateVisitDiscount(visitHistory, product, VISIT_DISCOUNT_RATE);
    discountAmount = applyMaximumDiscountLimit(discountAmount, product.price, MAX_DISCOUNT);
    discountedPrice = product.price - discountAmount;

    return {
      discountAmount,
      discountedPrice,
    };
  } catch (error) {
    throw new Error('Error calculating discount: ' + error.message);
  }
};

const calculateLoyaltyDiscount = (purchaseHistory, product, loyaltyDiscountRate) => {
  const previousPurchases = purchaseHistory.filter((purchase) => purchase.product_id === product._id);
  if (previousPurchases.length > 0) {
    const loyaltyDiscount = Math.floor(previousPurchases.length / PURCHASE_HISTORY_THRESHOLD) * loyaltyDiscountRate;
    return (product.price * loyaltyDiscount) / 100;
  }
  return 0;
};

const calculateVisitDiscount = (visitHistory, product, visitDiscountRate) => {
  const previousVisits = visitHistory.filter((visit) => visit.category_id === product.category_id);
  if (previousVisits.length > 0) {
    const visitDiscount = Math.floor(previousVisits.length / VISIT_HISTORY_THRESHOLD) * visitDiscountRate;
    return (product.price * visitDiscount) / 100;
  }
  return 0;
};

const applyMaximumDiscountLimit = (discountAmount, productPrice, maxDiscount) => {
  return Math.min(discountAmount, (productPrice * maxDiscount) / 100);
};

module.exports = calculateDiscount;