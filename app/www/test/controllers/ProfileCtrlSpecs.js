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

    describe('toggleView function', function() {
        it('toggleView should be defined as a function', function() {
          expect(angular.isFunction($scope.toggleView)).toBe(true);
        });

        it('profileView should be true', function() {
          expect($scope.profileView).toBe(true);
        });

        it('title should be "Full Profile"', function() {
          expect($scope.title).toBe("Full Profile");
        });

        it('should change profileView to the opposite boolean', function() {
          expect($scope.profileView).toBe(true);
          $scope.toggleView();
          expect($scope.profileView).toBe(false);
        });

        it('should change the title', function() {
          expect($scope.title).toBe("Full Profile");
          $scope.toggleView();
          expect($scope.title).toBe("Card Profile");
        });
    });

});