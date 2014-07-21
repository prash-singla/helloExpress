
var matches = require('../../app/controllers/matches')
  , express = require('express')
  , router = express.Router();

router.route('/')

  .get(matches.getAll)
  .post(matches.create);

router.route('/:event_id')

  .get(matches.get)
  .put(matches.update)
  .delete(matches.delete);

router.route('inCity/:city')
  //req for get matches in city
  .get(matches.getInCity);

module.exports = router;
