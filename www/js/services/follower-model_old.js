'use strict';

angular.module('docman.follower-model', [])

.service('Followers', function($q, Funds,Auth,Follower,Users, Loading) {

  /**
   * get all followers
   * @param  uid
   * @return promise
   */

  this.getAll = function() {
    var userEmail=Auth.getEmail();
    var promise = firebase.database().ref('/followers')
      .orderByChild('email')
      .once('value').then(function(snapshot) {
        var followers = [];
        snapshot.forEach(function(data) {
          console.log("KEY is:"+data.key);
          var info = data.val();
          info.id= data.key;
          if(info.active!=3) {
          info.date = new Date(info.date)
          var currFollow=new Follower(info);
         

          if(currFollow.email==userEmail)
          { 
            
                  if(info.active==1)
                  {

                    Funds.getFundsByUser(info.uid).then(function(funds){
                  
               
              currFollow.funds=funds
             
      

             });
                  }

                
              followers.push(currFollow);

        }

      }
        });
        return $q.resolve(followers);
      });

    return Loading.progress(promise); 

  }

  

})

.factory('Follower', function( Loading) {

  function Follower (info) {

 
    this.userName="";
    this.funds=[];
    this.id = (info && info.id) || null;
    this.uid = (info && info.uid) || null;
    this.email = (info && info.email) || '';

    //0 nothing set yet 1 accepted 2 declined NOT ACCURATE ANYMORE
    this.active = (info && info.active) || 0;
    this.activities = (info && info.activities) || 0;
    this.date = (info && info.date) || (new Date());

    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    this.date_label = this.date.toLocaleDateString("en-US", options);  
 
  }

  Follower.prototype.delete=function()
  {
      var ref = firebase.database().ref('/followers').child(this.id);
      ref.remove();

  }

  Follower.prototype.save = function() {

    var ref = firebase.database().ref('/followers');

    if (this.id) {
      ref = ref.child(this.id);
    } else {
      ref = ref.push();
      this.id = ref.key;
    }

    var promise = ref.set({
      uid: this.uid,
      email: this.email,
      active: this.active,
      activities: this.activities,
      date: this.date.getTime(),
    });

    return Loading.progress(promise);
  }

  return Follower;

})
