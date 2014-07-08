var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , jwt = require('jwt-simple')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]

var TokenSchema = new Schema({
  token:{type: String},
  created_at:{type:Date, default: Date.now}
})
TokenSchema.statics = {

  //check is token expired
  isExpired: function(created_at) {
    console.log('checking is token expired');
    var now = new Date();
    var ans = (now.getTime()- created_at.getTime()) > config.ttl
    console.log('isexpiered '+ans)
    return  ans
  }
}

mongoose.model('Token',TokenSchema);
