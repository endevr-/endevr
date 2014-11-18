describe("LoginCtrl", function () {

    var $scope, ctrl, $timeout, $httpBackend; //, $location;

    beforeEach(function () {
        module('endevr');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // $q - injected so we can create promises for our mocks.
        // _$timeout_ - injected to we can flush unresolved promises.
        inject(function ($rootScope, $controller, _$httpBackend_, $q, _$timeout_) {

            // create a scope object for us to use.
            $scope = $rootScope.$new();

            $timeout = _$timeout_;
            $httpBackend = _$httpBackend_;

            ctrl = $controller('LoginCtrl', {
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

    // Test 2: The simplest of the simple.
    // here we're going to make sure the $scope variable 
    // has closeLogin defined.
    it('linkedinlogin should be defined as a function', function() {
      expect($scope.linkedinlogin).toBeDefined();
      expect(typeof $scope.linkedinlogin).toBe('function');
    });

    it('githublogin should be defined as a function', function() {
      expect($scope.githublogin).toBeDefined();
      expect(typeof $scope.githublogin).toBe('function');
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


    it('employerSignup should be defined as a function', function() {
      expect($scope.employerSignup).toBeDefined();
      expect(typeof $scope.employerSignup).toBe('function');
    });

    it('logout should be defined as a function', function() {
      expect($scope.logout).toBeDefined();
      expect(typeof $scope.logout).toBe('function');
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