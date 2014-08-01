'use strict';

var helloExpress = angular.module('helloExpress',['ngRoute','infinite-scroll'])
  .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {

    $routeProvider
      .when('/matches',{
        templateUrl: 'js/angular/templates/matches/matches.html',
        controller: 'MatchesCtrl',
        requireLogin: false

      })
      .when('/matches/new',{
       templateUrl: 'js/angular/templates/matches/create.html',
       controller: 'MatchNewCtrl',
       requireLogin: true
      })
      .when('/signin',{
        templateUrl: 'js/angular/templates/signin.html',
        controller: 'LoginCtrl',
        requireLogin: false

      })
      .when('/home',{templateUrl: 'js/angular/templates/home.html'})
      .when('/signup',{
        templateUrl: 'js/angular/templates/signup.html',
        controller: 'SignupCtrl',
        requireLogin: false
      })
      .when('/',{
        templateUrl: 'js/angular/templates/main.html',
        controller: 'MainCtrl',
        requireLogin: false
      })
      .when('/matches/:match',{
        templateUrl: 'js/angular/templates/matches/match.html',
        controller: 'MatchCtrl',
        requireLogin: false
      })
      .otherwise({rediredtTo: '/'});
  }])
.run(function ($rootScope, $route, $location, $window) {
    var routes = $route.routes;
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      var t = routes.toSource();
        var index = next.indexOf('/#')
        console.log('index is '+index)
        if(index === -1)
          return $location.path('');
        else next = next.substr(index+2)
        for (var k in routes) {
          if ( routes[k].hasOwnProperty('regexp') && routes[k].regexp.test(next) &&routes[k].requireLogin) {
            if($window.sessionStorage.token)
              return $location.path(next);
            else
              return $location.path('/signin')
          }
        }
        return $location.path(next)
    });
});
