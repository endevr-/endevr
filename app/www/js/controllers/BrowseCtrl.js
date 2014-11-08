angular.module('BrowseCtrl', ['ionic.contrib.ui.tinderCards', 'LocalStorageModule', 'ionic'])

.controller('BrowseCtrl', function($scope) {
  $scope.userType = 'Employers';
});