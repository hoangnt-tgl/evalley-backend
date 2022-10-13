var router = express.Router();
var Countrycode = require('../models/countrycode');
/* GET home page. */

router.get('/getall', function(req, res, next) {
    Countrycode.getAllCountrycode(function(err, codes) {
        if (err) {
            res.json(err);
        } else {
            res.json(codes);
        }
    });
});
module.exports = router;