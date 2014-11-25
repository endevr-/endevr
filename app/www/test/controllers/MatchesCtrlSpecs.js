describe('MatchesCtrl', function() {
  describe('for developers', function() {
    describe('with success', function() {
      var $scope, ctrl, $location, $httpBackend, localStorageService;
      
      beforeEach(function() {
        module('endevr');

        inject(function($rootScope, $controller, _localStorageService_, _$httpBackend_, _$location_) {
          // Create new scope and mock controller
          $scope = $rootScope.$new();
          $location = _$location_;

          // Mock for navigate function
          $location.path = function(route) {
            return '/app/matches/'+route;
          };

          // Mock for modals
          var Modal = function() {void(0);}
          Modal.prototype.show = function() {void(0);};
          Modal.prototype.hide = function() {void(0);};
          $scope.devProfileModal = new Modal();
          $scope.empProfileModal = new Modal();

          // Mock for outstanding GET requests
          $httpBackend = _$httpBackend_;
          $httpBackend.whenGET('templates/profile.html').respond('');
          $httpBackend.whenGET('templates/auth.html').respond('');
          $httpBackend.whenGET('templates/matches.html').respond('');
          $httpBackend.whenGET('templates/card.html').respond('');
          $httpBackend.whenGET('templates/cards.html').respond('');
          $httpBackend.whenGET('templates/empprofile.html').respond('');
          $httpBackend.whenGET('templates/menu.html').respond('');
          $httpBackend.whenGET('templates/tutorialModal.html').respond('');
          $httpBackend.whenGET('templates/browse.html').respond('');
          $httpBackend.whenGET('templates/devProfileModal.html').respond('');
          $httpBackend.whenGET('templates/empProfileModal.html').respond('');
          $httpBackend.whenGET('http://localhost:9000/api/developers/matches?jwt_token=123&usertype=dev')
            .respond(['Adam', 'Anna', 'Benji']);

          // Mock local storage
          localStorageService = _localStorageService_;
          localStorageService.set('usertype', 'dev');
          localStorageService.set('jwt_token', 123);

          ctrl = $controller('MatchesCtrl', {
            $scope: $scope
          });

          // After the controller is created, there should be an outstanding GET
          // request because of the if-statement at the bottom. 
          $httpBackend.flush();
        });
      });
      
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should have a defined scope', function() {
        expect($scope).toBeDefined();
      });

      describe('decide', function() {
            it('should be defined as a function', function() {
              expect(angular.isFunction($scope.decide)).toBe(true);
            });

            it('should set the posid on scope', function() {
              $scope.posid = 1;
              $scope.decide(2);
              $httpBackend.flush();
              expect($scope.posid).toBe(2);
            });

            it('should set the posid on rootScope', function() {
              inject(function($rootScope) {
                $rootScope.posid = 1;
                $scope.decide(2);
                $httpBackend.flush();
                expect($rootScope.posid).toBe(2);
              });
            });

            it('should have called getMatches', function() {
              spyOn($scope, 'getMatches');
              $scope.decide(1);
              expect($scope.getMatches).toHaveBeenCalled();
            });
      });

      describe('showModal', function() {
        it('should be defined as a function', function() {
          expect(angular.isFunction($scope.showModal)).toBe(true);
        });

        it('should set the profile variable', function() {
          $scope.showModal("Adam");
          expect($scope.profile).toBe("Adam");
        });

        it('should show the employer\'s profile modal', function() {
          $scope.type = 'dev';
          spyOn($scope.empProfileModal, 'show');
          $scope.showModal("Adam");
          expect($scope.empProfileModal.show).toHaveBeenCalled();
        });

        it('should show the developer\'s profile modal', function() {
          $scope.type = 'emp';
          spyOn($scope.devProfileModal, 'show');
          $scope.showModal("Adam");
          expect($scope.devProfileModal.show).toHaveBeenCalled();
        });

        it('should not show a modal', function() {
          $scope.type = null;
          spyOn($scope.devProfileModal, 'show');
          $scope.showModal("Adam");
          expect($scope.devProfileModal.show).not.toHaveBeenCalled();
        });
      });

      describe('checkIfExists', function() {
        it('should be defined as a function', function() {
          expect(angular.isFunction($scope.checkIfExists)).toBe(true);
        });

        it('should return false if element doesn\'t exist', function() {
          expect($scope.checkIfExists(null)).toBe(false);
        });

        it('should return true if element exists', function() {
          expect($scope.checkIfExists(true)).toBe(true);
        });
      });

      describe('navigate', function() {
        beforeEach(function() {
          spyOn($location, 'path');
        });

        it('should be defined as a function', function() {
          expect(angular.isFunction($scope.navigate)).toBe(true);
        });

        it('should navigate to a matche sroute', function() {
          $scope.navigate('Adam');
          expect($location.path).toHaveBeenCalled();
        });
      });

      describe('backToJobs', function() {
        it('should be defined as a function', function() {
          expect(angular.isFunction($scope.backToJobs)).toBe(true);
        });

        it('should set noMatches and chose to false', function() {
          $scope.backToJobs();
          expect($scope.noMatches).toBe(false);
          expect($scope.chosen).toBe(false);
        });
      });

      describe('getMatches', function() {
        it('should be defined as a function', function() {
          expect(angular.isFunction($scope.getMatches)).toBe(true);
        });

        it('matches should be an array', function() {
          expect(Array.isArray($scope.matches)).toEqual(true);
        });

        it('should update the matches array by GET request', function() {
          $scope.getMatches();
          $httpBackend.flush();
          expect($scope.matches.toString()).toBe(['Adam', 'Anna', 'Benji'].toString());
          expect($scope.noMatches).toBe(false);
        });
      });
    });

    describe('with failure', function() {
      var $scope, ctrl, $httpBackend, localStorageService;
      
      beforeEach(function() {
        module('endevr');

        inject(function($rootScope, $controller, _localStorageService_, _$httpBackend_) {
          // Create new scope and mock controller
          $scope = $rootScope.$new();

          // Mock for outstanding GET requests
          $httpBackend = _$httpBackend_;
          $httpBackend.whenGET('templates/profile.html').respond('');
          $httpBackend.whenGET('templates/auth.html').respond('');
          $httpBackend.whenGET('templates/matches.html').respond('');
          $httpBackend.whenGET('templates/card.html').respond('');
          $httpBackend.whenGET('templates/cards.html').respond('');
          $httpBackend.whenGET('templates/empprofile.html').respond('');
          $httpBackend.whenGET('templates/menu.html').respond('');
          $httpBackend.whenGET('templates/tutorialModal.html').respond('');
          $httpBackend.whenGET('templates/browse.html').respond('');
          $httpBackend.whenGET('templates/devProfileModal.html').respond('');
          $httpBackend.whenGET('templates/empProfileModal.html').respond('');
          $httpBackend.whenGET('http://localhost:9000/api/developers/matches?jwt_token=123&usertype=dev')
            .respond(500, '');

          // Mock local storage
          localStorageService = _localStorageService_;
          localStorageService.set('usertype', 'dev');
          localStorageService.set('jwt_token', 123);

          ctrl = $controller('MatchesCtrl', {
            $scope: $scope
          });

          // After the controller is created, there should be an outstanding GET
          // request because of the if-statement at the bottom. 
          $httpBackend.flush();
        });
      });
      
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should have a defined scope', function() {
        expect($scope).toBeDefined();
      });

      it('getMatches should throw error on initialization', function() {
        $scope.getMatches();
        $httpBackend.flush();
        expect($scope.matches.length).toBe(0);
        expect($scope.noMatches).not.toBeDefined();
      });
    }); 

    describe('with no matches to return', function() {
      var $scope, ctrl, $httpBackend, localStorageService;
      
      beforeEach(function() {
        module('endevr');

        inject(function($rootScope, $controller, _localStorageService_, _$httpBackend_) {
          // Create new scope and mock controller
          $scope = $rootScope.$new();

          // Mock for outstanding GET requests
          $httpBackend = _$httpBackend_;
          $httpBackend.whenGET('templates/profile.html').respond('');
          $httpBackend.whenGET('templates/auth.html').respond('');
          $httpBackend.whenGET('templates/matches.html').respond('');
          $httpBackend.whenGET('templates/card.html').respond('');
          $httpBackend.whenGET('templates/cards.html').respond('');
          $httpBackend.whenGET('templates/empprofile.html').respond('');
          $httpBackend.whenGET('templates/menu.html').respond('');
          $httpBackend.whenGET('templates/tutorialModal.html').respond('');
          $httpBackend.whenGET('templates/browse.html').respond('');
          $httpBackend.whenGET('templates/devProfileModal.html').respond('');
          $httpBackend.whenGET('templates/empProfileModal.html').respond('');
          $httpBackend.whenGET('http://localhost:9000/api/developers/matches?jwt_token=123&usertype=dev')
            .respond([]);

          // Mock local storage
          localStorageService = _localStorageService_;
          localStorageService.set('usertype', 'dev');
          localStorageService.set('jwt_token', 123);

          ctrl = $controller('MatchesCtrl', {
            $scope: $scope
          });

          // After the controller is created, there should be an outstanding GET
          // request because of the if-statement at the bottom. 
          $httpBackend.flush();
        });
      });
      
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should have a defined scope', function() {
        expect($scope).toBeDefined();
      });

      it('getMatches should throw error on initialization', function() {
        $scope.getMatches();
        $httpBackend.flush();
        expect($scope.matches.length).toBe(0);
        expect($scope.noMatches).toBe(true);
      });
    });
  });

  describe('for employers', function() {
    describe('with success', function() {
      var $scope, ctrl, $httpBackend, localStorageService;
      
      beforeEach(function() {
        module('endevr');

        inject(function($rootScope, $controller, _localStorageService_, _$httpBackend_) {
          // Create new scope and mock controller
          $scope = $rootScope.$new();

          // Mock for outstanding GET requests
          $httpBackend = _$httpBackend_;
          $httpBackend.whenGET('templates/profile.html').respond('');
          $httpBackend.whenGET('templates/auth.html').respond('');
          $httpBackend.whenGET('templates/matches.html').respond('');
          $httpBackend.whenGET('templates/card.html').respond('');
          $httpBackend.whenGET('templates/cards.html').respond('');
          $httpBackend.whenGET('templates/empprofile.html').respond('');
          $httpBackend.whenGET('templates/menu.html').respond('');
          $httpBackend.whenGET('templates/tutorialModal.html').respond('');
          $httpBackend.whenGET('templates/browse.html').respond('');
          $httpBackend.whenGET('templates/devProfileModal.html').respond('');
          $httpBackend.whenGET('templates/empProfileModal.html').respond('');
          $httpBackend.whenGET('http://localhost:9000/api/employers/matches?jwt_token=456&usertype=emp&posid=1')
            .respond(['Adam', 'Anna', 'Benji']);
          $httpBackend.whenGET('http://localhost:9000/api/employers/positions?jwt_token=456&usertype=emp')
            .respond(['Facebook', 'Hack Reactor', 'Scuba Instructor']);

          // Mock local storage
          localStorageService = _localStorageService_;
          localStorageService.set('usertype', 'emp');
          localStorageService.set('jwt_token', 456);

          ctrl = $controller('MatchesCtrl', {
            $scope: $scope
          });
          $rootScope.posid = 1;
          // After the controller is created, there should be an outstanding GET
          // request because of the if-statement at the bottom. 
          $httpBackend.flush();
        });
      });
      
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should have a defined scope', function() {
        expect($scope).toBeDefined();
      });

      describe('getMatches', function() {
        it('should be defined as a function', function() {
          expect(angular.isFunction($scope.getMatches)).toBe(true);
        });

        it('matches should be an array', function() {
          expect(Array.isArray($scope.matches)).toEqual(true);
        });

        it('should update the matches array by GET request', function() {
          $scope.getMatches();
          $httpBackend.flush();
          expect($scope.matches.toString()).toBe(['Adam', 'Anna', 'Benji'].toString());
          expect($scope.noMatches).toBe(false);
        });
      });
    });

    describe('with failure', function() {
          var $scope, ctrl, $httpBackend, localStorageService;
          
          beforeEach(function() {
            module('endevr');

            inject(function($rootScope, $controller, _localStorageService_, _$httpBackend_) {
              // Create new scope and mock controller
              $scope = $rootScope.$new();

              // Mock for outstanding GET requests
              $httpBackend = _$httpBackend_;
              $httpBackend.whenGET('templates/profile.html').respond('');
              $httpBackend.whenGET('templates/auth.html').respond('');
              $httpBackend.whenGET('templates/matches.html').respond('');
              $httpBackend.whenGET('templates/card.html').respond('');
              $httpBackend.whenGET('templates/cards.html').respond('');
              $httpBackend.whenGET('templates/empprofile.html').respond('');
              $httpBackend.whenGET('templates/menu.html').respond('');
              $httpBackend.whenGET('templates/tutorialModal.html').respond('');
              $httpBackend.whenGET('templates/browse.html').respond('');
              $httpBackend.whenGET('templates/devProfileModal.html').respond('');
              $httpBackend.whenGET('templates/empProfileModal.html').respond('');
              $httpBackend.whenGET('http://localhost:9000/api/employers/matches?jwt_token=456&usertype=emp&posid=1')
                .respond(500, '');
              $httpBackend.whenGET('http://localhost:9000/api/employers/positions?jwt_token=456&usertype=emp')
                .respond(500, '');

              // Mock local storage
              localStorageService = _localStorageService_;
              localStorageService.set('usertype', 'emp');
              localStorageService.set('jwt_token', 456);

              ctrl = $controller('MatchesCtrl', {
                $scope: $scope
              });
              $rootScope.posid = 1;
              // After the controller is created, there should be an outstanding GET
              // request because of the if-statement at the bottom. 
              $httpBackend.flush();
            });
          });
          
          afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
          });

          it('should have a defined scope', function() {
            expect($scope).toBeDefined();
          });

          describe('getMatches', function() {
            it('should be defined as a function', function() {
              expect(angular.isFunction($scope.getMatches)).toBe(true);
            });

            it('matches should be an array', function() {
              expect(Array.isArray($scope.matches)).toEqual(true);
            });

            it('should update the matches array by GET request', function() {
              $scope.getMatches();
              $httpBackend.flush();
              expect($scope.matches.length).toBe(0);
              expect($scope.noMatches).not.toBeDefined();
            });
          });
    }); 

    describe('with no matches to return', function() {
      var $scope, ctrl, $httpBackend, localStorageService;
      
      beforeEach(function() {
        module('endevr');

        inject(function($rootScope, $controller, _localStorageService_, _$httpBackend_) {
          // Create new scope and mock controller
          $scope = $rootScope.$new();

          // Mock for outstanding GET requests
          $httpBackend = _$httpBackend_;
          $httpBackend.whenGET('templates/profile.html').respond('');
          $httpBackend.whenGET('templates/auth.html').respond('');
          $httpBackend.whenGET('templates/matches.html').respond('');
          $httpBackend.whenGET('templates/card.html').respond('');
          $httpBackend.whenGET('templates/cards.html').respond('');
          $httpBackend.whenGET('templates/empprofile.html').respond('');
          $httpBackend.whenGET('templates/menu.html').respond('');
          $httpBackend.whenGET('templates/tutorialModal.html').respond('');
          $httpBackend.whenGET('templates/browse.html').respond('');
          $httpBackend.whenGET('templates/devProfileModal.html').respond('');
          $httpBackend.whenGET('templates/empProfileModal.html').respond('');
          $httpBackend.whenGET('http://localhost:9000/api/employers/matches?jwt_token=456&usertype=emp&posid=1')
            .respond([]);
          $httpBackend.whenGET('http://localhost:9000/api/employers/positions?jwt_token=456&usertype=emp')
            .respond([]);

          // Mock local storage
          localStorageService = _localStorageService_;
          localStorageService.set('usertype', 'emp');
          localStorageService.set('jwt_token', 456);

          ctrl = $controller('MatchesCtrl', {
            $scope: $scope
          });
          $rootScope.posid = 1;
          // After the controller is created, there should be an outstanding GET
          // request because of the if-statement at the bottom. 
          $httpBackend.flush();
        });
      });
      
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should have a defined scope', function() {
        expect($scope).toBeDefined();
      });

      describe('getMatches', function() {
        it('should be defined as a function', function() {
          expect(angular.isFunction($scope.getMatches)).toBe(true);
        });

        it('matches should be an array', function() {
          expect(Array.isArray($scope.matches)).toEqual(true);
        });

        it('should update the matches array by GET request', function() {
          $scope.getMatches();
          $httpBackend.flush();
          expect($scope.matches.length).toBe(0);
          expect($scope.noMatches).toBe(true);
        });
      });
    }); 
  });

  describe('for other (else cases)', function() {
    var $scope, ctrl, $httpBackend, localStorageService;
    
    beforeEach(function() {
      module('endevr');

      inject(function($rootScope, $controller, _localStorageService_, _$httpBackend_) {
        // Create new scope and mock controller
        $scope = $rootScope.$new();

        // Mock for outstanding GET requests
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('templates/profile.html').respond('');
        $httpBackend.whenGET('templates/auth.html').respond('');
        $httpBackend.whenGET('templates/matches.html').respond('');
        $httpBackend.whenGET('templates/card.html').respond('');
        $httpBackend.whenGET('templates/cards.html').respond('');
        $httpBackend.whenGET('templates/empprofile.html').respond('');
        $httpBackend.whenGET('templates/menu.html').respond('');
        $httpBackend.whenGET('templates/tutorialModal.html').respond('');
        $httpBackend.whenGET('templates/browse.html').respond('');
        $httpBackend.whenGET('templates/devProfileModal.html').respond('');
        $httpBackend.whenGET('templates/empProfileModal.html').respond('');

        // Mock local storage
        localStorageService = _localStorageService_;
        localStorageService.set('usertype', 'other');
        localStorageService.set('jwt_token', 789);

        ctrl = $controller('MatchesCtrl', {
          $scope: $scope
        });
        $rootScope.posid = 1;
        // After the controller is created, there should be an outstanding GET
        // request because of the if-statement at the bottom. 
        $httpBackend.flush();
      });
    });
    
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a defined scope', function() {
      expect($scope).toBeDefined();
    });

    describe('getMatches', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.getMatches)).toBe(true);
      });

      it('should not update the matches array by GET request', function() {
        $scope.getMatches();
        expect($scope.matches.length).toBe(0);
        expect($scope.noMatches).not.toBeDefined();
      });
    });
    
  });
});
// when controller initializes
  // for developers
    // get Matches
  // for employers
    // get positions in if statement

// errors
  // respond 500