describe("profileService", function () {

    var profileService, $httpBackend, localStorageService;

    beforeEach(function () {
        module('endevr');

        inject(function (_profileService_, _localStorageService_, _$httpBackend_) {
            localStorageService = _localStorageService_;
            localStorageService.set('jwt_token', 123);
            localStorageService.set('usertype', 'dev');
            profileService = _profileService_;

            $httpBackend = _$httpBackend_;

              $httpBackend.whenGET('templates/profile.html').respond('');
              $httpBackend.whenGET('templates/auth.html').respond('');
              $httpBackend.whenGET('templates/matches.html').respond('');
              $httpBackend.whenGET('templates/card.html').respond('');
              $httpBackend.whenGET('templates/cards.html').respond('');
              $httpBackend.whenGET('templates/empprofile.html').respond('');
              $httpBackend.whenGET('templates/menu.html').respond('');
              $httpBackend.flush();
        });


    });

    afterEach(function() {
         $httpBackend.verifyNoOutstandingExpectation();
         $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getProfile', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction(profileService.getProfile)).toBe(true);
      });

      it('should make a get request', function() {
        var response = {};
        response.skills = {0: 'hiking', 1: 'swimming', 2: 'coding'};
        response.education = {0: 'HS', 1: 'College', 2: 'HR'};
        response.positions = {0: 'Teacher', 1: 'Astronomer', 2: 'Photographer'};
        
        $httpBackend.whenGET('http://localhost:9000/api/developers/profile?jwt_token=123&usertype=dev')
          .respond(response);

        var profile;
        var cb = function(data) {
          profile = data;
        };

        profileService.getProfile(cb)
        $httpBackend.flush();
        expect(Array.isArray(profile.skills)).toBe(true);
        expect(Array.isArray(profile.education)).toBe(true);
        expect(Array.isArray(profile.positions)).toBe(true);
        expect(profile.skills[0]).toBe('hiking');
        expect(profile.education[1]).toBe('College');
        expect(profile.positions[2]).toBe('Photographer');
      });

      it('should trigger an error', function() {
        $httpBackend.whenGET('http://localhost:9000/api/developers/profile?jwt_token=123&usertype=dev')
          .respond(500, '');
        var profile;
        var cb = function(data) {
          profile = data;
        };
        profileService.getProfile(cb)
        $httpBackend.flush();
        expect(profile).not.toBeDefined();
      });

    });

    describe('updateProfile', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction(profileService.updateProfile)).toBe(true);
      });

      it('should update the user\'s profile', function() {
        var profile = {};
        profile.skills = {0: 'crochet', 1: 'swimming', 2: 'coding'};
        profile.education = {0: 'HS', 1: 'Music', 2: 'HR'};
        profile.positions = {0: 'Teacher', 1: 'Astronomer', 2: 'SAR'};

        var response = {};
        response.skills = {0: 'hiking', 1: 'swimming', 2: 'coding'};
        response.education = {0: 'HS', 1: 'College', 2: 'HR'};
        response.positions = {0: 'Teacher', 1: 'Astronomer', 2: 'Photographer'};
        
        $httpBackend.whenPOST('http://localhost:9000/api/developers/profile?jwt_token=123&usertype=dev')
          .respond(response);

        $httpBackend.whenGET('http://localhost:9000/api/developers/profile?jwt_token=123&usertype=dev')
          .respond(response);

        var cb = function(data) {
          profile = data;
        };

        expect(profile.skills[0]).toBe('crochet');
        expect(profile.education[1]).toBe('Music');
        expect(profile.positions[2]).toBe('SAR');
        profileService.updateProfile(response, cb);
        $httpBackend.flush();
        expect(Array.isArray(profile.skills)).toBe(true);
        expect(Array.isArray(profile.education)).toBe(true);
        expect(Array.isArray(profile.positions)).toBe(true);
        expect(profile.skills[0]).toBe('hiking');
        expect(profile.education[1]).toBe('College');
        expect(profile.positions[2]).toBe('Photographer');
      });

      it('should throw an error', function() {
        var updatedInfo = {'name': 'Hack Reactor'};
        var cb = function(data) {
          profile = data;
        };
        var name = 'Facebook';

        $httpBackend.whenPOST('http://localhost:9000/api/developers/profile?jwt_token=123&usertype=dev')
          .respond(500, '');

        expect(name).toBe('Facebook');
        profileService.updateProfile(updatedInfo, cb);
        $httpBackend.flush();
        expect(name).toBe('Facebook');
      });
    });
});