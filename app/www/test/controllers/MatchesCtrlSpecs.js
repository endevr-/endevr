describe('MatchesCtrl', function() {
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

  it('should have a defined scope', function() {
    expect($scope).toBeDefined();
  });

  afterEach(function() {
       $httpBackend.verifyNoOutstandingExpectation();
       $httpBackend.verifyNoOutstandingRequest();
  });
});
// when controller initializes
  // for developers
    // get Matches
  // for employers
    // get positions in if statement

// errors
  // respond 500