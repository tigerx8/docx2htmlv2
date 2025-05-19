'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uptrim(el) {
	var parent = el.parentNode;
	parent.removeChild(el);
	if (parent.childNodes.length == 0) uptrim(parent);
}
function getLink() {
	return '';
}

var Hyperlink = function (_Field) {
	(0, _inherits3.default)(Hyperlink, _Field);

	function Hyperlink() {
		(0, _classCallCheck3.default)(this, Hyperlink);
		return (0, _possibleConstructorReturn3.default)(this, (Hyperlink.__proto__ || (0, _getPrototypeOf2.default)(Hyperlink)).apply(this, arguments));
	}

	(0, _createClass3.default)(Hyperlink, [{
		key: 'convert',
		value: function convert(elEnd) {
			var a = this.doc.createElement('a');
			a.href = getLink();
			elEnd.id = '';//this.doc.uid();

			var current = this.elStart,
			    parent = current.parentNode;
			while (!parent.querySelector('#' + elEnd.id)) {
				current = parent;
				parent = current.parentNode;
			}
			parent.insertBefore(a, current);
			while (a.nextSibling) {
				a.appendChild(a.nextSibling);
			}uptrim(this.elStart);
			uptrim(elEnd);
		}
	}]);
	return Hyperlink;
}(_field2.default);

exports.default = Hyperlink;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmllbGQvaHlwZXJsaW5rLmpzIl0sIm5hbWVzIjpbInVwdHJpbSIsImVsIiwicGFyZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiY2hpbGROb2RlcyIsImxlbmd0aCIsImdldExpbmsiLCJIeXBlcmxpbmsiLCJlbEVuZCIsImEiLCJkb2MiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsImlkIiwidWlkIiwiY3VycmVudCIsImVsU3RhcnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJhcHBlbmRDaGlsZCIsIkZpZWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxTQUFTQSxNQUFULENBQWdCQyxFQUFoQixFQUFtQjtBQUNsQixLQUFJQyxTQUFPRCxHQUFHRSxVQUFkO0FBQ0FELFFBQU9FLFdBQVAsQ0FBbUJILEVBQW5CO0FBQ0EsS0FBR0MsT0FBT0csVUFBUCxDQUFrQkMsTUFBbEIsSUFBMEIsQ0FBN0IsRUFDQ04sT0FBT0UsTUFBUDtBQUNEO0FBQ0QsU0FBU0ssT0FBVCxHQUFrQjtBQUNqQixRQUFPLEVBQVA7QUFDQTs7SUFDb0JDLFM7Ozs7Ozs7Ozs7MEJBQ1pDLEssRUFBTTtBQUNiLE9BQUlDLElBQUUsS0FBS0MsR0FBTCxDQUFTQyxhQUFULENBQXVCLEdBQXZCLENBQU47QUFDQUYsS0FBRUcsSUFBRixHQUFPTixTQUFQO0FBQ0FFLFNBQU1LLEVBQU4sR0FBUyxLQUFLSCxHQUFMLENBQVNJLEdBQVQsRUFBVDs7QUFFQSxPQUFJQyxVQUFRLEtBQUtDLE9BQWpCO0FBQUEsT0FBMEJmLFNBQU9jLFFBQVFiLFVBQXpDO0FBQ0EsVUFBTSxDQUFDRCxPQUFPZ0IsYUFBUCxDQUFxQixNQUFJVCxNQUFNSyxFQUEvQixDQUFQLEVBQTBDO0FBQ3pDRSxjQUFRZCxNQUFSO0FBQ0FBLGFBQU9jLFFBQVFiLFVBQWY7QUFDQTtBQUNERCxVQUFPaUIsWUFBUCxDQUFvQlQsQ0FBcEIsRUFBdUJNLE9BQXZCO0FBQ0EsVUFBTU4sRUFBRVUsV0FBUjtBQUNDVixNQUFFVyxXQUFGLENBQWNYLEVBQUVVLFdBQWhCO0FBREQsSUFHQXBCLE9BQU8sS0FBS2lCLE9BQVo7QUFDQWpCLFVBQU9TLEtBQVA7QUFDQTs7O0VBakJxQ2EsZTs7a0JBQWxCZCxTIiwiZmlsZSI6Imh5cGVybGluay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJ1xuXG5mdW5jdGlvbiB1cHRyaW0oZWwpe1xuXHR2YXIgcGFyZW50PWVsLnBhcmVudE5vZGVcblx0cGFyZW50LnJlbW92ZUNoaWxkKGVsKVxuXHRpZihwYXJlbnQuY2hpbGROb2Rlcy5sZW5ndGg9PTApXG5cdFx0dXB0cmltKHBhcmVudClcbn1cbmZ1bmN0aW9uIGdldExpbmsoKXtcblx0cmV0dXJuICcnO1xufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHlwZXJsaW5rIGV4dGVuZHMgRmllbGR7XG5cdGNvbnZlcnQoZWxFbmQpe1xuXHRcdHZhciBhPXRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdGEuaHJlZj1nZXRMaW5rKClcblx0XHRlbEVuZC5pZD10aGlzLmRvYy51aWQoKVxuXHRcdFxuXHRcdHZhciBjdXJyZW50PXRoaXMuZWxTdGFydCwgcGFyZW50PWN1cnJlbnQucGFyZW50Tm9kZVxuXHRcdHdoaWxlKCFwYXJlbnQucXVlcnlTZWxlY3RvcignIycrZWxFbmQuaWQpKXtcblx0XHRcdGN1cnJlbnQ9cGFyZW50XG5cdFx0XHRwYXJlbnQ9Y3VycmVudC5wYXJlbnROb2RlXG5cdFx0fVxuXHRcdHBhcmVudC5pbnNlcnRCZWZvcmUoYSwgY3VycmVudClcblx0XHR3aGlsZShhLm5leHRTaWJsaW5nKVxuXHRcdFx0YS5hcHBlbmRDaGlsZChhLm5leHRTaWJsaW5nKVxuXHRcdFxuXHRcdHVwdHJpbSh0aGlzLmVsU3RhcnQpXG5cdFx0dXB0cmltKGVsRW5kKVxuXHR9XG59Il19