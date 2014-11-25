describe('MatchesCtrl', function() {
  describe('for developers', function() {
    describe('with success', function() {
      var $scope, ctrl, $location, $httpBackend, localStorageService, $ionicModal;
      
      beforeEach(function() {
        module('endevr');

        inject(function($rootScope, $controller, _localStorageService_, _$httpBackend_, _$location_) {
          // Create new scope and mock controller
          $scope = $rootScope.$new();
          ctrl = $controller('MatchesCtrl', {
            $scope: $scope
          });

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
              expect($scope.posid).toBe(2);
            });

            it('should set the posid on rootScope', function() {
              inject(function($rootScope) {
                $rootScope.posid = 1;
                $scope.decide(2);
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

    });

    describe('with failure', function() {
      var $scope, ctrl, $location, $httpBackend, localStorageService, $ionicModal;
      
      beforeEach(function() {
        module('endevr');

        inject(function($rootScope, $controller, _localStorageService_, _$httpBackend_, _$location_) {
          $scope = $rootScope.$new();
          ctrl = $controller('MatchesCtrl', {
                    $scope: $scope
          });

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
    }); 
  });

  describe('for employers', function() {
    describe('with success', function() {
      var $scope, ctrl, $location, $httpBackend, localStorageService, $ionicModal;
      
      beforeEach(function() {
        module('endevr');

        inject(function($rootScope, $controller, _localStorageService_, _$httpBackend_, _$location_) {
          $scope = $rootScope.$new();
          ctrl = $controller('MatchesCtrl', {
                    $scope: $scope
          });

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
    });

    describe('with failure', function() {
      var $scope, ctrl, $location, $httpBackend, localStorageService, $ionicModal;
      
      beforeEach(function() {
        module('endevr');

        inject(function($rootScope, $controller, _localStorageService_, _$httpBackend_, _$location_) {
          $scope = $rootScope.$new();
          ctrl = $controller('MatchesCtrl', {
                    $scope: $scope
          });

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