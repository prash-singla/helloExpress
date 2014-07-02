//User model

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , crypto = require('crypto')
  , oAuthTypes = ['github', 'twitter', 'facebook', 'google', 'linkedin']

var UserSchema = new Schema({
  name: {type:String,default: ''},
  email: {type:String,default:''},
  username:{type:String,default:''},
  provider:{type:String,default:''},
  hashed_password:{type:String,default:''},
  salt:{type:String,default:''} ,
  authToken:{type:String,default:''},
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  linkedin: {}
});

//virtuals

UserSchema
  .virtual('password')
  .set(function(password){
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function(){ return this._password})

  //validations

var validatePresenceOf = function(value){
  return value && value.length
}


UserSchema.path('name').validate(function(name){
  if(this.doesNotRequireValidation()) return true
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

UserSchema.path('hashed_password').validate(function (hashed_password) {
  if (this.doesNotRequireValidation()) return true
  return hashed_password.length
},'Password cant be blank')

//Pre Save hook

UserSchema.pre('save',function(next){
  if(!this.isNew) return next()

  if(!validatePresenceOf(this.password)
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
  }

}

mongoose.model('User',UserSchema);
