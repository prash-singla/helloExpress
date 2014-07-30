var matches = require('../../app/controllers/matches')
  , express = require('express')
  , router = express.Router();

router.route('/:match_id')

  .get(matches.get)
  .put(matches.update)
  .delete(matches.delete);

module.exports = router;