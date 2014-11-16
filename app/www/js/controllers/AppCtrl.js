angular.module('endevr.controllers')

.controller('AppCtrl', function($scope, $location, localStorageService) {

  $scope.logout = function() {
    localStorageService.clearAll();
    $location.path('/app/auth');
    $scope.closeLogin();
  };

  $scope.navigate = function(route) {
    $location.path('/app/'+route);
  };
});
