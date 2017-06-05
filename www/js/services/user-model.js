angular.module('docman.user-model', [])

.service('Users', function($q, Loading, Auth,$rootScope,Offline) {

    var usersRef = firebase.database().ref('/users');


    this.checkIfExists = function(aUser) {

        if ($rootScope.online) {
            console.log("checking userinfo");
            usersRef.once("value", function(snapshot) {
                var a = snapshot.exists();

                if (!snapshot.child(aUser.uid).exists()) {
                    var uRef = firebase.database().ref('/users/' + aUser.uid);
                    uRef.set({
                        username: "",
                        email: aUser.email
                    });

                }

            });

        } else {



        }

    }


    this.getUser = function(id) {
        if ($rootScope.online) {
            var promise = firebase.database().ref('/users/' + id)
                .once('value').then(function(snapshot) {
                    var user = snapshot.val();
                    user.id = snapshot.key;
                    return $q.resolve(user);
                });

            return Loading.progress(promise);
        }
    }


    this.getUserName = function(id) {
        if ($rootScope.online) {
            var promise = firebase.database().ref('/users/' + id)
                .once('value').then(function(snapshot) {
                    console.log("got user");
                    console.log(snapshot.val().username);
                    var user = snapshot.val();
                    user.id = snapshot.key;
                    user.userName = snapshot.val().username;
                    console.log("res: " + user.username)
                    return $q.resolvew(user.username);
                });

            return Loading.progress(promise);
        } else {

        }
    }

    this.getInvites = function(email) {
        if ($rootScope.online) {
            var promise = firebase.database().ref('/followers')
                .orderByChild('email').equalTo(email)
                .once('value').then(function(snapshot) {
                    var invites = [];
                    snapshot.forEach(function(data) {
                        var info = data.val();
                        if (info.activities == 1) {
                            info.id = data.key;
                            info.date = new Date(info.date);
                            invites.push(info);
                        }
                    });
                    return $q.resolve(invites);
                });

            return Loading.progress(promise);
        } else {


        }
    }

    this.unfollow = function(uid) {

        if ($rootScope.online) {
            var promise = firebase.database().ref('/followers')
                .orderByChild('email').equalTo(Auth.getEmail())
                .once('value').then(function(snapshot) {
                    snapshot.forEach(function(data) {
                        if (data.val().uid == uid) {
                            return firebase.database().ref('/followers/' + data.key).update({
                                activities: 0
                            })
                        }
                    });
                });

            return Loading.progress(promise);
        } else {
            return q.resolve([]);
        }
    }

})