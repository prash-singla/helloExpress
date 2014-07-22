helloExpress.service('SessionService',['$http', '$window', '$location', function($http, $window, $location) {
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
    return $http.delete(urlBase+'/logout')
    .success(function(data, status) {
      $window.sessionStorage.token = null;
      $location.url('/');
    })
    .error(function(err, status) {
      console.log(err);
    });
  }
}])
