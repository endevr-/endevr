angular.module('endevr.controllers', [])

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

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.url = 'value';

  $scope.loginLI = function () {
    var ref = window.open('https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=75omjdr2z9uzpl&state=ENDVRHR18SFCAUSA&redirect_uri=http://localhost/callback', '_blank', 'location=no');
    console.log("loginLI() hit!");

    ref.addEventListener("loadstart", function(event) {
      console.log("listening loadstart");

      $scope.url = event.url;
      $scope.$apply();

      if((event.url).startsWith("http://localhost/callback")) {

        console.log("callback!");

        requestToken = (event.url).split("code=")[1];

        console.log("request token: "+requestToken);

        $scope.url = requestToken;

        ref.close();
        $location.path("/app/browse")
      }
    });


  }

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
});
