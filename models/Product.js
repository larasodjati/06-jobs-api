const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Please provide product name'],
    maxlength: 70
  },
  category: {
    type: String,
    required: [true, '\n Please provide product type'],
    maxlength: 100
  },
  opened: {
    type: Date,
    required: [true, '\n Please provide date opened with format: mm-dd-yyyy']

  },
  validity: {
    type: String,
    required: [true, '\n Please provide validity with format number-months(nm)'],
    maxlength: 4

  },
  expirationDate: {
    type: Date,
    required: [true, '\n Please provide date opened with format: mm-dd-yyyy']

  },
  status: {
    type: String,
    enum: ['new', 'in-use', 'expired'],
    default: 'new'
  },
  createdBy: { // tie the product to the actual user
    type: mongoose.Types.ObjectId,
    ref: 'User', // which model that we are referencing
    required: [true, 'Please provide user']
  }

}, { timestamps: true }) // automatically manage our createdAt and updatedAt in our document

module.exports = mongoose.model('Product', ProductSchema)
