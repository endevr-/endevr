angular.module('endevr.services', [])

.factory('LoginFactory', function($http, $location){
  var createAccessTokenUrl = function(service, requestToken) {
    if (service === 'LinkedIn') {
      return 'https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code='+requestToken+'&redirect_uri=http://localhost/callback&client_id=75omjdr2z9uzpl&client_secret=T5nt3O8QEsZXY8vR';
    } else if (service === 'GitHub') {
      return 'https://github.com/login/oauth/access_token?code='+requestToken+'&client_id=d228adcb4ead3cd56858&client_secret=0cb1bbb292a4f51dedc35565d855dd48ccf5b8f3&redirect_uri=http://localhost/callback';
    }
  };

  var createDataUrl = function(service, accessToken) {
    if (service === 'LinkedIn') {
      return 'https://api.linkedin.com/v1/people/~:('+
                    'specialties,'+
                    'positions,'+
                    'skills,'+
                    'educations,'+
                    'industry)'+
                    '?oauth2_access_token=' + accessToken;
    } else if (service === 'GitHub') {
      return 'https://api.github.com/user?access_token=' + accessToken;
    }
  }

  var createRequestTokenUrl = function(service) {
    if (service === 'LinkedIn') {
      return 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=75omjdr2z9uzpl&state=ENDVRHR18SFCAUSA&redirect_uri=http://localhost/callback';
    } else if (service === 'GitHub') {
      return 'https://github.com/login/oauth/authorize?client_id=d228adcb4ead3cd56858&scope=user,repo,gist,read:org&state=ENDVRHR18SFCAUSA&redirect_uri=http://localhost/callback';
    }
  }

  var loginLogic = function(service, callback) {

    var requestTokenUrl = createRequestTokenUrl(service);

    var ref = window.open(requestTokenUrl, '_blank', 'location=no');

    ref.addEventListener("loadstart", function(event) {
      if( (event.url).startsWith("http://localhost/callback") ) {
        requestToken = (event.url).split("code=")[1];
        var accessTokenUrl = createAccessTokenUrl(service, requestToken);

        $http.post(accessTokenUrl)
          .success(function(data) {

            var accessToken;
            var headerObject;

            if (service === 'LinkedIn') {

              accessToken = data.access_token;
              headerObject = { headers: { 'x-li-format': 'json'} };

            } else if (service === 'GitHub') {

              accessToken = (data).split("access_token=")[1];
              accessToken = accessToken.substring(0, accessToken.indexOf('&'));

            }

            var dataUrl = createDataUrl(service, accessToken);

            $http.get(dataUrl, headerObject)
              .success(function(data) {
                var profileInfo = {};
                profileInfo.service = service;
                profileInfo.data = data;

                // callback(data);
                $http.post('http://localhost:9000/api/developers', profileInfo)
                  .success(function(response){
                    callback(response);
                  });
                $location.path("/");
                ref.close();

              });
          });
      }
    })
  };

  return {
    loginLI: function(callback) {
      loginLogic('LinkedIn', callback);
    },
    loginGH: function(callback) {
      loginLogic('GitHub', callback);
    }
  }
});
