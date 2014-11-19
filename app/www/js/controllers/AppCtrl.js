angular.module('endevr.controllers')

.controller('AppCtrl', function($scope, $location, localStorageService, $ionicNavBarDelegate) {

  $scope.current = 'browse';

  $scope.logout = function() {
    localStorageService.clearAll();
    $location.path('/app/auth');
  };

  $scope.navigate = function(route) {
    if ($scope.current !== route) {
      $scope.current = route;
    } else {
      $scope.current = route + 'again';
    }

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
