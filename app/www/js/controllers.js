angular.module('endevr.controllers', ['ionic.contrib.ui.tinderCards', 'LocalStorageModule', 'ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $location) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.navigate = function(route) {
    $location.path('/app/'+route);
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function(str) {
      return this.indexOf(str) === 0;
    };
  }
})

.controller('BrowseCtrl', function($scope) {
  $scope.userType = 'Employers';
})

.controller('MatchesCtrl', function($scope, $location) {
  $scope.navigate = function(route) {
    $location.path('/app/matches/'+route);
  };

  $scope.matches = [
    { title: 'Hack Reactor', id: 1 },
    { title: 'Facebook', id: 2 },
    { title: 'Google', id: 3 },
    { title: 'Yahoo', id: 4 },
    { title: 'Twitter', id: 5 },
    { title: 'Airbnb', id: 6 }
  ];
})

.controller('EmployerCtrl', function($scope, $stateParams) {
})

.controller('CardsCtrl', function($scope, $http, TDCardDelegate) {
  var cardTypes = [];

  //Right now, dev_id is hardcoded. Refactor at first opportunity
  $http.get('http://localhost:9000/api/developers/XX/cards')
    .success(function(data){
      console.log(data);
      // cardTypes = data;
      for (var i = 0; i < data.length; i++) {
        $scope.cards.push(data[i]);
      }
    })
    .error(function(){
      console.log('Error getting matches');
    });

  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = $scope.cards[Math.floor(Math.random() * $scope.cards.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
})

.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index, id) {
    console.log('Left swipe! UID: '+id);
    //Ping our server telling them this IS NOT a match using id
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index, id) {
    console.log('Right swipe! UID: '+id);
    //Ping our server telling them this IS a match using id
    $scope.addCard();
  };
})

//Auth Controllers
.controller('AuthController', function($scope, $state, localStorageService){
  if (localStorageService.get('linkedin-token')) {
    $scope.Authenticated = true;
  } else {
    $scope.needsAuthentication = true;
  }
})

.controller('LoginController', function($scope, LinkedInService){
  $scope.linkedinlogin = LinkedInService.login;
})
