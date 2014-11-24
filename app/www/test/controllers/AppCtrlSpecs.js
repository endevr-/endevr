describe("AppCtrl", function () {

    var $scope, ctrl, $timeout, $http, $ionicNavBarDelegate, localStorageService, $location;

    beforeEach(function () {
        module('endevr');

        
        inject(function ($rootScope, $controller, $q, _$timeout_, _$ionicNavBarDelegate_, _localStorageService_, _$location_) {
            $scope = $rootScope.$new();
           
            $timeout = _$timeout_;
            $ionicNavBarDelegate = _$ionicNavBarDelegate_;
            $location = _$location_;
            localStorageService = _localStorageService_;
            ctrl = $controller('AppCtrl', {
                $scope: $scope
            });
        });

    });

    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    describe('logout', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.logout)).toBe(true);
      });

      it('should clear local storage', function() {
        spyOn(localStorageService, 'clearAll');
        $scope.logout();
        expect(localStorageService.clearAll).toHaveBeenCalled();
        expect(localStorageService.get('usertype')).toBe(null);
      });

      it('should navigate to the /app/auth path', function() {
        spyOn($location, 'path');
        $scope.logout();
        expect($location.path).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/app/auth');
      });
    });

    describe('navigate', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.navigate)).toBe(true);
      });

      it('should set current to the route', function() {
        $scope.current = 'Adam';
        $scope.navigate('Anna');
        expect($scope.current).toBe('Anna');
      });

      it('should append \'again\' to the end of the route', function() {
        $scope.current = 'Anna/';
        $scope.navigate('Anna/');
        expect($scope.current).toBe('Anna/again');
      });

      it('should navigate to the route', function() {
        spyOn($location, 'path');
        $scope.navigate('Jeff/');
        expect($location.path).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/app/Jeff/');
      });

      it('should navigate to the profile route', function() {
        spyOn($location, 'path');
        localStorageService.set('usertype', 'dev');
        $scope.navigate('profile');
        expect($location.path).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/app/devprofile');
      });
    });

    describe('back', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.back)).toBe(true);
      });

      it('should call the ionic back delegate', function() {
        spyOn($ionicNavBarDelegate, 'back');
        $scope.back();
        expect($ionicNavBarDelegate.back).toHaveBeenCalled();
      });
    });

});