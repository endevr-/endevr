describe("queueService", function () {

    var queueService, $httpBackend;

    beforeEach(function () {
        module('endevr');

        inject(function (_queueService_, _$httpBackend_) {
            queueService = _queueService_;

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

    describe('addCardToStorage', function() {
      it('should have an addCardToStorage function', function() {
        expect(angular.isFunction(queueService.addCardToStorage)).toBe(true);
      });

      it('should add cards to storage', function() {
        queueService.addCardToStorage(1);
        expect(queueService.addCardToStorage(3)).toBe("1 card(s) in storage.");
      });

      it('should only run if the card is defined as a parameter', function() {
        expect(queueService.addCardToStorage()).toBe(false);
      });

      it('should set the currentCard if it isn\'t already defined', function() {
        expect(queueService.addCardToStorage(5)).toBe("Current card set to 5.\n 0 card(s) in storage.");
      });
    });

    describe('removeCardFromStorage', function() {
      it('should have an removeCardFromStorage function', function() {
        expect(angular.isFunction(queueService.removeCardFromStorage)).toBe(true);
      });

      it('should return false if there are no cards in storage', function() {
        expect(queueService.removeCardFromStorage(1)).toBe(false);
      });

      it('should return false if the target card is not found', function() {
        queueService.addCardToStorage(2);
        expect(queueService.removeCardFromStorage(1)).toBe(false);
      });

      it('should remove the target card from storage', function() {
        queueService.addCardToStorage(1);
        queueService.addCardToStorage(2);
        expect(queueService.removeCardFromStorage(2)).toBe(2);
      });

      it('should return false if a target card is not specified', function() {
        expect(queueService.removeCardFromStorage()).toBe(false);
      });
    });

    describe('setCurrentCard', function() {
      it("should have a setCurrentCard function", function() {
          expect(angular.isFunction(queueService.setCurrentCard) ).toBe(true);
      });

      it('should return false if the storage is empty', function() {
        expect(queueService.setCurrentCard()).toBe(false);
      });

      it('should make the currentCard the last card in the storage deck', function() {
        queueService.addCardToStorage(1);  
        queueService.addCardToStorage(2);
        queueService.addCardToStorage(3);
        expect(queueService.setCurrentCard()[0]).toBe(3);
      });
    });

    describe('storeTotalCards', function() {
      it('should have a storeTotalCards function', function() {
            expect(angular.isFunction(queueService.storeTotalCards) ).toBe(true);
      });

      it('should make a GET request for developers', function() {
        var cardsArray = [0,1,2,3];
        var returnedCard;
        var cb = function(card) {
          returnedCard = card;
        };

        $httpBackend.whenGET('http://localhost:9000/api/developers/cards?jwt_token=123&usertype=dev')
          .respond(cardsArray);
        
        queueService.storeTotalCards(123, 'dev', null, cb);
        $httpBackend.flush();
        expect(returnedCard[0]).toBe(3);
      });

      it('should make a GET request for employers', function() {
        var cardsArray = [4,5,6,7];
        var returnedCard;
        var cb = function(card) {
          returnedCard = card;
        };

        $httpBackend.whenGET('http://localhost:9000/api/employers/cards?jwt_token=456&usertype=emp&posid=1')
          .respond(cardsArray);
        
        queueService.storeTotalCards(456, 'emp', 1, cb);
        $httpBackend.flush();
        expect(returnedCard[0]).toBe(7);
      });

      it('should throw an error when incorrect parameters are passed', function() {
        var returnedCard;
        var cb = function(card) {
          returnedCard = card;
        };

        // incorrect jwt
        $httpBackend.whenGET('http://localhost:9000/api/employers/cards?jwt_token=123&usertype=emp&posid=1')
          .respond(500, '');
        // non-valid posid
        $httpBackend.whenGET('http://localhost:9000/api/employers/cards?jwt_token=456&usertype=emp&posid=2')
          .respond(500, '');
        // no callback
        $httpBackend.whenGET('http://localhost:9000/api/employers/cards?jwt_token=456&usertype=emp&posid=1')
          .respond(500, '');

        queueService.storeTotalCards(123, 'emp', 1, cb);
        queueService.storeTotalCards(456, 'emp', 2, cb);
        queueService.storeTotalCards(456, 'emp', 1);
        $httpBackend.flush();
        expect(returnedCard).not.toBeDefined();
      });
    });

    describe('removeCurrentCard', function() {
      it('should have a removeCurrentCard function', function() {
        expect(angular.isFunction(queueService.removeCurrentCard)).toBe(true);
      });

      it('should remove the current card', function() {
        queueService.addCardToStorage(1);
        expect(queueService.removeCurrentCard()).toBe(1);
      });

      it('should return false if no current card is set', function() {
        expect(queueService.removeCurrentCard()).toBe(false);
      });
    });


});