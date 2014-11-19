angular.module('endevr.controllers')

.controller('CardsCtrl', function($scope, $http, TDCardDelegate, queueService, localStorageService) {

  var cardTypes = [];
  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  var cardQueue = queueService;

  var userType = localStorageService.get('usertype');

  var jwt_token = localStorageService.get('jwt_token');

  cardQueue.storeTotalCards( jwt_token, userType, function(card) {
    $scope.cards = card;
  });

  $scope.cardDestroyed = function() {
    // console.log('destroyed');
    cardQueue.removeCurrentCard();
    cardQueue.setCurrentCard();
  };

  $scope.request = function(url) {
    // alert(url);
    $http.post(url, {devid: 1, posid: 1, devint: false})
      .success(function(data, status, headers, config) {
        alert('hit server with swipe');
      })
      .error(function(data, status, headers, config) {
        alert('error pinging server');
      });
  };

});
