describe("MatchesCtrl", function () {

    var $scope, ctrl, $timeout, $http //, $location;

    beforeEach(function () {
        module('endevr');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // $q - injected so we can create promises for our mocks.
        // _$timeout_ - injected to we can flush unresolved promises.
        inject(function ($rootScope, $controller, $q, _$timeout_) {

            // create a scope object for us to use.
            $scope = $rootScope.$new();
            // $location = $injector.get('$location');
            // assign $timeout to a scoped variable so we can use
            // $timeout.flush() later. Notice the _underscore_ trick
            // so we can keep our names clean in the tests.
            $timeout = _$timeout_;

            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('MatchesCtrl', {
                $scope: $scope
            });
        });

    });


    // Test 1: The simplest of the simple.
    // here we're going to make sure the $scope variable 
    // exists evaluated.
    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    it('should define a type and set interest based off local storage', function() {
      expect($scope.type).toBeDefined();
      expect($scope.interest).toBeDefined();
    });

    describe('decide', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.decide)).toBe(true);
      });

      it('should set the posid on scope', function() {
        $scope.posid = 1;
        $scope.decide(2);
        expect($scope.posid).toBe(2);
      });

      it('should set the posid on rootScope', function() {
        inject(function($rootScope) {
          $rootScope.posid = 1;
          $scope.decide(2);
          expect($rootScope.posid).toBe(2);
        });
      });

      it('should have called getMatches', function() {
        spyOn($scope, 'getMatches');
        $scope.decide(1);
        expect($scope.getMatches).toHaveBeenCalled();
      });
    });

    describe('Modals', function() {
      describe('showModal', function() {
        it('should be defined as a function', function() {
          expect(angular.isFunction($scope.showModal)).toBe(true);
        });

        // Tests fail due to the asynch-like-nature of creating a modal
        xit('should set the profile variable', function() {
          $scope.showModal("Adam");
          expect($scope.profile).toBe("Adam");
        });

        xit('should show the employer\'s profile modal', function() {
          $scope.type = 'dev';
          $scope.showModal();
          expect($scope.empProfileModal.show).toHaveBeenCalled();
        });

        xit('should show the developer\'s profile modal', function() {
          $scope.type = 'emp';
          $scope.showModal();
          expect($scope.devProfileModal.show).toHaveBeenCalled();
        });
      });
    });

    describe('checkIfExists', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.checkIfExists)).toBe(true);
      });

      it('should return false if element doesn\'t exist', function() {
        expect($scope.checkIfExists(null)).toBe(false);
      });

      it('should return true if element exists', function() {
        expect($scope.checkIfExists(true)).toBe(true);
      });
    });
    describe('navigate', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.navigate)).toBe(true);
      });
    });

    describe('backToJobs', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.backToJobs)).toBe(true);
      });

      it('should set noMatches and chose to false', function() {
        $scope.backToJobs();
        expect($scope.noMatches).toBe(false);
        expect($scope.chosen).toBe(false);
      });
    });

    describe('getMatches', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.getMatches)).toBe(true);
      });

      it('matches should be an array', function() {
        expect(Array.isArray($scope.matches)).toEqual(true);
      });

      xit('should make a GET request to */matches', function() {
        expect(expecation).toBe(equal);
      });

      xit('should update the matches array', function() {
        var oldMatchesArray = $scope.matches;
        $scope.getMatches();
        expect($scope.matches).not.toBe(oldMatchesArray);
      });
    });
});