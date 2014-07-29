helloExpress.service('ResourceService',['$http', function($http) {
  this.getMatchCategories = function(){
    return $http.get('matchesCategory.json');
  }
  this.getMatchesCities = function() {
    return $http.get('matchesCities.json');
  }
}]);
