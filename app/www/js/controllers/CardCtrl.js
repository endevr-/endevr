// The cardSwiped functions were moved into CardsCtrl and the resulting
// changes throughout the code (app.js, index.js, and CardsCtrl) were
// updated accordingly. In testing, the cards would not longer be destroyed
// when dragged off screen, so the decision was made to keep this controller
// on its own until the bug could be address.

// Don't fix what ain't broke.

angular.module('CardCtrl', ['ionic'])

.controller('CardCtrl', function($scope, TDCardDelegate, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/cardInformation.html', {
    scope: $scope
  })
  .then(function(modal) {
    $scope.modal = modal;
  });

  $scope.information = function() {
    $scope.modal.show();
  }

  $scope.closeInformation = function() {
    $scope.modal.hide();
  }

  $scope.name = $scope.$parent.cards[0].name;

  $scope.clickReject = function() {
    $scope.modal.hide();
    $scope.$parent.cardDestroyed();
    $scope.cardSwipedLeft(0, $scope.name);
  };

  $scope.clickAccept = function() {
    $scope.modal.hide();
    $scope.$parent.cardDestroyed();
    $scope.cardSwipedRight(0, $scope.name);
  };

  $scope.cardSwipedLeft = function(index, id) {
    console.log('Left swipe! UID: '+id);

    //Ping our server telling them this IS NOT a match using id
  };
  $scope.cardSwipedRight = function(index, id) {
    console.log('Right swipe! UID: '+id);

    //Ping our server telling them this IS a possible match using id
  };
});
