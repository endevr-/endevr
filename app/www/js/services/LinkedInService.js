angular.module('endevr.directives')

.factory('LinkedInService', function($location, localStorageService) {
  // url matches the server route that uses passport
  var url = 'http://localhost:9000/auth/linkedin';
  var jwt_token, hasToken, userType, hasUserType;

  return {
    login: function() {
      var loginWindow = window.open(url, '_blank', 'location=no');
      loginWindow.addEventListener('loadstart', function(event) {
        hasToken = event.url.indexOf('?jwt_token=');
        hasUserType = event.url.indexOf('&userType=');

        if (hasToken > -1 && hasUserType > -1) {
          token = event.url.match('jwt_token=(.*)&userType')[1];
          userType = event.url.match('&userType=(.*)')[1];
          localStorageService.set('jwt_token', jwt_token);
          localStorageService.set('token-date', JSON.stringify(new Date()));
          localStorageService.set('userType', userType);
          loginWindow.close();
          location.href = location.pathname;
        }

      });
    }
  }
});
