helloExpress.service('MatchService',['$http',function($http) {
  /*api to
   * get all matches
   */
  this.getAll = function(cb) {
    var param = {}
    $http({
      method: 'get',
      url: 'api/matches',
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

  /*api to get
   * an match
   */
  this.get = function(id) {
     return $http({
      method: 'get',
      url: 'api/matches/'+id,
    });
  }

  /*
   * api to update
   * an match
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
   * an match
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
  }

  /*
   * send req to
   * plat match
   */
  this.reqPlay = function(match_id, user_id)
  var param = {
    'match_id': match_id,
    'user_id': user_id
  }
  return $http({
    method: 'post',
    url: '',
    data: param
  });

}])
