angular.module('QueueService', ['ionic'])

.factory('queueService', function($http) {
  // url matches the server route that uses passport
  var storage = [];
  var currentCard = [];

  return {
    setCurrentCard: function() {
      currentCard.push( storage.pop() );
      return currentCard;
    },
    storeTotalCards: function(url,callback) {
      // var self = this;
      // $http.get(url)
      //   .success(function(data) {
      //     for (var card = 0; card < data.length; card++) {
      //       storage.push( data[card] );
      //     }
      //     var card = self.setCurrentCard();
      //     callback(card);
      //   })
      //   .error(function() {
      //     console.log('Error getting matches');
      //   });
      var possibleCards = [];

      for (var index = 0; index < 50; index++) {
        var company = {};
        company.name = 'company #'+index;
        company.image = 'http://www.farmvillefreak.com/farmville_images/facebook_farmville_freak_lobster_corgi_icon.png';
        possibleCards.push(company);
      }
      storage = possibleCards;
      var card = this.setCurrentCard();
      callback(card);
    },
    removeCard: function(user, choice) {
      if (currentCard.length > 0) {
        currentCard.pop();
      }

      if (currentCard.length === 0) {
        currentCard = this.setCurrentCard();
      }
    }
  }
});
