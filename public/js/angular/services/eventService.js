helloExpress.service('EventService',['$http',function($http) {
  /*api to
   * get all events
   */
  this.getAll = function(cb) {
    var param = {}
    $http({
      method: 'get',
      url: 'api/events',
      data:param
    })
    .success(cb)
    .error(cb);
  }

  /*api to create
   * an event
   */
  this.create = function(event, cb) {
    var param = {
      "event": event
    }
    $http({
      method: 'post',
      url: 'api/events',
      data: param
    })
    .success(cb)
    .error(cb);
  }

  /*api to get
   * an event
   */
  this.get = function(id, cb) {
    var param = {}
    $http({
      method: 'get',
      url: 'api/events/'+id,
      data: param
    })
    .success(cb)
    .error(cb);
  }

  /*
   * api to update
   * an event
   */
  this.update = function(event, cb) {
    var param = {
      "event": event
    }
    $http({
      method: 'put',
      url: 'api/events/'+event.id,
      data: param
    })
    .success(cb)
    .error(cb);
  }

  /*
   * api to delete
   * an event
   */
  this.delete = function(id, event) {
    var param = {}
    $http({
      method: 'delete',
      url: 'api/events/'+id,
      data:param
    })
    .success(cb)
    .error(cb);
  }

}])
