helloExpress.controller('MatchCtrl', function($scope, MatchService, EmailCheckService) {

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
})
