
angular.module('docman.offline-model', [])
.run(function( Offline,Funds,$rootScope,$ionicPlatform,$cordovaDevice, $cordovaNetwork,$cordovaNetwork)
{




   document.addEventListener("deviceready", function () {

    

    //ONLINE OFFLINE DETECTION
    
     $rootScope.online=true;

    var type = $cordovaNetwork.getNetwork()

    var isOnline = $cordovaNetwork.isOnline()

    $rootScope.online=isOnline;

    var isOffline = $cordovaNetwork.isOffline()

    if(isOnline)
      Funds.getAllFunds();
    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var onlineState = networkState;
       $rootScope.online=true;
       console.log("nowONLINE");
       Funds.getAllFunds();
       Offline.syncFollowers();

    })

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      var offlineState = networkState;
      $rootScope.online=false;
       console.log("nowOFFLINE");
    })

  }, false);
})
.service('Offline', function($q, Fund, Loading,$injector) 

{

    var Followers;
    this.saveData = function(aType,aData)
    {
      console.log('saving data');
      if(typeof aData == 'string'|| typeof aType == 'string')
       window.localStorage.setItem(aType,aData);
    };


    this.retrieveData = function(aType)
    {
      return window.localStorage.getItem(aType);
    };


    this.saveUser= function(aUser)
    {
      this.saveData(aUser);
    };

   
    this.getUser= function()
    {
      var retUser = this.retrieveData("user");
      if(typeof retUser == 'undefined ')
        retUser = {};

      return retUser
    };

    //DOC FUNCTIONS
    this.saveQuarterDocs= function(aDocs)
    {
      this.saveData('qDocs',angular.toJson('qDocs',aDocs));
    }

    this.saveMonthDocs=function(mDocs,aDocs)
    {

      this.saveData('mDocs',angular.toJson('mDocs',aDocs));
    }

    this.saveAllDocs = function(aDocs)
    {
      this.saveData('aDocs',angular.toJson(aDocs));
    }

    this.getAllDocs = function()
    {
      var retArr = null;
      retArr = angular.fromJson(this.retrieveData('aDocs'));

      if(typeof retArr == 'undefined' ||retArr==null)   
        return[];
      return retArr;
    };

    this.getMonthDocs = function()
    {
        var retArr = null;
      retArr = angular.fromJson(this.retrieveData('mDocs'));

      if(typeof retArr == 'undefined' ||retArr==null)   
        return[];
      return retArr;
    };

    this.getQuarterDocs = function()
    {

      var retArr = null;
      retArr = angular.fromJson(this.retrieveData('qDocs'));

      if(typeof retArr == 'undefined' ||retArr==null)   
        return[];
      return retArr;

    };


    //FUND FUNCTIONS

     this.saveFunds= function(aFunds)
    {
      console.log("savings: ");
      this.saveData('funds',angular.toJson(aFunds));
    
    };

   
    this.getFundArr=function()
    {
      var retArr= this.retrieveData('funds');
      console.log(retArr);
      console.log(typeof retArr);
      if(typeof retArr == 'undefined' ||retArr==null)
        retArr=[];
      else
        retArr=angular.fromJson(retArr);

      return retArr;

     // return angular.fromJson();
    }
    this.getAllFunds= function()
    {
      return this.getFundArr();
    };

    this.getFundsByUser=function(uid)
    {
        
      var fundArr=this.getFundArr();
      var retArr = [];

      fundArr.forEach(function(fundObj)
      {
        if(fundObj.uid == uid)
        {
          retArr.push(fundObj);
        }
      })


       return retArr;

    };

    this.getFundById=function(fid)
    {
      var retFund=null;
      var fundArr = this.getFundArr();
      fundArr.forEach(function(fundObj){if(fundObj.id==fid){retFund=fundObj}});
      return retFund;
    };


    //FOLLOWER FUNCTIONS

    //uids of invites to be saved or deleted on onl
   
  
    this.saveFollowers=function(aFollowers)
    {
      console.log('saving followers');
      
      aFollowers.forEach(function(af){console.log(angular.toJson(af.funds))});
      this.saveData('followers',angular.toJson(aFollowers)) ;

    };

    this.getFollowers=function()
    {

 
      var retArr = this.retrieveData('followers');
      if( typeof retArr == 'undefined' ||retArr == null)
        retArr=[];
      else
      {
        
        retArr = angular.fromJson(retArr);
      }

      retArr.forEach(function(aF){aF.date=new Date(aF.date)});
      return retArr;
    }

    this.saveInvite=function(aInvite)
    {
      var prevInvites= this.getFollowers();
      var prevInvite = null;

      prevInvites.forEach(function(currInvite){

        if(currInvite.uid==aInvite.uid)
        { 
          prevInvite = aInvite;
        }

      } );

      if(prevInvite!=null)
       prevInvites.splice(prevInvites.indexOf(prevInvite));

      prevInvites.push(aInvite);

      this.saveFollowers(prevInvites);
    }


    this.syncFollowers=function()
    {
      var Followers = $injector.get('Followers');
      var ofollowers = this.getFollowers();
      console.log("oFollowers");
      console.log(ofollowers);
       if( typeof ofollowers == 'undefined' ||ofollowers == null)
        ofollowers=[];
      ofollowers.forEach(function(aFollower){Followers.save(aFollower)});
      var deFollowers = angular.fromJson(this.retrieveData('deleteInvite'));
      if( typeof ofollowers == 'undefined' ||ofollowers == null)
          deFollowers = [];
      deFollowers.forEach(function(aD){Followers.deleteByID(aD)});
    this.saveData('deleteInvite',angular.toJson([]));

    }

    this.deleteInvite=function(aInvite)
    {
        var deFollowers = angular.fromJson(retrieveData('deleteInvite'));
        if( typeof ofollowers == 'undefined' ||ofollowers == null)
          deFollowers = [];
        deFollowers.push(aInvite.id);
        this.saveData(angular.toJson(deFollowers));
        var preFollowers = angular.fromJson(this.getFollowers());

      preFollowers.forEach(function(aFollower){if(aFollower.id==aInvite.id){preFollowers.splice(preFollowers.indexOf(aFollower),1)}});



        this.saveFollowers(preFollowers);
    }


})