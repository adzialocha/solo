/*! solo.andreasdzialocha.com (2015) */

(function(window, $, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var WAIT_UNTIL_BAR_DISAPPEARS = 2500; // ms

  var DEFAULT_TRACK_NUMBER = 0;

  var PLAYLIST = [
    { title: '1', data: './data/solo_1_2.json', scene: './visuals/scene_1.js' },
    { title: '6', data: './data/solo_6.json',   scene: './visuals/scene_6.js' }
  ];

  // private

  var _current, _timeout;

  function _requestFullscreen(sElement) {
    var requestMethod = sElement.requestFullScreen || sElement.webkitRequestFullScreen || sElement.mozRequestFullScreen || sElement.msRequestFullscreen;
    requestMethod.call(sElement);
  }

  function _play(sTrackNumber, sStartCallback) {

    _current = sTrackNumber;

    // load scene

    $.cachedScript(PLAYLIST[sTrackNumber].scene, {
      success: function() {

        // load track data

        $.ajax({
          method: 'GET',
          url: PLAYLIST[sTrackNumber].data,
          dataType: 'json',
          cache: true,
          success: function(rData) {
            window.solo.player.start(rData, function() {
              window.solo.scene._onTrackInitalized();
              if (sStartCallback && typeof sStartCallback === 'function') {
                sStartCallback();
              }
            });
          }
        });

      }
    });

  }

  function _next(sStartCallback) {
    _current++;
    if (_current >= TRACK_FILE_PATHS.length) {
      _current = 0;
    }
    _play(_current, sStartCallback);
  }

  // public

  var app = {};

  app.init = function() {

    var elem;

    // initalize app

    _current = DEFAULT_TRACK_NUMBER;

    // initalize player

    window.solo.player.init();

    // initalize scene handler

    window.solo.player.onTrackEvent(function(eParamId, eStatus) {
      window.solo.scene._onTrackEvent(eParamId, eStatus);
    });

    window.solo.player.onTrackFinished(function() {

      window.solo.scene._onTrackFinished();

      $('#message-loading').addClass('message--visible');

      _next(function() {
        $('#message-loading').removeClass('message--visible');
      });

    });

    // initalize view

    window.solo.view.init();

    // user interaction

    $('.wrapper').on('mousemove', function() {

      $('.wrapper').addClass('wrapper--user-active');

      if (_timeout) {
        window.clearTimeout(_timeout);
      }

      _timeout = window.setTimeout(function() {
        $('.wrapper').removeClass('wrapper--user-active');
      }, WAIT_UNTIL_BAR_DISAPPEARS);

    });

    $('#message-play').addClass('message--visible');

    $('#message-play-button').on('click', function() {

      _requestFullscreen(window.document.body);

      $('#message-play').removeClass('message--visible');
      $('#message-loading').addClass('message--visible');

      _play(_current, function() {
        $('#message-loading').removeClass('message--visible');
      });

    });

    PLAYLIST.forEach(function(eItem, eIndex) {

      elem = $('<button>' + eItem.title + '</button>');

      elem.addClass('bar__playlist__button');

      elem.on('click', function() {
        $('#message-play').removeClass('message--visible');
        $('#message-loading').addClass('message--visible');
        _play(eIndex, function() {
          $('#message-loading').removeClass('message--visible');
        });
      });

      $('.bar__playlist').append(elem);

    });

  };

  window.solo.app = app;

})(window, window.jQuery);
