var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , notifier = {
service: 'postmark',
APN: false,
email: false, // true
actions: ['comment'],
key: 'POSTMARK_KEY',
parseAppId: 'PARSE_APP_ID',
parseApiKey: 'PARSE_MASTER_KEY'
  }

  module.exports = {
    development: {
      ttl:3600000,
      tkSecret: "@pp_$ecret",
      resetTokenExpiresMinutes: 30,
      db: 'mongodb://localhost/helloExpress_dev',
      root: rootPath,
      notifier: notifier,
      app: {
        name: 'helloExpress Demo'
      },
      facebook: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
      },
      github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
      },
      google: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      linkedin: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/linkedin/callback"
      }
    },
    test: {
      ttl:3600000,
      db: 'mongodb://localhost/helloExpress_test',
      tkSecret: "@pp_$ecret",
      resetTokenExpiresMinutes: 30,
      root: rootPath,
      notifier: notifier,
      app: {
        name: 'Nodejs Express Mongoose Demo'
      },
      facebook: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
      },
      github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
      },
      google: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      linkedin: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/linkedin/callback"
      }
    },
    production: {}
  }
