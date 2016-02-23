var mongoose = require('mongoose');
// Very nice use of the Ingredient model to be appended in the ingredients list
// Create a Schema
var orderSchema = mongoose.Schema({
  name: String,
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  total: Number,
  complete: { type: Boolean, default: false }
});

module.exports = mongoose.model("order", orderSchema);