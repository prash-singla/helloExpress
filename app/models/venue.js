var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var VenueSchema = new Schema({
  place: {type: String, require: true},
  city: {type: String, require: true},
  state: {type: String, require: true},
  country: {type: String, require: true}
})

mongoose.model('Venue', VenueSchema);
