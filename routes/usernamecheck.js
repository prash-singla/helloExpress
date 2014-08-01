var express = require('express')
  , router = express.Router()
  , main = require('../app/controllers/main')

router.route('/:username')
.get(main.usernameExists);

module.exports = router;
