var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

var MatchSchema = new Schema({
  title: {type: String,
    required: true,
    trim: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  where: {
    type: ObjectId,
    ref: 'Venue',
    required: true
  },
  when: {
    type: Date,
    required: true
  },
  posted_by: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    cdnUri: String,
    files: []
  },
  requests: [{
    type: ObjectId,
    ref: 'ReqsMatch'
  }],
  invitees: [{type: ObjectId, ref: 'User'}],
  created_at: {
    type: Date,
    default: Date.now,
    set: function(val) {
      return undefinded;
    }
  },
  updated_at: {type: Date, default: Date.now}
},{strict: true})


/*
 * pre-save hook
 */

MatchSchema.pre('save', function(next) {
    if(!this.isNew) {
      var now = new Date();
      this.updated_at = now;
    }
    next();
})

MatchSchema.methods = {
   /*
    * get all reqs for an match
    */
   getReqs: function(next) {

   }
}

MatchSchema.statics = {

  /*
   * add req to match
   */
  addReq: function(match, match_req, next) {
    Match.update({_id: match.id},{$push: {requests: match_req}},{safe: true, upsert: true}, function(err, match) {
      next(err, match);
    })
  }
}
mongoose.model('Match', MatchSchema);
