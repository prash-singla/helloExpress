helloExpress.controller('LoginCtrl', function($scope, $http, $window, SessionService) {

 
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

});
