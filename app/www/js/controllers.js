angular.module('endevr.controllers', ['ionic.contrib.ui.tinderCards', 'LocalStorageModule', 'ionic'])

.controller('LoginController', function($scope, LinkedInService, GitHubService){
  $scope.linkedinlogin = LinkedInService.login;
  $scope.githublogin = GitHubService.login;
})
