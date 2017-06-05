'use strict';

angular.module('docman.login', [])

.controller('LoginCtrl', function($scope, $state, Auth, Users, Offline) {

    $scope.email = localStorage.getItem("docman-email");
    $scope.verifed = true;




    $scope.login = function() {




        /// firebase.Auth().signIn($scope.email,$scope.password).catch(function(error){ $scope.loginStatus=error.message});
        firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function() {}, function(error) {

            $scope.$apply(function() {
                $scope.loginStatus = error.message
            });
        });


    };

    firebase.auth().onAuthStateChanged(

        function(user) {

            $scope.$apply(function() {
                $scope.verifed = true;
                $scope.loginStatus = ""
            });

            if (user) {
                $scope.email = user.email;
                Auth.setEmail(user.email);
                console.log("User Found K");
                console.log(user);
                console.log(user.emailVerified);
                if (user.emailVerified) {
                    console.log("login OK");
                    $state.go('app.invite');

                } else {
                    $scope.$apply(function() {
                        $scope.verifed = false;
                        $scope.loginStatus = ""
                    });
                    console.log("Email not Verifed");

                }

            } else {

                console.log("No user!")
            }
        });



    $scope.registerPage = function() {

        $state.go('register');
    }


})