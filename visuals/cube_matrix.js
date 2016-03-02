/*! solo.andreasdzialocha.com (2015) */

(function(window, fabric, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var SCENE_TITLE = 'CUBE_MATRIX';

  var COLUMNS = 6;
  var ROWS = 3;

  var WHITE = '#fff';
  var BLACK = '#000';

  // private

  var _rects;

  // scene

  var scene = new window.solo.scene.Scene(SCENE_TITLE);

  scene.setup = function() {

    var i, rect;
    var h, w, col;

    this.canvas.clear();

    w = Math.ceil(this.canvas.getWidth() / COLUMNS);
    h = Math.ceil(this.canvas.getHeight() / ROWS);

    _rects = [];

    col = 0;

    for (i = 0; i < ROWS * COLUMNS; i++) {

      if (i >= ROWS && i % ROWS === 0) {
        col++;
      }

      rect = new fabric.Rect({
        left: col * w,
        top: (i % ROWS) * h,
        fill: BLACK,
        width: w,
        height: h
      });

      _rects.push(rect);

      this.canvas.add(rect);

    }

  };

  scene.onTrackEvent = function(sParamId, sParamStatus) {

    if (sParamId in _rects) {

      if (sParamStatus) {
        _rects[sParamId].set('fill', WHITE);
      } else {
        _rects[sParamId].set('fill', BLACK);
      }

      this.canvas.renderAll();

    }

  };

  // scene.onTrackInitalized = function() {};
  // scene.onTrackFinished = function() {};

  // register it

  window.solo.scene._register(scene);

})(window, window.fabric);
