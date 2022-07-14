var mongoose = require("mongoose")
// Voucher Schema
var CountrycodeSchema = mongoose.Schema({
    name: String,
    dial_code: String,
    code: String
});

var Countrycode = module.exports = mongoose.model('countrycode', CountrycodeSchema);

module.exports.getAllCountrycode = function(callback){
    Countrycode.find(callback);
}



