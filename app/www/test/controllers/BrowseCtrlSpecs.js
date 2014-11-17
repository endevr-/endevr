describe("BrowseCtrl", function () {

    var $scope, ctrl, $timeout, store, ls; //, $location;

    beforeEach(function () {
        module('endevr');
        store= {};

        inject(function ($rootScope, $controller, $q, _$timeout_) {
            $scope = $rootScope.$new();
            $timeout = _$timeout_;

            ctrl = $controller('BrowseCtrl', {
                $scope: $scope
            });
        });

    });

    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    it("interest should be defined", function() {
        expect($scope.interest).toBeDefined();
    });

    // figure out how to mock local storage to check logic
    // Maybe: http://ngokevin.com/blog/angular-unit-testing/
});