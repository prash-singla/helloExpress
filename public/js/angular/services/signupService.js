helloExpress.service('SignupService', function($http) {
  this.signup = function(user) {
    return $http({
      method: 'post',
      url: '/signup',
      data: user
    });
  }
})
