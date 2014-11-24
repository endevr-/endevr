describe("AuthCtrl", function () {

    var $scope, ctrl, $timeout, localStorageService, $location;

    beforeEach(function () {
        module('endevr');
        inject(function ($rootScope, $controller, $q, _$timeout_, _localStorageService_, _$location_) {

            $scope = $rootScope.$new();
            localStorageService = _localStorageService_;
            $location = _$location_;
            $timeout = _$timeout_;

            ctrl = $controller('AuthCtrl', {
                $scope: $scope
            });
        });

    });

    // Controller-Wide Specs, user non-specific
    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });
    
    it('should not set the type when no user is authenticated', function() {
      $scope.LinkedInAuthenticated = false;    
      $scope.GitHubAuthenticated = false;
      $scope.EmployerAuthenticated = false;
      expect($scope.type).toEqual(undefined);
    });

    describe('Developer Auth', function() {
      it('should set needsAuthentication to true when devs not logged-in with LinkedIn and GitHub', function() {
        $scope.LinkedInAuthenticated = false;
        $scope.GitHubAuthenticated = false;
        if($scope.type !== 'emp') {
          expect($scope.type).not.toEqual('dev');
          expect($scope.needsAuthentication).toBe(true);
        }
      });

      // controller logic isn't being evaluated correctly here
      it('should set needsAuthentication to true when devs are NOT logged-in with BOTH LinkedIn AND GitHub', function() {
        $scope.LinkedInAuthenticated = true;
        $scope.GitHubAuthenticated = false;
        expect($scope.needsAuthentication).toBe(true);
        $scope.LinkedInAuthenticated = false;
        $scope.GitHubAuthenticated = true;
        expect($scope.needsAuthentication).toBe(true);
      });

      describe('showGitHub', function() {
        it("showGitHub should be defined as a function", function() {
            expect(angular.isFunction($scope.showGitHub)).toBe(true);
        });

        it('should return true if GitHub isn\'t authenticated', function() {
          $scope.LinkedInAuthenticated = true;
          expect($scope.showGitHub()).toBe(true);
        });

        it('should return false if both LinkedIn and GitHub are authenticated', function() {
          $scope.LinkedInAuthenticated = true;
          $scope.GitHubAuthenticated = true;
          expect($scope.showGitHub()).toBe(false);
        });
      });

      describe('assignDev', function() {
        beforeEach(function() {
          $scope.assignDev();
        });

        it("assignDev should be defined as a function", function() {
            expect(angular.isFunction($scope.assignDev)).toBe(true);
        });

        it('should set type to dev', function() {
          expect($scope.type).toBe('dev');
        });

        it('should set local storage usertype type to dev', function() {
          expect(localStorageService.get('usertype')).toBe('dev');
        });
      });

      describe('skipGitHub', function() {
        beforeEach(function() {
          spyOn($location, 'path');
          $scope.skipGitHub()
        });

        it("skipGitHub should be defined as a function", function() {
            expect(angular.isFunction($scope.skipGitHub)).toBe(true);
        });

        it('should set local storage to have a GitHub token', function() {
          expect(localStorageService.get('github-token')).toBe('true');
        });

        it('should set Authenticated to true', function() {
          expect($scope.Authenticated).toBe(true);
        });

        it('should navigate to browse', function() {
          expect($location.path).toHaveBeenCalled();
          expect($location.path).toHaveBeenCalledWith('/app/browse');
        });
      });
    });

    describe('Employer Auth', function() {
      //see true cases below lines 136
      describe('assignEmp', function() {
        beforeEach(function() {
          $scope.assignEmp();
        });

        it("assignEmp should be defined as a function", function() {
            expect(angular.isFunction($scope.assignEmp)).toBe(true);
        });

        it('should set type to emp', function() {
          expect($scope.type).toBe('emp');
        });

        it('should set local storage usertype type to emp', function() {
          expect(localStorageService.get('usertype')).toBe('emp');
        });
        
      });
    });
});

describe('AuthCtrl Dev Logged-in', function() {
  var $scope, ctrl, $timeout, localStorageService, $location;

  beforeEach(function () {
      module('endevr');
      inject(function ($rootScope, $controller, $q, _$timeout_, _localStorageService_, _$location_) {

          $scope = $rootScope.$new();
          localStorageService = _localStorageService_;
          $location = _$location_;
          $timeout = _$timeout_;

          ctrl = $controller('AuthCtrl', {
              $scope: $scope
          });

          localStorageService.set('linkedin-token', true);
          localStorageService.set('github-token', true);
      });

  });

  // Controller-Wide Specs, user non-specific
  it("should have a $scope variable", function() {
      expect($scope).toBeDefined();
  });

  it('should set developers to authenticated', function() {
    expect($scope.LinkedInAuthenticated).toBe(true);
    expect($scope.GitHubAuthenticated).toBe(true);
  });
});

describe('AuthCtrl Dev Logged-in', function() {
  var $scope, ctrl, $timeout, localStorageService, $location;

  beforeEach(function () {
      module('endevr');
      inject(function ($rootScope, $controller, $q, _$timeout_, _localStorageService_, _$location_) {

          $scope = $rootScope.$new();
          localStorageService = _localStorageService_;
          $location = _$location_;
          $timeout = _$timeout_;

          ctrl = $controller('AuthCtrl', {
              $scope: $scope
          });
          localStorageService.clearAll();
          localStorageService.set('employer-token', true);
      });

  });

  // Controller-Wide Specs, user non-specific
  it("should have a $scope variable", function() {
      expect($scope).toBeDefined();
  });

  it('should set employers to authenticated', function() {
    expect($scope.EmployerAuthenticated).toBe(true);
  });
});