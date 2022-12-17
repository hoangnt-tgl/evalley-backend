var express = require('express');
var router = express.Router();
const {getListProvince, getListDistrict, getListWard, getListService} = require('../controllers/ghn');

router.get('/master-data/province', getListProvince);
router.get('/master-data/district', getListDistrict);
router.get('/master-data/ward', getListWard);
router.get('/available-services', getListService);

module.exports = router;