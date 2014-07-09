var mongoose = require('mongoose')
  , User = mongoose.model('User')

exports.verify_reset_url = function(req, res) {
  var reset_token = req.params.reset_token
    , email = req.params.email
  User.findOne({reset_token: reset_token, email: email}, function(err, user) {
    if(err) {
      res.status(404)
      res.send({message: 'Issue finding user'})
    }
    if(!user) {
      res.status(404)
      res.json({error: 'Unknown user'})
    }
    var now = new Date()
    if(now.getTime()<user.reset_token_expires_millis) {
      res.status(200)
      res.send({email: user.email})
    }
    else {
      res.status(401)
      res.send({error: 'Link Expired.'})
    }
  })
}

exports.reset_password = function(req, res) {
  var email = req.body.email
    , password = req.body.password
    , confirm_password = req.body.confirm_password
    , reset_token = req.params.reset_token
  if(email && password && confirm_password && reset_token && (password == confirm_password)) {
    User.findOne({email: email, reset_token: reset_token}, function(err ,user) {
      if(err) {
        res.status(404)
        res.send({message: 'Issue finding user'})
      }
      else if(!user) {
        res.status(404)
        res.send({error: 'Unknown user email'+email})
      }
      else if(user) {
        user.setPassword(password, function(err) {
          if(err) {
            res.json({error: 'Issue while setting password.'})
          }
          user.save(function(err, user){
            if(err)
              res.json({error: err.message});
            else {
              res.status(200)
              res.json({message: 'Password successfully changed.'})
            }
          })
        })
      }
    })
  }//TODO Better error message.
  else res.json({error: 'Missing email, current, new, or confirmation password, OR, the confirmation does not match.'});
}
