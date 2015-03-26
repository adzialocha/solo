(function(window, UI, undefined) {

  UI.Component.Toggle = React.createClass({

    displayName: 'Toggle',

    getDefaultProps: function() {
      return {
        label: '',
        color: 'green',
        index: undefined,
        onStatusChange: function() {
          return false;
        }
      };
    },

    getInitialState: function() {
      return {
        status: false,
        active: false,
        color: this.props.color,
        label: this.props.label
      };
    },

    onTouchStart: function() {
      this.setState({ active: true });
    },

    onTouchEnd: function($event) {
      this.setState({ active: false, status: ! this.state.status });
      this.props.onStatusChange($event, this.state.status, this.props.index);
    },

    render: function() {

      var activeStyle = this.state.active ? ' active' : '';
      var statusStyle = this.state.status ? ' on' : ' off';

      return React.DOM.button({
        className: 'button toggle' + activeStyle + statusStyle + ' ' + this.state.color,
        onTouchStart: this.onTouchStart,
        onTouchEnd: this.onTouchEnd
      }, this.state.label);

    }

  });

})(window, window.UI);
