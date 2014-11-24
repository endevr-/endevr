describe("ProfileCtrl", function() {
    var $scope, profile, ctrl, profileService, $timeout, $location, $ionicListDelegate, localStorageService; // $http

    beforeEach(function() {
        var profile = {"fname":"Adam","lname":"Back","location":"SF","skills":["JavaScript","HTML","Backbone"]};
        module('endevr');

        inject(function($rootScope, $controller, $q, _$timeout_, _$location_, _$ionicListDelegate_, _localStorageService_) {
            // Mock service
            profileService = {
              updateProfile: function(info, cb) {
                void(0);
              },
              getProfile: function(cb) {
                void(0);
              }
            };

            $scope = $rootScope.$new();
            $timeout = _$timeout_;
            $location = _$location_;
            $ionicListDelegate = _$ionicListDelegate_;
            localStorageService = _localStorageService_;
            localStorageService.set("profile", JSON.stringify(profile));
            ctrl = $controller('ProfileCtrl', {
                $scope: $scope,
                profileService: profileService
            });

            // Mock all modals used in ProfileCtrl
            var Modal = function() {void(0);}
            Modal.prototype.show = function() {void(0);};
            Modal.prototype.hide = function() {void(0);};
            $scope.modal = new Modal();
            $scope.itemModal = new Modal();
            $scope.newItemModal = new Modal();
        });
    });

    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    describe('showModal', function() {

      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.showModal)).toBe(true);
      });

      it('should set the category', function() {
        $scope.showModal('skills', ['JavaScript', 'HTML', 'Backbone']);
        expect($scope.category).toBe("Skills");
      });

      it('should set the items to a variable', function() {
        $scope.showModal('skills', ['JavaScript', 'HTML', 'Backbone']);
        expect($scope.items.toString()).toBe(['JavaScript', 'HTML', 'Backbone'].toString());
      });

      it('should show the modal', function() {
        spyOn($scope.modal, 'show');
        $scope.showModal('skills', ['JavaScript', 'HTML', 'Backbone']);
        expect($scope.modal.show).toHaveBeenCalled();
      });
    });

    describe('saveChanges', function() {
      beforeEach(function() {
        $scope.showModal('skills', ['JavaScript', 'HTML', 'Backbone']);
      });

      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.saveChanges)).toBe(true);
      });

      it('should save changes to the database', function() {
        spyOn(profileService, 'updateProfile');
        $scope.saveChanges();
        expect(profileService.updateProfile).toHaveBeenCalled();
      });

      it('should hide the modal', function() {
        spyOn($scope.modal, 'hide');
        $scope.saveChanges();
        expect($scope.modal.hide).toHaveBeenCalled();
      });

      it('should hide delete and reorder buttons', function() {
        expect($scope.showDelete).toBe(false);
        expect($scope.showReOrder).toBe(false);
      });
    });

    describe('cancelChanges', function() {
      beforeEach(function() {
        $scope.showModal('skills', ['JavaScript', 'HTML', 'Backbone']);
        spyOn(profileService, 'getProfile');
        spyOn($scope.modal, 'hide');
        $scope.cancelChanges();
      });

      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.cancelChanges)).toBe(true);
      });

      it('should delete items from the scope', function() {
        expect($scope.items).not.toBeDefined();
      });

      it('should call the profileService', function() {
        expect(profileService.getProfile).toHaveBeenCalled();
      });

      it('should hide the modal', function() {
        expect($scope.modal.hide).toHaveBeenCalled();
      });

      it('should hide delete and reorder buttons', function() {
        expect($scope.showDelete).toBe(false);
        expect($scope.showReOrder).toBe(false);
      });
    });

    describe('toggleDelete', function() {
      beforeEach(function() {
        $scope.showDelete = true;
        $scope.toggleDelete();
      });

      it('should be defined as a function', function() {  
        expect(angular.isFunction($scope.toggleDelete)).toBe(true);
      });

      it('should show delete', function() {
        expect($scope.showDelete).toBe(false);
      });

      it('should not show reorder', function() {
        expect($scope.showReOrder).toBe(false);
      });

      it('should toggle the delete button', function() {
        expect($scope.showDelete).toBe(false);
        $scope.toggleDelete();
        expect($scope.showDelete).toBe(true);
        $scope.toggleDelete();
        expect($scope.showDelete).toBe(false);
      });
    });

    describe('toggleReOrder', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.toggleReOrder)).toBe(true);
      });

      it('should flip showReOrder\'s boolean', function() {
        expect($scope.showReOrder).toBe(false);
        $scope.toggleReOrder();
        expect($scope.showReOrder).toBe(true);
        $scope.toggleReOrder();
        expect($scope.showReOrder).toBe(false);
      });

      it('should set showDelete as false', function() {
        $scope.toggleReOrder();
        expect($scope.showDelete).toBe(false);
      });
    });

    describe('onItemDelete', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.onItemDelete)).toBe(true);
      });

      it('should delete an item out of $scope.items', function() {
        $scope.items = [0, 1, 2];
        expect($scope.items[0]).toEqual(0);
        $scope.onItemDelete(0);
        expect($scope.items.indexOf(0)).toEqual(-1);
      });
    });

    describe('moveItem', function() {
      beforeEach(function() {
        $scope.items = [0,1,2,3];
      });

      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.moveItem)).toBe(true);
      });

      it('should move an item from one position to another', function() {
        expect($scope.items.indexOf(0)).toBe(0);
        expect($scope.items.indexOf(1)).toBe(1);
        $scope.moveItem(0, 0, 1);
        expect($scope.items.indexOf(1)).toBe(0);
        expect($scope.items.indexOf(0)).toBe(1);
      });

      it('should only move if the item named is the same item found at the fromIndex', function() { 
        expect($scope.moveItem(1, 0, 3)).toBe(false);
      });

      it('should not move an item beyond the length of the array', function() {
        expect($scope.moveItem(0,0,4)).toBe(false);
      });

      it('should not move an item that is beyond the length of the array', function() {
        expect($scope.moveItem(0,4,0)).toBe(false);
      });
    });

    describe('edit', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.edit)).toBe(true);
      });

      it('should save the item\'s current and old value', function() {
        $scope.edit(2);
        expect($scope.editItem.value).toBe(2);
        expect($scope.oldItemValue).toBe(2);
      });

      it('should how the itemModal', function() {
        spyOn($scope.itemModal, 'show');
        $scope.edit(2);
        expect($scope.itemModal.show).toHaveBeenCalled();
      });
    });

    describe('closeItemModal', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.closeItemModal)).toBe(true);
      });

      it('should call two methods', function() {
        spyOn($ionicListDelegate, 'closeOptionButtons');
        spyOn($scope.itemModal, 'hide');
        $scope.closeItemModal();
        expect($ionicListDelegate.closeOptionButtons).toHaveBeenCalled();
        expect($scope.itemModal.hide).toHaveBeenCalled();
      });

    });

    describe('saveItemModal', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.saveItemModal)).toBe(true);
      });

      // Not sure of format for i/o
      it('should save the edited item back into items', function() {
        $scope.items = ['Adam'];
        $scope.oldItemValue = 'Adam';
        $scope.saveItemModal({value:'Josh'});
        expect($scope.items.toString()).toBe("Josh");
      });

      it('should call two functions', function() {
        spyOn($ionicListDelegate, 'closeOptionButtons');
        spyOn($scope.itemModal, 'hide');
        $scope.items = ['Adam'];
        $scope.oldItemValue = 'Adam';
        $scope.saveItemModal({value:'Josh'});
        expect($ionicListDelegate.closeOptionButtons).toHaveBeenCalled();
        expect($scope.itemModal.hide).toHaveBeenCalled();
      });
    });

    describe('openNewListItemModal', function() {
      beforeEach(function() {
        spyOn($ionicListDelegate, 'closeOptionButtons');
        spyOn($scope.newItemModal, 'show');
        $scope.newItem = {'value': "Adam"};
        $scope.openNewListItemModal();
      });
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.openNewListItemModal)).toBe(true);
      });

      it('should hide delete and reorder buttons', function() {
        expect($scope.showDelete).toBe(false);
        expect($scope.showReOrder).toBe(false);
      });

      it('should empty new item\'s value', function() {
        expect($scope.newItem.value).toBe('');
      });

      it('should hide the modal and close option buttons', function() {
        expect($ionicListDelegate.closeOptionButtons).toHaveBeenCalled();
        expect($scope.newItemModal.show).toHaveBeenCalled();
      });
    });

    describe('closeNewItemModal', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.closeNewItemModal)).toBe(true);
      });

      it('should hide the newItemModal', function() {
        spyOn($scope.newItemModal, 'hide');
        $scope.closeNewItemModal();
        expect($scope.newItemModal.hide).toHaveBeenCalled();
      });
    });

    describe('saveNewItemModal', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.saveNewItemModal)).toBe(true);
      });

      it('should save a new item', function() {
        $scope.items = [0, 1, 2];
        $scope.saveNewItemModal({'value':3});
        expect($scope.items.indexOf(3)).toBe(3);
      });

      it('should hide the newItemModal', function() {
        spyOn($scope.newItemModal, 'hide');
        $scope.items = [0, 1, 2];
        $scope.saveNewItemModal({'value':3});
        expect($scope.newItemModal.hide).toHaveBeenCalled();
      });
    });
});

describe("ProfileCtrl: no profile already defined", function() {
    var $scope, profile, ctrl, profileService, $timeout, $location, $ionicListDelegate, localStorageService; // $http

    beforeEach(function() {
        var profile = {"fname":"Adam","lname":"Back","location":"SF","skills":["JavaScript","HTML","Backbone"]};
        module('endevr');

        inject(function($rootScope, $controller, $q, _$timeout_, _$location_, _$ionicListDelegate_, _localStorageService_) {
            // Mock service
            profileService = {
              getProfile: function(cb) {
                void(0);
              }
            };

            $scope = $rootScope.$new();
            $timeout = _$timeout_;
            $location = _$location_;
            $ionicListDelegate = _$ionicListDelegate_;
            localStorageService = _localStorageService_;
            localStorageService.clearAll();
            spyOn(profileService, 'getProfile');
            ctrl = $controller('ProfileCtrl', {
                $scope: $scope,
                profileService: profileService
            });


        });
    });

    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    it('should have called getProfile', function() {
      expect(profileService.getProfile).toHaveBeenCalled();
    });

  
});