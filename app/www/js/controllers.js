angular.module('endevr.controllers', ['ionic.contrib.ui.tinderCards', 'LocalStorageModule', 'ionic'])

.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index, id) {
    console.log('Left swipe! UID: '+id);
    //Ping our server telling them this IS NOT a match using id
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index, id) {
    console.log('Right swipe! UID: '+id);
    //Ping our server telling them this IS a match using id
    $scope.addCard();
  };
})

.controller('LoginController', function($scope, LinkedInService, GitHubService){
  $scope.linkedinlogin = LinkedInService.login;
  $scope.githublogin = GitHubService.login;
})
