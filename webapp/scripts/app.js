'use strict';

var app = angular.module('oakCrimeApp', [
	'ui.router',
	'ngAnimate',
  'leaflet-directive',
  'd3',
  'DataParser',
]);

// routing
app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
      .state("crimes", {
          url: "/crimes",
          controller: 'CrimesCtrl',
          templateUrl: 'views/crimes.html'
      })
      .state("policeBeats", {
          url: "/policebeats",
          controller: 'PoliceBeatsCtrl',
          templateUrl: 'views/policebeats.html'
      })
      .state('awards', {
        url: '/awards',
        controller: 'AgesCtrl',
        templateUrl: 'views/awards.html'
      })
      .state('salaries', {
        url: '/salaries',
        templateUrl: 'views/salaries.html'
      })

  $urlRouterProvider.otherwise("/crimes");
});
