helloExpress.controller('SignupCtrl', function($http, $scope,$location, $window, SignupService) {

  function isLoggedin() {
    if($window.sessionStorage.token)
      $location.url('/matches')
  }
  isLoggedin();
  $scope.signup = function(user) {
    SignupService.signup(user)
    .success(function(data, status) {
      $location.url('/signin');
    })
    .error(function(err, statius) {
      console.log(err);
    })
  }

})
