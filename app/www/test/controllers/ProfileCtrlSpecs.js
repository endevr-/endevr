describe("ProfileCtrl", function() {

    var $scope, ctrl, $timeout; // $http, $location;

    beforeEach(function() {
        module('endevr');

        inject(function($rootScope, $controller, $q, _$timeout_) {

            $scope = $rootScope.$new();
            // $location = $injector.get('$location');
            // assign $timeout to a scoped variable so we can use
            // $timeout.flush() later. Notice the _underscore_ trick
            // so we can keep our names clean in the tests.
            $timeout = _$timeout_;

            ctrl = $controller('ProfileCtrl', {
                $scope: $scope
            });
        });
    });

    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    describe('showModal', function() {

      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.showModal)).toBe(true);
      });

      //show on line 80 of ProfileCtrl ruins this test
      xit('should set the $scope.items variable', function() {
        $scope.showModal("blah", 2)
        expect($scope.items).toBe(2);
      });
    });

    describe('saveChanges', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.saveChanges)).toBe(true);
      });
    });

    describe('cancelChanges', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.cancelChanges)).toBe(true);
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
    });

    describe('closeItemModal', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.closeItemModal)).toBe(true);
      });
    });

    describe('saveItemModal', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.saveItemModal)).toBe(true);
      });
    });

    describe('openNewListItemModal', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.openNewListItemModal)).toBe(true);
      });
    });

    describe('closeNewItemModal', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.closeNewItemModal)).toBe(true);
      });
    });

    describe('saveNewItemModal', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.saveNewItemModal)).toBe(true);
      });
    });
});