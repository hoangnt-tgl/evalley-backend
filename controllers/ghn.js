const axios = require("axios");
const SHOP_ID = parseInt(process.env.GHN_SHOP_ID);
const headers = {
	headers: {
		token: process.env.GHN_TOKEN,
	},
};
const fromDistrictId = 1451; // Quận 9
const GHN_API = "https://online-gateway.ghn.vn/shiip/public-api/";

module.exports.getListProvince = async (req, res) => {
	try {
		const response = await axios.get(`${GHN_API}master-data/province`, headers);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.getListDistrict = async (req, res) => {
	try {
		const provinceId = req.query.province_id;
		const response = await axios.get(`${GHN_API}master-data/district?province_id=${provinceId}`, headers);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.getListWard = async (req, res) => {
	try {
		const districtId = req.query.district_id;
		const response = await axios.get(`${GHN_API}master-data/ward?district_id=${districtId}`, headers);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.getListService = async (req, res) => {
	try {
		const toDistrictId = parseInt(req.query.to_district_id);
		headers.params = {
			shop_id: SHOP_ID,
			from_district: fromDistrictId,
			to_district: toDistrictId,
		};
		const response = await axios.get(`${GHN_API}v2/shipping-order/available-services`, headers);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json(error);
	}
};
