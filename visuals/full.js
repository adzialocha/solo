/*! solo.andreasdzialocha.com (2015) */

(function(window, fabric, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var SCENE_TITLE = 'FULL';

  // private

  var _rect, _frame, _timeout, _colors;
  var _width, _height;

  // scene

  var scene = new window.solo.scene.Scene(SCENE_TITLE);

  scene.setup = function() {

    var _this = this;

    _frame = 0;

    this.canvas.clear();

    _width = this.canvas.getWidth();
    _height = this.canvas.getHeight();

    _rect = new fabric.Rect({
      left: 0,
      top: 0,
      width: _width,
      height: _height,
      fill: '#fff'
    });

    _colors = {
      0: 'rgb(0, 0, 0)',
      1: 'rgb(255, 255, 255)'
    };

    this.canvas.add(_rect);

  };

  scene.animate = function() {

    _rect.setGradient('fill', {
      x1: _frame,
      y1: 0,
      x2: 0,
      y2: _height,
      colorStops: _colors
    });

    scene.canvas.renderAll();

    _frame++;

    _timeout = window.setTimeout(scene.animate, 10);

  };

  scene.onTrackEvent = function() {

    var color_a, color_b;

    color_a = Math.round((Math.random() * 254));
    color_b = Math.round((Math.random() * 254));

    _frame = (Math.round() > 0.5)? -_height : 0 ;

    _colors = {
      0: 'rgb(' + color_a + ', ' + color_a + ', ' + color_a + ')',
      1: 'rgb(' + color_b + ', ' + color_b + ', ' + color_b + ')'
    };

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
