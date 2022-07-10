var mongoose = require("mongoose")
// User Schema
var ProvinceSchema = mongoose.Schema({
	code: {
        type: String,
        required: true
    },
    name: String,
    district: [{
        name: String,
        pre: String,
        ward: [{
            name: String,
            pre: String,
        }],
        street: [],
    }]
});

var Province = module.exports = mongoose.model('province', ProvinceSchema);

module.exports.getAllProvince = function(callback){
    Province.find(callback);
}

