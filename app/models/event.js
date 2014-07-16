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
  requests: [{
    type: ObjectId,
    ref: 'ReqsEvent'
  }],
  invitees: [{type: ObjectId, ref: 'User'}],
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
},{strict: true})

EventSchema.methods = {
   /*
    * get all reqs for an event
    */
   getReqs: function(next) {

   }
}

EventSchema.statics = {

  /*
   * add req to event
   */
  addReq: function(event, event_req, next) {
    Event.update({_id: event.id},{$push: {requests: event_req}},{safe: true, upsert: true}, function(err, event) {
      next(err, event);
    })
  }
}
mongoose.model('Event', EventSchema);
