helloExpress.controller('MainCtrl',function($scope, EventService) {

  $scope.getAll = function() {
    EventService.getAll(function(data, status) {
      if(status!=200)
        return  console.log('Something went wrong status code is'+ status);
      console.log(data);
      $scope.events = data;
    });
  }
  $scope.getAll();
})
