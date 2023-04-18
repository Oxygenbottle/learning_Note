(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('koa'), require('koa-router')) :
	typeof define === 'function' && define.amd ? define(['koa', 'koa-router'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Koa, global.Router));
})(this, (function (Koa, Router) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var Koa__default = /*#__PURE__*/_interopDefaultLegacy(Koa);
	var Router__default = /*#__PURE__*/_interopDefaultLegacy(Router);

	const app = new Koa__default["default"]();
	const router = new Router__default["default"]();
	router.get('/');

}));
