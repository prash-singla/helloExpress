var mongoose = require('mongoose')
  , User = mongoose.model('User')

/**
 * Create User
 */

exports.create = function(req,res) {
  var user = new User(req.body)
  user.save(function(err,user){
    console.log("loggin err "+err);
    if(err) res.json(err);
    res.json(user);
  });
}

/**
 * Find user by id
 */

exports.get = function(req,res) {
  User.findById(req.params.user_id,function(err, user){
    if(err) res.send({message: err.message, name: err})
    res.json(user);
  });
}

/**
 * Update user
 */

exports.update = function(req,res) {
  User.findOne({_id:req.params.user_id}, function(err,user){
    if(err) res.send(err);
    user.set(req.body);
    user.updated = Date.now()
    user.save(function(err, user) {
      if(err) res.send(err);
      res.json(user);
    });
  })
}

/**
 * Delete user
 */

exports.delete = function(req,res) {
  User.remove({_id:req.params.user_id}, function(err,result){
    if(err) res.send(err);
    res.json((result===1)?{msg:'successfully deleted'}:{msg:'error in deleting try again.'});
  })
}

/**
 * Get all users
 */

exports.getAll = function(req,res) {
  console.log('getting all users');
  User.find(function(err,users){
    if(err) res.send(err);
    res.json(users);
  });
}
