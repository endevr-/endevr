describe("CardsCtrl", function () {
    var queueService, $scope, $httpBackend, localStorageService, $timeout, ctrl, $ionicPopup, deferred;

    beforeEach(function () {
        module('endevr');

        inject(function ($rootScope, $q, $controller, _$timeout_, _localStorageService_, _$httpBackend_, _$ionicPopup_) {
            // Mock service
            queueService = {};
            queueService.storeTotalCards = function(jwt_token, userType, posid, callback) {
              return callback(['Adam']);
            };
            queueService.removeCurrentCard = function() {void(0)};    
            queueService.setCurrentCard = function() {void(0)};
            spyOn(queueService, 'storeTotalCards');
            
            $httpBackend = _$httpBackend_;
            $timeout = _$timeout_;
            $ionicPopup = _$ionicPopup_;

            // Promise resolution for $scope.request
            // deferred = $q.defer();
            // deferred.resolve('match!');
            // spyOn($ionicPopup, 'alert').andReturn(deferred.promise);


            // create a scope object for us to use.
            $scope = $rootScope.$new();
            $scope.$parent.posid = 2;
            
            localStorageService = _localStorageService_;
            localStorageService.set('usertype', 'dev');
            localStorageService.set('jwt_token', '123');
            userType = localStorageService.get('usertype');
            jwt_token = localStorageService.get('jwt_token');

            $httpBackend.whenGET('templates/profile.html').respond('');
            $httpBackend.whenGET('templates/auth.html').respond('');
            $httpBackend.whenGET('templates/matches.html').respond('');
            $httpBackend.whenGET('templates/card.html').respond('');
            $httpBackend.whenGET('templates/cards.html').respond('');
            $httpBackend.whenGET('templates/empprofile.html').respond('');
            $httpBackend.whenGET('templates/menu.html').respond('');
            $httpBackend.whenGET('templates/tutorialModal.html').respond('');
            $httpBackend.flush();

            ctrl = $controller('CardsCtrl', {
                $scope: $scope,
                queueService: queueService
            });


        });

    });

    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    it('should store cards for developers on initialization', function() {
      expect(queueService.storeTotalCards).toHaveBeenCalled();
    });

    describe('cardDestroyed', function() {
      it('should be definded as a function', function() {
        expect(angular.isFunction($scope.cardDestroyed)).toBe(true);
      });

      it('should removeCurrentCard and setCurrentCard', function() {
        spyOn(queueService, 'removeCurrentCard');
        spyOn(queueService, 'setCurrentCard');
        $scope.cardDestroyed();
        expect(queueService.removeCurrentCard).toHaveBeenCalled();
        expect(queueService.setCurrentCard).toHaveBeenCalled();
      });

      it('should set noCards to true', function() {
        $scope.cards = [];
        $scope.cardDestroyed();
        expect($scope.noCards).toBe(true);
      });

      it('should set noCards to false', function() {
        $scope.cards = [0, 1, 2];
        $scope.cardDestroyed();
        expect($scope.noCards).toBe(false);
      });
    });

    describe('request', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.request)).toBe(true);
      });

      describe('for developers', function() {
        var url, card, usertype, interest;

        beforeEach(function() {
          url = 'http://localhost:9000/api/developers/matches?jwt_token=123&usertype=dev' 
          card = {'id': 5};
          usertype = 'dev';
          interest = true;
        });

        it('should make a post request for developers', function() {
          var data = {'match': false};
          var status = 200;
          $httpBackend.whenPOST(url, {'posid':5,'devint':true}).respond(data, status);
          $scope.request(url, card,usertype, interest);
          $httpBackend.flush();
          // should test a promise here
        });

        xit('should alert if a match was made', function() {
          var data = {'match': true};
          var status = 200;

          $httpBackend.whenPOST(url, {'posid':5,'devint':true}).respond(data, status);
          $scope.request(url, card,usertype, interest);
          $httpBackend.flush();
          // should test a promise here
        });

        it('should throw an error for developers', function() {
          var data;
          var status = 500;

          $httpBackend.whenPOST(url, {'posid':5,'devint':true}).respond(500, '');
          $scope.request(url, card, usertype, interest);
          $httpBackend.flush();
          expect(data).not.toBeDefined();
        });
      });

      describe('for employers', function() {
        var url, card, usertype, interest;

        beforeEach(function() {
          url = 'http://localhost:9000/api/employers/matches?jwt_token=456&usertype=emp';
          card = {'id': 5};
          usertype = 'emp';
          interest = true;
        });

        it('should make a post request for employers', function() {
          var data = {'match': false};
          var status = 200;
          $httpBackend.whenPOST(url, {'devid':5, 'posid':2,'empint':true}).respond(data, status);
          $scope.request(url, card, usertype, interest);
          $httpBackend.flush();
          // should test a promise here
        });

        xit('should alert if a match was made', function() {
          var data = {'match': true};
          var status = 200;

          $httpBackend.whenPOST(url, {'devid':5, 'posid':2,'empint':true}).respond(data, status);
          $scope.request(url, card,usertype, interest);
          $httpBackend.flush();
          // should test a promise here
        });

        it('should throw an error for employers', function() {
          var data;
          var status = 500;

          $httpBackend.whenPOST(url, {'devid':5, 'posid':2,'empint':true}).respond(500, '');
          $scope.request(url, card, usertype, interest);
          $httpBackend.flush();
          expect(data).not.toBeDefined();
        });
      });
    });
});