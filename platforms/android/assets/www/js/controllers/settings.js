'use strict';

angular.module('docman.settings', [])

	.controller('SettingsCtrl', function ($state,$scope,Auth) {
		$scope.logout=function()
		{

			console.log('logout');
			firebase.auth().signOut().then(function() {
	 				 console.log('Signed Out');
	 				  $state.go('login');
			}, function(error) {
					  console.error('Sign Out Error', error);
			});
		}

  })
