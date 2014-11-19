angular.module('endevr.controllers')

.controller('MatchesCtrl', function($rootScope, $scope, $location, $http, localStorageService, $ionicModal) {
  $scope.matches = [];
  $scope.type = localStorageService.get('usertype');

  if($scope.type === 'dev') {
    $scope.interest = 'Opportunities';
    $scope.getMatches();
  } else if($scope.type === 'emp') {
    $scope.chosen = false;
    $scope.interest = 'Developers';
    var jwt_token = localStorageService.get('jwt_token');
    //get positions to list on screen for selection
    var positionUrl = 'http://localhost:9000/api/employers/positions?jwt_token=' + jwt_token + '&usertype=emp';
    $http.get(positionUrl)
      .success(function(data) {
        $scope.positions = data;
      })
      .error(function() {
        console.log('Error getting positions');
      });

  }
  
  $scope.decide = function(posid) {
    $rootScope.posid = posid;
    $scope.posid = posid;
    $scope.getMatches();
  }

  $ionicModal.fromTemplateUrl('templates/devProfileModal.html', {
    scope: $scope
    })
    .then(function(modal) {
      $scope.devProfileModal = modal;
    });

  $ionicModal.fromTemplateUrl('templates/empProfileModal.html', {
    scope: $scope
    })
    .then(function(modal) {
      $scope.empProfileModal = modal;
    });

  // View Profile - Show Modal
  $scope.showModal = function(info) {
    $scope.profile = info;

    if($scope.type === 'dev') {
      $scope.empProfileModal.show();
    } else if($scope.type === 'emp') {
      $scope.devProfileModal.show();
    }

  };

  $scope.navigate = function(route) {
    $location.path('/app/matches/'+route);
  };

  $scope.backToJobs = function() {
    $scope.chosen = false;
  }

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
          // clear matches first
          $scope.matches = [];
          for (var matchedDev = 0; matchedDev < data.length; matchedDev++) {
            $scope.matches.push( data[matchedDev] );
          }
          $scope.chosen = true;
        })
        .error(function() {
          console.log('Error getting matches');
        });
    }
  };

  // call matches on controller load
  $scope.getMatches();
});
