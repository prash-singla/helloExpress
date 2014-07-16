var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

ReqsEventSchema = new Schema({
  event: {type: ObjectId, ref: 'Event'},
  user: {type: ObjectId, ref: 'User'},
  status: {type: Boolean},
  created_at: {type: Date, default: Date.now}
});

mongoose.model('ReqsEvent', ReqsEventSchema);
