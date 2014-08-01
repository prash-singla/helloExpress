helloExpress.controller('MatchesCtrl', function($scope, $location, MatchService, SessionService, ResourceService) {

  $scope.city_selected = null; //city selected to filter matches by city
  $scope.categories_selected = [];
  $scope.matches = [];
  $scope.offset = 0; //offset to fetch matches from db sent as req param.
  $scope.scrollLoadDisable = false;
  $scope.last_offset = null;
  $scope.dates= [];
  /*
   * getting all matches from server
   */
  $scope.loadMatches = function() {
    console.log('loading matches')
    if($scope.checkSameOffset()) return ;
    MatchService.getFromToday($scope.offset, function(data, status) {
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
    if ($scope.matches.length == 0)
      $scope.matches = matches;
    else
      $scope.matches = $scope.matches.concat(matches);
  }

  $scope.incrementOffset = function(toAdd) {
    $scope.offset += toAdd;
  }

  $scope.checkEndData = function(data) {
    if(data.length < 5)
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
  /*
   * toggle the category selected
   * by user for matches
   */
  $scope.toggleSelection = function(category) {
    var idx = $scope.categories_selected.indexOf(category);
    if(idx == -1)
      $scope.categories_selected.push(category);
    else
      $scope.categories_selected.splice(idx, 1);
  }

  /*
   * load the matches on
   * scroll
   */
  $scope.onScrollload = function() {
    MatchService.getAll($scope.offset, function(data, status) {
      if (status != 200)
        return console.log('Something went wrong status code is' + status);
      $scope.matches.concat(data);
      $scope.offset += data.length;
    });
  }

  /*
   * make req for user to  play match
   */
  $scope.makePlayReq = function(match_id) {
    if(!$window.sessionStorage.token)
    MatchService.reqPlay(match_id, user_id)
    .success(function(data, status) {
      console.log('data & status' + data + status)
    })
    .error(function(data, status) {
      console.log('Something went wrong er is '+ data, +' & status'+status  );
    })
  }
})
