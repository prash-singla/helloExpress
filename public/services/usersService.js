helloExpress.service('userService',['$http', function($http) {
  var urlBase = 'api/users';

  this.getUsers = function() {
    return $http.get(urlBase);
  }

  this.getUser = function(id) {
    return $http.get(urlBase +'/'+id);
  }

  this.signup = function(user) {
    return $http.post('/signup',user);
  }

  this.update = function(user) {
    return $http.put(urlBase+'/'+user.id,user);
  }

  this.delete= function(id) {
    return $http.delete(urlBase+'/'+id);
  }
}]);
