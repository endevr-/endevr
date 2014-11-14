angular.module('endevr.controllers')

.controller('ProfileCtrl', function($scope, $ionicModal, $http, localStorageService, $ionicListDelegate) {

  $scope.profile;
  var jwt_token = localStorageService.get('jwt_token');
  var userType = localStorageService.get('usertype');
  var profileUrl = 'http://localhost:9000/api/developers/profile?jwt_token=' + jwt_token + '&usertype=' + userType;

  // Retrieve the profile from the database
  $scope.getProfile = function() {

    $http.get(profileUrl)
      .success(function(data) {

        var profile = data;
        // Change the skills object into an array so we can
        // display the data in order
        var skillsArray = [];

        for (var skill in profile.skills) {
          skillsArray[ parseInt(skill) ] = profile.skills[skill];
        }

        // Change the education object into an array so we can
        // display the data in order
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

  $ionicModal.fromTemplateUrl('templates/editListItem.html', {

    scope: $scope

    })
    .then(function(modal) {

      $scope.itemModal = modal;

    });

  // Create the modal
  $ionicModal.fromTemplateUrl('templates/editList.html', {

    scope: $scope

    })
    .then(function(modal) {

      $scope.modal = modal;

    });

  // Open the modal
  $scope.showModal = function(category, items) {

    // Keeps track of what specific items we are editing
    $scope.category = category;
    $scope.items = items;
    $scope.modal.show();

  };

  // Close modal and save changes to the database
  $scope.saveChanges = function() {

    // Turn the items back into an object
    var updatedData = {};

    for (var index = 0; index < $scope.items.length; index++) {
      updatedData[""+index] = $scope.items[index];
    }

    // Object we are passing back to the database
    var updatedInformation = {

        category: $scope.category,
        data: updatedData

    };

    // POST request to the database
    $http.post(profileUrl, updatedInformation)
      .success(function() {

        $scope.getProfile();

      })
      .error(function() {

        console.log('Error saving profile');

      });

    // Close modal and set the editing features to false
    $scope.modal.hide();
    $scope.showDelete = false;
    $scope.showReOrder = false;

  };

  // Closes the modal without updating changes
  $scope.cancelChanges = function() {

    $scope.modal.hide();
    $scope.showDelete = false;
    $scope.showReOrder = false;

  };

  // Toggles delete buttons
  $scope.toggleDelete = function() {

    $scope.showDelete = !$scope.showDelete;
    $scope.showReOrder = false;

  }

  // Toggles the reorder buttons
  $scope.toggleReOrder = function() {

    $scope.showReOrder = !$scope.showReOrder;
    $scope.showDelete = false;

  }

  // Deletes item from the items array
  $scope.onItemDelete = function(item) {

    $scope.items.splice( $scope.items.indexOf(item), 1);

  };

  // Gives the ability to edit the item value
  $scope.edit = function(item) {
    $scope.editItem = item;
    $scope.oldItemValue = item;
    $scope.itemModal.show();

  };

  // Changes the order of the items in the array
  $scope.moveItem = function(item, fromIndex, toIndex) {

    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);

  };

  $scope.closeItemModal = function() {
    $ionicListDelegate.closeOptionButtons();
    $scope.itemModal.hide();
  }

  $scope.saveItemModal = function(editItem) {
    $scope.items[$scope.items.indexOf($scope.oldItemValue)] = editItem;
    $ionicListDelegate.closeOptionButtons();
    $scope.itemModal.hide();
  }

  // Initialize default values
  $scope.showDelete = false;
  $scope.showReOrder = false;
  $scope.getProfile();

});
