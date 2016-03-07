angular.module('waitStaffApp', ['ngMessages'])
	.controller('waitStaffCtrl', function($scope){

		var mealData = [];

		// Submit only occurs if the form is valid
		$scope.submit = function(){
			mealData.push({
				"mealPrice": $scope.mealPrice, 
				"taxRate": $scope.taxRate, 
				"tipPcnt": $scope.tipPcnt});
			
			console.log(mealData);

			// Clear form
			$scope.mealPrice = "";
			$scope.taxRate = "";
			$scope.tipPcnt = "";

			$scope.detailsForm.$setPristine();
			$scope.detailsForm.$setUntouched();

			// Call other functions
			customerCharges();
		};

		customerCharges = function(){
			var thisMeal = mealData[mealData.length - 1];
			$scope.custSubTotal = thisMeal.mealPrice * 
				(1 + thisMeal.taxRate/100);

			$scope.custTip = thisMeal.mealPrice * thisMeal.tipPcnt/100;

			$scope.custTotal = $scope.custSubTotal + $scope.custTip;

		};
	});