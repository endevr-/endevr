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

    ref.addEventListener("loadstart", function(event) {

      if((event.url).startsWith("http://localhost/callback")) {

        requestToken = (event.url).split("code=")[1];

        var accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code='+ requestToken +'&redirect_uri=http://localhost/callback&client_id=75omjdr2z9uzpl&client_secret=T5nt3O8QEsZXY8vR';

        $http.post(accessTokenUrl)
          .success(function(data) {
            var accessToken = data.access_token;

            // need to specify the information we want to obtain
            // you can find the fields here:
            // https://developer.linkedin.com/documents/profile-fields

            var dataUrl = 'https://api.linkedin.com/v1/people/~:('+
                          'specialties,'+
                          'positions,'+
                          'skills,'+
                          'educations,'+
                          'industry)'+
                          '?oauth2_access_token='+accessToken;

            $http.get(dataUrl, {
              headers: { 'x-li-format': 'json'}
            })
              .success(function(data){
                $scope.url = data;
                $scope.$apply();
              });

          })
          .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

        $location.path("/");
        ref.close();
        $scope.closeLogin();
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
