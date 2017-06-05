
angular.module('docman.offline-model', [])
.run(function( Funds,$rootScope,$ionicPlatform,$cordovaDevice, $cordovaNetwork,$cordovaNetwork)
{




   document.addEventListener("deviceready", function () {



//ONLINBE OFFLINE DETECTION
    
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

    })

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      var offlineState = networkState;
      $rootScope.online=false;
       console.log("nowOFFLINE");
    })

    console.log('IK10');
    console.log(window.localStorage.getItem("nota");)

})
.service('Offline', function($q, Fund, Loading) 

{

    this.saveData = function(aType,aData)
     {

      };
 
    this.retrieveData = function(dType){

    };





    this.saveUser= function(aUser)
    {


    };

   

    this.saveDoc= function()
    {


    }


    this.getUser= function()
    {


    };

    
     this.saveFunds= function(aFunds)
    {
      
      console.log("savings: ");
      this.saveData('fund',angular.toJson(aFunds));
    
    };

    this.tFunds = '[{"id":"-KOL_RP2H9pgPogJ9gUy","uid":"-KOL_Lm1ivSp-ZHDmB0t","full_name":"Arowana Asian Fund Limited1","manager":"Arowana Asset Management Ltd1","advisor":"N/A1","fund_strategy":"Fund of Funds Asia with China Bias1","regulatory_registrations":"SFC Type 4 and Type 91","portpolio_manager":"Pierre Hoebrechts1","coo":"Russell Davidson1","inception_date":1454799600000,"aum":"40m1","firm_aum":"40m1","administrator":"Harmonic1","auditor":"KPMG1","prime_broker":"N/A1","onshore_legal_counsel":"Simmons & Simmons1","offshore_legal_counsel":"Walkers1","subscriptions":"Monthly1","redemption":"Monthly1","notice_period":"60 days1","lock_up":"None1","penalty_fee":"2% within 12 months1","fund_level":"None1","investor_level":"None1","minimum":"1000,0001","management_pee":"0.75%1","performance_fee":"10%1","hurdle_rate":"5%1","loss_carry_forward":"Yes1","high_water_mark":"Yes1","bloomberg_ticker":"1","mtd":"0%1%","ytd":"0%1%","avg":"0%1%","strategy":"strategy...11","date":null,"performance_date":"2016-08-02T22:00:00.000Z","performance_date_label":"8/3/16","date_label":"Invalid Date","docs":[]},{"id":"-KOL_f3uFodP_EBGlnjb","uid":"-KOL_Lm1ivSp-ZHDmB0t","full_name":"Arowana Asian Fund Limited","manager":"Arowana Asset Management Ltd","advisor":"N/A","fund_strategy":"Fund of Funds Asia with China Bias","regulatory_registrations":"SFC Type 4 and Type 9","portpolio_manager":"Pierre Hoebrechts","coo":"Russell Davidson","inception_date":1470331531706,"aum":"40m","firm_aum":"40m","administrator":"Harmonic","auditor":"KPMG","prime_broker":"N/A","onshore_legal_counsel":"Simmons & Simmons","offshore_legal_counsel":"Walkers","subscriptions":"Monthly","redemption":"Monthly","notice_period":"60 days","lock_up":"None","penalty_fee":"2% within 12 months","fund_level":"None","investor_level":"None","minimum":"1000,000","management_pee":"0.75%","performance_fee":"10%","hurdle_rate":"5%","loss_carry_forward":"Yes","high_water_mark":"Yes","bloomberg_ticker":"","mtd":"0%%","ytd":"0%%","avg":"0%%","strategy":"strategy...","date":null,"performance_date":"2016-08-04T17:25:31.706Z","performance_date_label":"8/4/16","date_label":"Invalid Date","docs":[]},{"id":"-KOmszDbIyj_asCTPx8a","uid":"-KOmstsYu4qmQputrt_m","full_name":"Arowana & Witsoart Fund","manager":"Arowana Asset Management Ltd","advisor":"N/A","fund_strategy":"Fund of Funds Asia with China Bias","regulatory_registrations":"SFC Type 4 and Type 9","portpolio_manager":"Pierre Hoebrechts","coo":"Russell Davidson","inception_date":1470758400000,"aum":"40m","firm_aum":"40m","administrator":"Harmonic","auditor":"KPMG","prime_broker":"N/A","onshore_legal_counsel":"Simmons & Simmons","offshore_legal_counsel":"Walkers","subscriptions":"Monthly","redemption":"Monthly","notice_period":"60 days","lock_up":"None","penalty_fee":"2% within 12 months","fund_level":"None","investor_level":"None","minimum":"1000,000","management_pee":"0.75%","performance_fee":"10%","hurdle_rate":"5%","loss_carry_forward":"Yes","high_water_mark":"Yes","bloomberg_ticker":"","mtd":"10%","ytd":"5%","avg":"10%","strategy":"strategy...","date":null,"performance_date":"2016-08-26T16:00:00.000Z","performance_date_label":"8/26/16","date_label":"Invalid Date","docs":[]},{"id":"-KPwDOPLUi_vpsvgGPpf","uid":"-KPwCqPD1zbBwWzt0FTY","full_name":"Witsoart Fund Management","manager":"Arowana Asset Management Ltd","advisor":"N/A","fund_strategy":"Fund of Funds Asia with China Bias","regulatory_registrations":"SFC Type 4 and Type 9","portpolio_manager":"Pierre Hoebrechts","coo":"Russell Davidson","inception_date":1471968000000,"aum":"40m","firm_aum":"40m","administrator":"Harmonic","auditor":"KPMG","prime_broker":"N/A","onshore_legal_counsel":"Simmons & Simmons","offshore_legal_counsel":"Walkers","subscriptions":"Monthly","redemption":"Monthly","notice_period":"60 days","lock_up":"None","penalty_fee":"2% within 12 months","fund_level":"None","investor_level":"None","minimum":"1000,000","management_pee":"0.75%","performance_fee":"10%","hurdle_rate":"5%","loss_carry_forward":"Yes","high_water_mark":"Yes","bloomberg_ticker":"","mtd":"0%%","ytd":"0%%","avg":"0%%","strategy":"strategy...","date":null,"performance_date":"2016-08-23T16:00:00.000Z","performance_date_label":"8/23/16","date_label":"Invalid Date","docs":[]},{"id":"-KSKmIlZExvqz47GprSs","uid":"-KOmstsYu4qmQputrt_m","full_name":"Arowana Asian Fund Limited","manager":"Arowana Asset Management Ltd","advisor":"N/A","fund_strategy":"Fund of Funds Asia with China Bias","regulatory_registrations":"SFC Type 4 and Type 9","portpolio_manager":"Pierre Hoebrechts","coo":"Russell Davidson","inception_date":1474613034239,"aum":"40m","firm_aum":"40m","administrator":"Harmonic","auditor":"KPMG","prime_broker":"N/A","onshore_legal_counsel":"Simmons & Simmons","offshore_legal_counsel":"Walkers","subscriptions":"Monthly","redemption":"Monthly","notice_period":"60 days","lock_up":"None","penalty_fee":"2% within 12 months","fund_level":"None","investor_level":"None","minimum":"1000,000","management_pee":"0.75%","performance_fee":"10%","hurdle_rate":"5%","loss_carry_forward":"Yes","high_water_mark":"Yes","bloomberg_ticker":"","mtd":"0%%","ytd":"0%%","avg":"0%%","strategy":"strategy...","date":null,"performance_date":"2016-09-23T06:43:54.239Z","performance_date_label":"9/23/16","date_label":"Invalid Date","docs":[]}]';

  
    this.getFundArr=function()
    {

      return angular.fromJson(this.tFunds);
    }
    this.getAllFunds= function()
    {
      return this.getFundArr();
    
    };

    this.getFundsByUser=function(uid)
    {
        
      var fundArr=this.getFundArr();
      var retArr = [];

      fundArr.forEach(function(fundObj){
      if(fundObj.uid == fundObj.uid)
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


    this.getDoc= function()
    {


    }    

    }
)