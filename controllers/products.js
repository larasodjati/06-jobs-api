const getAllProducts  = async (req, res) =>{
    res.send('Get All Products')
}

const getProduct  = async (req, res) =>{
    res.send('Get Single Product')
}

const createProduct  = async (req, res) =>{
    res.json(req.user)
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
