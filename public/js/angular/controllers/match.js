helloExpress.controller('MatchCtrl', function($scope, MatchService, EmailCheckService, ResourceService) {

  $scope.create = function() {
    MatchService.create($scope.match, function(data, status) {
      if(status!=201)
        console.error('Could not create match');
      console.log(data);
    })
  }

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
})
