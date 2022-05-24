var mongoose = require("mongoose")
// User Schema
var ProvinceSchema = mongoose.Schema({
	Id:{
		type: Number,
	},
	Name: {
		type: String,
	},
	Districts: {
		Id:Number,
        DistrictCode: String,
        DistrictName: String,
        GHNSupport: Number,
        TTCSupport: Number,
        VNPTSupport: Number,
        ViettelPostSupport: Number,
        ShipChungSupport: Number,
        GHNDistrictCode: String,
        ViettelPostDistrictCode: String,
        ShipChungDistrictCode: String
	}
});

var Province = module.exports = mongoose.model('province', ProvinceSchema);

module.exports.getAllProvince = function(callback){
    Province.find(callback);
}

