helloExpress.controller('MatchCtrl', function($scope, $routeParams,  MatchService, EmailCheckService) {

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

  /*
   * init funciton for any initialisation
   * required
   */
  $scope.init = function() {

    //getting match object from server
    $scope.get($routeParams.match);
  }

  $scope.init(); //initialising
})
