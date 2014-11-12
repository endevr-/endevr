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
  if (localStorageService.get('employer-token')) {
    $scope.EmployerAuthenticated = true;
    $scope.usertype = 'emp';
  }

  if ($scope.LinkedInAuthenticated === true && $scope.GitHubAuthenticated === true) {
    $scope.Authenticated = true;
    $scope.usertype = 'dev';
  } else if ($scope.EmployerAuthenticated === true) {
    $scope.Authenticated = true;
    $scope.usertype = 'emp';
  } else {
    $scope.needsAuthentication = true;
  }
  // if (localStorageService.get('github-token')) {
  //   $scope.GitHubAuthenticated = true;
  //   $scope.usertype = 'dev';
  // }
  // if ($scope.LinkedInAuthenticated === true && $scope.GitHubAuthenticated === true) {
  //   $scope.Authenticated = true;
  //   $scope.usertype = 'dev';
  // } else {
  //   $scope.needsAuthentication = true;
  // }

  $scope.assignDev = function() {
    console.log("I'm a developer.");
    $scope.usertype = 'dev';
    localStorageService.set('userType', 'dev');
  };

  $scope.assignEmp = function() {
    console.log("I'm an employer.");
    $scope.usertype = 'emp';
    localStorageService.set('userType', 'emp');
  };

  $scope.logout = function () {
    localStorageService.clearAll();
    location.href=location.pathname;
  };
});
