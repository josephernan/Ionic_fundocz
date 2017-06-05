'use strict';

/**
 * @ngdoc function
 * @name docmanWebApp.controller:FollowersCtrl
 * @description
 * # FollowersCtrl
 * Controller of the docmanWebApp
 */
angular.module('docman.confirmfollowers', [])
  .controller('ConfirmFollowersCtrl', function ($scope,$state, Followers, Users,Follower) {


  	$scope.termdec=function()
    {
  		  Followers.accInvite.active=2;
		    Followers.save(Followers.accInvite);
		    Followers.getAll().then(function(followers)
        {
		      $scope.followers = followers;
         });

  	};

    //GO TO CONFIRM SCREEN TO COMPLETE
    $scope.termacpt=function(){
      Followers.accInvite.active=1;
		    Followers.save(Followers.accInvite);
		     Followers.getAll().then(function(followers)
         {
		      $scope.followers = followers;
    });
    };

    //COMPLETE ACCEPT
    $scope.termconfirm=function(){
         Followers.accInvite.active=true;
           Followers.accInvite.activities=1;
		    Followers.save(Followers.accInvite);
		     Followers.getAll().then(function(followers){
		      $scope.followers = followers;
    });

   	};

   	$scope.changeState=function(aTarget)
   	{
   		if (aTarget!=" ") 
   		 	$state.go(aTarget);
   	}

   	$scope.updateFollow=function()
   	{


   	}

    Followers.getAll().then(function(followers){
      $scope.followers = followers;
    });





  })