describe("AuthCtrl", function () {

    var $scope, ctrl, $timeout; //, $location;

    beforeEach(function () {
        module('endevr');
        inject(function ($rootScope, $controller, $q, _$timeout_) {

            $scope = $rootScope.$new();

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
      it("assignDev should be defined as a function", function() {
          expect(angular.isFunction($scope.assignDev)).toBe(true);
      });

      it("showGitHub should be defined as a function", function() {
          expect(angular.isFunction($scope.showGitHub)).toBe(true);
      });
    
      it("skipGitHub should be defined as a function", function() {
          expect(angular.isFunction($scope.skipGitHub)).toBe(true);
      });

      it('assignDev should change type to \'dev\'', function() {
        $scope.type = null;
        expect($scope.type).toEqual(null);
        $scope.assignDev();
        expect($scope.type).toEqual('dev');
      });      

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

      xit('should set needsAuthentication to false when devs are logged-in with BOTH LinkedIn and GitHub', function() {
        $scope.LinkedInAuthenticated = true;
        $scope.GitHubAuthenticated = true;
        expect($scope.needsAuthentication).toBe(false);
      });
    });

    describe('Employer Auth', function() {
      it("assignEmp should be defined as a function", function() {
          expect(angular.isFunction($scope.assignEmp)).toBe(true);
      });
      
      it('assignEmp should change type to \'emp\'', function() {
        $scope.type = null;
        expect($scope.type).toEqual(null);
        $scope.assignEmp();
        expect($scope.type).toEqual('emp');
      });

      it('type should not be \'emp\' if employers aren\'t logged-in', function() {
        $scope.type = null;
        expect($scope.type).toEqual(null);

        $scope.EmployerAuthenticated = false;
        $scope.Authenticated = false;

        expect($scope.type).toEqual(null);
      });
      
      // Controller logic is not being evaluated correctly be the test
      xit('should set Authenticated to false when employers are not authenticated', function() {
        $scope.EmployerAuthenticated = false;
        expect($scope.Authenticated).toBe(false);
      });

      xit('should set Authenticated to true when employers are authenticated', function() {
        $scope.EmployerAuthenticated = true;
        expect($scope.Authenticated).toBe(true);
      });

    });

});