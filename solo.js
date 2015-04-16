(function(window, $, undefined) {

  var TRACK_SOUNDCLOUD_PATH = 'https://soundcloud.com/andreasdzialocha/solo-1-2/s-v2luz';
  var TRACK_FILE_PATH = './solo_1_2.json';
  var TRACK_OFFSET = 6395;

  var TICK_INTERVAL = 2;

  // private

  var _track;
  var _data, _index;
  var _timeout, _position, _offset;

  function _requestFullscreen() {

    var element = window.document.body;

    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

    requestMethod.call(element);

  }

  function _convert(sData) {

    var converted;

    converted = [];

    Object.keys(sData).forEach(function(eKey) {
      sData[eKey].forEach(function(eItem) {
        converted.push({
          c: eItem.c,
          id: parseInt(eKey, 10),
          s: eItem.s
        });
      });
    });

    converted = converted.sort(function(eItemA, eItemB) {
      return eItemA.c - eItemB.c;
    });

    return converted;

  }

  function _clear() {

    _offset = 0;
    _position = 0;
    _index = 0;

    if (_timeout) {
      window.clearTimeout(_timeout);
    }

    $('.cell').removeClass('active');

  }

  function _changeState(eParamId, eParamStatus) {

    if (eParamStatus === 0) {
      $('#param' + eParamId).removeClass('active');
    } else {
      $('#param' + eParamId).addClass('active');
    }

  }

  function _next(ePosition) {

    var i;

    // find next data index

    for (i = _index; i < _data.length; i++) {

      if (_data[i].c <= ePosition) {
        _changeState(_data[i].id, _data[i].s);
        _index++;
      }

    }

  }

  function _finetick(ePosition) {

    _next(ePosition);

    _timeout = window.setTimeout(function() {

      _offset = _offset + TICK_INTERVAL;
      _finetick(_position + _offset);

    }, TICK_INTERVAL);

  }

  function _tick(ePosition) {

    _position = ePosition;

    if (_timeout) {
      window.clearTimeout(_timeout);
    }

    _offset = 0;

    _finetick(_position);

  }

  function _playTrack() {

    $('.play').addClass('hidden');

    _track.play({
      onplay: _clear,
      whileplaying: function() {
        _tick(_track.position + TRACK_OFFSET);
      },
      onfinish: _clear
    });

  }

  function _loadTrack() {

    SC.get('/resolve', { url: TRACK_SOUNDCLOUD_PATH }, function(sTrackData) {

      SC.stream(sTrackData.uri, function(sTrack) {
        _track = sTrack;
        $('.loading').addClass('hidden');
        $('.play').removeClass('hidden');
      });

    });

  }

  // public

  var app = {};

  app.init = function() {

    $('.play').addClass('hidden');

    $('.play').click(function() {
      _requestFullscreen();
      _playTrack();
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
        // convert data
        _data = _convert(rData);
        // load soundcloud track
        _loadTrack();
      }

    });

  };

  window.app = window.app || app;

})(window, window.jQuery);
