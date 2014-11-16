'use strict';

app.controller('clusterCtrl', function($scope, DataParser){
  DataParser.readFile('data/links_trim.csv').then(function(results) {

    // console.log(points)
    function initialize() {
      var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(39.8282, -98.5795),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

      // Chloropleth (states with colors)
      var polys = [];
      var cluster_to_color = {
        0 : '#f000000',
        1 : '#00f000',
        2 : '#0000f0',
        3 : '#700000',
        4 : '#007000',
        5 : '#000070',
        6 : '#700000',
        7 : '#007000',
        8 : '#000070',
        9 : '#000070',
        10 : '#f000000',
        11 : '#00f000',
        12 : '#0000f0',
        13 : '#700000',
        14 : '#007000',
        15 : '#000070',
        16 : '#700000',
      };

      jQuery.get("data/states_updated.json", {}, function(data) {
        // console.log("got data")
        for (var state_idx = 0; state_idx < data['states'].length; state_idx++) {
          var state = data['states'][state_idx];
          // console.log("state", state)
          var colour = state['colour'];
          var clusterId = state['cluster_id'];
          var points = state['point'];
          var pts = [];
          for (var i = 0; i < points.length; i++) {
            pts[i] = new google.maps.LatLng(parseFloat(points[i]["lat"]), parseFloat(points[i]["lng"]));
          }
          var fill_color = '#000000';
          if (cluster_to_color[clusterId]) {
            // console.log("clusterToColor");
            fill_color = cluster_to_color[clusterId];
          }
          var poly = new google.maps.Polygon({
            paths: pts,
            strokeColor: '#000000',
            strokeOpacity: 1,
            strokeWeight: .3,
            fillColor: fill_color,
            fillOpacity: 0.35
          });
          polys.push(poly);
          poly.setMap(map);
        }
      });

    }
    initialize();
  });
})

