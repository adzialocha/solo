/*! solo.andreasdzialocha.com (2015) */

(function(window, $, undefined) {

  'use strict';

  $.cachedScript = function(sUrl, sOptions) {
    var options;
    options = $.extend(sOptions || {}, {
      dataType: 'script',
      cache: true,
      url: sUrl
    });
    return $.ajax(options);
  };

  window.noop = function() {};

})(window, jQuery);
