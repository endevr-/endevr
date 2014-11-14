angular.module('endevr.controllers')

.controller('ProfileCtrl', function($scope, $ionicModal, $http, localStorageService, ModalService) {

  $scope.profile;

  var jwt_token = localStorageService.get('jwt_token');
  var userType = localStorageService.get('usertype');
  var profileUrl = 'http://localhost:9000/api/developers/profile?jwt_token=' + jwt_token + '&usertype=' + userType;

  $http.get(profileUrl)
    .success(function(data) {
      $scope.profile = data;
    })
    .error(function() {
      console.log('Error getting profile');
    });

});
