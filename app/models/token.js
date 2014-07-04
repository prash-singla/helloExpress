var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , jwt = require('jwt-simple')
  , config = require('../../config/config')

var TokenSchema = new Schema({
  token:{type: String},
  created_at:{type:Date, default: Date.now}
})
TokenSchema.methods = {

  //check is token expired
  isExpired: function() {
    return (Date.now.getTime()- token.created_at.getTime()) > config.ttl
  }
}

mongoose.model('Token',TokenSchema);
