var express = require('express')
  , methodOverride = require('method-override')
  , pkg = require('../package.json')
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , path = require('path')
  , bodyParser = require('body-parser')
  , session = require('express-session');

var env = process.env.NODE_ENV || 'development'

module.exports = function(app, config, passport) {

  app.set('showStackError', true);

  app.use(favicon());
  app.use(session({secret: 'hello Express'}));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(methodOverride());

  app.use(require('less-middleware')(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public')));
}
