/*! solo.andreasdzialocha.com (2015) */

(function(window, undefined) {

  'use strict';

  // namespace

  window.solo = window.solo || {};

  // constants

  var PARAMETERS = [

    { id: 0,  title: 'MUTE DI' },
    { id: 1,  title: 'MUTE C1' },
    { id: 2,  title: 'MUTE C2' },

    { id: 3,  title: 'LP DI'   },
    { id: 4,  title: 'LP C1'   },
    { id: 5,  title: 'LP C2'   },

    { id: 6,  title: 'OCT DI'  },
    { id: 7,  title: 'OCT C1'  },
    { id: 8,  title: 'OCT C2'  },

    { id: 9,  title: 'HP DI'   },
    { id: 10, title: 'HP C1'   },
    { id: 11, title: 'HP C2'   },

    { id: 12, title: 'COMP DI' },
    { id: 13, title: 'COMP C1' },
    { id: 14, title: 'COMP C2' },

    { id: 15, title: 'RVB DI'  },
    { id: 16, title: 'RVB C1'  },
    { id: 17, title: 'RVB C2'  }

  ]

  // private

  var _current;

  // public

  var scene = {};

  scene._register = function(sInstance) {
    _current = sInstance;
  };

  scene._onTrackInitalized = function() {
    if (_current) {
      _current.setup();
      _current.onTrackInitalized();
    }
  };

  scene._onTrackEvent = function(sParamId, sParamStatus, sPosition) {
    if (_current) {
      _current.onTrackEvent(sParamId, sParamStatus, sPosition);
    }
  };

  scene._onTrackFinished = function() {
    if (_current) {
      _current.onTrackFinished();
    }
    window.solo.view.reset();
  };

  // resize listener

  window.addEventListener('resize', function() {
    if (_current) {
      _current.setup();
    }
  });

  // base scene

  function Scene(sTitle) {

    this.title = sTitle;

    this.PARAMETERS = PARAMETERS;

    this.canvas = window.solo.view.getCanvas();

    this.setup = window.noop;

    this.onTrackInitalized = window.noop;
    this.onTrackEvent = window.noop;
    this.onTrackFinished = window.noop;

  }

  scene.Scene = Scene;

  window.solo.scene = scene;

})(window);
