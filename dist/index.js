(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["VueVirtualScroll"] = factory(require("vue"));
	else
		root["VueVirtualScroll"] = factory(root["vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VueVirtualScroll = _vue2.default.component('vue-virtualscroll', {

	props: {
		height: {
			type: Number,
			default: 30
		},
		onScroll: Function
	},

	data: function data() {
		return {
			offset: 0,
			paddingTop: 0,
			nb: 0,
			total: 0,
			viewHeight: 0,
			scrollHeight: 0,
			scrollTop: 0,
			count: 0,
			initialized: false
		};
	},


	methods: {
		scroll: function scroll(e) {
			this.scrollTop = e.target.scrollTop;
			this.offset = Math.floor(this.scrollTop / this.height);
			if (this.offset > this.total - this.count) {
				this.$emit('reachBottom');
				this.offset = this.total - this.count;
			}
			this.paddingTop = this.offset * this.height;
			this.$forceUpdate();
			if (this.onScroll) {
				this.onScroll(e, this.scrollTop);
			}
			if (!this.scrollTop) this.$emit('reachTop');
		},
		_getVNodes: function _getVNodes() {
			if (this.initialized) {
				return this.$slots.default.slice(this.offset, this.offset + this.count);
			} else {
				return [];
			}
		},
		_getElemInfo: function _getElemInfo(elem) {
			var offsetTop = 0;
			var offsetLeft = 0;
			var offsetHeight = elem.offsetHeight;
			var offsetWidth = elem.offsetWidth;

			do {
				if (!isNaN(elem.offsetTop)) offsetTop += elem.offsetTop;
				if (!isNaN(elem.offsetLeft)) offsetLeft += elem.offsetLeft;
			} while ((elem = elem.offsetParent) !== null);

			return {
				top: offsetTop,
				left: offsetLeft,
				height: offsetHeight,
				width: offsetWidth
			};
		},
		init: function init() {
			this.initialized = true;
			this.setData();
			this.$forceUpdate();
		},
		setData: function setData() {
			this.viewHeight = this._getElemInfo(this.$el).height;
			this.nb = Math.ceil(this.viewHeight / this.height);
			this.count = this.nb + Math.round(this.nb / 2);
			this.total = this.$slots.default.length;
			if (this.total < this.count) this.count = this.total;
			this.scrollHeight = this.height * (this.total - this.count);
			this.$el.scrollTop = 0;
		}
	},

	updated: function updated() {
		if (!this.initialized) this.init();
	},
	render: function render(createElement) {
		if (!this.initialized || !this.height) return createElement('div', {});
		if (this.initialized && this.total != this.$slots.default.length) this.setData();
		return createElement('div', {
			'on': {
				'scroll': this.scroll
			},
			'style': {
				'overflow-y': 'auto',
				'height': this.viewHeight + 'px',
				'scrollTop': 0
			}
		}, [createElement('div', {
			'style': {
				'padding-top': this.paddingTop + 'px',
				'padding-bottom': this.scrollHeight - this.paddingTop + 'px'
			}
		}, this._getVNodes())]);
	}
});

module.exports = VueVirtualScroll;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map