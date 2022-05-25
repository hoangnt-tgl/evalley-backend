var mongoose = require("mongoose")
// Voucher Schema
var VoucherSchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
        required: true
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
    expire_at: {
        type: Date,
        required: true
    },
    tag: {
        type: String,
    },
    status: {
        type: String,
        default: 'active'
    },
});

var Voucher = module.exports = mongoose.model('voucher', VoucherSchema);

module.exports.getAllVoucher = function(callback){
    Voucher.find(callback);
}


