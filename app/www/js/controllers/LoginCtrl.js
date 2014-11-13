angular.module('endevr.controllers')

.controller('LoginCtrl', function($scope, $http, LinkedInService, GitHubService, localStorageService){
  $scope.linkedinlogin = LinkedInService.login;
  $scope.githublogin = GitHubService.login;
  $scope.employer = {};
  $scope.newEmployer = {};

  $scope.employerLogin = function(employer) {
    console.log(employer)
    $http.post('http://localhost:9000/employers/login', {email: employer.email, password: employer.password})
      .success(function(data, status, headers, config){
        localStorageService.set('employer-token', data);
      })
      .error(function(data, status, headers, config){
      });
  };

  $scope.employerSignup = function(employer) {
    console.log(employer)
    $http.post('http://localhost:9000/employers/new', {email: employer.email, password: employer.password})
      .success(function(data, status, headers, config){
        localStorageService.set('employer-token', data);
      })
      .error(function(data, status, headers, config){
      });
  };

  $scope.logout = function () {
    localStorageService.clearAll();
    location.href=location.pathname;
  };
})
