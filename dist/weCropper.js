(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.weCropper = factory());
}(this, (function () { 'use strict';

/**
 * Created by sail on 2017/6/11.
 */
var device = void 0;
var TOUCH_STATE = ['touchstarted', 'touchmoved', 'touchended'];

function firstLetterUpper(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function setTouchState(instance) {
	for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		arg[_key - 1] = arguments[_key];
	}

	TOUCH_STATE.forEach(function (key, i) {
		if (arg[i] !== undefined) {
			instance[key] = arg[i];
		}
	});
}

function validator(instance, o) {
	Object.defineProperties(instance, o);
}

function getDevice() {
	if (!device) {
		device = wx.getSystemInfoSync();
	}
	return device;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



























var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var tmp = {};

var DEFAULT = {
	id: {
		default: 'cropper',
		get: function get$$1() {
			return tmp.id;
		},
		set: function set$$1(value) {
			if (typeof value !== 'string') {
				console.error('id\uFF1A' + value + ' is invalid');
			}
			tmp.id = value;
		}
	},
	width: {
		default: 750,
		get: function get$$1() {
			return tmp.width;
		},
		set: function set$$1(value) {
			if (typeof value !== 'number') {
				console.error('width\uFF1A' + value + ' is invalid');
			}
			tmp.width = value;
		}
	},
	height: {
		default: 750,
		get: function get$$1() {
			return tmp.height;
		},
		set: function set$$1(value) {
			if (typeof value !== 'number') {
				console.error('height\uFF1A' + value + ' is invalid');
			}
			tmp.height = value;
		}
	},
	scale: {
		default: 2.5,
		get: function get$$1() {
			return tmp.scale;
		},
		set: function set$$1(value) {
			if (typeof value !== 'number') {
				console.error('scale\uFF1A' + value + ' is invalid');
			}
			tmp.scale = value;
		}
	},
	zoom: {
		default: 5,
		get: function get$$1() {
			return tmp.zoom;
		},
		set: function set$$1(value) {
			if (typeof value !== 'number') {
				console.error('zoom\uFF1A' + value + ' is invalid');
			} else if (value < 0 || value > 10) {
				console.error('zoom should be ranged in 0 ~ 10');
			}
			tmp.zoom = value;
		}
	},
	src: {
		default: 'cropper',
		get: function get$$1() {
			return tmp.src;
		},
		set: function set$$1(value) {
			if (typeof value !== 'string') {
				console.error('id\uFF1A' + value + ' is invalid');
			}
			tmp.src = value;
		}
	},
	cut: {
		default: {},
		get: function get$$1() {
			return tmp.cut;
		},
		set: function set$$1(value) {
			if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
				console.error('id\uFF1A' + value + ' is invalid');
			}
			tmp.cut = value;
		}
	},
	onReady: {
		default: null,
		get: function get$$1() {
			return tmp.ready;
		},
		set: function set$$1(value) {
			tmp.ready = value;
		}
	},
	onBeforeImageLoad: {
		default: null,
		get: function get$$1() {
			return tmp.beforeImageLoad;
		},
		set: function set$$1(value) {
			tmp.beforeImageLoad = value;
		}
	},
	onImageLoad: {
		default: null,
		get: function get$$1() {
			return tmp.imageLoad;
		},
		set: function set$$1(value) {
			tmp.imageLoad = value;
		}
	},
	onBeforeDraw: {
		default: null,
		get: function get$$1() {
			return tmp.beforeDraw;
		},
		set: function set$$1(value) {
			tmp.beforeDraw = value;
		}
	}
};

/**
 * Created by sail on 2017/6/11.
 */
function prepare() {
	var self = this;

	var _getDevice = getDevice(),
	    windowWidth = _getDevice.windowWidth;

	self.attachPage = function () {
		var pages = getCurrentPages
		//  获取到当前page上下文
		();var pageContext = pages[pages.length - 1];
		//  把this依附在Page上下文的wecropper属性上，便于在page钩子函数中访问
		pageContext.wecropper = self;
	};

	self.createCtx = function () {
		var id = self.id;

		if (id) {
			self.ctx = wx.createCanvasContext(id);
		} else {
			console.error('constructor: create canvas context failed, \'id\' must be valuable');
		}
	};

	self.deviceRadio = windowWidth / 750;
}

/**
 *
 */
function observer() {
	var self = this;

	var EVENT_TYPE = ['ready', 'beforeImageLoad', 'beforeDraw', 'imageLoad'];

	self.on = function (event, fn) {
		if (EVENT_TYPE.indexOf(event) > -1) {
			if (typeof fn === 'function') {
				event === 'ready' ? fn(self) : self['on' + firstLetterUpper(event)] = fn;
			}
		} else {
			console.error('event: ' + event + ' is invalid');
		}
		return self;
	};
}

/**
 * Created by sail on 2017/6/11.
 */
function methods() {
	var self = this;

	var deviceRadio = self.deviceRadio;

	var boundWidth = self.width; // 裁剪框默认宽度，即整个画布宽度
	var boundHeight = self.height; // 裁剪框默认高度，即整个画布高度
	var _self$cut = self.cut,
	    _self$cut$x = _self$cut.x,
	    x = _self$cut$x === undefined ? 0 : _self$cut$x,
	    _self$cut$y = _self$cut.y,
	    y = _self$cut$y === undefined ? 0 : _self$cut$y,
	    _self$cut$width = _self$cut.width,
	    width = _self$cut$width === undefined ? boundWidth : _self$cut$width,
	    _self$cut$height = _self$cut.height,
	    height = _self$cut$height === undefined ? boundHeight : _self$cut$height;


	self.updateCanvas = function () {
		if (self.croperTarget) {
			//  画布绘制图片
			self.ctx.drawImage(self.croperTarget, self.imgLeft, self.imgTop, self.scaleWidth, self.scaleHeight);
		}
		typeof self.onBeforeDraw === 'function' && self.onBeforeDraw(self.ctx, self);

		self.setBoundStyle //	设置边界样式
		();self.ctx.draw();
		return self;
	};

	self.pushOrign = function (src) {
		self.src = src;

		typeof self.onBeforeImageLoad === 'function' && self.onBeforeImageLoad(self.ctx, self);

		wx.getImageInfo({
			src: src,
			success: function success(res) {
				var innerAspectRadio = res.width / res.height;

				self.croperTarget = res.path;

				console.log(x, y);
				if (innerAspectRadio < width / height) {
					self.rectX = x;
					self.baseWidth = width;
					self.baseHeight = width / innerAspectRadio;
					self.rectY = y - Math.abs((height - self.baseHeight) / 2);
				} else {
					self.rectY = y;
					self.baseWidth = height * innerAspectRadio;
					self.baseHeight = height;
					self.rectX = x - Math.abs((width - self.baseWidth) / 2);
				}

				self.imgLeft = self.rectX;
				self.imgTop = self.rectY;
				self.scaleWidth = self.baseWidth;
				self.scaleHeight = self.baseHeight;

				self.updateCanvas();

				typeof self.onImageLoad === 'function' && self.onImageLoad(self.ctx, self);
			}
		});

		self.update();
		return self;
	};

	self.getCropperImage = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var id = self.id;

		var ARG_TYPE = toString.call(args[0]);

		switch (ARG_TYPE) {
			case '[object Object]':
				var _args$0$quality = args[0].quality,
				    quality = _args$0$quality === undefined ? 10 : _args$0$quality;


				if (typeof quality !== 'number') {
					console.error('quality\uFF1A' + quality + ' is invalid');
				} else if (quality < 0 || quality > 10) {
					console.error('quality should be ranged in 0 ~ 10');
				}
				wx.canvasToTempFilePath({
					canvasId: id,
					x: x,
					y: y,
					width: width,
					height: height,
					destWidth: width * quality / (deviceRadio * 10),
					destHeight: height * quality / (deviceRadio * 10),
					success: function success(res) {
						typeof args[args.length - 1] === 'function' && args[args.length - 1](res.tempFilePath);
					}
				});break;
			case '[object Function]':
				wx.canvasToTempFilePath({
					canvasId: id,
					x: x,
					y: y,
					width: width,
					height: height,
					destWidth: width / deviceRadio,
					destHeight: height / deviceRadio,
					success: function success(res) {
						typeof args[args.length - 1] === 'function' && args[args.length - 1](res.tempFilePath);
					}
				});break;
		}

		return self;
	};
}

/**
 * Created by sail on 2017/6/11.
 */
function update() {
	var self = this;

	if (!self.src) return;

	self.__oneTouchStart = function (touch) {
		self.touchX0 = touch.x;
		self.touchY0 = touch.y;
	};

	self.__oneTouchMove = function (touch) {
		var xMove = void 0,
		    yMove = void 0;
		//计算单指移动的距离
		if (self.touchended) {
			return self.updateCanvas();
		}
		xMove = touch.x - self.touchX0;
		yMove = touch.y - self.touchY0;

		var imgLeft = self.rectX + xMove;
		var imgTop = self.rectY + yMove;

		self.outsideBound(imgLeft, imgTop);

		self.updateCanvas();
	};

	self.__twoTouchStart = function (touch0, touch1) {
		var xMove = void 0,
		    yMove = void 0,
		    oldDistance = void 0;

		self.touchX1 = self.rectX + self.scaleWidth / 2;
		self.touchY1 = self.rectY + self.scaleHeight / 2;

		//计算两指距离
		xMove = touch1.x - touch0.x;
		yMove = touch1.y - touch0.y;
		oldDistance = Math.sqrt(xMove * xMove + yMove * yMove);

		self.oldDistance = oldDistance;
	};

	self.__twoTouchMove = function (touch0, touch1) {
		var xMove = void 0,
		    yMove = void 0,
		    newDistance = void 0;
		var scale = self.scale,
		    zoom = self.zoom;
		// 计算二指最新距离

		xMove = touch1.x - touch0.x;
		yMove = touch1.y - touch0.y;
		newDistance = Math.sqrt(xMove * xMove + yMove * yMove

		//  使用0.005的缩放倍数具有良好的缩放体验
		);self.newScale = self.oldScale + 0.001 * zoom * (newDistance - self.oldDistance);

		//  设定缩放范围
		self.newScale <= 1 && (self.newScale = 1);
		self.newScale >= scale && (self.newScale = scale);

		self.scaleWidth = self.newScale * self.baseWidth;
		self.scaleHeight = self.newScale * self.baseHeight;
		var imgLeft = self.touchX1 - self.scaleWidth / 2;
		var imgTop = self.touchY1 - self.scaleHeight / 2;

		self.outsideBound(imgLeft, imgTop);

		self.updateCanvas();
	};

	self.__xtouchEnd = function () {
		self.oldScale = self.newScale;
		self.rectX = self.imgLeft;
		self.rectY = self.imgTop;
	};
}

/**
 * Created by sail on 2017/6/11.
 */

var handle = {
	//  图片手势初始监测
	touchStart: function touchStart(e) {
		var self = this;

		var _e$touches = slicedToArray(e.touches, 2),
		    touch0 = _e$touches[0],
		    touch1 = _e$touches[1];

		setTouchState(self, true, null, null

		//计算第一个触摸点的位置，并参照改点进行缩放
		);self.__oneTouchStart(touch0

		// 两指手势触发
		);if (e.touches.length >= 2) {
			self.__twoTouchStart(touch0, touch1);
		}
	},


	//  图片手势动态缩放
	touchMove: function touchMove(e) {
		var self = this;

		var _e$touches2 = slicedToArray(e.touches, 2),
		    touch0 = _e$touches2[0],
		    touch1 = _e$touches2[1];

		setTouchState(self, null, true

		// 单指手势时触发
		);if (e.touches.length === 1) {
			self.__oneTouchMove(touch0);
		}
		// 两指手势触发
		if (e.touches.length >= 2) {
			self.__twoTouchMove(touch0, touch1);
		}
	},
	touchEnd: function touchEnd(e) {
		var self = this;

		setTouchState(self, false, false, true);
		self.__xtouchEnd();
	}
};

/**
 * Created by sail on 1017/6/12.
 */
function cut() {
	var self = this;
	var deviceRadio = self.deviceRadio;

	var boundWidth = self.width; // 裁剪框默认宽度，即整个画布宽度
	var boundHeight = self.height;
	// 裁剪框默认高度，即整个画布高度
	var _self$cut = self.cut,
	    _self$cut$x = _self$cut.x,
	    x = _self$cut$x === undefined ? 0 : _self$cut$x,
	    _self$cut$y = _self$cut.y,
	    y = _self$cut$y === undefined ? 0 : _self$cut$y,
	    _self$cut$width = _self$cut.width,
	    width = _self$cut$width === undefined ? boundWidth : _self$cut$width,
	    _self$cut$height = _self$cut.height,
	    height = _self$cut$height === undefined ? boundHeight : _self$cut$height;

	/**
  * 设置边界
  * @param imgLeft 图片左上角横坐标值
  * @param imgTop 图片左上角纵坐标值
  */

	self.outsideBound = function (imgLeft, imgTop) {
		self.imgLeft = imgLeft >= x ? x : self.scaleWidth + imgLeft - x <= width ? x + width - self.scaleWidth : imgLeft;

		self.imgTop = imgTop >= y ? y : self.scaleHeight + imgTop - y <= height ? y + height - self.scaleHeight : imgTop;
	};

	/**
  * 设置边界样式
  * @param color	边界颜色
  */
	self.setBoundStyle = function () {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref$color = _ref.color,
		    color = _ref$color === undefined ? '#04b00f' : _ref$color,
		    _ref$mask = _ref.mask,
		    mask = _ref$mask === undefined ? 'rgba(0, 0, 0, 0.3)' : _ref$mask,
		    _ref$lineWidth = _ref.lineWidth,
		    lineWidth = _ref$lineWidth === undefined ? 1 : _ref$lineWidth;

		// 绘制半透明层
		self.ctx.beginPath();
		self.ctx.setFillStyle(mask);
		self.ctx.fillRect(0, 0, x, boundHeight);
		self.ctx.fillRect(x, 0, width, y);
		self.ctx.fillRect(x, y + height, width, boundHeight - y - height);
		self.ctx.fillRect(x + width, 0, boundWidth - x - width, boundHeight);
		self.ctx.fill

		// 设置边界左上角样式
		// 为使边界样式处于边界外边缘，此时x、y均要减少lineWidth
		();self.ctx.beginPath();
		self.ctx.setStrokeStyle(color);
		self.ctx.setLineWidth(lineWidth);
		self.ctx.moveTo(x - lineWidth, y + 10 - lineWidth);
		self.ctx.lineTo(x - lineWidth, y - lineWidth);
		self.ctx.lineTo(x + 10 - lineWidth, y - lineWidth);
		self.ctx.stroke

		// 设置边界左下角样式
		// 为使边界样式处于边界外边缘，此时x要减少lineWidth、y要增加lineWidth
		();self.ctx.beginPath();
		self.ctx.setStrokeStyle(color);
		self.ctx.setLineWidth(lineWidth);
		self.ctx.moveTo(x - lineWidth, y + height - 10 + lineWidth);
		self.ctx.lineTo(x - lineWidth, y + height + lineWidth);
		self.ctx.lineTo(x + 10 - lineWidth, y + height + lineWidth);
		self.ctx.stroke

		// 设置边界右上角样式
		// 为使边界样式处于边界外边缘，此时x要增加lineWidth、y要减少lineWidth
		();self.ctx.beginPath();
		self.ctx.setStrokeStyle(color);
		self.ctx.setLineWidth(lineWidth);
		self.ctx.moveTo(x + width - 10 + lineWidth, y - lineWidth);
		self.ctx.lineTo(x + width + lineWidth, y - lineWidth);
		self.ctx.lineTo(x + width + lineWidth, y + 10 - lineWidth);
		self.ctx.stroke

		// 设置边界右下角样式
		// 为使边界样式处于边界外边缘，此时x、y均要增加lineWidth
		();self.ctx.beginPath();
		self.ctx.setStrokeStyle(color);
		self.ctx.setLineWidth(lineWidth);
		self.ctx.moveTo(x + width + lineWidth, y + height - 10 + lineWidth);
		self.ctx.lineTo(x + width + lineWidth, y + height + lineWidth);
		self.ctx.lineTo(x + width - 10 + lineWidth, y + height + lineWidth);
		self.ctx.stroke();
	};
}

var __version__ = '1.1.4';

var weCropper = function () {
	function weCropper(params) {
		classCallCheck(this, weCropper);

		var self = this;
		var _default = {};

		validator(self, DEFAULT);

		Object.keys(DEFAULT).forEach(function (key) {
			_default[key] = DEFAULT[key].default;
		});
		Object.assign(self, _default, params);

		self.prepare();
		self.attachPage();
		self.createCtx();
		self.observer();
		self.cutt();
		self.methods();
		self.init();
		self.update();

		return self;
	}

	createClass(weCropper, [{
		key: 'init',
		value: function init() {
			var self = this;
			var src = self.src;


			self.version = __version__;

			typeof self.onReady === 'function' && self.onReady(self.ctx, self);

			if (src) {
				self.pushOrign(src);
			}
			setTouchState(self, false, false, false);

			self.oldScale = 1;
			self.newScale = 1;

			return self;
		}
	}]);
	return weCropper;
}();

Object.assign(weCropper.prototype, handle);

weCropper.prototype.prepare = prepare;
weCropper.prototype.observer = observer;
weCropper.prototype.methods = methods;
weCropper.prototype.cutt = cut;
weCropper.prototype.update = update;

return weCropper;

})));
