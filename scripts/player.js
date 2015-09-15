/*! solo.andreasdzialocha.com (2015) */

(function(window, SC, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var UPDATE_POSITION_INTERVAL = 2; // ms

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
    _track = sTrack;

    _track.play({

      flashPollingInterval: UPDATE_POSITION_INTERVAL,
      html5PollingInterval: UPDATE_POSITION_INTERVAL,

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

  }

  function _load(pStartCallback) {

    SC.get('/resolve', { url: _data.soundcloud_path }, function(sTrackData) {
      SC.stream(sTrackData.uri, function(sTrack) {
        _play(sTrack, pStartCallback);
      });
    });

  }

  // public

  var player = {};

  player.init = function() {
    SC.initialize({
      client_id: SOUNDCLOUD_CLIENT_ID
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

    if (_track) {
      _track.stop();
    }

    _data = pTrackData;

    _load(pStartCallback);

    return true;

  };

  window.solo.player = player;

})(window, window.SC);
