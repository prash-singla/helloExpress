'use strict';

var helloExpress = angular.module('helloExpress',['ngRoute'])
  .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {

    $routeProvider
      .when('/events'
      ,{templateUrl: 'js/angular/templates/events.html'})
      .when('/signin',{
        templateUrl: 'js/angular/templates/signin.html'
      })
      .when('/home',{templateUrl: 'js/angular/templates/home.html'})
      .when('/signup',{templateUrl: 'js/angular/templates/signup.html'})
      .otherwise({rediredtTo: '/'});
  }]);