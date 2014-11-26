describe("GitHubService", function () {

    var GitHubService, localStorageService, $location;

    beforeEach(function () {

        module('endevr');

        inject(function (_GitHubService_, _localStorageService_, _$location_) {
            $location = _$location_;
            localStorageService = _localStorageService_;
            localStorageService.set('jwt_token', 123);
            url = 'http://localhost:9000/auth/github?jwt_token=123';
            GitHubService = _GitHubService_;
            
            // loginWindow = {};
            // loginWindow['addEventListener'] = function(){void(0)};

        });


    });

    describe('login', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction(GitHubService.login)).toBe(true);
      });

      xit('should open a login window', function() {
        spyOn($window, 'open');
        spyOn(loginWindow,'addEventListener');
        GitHubService.login();
        expect($window.open).toHaveBeenCalled();
        expect(loginWindow.addEventListener).toHaveBeenCalled();
      });
    });
});