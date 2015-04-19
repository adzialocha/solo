/*! solo.andreasdzialocha.com (2015) */

(function(window, fabric, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var SCENE_TITLE = 'GRID';

  var BLACK = '#000';
  var WHITE = '#fff';

  var LINE_SIZE = 15;

  // private

  var _width, _height, _lines;

  // scene

  var scene = new window.solo.scene.Scene(SCENE_TITLE);

  scene.setup = function() {

    var i, line;

    this.canvas.clear();

    _width = this.canvas.getWidth();
    _height = this.canvas.getHeight();

    _lines = [];

    for (i = 0; i < _width; i = i + LINE_SIZE) {

      line = new fabric.Line(
        [i, 0, i, _height],
        {
          fill: BLACK,
          stroke: BLACK,
          strokeWidth: LINE_SIZE,
        }
      );

      _lines.push(line);

      this.canvas.add(line);

    }

  };

  scene.onTrackEvent = function(sParamId, sParamStatus) {

    var index, color, position;

    index = Math.floor(Math.random() * _lines.length);
    color = sParamStatus? WHITE : BLACK;
    position = Math.round(Math.random() * _width);

    _lines[index].set({
      fill: color,
      stroke: color,
      x1: position,
      x2: position
    });

    this.canvas.renderAll();

  };

  // scene.onTrackInitalized = function() {};
  // scene.onTrackFinished = function() {};

  // register it

  window.solo.scene._register(scene);

})(window, window.fabric);
