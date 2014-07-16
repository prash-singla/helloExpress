
var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Token = mongoose.model('Token')


exports.verifyToken = function(req, res, next) {
  if(req.token) {
    var incomingToken = req.token
    var decoded = null;
    try{
       decoded = User.decode(incomingToken)
    }catch(err) {
      res.json(err);
    }
    //Looking up in db & if that email exist its a real user
    if(decoded) {
      console.log('passing on');
      User.findOne({email: decoded}, function(err, user) {
        if(err) res.json({error: 'Issue finding user.'})
        else {
          if(!(user.authToken) || Token.isExpired(user.authToken.created_at)) {
            res.status(401);
            res.json({error: 'Session Expired you need to log in again.'});
          }
          req.user = user;
          next();
        }
      });
    }
    else res.end(401)//res.json({error: 'Issue decoding incoming token'});
  }

}

//var auth = function(req, res, next) {
//  if(!req.isAuthenticated()) res.send(401);
//  else
//    {
//      console.log('authorized in auth method now verifying token');
//      next();
//    }
//}
