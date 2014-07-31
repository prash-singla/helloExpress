
var matches = require('../../app/controllers/matches')
  , express = require('express')
  , router = express.Router();

router.route('/')
  .post(matches.create);

router.route('inCity/:city')
  //req for get matches in city
  .get(matches.getInCity);

router.route('/:offset')
  .get(matches.getAll)

router.route('/fromToday/:offset')
  .get(matches.getFromToday)


module.exports = router;
