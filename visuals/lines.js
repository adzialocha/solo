/*! solo.andreasdzialocha.com (2015) */

(function(window, fabric, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var SCENE_TITLE = 'LINES';

  var WHITE = '#fff';

  // private

  var _width, _height, _params, _lines;

  // scene

  var scene = new window.solo.scene.Scene(SCENE_TITLE);

  scene.setup = function() {

    var i, line;

    this.canvas.clear();

    _lines = [];

    _width = this.canvas.getWidth();
    _height = this.canvas.getHeight();

    for (i = 0; i < Math.round(this.params.length / 2); i++) {

      line = new fabric.Line(
        [0, 0, _width, _height],
        {
          fill: WHITE,
          stroke: WHITE,
          strokeWidth: 5,
        });

      _lines.push(line);

      this.canvas.add(line);

    }

  };

  scene.onTrackEvent = function(sParamId, sParamStatus) {

    var i, points, count, pre;

    count = this.params.length;

    points = [];

    this.params.forEach(function(eStatus, eId) {
      if (eStatus) {
        points.push({ x: Math.random() * _width, y: Math.random() * _height });
      } else {
        points.push({ x: 0, y: 0 });
      }
    });

    for (i = 0; i < _lines.length; i = i + 1) {

      _lines[i].set({
        x1: points[i].x,
        y1: points[i].y,
        x2: points[i + 1].x,
        y2: points[i + 1].y
      });

    }

    this.canvas.renderAll();

  };

  // scene.onTrackInitalized = function() {};
  // scene.onTrackFinished = function() {};

  // register it

  window.solo.scene._register(scene);

})(window, window.fabric);
