angular.module('endevr.controllers')

.controller('ProfileCtrl', function($scope, $ionicModal, $http, localStorageService, $ionicListDelegate, TDCardDelegate) {

  $scope.profile;

  var jwt_token = localStorageService.get('jwt_token');
  var userType = localStorageService.get('usertype');
  var profileUrl = 'http://localhost:9000/api/developers/profile?jwt_token=' + jwt_token + '&usertype=' + userType;

  $scope.profileView = true;

  $scope.title = 'Full Profile';

  $scope.toggleView = function() {
    $scope.profileView = !$scope.profileView;
    if ($scope.profileView) {
      $scope.title = 'Full Profile';
    } else {
      $scope.title = 'Card Profile';
    }
  }

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

  /*
   *    There are 3 different modals created in this section:
   *      -  Editing List
   *      -  Edit Existing List Item
   *      -  Adding New List Item
   */

  // Editing List - Modal creation
  $ionicModal.fromTemplateUrl('templates/editList.html', {
    scope: $scope
    })
    .then(function(modal) {
      $scope.modal = modal;
    });

  // Editing List - Show Modal
  $scope.showModal = function(category, items) {

    // Keeps track of what specific items we are editing
    $scope.category = category.charAt(0).toUpperCase() + category.slice(1);;
    $scope.items = items;
    $scope.modal.show();

  };

  // Editing List - Close modal and save changes to the database
  $scope.saveChanges = function() {
    alert('saving');
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

  // Editing List - Closes the modal without updating changes
  $scope.cancelChanges = function() {
    delete $scope.items;
    $scope.getProfile();
    $scope.modal.hide();
    $scope.showDelete = false;
    $scope.showReOrder = false;
  };

  // Editing List - Toggles delete buttons
  $scope.toggleDelete = function() {

    $scope.showDelete = !$scope.showDelete;
    $scope.showReOrder = false;

  }

  // Editing List - Toggles the reorder buttons
  $scope.toggleReOrder = function() {

    $scope.showReOrder = !$scope.showReOrder;
    $scope.showDelete = false;

  }

  // Editing List - Deletes item from the items array
  $scope.onItemDelete = function(item) {

    $scope.items.splice( $scope.items.indexOf(item), 1);

  };


  // Editing List - Changes the order of the items in the array
  $scope.moveItem = function(item, fromIndex, toIndex) {
    if( (toIndex < $scope.items.length && toIndex >= 0) &&
        fromIndex === $scope.items.indexOf(item) ) {
      $scope.items.splice(fromIndex, 1);
      $scope.items.splice(toIndex, 0, item);
    } else {
      return false;
    }

  };

  // Editing List - Gives the ability to edit the item value
  $scope.edit = function(item) {

    $scope.editItem.value = item;
    $scope.oldItemValue = item;
    $scope.itemModal.show();

  };

  // Editing List Item - Create modal
  $ionicModal.fromTemplateUrl('templates/editListItem.html', {
    scope: $scope
    })
    .then(function(modal) {
      $scope.itemModal = modal;
    });

  // Editing List Item - Closes the modal without updating changes
  $scope.closeItemModal = function() {
    $ionicListDelegate.closeOptionButtons();
    $scope.itemModal.hide();
  };

  // Editing List Item - Closes the modal with updating changes
  $scope.saveItemModal = function(editItem) {
    $scope.items[$scope.items.indexOf($scope.oldItemValue)] = editItem.value;
    $ionicListDelegate.closeOptionButtons();
    $scope.itemModal.hide();
  };

  // Add New List Item - Create modal
  $ionicModal.fromTemplateUrl('templates/addListItem.html', {
    scope: $scope
    })
    .then(function(modal) {
      $scope.newItemModal = modal;
    });

  // Add New List Item - Open the modal
  $scope.openNewListItemModal = function() {
    $ionicListDelegate.closeOptionButtons();
    $scope.showDelete = false;
    $scope.showReOrder = false;
    $scope.newItem.value = '';
    $scope.newItemModal.show();
  };

  // Add New List Item - Closes the modal without updating changes
  $scope.closeNewItemModal = function() {
    $scope.newItemModal.hide();
  };

  // Add New List Item = Closes the modal with updating changes
  $scope.saveNewItemModal = function(newItem) {
      $scope.items.push(newItem.value);
      $scope.newItemModal.hide();
  };

  // Initialize default values
  $scope.showDelete = false;
  $scope.showReOrder = false;
  $scope.editItem = {};
  $scope.newItem = {};
  $scope.getProfile();

});
