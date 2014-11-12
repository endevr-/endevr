angular.module('endevr.controllers')

.controller('LoginCtrl', function($scope, $http, LinkedInService, GitHubService, localStorageService){
  $scope.linkedinlogin = LinkedInService.login;
  $scope.githublogin = GitHubService.login;
  $scope.employer = {};

  $scope.employerLogin = function(employer) {
    console.log(employer)
    $http.post('http://localhost:9000/empLogin', {email: employer.email, password: employer.password, company: employer.company});
    .success(function(data, status, headers, config){})
    .error(function(data, status, headers, config){});
  };

  $scope.logout = function () {
    localStorageService.clearAll();
    location.href=location.pathname;
  };
})
