helloExpress.controller('MatchCtrl', function($scope, MatchService) {

  $scope.create = function() {
    MatchService.create($scope.match, function(data, status) {
      if(status!=200)
        console.error('Could not create match');
      console.log(data);
    })
  }
})
