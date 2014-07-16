helloExpress.controller('LoginCtrl', function($scope, $http, $window, SessionService) {

  $scope.credentials = {
    "email": $scope.email,
    "password": $scope.password
  }
  $scope.signIn = function() {
    console.log('Signing in with email'+$scope.email);
    SessionService.create({"email": $scope.email,"password": $scope.password})
    .success(function(data, status) {
      $window.sessionStorage.token =  data.token;
      console.log('sessionstorage token is'+$window.sessionStorage.token);
    })
    .error(function(err, status) {
    });
  }

  $scope.signOut = function() {
    SessionService.delete()
    .success(function(data, status) {
      //TODO
      $window.sessionStorage.token = null;
      console.log(data)
    })
    .error(function(err, staus) {
      //TODO
      console.log(err);
    });
  }
});
