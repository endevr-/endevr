angular.module('endevr.directives')

.factory('empProfileService', function($http, localStorageService) {

  var jwt_token = localStorageService.get('jwt_token');
  var userType = localStorageService.get('usertype');
  var profileUrl = 'https://endevr.herokuapp.com/api/employers/profile?jwt_token=' + jwt_token + '&usertype=' + userType;

  var getProfile = function(callback) {
    $http.get(profileUrl)
      .success(function(data) {

        var profile = data;

        callback(profile);

      })
      .error(function() {

        console.log('Error getting profile');

      });
  }

  var updateProfile = function(updatedInformation, callback) {
    $http.post(profileUrl, updatedInformation)
      .success(function() {
        console.log('Updated Profile');
        getProfile(function(profile) {
          callback(profile);
        });
      })
      .error(function() {
        console.log('Error saving profile');
      });
  }

  return {
    getProfile: getProfile,
    updateProfile: updateProfile
  };
});
