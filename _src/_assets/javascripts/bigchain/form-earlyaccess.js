
var FormEarlyAccess = (function(w, d, $) {

    'use strict';

    var app, _private, _config;

    _config = {
        form:       $('#form-earlyaccess'),
        formBtn:    $('#form-earlyaccess').find('.btn'),
        formURL:    $('#form-earlyaccess').attr('action'),
        formMethod: $('#form-earlyaccess').attr('metthod')
    };

    _private = {
        formSubmit: function() {
            _config.form.submit(function(e) {
                e.preventDefault();

                if ( $(this).parsley().isValid() ) {
                    $.ajax({
                        url: _config.formURL,
                        method: _config.formMethod,
                        data: $(this).serialize(),
                        // dataType: 'json',
                        // contentType: 'application/json',
                        // crossDomain: true,
                        beforeSend: function() {
                            _config.formBtn
                                .addClass('disabled')
                                .attr('value', 'Sending...');
                        },
                        success: function(data) {
                            _config.form.find('.form-group').addClass('hide');
                            _config.form.find('.alert-success').removeClass('hide');
                            _config.formBtn.removeClass('disabled');

                            //GoogleAnalytics.gaEventEarlyAccess();
                        },
                        error: function(err) {
                            _config.form.find('.alert-danger').removeClass('hide');
                            _config.formBtn.removeClass('disabled');
                        }
                    });
                }
            });
        }
    };

    app = {
        init: function() {
            _private.formSubmit();
        }
    };

    return app;

})(window, document, jQuery);