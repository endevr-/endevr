angular.module('endevr.controllers')

.controller('AppCtrl', function($scope, $location, localStorageService, $ionicNavBarDelegate) {

  $scope.logout = function() {
    localStorageService.clearAll();
    $location.path('/app/auth');
  };

  $scope.navigate = function(route) {
    if (route === 'profile') {
      $location.path('/app/'+localStorageService.get('usertype')+'profile');
    } else {
      $location.path('/app/'+route);
    }
  };

  $scope.back = function() {
    $ionicNavBarDelegate.back();
  };
});
