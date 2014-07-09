var mongoose = require('mongoose')
  , Event = mongoose.model('Event')

exports.create = function(req, res) {
  var event = new Event(req.body)
  event.posted_by = req.user
  //TODO can do upload and save in case of cdn for image
  event.save(function(err, event) {
    if(err) res.json({error: err.message, name: err.name})
    else res.json(event)
  })
}

// req have event id
// get event from db
// and send as res
exports.get = function(req, res) {
}

//update event
exports.update = function(req, res) {

}

//get All
exports.getAll = function(req, res) {
}

//delete event req has id
exports.delete = function(req, res) {
}

//get events in city
exports.getInCity = function(req, res) {
}

//get events in city which are in particular date range
exports.gitInCityDateRange = function(req, res) {
}


