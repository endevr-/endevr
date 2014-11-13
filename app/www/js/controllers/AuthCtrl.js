angular.module('endevr.controllers')

.controller('AuthCtrl', function($scope, $state, $location, localStorageService){
  //Logic below can be refactored and simplified a bunch
  //Leave it for Jeff to do since he's the most familiar with it
  if (localStorageService.get('linkedin-token')) {
    $scope.LinkedInAuthenticated = true;
    $scope.userType = 'dev';
  }
  if (localStorageService.get('github-token')) {
    $scope.GitHubAuthenticated = true;
    $scope.userType = 'dev';
  }
  if (localStorageService.get('employer-token')) {
    $scope.EmployerAuthenticated = true;
    $scope.userType = 'emp';
  }

  if ($scope.LinkedInAuthenticated === true && $scope.GitHubAuthenticated === true) {
    $scope.Authenticated = true;
    $scope.needsAuthentication = false;
    $scope.usertype = 'dev';
    $location.path('/app/browse');
  } else if ($scope.EmployerAuthenticated === true) {
    $scope.Authenticated = true;
    $scope.userType = 'emp';
  } else {
    $scope.needsAuthentication = true;
  }

  $scope.assignDev = function() {
    console.log("I'm a developer.");
    $scope.userType = 'dev';
    localStorageService.set('usertype', 'dev');
  };

  $scope.assignEmp = function() {
    console.log("I'm an employer.");
    $scope.userType = 'emp';
    localStorageService.set('usertype', 'emp');
  };

  $scope.logout = function () {
    localStorageService.clearAll();
    location.href=location.pathname;
  };
});
