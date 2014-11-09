angular.module('AuthCtrl', ['ionic.contrib.ui.tinderCards', 'LocalStorageModule', 'ionic'])

.controller('AuthCtrl', function($scope, $state, localStorageService){
  if(localStorageService.get('github-token')) {
    $scope.Authenticated = true;
  } else {
    $scope.needsAuthentication = true;
  }
})