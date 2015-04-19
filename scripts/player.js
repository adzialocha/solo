/*! solo.andreasdzialocha.com (2015) */

(function(window, SC, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var UPDATE_POSITION_INTERVAL = 2; // ms

  var SOUNDCLOUD_CLIENT_ID = 'YOUR_CLIENT_ID';

  var ON_PARAMETER_EVENT = 'onParameterEvent';
  var ON_TRACK_FINISHED = 'onTrackFinished';

  // private

  var _callbacks = {};

  var _data, _index;

  var _track;

  function _call(pParamId, pParamStatus, pPosition) {
    if (_callbacks[ON_PARAMETER_EVENT]) {
      _callbacks[ON_PARAMETER_EVENT](pParamId, pParamStatus, pPosition);
    }
  }

  // play runtime

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

  // setup track

  function _convert(pTrackData) {

    var converted, params;

    params = [];

    Object.keys(pTrackData.params).forEach(function(eKey) {
      pTrackData.params[eKey].forEach(function(eItem) {
        params.push({
          c: eItem.c,
          id: parseInt(eKey, 10),
          s: eItem.s
        });
      });
    });

    params = params.sort(function(eItemA, eItemB) {
      return eItemA.c - eItemB.c;
    });

    converted = {
      title: pTrackData.title,
      offset: pTrackData.offset,
      soundcloud_path: pTrackData.soundcloud_path,
      params: params
    };

    return converted;

  }

  function _play(pStartCallback) {

    _index = 0;

    SC.get('/resolve', { url: _data.soundcloud_path }, function(sTrackData) {
      SC.stream(sTrackData.uri, function(sTrack) {
        _track = sTrack;
        _track.play({

          preferFlash: false,
          flashPollingInterval: UPDATE_POSITION_INTERVAL,
          html5PollingInterval: UPDATE_POSITION_INTERVAL,

          onplay: function() {
            if (pStartCallback && typeof pStartCallback === 'function') {
              pStartCallback();
            }
          },

          whileplaying: function() {
            _next(_track.position + _data.offset);
          },

          onfinish: function() {
            if (_callbacks[ON_TRACK_FINISHED]) {
              _callbacks[ON_TRACK_FINISHED]();
            }
          }

        });
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

  player.start = function(pTrackData, pStartCallback) {

    if (! pTrackData || typeof pTrackData !== 'object') {
      return false;
    }

    if (_track) {
      _track.stop();
    }

    _data = _convert(pTrackData);

    _play(pStartCallback);

    return true;

  };

  window.solo.player = player;

})(window, window.SC);
