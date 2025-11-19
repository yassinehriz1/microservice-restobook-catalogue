const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category : String,
  img : String
});

module.exports = mongoose.model('Product', productSchema);
