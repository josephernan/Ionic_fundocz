'use strict';

/**
 * @ngdoc function
 * @name docmanWebApp.controller:FollowersCtrl
 * @description
 * # FollowersCtrl
 * Controller of the docmanWebApp
 */
angular.module('docman.followers', [])
  .controller('FollowersCtrl', function ($scope,$state, Followers, Users,Follower,Offline) {

     $scope.termdec=function(aFollower){console.log("termdec");
 
      Followers.delete(aFollower);
      Followers.getAll().then(function(followers){
      $scope.followers = followers;
    });
   };

    $scope.termacpt=function(aInivte){
      Followers.accInvite=aInivte;
    };

    $scope.termconfirm=function(){
      console.log("termacptconfirm");
    };
   
    Followers.getAll().then(function(followers){
      $scope.followers = followers;
      console.log("Followers:"+ JSON.stringify($scope.followers));

    });

    Followers.getAlluser().then(function(alluser){
      $scope.usercustom = alluser;
      console.log("Followers:"+ JSON.stringify($scope.usercustom));

    });

    $scope.changeState=function(aTarget)
    {
        if (typeof aTarget !== 'undefined') 
            $state.go(aTarget);
    }

    $scope.checkFollowers = function() {
      $scope.followers.forEach(function(follower){
        follower.checked = $scope.checkedAll;
      })
    }

    $scope.openPopup = function (size) {

      // show popup
      var modalInstance = $uibModal.open({
        templateUrl: 'invite-dialog.html',
        controller: 'InviteCtrl',
        resolve: {
          ui: function () {
            return $scope.ui;
          }
        }
      });

      // result
      modalInstance.result.then(function (emails) {
        
        if (emails.length == 0) return;

        emails.forEach(function(email){
          var follower = new Follower({email:email});
          follower.save().then(function(){
            for(var key in $scope.followers) {
              if ($scope.followers[key].email == email) return;
            }
            $scope.followers.push(follower);
          });
        });      

      });
      
    };
    
  });

