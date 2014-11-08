angular.module('endevr.services', ['LocalStorageModule', 'ionic'])

.factory('LinkedInService', function($location, localStorageService) {

  // url matches the server route that uses passport
  var url = 'http://localhost:9000/auth/linkedin';
  var token, hasToken, userId, hasUserId;

  return {
    login: function() {
      var loginWindow = window.open(url, '_blank', 'location=no');
      console.log('before loadstart');
      loginWindow.addEventListener('loadstart', function(event){
        hasToken = event.url.indexOf('?oauth_token=');
        hasUserId = event.url.indexOf('&userId=');
        if (hasToken > -1 && hasUserId > -1) {
          token = event.url.match('oauth_token=(.*)&userId')[1];
          userId = event.url.match('&userId=(.*)')[1];
          localStorageService.set('linkedin-token', token);
          localStorageService.set('token-date', JSON.stringify(new Date()));
          localStorageService.set('userId', userId);
          loginWindow.close();
          location.href = location.pathname;
        }
      });
    }
  }
})

.factory('GitHubService', function($location, localStorageService) {

  // url matches the server route that uses passport
  var url = 'http://localhost:9000/auth/github';
  var token, hasToken, userId, hasUserId;

  return {
    login: function() {
      console.log("hello");
      var loginWindow = window.open(url, '_blank', 'location=no');
      console.log('before loadstart');
      loginWindow.addEventListener('loadstart', function(event){
        hasToken = event.url.indexOf('?oauth_token=');
        hasUserId = event.url.indexOf('&userId=');
        if (hasToken > -1 && hasUserId > -1) {
          token = event.url.match('oauth_token=(.*)&userId')[1];
          userId = event.url.match('&userId=(.*)')[1];
          localStorageService.set('github-token', token);
          localStorageService.set('token-date', JSON.stringify(new Date()));
          localStorageService.set('userId', userId);
          loginWindow.close();
          location.href = location.pathname;
        }
      });
    }
  }
});
