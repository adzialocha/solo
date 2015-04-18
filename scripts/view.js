(function(window, solo, fabric) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var CANVAS_ELEM_ID = 'view';

  // private

  var _canvas;

  function _resize() {
    var body = document.body.getBoundingClientRect();
    _canvas.setDimensions({
      width: body.width,
      height: body.height
    });
  }

  // public

  var view = {};

  view.init = function() {

    _canvas = new fabric.StaticCanvas(CANVAS_ELEM_ID);

    _resize();

    // events

    window.addEventListener('resize', _resize);

  };

  view.reset = function() {
    _canvas.clear();
  };

  view.getCanvas = function() {
    return _canvas;
  };

  window.solo.view = view;

})(window, window.solo, window.fabric);
