//User model

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , crypto = require('crypto')
  , oAuthTypes = ['github', 'twitter', 'facebook', 'google', 'linkedin']
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , token_secret = config.tkSecret
  , Token = mongoose.model('Token')
  , jwt = require('jwt-simple')
  , emailRegexp = /.+\@.+\..+/;


var UserSchema = new Schema({
  name: {
    type: String, default: '',
    trim:true,
    index:true
  },
  email: {
    type: String,
    default:'',
    required:true,
    trim:true,
    unique:true,
    match: emailRegexp
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  gender: {
    type: String,
    uppercase: true,
    'enum': ['M','F']
  },
  birthday: {
    type: Date,
  },
  matches_posted: [{type: ObjectId, ref: 'Match'}],
  matches_playing: [{type: ObjectId, ref: 'Match'}],
  req_matches: [{
    type: ObjectId,ref: 'ReqsMatch'
  }],
  //username:{type: String, unique:true, trim:true},
  provider:{type: String, default:'', trim:true},
  //TODO make required: true and gen random password in case
  hashed_password:{type: String},
  salt:{type: String, default:''} ,
  authToken:{type: Object},
  reset_token:{type: String},
  status: {
    type: String,
    lowercase: true,
    default: 'active',
    required: true,
    enum: ['active', 'unactive']
  },
  reset_token_expires_millis: {type: Number},
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  linkedin: {},
  last_login_at: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
    set: function(val) {
      return undefinded;
    }
  },
  updated_at: {  type: Date, default: Date.now  }
});

//virtuals

UserSchema
  .virtual('password')
  .set(function(password){
   // var min_err = new Error('Password must contain at least 8 character.s');
   // var max_err = new Error('Password can not have more than 16 characters.');
   // if(password.lenght<8?) return next(min_err);
   // if(password.length>16) return next(max_err);

    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function(){ return this._password})

  //validations

var validatePresenceOf = function(value){
  return value && value.length
}

var minLength = function(v) {
  return v && v.length<8;
};

var maxLength = function(v) {
  return v && v.length>16;
};

UserSchema.path('name').validate(function(name){
  if(this.doesNotRequireValidation() || this.status==='unactive') return true
  return name.length
},'Name can\'t be blank')

UserSchema.path('email').validate(function(email){
 if(this.doesNotRequireValidation()) return true
   return email.length
  },'email can\'t be blank')

UserSchema.path('email').validate(function(email,fn){
  var User = mongoose.model('User')
  if(this.doesNotRequireValidation()) fn(true)

  //check only it is a new user or email field is modified
  if(this.isNew || this.isModified('email')){
    User.find({email: email}).exec(function(err,users){
      fn(!err && users.length ===0)
    })
  }else fn(true)
},'Email already exists')
/*
  UserSchema.path('username').validate(function(username,fn){
    var User = mongoose.model('User')
    if(this.doesNotRequireValidation()) fn(true)

    //check only it is a new user or username field is modified
    if(this.isNew || this.isModified('username')){
      User.find({username: username}).exec(function(err,users){
        fn(!err && users.length ===0)
      })
    }else fn(true)
  },'Username already exists')

  UserSchema.path('username').validate(function(username){
    if(this.doesNotRequireValidation()) return true
    return username.length
  },'username cant be blank')
*/
UserSchema.path('hashed_password').validate(function (hashed_password) {
  if (this.doesNotRequireValidation() || this.status==='unactive') return true
  return hashed_password.length
},'Password cant be blank')

//Pre Save hook

UserSchema.pre('save',function(next){
  if(!this.isNew) {
    var now = new Date();
    this.updated_at = now;
  }

  if(!this.doesNotRequireValidation()&&!this.status==='unactive'&&minLength(this._password))
    {
      next(new Error('Password must contain at least 8 characters'));
    }
  if(!this.doesNotRequireValidation()&&!this.status==='unactive'&&maxLength(this._password))
    {
      next(new Error('Password can not have more than 16 characters'));
    }

  if(!validatePresenceOf(this.password)&&!this.status==='unactive'
     && !this.doesNotRequireValidation())
   next(new Error('Invalid Password'))
  else
    next()
})

//Methods


UserSchema.methods = {

  /**
   * Autheniticate - check if the passwords are the same
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function(plainText) {
    return this.encryptPassword(plainText)== this.hashed_password
  },

  /**
   * generate token
   */

  encode: function(data) {
    return jwt.encode(data, token_secret)
  },

  /**
   * create user token
   */
  createUserToken: function(next) {
    console.log('creating user token');
    this.last_login_at = new Date();
    var token_salt = Math.round((this.last_login_at.valueOf() * Math.random()))+'';
    var token = new Token({token:this.encode(this.email +token_salt )})
    this.authToken = token;
    this.save(function(err, user) {
      if(err) next(err);
      else next(false, user.authToken.token);
    })
  },

  /**
   * invalidate user token
   */

  invalidateUserToken: function() {
    this.token = null;
    this.save(function(err,user) {
      if(err) next(err);
      next(false,'removed');
    })
  },
  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random()))+''
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @ api public
   */

  encryptPassword: function(password) {
    if(!password) return ''
    var encrypted
    try {
      encrypted = crypto.createHmac('sha1',this.salt).update(password).digest('hex')
      return encrypted
    } catch(err) {
      return ''
    }
  },

  /**
   * Validation is not required if using OAuth
   */

  doesNotRequireValidation: function() {
    return ~oAuthTypes.indexOf(this.provider);
  },

  /*
   * setting the password
   * with encryption
   */
  setPassword: function(password, next) {
    try{
      this.salt = this.makeSalt();
      this.hashed_password = this.encryptPassword(password);
      next(false);
    }catch(err){
      next(err);
    }
  }
}

UserSchema.statics = {

  /*
   * parse the string
   * @params {String} decoded token
   * @output {String} email
   */
  emailFromToken: function(decoded_token) {
    var pattern = /\d+$/
    var match = decoded_token.match(pattern);
    var index = decoded_token.indexOf(match[0]);
    return decoded_token.substr(0,index);
  },

  /**
   * create user with unactive status
   */
  createUnactiveUsr: function(user, next) {
    user.status = 'unactive'
    user.save(next);
  },

  /**
   * decode token to authenticate user
   */
  decode: function(data) {
    return jwt.decode(data, token_secret)
  },

  /**
   * Generate Reset Token which will be
   * user to reset password.
   */
  genResetToken: function(email, next) {
    this.findOne({email: email}, function(err,  user){
      if(err) next(err);
      else if (user) {
        //Generate reset token and URL link also create expiry for reset token
        user.reset_token = crypto.randomBytes(32).toString('hex');
        var now = new Date();
        var expires = new Date(now.getTime() + (config.resetTokenExpiresMinutes*60*1000 )).getTime();
        user.reset_token_expires_millis = expires;
        user.save(function(err, user) {
          if(err) {
            //TODO send status code
            res.json({error: err.mesage})
          }
          else next(false,user);
        })
      }
      else
        //should send error code
        next(new Error('Sorry,No user with that email found'),null);
    });
  },
}

mongoose.model('User',UserSchema);
