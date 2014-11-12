angular.module('endevr.controllers')

.controller('AuthCtrl', function($scope, $state, localStorageService){
  if (localStorageService.get('linkedin-token')) {
    $scope.LinkedInAuthenticated = true;
    $scope.usertype = 'dev';
  }
  if (localStorageService.get('github-token')) {
    $scope.GitHubAuthenticated = true;
    $scope.usertype = 'dev';
  }
  if ($scope.LinkedInAuthenticated === true && $scope.GitHubAuthenticated === true) {
    $scope.Authenticated = true;
    $scope.usertype = 'dev';
  } else {
    $scope.needsAuthentication = true;
  }

  $scope.assignDev = function() {
    console.log("I'm a developer.");
    $scope.usertype = 'dev';
    localStorageService.set('usertype', 'dev');
  };

  $scope.assignEmp = function() {
    console.log("I'm an employer.");
    $scope.usertype = 'emp';
    localStorageService.set('usertype', 'emp');
  };

  $scope.logout = function () {
    localStorageService.clearAll();
    location.href=location.pathname;
  };
});
