var express = require('express');
var router = express.Router();
const {getListProvince, getListDistrict, getListWard, getListService, calculateFee} = require('../controllers/ghn');

router.get('/master-data/province', getListProvince);
router.get('/master-data/district', getListDistrict);
router.get('/master-data/ward', getListWard);
router.get('/available-services', getListService);
router.post('/calculate-fee', calculateFee);
module.exports = router;