helloExpress.controller('MatchesCtrl', function($scope, $location, MatchService, SessionService, ResourceService) {

  $scope.city_selected = null; //city selected to filter matches by city

  /*
   * getting all matches from server
   */
  $scope.getAll = function() {
    MatchService.getAll(function(data, status) {
      if (status != 200)
        return console.log('Something went wrong status code is' + status);
      console.log(data);
      $scope.events = data;
    });
  }
  $scope.getAll();

  $scope.test = function() {
    ResourceService.getMatchCategories()
    .success(function(data, status) {
      console.log(data);
      $scope.categories = data;
      alert("avnesh");
    })
    .error(function(err, status) {
      console.log("error avnesh");
      alert("error");
    })
  }
  $scope.test();

})
