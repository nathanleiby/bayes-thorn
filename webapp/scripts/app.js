'use strict';

var app = angular.module('bayesImpactTrafficking', [
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
      .state('ages', {
        url: '/ages',
        controller: 'AgesCtrl',
        templateUrl: 'views/ages.html'
      })

  $urlRouterProvider.otherwise("/crimes");
});
