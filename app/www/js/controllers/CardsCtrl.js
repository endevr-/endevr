angular.module('endevr.controllers')

.controller('CardsCtrl', function($scope, $http, TDCardDelegate, queueService) {

  var cardTypes = [];
  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  var cardQueue = queueService;

  cardQueue.storeTotalCards( $scope.$parent.interest, function(card) {
    $scope.cards = card;
  });

  $scope.cardDestroyed = function() {
    // console.log('destroyed');
    cardQueue.removeCard();
  };

});
