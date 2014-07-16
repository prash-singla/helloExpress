helloExpress.service('SessionService',['$http', function($http) {
  var urlBase = 'session'
  this.create = function(credentials) {
    console.log(credentials)
    return $http({
      method: 'post',
      url: urlBase+'/signin',
      data: credentials
    });
  }
  this.delete = function(access_token) {
    return $http.delete(urlBase+'/logout',{headers: {'access_token': access_token}});
  }
}])
