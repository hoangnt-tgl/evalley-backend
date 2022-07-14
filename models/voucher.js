var mongoose = require("mongoose")
// Voucher Schema
var VoucherSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    startdate: {
        type: Date,
        default: Date.now
    },
    enddate: Date,
    freeshipping: Boolean,
    quantity: Number,
    status: Boolean,
    minspend: Number,
    maxdiscount: Number,
    category: Array,
    type: String
});

var Voucher = module.exports = mongoose.model('voucher', VoucherSchema);

module.exports.getAllVoucher = function(callback){
    Voucher.find(callback);
}

module.exports.deleteVoucher = function(selected, callback){
    Voucher.deleteMany({_id: {$in: selected}}, callback)
}

module.exports.createVoucher = function(voucher, callback){
    voucher.save(callback);
}


