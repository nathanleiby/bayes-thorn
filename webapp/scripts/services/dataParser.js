'use strict';

angular.module('DataParser', [])
  .factory('DataParser', ['d3', '$q', function(d3, $q){
    return {
      readFile: function(url) {
        var defer = $q.defer();
        d3.d3()
          .then(function (d3) {
             d3.csv(url, function(data) {
               defer.resolve(data);
             });
           });
        return defer.promise;
      }
    };
  }]);
