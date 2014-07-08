var async = require('async')

var routes_path = '../routes/api'

var users = require(routes_path+'/users')
  , routes = require('../routes/index')
  , signup = require(routes_path+'/signup')
  , mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Token = mongoose.model('Token')
  , auth = require('./middleware/authentication');



module.exports = function(app, passport, config) {
  /**
   * setting token object in req object
   * if req contains token as req param
   */

  app.all('/api/*', function(req, res, next) {
    req.token = req.headers.access_token? req.headers.access_token : null;
    if(req.token == null) {
      res.status(401);
      res.send({message:'Please Sign in.'})
    }
    next();
  });
  app.all('/api/*',auth.verifyToken);
  app.all('/session/logout',function(req, res, next) {
    req.token = req.headers.access_token? req.headers.access_token : null;
    next();
  });
  app.use('/', routes);

  //passing req for signup to 'users ' router
  app.use('/signup',signup);

  //all requests for crud operation will come through this url
  //using 'auth' function as middleware for authentication
  //and then using 'users' which is express.router object
  app.use('/api/users', users);

  //handling request for signin using passportjs
  app.post('/session/signin', passport.authenticate('local',{session: false}), function(req, res) {
    if(req.user) {
      var user = User.findOne({email: req.user.email}, function(err, user) {
        if(err) next(err);
        user.createUserToken(function(err, authToken) {
          if(err) res.json({error: err.message });
          else res.json({token: authToken})
        });
      });
    }
    else res.json({error: 'AuthError'});
  });

  //handling requrest for logout
  app.get('/session/logout', function(req, res) {
    req.logout();
    if(req.token) {
      var decoded = User.decode(req.token, config.tkSecret)
      if(decoded) {
        User.findOne({email: decoded}, function(err, user) {
          if(err) res.send({error: 'Invalid token, Sign in again'});
          user.authToken = null
          user.save(function(err, user) {
            if(err){message:'Issue in logging out'}
            res.status(200);
            res.send({message:"Successfully logged out"});
          });
        });
      }
    }
  });

  //middleware for authentication
}
