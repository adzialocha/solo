/*! solo.andreasdzialocha.com (2015) */

(function(window, fabric, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var SCENE_TITLE = 'FULL';

  var WHITE = '#fff';
  var BLACK = '#000';

  // private

  var _rects, _frame, _timeout, _colors, _bg;
  var _width, _height;

  // scene

  var scene = new window.solo.scene.Scene(SCENE_TITLE);

  scene.setup = function() {

    var rect;

    var _this = this;

    _frame = 0;
    _rects = [];

    this.canvas.clear();

    _width = this.canvas.getWidth();
    _height = this.canvas.getHeight();

    _bg = new fabric.Rect({
      left: 0,
      top: 0,
      width: _width,
      height: _height,
      fill: WHITE
    });

    this.canvas.add(_bg);

    this.params.forEach(function() {

      rect = new fabric.Rect({
        left: 0,
        top: 0,
        width: _width,
        height: _height,
        fill: WHITE
      });

      _rects.push(rect);

      _this.canvas.add(rect);

    });

    _colors = {
      0: BLACK,
      1: WHITE
    };

  };

  scene.animate = function() {

    _rects.forEach(function(eRect) {

      eRect.setGradient('fill', {
        x1: _frame,
        y1: 0,
        x2: 0,
        y2: _frame,
        colorStops: _colors
      });

      if (_frame % 25 === 0 && Math.random() > 0.5) {
        eRect.set({
          left: Math.random() * (_width / 2),
          top: Math.random() * (_height / 2),
          angle: Math.random() * 360
        });
      }

    });

    _bg.setGradient('fill', {
      x1: _frame,
      y1: 0,
      x2: 0,
      y2: _frame,
      colorStops: _colors
    });

    scene.canvas.renderAll();

    _frame++;

    _timeout = window.setTimeout(scene.animate, 100);

  };

  scene.onTrackEvent = function() {

    var color_a, color_b, size;

    color_a = Math.round((Math.random() * 254));
    color_b = Math.round((Math.random() * 254));

    _frame = (Math.random() > 0.5)? -_height : 0;

    this.params.forEach(function(eItem, eIndex) {
      size = Math.random() * (_width / 2);
      _rects[eIndex].set({
        opacity: eItem? 1 : 0,
        width: size,
        height: size,
      });
    });

    _colors = {
      0: 'rgb(' + color_a + ', ' + color_a + ', ' + color_a + ')',
      1: 'rgb(' + color_b + ', ' + color_b + ', ' + color_b + ')'
    };

    this.canvas.renderAll();

  };

  scene.onTrackInitalized = function() {
    this.animate();
  };

  scene.onTrackFinished = function() {
    window.clearTimeout(_timeout);
  };

  // register it

  window.solo.scene._register(scene);

})(window, window.fabric);
