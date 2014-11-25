// pending until Card Ctrl is refactored into Cards
describe("CardCtrl: Employer", function () {

    var $scope, ctrl, $timeout, $httpBackend, localStorageService;

    beforeEach(function () {
        module('endevr');

        inject(function ($rootScope, $controller, $q, _$timeout_, _localStorageService_, _$httpBackend_) {

            // create a scope object for us to use.
            $scope = $rootScope.$new();
            
            // Mock parent controller
            $scope.$parent.cards = [{'name':'Adam'}, {'name':'Santa'}];
            $scope.$parent.request = function() {
                void(0);
            };

            // Mock local storage
            localStorageService = _localStorageService_;
            localStorageService.set('usertype', 'emp');
            localStorageService.set('jwt_token', 123);

            $timeout = _$timeout_;

            // Mock modal get for template
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
            $httpBackend.whenGET('templates/cardInformation.html').respond('');


            ctrl = $controller('CardCtrl', {
                $scope: $scope
            });

            $httpBackend.flush();
        });

    });

    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    /*
    Tests are commented because functions are not used on this iteration.
    Ability to click on card for more info is removed.

    it('information should be defined', function() {
       expect(angular.isFunction($scope.information)).toBe(true);
    });

    it('closeInformation should be defined', function() {
       expect(angular.isFunction($scope.closeInformation)).toBe(true);
    });

    it('clickReject should be defined', function() {
      expect($scope.clickReject).toBeDefined();
    });

    it('clickAccept should be defined', function() {
      expect($scope.clickAccept).toBeDefined();
    });
    */

    describe('cardSwipedLeft', function() {
      it('cardSwipedLeft should be defined', function() {
        expect(angular.isFunction($scope.cardSwipedLeft)).toBe(true);
      });

      it('should make a request on swipe', function() {
        spyOn($scope.$parent, 'request');
        $scope.cardSwipedLeft(['card']);
        expect($scope.$parent.request).toHaveBeenCalled();
        expect($scope.$parent.request).toHaveBeenCalledWith('http://localhost:9000/api/employers/matches?jwt_token=123&usertype=emp', ['card'], 'emp', false);
      });
    });

});

describe("CardCtrl: Developer", function () {

    var $scope, ctrl, $timeout, $http, localStorageService;

    beforeEach(function () {
        module('endevr');

        inject(function ($rootScope, $controller, $q, _$timeout_, _localStorageService_) {

            // create a scope object for us to use.
            $scope = $rootScope.$new();
            $scope.$parent.cards = [{'name':'Adam'}, {'name':'Santa'}];
            $scope.$parent.request = function() {
                void(0);
            };
            localStorageService = _localStorageService_;
            localStorageService.set('usertype', 'dev');
            localStorageService.set('jwt_token', 456);

            $timeout = _$timeout_;

            ctrl = $controller('CardCtrl', {
                $scope: $scope
            });
        });

    });

    describe('cardSwipedRight', function() {
      it('cardSwipedRight should be defined', function() {
        expect(angular.isFunction($scope.cardSwipedRight)).toBe(true);
      });

      it('should make a request on swipe ', function() {
        spyOn($scope.$parent, 'request');
        $scope.cardSwipedRight(['card']);
        expect($scope.$parent.request).toHaveBeenCalled();
        expect($scope.$parent.request).toHaveBeenCalledWith('http://localhost:9000/api/developers/matches?jwt_token=456&usertype=dev', ['card'], 'dev', true);
      });
    });
});