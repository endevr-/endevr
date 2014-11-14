angular.module('endevr.controllers')

.controller('ProfileCtrl', function($scope, $ionicModal, $http, localStorageService, ModalService) {

  $scope.profile;

  var jwt_token = localStorageService.get('jwt_token');
  var userType = localStorageService.get('usertype');
  var profileUrl = 'http://localhost:9000/api/developers/profile?jwt_token=' + jwt_token + '&usertype=' + userType;

  $scope.getProfile = function() {
    $http.get(profileUrl)
      .success(function(data) {

        var profile = data;

        var skillsArray = [];
        for (var skill in profile.skills) {
          skillsArray[ parseInt(skill) ] = profile.skills[skill];
        }

        var educationArray = [];
        for (var school in profile.education) {
          educationArray[ parseInt(school) ] = profile.education[school];
        }

        profile.skills = skillsArray;
        profile.education = educationArray;

        $scope.profile = profile;
      })
      .error(function() {
        console.log('Error getting profile');
      });
  };

  $scope.getProfile();

  $ionicModal.fromTemplateUrl('templates/editList.html', {
    scope: $scope
  })
  .then(function(modal) {
    $scope.modal  = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeModal = function() {
    var updatedData = {};
    for (var index = 0; index < $scope.items.length; index++) {
      updatedData[""+index] = $scope.items[index];
    }

    var updatedInformation = {
        category: $scope.category,
        data: updatedData
    };

    $http.post(profileUrl, updatedInformation)
      .success(function() {
        $scope.getProfile();
      })
      .error(function() {
        console.log('Error saving profile');
      })
    $scope.modal.hide();
    $scope.showDelete = false;
    $scope.showReOrder = false;
  };

  // Open the login modal
  $scope.showModal = function(category, items) {
    $scope.category = category;
    $scope.items = [];
    for (var key in items) {
        $scope.items[ parseInt(key) ] = items[key];
    }
    $scope.modal.show();
  };

  $scope.showDelete = false;
  $scope.showReOrder = false;

  $scope.toggleDelete = function() {
    $scope.showDelete = !$scope.showDelete;
    $scope.showReOrder = false;
  }

  $scope.toggleReOrder = function() {
    $scope.showReOrder = !$scope.showReOrder;
    $scope.showDelete = false;
  }

  $scope.onItemDelete = function(item) {
    $scope.items.splice( $scope.items.indexOf(item), 1);
  };

  $scope.edit = function(item) {

  };

  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };

});
