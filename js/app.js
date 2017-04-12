
var quizRApp = angular.module('quizR', ['ngRoute','ngResource', 'ngSanitize']);
quizRApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'QuickplayCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'DatabaseCtrl'
      }).
      when('/createProfile', {
        templateUrl: 'partials/createProfile.html',
        //controller: 'game-startCtrl'
      }).
      when('/profile', {
        templateUrl: 'partials/profile.html',
        //controller: 'game-startCtrl'
      }).
      when('/quizAnswers', {
        templateUrl: 'partials/quizAnswers.html',
        //controller: 'game-startCtrl'
      }).
      when('/quizQuestions', {
        templateUrl: 'partials/quizQuestions.html',
        //controller: 'QuickplayCtrl'
      }).
      when('/quizResults', {
        templateUrl: 'partials/quizResults.html',
        controller: 'ResultsCtrl'
      }).
      when('/settings', {
        templateUrl: 'partials/settings.html',
        controller: 'SettingsCtrl'
      }).
      when('/sidebar', {
        templateUrl: 'partials/sidebar.html',
        controller: 'SideCtrl'
      }).
      when('/quickplay', {
        templateUrl: 'partials/quickplay.html',
        controller: 'QuickplayCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
