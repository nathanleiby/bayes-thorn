'use strict';

app.controller('clusterCtrl', function($scope, DataParser){
  DataParser.readFile('data/links_trim.csv').then(function(results) {
    var points = _.map(results, function(line, i) {
      return {
        endPoints: [
          new google.maps.LatLng(line.lat1, line.lng1),
          new google.maps.LatLng(line.lat2, line.lng2),
        ],
        weight: 10 * Number(line.weight)
      }
    });

    function initialize(pointVals) {
      var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(39.8282, -98.5795),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

      _.each(pointVals, function(point) {
        var line = new google.maps.Polyline({
          path: point.endPoints,
          geodesic: true,
          strokeColor: '#FCFF00',
          strokeOpacity: 0.7,
          strokeWeight: point.weight
        });
        line.setMap(map);
      });

      // Chloropleth (states with colors)
      var polys = [];
      jQuery.get("data/states.xml", {}, function(data) {
        jQuery(data).find("state").each(function() {
          console.log("state", this)
          var colour = this.getAttribute('colour');
          var points = this.getElementsByTagName("point");
          var pts = [];
          for (var i = 0; i < points.length; i++) {
            pts[i] = new google.maps.LatLng(parseFloat(points[i].getAttribute("lat")), parseFloat(points[i].getAttribute("lng")));
          }
          var poly = new google.maps.Polygon({
            paths: pts,
            strokeColor: '#000000',
            strokeOpacity: 1,
            strokeWeight: .3,
            fillColor: colour,
            fillOpacity: 0.35
          });
          polys.push(poly);
          poly.setMap(map);
        });
      });

    }
    initialize(points);
  });
})
