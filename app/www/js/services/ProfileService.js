angular.module('endevr.directives')

.factory('profileService', function($http, localStorageService) {

  var jwt_token = localStorageService.get('jwt_token');
  var userType = localStorageService.get('usertype');
  var profileUrl = 'https://endevr.herokuapp.com/api/developers/profile?jwt_token=' + jwt_token + '&usertype=' + userType;

  var getProfile = function(callback) {
    $http.get(profileUrl)
      .success(function(data) {

        var profile = data;

        // Change the skills object into an array so we can
        // display the data in order
        var skillsArray = [];

        for (var skill in profile.skills) {
          skillsArray[ parseInt(skill) ] = profile.skills[skill];
        }

        // Change the education object into an array so we can
        // display the data in order
        var educationArray = [];

        for (var school in profile.education) {
          educationArray[ parseInt(school) ] = profile.education[school];
        }

        // Change the positions object into an array so we can
        // display the data in order
        var positionsArray = [];

        for (var job in profile.positions) {
          positionsArray[ parseInt(job) ] = profile.positions[job];
        }

        profile.skills = skillsArray;
        profile.education = educationArray;
        profile.positions = positionsArray;

        callback(profile);

      })
      .error(function() {

        console.log('Error getting profile');

      });
  }

  var updateProfile = function(updatedInformation, callback) {
    $http.post(profileUrl, updatedInformation)
      .success(function() {
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
