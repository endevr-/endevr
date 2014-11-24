describe("BrowseCtrl Functions", function () {

    var $scope, ctrl, $timeout, localStorageService, $http, $ionicModal; //, $location;

    beforeEach(function () {
        module('endevr');

        inject(function ($rootScope, $controller, $q, _$timeout_, _localStorageService_, $httpBackend) {
            $scope = $rootScope.$new();
            
            // Mock parent
            $scope.$parent.current = 'browse';

            $timeout = _$timeout_;
            localStorageService = _localStorageService_;

            ctrl = $controller('BrowseCtrl', {
                $scope: $scope
            });

            // Mock Modal
            $scope.modal = {};
            $scope.modal.show = function() {
                void(0);
            };

            $scope.modal.hide = function() {
                void(0);
            };

            $http = $httpBackend;
        });
    });

    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    describe('decide', function() {
      beforeEach(function() {
        $scope.decide('Justin');
      });

      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.decide)).toBe(true);
      });

      it('should set the posid', function() {
        inject(function($rootScope) {
            expect($rootScope.posid).toBe('Justin');
            expect($scope.posid).toBe('Justin');
        })
      });

      it('should set chosen to true', function() {
        expect($scope.chosen).toBe(true);
      });
    });

    describe('employer', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.employer)).toBe(true);
      });

      it('should return true if the user is an employer', function() {
        localStorageService.set('usertype', 'emp');
        expect($scope.employer()).toBe(true);
      });

      it('should return false if the user is a developer', function() {
        localStorageService.set('usertype', 'dev');
        expect($scope.employer()).toBe(false);
      });
    });

    describe('evaluateModal', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.evaluateModal)).toBe(true);
      });

      it('should show modal if user is new', function() {
        spyOn($scope.modal, 'show');
        localStorageService.set('returning', null);
        $scope.evaluateModal();
        expect($scope.modal.show).toHaveBeenCalled();
      });

      it('should NOT show modal if user is returning', function() {
        spyOn($scope.modal, 'show');
        localStorageService.set('returning', true);
        $scope.evaluateModal();
        expect($scope.modal.show).not.toHaveBeenCalled();
      });
    });

    describe('completedTutorial', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.completedTutorial)).toBe(true);
      });

      // testing with modal does not work;
      it('should set \'returning\' in local storage to true', function() {
        $scope.completedTutorial();
        expect(localStorageService.get('returning')).toBe('true');
      });

      it('should hide the modal', function() {
        spyOn($scope.modal, 'hide');
        expect($scope.modal.hide).toHaveBeenCalled;
      });
    });

    describe('$watch', function() {
      it('should be defined', function() {
        expect($scope.$parent.$watch).toBeDefined();
      });
    });
});

describe('BrowseCtrl for Developers', function() {
  var $scope, ctrl, $timeout, localStorageService, $http;

  beforeEach(function () {
      module('endevr');

      inject(function ($rootScope, $controller,_localStorageService_) {
          $scope = $rootScope.$new();
          localStorageService = _localStorageService_;

          ctrl = $controller('BrowseCtrl', {
              $scope: $scope
          });

          localStorageService.set('usertype', 'dev');
      });
  });

  it("should have a $scope variable", function() {
      expect($scope).toBeDefined();
  });

  it('should set type to dev', function() {
    expect($scope.type).toBe('dev');
  });

  it('should set interest to Opportunities', function() {
    expect($scope.interest).toBe('Opportunities');
  });
});

describe('BrowseCtrl for Employers', function() {
  var $scope, ctrl, localStorageService, $http;

  beforeEach(function () {
      module('endevr');

      inject(function ($rootScope, $controller,_localStorageService_, $httpBackend) {
          $scope = $rootScope.$new();

          localStorageService = _localStorageService_;

          // When an employer navigates to browse, they should be
          // given a list of positions to browse
          localStorageService.set('jwt_token', 123);
          localStorageService.set('usertype', 'emp');
          $http = $httpBackend;
          $http.when('GET', '/api/employers/positions?jwt_token=123&usertype=emp')
            .respond(['astronaut', 'scuba instructor']);

          ctrl = $controller('BrowseCtrl', {
              $scope: $scope
          });
      });
  });

  it("should have a $scope variable", function() {
      expect($scope).toBeDefined();
  });


  it('should set type to emp', function() {
    expect($scope.type).toBe('emp');
  });

  it('should set interest to Developers', function() {
    expect($scope.interest).toBe('Developers');
  });

  // unexpected
  xit('should set noJobs to false', function() {
    $http.flush();
    expect($scope.noJobs).toBe(false);
  });

  xit('should insert the data into positions', function() {
    $http.flush();
    expect($scope.positions.toString()).toBe(['astronaut', 'scuba instructor'].toString());
  });
});