helloExpress.service('MatchService',['$http',function($http) {
  /*api to
   * get all matches
   */
  this.getAll = function(offset, cb) {
    var param = {}
    $http({
      method: 'get',
      url: 'api/matches/'+offset,
      data:param
    })
    .success(cb)
    .error(cb);
  }

  /*api to create
   * an match
   */
  this.create = function(match, cb) {
    var param = {
      "match": match
    }
    $http({
      method: 'post',
      url: 'api/matches',
      data: param
    })
    .success(cb)
    .error(cb);
  }

  /*
   * api to get
   * a match
   */
  this.get = function(id) {
     return $http({
      method: 'get',
      url: 'api/matches/'+id,
    });
  }

  /*
   * api to update
   * a match
   */
  this.update = function(match, cb) {
    var param = {
      "match": match
    }
    $http({
      method: 'put',
      url: 'api/matches/'+match.id,
      data: param
    })
    .success(cb)
    .error(cb);
  }

  /*
   * api to delete
   * a match
   */
  this.delete = function(id, match) {
    var param = {}
    $http({
      method: 'delete',
      url: 'api/matches/'+id,
      data:param
    })
    .success(cb)
    .error(cb);
  },

  /*
   * send req for
   * playing match
   */
  this.reqPlay = function(match_id, user_id) {
  var param = {
    'match_id': match_id,
    'user_id': user_id
  }
  return $http({
    method: 'post',
    url: '',
    data: param
  });
  }
}])
