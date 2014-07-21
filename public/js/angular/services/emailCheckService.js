helloExpress.service('EmailCheckService',function($http) {
  this.exists = function(email) {
    return $http({
      method:'get',
      url: '/emailcheck/'+email,
    });
  }
})
