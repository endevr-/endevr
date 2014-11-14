angular.module('endevr.controllers')

.controller('AuthCtrl', function($scope, $state, $location, localStorageService){
  //If user has a linkedin-token they've passed LinkedIn Auth and are a Dev
  if (localStorageService.get('linkedin-token')) {
    $scope.LinkedInAuthenticated = true;
    $scope.type = 'dev';
  }
  //If user has a github-token they've passed GitHub Auth (& we already know they're a dev)
  if (localStorageService.get('github-token')) {
    $scope.GitHubAuthenticated = true;
  }
  //If user has employer token, they've passed Employer Auth and are an employer
  if (localStorageService.get('employer-token')) {
    $scope.EmployerAuthenticated = true;
    $scope.type = 'emp';
  }
  //If user has been fully authenticated, send to browse
  if ($scope.LinkedInAuthenticated === true && $scope.GitHubAuthenticated === true) {
    $scope.Authenticated = true;
    $location.path('/app/browse');
  } else if ($scope.EmployerAuthenticated === true) { //This route needs work after server is set up
    $scope.Authenticated = true;
  } else { //User needs to be authenticated, show them the authentication flow
    $scope.needsAuthentication = true;
  }

  $scope.showGitHub = function() {
    return ($scope.LinkedInAuthenticated === true && $scope.GitHubAuthenticated !== true) ? true : false;
  };

  $scope.assignDev = function() {
    $scope.type = 'dev';
    localStorageService.set('usertype', 'dev');
  };

  $scope.assignEmp = function() {
    $scope.type = 'emp';
    localStorageService.set('usertype', 'emp');
  };

  $scope.skipGitHub = function() {
    $scope.Authenticated = true;
    $location.path('/app/browse');
  };
});
