var mongoose = require("mongoose")
// Voucher Schema
var CountrycodeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: String,
        default: 'root'
    },
});

var Countrycode = module.exports = mongoose.model('countrycode', CountrycodeSchema);

module.exports.getAllCountrycode = function(callback){
    Countrycode.find(callback);
}



