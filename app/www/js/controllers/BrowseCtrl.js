angular.module('endevr.controllers')

// The BrowseCtrl sets the heading on the main page.
// Currently hardcoded for 'Browse Employers'
// but should be variable for 'Browse Candidates'
// in the future.
.controller('BrowseCtrl', function($scope, localStorageService, $http) {
  $scope.chosen = false;

  if (localStorageService.get('usertype') === 'dev') {
    $scope.type = 'dev';
    $scope.interest = 'Opportunities';
  } else {
    $scope.type = 'emp';
    $scope.interest = 'Developers';
  }

  if ($scope.type === 'emp') {
    $scope.chosen = false;
    var jwt = localStorageService.get('jwt_token');
    var usertype = localStorageService.get('usertype');
    var positionUrl = 'http://localhost:9000/api/employers/positions?jwt_token=' + jwt + '&usertype=' + usertype;

    $http.get(positionUrl)
      .success(function(data) {
        $scope.positions = data;
      })
      .error(function() {
        console.log('Error getting positions');
      });

  } else {
    $scope.chosen = true;
  }

  $scope.decide = function(posid) {
    $scope.posid = posid;
    $scope.chosen = true;
  }

});
