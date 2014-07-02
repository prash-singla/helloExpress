require('./../../app/models/user');

var users = require('../../app/controllers/users')
var express = require('express');
var router = express.Router();

router.route('/')

  //Getting all users if  url is /api
  .get(users.getAll)
  //Creating new user if url is /api
  .post(users.create);

router.route('/:user_id')

  //getting a single user with if url is /:user_id
  .get(users.get)
  //update a user with id if url is /:user_id
  .put(users.update)
  //remove a user form DB if url is /:user_id
  .delete(users.delete);

module.exports = router;
