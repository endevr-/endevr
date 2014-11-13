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
    cardQueue.removeCard();
  };

});
