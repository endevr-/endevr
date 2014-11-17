angular.module('endevr.controllers')

.controller('MatchesCtrl', function($scope, $location, $http, localStorageService) {
  // $scope.matches = [];
  $scope.matches = [
    { title: 'HIR', id: 1, employer: 'Hack Reactor' },
    { title: 'Inside Sales', id: 2, employer: 'Facebook' },
    { title: 'SEO Developer', id: 3, employer: 'Google' },
    { title: 'Front-End Designer', id: 4, employer: 'Yahoo' },
    { title: 'Senior Engineer', id: 5, employer: 'Twitter' },
    { title: 'Customer Support', id: 6, employer: 'Airbnb' }
  ];

  $scope.navigate = function(route) {
    $location.path('/app/matches/'+route);
  };

  $scope.getMatches = function() {
    var url;
    var jwt_token = localStorageService.get('jwt-token');
    // check local storage to get user type
    if (localStorageService.get('usertype') === 'dev') {
      $scope.type = 'dev';
      $scope.interest = 'Opportunities';
      url = 'http://localhost:9000/api/developers/matches?jwt_token=' + jwt_token;
      // get matches from /developers/matches
      $http.get(url)
        .success(function(data) {
          // loop through data
          for (var matchedPosition = 0; matchedPosition < data.length; matchedPosition++) {
          // create array with objects containing position's title and company
            $scope.matches.push( data[matchedPosition] );
          }
        })
        .error(function() {
          console.log('Error getting matches');
        });
    } else if (localStorageService.get('usertype') === 'emp') {
      $scope.type = 'emp';
      $scope.interest = 'Developers';
      url = 'http://localhost:9000/api/employers/matches?jwt_token=' + jwt_token;
      $http.get(url)
        .success(function(data) {
          for (var matchedDev = 0; matchedDev < data.length; matchedDev++) {
            $scope.matches.push( data[matchedDev] );
          }
        })
        .error(function() {
          console.log('Error getting matches');
        });
    }
  };

  // call matches on controller load
  // $scope.getMatches();
});
