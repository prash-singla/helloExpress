helloExpress.controller('MatchesCtrl', function($scope, $location, MatchService, SessionService) {

  $scope.getAll = function() {
    MatchService.getAll(function(data, status) {
      if (status != 200)
        return console.log('Something went wrong status code is' + status);
      console.log(data);
      $scope.events = data;
    });
  }
  $scope.getAll();

 
})