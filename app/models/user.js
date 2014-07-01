//User model

var mongoose = require('mongoose'),
  , Schema = mongoose.schema

var UserSchema = new Schema({
  name: {type:String,default: ''},
  email: {type:String,default:''},
  username:{type:String,default:''},
  provider:{type:String,default:''},
  hashed_password:{type:String,default:''},
  salt:{type:String,default:''} ,
  authToken:{type:String,default:''},
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
  }
})


















