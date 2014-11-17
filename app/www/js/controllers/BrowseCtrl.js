angular.module('endevr.controllers')

// The BrowseCtrl sets the heading on the main page.
// Currently hardcoded for 'Browse Employers'
// but should be variable for 'Browse Candidates'
// in the future.
.controller('BrowseCtrl', function($scope, localStorageService) {
  if (localStorageService.get('usertype') === 'dev') {
    $scope.type = 'dev';
    $scope.interest = 'Opportunities';
  } else {
    $scope.type = 'emp';
    $scope.interest = 'Developers';
  }

});
