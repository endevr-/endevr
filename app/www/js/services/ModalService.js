angular.module('endevr.directives')

.factory('ModalService', function($ionicModal) {
  var currentModal;

  return {
    setTemplate: function(templateUrl, controllerScope) {

      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: controllerScope
      })
      .then(function(modal) {
        currentModal = modal;
      });
      return currentModal;

    }
  };
});
