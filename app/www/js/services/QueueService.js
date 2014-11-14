angular.module('endevr.directives')

.factory('queueService', function($http) {

  var storage = [];
  var currentCard = [];

  return {
    addCardToStorage: function(card) {
      var response;

      if( card === undefined ) {
        return false;
      }
      storage.push(card);
      if( currentCard.length === 0) {
        this.setCurrentCard();
        response = "Current card set to " + card + ".\n " + storage.length + " card(s) in storage."; 
      } else {
        response = storage.length + " card(s) in storage."
      } 
      return response;
    },

    removeCardFromStorage: function(targetCard) {
      var removedCard = false;

      if( targetCard === undefined ) {
        return removedCard;
      }

      for(var card = 0; card < storage.length; card++) {
        if( storage[card] === targetCard) {
          removedCard = storage[card];
          break;
        }
      }

      return removedCard;
    },

    setCurrentCard: function() {
      if ( storage.length > 0 ) {
        currentCard.push( storage.pop() );
        return currentCard;
      } else {
        return false;
      }
    },

    storeTotalCards: function(jwt_token, userType,callback) {

      /*
       *    This section is for rendering cards from the server.
       */

      var self = this;
      var url;

      if (userType === 'dev') {
        url = 'http://localhost:9000/api/developers/XX/cards?jwt_token=' + jwt_token + '&usertype=' + userType;
      } else {
        url = 'http://localhost:9000/api/employers/XX/cards';
      }

      $http.get(url)
        .success(function(data) {
          for (var card = 0; card < data.length; card++) {
            storage.push( data[card] );
          }
          var card = self.setCurrentCard();
          callback(card);
        })
        .error(function() {
          console.log('Error getting matches');
        });

      /*
       *    This section is for rendering cards locally until the server is up.
       */

      // if (interest === 'Employers') {
      //
      //   var possibleCards = [];
      //
      //   for (var index = 0; index < 50; index++) {
      //
      //     var company = {};
      //     company.name = 'company #'+index;
      //     company.image = 'http://www.farmvillefreak.com/farmville_images/facebook_farmville_freak_lobster_corgi_icon.png';
      //     possibleCards.push(company);
      //
      //   }
      //
      //   storage = possibleCards;
      //   var card = this.setCurrentCard();
      //   callback(card);
      //
      // } else {
      //
      //   var possibleCards = [];
      //
      //   for (var index = 0; index < 50; index++) {
      //
      //     var employee = {};
      //     employee.name = 'employee #'+index;
      //     employee.image = 'http://oi62.tinypic.com/nnw4tt.jpg';
      //     possibleCards.push(employee);
      //
      //   }
      //
      //   storage = possibleCards;
      //   var card = this.setCurrentCard();
      //   callback(card);
      //
      // }

    },

    //remove currentCard
    removeCard: function() {
      var removedCard = false;

      if (currentCard.length > 0) {
        removedCard = currentCard.pop();
      }

      if (currentCard.length === 0 && storage.length > 0) {
        currentCard = this.setCurrentCard();
      }

      return removedCard;
    }
  }
});
