const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product:{
        type:String,
        required:[true, 'Please provide product name '],
        maxlength:70,
    },
    type:{
        type:String,
        required:[true, 'Please provide product type'],
        maxlength:100,
    },
    opened:{
        type:String,
        required:[true, 'Please provide date opened'],
        maxlength:30,
    },
    validity:{
        type:String,
        required:[true, 'Please provide validity'],
        maxlength:30,
    },
    status:{
        type:String,
        enum:['new', 'in-use', 'expired'],
        default: 'new',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }

}, {timestamps:true})

module.exports = mongoose.model('Product', ProductSchema )