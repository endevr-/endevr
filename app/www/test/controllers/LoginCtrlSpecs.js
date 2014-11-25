describe("LoginCtrl", function () {

    var $scope, ctrl, $timeout, $httpBackend, localStorageService;

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

            $httpBackend.whenGET('templates/profile.html').respond('');
            $httpBackend.whenGET('templates/auth.html').respond('');
            $httpBackend.whenGET('templates/matches.html').respond('');
            $httpBackend.whenGET('templates/card.html').respond('');
            $httpBackend.whenGET('templates/cards.html').respond('');
            $httpBackend.whenGET('templates/empprofile.html').respond('');
            $httpBackend.whenGET('templates/menu.html').respond('');
            $httpBackend.whenGET('templates/tutorialModal.html').respond('');
            $httpBackend.whenGET('templates/browse.html').respond('');
            $httpBackend.flush();
        });
    });

    afterEach(function() {
         $httpBackend.verifyNoOutstandingExpectation();
         $httpBackend.verifyNoOutstandingRequest();
    });

    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    describe('employerLogin', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.employerLogin)).toBe(true);
      });

      it('should not login with incorrect credentials', function() {
          var employer = {};
          employer['email'] = 'test@test.com';
          employer['password'] = 'wrong';
          $httpBackend.whenPOST('http://localhost:9000/api/employers/login', employer)
            .respond(401, '');
          $scope.employerLogin(employer);
          $httpBackend.flush();
          expect($scope.badlogin).toBe(true);
      });

      it('should not login if a jwt is not returned', function() {
        var employer = {};
        employer['email'] = 'test@test.com';
        employer['password'] = 'correct';
        $httpBackend.whenPOST('http://localhost:9000/api/employers/login', employer)
          .respond({'nojwthere':0}, 200);
        $scope.employerLogin(employer);
        $httpBackend.flush();
        expect($scope.badlogin).toBe(true);
      });

      it('should login with correct credentials', function() {
        var employer = {};
        employer['email'] = 'test@test.com';
        employer['password'] = 'correct';
        $httpBackend.whenPOST('http://localhost:9000/api/employers/login', employer)
          .respond({'jwt':123}, 200);
        $scope.employerLogin(employer);
        $httpBackend.flush();
        expect($scope.badlogin).toBe(false);
        expect($scope.duplicate).toBe(false);
        expect(localStorageService.get('employer-token')).toBe('true');
        expect(localStorageService.get('jwt_token')).toBe(123);
        expect(localStorageService.get('returning')).toBe('true');
        expect(localStorageService.get('usertype')).toBe('emp');
      });
    });

    describe('employerSignup', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.employerSignup)).toBe(true);
      });

      it('should not sign up with wrong credentials', function() {
          var employer = {};
          employer['email'] = 'test@test.com';
          employer['password'] = 'wrong';
          $httpBackend.whenPOST('http://localhost:9000/api/employers/new', employer)
            .respond(401, '');
          $scope.employerSignup(employer);
          $httpBackend.flush();
          expect($scope.badlogin).toBe(true);
      });

      it('should not signup (duplicate) if a jwt is not returned', function() {
        var employer = {};
        employer['email'] = 'test@test.com';
        employer['password'] = 'correct';
        $httpBackend.whenPOST('http://localhost:9000/api/employers/new', employer)
          .respond({'nojwthere':0}, 200);
        $scope.employerSignup(employer);
        $httpBackend.flush();
        expect($scope.duplicate).toBe(true);
      });

      it('should signup with correct credentials', function() {
        var employer = {};
        employer['email'] = 'test@test.com';
        employer['password'] = 'correct';
        $httpBackend.whenPOST('http://localhost:9000/api/employers/new', employer)
          .respond({'jwt':123}, 200);
        $scope.employerSignup(employer);
        $httpBackend.flush();
        expect($scope.badlogin).toBe(false);
        expect($scope.duplicate).toBe(false);
        expect(localStorageService.get('employer-token')).toBe('true');
        expect(localStorageService.get('jwt_token')).toBe(123);
        expect(localStorageService.get('returning')).toBe('true');
        expect(localStorageService.get('usertype')).toBe('emp');
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