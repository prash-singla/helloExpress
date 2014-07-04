helloExpress = angular.module('helloExpress',['ngCookies','ngResource','ngRoute'])
  .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/',{templateUrl: 'views/home.html'})
      .when('/signup',{templateUrl: 'views/signup.html'})
      .otherwise({rediredtTo: '/'});
  }]);
