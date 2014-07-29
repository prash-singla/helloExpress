helloExpress.controller('MatchesCtrl', function($scope, $location, MatchService, SessionService, ResourceService) {

  $scope.city_selected = null; //city selected to filter matches by city
  $scope.category_selected = [];
  /*
   * getting all matches from server
   */
  $scope.getAll = function() {
    MatchService.getAll(function(data, status) {
      if (status != 200)
        return console.log('Something went wrong status code is' + status);
      $scope.events = data;
    });
  }

  $scope.getAll();

  /*
   * get all cities in which
   * matches will held.
   */
   $scope.getMatchesCities = function() {
    ResourceService.getMatchesCities()
    .success(function(data, status) {
      $scope.matches_cities = data.matches_cities;
    })
    .error(function(data, status) {
      console.log('err is ' + data + 'status is ' + status);
    })
   }

   $scope.getMatchesCities();

   $scope.getMatchCategories = function() {
    ResourceService.getMatchCategories()
    .success(function(data, status) {
      $scope.categories = data.categories;
    })
    .error(function(err, status) {
      console.log(err);
    })
  }

  $scope.getMatchCategories();
})
