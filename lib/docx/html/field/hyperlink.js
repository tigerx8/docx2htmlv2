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
			elEnd.id = ''; //this.doc.uid()

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmllbGQvaHlwZXJsaW5rLmpzIl0sIm5hbWVzIjpbInVwdHJpbSIsImVsIiwicGFyZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiY2hpbGROb2RlcyIsImxlbmd0aCIsImdldExpbmsiLCJIeXBlcmxpbmsiLCJlbEVuZCIsImEiLCJkb2MiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsImlkIiwiY3VycmVudCIsImVsU3RhcnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJhcHBlbmRDaGlsZCIsIkZpZWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxTQUFTQSxNQUFULENBQWdCQyxFQUFoQixFQUFtQjtBQUNsQixLQUFJQyxTQUFPRCxHQUFHRSxVQUFkO0FBQ0FELFFBQU9FLFdBQVAsQ0FBbUJILEVBQW5CO0FBQ0EsS0FBR0MsT0FBT0csVUFBUCxDQUFrQkMsTUFBbEIsSUFBMEIsQ0FBN0IsRUFDQ04sT0FBT0UsTUFBUDtBQUNEO0FBQ0QsU0FBU0ssT0FBVCxHQUFrQjtBQUNqQixRQUFPLEVBQVA7QUFDQTs7SUFDb0JDLFM7Ozs7Ozs7Ozs7MEJBQ1pDLEssRUFBTTtBQUNiLE9BQUlDLElBQUUsS0FBS0MsR0FBTCxDQUFTQyxhQUFULENBQXVCLEdBQXZCLENBQU47QUFDQUYsS0FBRUcsSUFBRixHQUFPTixTQUFQO0FBQ0FFLFNBQU1LLEVBQU4sR0FBUyxFQUFULENBSGEsQ0FHRDs7QUFFWixPQUFJQyxVQUFRLEtBQUtDLE9BQWpCO0FBQUEsT0FBMEJkLFNBQU9hLFFBQVFaLFVBQXpDO0FBQ0EsVUFBTSxDQUFDRCxPQUFPZSxhQUFQLENBQXFCLE1BQUlSLE1BQU1LLEVBQS9CLENBQVAsRUFBMEM7QUFDekNDLGNBQVFiLE1BQVI7QUFDQUEsYUFBT2EsUUFBUVosVUFBZjtBQUNBO0FBQ0RELFVBQU9nQixZQUFQLENBQW9CUixDQUFwQixFQUF1QkssT0FBdkI7QUFDQSxVQUFNTCxFQUFFUyxXQUFSO0FBQ0NULE1BQUVVLFdBQUYsQ0FBY1YsRUFBRVMsV0FBaEI7QUFERCxJQUdBbkIsT0FBTyxLQUFLZ0IsT0FBWjtBQUNBaEIsVUFBT1MsS0FBUDtBQUNBOzs7RUFqQnFDWSxlOztrQkFBbEJiLFMiLCJmaWxlIjoiaHlwZXJsaW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZpZWxkIGZyb20gJy4vZmllbGQnXG5cbmZ1bmN0aW9uIHVwdHJpbShlbCl7XG5cdHZhciBwYXJlbnQ9ZWwucGFyZW50Tm9kZVxuXHRwYXJlbnQucmVtb3ZlQ2hpbGQoZWwpXG5cdGlmKHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aD09MClcblx0XHR1cHRyaW0ocGFyZW50KVxufVxuZnVuY3Rpb24gZ2V0TGluaygpe1xuXHRyZXR1cm4gJyc7XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIeXBlcmxpbmsgZXh0ZW5kcyBGaWVsZHtcblx0Y29udmVydChlbEVuZCl7XG5cdFx0dmFyIGE9dGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0YS5ocmVmPWdldExpbmsoKVxuXHRcdGVsRW5kLmlkPScnOy8vdGhpcy5kb2MudWlkKClcblx0XHRcblx0XHR2YXIgY3VycmVudD10aGlzLmVsU3RhcnQsIHBhcmVudD1jdXJyZW50LnBhcmVudE5vZGVcblx0XHR3aGlsZSghcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJyMnK2VsRW5kLmlkKSl7XG5cdFx0XHRjdXJyZW50PXBhcmVudFxuXHRcdFx0cGFyZW50PWN1cnJlbnQucGFyZW50Tm9kZVxuXHRcdH1cblx0XHRwYXJlbnQuaW5zZXJ0QmVmb3JlKGEsIGN1cnJlbnQpXG5cdFx0d2hpbGUoYS5uZXh0U2libGluZylcblx0XHRcdGEuYXBwZW5kQ2hpbGQoYS5uZXh0U2libGluZylcblx0XHRcblx0XHR1cHRyaW0odGhpcy5lbFN0YXJ0KVxuXHRcdHVwdHJpbShlbEVuZClcblx0fVxufSJdfQ==