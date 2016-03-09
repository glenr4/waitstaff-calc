angular.module('waitStaffApp', ['ngMessages'])
	.controller('waitStaffCtrl', function($scope){

		var mealData = [];

		// Submit only occurs if the form is valid
		$scope.submit = function(){
			mealData.push({
				"mealPrice": $scope.mealPrice, 
				"taxRate": $scope.taxRate, 
				"tipPcnt": $scope.tipPcnt});
			
			// Call other functions
			clearForm();
			customerCharges();
			earningsInfo();
		};

		$scope.cancel = function(){
			clearForm();
		};

		$scope.reset = function(){
			$scope.custSubTotal = "";
			$scope.custTip = "";
			$scope.custTotal = "";

			$scope.earningsTip = "";
			$scope.earningsCount = "";
			$scope.earningsAvgTip = "";

			clearForm();
			console.log("reset");
		};

		customerCharges = function(){
			var thisMeal = mealData[mealData.length - 1];
			$scope.custSubTotal = thisMeal.mealPrice * (1 + thisMeal.taxRate/100);

			$scope.custTip = thisMeal.mealPrice * thisMeal.tipPcnt/100;
			$scope.custTotal = $scope.custSubTotal + $scope.custTip;
		};

		earningsInfo = function(){
			$scope.earningsTip = 0;
			for (var i=0; i < mealData.length; i++){
				$scope.earningsTip = $scope.earningsTip + mealData[i].mealPrice * mealData[i].tipPcnt/100;
			};

			$scope.earningsCount = mealData.length;
			$scope.earningsAvgTip = $scope.earningsTip/$scope.earningsCount;
		};

		clearForm = function(){
			// Clear form
			$scope.mealPrice = "";
			$scope.taxRate = "";
			$scope.tipPcnt = "";

			$scope.detailsForm.$setPristine();
			$scope.detailsForm.$setUntouched();
		};

		// Initialise Customer Charges and Earnings
		angular.element(document).ready(function(){
			// This runs but does not set the variables to $0.00?
			$scope.reset();
			console.log("ready");
		});
	});