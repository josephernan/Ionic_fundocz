'use strict';

angular.module('docman.publications-search', [])

//.controller('PublicationsSearchCtrl', function ($scope, $timeout, $cordovaFileTransfer, $ionicPlatform,$cordovaFileOpener2, Docs, Funds, DocFile) {
.controller('PublicationsSearchCtrl', function ($scope, $stateParams, $timeout, $cordovaFileTransfer, $cordovaFileOpener2, $ionicPlatform, Funds, Docs, DocFile) {
    $scope.searchBoardOpen = true;
    $scope.key = 0;
    $scope.keyLabel = '';

    $scope.selectMonth = function(month) {
      $scope.key = month;
      $scope.searchBoardOpen = false;

      var year = month > 12 ? 2016 : 2015;
      month = (month - 1) % 12;
      $scope.keyLabel = year + ' | ' + $scope.ui.months[month];

      Docs.getMonthDocs(year, month).then(function(docs){
        $scope.docs = docs;
        docs.forEach(function(doc) {
          DocFile.downloadWithoutLoading(doc.uploadname).then(function(url){
            $timeout(function(){
              doc.file = url;
              });
              }).catch(function(){});

              Funds.getFund(doc.fid).then(function(fund){
              $timeout(function(){
              $scope.form = fund;
              });
              // console.log(fund.full_name);
              doc.fundname = fund.full_name;
              console.log(doc);
              }).catch(function(){
              }); 

              });
              });

    }

    $scope.downloadDoc = function(doc) {
      DocFile.download(doc.uploadname).then(function(url){
        //alert(url);
        if ($ionicPlatform.is('android')) {
        var filePath = url.substr(url.lastIndexOf('/') + 1);
        var targetPath = cordova.file.externalApplicationStorageDirectory + doc.filename;
        var trustHosts = true;
        var options = {};
        $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
          $cordovaFileOpener2.open(result.toInternalURL(), 'application/pdf');
        }, function (err) {    
            alert("The specified key does not exist");   
        });
      } else {
        if(window.cordova) {
          window.open(url, '_blank', 'location=no,hardwareback=no,enableViewportScale=yes');
        } else {
          window.open(url);
        }
      }
      });    
    }

  })
