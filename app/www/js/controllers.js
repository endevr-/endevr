angular.module('endevr.controllers', ['ionic.contrib.ui.tinderCards'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $location, LoginFactory) {
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

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.gitHubProf = 'none';
  $scope.linkedInProf = 'none2';

  $scope.loginLI = function () {
    LoginFactory.loginLI($scope.getLinkedInProf);
    $scope.closeLogin();
  };

  $scope.loginGH = function() {
    LoginFactory.loginGH($scope.getGitHubProf);
    $scope.closeLogin();
  }

  $scope.getGitHubProf = function(profile) {
    $scope.gitHubProf = profile;
  };

  $scope.getLinkedInProf = function(profile) {
    $scope.linkedInProf = profile;
  };

  if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function(str) {
      return this.indexOf(str) === 0;
    };
  }
})

.controller('MatchesCtrl', function($scope) {
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

.controller('CardsCtrl', function($scope, TDCardDelegate) {
  var cardTypes = [
    { uid: 1, name: 'Josh', image: 'img/josh.jpg' },
    { uid: 2, name: 'Adam', image: 'img/adam.jpg' },
    { uid: 3, name: 'Jeff', image: 'img/jeff.png' }
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
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
});
