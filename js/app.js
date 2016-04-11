angular.module('waitStaffApp', ['ngMessages', 'ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'home.html',
			controller: 'HomeCtrl'
		})
		.when('/new-meal', {
			templateUrl: 'new-meal.html',
			controller: 'MealCtrl'
		})
		.when('/my-earnings', {
			templateUrl: 'my-earnings.html',
			controller: 'EarningsCtrl'
		})
		.when('/error', {
			function($location){
				$location.path('/');
			}
		})
		.otherwise('/error');
	}])
	.controller('waitStaffCtrl', function($scope, $timeout){

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
			$scope.custSubTotal = "0";
			$scope.custTip = "0";
			$scope.custTotal = "0";

			$scope.earningsTip = "0";
			$scope.earningsCount = "0";
			$scope.earningsAvgTip = "0";

			clearForm();
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
		$scope.init = function(){
			$timeout(function() {
				$scope.reset();
			}, 0);
		};
	})
	.controller('HomeCtrl', function($scope){

	})
	.controller('MealCtrl', function($scope){

	})
	.controller('EarningsCtrl', function($scope){

	});