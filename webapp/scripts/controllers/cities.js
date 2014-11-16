'use strict';

app.controller('citiesCtrl', function($scope){
  DataParser.readFile('data/links.csv').then(function(results) {
    var points = _.map(results, function(line, i) {
      return {
        endPoints: [
          new google.maps.maps.LatLng(results['lat1'], results['lng1']),
          new google.maps.maps.LatLng(results['lat2'], results['lng2']),
        ],
        weight: results['weight']
      }
    });

    function initialize(pointVals) {
      var mapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(0, -180),
        mapTypeId: google.maps.MapTypeId.TERRAIN
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

      var flightPlanCoordinates = [
        new google.maps.LatLng(37.772323, -122.214897),
        new google.maps.LatLng(21.291982, -157.821856),
        new google.maps.LatLng(-18.142599, 178.431),
        new google.maps.LatLng(-27.46758, 153.027892)
      ];

      pointVals.foreach(function(point) {
        var line = new google.maps.PolyLines({
          path: point.endPoints,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        line.setMap(map);
      });
    }
    initialize(points);
  });
})

