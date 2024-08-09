const Product = require('../models/product.model');

const updateProductStatus = async (req, res, active) => {
  try {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const product = await Product.findByIdAndUpdate(productId, { active }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    if (err instanceof MongoError || err instanceof ValidationError) {
      return res.status(400).json({ message: `Error updating product: ${err.message}` });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.activate = async (req, res) => {
  updateProductStatus(req, res, true);
};

exports.deactivate = async (req, res) => {
  updateProductStatus(req, res, false);
};