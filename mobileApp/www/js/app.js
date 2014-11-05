// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('endevr', ['ionic', 'endevr.controllers', 'ionic.contrib.ui.tinderCards'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.matches', {
      url: "/matches",
      views: {
        'menuContent' :{
          templateUrl: "templates/matches.html",
          controller: 'MatchesCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/matches/:employerId",
      views: {
        'menuContent' :{
          templateUrl: "templates/employer.html",
          controller: 'EmployerCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/browse');
})

// .directive('noScroll', function($document) {
//
//   return {
//     restrict: 'A',
//     link: function($scope, $element, $attr) {
//
//       $document.on('touchmove', function(e) {
//         e.preventDefault();
//       });
//     }
//   }
// })
//
// .controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate) {
//   var cardTypes = [{
//     title: 'Swipe down to clear the card',
//     image: 'img/pic.png'
//   }, {
//     title: 'Where is this?',
//     image: 'img/pic.png'
//   }, {
//     title: 'What kind of grass is this?',
//     image: 'img/pic2.png'
//   }, {
//     title: 'What beach is this?',
//     image: 'img/pic3.png'
//   }, {
//     title: 'What kind of clouds are these?',
//     image: 'img/pic4.png'
//   }];
//
//   $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
//
//   $scope.cardSwiped = function(index) {
//     $scope.addCard();
//   };
//
//   $scope.cardDestroyed = function(index) {
//     $scope.cards.splice(index, 1);
//   };
//
//   $scope.addCard = function() {
//     var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
//     newCard.id = Math.random();
//     $scope.cards.push(angular.extend({}, newCard));
//   }
// })
//
// .controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
//   $scope.goAway = function() {
//     var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
//     card.swipe();
//   };
// });

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.controller('CardsCtrl', function($scope, TDCardDelegate) {
  console.log('CARDS CTRL');
  var cardTypes = [
    { image: 'img/max.jpg' },
    { image: 'img/ben.png' },
    { image: 'img/perry.jpg' },
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
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };
});
