/*! solo.andreasdzialocha.com (2015) */

(function(window, solo, $, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var TRACK_FILE_PATH = './data/solo_1_2.json';

  // private

  var _data;

  function _requestFullscreen(sElement) {
    var requestMethod = sElement.requestFullScreen || sElement.webkitRequestFullScreen || sElement.mozRequestFullScreen || sElement.msRequestFullscreen;
    requestMethod.call(sElement);
  }

  // public

  var app = {};

  app.init = function() {

    $('.play').addClass('hidden');

    $('.play').click(function() {

      _requestFullscreen(window.document.body);

      window.solo.player.onTrackEvent(function(eParamId, eStatus) {
        if (eStatus) {
          $('#param' + eParamId).addClass('active');
        } else {
          $('#param' + eParamId).removeClass('active');
        }
      });

      window.solo.player.start(_data);

      $('.play').addClass('hidden');

    });

    // initalize soundcloud

    SC.initialize({
      client_id: 'YOUR_CLIENT_ID'
    });

    // fetch song data

    $.ajax({
      method: 'GET',
      url: TRACK_FILE_PATH,
      dataType: 'json',
      success: function(rData) {
        _data = rData;
        $('.play').removeClass('hidden');
        $('.loading').addClass('hidden');
      }
    });

  };

  window.solo.app = app;

})(window, window.solo, window.jQuery);
