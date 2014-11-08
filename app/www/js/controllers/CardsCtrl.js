angular.module('CardsCtrl', ['ionic.contrib.ui.tinderCards', 'LocalStorageModule', 'ionic'])

.controller('CardsCtrl', function($scope, $http, TDCardDelegate) {
  var cardTypes = [];

  //Right now, dev_id is hardcoded. Refactor at first opportunity
  $http.get('http://localhost:9000/api/developers/XX/cards')
    .success(function(data){
      console.log(data);
      // cardTypes = data;
      for (var i = 0; i < data.length; i++) {
        $scope.cards.push(data[i]);
      }
    })
    .error(function(){
      console.log('Error getting matches');
    });

  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = $scope.cards[Math.floor(Math.random() * $scope.cards.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
});