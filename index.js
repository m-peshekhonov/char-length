bem.decl('page', {
    onInit: function($this) {
        var _this = this,
            page = $this,
            inputFont = $('.font__input_change_font'),
            inputFontSize = $('.font__input_change_font-size'),
            inputLetterSpacing = $('.font__input_change_ls'),
            checkboxZhir = $('.checkbox_type_zhir'),
            checkboxKursiv = $('.checkbox_type_kursiv');

        this.updateResult();

        // считаем длину на изменение значения инпута
        $('.input').on('input', function() {
            $(this).next($('.result')).html($(this).getTextSize()[0].toFixed(1) + 'px');
        });

        inputFont.on('blur', function() {
            page.css('font-family', $(this).val());

            _this.updateResult();
        });

        inputFontSize.on('blur', function() {
            page.css('font-size', $(this).val());

            _this.updateResult();
        });

        inputLetterSpacing.on('blur', function() {
            $('.input_type_char').css('letter-spacing', $(this).val());

            _this.updateResult();
        });

        checkboxZhir.on('click', function() {
            $(this).toggleClass('checkbox_off');

            $('.input_type_char').toggleClass('zhir');

            _this.updateResult();
        });

        checkboxKursiv.on('click', function() {
            $(this).toggleClass('checkbox_off');

            $('.input_type_char').toggleClass('kursiv');

            _this.updateResult();
        });
    },

    updateResult: function() {
        $('.input').each(function() {
            $(this).next($('.result')).html($(this).getTextSize()[0].toFixed(1) + 'px');
        })
    }
});

/// ---- the plugin, also on GitHub ----
!(function($) {
	var N = function(key) { return 'getTextSize.' + key; },
    	fontMapping = function($o, font) {
      		//return {"font": font.font || $o.css('font')};
      		var result = {}; // don't affect original object

      		$.each(font, function(prop, val) {
      			   result[prop] = (val || $o.css(prop));
      		});

      		return result;
    	};

	$.fn.getTextSize = function(dimension, text, font) {
  		dimension = (dimension || 'width');
  		// figure out what font aspects we're concerned with
  		if( typeof font === "string" ) {
  			font = {"font": font};
  		}
  		// include other common style properties that affect sizing
  		font = $.extend({"font": false, "text-transform": false, "letter-spacing": false}, font);
  		// allow multiple calculations
  		return $.map($(this), function(o) {
    			var $o = $(o), $fake = $o.data(N('fake'));

    			if (!$fake) {
    				// cloning causes duplication issues on subsequent calls
    				// can attach to parent, but may be unnecessary parsing vs. body if updating font each time
    				$fake = $('<span>').hide().addClass('placeholder').empty().appendTo(document.body);

    				$o.data(N('fake'), $fake);
    			}
    			return $fake.html(text || $o.val() || $o.text()).css(fontMapping($o, font))['width']();
  		});
	};
})(jQuery);
