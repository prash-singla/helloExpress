var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

var EventSchema = new Schema({
  title: {type: String, required: true, trim: true, index: true},
  description: {type: String, trim: true},
  where: {type: ObjectId, ref: 'Venue', required: true},
  when: {type: Date, required: true},
  posted_by: {type: ObjectId, ref: 'User', required: true},
  image: {
    cdnUri: String,
    files: []
  },
  reqs_to_join: [{
    recieved_at: {type: Date, default: Date.now},
    user: {type: ObjectId, ref: 'User'}
  }],
  confirmed: [{type: ObjectId, ref: 'User'}],
  invitees: [{type: ObjectId, ref: 'User'}],
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
})

mongoose.model('Event', EventSchema);
