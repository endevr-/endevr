angular.module('MatchesCtrl', ['ionic.contrib.ui.tinderCards', 'LocalStorageModule', 'ionic'])

.controller('MatchesCtrl', function($scope, $location) {
  $scope.navigate = function(route) {
    $location.path('/app/matches/'+route);
  };

  $scope.matches = [
    { title: 'Hack Reactor', id: 1 },
    { title: 'Facebook', id: 2 },
    { title: 'Google', id: 3 },
    { title: 'Yahoo', id: 4 },
    { title: 'Twitter', id: 5 },
    { title: 'Airbnb', id: 6 }
  ];
});
