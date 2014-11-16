'use strict';

app.directive('lineChart', ['d3', function(d3){
	var margin = { top: 30, right: 25, bottom: 20, left: 30 },
		height = 500,
		radius = 4;

	// date helper
	var makeDate = function(toConvert){
		return new Date(toConvert + ', 2014')
	}

	// generate unique id from date
	var uniqueId = function(d){
		return 'text' + d.date.split(' ').join('');
	}

	return {
		restrict: 'A',
		scope: {
			val: '=',
			currentDay: '='
		},
		link: function(scope, elem, attrs){
      d3.d3().then(function(d3) {
        // use width from bootstrap class
        var width = $(elem[0]).width()

        // set up SVG
        var svg = d3.select(elem[0])
          .append('svg')
            .attr('width', width)
              .attr('height', height);

        // watch val attr for changes
        scope.$watch('val', function(dates){
          var tooltip = 0;
          if(!dates) return;

          // D3 LINE GRAPH
          // =============

          // create scale functions
          var minDate = d3.min(dates, function(d){
            var date = makeDate(d.date);
            date.setDate(date.getDate() - 2);
            return date
          })
          var maxDate = d3.max(dates, function(d){
            return new Date(makeDate(d.date) + 5)
          })

          var xScale = d3.time.scale()
            .domain([minDate, maxDate])
            .range([ margin.left, width - margin.right ])

          var yScale = d3.scale.linear()
            .domain([0, d3.max(dates, function(d){
              // scale for maximum number of crimes
              return d.numCrimes + 10
            })])
            .range([height - margin.bottom - 10, margin.top])

          // create axis functions
          var xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickPadding(8)
          var yAxis = d3.svg.axis().scale(yScale).orient('left').tickPadding(8)

          // create x axis elements inside group
          svg.append('g').attr({
            'class': 'axis',
            'transform': 'translate(' + [0, 500 - margin.top] + ')'
          }).call(xAxis)

          // create y axis elements inside group
          svg.append('g').attr({
            'class': 'axis',
            transform: 'translate(' + [margin.left, 0] + ')'
          }).call(yAxis)

          // create visualization
          svg.selectAll('circle')
            .data(dates)
            .enter()
              .append('circle')
              .attr({
                fill: '#a8ddb5',
                r: radius,
                opacity: 1,
                cx: function(d, i){
                  return xScale(makeDate(d.date))
                },
                cy: function(d){
                  return yScale(d.numCrimes)
                }
              })
              .on('click', function(d){
                // update scope in controller
                // =========================
                scope.$apply(function(){
                  scope.$parent.currentDay = d
                })

              })
              .on('mouseover', function(d, i){
                // enlarge radius
                d3.select(this)
                  .transition().duration(100)
                  .attr({
                    fill: '#43a2ca',
                  })

                if (tooltip) {
                  d3.select('#tooltip')
                    .text(function() {
                      return d.date + ', ' + d.numCrimes + ' crimes'
                    })
                } else {
                  tooltip = 1;
                  // add text box
                  svg.append('text')
                    .attr({
                      id: 'tooltip',
                      x: 50,
                      y: 50,
                    })
                    .text(function(){
                      // set text
                      return d.date + ', ' + d.numCrimes + ' crimes'
                    });
                  }
                })
              .on('mouseout', function(d, i){

                // scale back radius
                d3.select(this)
                  .transition().duration(100)
                  .attr({
                    opacity: .5,
                    fill: '#a8ddb5',
                  });

                // remove text box by its unique id
                d3.select('#' + uniqueId(d))
                  .transition()
                  .duration(0)
                  .remove()
              });
          });
      });
    }
  }
}]);
