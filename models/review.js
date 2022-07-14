var mongoose = require("mongoose")
// Voucher Schema
var ReviewSchema = mongoose.Schema({
    product_id: {
        type: String
    },
    username: {
        type: String
    },
    message: {
        type: String
    },
    createdAt: {
        type: Date
    },
    rating: {
        type: Number 
    },
    reply: [
        {
            username: String,
            createdAt: Date,
            message: String
        }
    ]
});

var Review = module.exports = mongoose.model('review', ReviewrSchema);




