angular.module('endevr.controllers')

.controller('CardsCtrl', function($scope, $http, TDCardDelegate, queueService, localStorageService, $ionicPopup) {
  var cardTypes = [];
  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  var userType = localStorageService.get('usertype');

  var jwt_token = localStorageService.get('jwt_token');

  //$scope.empty tracks if there are more cards in the deck
  $scope.noCards = false;

  if (userType === 'dev') {
    queueService.storeTotalCards( jwt_token, userType, null, function(card) {
      $scope.cards = card;
      if ($scope.cards.length === undefined) {
        $scope.noCards = true;
      } else {
        $scope.noCards = false;
      }
    });
  }

  $scope.$parent.$watch('posid', function(newVal, oldVal) {
    if (newVal !== oldVal) {
      queueService.storeTotalCards( jwt_token, userType, newVal, function(card) {
        $scope.cards = card;
        check = false;
        if ($scope.cards.length === undefined) {
          $scope.noCards = true;
        } else {
          $scope.noCards = false;
        }
      });
    }
  });

  $scope.cardDestroyed = function() {
    queueService.removeCurrentCard();
    queueService.setCurrentCard();

    //If there are no cards in queue, tell the user
    if ($scope.cards.length === 0) {
      $scope.noCards = true;
    } else {
      $scope.noCards = false;
    }
  };

  $scope.request = function(url, card, usertype, interest) {

    var fields = {};
    // alert(url);
    if (usertype === 'dev') {
      //Remove the hardcoded value on line 29 for the real developer ID
      // fields.devid = 1;
      fields.posid = card.id;
      fields.devint = interest;

      $http.post(url, fields)
        .success(function(data, status, headers, config) {
          // alert("" + data.id + " " + data.match);

          if (data.match === true) {
            $ionicPopup.alert({
              title: '<h2 class="empProfile">Congratulations!</h2>',
              template: '<center>You have a new match!</center>'
            }).then(function(res) {
              // nothing to do.
            });
          }
        })
        .error(function(data, status, headers, config) {
        });

    } else {
      fields.devid = card.id;
      //Remove the hardcoded value on line 37 for actual position ID
      fields.posid = $scope.$parent.posid;
      fields.empint = interest;

      $http.post(url, fields)
        .success(function(data, status, headers, config) {
          // alert("" + data.id + " " + data.match);

          if (data.match === true) {
            $ionicPopup.alert({
              title: '<h2 class="empProfile">Congratulations!</h2>',
              template: '<center>You have a new match!</center>'
            }).then(function(res) {
              // nothing to do.
            });
          }
        })
        .error(function(data, status, headers, config) {
        });
    }
  };
});
