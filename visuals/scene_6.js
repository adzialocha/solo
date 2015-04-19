/*! solo.andreasdzialocha.com (2015) */

(function(window, fabric, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var SCENE_TITLE = 'SOLO_6';

  var BLACK = '#000';
  var STEPS = 100;

  // private

  var _rects;
  var _index;
  var _width, _height;

  function _getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  // scene

  var scene = new window.solo.scene.Scene(SCENE_TITLE);

  scene.setup = function() {

    var i, rect;

    _index = 0;
    _rects = [];

    this.canvas.clear();

    _width = this.canvas.getWidth();
    _height = this.canvas.getHeight();

    _rects = [];

    for (i = 0; i < STEPS + 1; i++) {

      rect = new fabric.Rect({
        left: 0,
        top: 0,
        fill: BLACK,
        width: _width,
        height: _height
      });

      _rects.push(rect);

      this.canvas.add(rect);

    }

  };

  // scene.onTrackInitalized = function() {};

  scene.onTrackEvent = function(sParamId, sParamStatus) {

    var size, color;

    if (_index < STEPS) {
      _index = 0;
    }

    size = Math.ceil((_index / STEPS) * _width);
    color = Math.ceil(((Math.random() * STEPS) / STEPS) * 255);

    _rects[_index].set({
      left: (_width / 2) - (size / 2),
      top: (_height / 2) - (size / 2),
      width: size,
      height: size,
      fill: 'rgb(' + color + ', ' + color + ', ' + color + ')'
    });

    _rects[_index].bringToFront();

    _index++;

    this.canvas.renderAll();

  };

  // scene.onTrackFinished = function() {};

  // register it

  window.solo.scene._register(scene);

})(window, window.fabric);
