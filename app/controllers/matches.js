var mongoose = require('mongoose')
  , Match = mongoose.model('Match')
  , Venue =  mongoose.model('Venue')
  , User = mongoose.model('User')
  , moment = require("moment")
  , config = require('../../config/config')

moment().format();

/*
 * create a new event
 * @params {Object} req
 * @params {Object} res object
 */
exports.create = function(req, res) {
  var req_match = req.body.match
  var where = new Venue(req_match.where)
  where.save(function(err, where) {
    if(err) return res.json(err);
    var match = new Match({
      'title':req_match.title,
      'description': req_match.description,
      'category': req_match.category
    });
    match.where = where._id
    var when = (new Date(req_match.when))
    match.when = when
    if(req.user)
      match.posted_by = req.user._id
    else {
      if(!req_match.email) return res.json({error: 'email required'});
      var user = new User({'email': req_match.email})
      User.createUnactiveUsr(user, function(err, user) {
        if(err) return res.json(err);
        match.posted_by = user._id
        match.save(function(err, match) {
          if(err) {
            user.remove();
            return res.json(err);
          }
          res.statusCode = 201;
          res.json(match);
        })
      })
    }
  })
}


// req have match id
// get match from db
// and send as res
exports.get = function(req, res) {
  Match.findById(req.params.match_id).populate('where posted_by')
  .exec(function(err, match) {
    if(err) return res.json(err);
    res.json(match);
  })
}

//update match
exports.update = function(req, res) {
  Match.findOne({_id: req.params.match_id}, function(err, match) {
    if(err) res.json(err);
    match.set(req.body)

    var when = moment("req.body.when")
    console.log(when);
    match.when = when
    //update where object from req params
  var place = req.body.place
    , city = req.body.city
    , state = req.body.state
    , country = req.body.country

  var where = new({place: place, city: city, state: state, country: country})
  where.save(function(err, where) {
    if(err) res.json(err)
    match.where = where
    //TODO can do upload and save in case of cdn for image
    match.save(function(err, match) {
      if(err) res.json(err)
      else res.json(match)
    })
  })

  })

}

//get All
exports.getAll = function(req, res) {
  var offset = req.params.offset
  var todayDate = new Date()
  console.log('offset is '+offset);
  Match.find({"when": {"$gte": todayDate}})
  .sort({when: 'desc'})
  .skip(offset)
  .limit(5)
  .populate('where')
  .exec(function(err, matchs) {
    if(err) res.json(err);
    res.json(matchs);
  })
}

//delete match req has id
exports.delete = function(req, res) {
}

//get matchs in city
exports.getInCity = function(req, res) {
}

//get matchs in city which are in particular date range
//exports.gitInCityDateRange = function(req, res) {
//}


