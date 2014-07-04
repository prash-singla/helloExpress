var async = require('async')

var routes_path = '../routes/api'

var users = require(routes_path+'/users')
  , routes = require('../routes/index')
  , signup = require(routes_path+'/signup');

var auth = function(req, res, next) {
    if(!req.isAuthenticated()) res.send(401);
    else
      next();
  }

module.exports = function(app,passport) {
  app.use('/', routes);

  //passing req for signup to 'users ' router
  app.use('/signup',signup);

  //all reqursts for crud operation will come through this url
  //using 'auth' function as middlware for autentication
  //and then using 'users' which is express.router object
  app.use('/api/users', auth, users);

  //handling request for signin using passportjs
  app.post('/session/signin', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
  });

  //handling requrest for logout
  app.get('/session/logout', function(req, res) {
    req.logout();
    res.status(200);
    res.send({message:"Successfully logged out"});
  });

  //middleware for authentication
}
