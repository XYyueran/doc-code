/*! This file is created by zhaoda */
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__face__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button__ = __webpack_require__(5);




__webpack_require__(6);
__webpack_require__(7);
var info = __webpack_require__(8);

var newinfo = () => {
  return info.name + '\'s age is ' + info.age;
};
var button = () => __WEBPACK_IMPORTED_MODULE_2__button__["a" /* default */].button;
document.write(button());
__WEBPACK_IMPORTED_MODULE_2__button__["a" /* default */].attacgEl();
document.write("it works module ");
document.write(newinfo());
document.write(` <p>${__WEBPACK_IMPORTED_MODULE_0__face__["a" /* default */]} ${__WEBPACK_IMPORTED_MODULE_1__content__["a" /* default */]}</p>`);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const face = __webpack_require__(2);
const Image = "<img src='" + face + "'/>";
/* harmony default export */ __webpack_exports__["a"] = (Image);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUI0MDQ5REM4N0UyMTFFNzkwOEZCMTQ2MEQzRjFFMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUI0MDQ5REI4N0UyMTFFNzkwOEZCMTQ2MEQzRjFFMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTdCREIxMkY4N0IwMTFFNzk1OTI4NEMxNTQxODIwMTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTdCREIxMzA4N0IwMTFFNzk1OTI4NEMxNTQxODIwMTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz76h3P4AAAIZklEQVR42uRb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"

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const content = __webpack_require__(4);
const Image = "<img src= '" + content + "'/>";
/* harmony default export */ __webpack_exports__["a"] = (Image);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/184dc4daf9d0.png";

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Button = {
	button: '<button id="myButton">Press me</button>',
	attacgEl: () => {
		document.getElementById('myButton').addEventListener('click', function () {
			console.log('clicked');
		});
	}
};
/* harmony default export */ __webpack_exports__["a"] = (Button);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = { name: 'lili', age: 17 };

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map