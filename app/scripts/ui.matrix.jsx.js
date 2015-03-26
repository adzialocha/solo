(function(window, UI, undefined) {

  UI.Component.Matrix = React.createClass({

    displayName: 'Matrix',

    getDefaultProps: function() {
      return {
        size: 36,
        onStatusChange: function() {
          return false;
        }
      };
    },

    onStatusChange: function($event, tStatus, tIndex) {
      this.props.onStatusChange(tStatus, tIndex);
    },

    getInitialState: function() {

      var DEFAULT_COLOR = 'green';

      var i, colors, labels, status;

      colors = [];
      labels = [];
      status = [];

      for (i = 0; i < this.props.size; i++) {
        colors.push(DEFAULT_COLOR);
        labels.push(i);
        status.push(false);
      }

      return {
        colors: colors,
        labels: labels,
        status: status
      };

    },

    render: function() {

      var _this = this;

      var matrixElems, matrixRow;
      var i, x, y, size;

      matrixElems = [];

      size = Math.sqrt(this.props.size);
      i = 0;

      for (x = 0; x < size; x++) {

        matrixRow = [];

        for (y = 0; y < size; y++) {
          matrixRow.push(
            React.createElement(UI.Component.Toggle, {
              key: i,
              index: i,
              color: this.state.colors[i],
              label: this.state.labels[i],
              onStatusChange: function($event, tStatus, tIndex) {
                _this.onStatusChange($event, tStatus, tIndex);
              }
            }));
          i++;
        }

        matrixElems.push(React.DOM.div({
          className: 'matrix__row',
          key: x,
        }, matrixRow));

      }

      return React.DOM.div({
        className: 'matrix',
      }, matrixElems);

    }

  });

})(window, window.UI);
