var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , jwt = require('jwt-simple')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]

var TokenSchema = new Schema({
  token:{type: String},
  created_at: {
    type: Date,
    default: Date.now,
    set: function(val) {
      return undefinded;
    }
  },
  updated_at:{type:Date, default: Date.now}
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

/*
 * pre-save hook
 */

TokenSchema.pre('save', function(next) {
  if(!this.isNew) {
    var now = new Date();
    this.updated_at = now;
  }
  next();
})

mongoose.model('Token',TokenSchema);
