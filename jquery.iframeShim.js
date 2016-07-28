(function ($) {

	var defaults = {
		src: 'javascript:\'\'', //'javascript:false;',
		frameBorder: 0,
		/**
		 * Use `putInRoot` option if you have a lot of `position` declarations in html DOM above the current item
		 */
		putInRoot: false,
		css: {
			position: 'absolute',
			border: 'none',
			opacity: 0
		}
	},
        isChrome = (function () {
        	return navigator.userAgent.indexOf("Chrome") != -1;
        })();

	$.fn.iframeShim = function (options) {

		if (isChrome) {

			var settings = $.extend({}, defaults, options);

			return this.each(function () {
				if (!$.data(this, 'plugin_iframeShim')) {
					$.data(this, 'plugin_iframeShim', new IframeShimPlugin(this, settings));
				}
			});
		} else {
			//for correct jquery chaining
			return jQuery.noop;
		}

	};

	function IframeShimPlugin(target, settings) {
		this.target = target;
		this.settings = settings;
		this.iframe = null;
		this.isHidden = false;

		if (settings.dropdownFor) {
			var self = this;
			$(target).closest(settings.dropdownFor).hover(
                function () {
                	self.pinIframe(target, settings);
                	self.isHidden = true;
                },
                function () {
                	self.pinIframe(target, settings);
                	self.isHidden = false;
                }
            );
		} else {
			this.pinIframe(target, settings);
		}
	}

	IframeShimPlugin.prototype.pinIframe = function (target, settings) {

		if (this.isHidden) {// if ($(target).css('visibility') == 'hidden') { //TODO: !height || !width || $(target).is(':hidden') + current check
			this.iframe && this.iframe.hide();
		} else {
			this.iframe || (this.iframe = $('<iframe />', settings).insertBefore(settings.putInRoot ? 'body' : target));

			var targetRect = target.getBoundingClientRect();

			this.iframe.css({
				top: targetRect.top + 'px',
				left: targetRect.left + 'px',
				width: targetRect.width + 'px',
				height: targetRect.height + 'px'
			});

			this.iframe.show();
		}

	};

}(jQuery));
