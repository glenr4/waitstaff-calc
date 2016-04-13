// Notes from the course: "In this refactor, you will have to use $rootScope. While this is not a good way to build production code, it's important to learn these concepts before you move into handling data. Later in the course, you will learn about factories and services, which would be the ideal way to handle this data."

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
	.controller('HomeCtrl', function($scope){
		//
	})
	.controller('MealCtrl', function($scope, $rootScope, $timeout){
		// Submit only occurs if the form is valid
		$scope.submit = function(){
			$rootScope.mealData.push({
				"mealPrice": $scope.mealPrice, 
				"taxRate": $scope.taxRate, 
				"tipPcnt": $scope.tipPcnt});
			
			// Call other functions
			clearForm();
			customerCharges();
		};

		$scope.cancel = function(){
			clearForm();
		};

		customerCharges = function(){
			var thisMeal = $rootScope.mealData[$rootScope.mealData.length - 1];
			$scope.custSubTotal = thisMeal.mealPrice * (1 + thisMeal.taxRate/100);

			$scope.custTip = thisMeal.mealPrice * thisMeal.tipPcnt/100;
			$scope.custTotal = $scope.custSubTotal + $scope.custTip;
		};

		clearForm = function(){
			$scope.mealPrice = "";
			$scope.taxRate = "";
			$scope.tipPcnt = "";

			$scope.detailsForm.$setPristine();
			$scope.detailsForm.$setUntouched();
		};

		// Initialise form
		$scope.init= function(){
			$timeout(function() {
				clearForm();

				$scope.custSubTotal = 0;
				$scope.custTip = 0;
				$scope.custTotal = 0;				
			}, 0);
		};
	})
	.controller('EarningsCtrl', function($scope, $rootScope){
		earningsInfo = function(){
			$scope.earningsTip = 0;
			for (var i=0; i < $rootScope.mealData.length; i++){
				$scope.earningsTip = $scope.earningsTip + $rootScope.mealData[i].mealPrice * $rootScope.mealData[i].tipPcnt/100;
			};

			$scope.earningsCount = $rootScope.mealData.length;
			$scope.earningsAvgTip = $scope.earningsTip/$scope.earningsCount;
		};

		$scope.reset = function(){
			$scope.custSubTotal = "0";
			$scope.custTip = "0";
			$scope.custTotal = "0";

			$scope.earningsTip = "0";
			$scope.earningsCount = "0";
			$scope.earningsAvgTip = "0";

			$rootScope.mealData.length = 0;
		};

		// Update earnings
		earningsInfo();
	})
	.run(function($rootScope, $timeout){
		$rootScope.mealData = [];	
	});