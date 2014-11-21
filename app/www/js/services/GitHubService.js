angular.module('endevr.controllers')

.factory('GitHubService', function($location, localStorageService) {
  var jwt_token = localStorageService.get('jwt_token');
  // url matches the server route that uses passport
  var url = 'https://endevr.herokuapp.com/auth/github?jwt_token='+jwt_token;
  var token, hasToken, userType, hasUserType;

  return {
    login: function() {
      var loginWindow = window.open(url, '_blank', 'location=no');

      loginWindow.addEventListener('loadstart', function(event) {
        hasUserType = event.url.indexOf('userType=');

        if (hasUserType > -1) {
          localStorageService.set('github-token', true);
          loginWindow.close();
          location.href = location.pathname;
        }

      });
    }
  }
});
