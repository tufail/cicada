(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cicada", [], factory);
	else if(typeof exports === 'object')
		exports["cicada"] = factory();
	else
		root["cicada"] = factory();
})(window, function() {
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsCookie = __webpack_require__(1);

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CicadaTrack = function () {
	function CicadaTrack() {
		_classCallCheck(this, CicadaTrack);

		this.url_src = this.getParameter('utm_source') || false;
		this.url_glicd = this.getParameter('gclid') || false;
		this.url_mdm = this.getParameter('utm_medium') || false;
		this.org_src = this.getParameter('cicada_org_src') || false;
		this.org_mdm = this.getParameter('cicada_org_mdm') || false;
		this.boot();
	}

	//get paramter from the URL


	_createClass(CicadaTrack, [{
		key: 'getParameter',
		value: function getParameter(param) {
			var params = window.location.search.substr(1).split('&');
			for (var i = 0; i < params.length; i++) {
				var p = params[i].split('=');
				if (p[0] == param) {
					return decodeURIComponent(p[1]);
				}
			}
			return false;
		}
	}, {
		key: 'getQueryString',
		value: function getQueryString(field, url) {
			var href = url ? url : window.location.href;
			var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
			var string = reg.exec(href);
			return string ? string[1] : null;
		}
	}, {
		key: 'updateQprm',
		value: function updateQprm(uri, key, value) {
			var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
			var separator = uri.indexOf('?') !== -1 ? '&' : '?';
			if (uri.match(re)) {
				return uri.replace(re, '$1' + key + '=' + value + '$2');
			} else {
				return uri + separator + key + '=' + value;
			}
		}
	}, {
		key: 'getT',
		value: function getT(timestamp) {
			var date = new Date();
			return [('0' + date.getDate()).slice(-2), // Get day and pad it with zeroes
			('0' + (date.getMonth() + 1)).slice(-2), // Get month and pad it with zeroes
			date.getFullYear() // Get full year
			].join('-'); // Glue the pieces together
		}
	}, {
		key: 'formateCk',
		value: function formateCk(val) {
			return val.replace(/\./gm, '');
		}
	}, {
		key: 'setFirstTrackingCookies',
		value: function setFirstTrackingCookies() {
			var src_cookie = _jsCookie2.default.get('cicada_src');
			var mdm_cookie = _jsCookie2.default.get('cicada_mdm');
			if (!mdm_cookie || !src_cookie) {
				var srcData = this.checkMedium(document.referrer || window.location.href);
				_jsCookie2.default.set('cicada_src', srcData.source, { expires: 120 });
				_jsCookie2.default.set('cicada_mdm', srcData.medium, { expires: 120 });

				if (this.org_src) {
					_jsCookie2.default.set('cicada_org_src', this.org_src, { expires: 120 });
					_jsCookie2.default.set('cicada_org_mdm', this.org_mdm || 'referrer', { expires: 120 });
				} else {
					_jsCookie2.default.set('cicada_org_src', srcData.source, { expires: 120 });
					_jsCookie2.default.set('cicada_org_mdm', srcData.medium, { expires: 120 });
				}
			}
		}
	}, {
		key: 'is_external',
		value: function is_external(url) {
			var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
			if (typeof match[1] === 'string' && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
			if (typeof match[2] === 'string' && match[2].length > 0 && match[2].replace(new RegExp(':(' + { 'http:': 80, 'https:': 443 }[location.protocol] + ')?$'), '') !== location.host) return true;
			return false;
		}
	}, {
		key: 'boot',
		value: function boot() {
			var _this = this;

			this.setFirstTrackingCookies();
			var that = this;
			jQuery(document).ready(function () {
				if (!_jsCookie2.default.get('crsi')) {
					jQuery.get('https://www.cloudflare.com/cdn-cgi/trace', function (data) {
						var dataarray = data.split('\n');
						var nameDf = dataarray[2].slice(3);
						var nname = that.formateCk(nameDf);
						if (!_jsCookie2.default.get('crsi') && that.getQueryString('crsi')) {
							_jsCookie2.default.set('crsi', that.getQueryString('crsi'), { expires: 120 });
						} else if (!_jsCookie2.default.get('crsi')) {
							_jsCookie2.default.set('crsi', nname, { expires: 120 });
						}
						if (!_jsCookie2.default.get('crst')) {
							_jsCookie2.default.set('crst', that.getT(), { expires: 120 });
						}
					});
				}
			});

			jQuery(window).on('load', function () {
				var that = _this;
				jQuery('a[href]').each(function () {
					if (jQuery(this).attr('href')) {
						var nlink = jQuery(this).attr('href');
						if (nlink !== '#' && that.is_external(nlink)) {
							var nhrf = that.updateQprm(nlink, 'crsi', _jsCookie2.default.get('crsi'));
							nhrf = that.updateQprm(nhrf, 'cicada_org_src', _jsCookie2.default.get('cicada_org_src'));
							nhrf = that.updateQprm(nhrf, 'cicada_org_mdm', _jsCookie2.default.get('cicada_org_mdm'));
							jQuery(this).attr('href', nhrf);
						}
					}
				});
			});
		}
	}, {
		key: 'checkMedium',
		value: function checkMedium(urlString) {
			urlString = urlString.replace('&cicada_org_src=' + this.org_src, '');
			urlString = urlString.replace('cicada_org_src=' + this.org_src, '');
			urlString = urlString.replace('&cicada_org_mdm=' + this.org_mdm, '');
			urlString = urlString.replace('cicada_org_mdm=' + this.org_mdm, '');
			var srcDomain = urlString.match('.*://(?:www.)?([^/]+)')[1] || urlString.match('.*://(?:www.)?([^/]+)')[0];
			var directUrl = window.location.href.match('.*://(?:www.)?([^/]+)')[1] || window.location.href.match('.*://(?:www.)?([^/]+)')[0];
			debugger;
			if (this.url_mdm) {
				return { source: this.url_src, medium: this.url_mdm || 'CPC' };
			} else if (this.url_glicd) {
				return { source: this.url_src || 'google', medium: this.url_mdm || 'CPC' };
			} else if (urlString.indexOf('facebook') > -1 || urlString.indexOf('fb') > -1) {
				return { source: this.url_src || 'facebook', medium: this.url_mdm || 'social' };
			} else if (urlString.indexOf('twitter') > -1) {
				return { source: this.url_src || 'twitter', medium: this.url_mdm || 'social' };
			} else if (urlString.indexOf('gmail') > -1 || urlString.indexOf('outlook') > -1 || urlString.indexOf('email') > -1 || urlString.indexOf('newsletter') > -1) {
				return { source: srcDomain, medium: 'email' };
			} else if (urlString.indexOf('coupons.com') > -1) {
				return { source: 'coupons.com', medium: 'affiliate' };
			} else if (urlString.indexOf('google.com') > -1) {
				return { source: 'google.com', medium: 'organic' };
			} else if (urlString.indexOf('bing.com') > -1) {
				return { source: 'bing.com', medium: 'organic' };
			} else if (urlString.indexOf('duckduckgo.com') > -1) {
				return { source: 'duckduckgo', medium: 'organic' };
			} else if (window.location.href === document.referrer || document.referrer === '') {
				return { source: directUrl, medium: 'direct' };
			} else {
				return { source: srcDomain, medium: 'referrer' };
			}
		}
	}]);

	return CicadaTrack;
}();

exports.default = CicadaTrack;


window.CicadaTrack = new CicadaTrack();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ })
/******/ ]);
});
//# sourceMappingURL=cicada.min.map