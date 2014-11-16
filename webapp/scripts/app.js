'use strict';

var app = angular.module('bayesImpactTrafficking', [
	'ui.router',
	'ngAnimate',
  'd3',
  'DataParser',
]);

// routing
app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
      .state("cities", {
          url: "/cities",
          controller: 'citiesCtrl',
          templateUrl: 'views/cities.html'
      })
      .state('clusters', {
        url: '/clusters',
        controller: 'clusterCtrl',
        templateUrl: 'views/clusters.html'
      })

  $urlRouterProvider.otherwise("/crimes");
});
