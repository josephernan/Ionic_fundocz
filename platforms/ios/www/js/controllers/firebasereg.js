'use strict';

angular.module('docman.firereg', [])

.controller('FireRegCTRL', function ($scope,fireUsers) {

$scope.email="";
$scope.password="";
$scope.passwordveri="";
$scope.count=0;

$scope.createUser=function()
{
	 
	
	firebase.auth().createUserWithEmailAndPassword($scope.email,$scope.password).then(function(newuser){newuser.sendEmailVerification();$scope.registerStatus="email sent"; $scope.$digest()},function(error){
		$scope.$apply(function(){
	$scope.registerStatus=error.message;
});
		
	});
  

}


})
