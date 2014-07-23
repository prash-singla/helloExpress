helloExpress.service('resourceService',['$http', function($http) {
  this.getMatchCategories = function(){
    return $http.get('../../../matchesCategory.json');
  }
}]);
