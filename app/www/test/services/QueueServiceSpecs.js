describe("queueService", function () {

    var queueService, $http; //, $location;

    beforeEach(function () {
        module('endevr');

        inject(function (_queueService_) {
            queueService = _queueService_;
        });

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

      it('should return false if the target card is not found', function() {
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
        expect(queueService.setCurrentCard()).toBe(3);
      });
    });

    describe('storeTotalCards', function() {
      it('should have a storeTotalCards function', function() {
            expect(angular.isFunction(queueService.storeTotalCards) ).toBe(true);
      });
    });

    describe('removeCard', function() {
      it('should have a removeCard function', function() {
        expect(angular.isFunction(queueService.removeCard)).toBe(true);
      });

      it('should remove the current card', function() {
        queueService.addCardToStorage(1);
        expect(queueService.removeCard()).toBe(1);
      });

      it('should remove the current card, then update it with a new card from storage', function() {
        queueService.addCardToStorage(1);
        queueService.addCardToStorage(2);
        queueService.addCardToStorage(3);
        expect(queueService.removeCard()).toBe(1);
        expect(queueService.removeCard()).toBe(3);
      });

      it('should return false if no current card is set', function() {
        expect(queueService.removeCard()).toBe(false);
      });
    });


});