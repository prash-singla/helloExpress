helloExpress.controller('MainCtrl', function($scope, $location, MatchService, SessionService) {

  $scope.logout = function() {
    SessionService.delete();
  }
})