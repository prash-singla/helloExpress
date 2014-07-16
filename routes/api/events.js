
var events = require('../../app/controllers/events')
  , express = require('express')
  , router = express.Router();

router.route('/')

  .get(events.getAll)
  .post(events.create);

router.route('/:event_id')

  .get(events.get)
  .put(events.update)
  .delete(events.delete);

router.route('inCity/:city')
  //req for get events in city
  .get(events.getInCity);

module.exports = router;
