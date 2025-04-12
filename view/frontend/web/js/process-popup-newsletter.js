define([
    'jquery',
    'Magento_Ui/js/modal/modal',
    'mage/mage',
    'jquery/ui',
    'jquery/jquery-storageapi'
], function ($, modal) {
    'use strict';

    $.widget('hikmadh.processPopupNewsletter', {

        /**
         * @private
         */
        _create: function () {
            var self = this,
                popupNewsletterOptions = {
                    type: 'popup',
                    responsive: true,
                    innerScroll: true,
                    title: this.options.popupTitle,
                    buttons: false,
                    modalClass: 'popup-newsletter'
                };

            modal(popupNewsletterOptions, this.element);

            setTimeout(function () {
                self._setStyleCss();
                self.element.modal('openModal');
            }, 3000);

            this._bindFormSubmission();
            this._resetStyleCss();
        },

        /**
         * @private
         * Bind form submission event using beforeSubmit
         */
        _bindFormSubmission: function () {
            var self = this;
            this.element.find('form').mage('validation', {});

            this.element.find('form').on('beforeSubmit', function (event) {
                var formData = $(this).serialize();

                $.ajax({
                    url: $(this).attr('action'),
                    cache: true,
                    data: formData,
                    dataType: 'json',
                    type: 'POST',
                    showLoader: true
                }).done(function (data) {
                    self._handleSubscriptionResponse(data);
                });

                return false; // Prevent default form submission
            });
        },

        /**
         * @private
         * Handle the subscription response and display messages in the popup
         */
        _handleSubscriptionResponse: function (data) {
            var self = this;
            var messageContainer = self.element.find('.messages .message div');
            var messages = self.element.find('.messages');

            messageContainer.html(data.message);

            if (data.error) {
                messages.removeClass('message-success success').addClass('message-error error');
            } else {
                messages.removeClass('message-error error').addClass('message-success success');
                self.element.modal('closeModal');
            }

            messages.show();
            setTimeout(function () {
                messages.hide();
            }, 5000);
        },

        /**
         * @private
         */
        _setStyleCss: function (width) {
            width = width || 1000;
            if (window.innerWidth > 786) {
                this.element.parent().parent('.modal-inner-wrap').css({ 'max-width': width + 'px' });
            }
        },

        /**
         * @private
         */
        _resetStyleCss: function () {
            var self = this;
            $(window).resize(function () {
                if (window.innerWidth <= 786) {
                    self.element.parent().parent('.modal-inner-wrap').css({ 'max-width': 'initial' });
                } else {
                    self._setStyleCss(self.options.innerWidth);
                }
            });
        }
    });

    return $.hikmadh.processPopupNewsletter;
});
