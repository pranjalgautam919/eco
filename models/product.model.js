// const mongoose = require('mongoose');
// const productSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: [true,"Plese enter Product name " ]
//     },
//     price: {
//         type: Number,
//         required: [true,"Plese enter Product price " ],
//         default: 0
//     },
//     quantity:{
//         type:Number,
//         required:[true,"Please enter Product quantity"],
//         default:0

//      },
//     image:{
//         type:String,
//         required:false
//     },
//     status: {
//         type: String,
//         enum: ['active', 'inactive'],
//         default: 'active'
//       },
//       category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true
//       }   


// },
// {
//     timestamps:true
// }

// );

// const Product = mongoose.model("product",productSchema)
// module.exports = Product

// models/product.model.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  image: String,
  status: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Product', productSchema);