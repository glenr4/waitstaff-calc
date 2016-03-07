angular.module('waitStaffApp', ['ngMessages'])
	.controller('waitStaffCtrl', function($scope){

		$scope.submit = function(){

			console.log("Submitted");
		};


	});