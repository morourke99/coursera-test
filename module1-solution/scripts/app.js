(function(){
	'use strict';

	angular.module('LunchCheck', [])

	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope){
		$scope.inputValue = "";

		$scope.checkInput = function() {
			$scope.message = "";
			
			if ($scope.inputValue) {
				var arr = $scope.inputValue.split(',');
				var filtered = arr.filter(function(item){
					return item.trim() != ''; 
				});
				filtered.length > 3 ? $scope.message = "Too much!" : $scope.message = "Enjoy!";
			} else {
				$scope.message = "Please enter data first.";
			}

		}
	}
})();