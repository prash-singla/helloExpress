'use strict';

var helloExpress = angular.module('helloExpress',['ngRoute','infinite-scroll'])
  .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {

    $routeProvider
      .when('/matches',{
        templateUrl: 'js/angular/templates/matches/matches.html',
        controller: 'MatchesCtrl'
      })
      .when('/matches/new',{
       templateUrl: 'js/angular/templates/matches/create.html',
       controller: 'MatchNewCtrl'
      })
      .when('/signin',{
        templateUrl: 'js/angular/templates/signin.html',
        controller: 'LoginCtrl'
      })
      .when('/home',{templateUrl: 'js/angular/templates/home.html'})
      .when('/signup',{
        templateUrl: 'js/angular/templates/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/',{
        templateUrl: 'js/angular/templates/main.html',
        controller: 'MainCtrl'
      })
      .when('/matches/:match',{
        templateUrl: 'js/angular/templates/matches/match.html',
        controller: 'MatchCtrl'
      })
      .otherwise({rediredtTo: '/'});
  }]);
