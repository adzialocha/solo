/*! solo.andreasdzialocha.com (2015) */

(function(window, solo, SC, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var SUB_TICK_INTERVAL = 2; // ms

  // initalize

  SC.initialize({
    client_id: 'YOUR_CLIENT_ID'
  });

  // private

  var _callback;

  var _data, _index;

  var _timeout, _position, _offset;

  function _call(pParamId, pParamStatus) {
    if (_callback) {
      _callback(pParamId, pParamStatus);
    }
  }

  // play runtime

  function _next(pPosition) {

    var i, found;

    // find next events

    for (i = _index; i < _data.params.length && ! found; i++) {
      if (_data.params[i].c <= pPosition) {
        _call(_data.params[i].id, _data.params[i].s);
        _index++;
      } else {
        found = true;
      }
    }

  }

  function _subtick(pPosition) {

    _next(pPosition);

    _timeout = window.setTimeout(function() {
      _offset = _offset + SUB_TICK_INTERVAL;
      _subtick(_position + _offset);
    }, SUB_TICK_INTERVAL);

  }

  function _tick(pPosition) {

    _position = pPosition;

    if (_timeout) {
      window.clearTimeout(_timeout);
    }

    _offset = 0;
    _subtick(_position);

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

    converted = pTrackData;
    converted.params = params;

    return converted;

  }

  function _play() {

    _offset = 0;
    _index = 0;

    SC.get('/resolve', { url: _data.soundcloud_path }, function(sTrackData) {
      SC.stream(sTrackData.uri, function(sTrack) {
        sTrack.play({
          onplay: function() {},
          whileplaying: function() {
            _tick(sTrack.position + _data.offset);
          },
          onfinish: function() {}
        });
      });
    });

  }

  // public

  var player = {};

  player.onTrackEvent = function(pCallback) {

    if (! pCallback || typeof pCallback != 'function') {
      return false;
    }

    _callback = pCallback;

  }

  player.start = function(pTrackData) {

    if (! pTrackData || typeof pTrackData !== 'object') {
      return false;
    }

    _data = _convert(pTrackData);

    _play();

    return true;

  };

  window.solo.player = player;

})(window, window.solo, window.SC);
