angular.module('LoginCtrl', ['ionic.contrib.ui.tinderCards', 'LocalStorageModule', 'ionic'])

.controller('LoginCtrl', function($scope, LinkedInService, GitHubService){
  $scope.linkedinlogin = LinkedInService.login;
  $scope.githublogin = GitHubService.login;
})