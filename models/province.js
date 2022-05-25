var mongoose = require("mongoose")
// User Schema
var ProvinceSchema = mongoose.Schema({
	code: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    district: [{
        name: {
            type: String,
        },
        pre: {
            type: String,
        },
        ward: [{
            name: {
                type: String,
            },
            pre: {
                type: String,
            }
        }],
        street: [{
            name: {
                type: String,
            }
        }]
    }]
});

var Province = module.exports = mongoose.model('province', ProvinceSchema);

module.exports.getAllProvince = function(callback){
    Province.find(callback);
}

