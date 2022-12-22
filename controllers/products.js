const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');
const {capitalizeProductName, capitalizeProductCategory} = require('../utils/capitalize');

const getAllProducts  = async (req, res) =>{
    res.send('Get All Products');
}

const getProduct  = async (req, res) =>{
    res.send('Get Single Product');
}

const createProduct  = async (req, res) =>{
    
    req.body.createdBy = req.user.userId
    req.body.brand = capitalizeProductName(req.body.brand);
    req.body.category = capitalizeProductCategory(req.body.category);
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product});
}

const updateProduct  = async (req, res) =>{
    res.send('Update Product')
}

const deleteProduct  = async (req, res) =>{
    res.send('Delete Product')
}

module.exports = {
    getAllProducts, 
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}
