var express = require('express')
  , router = express.Router()
  , main = require('../app/controllers/main')

router.route('/:reset_token/:email')
  .get(main.verify_reset_url)
  .post(main.reset_password)

module.exports = router;
