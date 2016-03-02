/*! solo.andreasdzialocha.com (2015) */

(function(window, SC, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var UPDATE_POSITION_INTERVAL = 5; // ms

  var SOUNDCLOUD_CLIENT_ID = '8b1f68f4e89cc82a596754f6a0ecab65';

  var ON_PARAMETER_EVENT = 'onParameterEvent';
  var ON_TRACK_FINISHED = 'onTrackFinished';
  var ON_TRACK_STOPPED = 'onTrackStopped';

  // private

  var _callbacks = {};

  var _data, _index;

  var _track;

  function _call(pParamId, pParamStatus, pPosition) {
    if (_callbacks[ON_PARAMETER_EVENT]) {
      _callbacks[ON_PARAMETER_EVENT](pParamId, pParamStatus, pPosition);
    }
  }

  function _next(pPosition) {

    var i, found;

    if (_track && _track.playState === 0) {
      return false;
    }

    // find next events

    for (i = _index; i < _data.params.length && ! found; i++) {
      if (_data.params[i].c <= pPosition) {
        _call(_data.params[i].id, _data.params[i].s, pPosition);
        _index++;
      } else {
        found = true;
      }
    }

  }

  function _play(sTrack, pStartCallback) {

    _index = 0;

    _track = soundManager.createSound({

      url: sTrack,

      onplay: function() {
        if (pStartCallback) {
          pStartCallback();
        }
      },

      whileplaying: function() {
        _next(_track.position);
      },

      onfinish: function() {
        if (_callbacks[ON_TRACK_FINISHED]) {
          _callbacks[ON_TRACK_FINISHED]();
        }
      },

      onstop: function() {
        if (_callbacks[ON_TRACK_STOPPED]) {
          _callbacks[ON_TRACK_STOPPED]();
        }
      }

    });

    _track.play();

  }

  function _load(pStartCallback) {

    $.ajax({

      url: 'https://api.soundcloud.com/resolve.json',
      dataType: 'jsonp',

      data: {
        url: _data.soundcloud_path,
        client_id: SOUNDCLOUD_CLIENT_ID
      },

      success: function(sTrack) {
        _play(sTrack.stream_url + (sTrack.stream_url.indexOf('?') > -1 ? '&' : '?') + 'client_id=' + SOUNDCLOUD_CLIENT_ID, pStartCallback);
      }

    })

  }

  // public

  var player = {};

  player.init = function() {

    soundManager.setup({

      debugMode: false,
      forceUseGlobalHTML5Audio: true,
      html5PollingInterval: UPDATE_POSITION_INTERVAL,
      preferFlash: false

    });

  };

  player.onTrackEvent = function(pCallback) {
    if (! pCallback || typeof pCallback != 'function') {
      return false;
    }
    _callbacks[ON_PARAMETER_EVENT] = pCallback;
  };

  player.onTrackFinished = function(pCallback) {
    if (! pCallback || typeof pCallback != 'function') {
      return false;
    }
    _callbacks[ON_TRACK_FINISHED] = pCallback;
  };

  player.onTrackStopped = function(pCallback) {
    if (! pCallback || typeof pCallback != 'function') {
      return false;
    }
    _callbacks[ON_TRACK_STOPPED] = pCallback;
  };

  player.start = function(pTrackData, pStartCallback) {

    if (! pTrackData || typeof pTrackData !== 'object') {
      return false;
    }

    if (pStartCallback && typeof pStartCallback != 'function') {
      return false;
    }

    if (_track && _track.playState === 1) {
      _track.pause();
    }

    _data = pTrackData;

    _load(pStartCallback);

    return true;

  };

  window.solo.player = player;

})(window, window.SC);
