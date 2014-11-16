'use strict';

app.controller('citiesCtrl', function($scope, DataParser){
  DataParser.readFile('data/links_trim.csv').then(function(results) {
    var points = _.map(results, function(line, i) {
      console.log(Number(line.weight))
      return {
        endPoints: [
          new google.maps.LatLng(line.lat1, line.lng1),
          new google.maps.LatLng(line.lat2, line.lng2),
        ],
        weight: 10 * Number(line.weight)
      }
    });

    console.log(points)
    function initialize(pointVals) {
      var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(39.8282, -98.5795),
        mapTypeId: google.maps.MapTypeId.TERRAIN
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

      _.each(pointVals, function(point) {
        var line = new google.maps.Polyline({
          path: point.endPoints,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 0.5,
          strokeWeight: point.weight
        });
        line.setMap(map);
      });
    }
    initialize(points);
  });
})

