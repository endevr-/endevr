angular.module('endevr.controllers')

.controller('MatchesCtrl', function($rootScope, $scope, $location, $http, localStorageService) {
  $scope.matches = [{fname: 'Adam', lname: 'Back'}, {fname:'Anna', lname:'Jaffe'}];
  $scope.positions = {position: 'HIR', position: 'Teacher'};
  $scope.chosen = false;
  
  $scope.type = localStorageService.get('usertype');
  if($scope.type === 'dev') {
    $scope.interest = 'Opportunities';
    $scope.chosen = false;
  } else if($scope.type === 'emp') {
    $scope.interest = 'Developers';
    var jwt_token = localStorageService.get('jwt_token');
    var positionUrl = 'http://localhost:9000/api/employers/positions?jwt_token=' + jwt_token + '&usertype=emp';

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
  
  ///

  $scope.decide = function(posid) {
    $rootScope.posid = posid;
    $scope.posid = posid;
    $scope.chosen = true;
  }

  ///

  $scope.navigate = function(route) {
    $location.path('/app/matches/'+route);
  };

  $scope.getMatches = function() {
    var url;
    var jwt_token = localStorageService.get('jwt_token');
    // check local storage to get user type
    if ($scope.type === 'dev') {
      url = 'http://localhost:9000/api/developers/matches?jwt_token=' + jwt_token + '&usertype=dev';
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
          alert("error");
        });
    } else if ($scope.type === 'emp') {
      url = 'http://localhost:9000/api/employers/matches?jwt_token=' + jwt_token + '&usertype=emp&posid=' + $rootScope.posid;
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
  $scope.getMatches();
});
