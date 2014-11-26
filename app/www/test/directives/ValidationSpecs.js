describe("Directives", function () {
  describe('onValidSubmit', function() {
    var onValidSubmit, $parse, $timeout;

    beforeEach(function () {
        module('endevr');

        inject(function (_onValidSubmit_, _$parse_, _$timeout_) {
            onValidSubmit = _onValidSubmit_;
            $parse = _$parse_;
            $timeout = _$timeout_;
        });
    });

    xdescribe('link', function() {
      it('should defined as a function', function() {
        expect(angular.isFunction(onValidSubmit.link)).toBe(true);
      });
    });

  });


});