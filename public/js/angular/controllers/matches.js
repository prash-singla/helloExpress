helloExpress.controller('MatchesCtrl', function($scope, $location, MatchService, SessionService, ResourceService) {

  $scope.city_selected = null; //city selected to filter matches by city
  $scope.categories_selected = [];
  $scope.matches = [];
  $scope.offset = 0; //offset to fetch matches from db sent as req param.
  $scope.scrollLoadDisable = false; 
  $scope.last_offset = null;
  /*
   * getting all matches from server
   */
  $scope.loadMatches = function() {
    console.log('loading matches')
    if($scope.checkSameOffset()) return ;
    MatchService.getAll($scope.offset, function(data, status) {
      if (status != 200)
        return console.log('Something went wrong status code is' + status);
      $scope.incrementOffset(data.length);
      $scope.appendMatches(data);
      $scope.checkEndData(data);
    });
  }

  $scope.checkSameOffset = function() {
    if(!$scope.last_offset) {
      $scope.last_offset = $scope.offset;
      return false;
    }
    if($scope.last_offset == $scope.offset) return true;
    $scope.last_offset = $scope.offset;
    return false;
  }

  $scope.appendMatches = function(matches) {
    // $scope.matches.length == 0 ? $scope.matches = matches : $scope.matches.concat(matches);
    console.log('before appending-' + $scope.matches.length)
    if ($scope.matches.length == 0)
      $scope.matches = matches;
    else
      $scope.matches = $scope.matches.concat(matches);
    console.log('after appending-' + $scope.matches.length)

  }
  
  $scope.incrementOffset = function(toAdd) {
    $scope.offset += toAdd;
  }

  $scope.checkEndData = function(data) {
    if(data.length <10)
        $scope.scrollLoadDisable = true;
  }

  // $scope.loadMatches();
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

  $scope.toggleSelection = function(category) {
    var idx = $scope.categories_selected.indexOf(category);
    if(idx == -1)
      $scope.categories_selected.push(category);
    else
      $scope.categories_selected.splice(idx, 1);
  }

  $scope.onScrollload = function() {
    MatchService.getAll($scope.offset, function(data, status) {
      if (status != 200)
        return console.log('Something went wrong status code is' + status);
      $scope.matches.concat(data);
      $scope.offset += data.length;
    });
  }
})
