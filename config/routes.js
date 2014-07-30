var async = require('async')

var routes_path = '../routes/api'

var users = require(routes_path+'/users')
  , matches = require(routes_path+'/matches')
  , match = require(routes_path+'/match')
  , signup = require(routes_path+'/signup')
  , emailCheck = require('../routes/emailcheck')
  , routes = require('../routes/index')
  , reset_pwd_router = require('../routes/reset_password')
  , mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Token = mongoose.model('Token')
  , auth = require('./middleware/authentication');



module.exports = function(app, passport, config) {
  /**
   * setting token object in req object
   * if req contains token as req param
   */

  app.all('/api/users', function(req, res, next) {
    req.token = (req.body && req.body.access_token)||(req.headers.access_token? req.headers.access_token : null)
    if(req.token == null) {
      res.status(401);
      res.send({message:'Please Sign in.'})
    }
    console.log("token verified");
    next();
  });
  app.all('/api/users', auth.verifyToken);
  app.all('/session/logout',function(req, res, next) {
    req.token = req.headers.access_token? req.headers.access_token : null;
    if(req.token == null) {
      res.status(401);
      res.send({message:'Please Sign in.'})
    }
    next();
  });


  app.use('/', routes);

  //passing req for signup to 'users ' router
  app.use('/signup',signup);

  //req to check whether email exists or not
  app.use('/emailcheck', emailCheck);
  /**all requests for crud operation will come through this url
   *using 'auth' function as middleware for authentication
   *and then using 'users' which is express.router object
   */
  app.use('/api/users', users);

  /**
   * request for matches
   */
  app.use('/api/matches', matches);

  /**
   * request for one particular match
   */
  app.use('/api/match', match);
  //hande request for changing password
  //when user click on the reset password link
  app.use('/reset', reset_pwd_router);

  //handling request for signin using passportjs
  app.post('/session/signin', passport.authenticate('local',{session: false}), function(req, res) {
    if(req.user) {
      var user = User.findOne({email: req.user.email}, function(err, user) {
        if(err) next(err);
        user.createUserToken(function(err, authToken) {
          if(err) res.json(err);
          else res.json({token: authToken})
        });
      });
    }
    else res.json({error: 'AuthError'});
  });

  //handling request for logout
  app.delete('/session/logout', function(req, res) {
    req.logout();
    if(req.token) {
      var decoded = User.decode(req.token, config.tkSecret)
      if(decoded) {
        User.findOne({email: User.emailFromToken(decoded)}, function(err, user) {
          if(err) return res.send({error: 'Invalid token, Sign in again'});
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

  //handle request when user asks for reset password link
  app.post('/forgot_password', function(req,res) {
    User.genResetToken(req.body.email, function(err, user) {
      if(err)
        res.json({error: 'Issue finding user.'});
      else {
        var reset_token = user.reset_token
        var resetUrl = 'http://localhost:8080/reset/'+reset_token+'/'+user.email
        //TODO send mail
        res.status(200)
        res.send({message: 'Check your mail', link: resetUrl});
      }
    });
  });

}

