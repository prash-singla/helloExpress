var users = require('../../app/controllers/users')
  , express = require('express')
  , router = express.Router();

router.route('/')

  //req for signup @ url /signup
  .post(users.create);

module.exports = router;
