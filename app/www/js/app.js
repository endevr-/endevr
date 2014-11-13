// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('endevr', [
  'ionic',
  'endevr.controllers',
  'endevr.directives',
  'ionic.contrib.ui.tinderCards',
  'ngCordova',
  'LocalStorageModule'
])

.run(function($ionicPlatform, $cordovaSplashscreen) {
  // Holds splash screen a set amount of time
  // before revealing default screen, browser.
  // Should eventually be set to a ready event.
  $ionicPlatform.ready(function() {
    setTimeout(function() {
      $cordovaSplashscreen.hide();
    }, 3000);

    // Hide the accessory bar by default
    // (remove this to show the accessory bar above the keyboard for form inputs)
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
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent' :{
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl'
        }
      }
    })

    .state('app.matches', {
      url: '/matches',
      views: {
        'menuContent' :{
          templateUrl: 'templates/matches.html',
          controller: 'MatchesCtrl'
        }
      }
    })

    .state('app.auth', {
      url: '/auth',
      views: {
        'menuContent' :{
          templateUrl: 'templates/auth.html',
          controller: 'AuthCtrl'
        }
      }
    })

    .state('app.single', {
      url: '/matches/:matchId',
      views: {
        'menuContent' :{
          templateUrl: 'templates/match.html',
          controller: 'MatchCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/auth');
});

angular.module('endevr.controllers', []);
angular.module('endevr.directives', []);
