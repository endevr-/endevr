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

    describe('navigate', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.navigate)).toBe(true);
      });
    });


    describe('getMatches', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.getMatches)).toBe(true);
      });

      it('matches should be an array', function() {
        expect(Array.isArray($scope.matches)).toEqual(true);
      });

      it('should define a type and set interest based off local storage', function() {
        expect($scope.type).toBeDefined();
        expect($scope.interest).toBeDefined();
      });

      it('should contain objects with position IDs', function() {
        $scope.matches = [{'positionID': 1}]
        expect($scope.matches[0][id]).toBe(1);
      });

      xit('should make a GET request to */matches', function() {
        expect(expecation).toBe(equal);
      });

      xit('should update the matches array', function() {
        var oldMatchesArray = $scope.matches;
        $scope.getMatches();
        expect($scope.matches).not.toBe(oldMatchesArray);
      });

      xit('should call getMatches when the view is loaded', function() {
        expect(expecation).toBe(equal);
      });
    });
});