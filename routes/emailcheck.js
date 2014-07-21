var express = require('express')
  , router = express.Router()
  , main = require('../app/controllers/main')

router.route('/:email')
.get(main.emailExists);

module.exports = router;
