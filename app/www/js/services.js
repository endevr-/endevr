angular.module('endevr.services', [])

.factory('LoginFactory', function($http, $location){
  var linkedInData;
  var loginLI = function (callback) {
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
                // $scope.url = data;
                // $scope.$apply();
                linkedInData = data;

                //Post the LinkedIn JSON data object to our server
                //Hard-coded localhost server, will need to change in production
                $http.post('http://localhost:9000/api/developers', data)
                  .success(function(response){
                    callback(response);
                  });
              });

          })
          .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

        $location.path("/");
        ref.close();
        // $scope.closeLogin();
      }
    });
  };

  return {
    loginLI: loginLI,
    setUp: function() {
      return linkedInData;
    }
  }
});
