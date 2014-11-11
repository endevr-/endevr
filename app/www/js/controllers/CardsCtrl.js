angular.module('endevr.controllers')

.controller('CardsCtrl', function($scope, $http, TDCardDelegate, queueService) {

  var cardTypes = [];
  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  var employersQueue = queueService;

  employersQueue.storeTotalCards('http://localhost:9000/api/developers/XX/cards', function(card) {
    $scope.cards = card;
  });

  $scope.cardDestroyed = function() {
    // console.log('destroyed');
    employersQueue.removeCard();
  };

});
