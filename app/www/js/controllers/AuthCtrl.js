angular.module('endevr.controllers')

.controller('AuthCtrl', function($scope, $state, localStorageService){
  if (localStorageService.get('linkedin-token')) {
    $scope.LinkedInAuthenticated = true;
    $scope.userType = 'dev';
  }
  if (localStorageService.get('github-token')) {
    $scope.GitHubAuthenticated = true;
    $scope.userType = 'dev';
  }
  if ($scope.LinkedInAuthenticated === true && $scope.GitHubAuthenticated === true) {
    $scope.Authenticated = true;
    $scope.userType = 'dev';
  } else {
    $scope.needsAuthentication = true;
  }

  $scope.logout = function () {
    localStorageService.clearAll();
    location.href=location.pathname;
  };
});
