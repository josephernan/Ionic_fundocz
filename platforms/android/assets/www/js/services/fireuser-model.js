
angular.module('docman.fireuser-model', [])

.service('fireUsers', function($q, Loading, Auth) {

  var usersRef = firebase.database().ref('/users');



  this.createUser=function(aEmail,aPassword)
  {
    //firebase.auth().sendEmailVerification();
    CreateError='';
 
   var promise=firebase.auth().createUserWithEmailAndPassword(aEmail,aPassword).catch(function(err){
    console.log(err.message);
    CreateError=err.message;
  }).then(function(newuser){

    //var user = snapshot.val();
    if(CreateError=="")
    {
      newuser.sendEmailVerification();
    }
   })
  
  return CreateError;
  
  }




  this.getUser = function(id) {

    var promise = firebase.database().ref('/users/' + id)
      .once('value').then(function(snapshot) {
        var user = snapshot.val();
        user.id = snapshot.key;
        return $q.resolve(user);
      });

    return Loading.progress(promise); 
  }


    this.getUserName = function(id) {

    var promise = firebase.database().ref('/users/' + id)
      .once('value').then(function(snapshot) {
        console.log("got user");
        console.log( snapshot.val().username);
        var user = snapshot.val();
        user.id = snapshot.key;
        user.userName= snapshot.val().username;
        console.log("res: " + user.username)
        return $q.resolvew(user.username);
      });

    return Loading.progress(promise); 
  }

  this.getInvites = function(email) {

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
  }

  this.unfollow = function(uid) {

    var promise = firebase.database().ref('/followers')
      .orderByChild('email').equalTo(Auth.getEmail())
      .once('value').then(function(snapshot){
        snapshot.forEach(function(data) {
          if (data.val().uid == uid) {
            return firebase.database().ref('/followers/' + data.key).update({activities: 0})
          }
        });
      });

    return Loading.progress(promise);
  }

})



