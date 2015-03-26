(function(window, UI, undefined) {

  UI.Component.Button = React.createClass({

    displayName: 'Button',

    getDefaultProps: function() {
      return {
        label: '',
        color: 'green'
      };
    },

    getInitialState: function() {
      return {
        status: false,
        active: false
      };
    },

    onTouchStart: function(event) {
      this.setState({ active: true });
    },

    onTouchEnd: function(event) {
      this.setState({ active: false });
    },

    render: function() {

      var activeStyle = this.state.active ? ' active' : '';

      return React.DOM.button({
        className: 'button' + activeStyle + ' ' + this.props.color,
        onTouchStart: this.onTouchStart,
        onTouchEnd: this.onTouchEnd
      }, this.props.label);

    }

  });

})(window, window.UI);
