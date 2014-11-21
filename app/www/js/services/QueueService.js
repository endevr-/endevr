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
        this.removeCurrentCard();
        currentCard.push( storage.pop() );
        return currentCard;
      } else {
        return false;
      }
    },

    storeTotalCards: function(jwt_token, userType, posid, callback) {
      /*
       *    This section is for rendering cards from the server.
       */

      var self = this;
      var url;

      if (userType === 'dev') {
        url = 'https://endevr.herokuapp.com/api/developers/cards?jwt_token=' + jwt_token + '&usertype=dev';
      } else {
        url = 'https://endevr.herokuapp.com/api/employers/cards?jwt_token=' + jwt_token + '&usertype=emp' + '&posid=' + posid;
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
          alert('Error getting cards');
        });

    },

    removeCurrentCard: function() {
      var removedCard = false;

      if (currentCard.length > 0) {
        removedCard = currentCard.pop();
      }

      return removedCard;
    }
  }
});
