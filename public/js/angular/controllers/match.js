helloExpress.controller('MatchCtrl', function($scope, $routeParams, MatchService, EmailCheckService, ResourceService) {

 

  /*
   * get a particular match details
   */
  $scope.get = function(match_id) {
    MatchService.get(match_id)
    .success(function(data, status) {
      $scope.match = data;
    })
    .error(function(err, status) {
      console.log(err);
    })
  }

  /*
   * init function for any initialisation
   * required
   */
  $scope.init = function() {

    //getting match object from server
    $scope.get($routeParams.match);
  }

})
