angular.module('endevr.controllers')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $location, $state, localStorageService) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  })
  .then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.logout = function() {
    localStorageService.clearAll();
    $location.path('/app/auth');
    $scope.closeLogin();
  };

  $scope.navigate = function(route) {
    $location.path('/app/'+route);
  };
});
