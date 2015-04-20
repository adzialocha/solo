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

  window.isIOS = window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

  window.noop = function() {};

})(window, jQuery);
