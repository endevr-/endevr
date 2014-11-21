angular.module('endevr.controllers')

.controller('LoginCtrl', function($scope, $http, $state, $location, LinkedInService, GitHubService, localStorageService){
  $scope.linkedinlogin = LinkedInService.login;
  $scope.githublogin = GitHubService.login;
  $scope.employer = {};
  $scope.newEmployer = {};
  $scope.isNewEmployer = false;


  $scope.employerLogin = function(employer) {
    console.log(employer)
    $http.post('https://endevr.herokuapp.com/api/employers/login', {email: employer.email, password: employer.password})
      .success(function(data, status, headers, config){
        if (data.jwt) {
          $scope.duplicate = false;
          $scope.badlogin = false;
          localStorageService.set('employer-token', true);
          localStorageService.set('jwt_token', data.jwt);
          localStorageService.set('returning', true);
          localStorageService.set('usertype', 'emp');
          $location.path('/app/browse');
        } else {
          $scope.badlogin = true;
          console.log('Bad Username or Password');
        }
      })
      .error(function(data, status, headers, config){
        console.log('Bad Username or Password');
        $scope.badlogin = true;
      });
  };

  $scope.employerSignup = function(employer) {

    console.log(employer)
    $http.post('https://endevr.herokuapp.com/api/employers/new', {email: employer.email, password: employer.password})
      .success(function(data, status, headers, config){
        if (data.jwt) {
          $scope.duplicate = false;
          $scope.badlogin = false;
          localStorageService.set('employer-token', true);
          localStorageService.set('jwt_token', data.jwt);
          localStorageService.set('usertype', 'emp');
          $location.path('/app/browse');
        } else {
          $scope.duplicate = true;
          console.log('That username already exists');
        }
      })
      .error(function(data, status, headers, config){
        console.log('Bad Username or Password');
        $scope.badlogin = true;
      });
  };

  $scope.logout = function () {
    localStorageService.clearAll();
    $state.go('app.auth', {}, {reload: true});
  };

  $scope.changeEmployerStatus = function() {
    $scope.isNewEmployer = !$scope.isNewEmployer;
  }
});
