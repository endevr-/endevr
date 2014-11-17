angular.module('endevr.controllers')

.controller('MatchesCtrl', function($scope, $location, $http, localStorageService) {
  // set matches variable
  $scope.matches = [];
  // $scope.matches = [
  //   { title: 'Hack Reactor', id: 1 },
  //   { title: 'Facebook', id: 2 },
  //   { title: 'Google', id: 3 },
  //   { title: 'Yahoo', id: 4 },
  //   { title: 'Twitter', id: 5 },
  //   { title: 'Airbnb', id: 6 }
  // ];

  $scope.navigate = function(route) {
    $location.path('/app/matches/'+route);
  };

  $scope.getMatches = function() {
    var url;
    // check local storage to get user type
    if (localStorageService.get('usertype') === 'dev') {
      $scope.type = 'dev';
      $scope.interest = 'Opportunities';
      url = 'http://localhost:9000/api/developers/matches?jwt_token=' + jwt_token;
      // get matches from /developers/matches
      // loop through data
        // create array with objects containing position, company
    } else if (localStorageService.get('usertype') === 'emp') {
      $scope.type = 'emp';
      $scope.interest = 'Developers';
      // get matches from /employers/matches
      url = 'http://localhost:9000/api/employers/matches?jwt_token=' + jwt_token;
      // loop through data
        // create array with objects containing name, position
        // rendered on screen using ng-repeat

    }
  };

  // call matches
  $scope.getMatches();
});
