'use strict';

angular.module('docman.fund-search', [])

  .controller('FundSearchCtrl', function ($scope, $state, $timeout, Users, Auth, Funds, Fund) {
    $scope.search = function() {
      $scope.funds = [];
      console.log(Auth.getEmail());
      Funds.getInvitess(Auth.getEmail()).then(function(invited){
      console.log(invited);
      console.log('invited');

          if (!$scope.search_key) return;
          Funds.getAllFunds().then(function(funds){
            $timeout(function(){
              funds.forEach(function(fund){
                if (fund.full_name.toLowerCase().includes($scope.search_key.toLowerCase())) {
                  invited.forEach(function(invit){
                     if(invit.uid == fund.uid){
                        $scope.funds.push(fund);

                      }
                  })

                }
              })
            })
          }).catch(function(){
          });
            });

    }

  })
