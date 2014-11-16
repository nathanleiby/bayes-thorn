'use strict';

var app = angular.module('bayesImpactTrafficking', [
	'ui.router',
	'ngAnimate',
  'react',
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
      .state("cities", {
          url: "/cities",
          controller: 'citiesCtrl',
          templateUrl: 'views/cities.html'
      })
      .state('ages', {
        url: '/ages',
        controller: 'AgesCtrl',
        templateUrl: 'views/ages.html'
      })

  $urlRouterProvider.otherwise("/crimes");
});
