angular.module('endevr.controllers')

// The BrowseCtrl sets the heading on the main page.
// Currently hardcoded for 'Browse Employers'
// but should be variable for 'Browse Candidates'
// in the future.
.controller('BrowseCtrl', function($rootScope, $scope, localStorageService, $http, $ionicModal) {
  $scope.chosen = false;

  $scope.decide = function(posid) {
    $rootScope.posid = posid;
    $scope.posid = posid;
    $scope.chosen = true;
  };

  $scope.employer = function() {
    if(localStorageService.get('usertype') === 'emp') {
      return true;
    } else {
      return false;
    }
  }

  $scope.evaluateModal = function() {
    if(!localStorageService.get('returning')) {
      $scope.modal.show()
    }
  }

  $scope.completedTutorial = function() {
    localStorageService.set('returning', true);
    $scope.modal.hide();
  };

  $ionicModal.fromTemplateUrl('templates/tutorialModal.html', {
    scope: $scope
    })
    .then(function(modal) {
      $scope.modal = modal;
      $scope.evaluateModal();
    });

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

  $scope.$parent.$watch('current', function(newVal, oldVal) {
    if (newVal !== oldVal && localStorageService.get('usertype') === 'emp') {
      $scope.chosen = false;
    }
  });


});
