angular.module('waitStaffApp', ['ngMessages'])
	.controller('waitStaffCtrl', function($scope){

		var mealData = [];

		// Submit only occurs if the form is valid
		$scope.submit = function(){
			mealData.push([$scope.mealPrice, $scope.taxRate, $scope.tipPcnt]);
			
			console.log(mealData);

			// Clear form
			$scope.mealPrice = "";
			$scope.taxRate = "";
			$scope.tipPcnt = "";

			$scope.detailsForm.$setPristine();
			$scope.detailsForm.$setUntouched();
		};


	});