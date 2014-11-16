'use strict';
app.controller('AgesCtrl', function($scope, DataParser){

	DataParser.readFile('data/ages.csv').then(function(results){
		var ages = _.map(results, function(award, i){
			return award
		});

    ages = _.sortBy(ages, function(ageVal){ return ageVal['Age']});

		// data for the donut directive
		$scope.ages = {
			_type : "terms",
			missing : 0,
			total : ages.length,
			other : 0,
			terms : []
		};

		$scope.ages.terms = _.map(ages, function(ageVal){
			return {
				age: Number(ageVal['Age']),
				count: Number(ageVal['Count'])
			}
		})
  });
})
