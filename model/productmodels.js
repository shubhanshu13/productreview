const mongoose = require('mongoose')

console.log("hello from model product")

const productSchema = new mongoose.Schema({
    product_name:{
        type : String
    },
    product_price:{
        type: Number
    },
    product_company:{
        type: String
    },
    product_type:{
        type: String
    },
    product_rating:{
        type : Number
    },
    product_review:{
        type: String
    },
    product_categories:{
        type: String
    }
})
const product = mongoose.model('product',productSchema)
module.exports = product