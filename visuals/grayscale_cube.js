/*! solo.andreasdzialocha.com (2015) */

(function(window, fabric, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var SCENE_TITLE = 'GRAYSCALE_CUBE';

  var STEPS = 100;

  // private

  var _rect;
  var _width, _height;
  var _index;

  function _getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  // scene

  var scene = new window.solo.scene.Scene(SCENE_TITLE);

  scene.setup = function() {

    _index = 0;

    this.canvas.clear();

    _width = this.canvas.getWidth();
    _height = this.canvas.getHeight();

    _rect = new fabric.Rect({
      left: 0,
      top: 0,
      width: _width,
      height: _height
    });

    this.canvas.add(_rect);

  };

  scene.onTrackEvent = function(sParamId, sParamStatus) {

    var size, color;

    if (_index > STEPS) {
      this.canvas.setBackgroundColor(_rect.get('fill'));
      _index = 0;
    }

    size = Math.ceil((_index / STEPS) * _width);
    color = Math.ceil(((Math.random() * STEPS) / STEPS) * 255);

    _rect.set({
      left: (_width / 2) - (size / 2),
      top: (_height / 2) - (size / 2),
      width: size,
      height: size,
      fill: 'rgb(' + color + ', ' + color + ', ' + color + ')'
    });

    _index++;

    this.canvas.renderAll();

  };

  // scene.onTrackInitalized = function() {};
  // scene.onTrackFinished = function() {};

  // register it

  window.solo.scene._register(scene);

})(window, window.fabric);
