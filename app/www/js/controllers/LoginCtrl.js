angular.module('LoginCtrl', ['ionic.contrib.ui.tinderCards', 'LocalStorageModule', 'ionic'])

.controller('LoginCtrl', function($scope, LinkedInService, GitHubService, localStorageService){
  $scope.linkedinlogin = LinkedInService.login;
  $scope.githublogin = GitHubService.login;

  $scope.logout = function () {
    localStorageService.clearAll();
    location.href=location.pathname;
  };
})