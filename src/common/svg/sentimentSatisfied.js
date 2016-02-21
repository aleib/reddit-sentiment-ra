'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');
var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);
var _svgIcon = require('material-ui/lib/svg-icon');
var _svgIcon2 = _interopRequireDefault(_svgIcon);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SentimentSatisfied = _react2.default.createClass({
  displayName: 'SentimentSatisfied',
  mixins: [_reactAddonsPureRenderMixin2.default],

  render: function render() {
    return _react2.default.createElement(
      _svgIcon2.default,
      this.props,
      _react2.default.createElement('circle', { cx: '15.5', cy: '9.5', r: '1.5' }),
      _react2.default.createElement('circle', { cx: '8.5', cy: '9.5', r: '1.5' }),
      _react2.default.createElement('path', { d: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-4c-1.48 0-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5s4.32-1.45 5.12-3.5h-1.67c-.7 1.19-1.97 2-3.45 2z' }),

    );
  }
});

exports.default = SentimentSatisfied;
module.exports = exports['default'];
