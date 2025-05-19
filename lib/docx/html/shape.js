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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _converter3 = require('./style/converter');

var _converter4 = _interopRequireDefault(_converter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AZ = /[A-Z]/g,
    r = function r(a) {
	return '-' + a.toLowerCase();
},
    clozed = /Z$/gi;

function asStyle(x) {
	var a = [];
	for (var i in x) {
		!$.isFunction(x[i]) && a.push(i.replace(AZ, r) + ':' + x[i]);
	}return a.join(';');
}

var shape = function (_Converter) {
	(0, _inherits3.default)(shape, _Converter);

	function shape() {
		(0, _classCallCheck3.default)(this, shape);
		return (0, _possibleConstructorReturn3.default)(this, (shape.__proto__ || (0, _getPrototypeOf2.default)(shape)).apply(this, arguments));
	}

	(0, _createClass3.default)(shape, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			el.style.position = 'absolute';
			el.style.overflow = 'hidden';

			var pathStyle = { stroke: 'black', strokeWidth: 2, fillOpacity: 0 },
			    bgStyle = this.makeBackgroundStyle();
			(0, _get3.default)(shape.prototype.__proto__ || (0, _getPrototypeOf2.default)(shape.prototype), 'convertStyle', this).apply(this, arguments);
			var style = this.wordModel.getDirectStyle(),
			    propConverter = new this.constructor.Properties(el.style, this, pathStyle, bgStyle);
			style && style.parse([propConverter]);
			if (this.path) {
				if (el.style.background) pathStyle.fillOpacity = 0;
				var bgImage = el.style.background,
				    grad = pathStyle.grad;
				delete pathStyle.grad;

				var svg = '<svg xmlns="http://www.w3.org/2000/svg">' + (grad ? '<defs>' + grad + '</defs>' : '') + this.path + ' style="' + asStyle(pathStyle) + '" /></svg>';
				var svgImage = 'url(' + this.doc.asImageURL(svg) + ')';
				bgStyle.backgroundImage = svgImage;
				bgStyle.backgroundSize = '100% 100%';
			}
		}
	}, {
		key: 'makeBackgroundStyle',
		value: function makeBackgroundStyle() {
			//make background el to hold svg background
			var id = 'shape' + this.doc.uid();
			this.content.setAttribute('id', id);
			var style = this.doc.createStyle('#' + id + '::before');
			style.content = '""';
			style.zIndex = -1;
			style.position = 'absolute';
			style.width = '100%';
			style.height = '100%';
			style.left = 0;
			style.top = 0;
			return style;
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'div';
		}
	}]);
	return shape;
}(_converter2.default);

exports.default = shape;


shape.Properties = function (_Style$Properties) {
	(0, _inherits3.default)(Properties, _Style$Properties);

	function Properties(style, parent, pathStyle, bgStyle) {
		(0, _classCallCheck3.default)(this, Properties);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));

		_this2.pathStyle = pathStyle;
		_this2.bgStyle = bgStyle;
		return _this2;
	}

	(0, _createClass3.default)(Properties, [{
		key: 'xfrm',
		value: function xfrm(x) {
			this.style.width = x.width + 'px';
			this.style.height = x.height + 'px';
			x.x && (this.style.left = x.x + 'px');
			x.y && (this.style.top = x.y + 'px');

			x.rotation && this.styless('transform', 'rotate(' + x.rotation + 'deg)');

			this.world = x;
		}
	}, {
		key: 'ln',
		value: function ln(x) {
			x.color && (this.pathStyle.stroke = x.color);
			x.width != undefined && (this.pathStyle.strokeWidth = x.width + 'px');

			switch (x.cap) {
				case 'rnd':
					this.pathStyle.strokeLinecap = 'round';
					break;
				default:

			}

			if (x.dash) {
				switch (this.lineStyle(x.dash)) {
					case 'dotted':
						this.pathStyle.strokeDasharray = "5,5";
						break;
						break;
					case 'dashed':
						this.pathStyle.strokeDasharray = "10,10";
						break;
				}
			}
		}
	}, {
		key: 'solidFill',
		value: function solidFill(x) {
			this.pathStyle.fill = x;
			this.pathStyle.fillOpacity = 1;
		}
	}, {
		key: 'gradFill',
		value: function gradFill(x) {
			if (this.style.backgroundImage) return;

			var grad = [];
			switch (x.path) {
				case 'linear':
					grad.push('<linearGradient id="grad"');
					switch (x.angel) {
						case 0:
							grad.push('x1="0%" y1="0%" x2="100%" y2="0%">');
							break;
						case 90:
							grad.push('x1="0%" y1="0%" x2="0%" y2="100%">');
							break;
						case 180:
							grad.push('x1="100%" y1="0%" x2="0%" y2="0%">');
							break;
						case 270:
							grad.push('x1="0%" y1="100%" x2="0%" y2="0%">');
							break;
					}
					grad.push('</linearGradient>');
					break;
				case 'circle':
					grad.push('<radialGradient  id="grad"');
					grad.push('cx="50%" cy="50%" r="50%" fx="50%" fy="50%">');
					grad.push('</radialGradient>');
					break;
			}
			var end = grad.pop();
			for (var i = 0, len = x.stops.length, a; i < len; i++) {
				grad.push('<stop offset="' + (a = x.stops[i]).position + '%" style="stop-opacity:1;stop-color:' + a.color + '"/>');
			}grad.push(end);

			this.pathStyle.grad = grad.join(' ');
			this.pathStyle.fill = 'url(#grad)';
			this.pathStyle.fillOpacity = 1;
		}
	}, {
		key: 'blipFill',
		value: function blipFill(x) {
			this.style.background = 'url(' + this.doc.asImageURL(x) + ')';
			this.style.backgroundSize = '100% 100%';
			this.noFill();
		}
	}, {
		key: 'noFill',
		value: function noFill(x) {
			this.pathStyle.fillOpacity = 0;
		}
	}, {
		key: 'lnRef',
		value: function lnRef(x) {
			this.ln(x);
		}
	}, {
		key: 'fillRef',
		value: function fillRef(x) {
			if (this.style.backgroundImage) return;

			if (typeof x.path != 'undefined') return this.gradFill(x);

			if (typeof x == 'string') this.pathStyle.fill = x;else if (typeof x.color != 'undefined') this.pathStyle.fill = x.color;else return;
			this.pathStyle.fillOpacity = 1;
		}
	}, {
		key: 'fontRef',
		value: function fontRef(x) {
			x.color && (this.style.color = x.color);
			x.family && (this.style.fontFamily = x.family);
		}
	}, {
		key: 'path',
		value: function path(x, t) {
			switch (x.shape) {
				case 'line':
					this.parent.path = '<line x1="0" y1="0" x2="' + this.world.width + 'pt" y2="' + this.world.height + 'pt"';
					break;
				case 'rect':
					this.parent.path = '<rect width="' + this.world.width + 'pt" height="' + this.world.height + 'pt"';
					break;
				case 'roundRect':
					this.parent.path = '<rect rx="' + (t = Math.min(this.world.width, this.world.height) / 12) + 'pt" ry="' + t + 'pt" width="' + this.world.width + 'pt" height="' + this.world.height + 'pt"';
					break;
				case 'ellipse':
					this.parent.path = '<ellipse cx="' + this.world.width / 2 + 'pt" cy="' + this.world.height / 2 + 'pt" rx="' + this.world.width / 2 + 'pt" ry="' + this.world.height / 2 + 'pt"';
					break;
				case 'path':
					this.parent.path = '<path d="' + x.path + '"';
					if (!clozed.test(x.path)) this.noFill();
					break;
			}
		}
	}, {
		key: 'spAutoFit',
		value: function spAutoFit() {
			this.style.height = 'auto';
		}
	}, {
		key: 'lIns',
		value: function lIns(x) {
			this.style.paddingLeft = x + 'px';
		}
	}, {
		key: 'tIns',
		value: function tIns(x) {
			this.style.paddingTop = x + 'px';
		}
	}, {
		key: 'rIns',
		value: function rIns(x) {
			this.style.paddingRight = x + 'px';
		}
	}, {
		key: 'bIns',
		value: function bIns(x) {
			this.style.paddingBottom = x + 'px';
		}
	}, {
		key: 'anchor',
		value: function anchor(x) {
			this.style.display = 'table-cell';
			this.style.verticalAlign = x;
		}
	}, {
		key: 'vert',
		value: function vert(x) {
			this.style.height = this.world.width + 'px';
			this.style.width = this.world.height + 'px';
			var delta = (this.world.width - this.world.height) / 2;

			this.bgStyle.height = this.world.height + 'px';
			this.bgStyle.width = this.world.width + 'px';
			this.styless('transform', 'translate(-' + delta + 'pt,' + delta + 'pt) rotate(-' + x + 'deg) ', this.bgStyle);

			this.styless('transform', 'translate(' + delta + 'pt,-' + delta + 'pt) rotate(' + (x + this.world.rotation || 0) + 'deg)');
		}
	}]);
	return Properties;
}(_converter4.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2hhcGUuanMiXSwibmFtZXMiOlsiQVoiLCJyIiwiYSIsInRvTG93ZXJDYXNlIiwiY2xvemVkIiwiYXNTdHlsZSIsIngiLCJpIiwiJCIsImlzRnVuY3Rpb24iLCJwdXNoIiwicmVwbGFjZSIsImpvaW4iLCJzaGFwZSIsImVsIiwic3R5bGUiLCJwb3NpdGlvbiIsIm92ZXJmbG93IiwicGF0aFN0eWxlIiwic3Ryb2tlIiwic3Ryb2tlV2lkdGgiLCJmaWxsT3BhY2l0eSIsImJnU3R5bGUiLCJtYWtlQmFja2dyb3VuZFN0eWxlIiwiYXJndW1lbnRzIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwcm9wQ29udmVydGVyIiwiY29uc3RydWN0b3IiLCJQcm9wZXJ0aWVzIiwicGFyc2UiLCJwYXRoIiwiYmFja2dyb3VuZCIsImJnSW1hZ2UiLCJncmFkIiwic3ZnIiwic3ZnSW1hZ2UiLCJkb2MiLCJhc0ltYWdlVVJMIiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZFNpemUiLCJpZCIsInVpZCIsImNvbnRlbnQiLCJzZXRBdHRyaWJ1dGUiLCJjcmVhdGVTdHlsZSIsInpJbmRleCIsIndpZHRoIiwiaGVpZ2h0IiwibGVmdCIsInRvcCIsIkNvbnZlcnRlciIsInBhcmVudCIsInkiLCJyb3RhdGlvbiIsInN0eWxlc3MiLCJ3b3JsZCIsImNvbG9yIiwidW5kZWZpbmVkIiwiY2FwIiwic3Ryb2tlTGluZWNhcCIsImRhc2giLCJsaW5lU3R5bGUiLCJzdHJva2VEYXNoYXJyYXkiLCJmaWxsIiwiYW5nZWwiLCJlbmQiLCJwb3AiLCJsZW4iLCJzdG9wcyIsImxlbmd0aCIsIm5vRmlsbCIsImxuIiwiZ3JhZEZpbGwiLCJmYW1pbHkiLCJmb250RmFtaWx5IiwidCIsIk1hdGgiLCJtaW4iLCJ0ZXN0IiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nVG9wIiwicGFkZGluZ1JpZ2h0IiwicGFkZGluZ0JvdHRvbSIsImRpc3BsYXkiLCJ2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R0FBMEJBLEtBQTFCLEdBQWdDLGFBQWhDLElBQStDaEYsSUFBRSxLQUFLa0QsS0FBTCxDQUFXRixRQUFiLElBQXVCLENBQXRFLElBQXlFLE1BQWxHO0FBQ0E7QUFwS0Y7QUFBQTtBQUFBLEVBQTBDaUMsb0JBQU0xRCxVQUFoRCIsImZpbGUiOiJzaGFwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9jb252ZXJ0ZXInXG5cbnZhciBBWj0vW0EtWl0vZywgXG5cdHI9ZnVuY3Rpb24oYSl7cmV0dXJuICctJythLnRvTG93ZXJDYXNlKCl9LFxuXHRjbG96ZWQ9L1okL2dpO1xuXHRcbmZ1bmN0aW9uIGFzU3R5bGUoeCl7XG5cdHZhciBhPVtdXG5cdGZvcih2YXIgaSBpbiB4KVxuXHRcdCEkLmlzRnVuY3Rpb24oeFtpXSkgJiYgYS5wdXNoKGkucmVwbGFjZShBWixyKSsnOicreFtpXSlcblx0cmV0dXJuIGEuam9pbignOycpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNoYXBlIGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICdkaXYnfVxuXHRcblx0Y29udmVydFN0eWxlKGVsKXtcblx0XHRlbC5zdHlsZS5wb3NpdGlvbj0nYWJzb2x1dGUnXG5cdFx0ZWwuc3R5bGUub3ZlcmZsb3c9J2hpZGRlbidcblxuXHRcdHZhciBwYXRoU3R5bGU9e3N0cm9rZTonYmxhY2snLCBzdHJva2VXaWR0aDoyLCBmaWxsT3BhY2l0eTowfSxcblx0XHRcdGJnU3R5bGU9dGhpcy5tYWtlQmFja2dyb3VuZFN0eWxlKCk7XG5cdFx0c3VwZXIuY29udmVydFN0eWxlKC4uLmFyZ3VtZW50cylcblx0XHR2YXIgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKSxcblx0XHRcdHByb3BDb252ZXJ0ZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhlbC5zdHlsZSx0aGlzLCBwYXRoU3R5bGUsIGJnU3R5bGUpO1xuXHRcdHN0eWxlICYmIHN0eWxlLnBhcnNlKFtwcm9wQ29udmVydGVyXSlcblx0XHRpZih0aGlzLnBhdGgpe1xuXHRcdFx0aWYoZWwuc3R5bGUuYmFja2dyb3VuZClcblx0XHRcdFx0cGF0aFN0eWxlLmZpbGxPcGFjaXR5PTBcblx0XHRcdHZhciBiZ0ltYWdlPWVsLnN0eWxlLmJhY2tncm91bmQsXG5cdFx0XHRcdGdyYWQ9cGF0aFN0eWxlLmdyYWQ7XG5cdFx0XHRkZWxldGUgcGF0aFN0eWxlLmdyYWQ7XHRcdFx0XHRcblx0XHRcdFxuXHRcdFx0dmFyIHN2Zz0nPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+J1xuXHRcdFx0XHRcdCsoZ3JhZCA/ICc8ZGVmcz4nK2dyYWQrJzwvZGVmcz4nIDogJycpXG5cdFx0XHRcdFx0K3RoaXMucGF0aCsnIHN0eWxlPVwiJythc1N0eWxlKHBhdGhTdHlsZSkrJ1wiIC8+PC9zdmc+Jztcblx0XHRcdHZhciBzdmdJbWFnZT0ndXJsKCcrdGhpcy5kb2MuYXNJbWFnZVVSTChzdmcpKycpJztcblx0XHRcdGJnU3R5bGUuYmFja2dyb3VuZEltYWdlPXN2Z0ltYWdlXG5cdFx0XHRiZ1N0eWxlLmJhY2tncm91bmRTaXplPScxMDAlIDEwMCUnXG5cdFx0fVxuXHR9XG5cdG1ha2VCYWNrZ3JvdW5kU3R5bGUoKXtcblx0XHQvL21ha2UgYmFja2dyb3VuZCBlbCB0byBob2xkIHN2ZyBiYWNrZ3JvdW5kXG5cdFx0dmFyIGlkPSdzaGFwZScrdGhpcy5kb2MudWlkKClcblx0XHR0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKCdpZCcsaWQpXG5cdFx0dmFyIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCcjJytpZCsnOjpiZWZvcmUnKVxuXHRcdHN0eWxlLmNvbnRlbnQ9J1wiXCInXG5cdFx0c3R5bGUuekluZGV4PS0xXG5cdFx0c3R5bGUucG9zaXRpb249J2Fic29sdXRlJ1xuXHRcdHN0eWxlLndpZHRoPScxMDAlJ1xuXHRcdHN0eWxlLmhlaWdodD0nMTAwJSdcblx0XHRzdHlsZS5sZWZ0PTBcblx0XHRzdHlsZS50b3A9MFxuXHRcdHJldHVybiBzdHlsZVxuXHR9XG59XG5cbnNoYXBlLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdGNvbnN0cnVjdG9yKHN0eWxlLHBhcmVudCwgcGF0aFN0eWxlLCBiZ1N0eWxlKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5wYXRoU3R5bGU9cGF0aFN0eWxlXG5cdFx0dGhpcy5iZ1N0eWxlPWJnU3R5bGVcblx0fVxuXG5cdHhmcm0oeCl7XG5cdFx0dGhpcy5zdHlsZS53aWR0aD14LndpZHRoKydweCdcblx0XHR0aGlzLnN0eWxlLmhlaWdodD14LmhlaWdodCsncHgnXG5cdFx0eC54ICYmICh0aGlzLnN0eWxlLmxlZnQ9eC54KydweCcpXG5cdFx0eC55ICYmICh0aGlzLnN0eWxlLnRvcD14LnkrJ3B4Jylcblx0XHRcblx0XHR4LnJvdGF0aW9uICYmIHRoaXMuc3R5bGVzcygndHJhbnNmb3JtJywncm90YXRlKCcreC5yb3RhdGlvbisnZGVnKScpXG5cdFx0XG5cdFx0dGhpcy53b3JsZD14XG5cdH1cblx0bG4oeCl7XG5cdFx0eC5jb2xvciAmJiAodGhpcy5wYXRoU3R5bGUuc3Ryb2tlPXguY29sb3IpO1xuXHRcdHgud2lkdGghPXVuZGVmaW5lZCAmJiAodGhpcy5wYXRoU3R5bGUuc3Ryb2tlV2lkdGg9eC53aWR0aCsncHgnKTtcblx0XHRcblx0XHRzd2l0Y2goeC5jYXApe1xuXHRcdGNhc2UgJ3JuZCc6XG5cdFx0XHR0aGlzLnBhdGhTdHlsZS5zdHJva2VMaW5lY2FwPSdyb3VuZCdcblx0XHRcdGJyZWFrXG5cdFx0ZGVmYXVsdDpcblx0XHRcdFxuXHRcdH1cblx0XHRcblx0XHRpZih4LmRhc2gpe1xuXHRcdFx0c3dpdGNoKHRoaXMubGluZVN0eWxlKHguZGFzaCkpe1xuXHRcdFx0Y2FzZSAnZG90dGVkJzpcblx0XHRcdFx0dGhpcy5wYXRoU3R5bGUuc3Ryb2tlRGFzaGFycmF5PVwiNSw1XCJcblx0XHRcdFx0YnJlYWtcblx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdkYXNoZWQnOlxuXHRcdFx0XHR0aGlzLnBhdGhTdHlsZS5zdHJva2VEYXNoYXJyYXk9XCIxMCwxMFwiXG5cdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRzb2xpZEZpbGwoeCl7XG5cdFx0dGhpcy5wYXRoU3R5bGUuZmlsbD14XG5cdFx0dGhpcy5wYXRoU3R5bGUuZmlsbE9wYWNpdHk9MVxuXHR9XG5cdGdyYWRGaWxsKHgpe1xuXHRcdGlmKHRoaXMuc3R5bGUuYmFja2dyb3VuZEltYWdlKVxuXHRcdFx0cmV0dXJuXG5cdFx0XHRcblx0XHR2YXIgZ3JhZD1bXVxuXHRcdHN3aXRjaCh4LnBhdGgpe1xuXHRcdGNhc2UgJ2xpbmVhcic6XG5cdFx0XHRncmFkLnB1c2goJzxsaW5lYXJHcmFkaWVudCBpZD1cImdyYWRcIicpXG5cdFx0XHRzd2l0Y2goeC5hbmdlbCl7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdGdyYWQucHVzaCgneDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjEwMCVcIiB5Mj1cIjAlXCI+Jylcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgOTA6XG5cdFx0XHRcdGdyYWQucHVzaCgneDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjAlXCIgeTI9XCIxMDAlXCI+Jylcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMTgwOlxuXHRcdFx0XHRncmFkLnB1c2goJ3gxPVwiMTAwJVwiIHkxPVwiMCVcIiB4Mj1cIjAlXCIgeTI9XCIwJVwiPicpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIDI3MDpcblx0XHRcdFx0Z3JhZC5wdXNoKCd4MT1cIjAlXCIgeTE9XCIxMDAlXCIgeDI9XCIwJVwiIHkyPVwiMCVcIj4nKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdFx0Z3JhZC5wdXNoKCc8L2xpbmVhckdyYWRpZW50PicpXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ2NpcmNsZSc6XG5cdFx0XHRncmFkLnB1c2goJzxyYWRpYWxHcmFkaWVudCAgaWQ9XCJncmFkXCInKVxuXHRcdFx0Z3JhZC5wdXNoKCdjeD1cIjUwJVwiIGN5PVwiNTAlXCIgcj1cIjUwJVwiIGZ4PVwiNTAlXCIgZnk9XCI1MCVcIj4nKVxuXHRcdFx0Z3JhZC5wdXNoKCc8L3JhZGlhbEdyYWRpZW50PicpXG5cdFx0XHRicmVha1xuXHRcdH1cblx0XHR2YXIgZW5kPWdyYWQucG9wKClcblx0XHRmb3IodmFyIGk9MCxsZW49eC5zdG9wcy5sZW5ndGgsYTtpPGxlbjtpKyspXG5cdFx0XHRncmFkLnB1c2goJzxzdG9wIG9mZnNldD1cIicrKGE9eC5zdG9wc1tpXSkucG9zaXRpb24rJyVcIiBzdHlsZT1cInN0b3Atb3BhY2l0eToxO3N0b3AtY29sb3I6JythLmNvbG9yKydcIi8+Jylcblx0XHRncmFkLnB1c2goZW5kKVxuXHRcdFxuXHRcdHRoaXMucGF0aFN0eWxlLmdyYWQ9Z3JhZC5qb2luKCcgJylcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsPSd1cmwoI2dyYWQpJ1xuXHRcdHRoaXMucGF0aFN0eWxlLmZpbGxPcGFjaXR5PTFcblx0fVxuXHRibGlwRmlsbCh4KXtcblx0XHR0aGlzLnN0eWxlLmJhY2tncm91bmQ9J3VybCgnK3RoaXMuZG9jLmFzSW1hZ2VVUkwoeCkrJyknXG5cdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kU2l6ZT0nMTAwJSAxMDAlJ1xuXHRcdHRoaXMubm9GaWxsKClcblx0fVxuXHRub0ZpbGwoeCl7XG5cdFx0dGhpcy5wYXRoU3R5bGUuZmlsbE9wYWNpdHk9MFxuXHR9XG5cdGxuUmVmKHgpe1xuXHRcdHRoaXMubG4oeClcblx0fVxuXHRmaWxsUmVmKHgpe1xuXHRcdGlmKHRoaXMuc3R5bGUuYmFja2dyb3VuZEltYWdlKVxuXHRcdFx0cmV0dXJuXG5cdFx0XG5cdFx0aWYodHlwZW9mKHgucGF0aCkhPSd1bmRlZmluZWQnKVxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhZEZpbGwoeCk7XG5cdFx0XHRcblx0XHRpZih0eXBlb2YoeCk9PSdzdHJpbmcnKVxuXHRcdFx0dGhpcy5wYXRoU3R5bGUuZmlsbD14XG5cdFx0ZWxzZSBpZih0eXBlb2YoeC5jb2xvcikhPSd1bmRlZmluZWQnKVxuXHRcdFx0dGhpcy5wYXRoU3R5bGUuZmlsbD14LmNvbG9yXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuO1xuXHRcdHRoaXMucGF0aFN0eWxlLmZpbGxPcGFjaXR5PTFcblx0fVxuXHRmb250UmVmKHgpe1xuXHRcdHguY29sb3IgJiYgKHRoaXMuc3R5bGUuY29sb3I9eC5jb2xvcik7XG5cdFx0eC5mYW1pbHkgJiYgKHRoaXMuc3R5bGUuZm9udEZhbWlseT14LmZhbWlseSk7XG5cdH1cblx0cGF0aCh4LCB0KXtcblx0XHRzd2l0Y2goeC5zaGFwZSl7XG5cdFx0Y2FzZSAnbGluZSc6XG5cdFx0XHR0aGlzLnBhcmVudC5wYXRoPSc8bGluZSB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIicrdGhpcy53b3JsZC53aWR0aCsncHRcIiB5Mj1cIicrdGhpcy53b3JsZC5oZWlnaHQrJ3B0XCInXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ3JlY3QnOlxuXHRcdFx0dGhpcy5wYXJlbnQucGF0aD0nPHJlY3Qgd2lkdGg9XCInK3RoaXMud29ybGQud2lkdGgrJ3B0XCIgaGVpZ2h0PVwiJyt0aGlzLndvcmxkLmhlaWdodCsncHRcIidcblx0XHRcdGJyZWFrO1x0XG5cdFx0Y2FzZSAncm91bmRSZWN0Jzpcblx0XHRcdHRoaXMucGFyZW50LnBhdGg9JzxyZWN0IHJ4PVwiJysodD1NYXRoLm1pbih0aGlzLndvcmxkLndpZHRoLCB0aGlzLndvcmxkLmhlaWdodCkvMTIpKydwdFwiIHJ5PVwiJyt0KydwdFwiIHdpZHRoPVwiJyt0aGlzLndvcmxkLndpZHRoKydwdFwiIGhlaWdodD1cIicrdGhpcy53b3JsZC5oZWlnaHQrJ3B0XCInXG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdlbGxpcHNlJzpcblx0XHRcdHRoaXMucGFyZW50LnBhdGg9JzxlbGxpcHNlIGN4PVwiJyt0aGlzLndvcmxkLndpZHRoLzIrJ3B0XCIgY3k9XCInK3RoaXMud29ybGQuaGVpZ2h0LzIrJ3B0XCIgcng9XCInK3RoaXMud29ybGQud2lkdGgvMisncHRcIiByeT1cIicrdGhpcy53b3JsZC5oZWlnaHQvMisncHRcIidcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAncGF0aCc6XG5cdFx0XHR0aGlzLnBhcmVudC5wYXRoPSc8cGF0aCBkPVwiJyt4LnBhdGgrJ1wiJ1xuXHRcdFx0aWYoIWNsb3plZC50ZXN0KHgucGF0aCkpXG5cdFx0XHRcdHRoaXMubm9GaWxsKClcblx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cdHNwQXV0b0ZpdCgpe1xuXHRcdHRoaXMuc3R5bGUuaGVpZ2h0PSdhdXRvJ1xuXHR9XG5cdGxJbnMoeCl7XG5cdFx0dGhpcy5zdHlsZS5wYWRkaW5nTGVmdD14KydweCdcblx0fVxuXHR0SW5zKHgpe1xuXHRcdHRoaXMuc3R5bGUucGFkZGluZ1RvcD14KydweCdcblx0fVxuXHRySW5zKHgpe1xuXHRcdHRoaXMuc3R5bGUucGFkZGluZ1JpZ2h0PXgrJ3B4J1xuXHR9XG5cdGJJbnMoeCl7XG5cdFx0dGhpcy5zdHlsZS5wYWRkaW5nQm90dG9tPXgrJ3B4J1xuXHR9XG5cdGFuY2hvcih4KXtcblx0XHR0aGlzLnN0eWxlLmRpc3BsYXk9J3RhYmxlLWNlbGwnXG5cdFx0dGhpcy5zdHlsZS52ZXJ0aWNhbEFsaWduPXhcblx0fVxuXHR2ZXJ0KHgpe1xuXHRcdHRoaXMuc3R5bGUuaGVpZ2h0PXRoaXMud29ybGQud2lkdGgrJ3B4J1xuXHRcdHRoaXMuc3R5bGUud2lkdGg9dGhpcy53b3JsZC5oZWlnaHQrJ3B4J1xuXHRcdHZhciBkZWx0YT0odGhpcy53b3JsZC53aWR0aC10aGlzLndvcmxkLmhlaWdodCkvMlxuXHRcdFx0XHRcdFx0XG5cdFx0dGhpcy5iZ1N0eWxlLmhlaWdodD10aGlzLndvcmxkLmhlaWdodCsncHgnXG5cdFx0dGhpcy5iZ1N0eWxlLndpZHRoPXRoaXMud29ybGQud2lkdGgrJ3B4J1xuXHRcdHRoaXMuc3R5bGVzcygndHJhbnNmb3JtJywndHJhbnNsYXRlKC0nK2RlbHRhKydwdCwnK2RlbHRhKydwdCkgcm90YXRlKC0nK3grJ2RlZykgJywgdGhpcy5iZ1N0eWxlKVxuXG5cdFx0dGhpcy5zdHlsZXNzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGUoJytkZWx0YSsncHQsLScrZGVsdGErJ3B0KSByb3RhdGUoJysoeCt0aGlzLndvcmxkLnJvdGF0aW9ufHwwKSsnZGVnKScpXG5cdH1cbn0iXX0=