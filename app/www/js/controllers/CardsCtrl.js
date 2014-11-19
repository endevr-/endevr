angular.module('endevr.controllers')

.controller('CardsCtrl', function($scope, $http, TDCardDelegate, queueService, localStorageService, $interval) {

  var cardTypes = [];
  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  var cardQueue = queueService;

  var userType = localStorageService.get('usertype');

  var jwt_token = localStorageService.get('jwt_token');

  if (userType === 'dev') {
    cardQueue.storeTotalCards( jwt_token, userType, null, function(card) {
      $scope.cards = card;
    });
  }

  var check = true;

  $interval(function() {
    if (check) {
      if ($scope.$parent.posid !== undefined) {
        cardQueue.storeTotalCards( jwt_token, userType, $scope.$parent.posid, function(card) {
          $scope.cards = card;
          check = false;
        });
      }

    }
  }, 1000)

  $scope.cardDestroyed = function() {
    // console.log('destroyed');
    cardQueue.removeCurrentCard();
    cardQueue.setCurrentCard();
  };

  $scope.request = function(url, card, usertype, interest) {
    var fields = {};
    // alert(url);
    if (usertype === 'dev') {
      //Remove the hardcoded value on line 29 for the real developer ID
      fields.devid = 1;
      fields.posid = card.id;
      fields.devint = interest;

      $http.post(url, fields)
        .success(function(data, status, headers, config) {
          alert('hit server with swipe');
        })
        .error(function(data, status, headers, config) {
          alert('error pinging server');
        });

    } else {
      fields.devid = card.developers_id;
      //Remove the hardcoded value on line 37 for actual position ID
      fields.posid = 1;
      fields.empint = interest;

      $http.post(url, fields)
        .success(function(data, status, headers, config) {
          alert('hit server with swipe');
        })
        .error(function(data, status, headers, config) {
          alert('error pinging server');
        });
    }
  };
});
