var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var VenueSchema = new Schema({
  place: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  country: {type: String, required: true},
  created_at: {
    type: Date,
    default: Date.now,
    set: function(val) {
      return undefinded;
    }
  },
  updated_at: {type: Date, default: Date.now}
})

/*
 * pre-save hook
 */
VenueSchema.pre('save', function(next) {
  if(!this.isNew) {
    var now = new Date();
    this.updated_at = now;
  }
  next();
});

VenueSchema.statics = {
}

mongoose.model('Venue', VenueSchema);
