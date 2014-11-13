describe("AuthCtrl", function () {

    var $scope, ctrl, $timeout; //, $location;

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
            ctrl = $controller('AuthCtrl', {
                $scope: $scope
            });
        });

    });

// There should be TWO describe statements:
// 1. Devs
// 2. Employers



    // Controller-Wide Specs, user non-specific
    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    it("logout should be defined", function() {
      expect($scope.logout).toBeDefined();
    });
    
    it('removeUserType should be defined', function() {
      expect($scope.removeUserType).toBeDefined();
    });
    
    it('removeUserType should change userType to null', function() {
      $scope.assignEmp();
      expect($scope.userType).toEqual('emp');
      $scope.removeUserType();
      expect($scope.userType).toEqual(null);
    });
    
    it('should not set the userType when no user is authenticated', function() {
      $scope.LinkedInAuthenticated = false;    
      $scope.GitHubAuthenticated = false;
      $scope.EmployerAuthenticated = false;
      expect($scope.userType).toEqual(null);
    });

    describe('Developer Auth', function() {
      it("assignDev should be defined", function() {
          expect($scope.assignDev).toBeDefined();
      });
    
      it('assignDev should change userType to \'dev\'', function() {
        $scope.userType = null;
        expect($scope.userType).toEqual(null);
        $scope.assignDev();
        expect($scope.userType).toEqual('dev');
      });      
    
      it('should set userType to \'dev\' when the user is either logged in with Linkedin or GitHub', function() {
        $scope.LinkedInAuthenticated = true;
        $scope.GitHubAuthenticated = false;
        expect($scope.userType).toEqual('dev');
        $scope.LinkedInAuthenticated = false;
        $scope.GitHubAuthenticated = true;
        expect($scope.userType).toEqual('dev');
      });

      it('should set needsAuthentication to true when devs not logged-in with LinkedIn and GitHub', function() {
        $scope.LinkedInAuthenticated = false;
        $scope.GitHubAuthenticated = false;
        if($scope.userType !== 'emp') {
          expect($scope.userType).not.toEqual('dev');
          expect($scope.needsAuthentication).toBe(true);
        }
      });

      it('should set needsAuthentication to true when devs are NOT logged-in with BOTH LinkedIn AND GitHub', function() {
        $scope.LinkedInAuthenticated = true;
        $scope.GitHubAuthenticated = false;
        expect($scope.needsAuthentication).toBe(true);
        $scope.LinkedInAuthenticated = false;
        $scope.GitHubAuthenticated = true;
        expect($scope.needsAuthentication).toBe(true);
      });

      it('should set needsAuthentication to false when devs are logged-in with BOTH LinkedIn and GitHub', function() {
        $scope.LinkedInAuthenticated = true;
        $scope.GitHubAuthenticated = true;
        expect($scope.needsAuthentication).toBe(false);
      });
    });

    describe('Employer Auth', function() {
      it("assignEmp should be defined", function() {
          expect($scope.assignEmp).toBeDefined();
      });
      
      it('assignEmp should change userType to \'emp\'', function() {
        $scope.userType = null;
        expect($scope.userType).toEqual(null);
        $scope.assignEmp();
        expect($scope.userType).toEqual('emp');
      });

      it('userType should not be \'emp\' if employers aren\'t logged-in', function() {
        $scope.userType = null;
        expect($scope.userType).toEqual(null);

        $scope.EmployerAuthenticated = false;
        $scope.Authenticated = false;

        expect($scope.userType).toEqual(null);
      });
      
      it('should set Authenticated to false when employers are not authenticated', function() {
        $scope.EmployerAuthenticated = false;
        expect($scope.Authenticated).toBe(false);
      });

      it('should set Authenticated to true when employers are authenticated', function() {
        $scope.EmployerAuthenticated = true;
        expect($scope.Authenticated).toBe(true);
      });

    });

});