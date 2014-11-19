angular.module('endevr.controllers')

.controller('EmpProfileCtrl', function($scope, $ionicModal, $http, localStorageService, $ionicListDelegate, TDCardDelegate, $location, empProfileService, $window) {

  $scope.profile;

  // Editing List - Modal creation
  $ionicModal.fromTemplateUrl('templates/editEmpItem.html', {
    scope: $scope
    })
    .then(function(modal) {
      $scope.modal = modal;
    });

  // Editing List - Show Modal
  $scope.showModal = function(category, fieldName, field) {
    $scope.category = category.charAt(0).toUpperCase() + category.slice(1);
    $scope.field = {};
    $scope.field.fieldName = fieldName;
    $scope.field.field = field;
    $scope.modal.show();
  };

  // Editing List - Close modal and save changes to the database
  $scope.saveChanges = function(field) {
    // Turn the field back into an object
    var updatedData = {};
    // Object we are passing back to the database
    var updatedInformation = {
        category: $scope.field.fieldName,
        data: field
    };

    empProfileService.updateProfile(updatedInformation, function(profile) {
      $scope.profile = profile;
    });

    // Close modal and set the editing features to false
    $scope.modal.hide();
  };

  // Editing List - Closes the modal without updating changes
  $scope.cancelChanges = function() {
    delete $scope.field;
    empProfileService.getProfile(function(profile) {
      $scope.profile = profile;
    });
    $scope.modal.hide();
  };

  // Initialize default values
  $scope.editItem = {};
  $scope.newItem = {};
  empProfileService.getProfile(function(profile) {
    $scope.profile = profile;
  });

  $scope.emailEmployer = function(emailAddress) {
    $window.location.href = "mailto:" + emailAddress;    
  }

  $scope.callNumber = function(num) {
    var numberWithoutDashes = num.replace(/\W/g, "")
    $window.location.href = 'tel:'+ numberWithoutDashes;
  }

});
