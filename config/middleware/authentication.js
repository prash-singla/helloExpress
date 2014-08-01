
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
      User.findOne({email: User.emailFromToken(decoded)}, function(err, user) {
        if(err) return res.json({error: 'Issue finding user.'})
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

/*
 * check the req method for /api/matches
 * if it isn't GET then user should be authenticated
 */
exports.chkReqMethodToken = function(req, res, next) {
  if(req.method === "GET" )
    next(req, res);
  else
    verifyToken(req, res, next);
}

//var auth = function(req, res, next) {
//  if(!req.isAuthenticated()) res.send(401);
//  else
//    {
//      console.log('authorized in auth method now verifying token');
//      next();
//    }
//}
