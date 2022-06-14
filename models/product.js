var mongoose = require("mongoose")
// Product Schema
var ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    price_sale: {
        type: Number,
    },
    sale_start: {
        type: Date,
    },
    sale_end: {
        type: Date,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
    },
    origin: {
        type: String,
    },
    quantity: {
        type: Number,
    },

    created_at: {
        type: Date,
        default: Date.now
    },
    tag: {
        type: String,
    },
    status: {
        type: String,
        default: 'active'
    }

});

var Product = module.exports = mongoose.model('product', ProductSchema);

module.exports.getAllProduct = function(callback){
    Product.find(callback);
}
module.exports.getProductById = function(id, callback){
    Product.findById(id, callback);
}
module.exports.getProductAvailable = function(callback){
    query = {
        status: 'active',
        quantity: {$gt: 0},
    }
    Product.find(query, callback);
}