angular.module('endevr.directives')

.factory('GitHubService', function($location, localStorageService) {
  var jwt_token = localStorageService.get('jwt_token');
  // url matches the server route that uses passport
  var url = 'http://localhost:9000/auth/github?jwt_token='+jwt_token;
  var token, hasToken, userType, hasUserType;

  return {
    login: function() {
      var loginWindow = window.open(url, '_blank', 'location=no');

      loginWindow.addEventListener('loadstart', function(event) {
        hasUserType = event.url.indexOf('userType=');

        if (hasUserType > -1) {
          // token = event.url.match('oauth_token=(.*)&userType')[1];
          // userType = event.url.match('&userType=(.*)')[1];
          localStorageService.set('github-token', true);
          // localStorageService.set('token-date', JSON.stringify(new Date()));
          // localStorageService.set('userType', userType);
          loginWindow.close();
          location.href = location.pathname;
        }

      });
    }
  }
});
