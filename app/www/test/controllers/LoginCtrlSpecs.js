describe("LoginCtrl", function () {

    var $scope, ctrl, $timeout, $httpBackend, localStorageService; //, $location;

    beforeEach(function () {
        module('endevr');

        inject(function ($rootScope, $controller, _$httpBackend_, $q, _$timeout_, _localStorageService_) {

            $scope = $rootScope.$new();

            $timeout = _$timeout_;
            $httpBackend = _$httpBackend_;
            localStorageService = _localStorageService_;

            ctrl = $controller('LoginCtrl', {
                $scope: $scope
            });
        });

    });

    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    describe('employerLogin', function() {
      it('employerLogin should be defined as a function', function() {
        expect(angular.isFunction($scope.employerLogin)).toBe(true);
      });

      xit('should not login with incorrect credentials', function() {
          var employer = {};
          employer['email'] = 'test@test.com';
          employer['password'] = 'wrong';
          $httpBackend.flush();
          $scope.employerLogin(employer);
          $timeout(function() {
            expect($scope.badlogin).toBe(true);
          }, 1000);
      });

      xdescribe('correct credentials', function() {
        var employer; 
        beforeEach(function() {
          employer = {
            email: 'test@test.com',
            password: 'password'
          };
        })

        xit('should set duplicate and badlogin to false', function() {
          $scope.employerLogin(employer);
          $httpBackend.flush();
          expect($scope.duplicate).toBe(false);
          expect($scope.badlogin).toBe(false);
        });

        xit('should return a JWT', function() {
          expect(data.jwt).toBeDefined();
        });
      });
    });

    describe('employerSignup', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.employerSignup)).toBe(true);
      });

      xit('should make a post request', function() {
        var data = {'jwt': 123};
        var employer = {
          'email': 'test@test.com',
          'password': '1234abcd'
        }
        $httpBackend.whenPOST('http://localhost:9000/api/employers/new')
          .respond(data);
        $scope.employerSignup(employer);
        expect($scope.duplicate).toBe(false);
      });
    });

    describe('logout', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.logout)).toBe(true);
      });

      it('should clear local storage', function() {
        localStorageService.set('usertype', 'emp');
        expect(localStorageService.get('usertype')).toBe('emp');
        $scope.logout();
        expect(localStorageService.get('usertype')).toBe(null);
      });
    });

    describe('changeEmployerStatus', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.changeEmployerStatus)).toBe(true);
      });

      it('should change the employer status', function() {
        expect($scope.isNewEmployer).toBe(false);
        $scope.changeEmployerStatus();
        expect($scope.isNewEmployer).toBe(true);
      });
    });
});