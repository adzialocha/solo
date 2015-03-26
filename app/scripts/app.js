(function(window, React, UI, undefined) {

  // public

  var app = {};

  app.init = function() {

    React.initializeTouchEvents(true);

    React.render(
      React.createElement(UI.Component.Toggle, { label: 'Test Two' }),
      document.getElementById('toggle-test')
    );

    React.render(
      React.createElement(UI.Component.Toggle, { label: 'Test', color: 'red' }),
      document.getElementById('toggle-test-two')
    );

    React.render(
      React.createElement(UI.Component.Button, { label: 'Test', color: 'blue' }),
      document.getElementById('button-test')
    );

    React.render(
      React.createElement(UI.Component.Matrix, { onStatusChange: function(eMatrixState) {
        console.log(eMatrixState);
      }}),
      document.getElementById('matrix')
    );

  };

  window.app = window.app || app;

})(window, window.React, window.UI);
