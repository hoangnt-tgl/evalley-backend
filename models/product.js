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



