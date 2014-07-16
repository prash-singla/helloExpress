var mongoose = require('mongoose')
  , Event = mongoose.model('Event')
  , Venue =  mongoose.model('Venue')
  , moment = require("moment")
  , config = require('../../config/config')

moment().format();

exports.create = function(req, res) {
  var event = new Event(req.body)
  event.posted_by = req.user
  var when = moment("req.body.when",config.timeFormat)
  event.when = when.toDate();


  //create where object from req params
  var place = req.body.place
    , city = req.body.city
    , state = req.body.state
    , country = req.body.country

  var where = new Venue({place: place, city: city, state: state, country: country});
  where.save(function(err, where) {
    if(err) res.json({error: err.message})
      event.where = where
    //TODO can do upload and save in case of cdn for image
    event.save(function(err, event) {
      if(err) {
        where.remove(function(w_err, result) {
          res.json(err)
        });
      }else res.json(event)
    })
  })

}

// req have event id
// get event from db
// and send as res
exports.get = function(req, res) {
  Event.findById(req.params.event_id).populate('where')
  .exec(function(err, event) {
    if(err) res.json(err);
    res.json(event);
  })
}

//update event
exports.update = function(req, res) {
  Event.findOne({_id: req.params.event_id}, function(err, event) {
    if(err) res.json(err);
    event.set(req.body)

    var when = moment("req.body.when")
    console.log(when);
    event.when = when
    //update where object from req params
  var place = req.body.place
    , city = req.body.city
    , state = req.body.state
    , country = req.body.country

  var where = new({place: place, city: city, state: state, country: country})
  where.save(function(err, where) {
    if(err) res.json(err)
    event.where = where
    //TODO can do upload and save in case of cdn for image
    event.save(function(err, event) {
      if(err) res.json(err)
      else res.json(event)
    })
  })

  })

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
//exports.gitInCityDateRange = function(req, res) {
//}


