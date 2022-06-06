var mongoose = require("mongoose")
// Voucher Schema
var CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: String,
        default: 'root'
    },
});

var Category = module.exports = mongoose.model('category', CategorySchema);

module.exports.getAllCategory = function(callback){
    Category.find(callback);
}



