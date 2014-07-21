var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

ReqsMatchSchema = new Schema({
  match: {type: ObjectId, ref: 'Match'},
  user: {type: ObjectId, ref: 'User'},
  status: {type: Boolean},
  created_at: {
    type: Date,
    default: Date.now,
    set: function(val) {
      return undefinded;
    }
  },
  updated_at:{type:Date, default: Date.now}
});

/*
 * pre-save hook
 */

ReqsMatchSchema.pre('save', function(next) {
  if(!this.isNew) {
    var now = new Date();
    this.updated_at = now;
  }
  next();
})

mongoose.model('ReqsMatch', ReqsMatchSchema);
