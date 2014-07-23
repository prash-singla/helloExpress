<<<<<<< HEAD
helloExpress.controller('MatchCtrl', function($scope, $routeParams,  MatchService, EmailCheckService) {
=======
helloExpress.controller('MatchCtrl', function($scope, MatchService, EmailCheckService, ResourceService) {
>>>>>>> 766e76acd6e6319d41fb5e5da4d8857b2e90812d

  /*
   * post new match
   */
  $scope.create = function() {
    MatchService.create($scope.match, function(data, status) {
      //TODO make it robust
      if(status!=201)
        console.error('Could not create match');
      console.log(data);
    })
  }

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
   * check whether email
   * already exists or not.
   */
  $scope.checkEmail = function(email) {
    EmailCheckService.exists(email)
    .success(function(data, status) {
      if(data.message == 'not found') {
        console.log('email not found')
      }
      else console.log('email already exists');
    })
    .error(function(err, status) {
    })
  }

<<<<<<< HEAD
  /*
   * init funciton for any initialisation
   * required
   */
  $scope.init = function() {

    //getting match object from server
    $scope.get($routeParams.match);
  }

=======
  $scope.getMatchCategories = function() {
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
  $scope.getMatchCategories();
>>>>>>> 766e76acd6e6319d41fb5e5da4d8857b2e90812d
})
