'use strict';

angular.module('docman.follower-model', [])

.service('Followers', function($rootScope,$q, $state, Funds, Auth, Follower, Users, Loading, Offline) {

    /**
     * get all followers
     * @param  uid
     * @return promise
     */


    this.getAll = function() {

        if ($rootScope.online) {
            var userEmail = Auth.getEmail();
            console.log("Umail");
            console.log(userEmail);
            var promise = firebase.database().ref('/followers')
                .orderByChild('email')
                .once('value').then(function(snapshot) {
                    var followers = [];
                    var uids = [];

                    snapshot.forEach(function(data) {

                        var info = data.val();
                        info.id = data.key;
                        if (info.active != 3) {
                            info.date = new Date(info.date)
                            var currFollow = new Follower(info);
                            console.log(currFollow.email);
                            if (currFollow.email == userEmail) {

                                var oFound = false;
                                uids.forEach(function(oldid) {

                                    if (oldid == info.uid) {
                                        oFound = true;
                                       
                                    };

                                });
                                uids.push(info.uid);
                                if (info.active == 1) {

                                    Funds.getFundsByUser(info.uid).then(function(funds) 
                                    {

                                        console.log('getting funds friendo');
                                        currFollow.funds = funds;
                                    });
                                }

                                if (!oFound) {
                                    console.log("found invite");
                                    followers.push(currFollow);
                                }

                            }

                        }
                    });
                  //  followers.forEach(function(af){console.log('SF1');console.log(angular.toJson(af.funds))});
                    //Offline.saveFollowers(followers);

                    Offline.saveFollowers(followers);
                    return $q.resolve(followers)

                });

            return Loading.progress(promise);

        }
   else {
            var followers = Offline.getFollowers();
            console.log(followers);
            followers.forEach(function(cFund){if(cFund.active == 1){cFund.funds=Offline.getFundsByUser(cFund.uid)} });
        return $q.resolve(followers);
        } 
    }



    this.setInviteStatus=function(aInvite,aStatus)
    {
        if($rootScope.online)
        {

            if(aStatus)
            {
                var ref = firebase.database().ref('/followers').child(aInvite.id);
                ref.remove();

            }else
            {

                 var ref = firebase.database().ref('/followers');
            if (aInvite.id) {
                ref = ref.child(aInvite.id);
            } else {
                ref = ref.push();
                aInvite.id = ref.key;
            }

            var promise = ref.set({
                uid: aInvite.uid,
                email: aInvite.email,
                active: aInvite.active,
                activities: aInvite.activities,
                date: aInvite.date.getTime(),
            });

        return Loading.progress(promise);

            }


        }else

            Offline.setInviteStatus(aInvite.uid,aStatus);
        }
})

.factory('Follower', function(Loading) {

    function Follower(info) {


        this.userName = "";
        this.funds = [];
        this.id = (info && info.id) || null;
        this.uid = (info && info.uid) || null;
        this.email = (info && info.email) || '';

        //0 nothing set yet 1 accepted 2 declined NOT ACCURATE ANYMORE
        this.active = (info && info.active) || 0;
        this.activities = (info && info.activities) || 0;
        this.date = (info && info.date) || (new Date());

        var options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        this.date_label = this.date.toLocaleDateString("en-US", options);

    }

    return Follower;

})