// The cardSwiped functions were moved into CardsCtrl and the resulting
// changes throughout the code (app.js, index.js, and CardsCtrl) were
// updated accordingly. In testing, the cards would not longer be destroyed
// when dragged off screen, so the decision was made to keep this controller
// on its own until the bug could be address.

// Don't fix what ain't broke.

angular.module('endevr.controllers')

.controller('CardCtrl', function($scope, TDCardDelegate, $ionicModal, localStorageService, $http) {
  //Initialize controller variables
  $scope.userType = localStorageService.get('usertype');
  $scope.jwt_token = localStorageService.get('jwt_token')

  if ($scope.userType === 'dev') {
    $scope.url = 'http://localhost:9000/api/developers/matches?jwt_token='+$scope.jwt_token+'&usertype=dev';
  } else {
    $scope.url = 'http://localhost:9000/api/employers/matches?jwt_token='+$scope.jwt_token+'&usertype=emp';
  }
  
  $ionicModal.fromTemplateUrl('templates/cardInformation.html', {
    scope: $scope
  })
  .then(function(modal) {
    $scope.modal = modal;
  });

  $scope.information = function() {
    $scope.modal.show();
  };

  $scope.closeInformation = function() {
    $scope.modal.hide();
  };

  // this line makes tests for the entire controller fail.
  $scope.name = $scope.$parent.cards[0].name;

  $scope.clickReject = function() {
    $scope.modal.hide();
    $scope.$parent.cardDestroyed();
    $scope.cardSwipedLeft($scope.name);
  };

  $scope.clickAccept = function() {
    $scope.modal.hide();
    $scope.$parent.cardDestroyed();
    $scope.cardSwipedRight($scope.name);
  };

  $scope.cardSwipedLeft = function(id) {
    $scope.$parent.request($scope.url);
  };

  $scope.cardSwipedRight = function(name) {
    $scope.$parent.request($scope.url);
  };
});
