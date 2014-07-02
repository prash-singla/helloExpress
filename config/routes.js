var async = require('async')

var routes_path = '../routes/api'

var users = require(routes_path+'/users.js')
  , routes = require('../routes/index');
module.exports = function(app) {
  app.use('/', routes);
  app.use('/api/users',users);

}
