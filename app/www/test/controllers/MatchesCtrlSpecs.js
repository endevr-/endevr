describe("MatchesCtrl", function () {

    var $scope, ctrl, $timeout, $http, localStorageService, $location;

    beforeEach(function () {
        module('endevr');

        inject(function ($rootScope, $controller, $q, _$timeout_, _localStorageService_, _$location_) {

            $scope = $rootScope.$new();
            $timeout = _$timeout_;
            $location = _$location_;
            
            $location.path = function(route) {
              return '/app/matches/'+route;
            };

            localStorageService = _localStorageService_;
            localStorageService.set('usertype', 'dev');

            ctrl = $controller('MatchesCtrl', {
                $scope: $scope
            });

            var Modal = function() {void(0);}
            Modal.prototype.show = function() {void(0);};
            Modal.prototype.hide = function() {void(0);};
            $scope.devProfileModal = new Modal();
            $scope.empProfileModal = new Modal();
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

        it('should set the profile variable', function() {
          $scope.showModal("Adam");
          expect($scope.profile).toBe("Adam");
        });

        it('should show the employer\'s profile modal', function() {
          $scope.type = 'dev';
          spyOn($scope.empProfileModal, 'show');
          $scope.showModal("Adam");
          expect($scope.empProfileModal.show).toHaveBeenCalled();
        });

        it('should show the developer\'s profile modal', function() {
          $scope.type = 'emp';
          spyOn($scope.devProfileModal, 'show');
          $scope.showModal("Adam");
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
      beforeEach(function() {
        spyOn($location, 'path');
      });

      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.navigate)).toBe(true);
      });

      it('should navigate to a matche sroute', function() {
        $scope.navigate('Adam');
        expect($location.path).toHaveBeenCalled();
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

      it('should differentiate for employers', function() {
        $scope.type = 'emp';
        $scope.getMatches();
      });
    });
});

describe("MatchesCtrl", function () {

    var $scope, ctrl, $timeout, $http, localStorageService, $location;

    beforeEach(function () {
        module('endevr');

        inject(function ($rootScope, $controller, $q, _$timeout_, _localStorageService_, _$location_) {

            $scope = $rootScope.$new();
            $timeout = _$timeout_;
            $location = _$location_;
            
            $location.path = function(route) {
              return '/app/matches/'+route;
            };

            localStorageService = _localStorageService_;
            localStorageService.set('usertype', 'emp');
            localStorageService.set('jwt_token', '123');

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
    });

    describe('initialization logic', function() {
      it('should set chosen to false', function() {
        expect($scope.chosen).toBe(false);
      });

      it('should set interest to Developers', function() {
        expect($scope.interest).toBe('Developers');
      });
    });
});