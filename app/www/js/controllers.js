angular.module('endevr.controllers', ['ionic.contrib.ui.tinderCards', 'LocalStorageModule', 'ionic'])

.controller('BrowseCtrl', function($scope) {
  $scope.userType = 'Employers';
})

.controller('MatchesCtrl', function($scope, $location) {
  $scope.navigate = function(route) {
    $location.path('/app/matches/'+route);
  };

  $scope.matches = [
    { title: 'Hack Reactor', id: 1 },
    { title: 'Facebook', id: 2 },
    { title: 'Google', id: 3 },
    { title: 'Yahoo', id: 4 },
    { title: 'Twitter', id: 5 },
    { title: 'Airbnb', id: 6 }
  ];
})

.controller('EmployerCtrl', function($scope, $stateParams) {
})

.controller('CardsCtrl', function($scope, $http, TDCardDelegate) {
  var cardTypes = [];

  //Right now, dev_id is hardcoded. Refactor at first opportunity
  $http.get('http://localhost:9000/api/developers/XX/cards')
    .success(function(data){
      console.log(data);
      // cardTypes = data;
      for (var i = 0; i < data.length; i++) {
        $scope.cards.push(data[i]);
      }
    })
    .error(function(){
      console.log('Error getting matches');
    });

  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = $scope.cards[Math.floor(Math.random() * $scope.cards.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
})

.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index, id) {
    console.log('Left swipe! UID: '+id);
    //Ping our server telling them this IS NOT a match using id
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index, id) {
    console.log('Right swipe! UID: '+id);
    //Ping our server telling them this IS a match using id
    $scope.addCard();
  };
})

//Auth Controllers
.controller('AuthController', function($scope, $state, localStorageService){
  if (localStorageService.get('github-token')) {
    $scope.Authenticated = true;
  } else {
    $scope.needsAuthentication = true;
  }
})

.controller('LoginController', function($scope, LinkedInService, GitHubService){
  $scope.linkedinlogin = LinkedInService.login;
  $scope.githublogin = GitHubService.login;
})
