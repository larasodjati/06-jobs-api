const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');
const {capitalizeProductName, capitalizeProductCategory} = require('../utils/capitalize');

const getAllProducts  = async (req, res) =>{
    //res.send('Get All Products');
    const products = await Product.find({createdBy: req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({products, count:products.length})
}

const getProduct  = async (req, res) =>{
    //res.send('Get Single Product');
    const {
        user:{userId}, 
        params:{id:productId}
    } = req;

    const product = await Product.findOne({
        _id:productId, 
        createdBy:userId,
    })
    if(!product){
        throw new NotFoundError(`No product with id ${productId}`)
    }
    res.status(StatusCodes.OK).json({ product });
}

const createProduct  = async (req, res) =>{
    
    req.body.createdBy = req.user.userId;
    req.body.brand = capitalizeProductName(req.body.brand);
    req.body.category = capitalizeProductCategory(req.body.category);
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product});
}

const updateProduct  = async (req, res) =>{
    //res.send('Update Product')

    const {
        body:{brand, category, opened, validity},
        user:{userId}, 
        params:{id:productId}
    } = req;

    if( brand=== '' || category=== '' || opened==='' || validity=== ''){
        throw new BadRequestError ('Brand, Category, Opened, and Validity fields cannot be empty')
    }
    const product = await Product.findByIdAndUpdate({_id:productId, createdBy:userId}, req.body, {new:true,
    runValidators:true})

    if(!product){
        throw new NotFoundError(`No product with id ${productId}`)
    }
    res.status(StatusCodes.OK).json({ product });
}

const deleteProduct  = async (req, res) =>{
    //res.send('Delete Product')

    const {
        user:{userId}, 
        params:{id:productId}
    } = req

    const product = await Product.findByIdAndRemove({
        _id:productId,
        createdBy:userId
    })

    if(!product){
        throw new NotFoundError(`No product with id ${productId}`)
    }
    res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllProducts, 
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}
