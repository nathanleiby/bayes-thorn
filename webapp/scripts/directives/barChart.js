'use strict';

app.directive('barChart', ['d3', function(d3){
	var margin = { top: 40, right: 25, bottom: 20, left: 50 },
		height = 500 - margin.top - margin.bottom;

	return {
		restrict: 'A',
		scope: {
      'val': '='
    },
		link: function(scope, elem, attrs){
      d3.d3().then(function(d3) {
        var width = $(elem[0]).width() - margin.left - margin.right
        var svg = d3.select(elem[0])
          .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        scope.$watch('val', function(data) {
          if(!data) return;

          var xValues = [];
          var yValues = [];
          var x = d3.scale.ordinal()
            .domain(data.terms.map(function(d) { return d['age']; }))
            .rangeRoundBands([0, width], .1);

          var y = d3.scale.linear()
            .domain([0, d3.max(data.terms, function(d) { return d.count; })])
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .innerTickSize(0)
            .outerTickSize(0);

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .outerTickSize(0);

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis);

          svg.append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Number of Postings");

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
            .selectAll("text")
              .attr("display", "block");


          svg.selectAll(".bar")
                .data(data.terms)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("fill", "#7D7F7B")
                .attr("width", x.rangeBand())
                .attr("x", function(d) { return x(d['age']); })
                .attr("y", function(d) { return y(d.count); })
                .attr("height", function(d) { return height - y(d.count); })
                .on('mouseover', function(d, i) {
                  d3.select(this)
                    .transition().duration(100)
                    .attr({
                      fill: '#FCFF00',
                    })
                })
                .on('mouseout', function(d, i) {
                  d3.select(this)
                    .transition().duration(100)
                    .attr({
                      fill: '#7D7F7B'
                    })
                })
        });
      });
    }
  }
}]);
