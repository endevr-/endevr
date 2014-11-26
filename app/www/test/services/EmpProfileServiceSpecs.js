describe("empProfileService", function () {

    var empProfileService, $httpBackend, localStorageService; //, $location;

    beforeEach(function () {
        module('endevr');

        inject(function (_empProfileService_, _localStorageService_, _$httpBackend_) {
            localStorageService = _localStorageService_;
            localStorageService.set('jwt_token', 123);
            localStorageService.set('usertype', 'emp');
            empProfileService = _empProfileService_;

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
        expect(angular.isFunction(empProfileService.getProfile)).toBe(true);
      });

      it('should make a get request', function() {
        $httpBackend.whenGET('http://localhost:9000/api/employers/profile?jwt_token=123&usertype=emp')
          .respond({'name':'Facebook'});
        var name;
        var cb = function(data) {
          name = data['name'];
        };

        empProfileService.getProfile(cb)
        $httpBackend.flush();
        expect(name).toBe('Facebook');
      });

      it('should trigger an error', function() {
        $httpBackend.whenGET('http://localhost:9000/api/employers/profile?jwt_token=123&usertype=emp')
          .respond(500, '');
        var name;
        var cb = function(data) {
          name = data['name'];
        };
        empProfileService.getProfile(cb)
        $httpBackend.flush();
        expect(name).not.toBeDefined();
      });

    });

    describe('updateProfile', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction(empProfileService.updateProfile)).toBe(true);
      });

      it('should update the user\'s profile', function() {
        var updatedInfo = {'name': 'Hack Reactor'};
        var cb = function(data) {
          name = data['name'];
        };
        var name = 'Facebook';

        $httpBackend.whenPOST('http://localhost:9000/api/employers/profile?jwt_token=123&usertype=emp')
          .respond({'name':'Hack Reactor'});

        $httpBackend.whenGET('http://localhost:9000/api/employers/profile?jwt_token=123&usertype=emp')
          .respond({'name':'Hack Reactor'});

        expect(name).toBe('Facebook');
        empProfileService.updateProfile(updatedInfo, cb);
        $httpBackend.flush();
        expect(name).toBe('Hack Reactor');
      });

      it('should throw an error', function() {
        var updatedInfo = {'name': 'Hack Reactor'};
        var cb = function(data) {
          name = data['name'];
        };
        var name = 'Facebook';

        $httpBackend.whenPOST('http://localhost:9000/api/employers/profile?jwt_token=123&usertype=emp')
          .respond(500, '');

        expect(name).toBe('Facebook');
        empProfileService.updateProfile(updatedInfo, cb);
        $httpBackend.flush();
        expect(name).toBe('Facebook');
      });
    });
      


});