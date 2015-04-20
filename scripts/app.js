/*! solo.andreasdzialocha.com (2015) */

(function(window, $, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var WAIT_UNTIL_BAR_DISAPPEARS = 2500; // ms

  var DEFAULT_TRACK_NUMBER = 0;

  var PLAYLIST = [
    { title: '1', data: './data/SOLO_1.json', scene: './visuals/cube_matrix.js' },
    { title: '2', data: './data/SOLO_2.json', scene: './visuals/cube_matrix.js' },
    { title: '3', data: './data/SOLO_3.json', scene: './visuals/grid.js' },
    { title: '4', data: './data/SOLO_4.json', scene: './visuals/full.js' },
    { title: '5', data: './data/SOLO_5.json', scene: './visuals/grayscale_cube.js' },
    { title: '6', data: './data/SOLO_6.json', scene: './visuals/lines.js' },
    { title: '7', data: './data/SOLO_7.json', scene: './visuals/cube_matrix.js' }
  ];

  // private

  function _requestFullscreen(sElement) {
    var requestMethod = sElement.requestFullScreen || sElement.webkitRequestFullScreen || sElement.mozRequestFullScreen || sElement.msRequestFullscreen;
    if (requestMethod) {
      requestMethod.call(sElement);
    }
  }

  function _load(sTrackNumber, sStartCallback) {

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

  // public

  var app = {};

  app.init = function() {

    var elem, timeout, current;

    // initalize app

    current = DEFAULT_TRACK_NUMBER;

    // initalize player

    window.solo.player.init();

    // initalize scene handler

    window.solo.player.onTrackEvent(function(eParamId, eStatus) {
      window.solo.scene._onTrackEvent(eParamId, eStatus);
    });

    window.solo.player.onTrackFinished(function() {
      window.solo.scene._onTrackFinished();
      next();
    });

    window.solo.player.onTrackStopped(function() {
      window.solo.scene._onTrackFinished();
    });

    // initalize view

    window.solo.view.init();

    // start track

    function next() {

      current++;

      if (current >= PLAYLIST.length) {
        current = 0;
      }

      play(current);

    }

    function play(eIndex) {

      current = eIndex;

      _requestFullscreen(window.document.body);

      $('.bar__playlist__button').removeClass('bar__playlist__button--selected');
      $('.bar__playlist__button:nth-child(' + (eIndex + 1) + ')').addClass('bar__playlist__button--selected');

      $('#message-play').removeClass('message--visible');
      $('#message-loading').addClass('message--visible');

      _load(eIndex, function() {
        $('#message-loading').removeClass('message--visible');
      });

    }

    // user interaction

    $('.wrapper').on('mousemove', function() {

      $('.wrapper').addClass('wrapper--user-active');

      if (timeout) {
        window.clearTimeout(timeout);
      }

      timeout = window.setTimeout(function() {
        $('.wrapper').removeClass('wrapper--user-active');
      }, WAIT_UNTIL_BAR_DISAPPEARS);

    });

    $('#message-play').addClass('message--visible');

    $('#message-play-button').on('click', function() {
      play(current);
    });

    PLAYLIST.forEach(function(eItem, eIndex) {

      elem = $('<button>' + eItem.title + '</button>');

      elem.addClass('bar__playlist__button');

      elem.on('click', function() {
        play(eIndex);
      });

      $('.bar__playlist').append(elem);

    });

  };

  window.solo.app = app;

})(window, window.jQuery);
