describe("EmpProfileCtrl", function () {

    var $scope, ctrl, $timeout, $httpBackend, localStorageService, $ionicListDelegate, $location, empProfileService, $window;

    beforeEach(function () {
        module('endevr');

        
        inject(function ($rootScope, $controller,  _$timeout_, _$httpBackend_, _localStorageService_, _$ionicListDelegate_, _$location_, _$window_) {
            // Mock service
            empProfileService = {
              updateProfile: function(info, cb) {
                void(0);
              },
              getProfile: function(cb) {
                void(0);
              }
            };

            $scope = $rootScope.$new();
           
            $timeout = _$timeout_;
            $httpBackend = _$httpBackend_;
            localStorageService = _localStorageService_;
            $ionicListDelegate = _$ionicListDelegate_;
            $location = _$location_;
            $window = _$window_;

            ctrl = $controller('EmpProfileCtrl', {
                $scope: $scope,
                empProfileService: empProfileService
            });

            var Modal = function() {void(0);}
            Modal.prototype.show = function() {void(0);};
            Modal.prototype.hide = function() {void(0);};
            $scope.modal = new Modal();
        });

    });

    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

    describe('showModal', function() {
      beforeEach(function() {
        spyOn($scope.modal, 'show');
        $scope.showModal('Company Name', 'name', 'Facebook');
      });
      
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.showModal)).toBe(true);
      });

      it('should set the category', function() {
        expect($scope.category).toBe("Company Name");
      });

      it('should set the fieldName and fieldName', function() {
        expect($scope.field.fieldName).toBe('name');
        expect($scope.field.field).toBe('Facebook');
      });

      it('should description', function() {
        expect($scope.modal.show).toHaveBeenCalled();
      });
    });

    describe('saveChanges', function() {
      beforeEach(function() {
        $scope.showModal('Company Name', 'name', 'Facebook');;
      });

      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.saveChanges)).toBe(true);
      });

      it('should save changes to the database', function() {
        spyOn(empProfileService, 'updateProfile');
        $scope.saveChanges('Facebook');
        expect(empProfileService.updateProfile).toHaveBeenCalled();
      });

      it('should hide the modal', function() {
        spyOn($scope.modal, 'hide');
        $scope.saveChanges('Facebook');
        expect($scope.modal.hide).toHaveBeenCalled();
      });
    });

    describe('cancelChanges', function() {
      beforeEach(function() {
        $scope.showModal('skills', ['JavaScript', 'HTML', 'Backbone']);
        spyOn(empProfileService, 'getProfile');
        spyOn($scope.modal, 'hide');
        $scope.cancelChanges();
      });

      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.cancelChanges)).toBe(true);
      });

      it('should delete field from the scope', function() {
        expect($scope.field).not.toBeDefined();
      });

      it('should call the empProfileService', function() {
        expect(empProfileService.getProfile).toHaveBeenCalled();
      });

      it('should hide the modal', function() {
        expect($scope.modal.hide).toHaveBeenCalled();
      });
    });

    describe('emailEmployer', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.emailEmployer)).toBe(true);
      });
    });

    describe('callNumber', function() {
      it('should be defined as a function', function() {
        expect(angular.isFunction($scope.callNumber)).toBe(true);
      });
    });
});