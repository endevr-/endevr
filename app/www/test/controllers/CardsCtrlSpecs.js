describe("CardsCtrl", function () {
    var queueService, $scope, $http, localStorageService, userType, jwt_token, $timeout, ctrl; //, $location;{

    beforeEach(function () {
        module('endevr');

        inject(function ($rootScope, $controller, $q, _$timeout_, _localStorageService_, _$http_) {
            // Mock service

            queueService = {};
            queueService.storeTotalCards = function(jwt_token, userType, posid, callback) {void(0)};
            queueService.removeCurrentCard = function() {void(0)};    
            queueService.setCurrentCard = function() {void(0)};
            spyOn(queueService, 'storeTotalCards');
            
            $http = _$http_;

            // create a scope object for us to use.
            $scope = $rootScope.$new();
            localStorageService = _localStorageService_;
            localStorageService.set('usertype', 'dev');
            localStorageService.set('jwt_token', '123');
            userType = localStorageService.get('usertype');
            jwt_token = localStorageService.get('jwt_token');

            $timeout = _$timeout_;

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

      xit('should make a post request', function() {
        spyOn($http, 'post');
        $scope.request('www.google.com', "{'id': 1}", 'dev', 'Opportunities')
        expect($http.post).toHaveBeenCalled();
      });
    });
});