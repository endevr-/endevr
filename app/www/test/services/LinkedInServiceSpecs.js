describe("LinkedInService", function () {

    var LinkedInService, localStorageService, $location;

    beforeEach(function () {

        module('endevr');

        inject(function (_LinkedInService_, _localStorageService_, _$location_) {
            $location = _$location_;
            localStorageService = _localStorageService_;
            url = 'http://localhost:9000/auth/github?jwt_token=123';
            LinkedInService = _LinkedInService_;
        });


    });

    describe('login', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction(LinkedInService.login)).toBe(true);
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