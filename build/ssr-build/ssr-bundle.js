module.exports =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+QGC":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "1afE":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "3F7m":
/***/ (function(module, exports, __webpack_require__) {

/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

;(function (root) {
  'use strict';

  /**
   * Block-Level Grammar
   */

  var block = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: noop,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
    nptable: noop,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
    html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
    table: noop,
    lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
    paragraph: /^([^\n]+(?:\n?(?!hr|heading|lheading| {0,3}>|tag)[^\n]+)+)/,
    text: /^[^\n]+/
  };

  block._label = /(?:\\[\[\]]|[^\[\]])+/;
  block._title = /(?:"(?:\\"|[^"]|"[^"\n]*")*"|'\n?(?:[^'\n]+\n?)*'|\([^()]*\))/;
  block.def = edit(block.def).replace('label', block._label).replace('title', block._title).getRegex();

  block.bullet = /(?:[*+-]|\d+\.)/;
  block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
  block.item = edit(block.item, 'gm').replace(/bull/g, block.bullet).getRegex();

  block.list = edit(block.list).replace(/bull/g, block.bullet).replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))').replace('def', '\\n+(?=' + block.def.source + ')').getRegex();

  block._tag = '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code' + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo' + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b';

  block.html = edit(block.html).replace('comment', /<!--[\s\S]*?-->/).replace('closed', /<(tag)[\s\S]+?<\/\1>/).replace('closing', /<tag(?:"[^"]*"|'[^']*'|\s[^'"\/>\s]*)*?\/?>/).replace(/tag/g, block._tag).getRegex();

  block.paragraph = edit(block.paragraph).replace('hr', block.hr).replace('heading', block.heading).replace('lheading', block.lheading).replace('tag', '<' + block._tag).getRegex();

  block.blockquote = edit(block.blockquote).replace('paragraph', block.paragraph).getRegex();

  /**
   * Normal Block Grammar
   */

  block.normal = merge({}, block);

  /**
   * GFM Block Grammar
   */

  block.gfm = merge({}, block.normal, {
    fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
    paragraph: /^/,
    heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
  });

  block.gfm.paragraph = edit(block.paragraph).replace('(?!', '(?!' + block.gfm.fences.source.replace('\\1', '\\2') + '|' + block.list.source.replace('\\1', '\\3') + '|').getRegex();

  /**
   * GFM + Tables Block Grammar
   */

  block.tables = merge({}, block.gfm, {
    nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
    table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
  });

  /**
   * Block Lexer
   */

  function Lexer(options) {
    this.tokens = [];
    this.tokens.links = {};
    this.options = options || marked.defaults;
    this.rules = block.normal;

    if (this.options.gfm) {
      if (this.options.tables) {
        this.rules = block.tables;
      } else {
        this.rules = block.gfm;
      }
    }
  }

  /**
   * Expose Block Rules
   */

  Lexer.rules = block;

  /**
   * Static Lex Method
   */

  Lexer.lex = function (src, options) {
    var lexer = new Lexer(options);
    return lexer.lex(src);
  };

  /**
   * Preprocessing
   */

  Lexer.prototype.lex = function (src) {
    src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ').replace(/\u00a0/g, ' ').replace(/\u2424/g, '\n');

    return this.token(src, true);
  };

  /**
   * Lexing
   */

  Lexer.prototype.token = function (src, top) {
    src = src.replace(/^ +$/gm, '');
    var next, loose, cap, bull, b, item, space, i, tag, l, isordered;

    while (src) {
      // newline
      if (cap = this.rules.newline.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[0].length > 1) {
          this.tokens.push({
            type: 'space'
          });
        }
      }

      // code
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        cap = cap[0].replace(/^ {4}/gm, '');
        this.tokens.push({
          type: 'code',
          text: !this.options.pedantic ? cap.replace(/\n+$/, '') : cap
        });
        continue;
      }

      // fences (gfm)
      if (cap = this.rules.fences.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'code',
          lang: cap[2],
          text: cap[3] || ''
        });
        continue;
      }

      // heading
      if (cap = this.rules.heading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'heading',
          depth: cap[1].length,
          text: cap[2]
        });
        continue;
      }

      // table no leading pipe (gfm)
      if (top && (cap = this.rules.nptable.exec(src))) {
        src = src.substring(cap[0].length);

        item = {
          type: 'table',
          header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3].replace(/\n$/, '').split('\n')
        };

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = item.cells[i].split(/ *\| */);
        }

        this.tokens.push(item);

        continue;
      }

      // hr
      if (cap = this.rules.hr.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'hr'
        });
        continue;
      }

      // blockquote
      if (cap = this.rules.blockquote.exec(src)) {
        src = src.substring(cap[0].length);

        this.tokens.push({
          type: 'blockquote_start'
        });

        cap = cap[0].replace(/^ *> ?/gm, '');

        // Pass `top` to keep the current
        // "toplevel" state. This is exactly
        // how markdown.pl works.
        this.token(cap, top);

        this.tokens.push({
          type: 'blockquote_end'
        });

        continue;
      }

      // list
      if (cap = this.rules.list.exec(src)) {
        src = src.substring(cap[0].length);
        bull = cap[2];
        isordered = bull.length > 1;

        this.tokens.push({
          type: 'list_start',
          ordered: isordered,
          start: isordered ? +bull : ''
        });

        // Get each top-level item.
        cap = cap[0].match(this.rules.item);

        next = false;
        l = cap.length;
        i = 0;

        for (; i < l; i++) {
          item = cap[i];

          // Remove the list item's bullet
          // so it is seen as the next token.
          space = item.length;
          item = item.replace(/^ *([*+-]|\d+\.) +/, '');

          // Outdent whatever the
          // list item contains. Hacky.
          if (~item.indexOf('\n ')) {
            space -= item.length;
            item = !this.options.pedantic ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '') : item.replace(/^ {1,4}/gm, '');
          }

          // Determine whether the next list item belongs here.
          // Backpedal if it does not belong in this list.
          if (this.options.smartLists && i !== l - 1) {
            b = block.bullet.exec(cap[i + 1])[0];
            if (bull !== b && !(bull.length > 1 && b.length > 1)) {
              src = cap.slice(i + 1).join('\n') + src;
              i = l - 1;
            }
          }

          // Determine whether item is loose or not.
          // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
          // for discount behavior.
          loose = next || /\n\n(?!\s*$)/.test(item);
          if (i !== l - 1) {
            next = item.charAt(item.length - 1) === '\n';
            if (!loose) loose = next;
          }

          this.tokens.push({
            type: loose ? 'loose_item_start' : 'list_item_start'
          });

          // Recurse.
          this.token(item, false);

          this.tokens.push({
            type: 'list_item_end'
          });
        }

        this.tokens.push({
          type: 'list_end'
        });

        continue;
      }

      // html
      if (cap = this.rules.html.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: this.options.sanitize ? 'paragraph' : 'html',
          pre: !this.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
          text: cap[0]
        });
        continue;
      }

      // def
      if (top && (cap = this.rules.def.exec(src))) {
        src = src.substring(cap[0].length);
        if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
        tag = cap[1].toLowerCase();
        if (!this.tokens.links[tag]) {
          this.tokens.links[tag] = {
            href: cap[2],
            title: cap[3]
          };
        }
        continue;
      }

      // table (gfm)
      if (top && (cap = this.rules.table.exec(src))) {
        src = src.substring(cap[0].length);

        item = {
          type: 'table',
          header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
        };

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = item.cells[i].replace(/^ *\| *| *\| *$/g, '').split(/ *\| */);
        }

        this.tokens.push(item);

        continue;
      }

      // lheading
      if (cap = this.rules.lheading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'heading',
          depth: cap[2] === '=' ? 1 : 2,
          text: cap[1]
        });
        continue;
      }

      // top-level paragraph
      if (top && (cap = this.rules.paragraph.exec(src))) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'paragraph',
          text: cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1]
        });
        continue;
      }

      // text
      if (cap = this.rules.text.exec(src)) {
        // Top-level should never reach here.
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: 'text',
          text: cap[0]
        });
        continue;
      }

      if (src) {
        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
      }
    }

    return this.tokens;
  };

  /**
   * Inline-Level Grammar
   */

  var inline = {
    escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noop,
    tag: /^<!--[\s\S]*?-->|^<\/?[a-zA-Z0-9\-]+(?:"[^"]*"|'[^']*'|\s[^<'">\/\s]*)*?\/?>/,
    link: /^!?\[(inside)\]\(href\)/,
    reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
    nolink: /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\]/,
    strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
    em: /^_([^\s_](?:[^_]|__)+?[^\s_])_\b|^\*((?:\*\*|[^*])+?)\*(?!\*)/,
    code: /^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,
    br: /^ {2,}\n(?!\s*$)/,
    del: noop,
    text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
  };

  inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;

  inline.autolink = edit(inline.autolink).replace('scheme', inline._scheme).replace('email', inline._email).getRegex();

  inline._inside = /(?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/;
  inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

  inline.link = edit(inline.link).replace('inside', inline._inside).replace('href', inline._href).getRegex();

  inline.reflink = edit(inline.reflink).replace('inside', inline._inside).getRegex();

  /**
   * Normal Inline Grammar
   */

  inline.normal = merge({}, inline);

  /**
   * Pedantic Inline Grammar
   */

  inline.pedantic = merge({}, inline.normal, {
    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
  });

  /**
   * GFM Inline Grammar
   */

  inline.gfm = merge({}, inline.normal, {
    escape: edit(inline.escape).replace('])', '~|])').getRegex(),
    url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace('email', inline._email).getRegex(),
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^~~(?=\S)([\s\S]*?\S)~~/,
    text: edit(inline.text).replace(']|', '~]|').replace('|', '|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&\'*+/=?^_`{\\|}~-]+@|').getRegex()
  });

  /**
   * GFM + Line Breaks Inline Grammar
   */

  inline.breaks = merge({}, inline.gfm, {
    br: edit(inline.br).replace('{2,}', '*').getRegex(),
    text: edit(inline.gfm.text).replace('{2,}', '*').getRegex()
  });

  /**
   * Inline Lexer & Compiler
   */

  function InlineLexer(links, options) {
    this.options = options || marked.defaults;
    this.links = links;
    this.rules = inline.normal;
    this.renderer = this.options.renderer || new Renderer();
    this.renderer.options = this.options;

    if (!this.links) {
      throw new Error('Tokens array requires a `links` property.');
    }

    if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inline.breaks;
      } else {
        this.rules = inline.gfm;
      }
    } else if (this.options.pedantic) {
      this.rules = inline.pedantic;
    }
  }

  /**
   * Expose Inline Rules
   */

  InlineLexer.rules = inline;

  /**
   * Static Lexing/Compiling Method
   */

  InlineLexer.output = function (src, links, options) {
    var inline = new InlineLexer(links, options);
    return inline.output(src);
  };

  /**
   * Lexing/Compiling
   */

  InlineLexer.prototype.output = function (src) {
    var out = '',
        link,
        text,
        href,
        cap;

    while (src) {
      // escape
      if (cap = this.rules.escape.exec(src)) {
        src = src.substring(cap[0].length);
        out += cap[1];
        continue;
      }

      // autolink
      if (cap = this.rules.autolink.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[2] === '@') {
          text = escape(this.mangle(cap[1]));
          href = 'mailto:' + text;
        } else {
          text = escape(cap[1]);
          href = text;
        }
        out += this.renderer.link(href, null, text);
        continue;
      }

      // url (gfm)
      if (!this.inLink && (cap = this.rules.url.exec(src))) {
        cap[0] = this.rules._backpedal.exec(cap[0])[0];
        src = src.substring(cap[0].length);
        if (cap[2] === '@') {
          text = escape(cap[0]);
          href = 'mailto:' + text;
        } else {
          text = escape(cap[0]);
          if (cap[1] === 'www.') {
            href = 'http://' + text;
          } else {
            href = text;
          }
        }
        out += this.renderer.link(href, null, text);
        continue;
      }

      // tag
      if (cap = this.rules.tag.exec(src)) {
        if (!this.inLink && /^<a /i.test(cap[0])) {
          this.inLink = true;
        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
          this.inLink = false;
        }
        src = src.substring(cap[0].length);
        out += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
        continue;
      }

      // link
      if (cap = this.rules.link.exec(src)) {
        src = src.substring(cap[0].length);
        this.inLink = true;
        out += this.outputLink(cap, {
          href: cap[2],
          title: cap[3]
        });
        this.inLink = false;
        continue;
      }

      // reflink, nolink
      if ((cap = this.rules.reflink.exec(src)) || (cap = this.rules.nolink.exec(src))) {
        src = src.substring(cap[0].length);
        link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
        link = this.links[link.toLowerCase()];
        if (!link || !link.href) {
          out += cap[0].charAt(0);
          src = cap[0].substring(1) + src;
          continue;
        }
        this.inLink = true;
        out += this.outputLink(cap, link);
        this.inLink = false;
        continue;
      }

      // strong
      if (cap = this.rules.strong.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.strong(this.output(cap[2] || cap[1]));
        continue;
      }

      // em
      if (cap = this.rules.em.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.em(this.output(cap[2] || cap[1]));
        continue;
      }

      // code
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.codespan(escape(cap[2].trim(), true));
        continue;
      }

      // br
      if (cap = this.rules.br.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.br();
        continue;
      }

      // del (gfm)
      if (cap = this.rules.del.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.del(this.output(cap[1]));
        continue;
      }

      // text
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.text(escape(this.smartypants(cap[0])));
        continue;
      }

      if (src) {
        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
      }
    }

    return out;
  };

  /**
   * Compile Link
   */

  InlineLexer.prototype.outputLink = function (cap, link) {
    var href = escape(link.href),
        title = link.title ? escape(link.title) : null;

    return cap[0].charAt(0) !== '!' ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape(cap[1]));
  };

  /**
   * Smartypants Transformations
   */

  InlineLexer.prototype.smartypants = function (text) {
    if (!this.options.smartypants) return text;
    return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201C')
    // closing doubles
    .replace(/"/g, '\u201D')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
  };

  /**
   * Mangle Links
   */

  InlineLexer.prototype.mangle = function (text) {
    if (!this.options.mangle) return text;
    var out = '',
        l = text.length,
        i = 0,
        ch;

    for (; i < l; i++) {
      ch = text.charCodeAt(i);
      if (Math.random() > 0.5) {
        ch = 'x' + ch.toString(16);
      }
      out += '&#' + ch + ';';
    }

    return out;
  };

  /**
   * Renderer
   */

  function Renderer(options) {
    this.options = options || {};
  }

  Renderer.prototype.code = function (code, lang, escaped) {
    if (this.options.highlight) {
      var out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    if (!lang) {
      return '<pre><code>' + (escaped ? code : escape(code, true)) + '\n</code></pre>';
    }

    return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + '\n</code></pre>\n';
  };

  Renderer.prototype.blockquote = function (quote) {
    return '<blockquote>\n' + quote + '</blockquote>\n';
  };

  Renderer.prototype.html = function (html) {
    return html;
  };

  Renderer.prototype.heading = function (text, level, raw) {
    return '<h' + level + ' id="' + this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-') + '">' + text + '</h' + level + '>\n';
  };

  Renderer.prototype.hr = function () {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
  };

  Renderer.prototype.list = function (body, ordered, start) {
    var type = ordered ? 'ol' : 'ul',
        startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
    return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
  };

  Renderer.prototype.listitem = function (text) {
    return '<li>' + text + '</li>\n';
  };

  Renderer.prototype.paragraph = function (text) {
    return '<p>' + text + '</p>\n';
  };

  Renderer.prototype.table = function (header, body) {
    return '<table>\n' + '<thead>\n' + header + '</thead>\n' + '<tbody>\n' + body + '</tbody>\n' + '</table>\n';
  };

  Renderer.prototype.tablerow = function (content) {
    return '<tr>\n' + content + '</tr>\n';
  };

  Renderer.prototype.tablecell = function (content, flags) {
    var type = flags.header ? 'th' : 'td';
    var tag = flags.align ? '<' + type + ' style="text-align:' + flags.align + '">' : '<' + type + '>';
    return tag + content + '</' + type + '>\n';
  };

  // span level renderer
  Renderer.prototype.strong = function (text) {
    return '<strong>' + text + '</strong>';
  };

  Renderer.prototype.em = function (text) {
    return '<em>' + text + '</em>';
  };

  Renderer.prototype.codespan = function (text) {
    return '<code>' + text + '</code>';
  };

  Renderer.prototype.br = function () {
    return this.options.xhtml ? '<br/>' : '<br>';
  };

  Renderer.prototype.del = function (text) {
    return '<del>' + text + '</del>';
  };

  Renderer.prototype.link = function (href, title, text) {
    if (this.options.sanitize) {
      try {
        var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, '').toLowerCase();
      } catch (e) {
        return text;
      }
      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
        return text;
      }
    }
    if (this.options.baseUrl && !originIndependentUrl.test(href)) {
      href = resolveUrl(this.options.baseUrl, href);
    }
    var out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  };

  Renderer.prototype.image = function (href, title, text) {
    if (this.options.baseUrl && !originIndependentUrl.test(href)) {
      href = resolveUrl(this.options.baseUrl, href);
    }
    var out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? '/>' : '>';
    return out;
  };

  Renderer.prototype.text = function (text) {
    return text;
  };

  /**
   * TextRenderer
   * returns only the textual part of the token
   */

  function TextRenderer() {}

  // no need for block level renderers

  TextRenderer.prototype.strong = TextRenderer.prototype.em = TextRenderer.prototype.codespan = TextRenderer.prototype.del = TextRenderer.prototype.text = function (text) {
    return text;
  };

  TextRenderer.prototype.link = TextRenderer.prototype.image = function (href, title, text) {
    return '' + text;
  };

  TextRenderer.prototype.br = function () {
    return '';
  };

  /**
   * Parsing & Compiling
   */

  function Parser(options) {
    this.tokens = [];
    this.token = null;
    this.options = options || marked.defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
  }

  /**
   * Static Parse Method
   */

  Parser.parse = function (src, options) {
    var parser = new Parser(options);
    return parser.parse(src);
  };

  /**
   * Parse Loop
   */

  Parser.prototype.parse = function (src) {
    this.inline = new InlineLexer(src.links, this.options);
    // use an InlineLexer with a TextRenderer to extract pure text
    this.inlineText = new InlineLexer(src.links, merge({}, this.options, { renderer: new TextRenderer() }));
    this.tokens = src.reverse();

    var out = '';
    while (this.next()) {
      out += this.tok();
    }

    return out;
  };

  /**
   * Next Token
   */

  Parser.prototype.next = function () {
    return this.token = this.tokens.pop();
  };

  /**
   * Preview Next Token
   */

  Parser.prototype.peek = function () {
    return this.tokens[this.tokens.length - 1] || 0;
  };

  /**
   * Parse Text Tokens
   */

  Parser.prototype.parseText = function () {
    var body = this.token.text;

    while (this.peek().type === 'text') {
      body += '\n' + this.next().text;
    }

    return this.inline.output(body);
  };

  /**
   * Parse Current Token
   */

  Parser.prototype.tok = function () {
    switch (this.token.type) {
      case 'space':
        {
          return '';
        }
      case 'hr':
        {
          return this.renderer.hr();
        }
      case 'heading':
        {
          return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, unescape(this.inlineText.output(this.token.text)));
        }
      case 'code':
        {
          return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
        }
      case 'table':
        {
          var header = '',
              body = '',
              i,
              row,
              cell,
              j;

          // header
          cell = '';
          for (i = 0; i < this.token.header.length; i++) {
            cell += this.renderer.tablecell(this.inline.output(this.token.header[i]), { header: true, align: this.token.align[i] });
          }
          header += this.renderer.tablerow(cell);

          for (i = 0; i < this.token.cells.length; i++) {
            row = this.token.cells[i];

            cell = '';
            for (j = 0; j < row.length; j++) {
              cell += this.renderer.tablecell(this.inline.output(row[j]), { header: false, align: this.token.align[j] });
            }

            body += this.renderer.tablerow(cell);
          }
          return this.renderer.table(header, body);
        }
      case 'blockquote_start':
        {
          body = '';

          while (this.next().type !== 'blockquote_end') {
            body += this.tok();
          }

          return this.renderer.blockquote(body);
        }
      case 'list_start':
        {
          body = '';
          var ordered = this.token.ordered,
              start = this.token.start;

          while (this.next().type !== 'list_end') {
            body += this.tok();
          }

          return this.renderer.list(body, ordered, start);
        }
      case 'list_item_start':
        {
          body = '';

          while (this.next().type !== 'list_item_end') {
            body += this.token.type === 'text' ? this.parseText() : this.tok();
          }

          return this.renderer.listitem(body);
        }
      case 'loose_item_start':
        {
          body = '';

          while (this.next().type !== 'list_item_end') {
            body += this.tok();
          }

          return this.renderer.listitem(body);
        }
      case 'html':
        {
          var html = !this.token.pre && !this.options.pedantic ? this.inline.output(this.token.text) : this.token.text;
          return this.renderer.html(html);
        }
      case 'paragraph':
        {
          return this.renderer.paragraph(this.inline.output(this.token.text));
        }
      case 'text':
        {
          return this.renderer.paragraph(this.parseText());
        }
    }
  };

  /**
   * Helpers
   */

  function escape(html, encode) {
    return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function unescape(html) {
    // explicitly match decimal, hex, and named HTML entities
    return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function (_, n) {
      n = n.toLowerCase();
      if (n === 'colon') return ':';
      if (n.charAt(0) === '#') {
        return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
      }
      return '';
    });
  }

  function edit(regex, opt) {
    regex = regex.source;
    opt = opt || '';
    return {
      replace: function replace(name, val) {
        val = val.source || val;
        val = val.replace(/(^|[^\[])\^/g, '$1');
        regex = regex.replace(name, val);
        return this;
      },
      getRegex: function getRegex() {
        return new RegExp(regex, opt);
      }
    };
  }

  function resolveUrl(base, href) {
    if (!baseUrls[' ' + base]) {
      // we can ignore everything in base after the last slash of its path component,
      // but we might need to add _that_
      // https://tools.ietf.org/html/rfc3986#section-3
      if (/^[^:]+:\/*[^/]*$/.test(base)) {
        baseUrls[' ' + base] = base + '/';
      } else {
        baseUrls[' ' + base] = base.replace(/[^/]*$/, '');
      }
    }
    base = baseUrls[' ' + base];

    if (href.slice(0, 2) === '//') {
      return base.replace(/:[\s\S]*/, ':') + href;
    } else if (href.charAt(0) === '/') {
      return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
    } else {
      return base + href;
    }
  }
  var baseUrls = {};
  var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

  function noop() {}
  noop.exec = noop;

  function merge(obj) {
    var i = 1,
        target,
        key;

    for (; i < arguments.length; i++) {
      target = arguments[i];
      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }

    return obj;
  }

  /**
   * Marked
   */

  function marked(src, opt, callback) {
    // throw error in case of non string input
    if (typeof src === 'undefined' || src === null) {
      throw new Error('marked(): input parameter is undefined or null');
    }
    if (typeof src !== 'string') {
      throw new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
    }

    if (callback || typeof opt === 'function') {
      if (!callback) {
        callback = opt;
        opt = null;
      }

      opt = merge({}, marked.defaults, opt || {});

      var highlight = opt.highlight,
          tokens,
          pending,
          i = 0;

      try {
        tokens = Lexer.lex(src, opt);
      } catch (e) {
        return callback(e);
      }

      pending = tokens.length;

      var done = function done(err) {
        if (err) {
          opt.highlight = highlight;
          return callback(err);
        }

        var out;

        try {
          out = Parser.parse(tokens, opt);
        } catch (e) {
          err = e;
        }

        opt.highlight = highlight;

        return err ? callback(err) : callback(null, out);
      };

      if (!highlight || highlight.length < 3) {
        return done();
      }

      delete opt.highlight;

      if (!pending) return done();

      for (; i < tokens.length; i++) {
        (function (token) {
          if (token.type !== 'code') {
            return --pending || done();
          }
          return highlight(token.text, token.lang, function (err, code) {
            if (err) return done(err);
            if (code == null || code === token.text) {
              return --pending || done();
            }
            token.text = code;
            token.escaped = true;
            --pending || done();
          });
        })(tokens[i]);
      }

      return;
    }
    try {
      if (opt) opt = merge({}, marked.defaults, opt);
      return Parser.parse(Lexer.lex(src, opt), opt);
    } catch (e) {
      e.message += '\nPlease report this to https://github.com/markedjs/marked.';
      if ((opt || marked.defaults).silent) {
        return '<p>An error occurred:</p><pre>' + escape(e.message + '', true) + '</pre>';
      }
      throw e;
    }
  }

  /**
   * Options
   */

  marked.options = marked.setOptions = function (opt) {
    merge(marked.defaults, opt);
    return marked;
  };

  marked.defaults = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    sanitizer: null,
    mangle: true,
    smartLists: false,
    silent: false,
    highlight: null,
    langPrefix: 'lang-',
    smartypants: false,
    headerPrefix: '',
    renderer: new Renderer(),
    xhtml: false,
    baseUrl: null
  };

  /**
   * Expose
   */

  marked.Parser = Parser;
  marked.parser = Parser.parse;

  marked.Renderer = Renderer;
  marked.TextRenderer = TextRenderer;

  marked.Lexer = Lexer;
  marked.lexer = Lexer.lex;

  marked.InlineLexer = InlineLexer;
  marked.inlineLexer = InlineLexer.output;

  marked.parse = marked;

  if (true) {
    module.exports = marked;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return marked;
    });
  } else {
    root.marked = marked;
  }
})(this || (typeof window !== 'undefined' ? window : global));

/***/ }),

/***/ "3xze":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "9qb7":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
})();

/***/ }),

/***/ "G3al":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/spectre.min.css
var spectre_min = __webpack_require__("+QGC");
var spectre_min_default = /*#__PURE__*/__webpack_require__.n(spectre_min);

// EXTERNAL MODULE: ./style/spectre-icons.min.css
var spectre_icons_min = __webpack_require__("sYpg");
var spectre_icons_min_default = /*#__PURE__*/__webpack_require__.n(spectre_icons_min);

// EXTERNAL MODULE: ./style/ungrid.min.css
var ungrid_min = __webpack_require__("3xze");
var ungrid_min_default = /*#__PURE__*/__webpack_require__.n(ungrid_min);

// EXTERNAL MODULE: ./style/flex-container.css
var flex_container = __webpack_require__("1afE");
var flex_container_default = /*#__PURE__*/__webpack_require__.n(flex_container);

// EXTERNAL MODULE: ./style/dialog.css
var dialog = __webpack_require__("Zoy9");
var dialog_default = /*#__PURE__*/__webpack_require__.n(dialog);

// EXTERNAL MODULE: ./style/spectre-override.css
var spectre_override = __webpack_require__("kAHu");
var spectre_override_default = /*#__PURE__*/__webpack_require__.n(spectre_override);

// EXTERNAL MODULE: ./style/avatar-rail.css
var avatar_rail = __webpack_require__("SDRd");
var avatar_rail_default = /*#__PURE__*/__webpack_require__.n(avatar_rail);

// CONCATENATED MODULE: ./api/index.js
// development
// const API_ENDPOINT = "http://localhost:8888/";

// production
var API_ENDPOINT = "https://erikdgustafson.com/api/";

/* harmony default export */ var api = (API_ENDPOINT);
// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// CONCATENATED MODULE: ./components/withAuth/index.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





// This is a HOC that handles login details.
//
// USAGE - attach to a page that requires being
// logged in to access, e.g.
//
//    UserProfileWithAuth = withAuth(UserProfile);
//
// If user is not logged in, they will be redirected
// to the login page.

var withAuth__ref = Object(preact_min["h"])('div', { 'class': 'centered loading loading-xl' });

var withAuth_withAuth = function withAuth(ComposedComponent) {
   return function (_Component) {
      _inherits(_class2, _Component);

      function _class2() {
         var _temp, _this, _ret;

         _classCallCheck(this, _class2);

         for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
         }

         return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            loading: true
         }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _class2.prototype.componentDidMount = function componentDidMount() {
         var _this2 = this;

         var loginToken = window.sessionStorage.getItem("loginToken");
         // if no token, route to login page
         if (!loginToken) {
            alert('You need to login to access this page.');
            Object(preact_router_es["route"])("/login");
            return;
         }

         // fetch user data if needed
         if (!this.props.user.email) {
            fetch(api + "!getUserData", {
               method: "POST",
               body: JSON.stringify({ loginToken: loginToken })
            }).then(function (res) {
               // if token has expired, route to login page
               if (!res.ok) {
                  alert('You need to login to access this page.');
                  Object(preact_router_es["route"])("/login");
                  return;
               } else {
                  _this2.setState(function (prevState) {
                     return { loading: !prevState.loading };
                  });
                  return res.json();
               }
            }).then(function (json) {
               _this2.props.setUserData(json.user);
            });
         } else {
            this.setState(function (prevState) {
               return { loading: !prevState.loading };
            });
         }
      };

      _class2.prototype.render = function render() {
         if (this.state.loading) {
            return withAuth__ref;
         } else {
            return Object(preact_min["h"])(ComposedComponent, { user: this.props.user, urlNm: this.props.urlNm });
         }
      };

      return _class2;
   }(preact_min["Component"]);
};

/* harmony default export */ var components_withAuth = (withAuth_withAuth);
// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// CONCATENATED MODULE: ./components/header/index.js




var header__ref = Object(preact_min["h"])(
   'section',
   { 'class': 'navbar-section' },
   Object(preact_min["h"])(
      match["Link"],
      { 'class': 'navbar-brand', activeClassName: 'active', href: '/' },
      Object(preact_min["h"])('img', { src: '../../assets/loves-wake.png', alt: 'Love\'s Wake' })
   )
);

var header__ref2 = Object(preact_min["h"])(
   'section',
   { 'class': 'navbar-section' },
   Object(preact_min["h"])(
      match["Link"],
      { 'class': 'btn btn-primary', activeClassName: 'active', href: '/create-shrine' },
      'Start a Shrine'
   ),
   Object(preact_min["h"])(
      match["Link"],
      { 'class': 'btn btn-link', activeClassName: 'active', href: '/login' },
      'Login'
   ),
   Object(preact_min["h"])(
      match["Link"],
      { 'class': 'btn btn-link', activeClassName: 'active', href: '/signup' },
      'Signup'
   )
);

var header_Header = function Header(props) {
   return Object(preact_min["h"])(
      'header',
      { 'class': 'navbar m-2' },
      header__ref,
      !props.isLoggedIn ? header__ref2 : Object(preact_min["h"])(
         'section',
         { 'class': 'navbar-section' },
         _ref3,
         Object(preact_min["h"])(header_UserName, { name: props.name || props.email }),
         Object(preact_min["h"])(header_AvatarDropdown, { name: props.name || props.email, notifications: props.notifications || [] })
      )
   );
};

var header_UserName = function UserName(props) {
   return Object(preact_min["h"])(
      'div',
      { 'class': 'h5 mx-2', style: 'white-space:nowrap;' },
      props.name
   );
};

var header__ref4 = Object(preact_min["h"])('i', { 'class': 'icon icon-caret' });

var header__ref5 = Object(preact_min["h"])(
   'ul',
   { 'class': 'menu' },
   Object(preact_min["h"])(
      'li',
      { 'class': 'menu-item' },
      Object(preact_min["h"])(
         match["Link"],
         { href: '/user' },
         'Your Profile'
      )
   ),
   Object(preact_min["h"])(
      'li',
      { 'class': 'menu-item' },
      'Notifications'
   ),
   Object(preact_min["h"])('li', { 'class': 'divider' }),
   Object(preact_min["h"])(
      'li',
      { 'class': 'menu-item' },
      'Settings'
   ),
   Object(preact_min["h"])(
      'li',
      { 'class': 'menu-item' },
      'More Settings'
   ),
   Object(preact_min["h"])('li', { 'class': 'divider' }),
   Object(preact_min["h"])(
      'li',
      { 'class': 'menu-item' },
      'Logout'
   )
);

var header_AvatarDropdown = function AvatarDropdown(props) {
   // let initials = props.name.split(' ')[0].charAt(0) + props.name.split(' ')[1].charAt(0);
   var initials = props.name.charAt(0);
   // number of notifications
   var notifications = props.notifications.length;
   return Object(preact_min["h"])(
      'div',
      { 'class': 'dropdown dropdown-right mx-2' },
      Object(preact_min["h"])(
         'a',
         { 'class': 'dropdown-toggle', tabindex: '0', style: 'cursor:pointer;white-space:nowrap;' },
         Object(preact_min["h"])('figure', {
            'class': 'avatar avatar-lg badge mx-1',
            'data-badge': notifications === 0 ? "" : notifications.toString(),
            'data-initial': initials
         }),
         header__ref4
      ),
      header__ref5
   );
};

var header__ref6 = Object(preact_min["h"])(
   'div',
   { 'class': 'dropdown mx-2' },
   Object(preact_min["h"])(
      'button',
      { 'class': 'dropdown-toggle btn btn-link', tabindex: '0' },
      Object(preact_min["h"])('i', { 'class': 'icon icon-plus' }),
      Object(preact_min["h"])('i', { 'class': 'icon icon-caret' })
   ),
   Object(preact_min["h"])(
      'ul',
      { 'class': 'menu' },
      Object(preact_min["h"])(
         'li',
         { 'class': 'menu-item' },
         Object(preact_min["h"])(
            'a',
            { href: '/create-shrine' },
            'Start a memorial'
         )
      ),
      Object(preact_min["h"])('li', { 'class': 'divider' }),
      Object(preact_min["h"])(
         'li',
         null,
         'Invite others'
      )
   )
),
    AddDropdown = function AddDropdown(props) {
   return header__ref6;
},
    _ref3 = Object(preact_min["h"])(AddDropdown, null);

/* harmony default export */ var header = (header_Header);
// CONCATENATED MODULE: ./routes/home/index.js


function home__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function home__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function home__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


// import style from './style';

var home__ref = Object(preact_min["h"])(
	"div",
	null,
	Object(preact_min["h"])(
		"h1",
		{ "class": "text-center" },
		"Love's Wake"
	),
	Object(preact_min["h"])("img", {
		"class": "img-responsive centered",
		src: "../../assets/loves-wake-logo.png",
		alt: "Love's Wake Logo"
	})
);

var Home = function (_Component) {
	home__inherits(Home, _Component);

	function Home() {
		home__classCallCheck(this, Home);

		return home__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Home.prototype.render = function render() {
		return home__ref;
	};

	return Home;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/FlexContainer/index.js


var FlexContainer__ref = Object(preact_min["h"])("div", { "class": "left-rail hide-sm" });

var FlexContainer__ref2 = Object(preact_min["h"])("div", { "class": "left-gutter hide-md" });

var FlexContainer__ref3 = Object(preact_min["h"])("div", { "class": "right-gutter hide-md" });

var FlexContainer_FlexContainer = function FlexContainer(props) {
   var width = window.innerWidth || document.documentElement.clientWidth || document.body.client.width;
   return Object(preact_min["h"])(
      "div",
      { "class": "flex-container" },
      FlexContainer__ref,
      FlexContainer__ref2,
      Object(preact_min["h"])(
         "div",
         { "class": width < 800 && !props.avatarRail ? "d-none" : "avatar-rail" },
         props.avatarRail
      ),
      Object(preact_min["h"])(
         "div",
         { "class": "form-rail" },
         props.formRail
      ),
      Object(preact_min["h"])(
         "div",
         { "class": "dialog-rail hide-md" },
         props.dialogRail
      ),
      FlexContainer__ref3
   );
};


// EXTERNAL MODULE: ../node_modules/validator/lib/isEmail.js
var isEmail = __webpack_require__("khkS");
var isEmail_default = /*#__PURE__*/__webpack_require__.n(isEmail);

// EXTERNAL MODULE: ../node_modules/classnames/index.js
var classnames = __webpack_require__("9qb7");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./components/dialog.js



var dialog_Dialog = function Dialog(props) {

   var diaClasses = classnames_default()('dialog', { 'd-none': !props.active });

   var iconClasses = classnames_default()('dialog-icon', 'circle', 'text-bold', 'float-right', 'mt-2');

   return Object(preact_min["h"])(
      'div',
      { 'class': 'relative mt-1' },
      Object(preact_min["h"])(
         'div',
         { 'class': diaClasses },
         props.children
      ),
      Object(preact_min["h"])(
         'div',
         { 'class': iconClasses },
         'i'
      )
   );
};


// CONCATENATED MODULE: ./routes/Login/login-form-inputs.js


function login_form_inputs__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function login_form_inputs__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function login_form_inputs__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var login_form_inputs__ref = Object(preact_min["h"])(
   'label',
   { 'class': 'form-label' },
   'Email'
);

var login_form_inputs_EmailInput = function EmailInput(props) {
   return Object(preact_min["h"])(
      'div',
      null,
      login_form_inputs__ref,
      Object(preact_min["h"])('input', {
         value: props.email,
         onChange: props.handleEmailChange,
         type: 'email',
         'class': 'form-input',
         placeholder: 'Your email'
      })
   );
};

var login_form_inputs__ref2 = Object(preact_min["h"])(
   'label',
   { 'class': 'form-label' },
   'Password'
);

var login_form_inputs__ref3 = Object(preact_min["h"])('i', { 'class': 'form-icon' });

var login_form_inputs_PasswordInput = function (_Component) {
   login_form_inputs__inherits(PasswordInput, _Component);

   function PasswordInput() {
      login_form_inputs__classCallCheck(this, PasswordInput);

      return login_form_inputs__possibleConstructorReturn(this, _Component.apply(this, arguments));
   }

   PasswordInput.prototype.render = function render(props) {
      return Object(preact_min["h"])(
         'div',
         null,
         login_form_inputs__ref2,
         Object(preact_min["h"])('input', {
            value: props.password,
            onChange: props.handlePasswordChange,
            'class': 'form-input',
            type: props.showPassword ? "text" : "password",
            placeholder: 'Your password'
         }),
         Object(preact_min["h"])(
            'label',
            { 'class': 'form-switch' },
            Object(preact_min["h"])('input', { type: 'checkbox',
               onClick: props.toggleShowPassword
            }),
            login_form_inputs__ref3,
            'Show password'
         )
      );
   };

   return PasswordInput;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/toast.js




var toast_Toast = function Toast(props) {
   var classes = classnames_default()('toast', {
      'toast-primary': props.primary,
      'toast-success': props.success,
      'toast-warning': props.warning,
      'toast-error': props.error,
      'd-none': !props.active
   });
   return Object(preact_min["h"])(
      'div',
      { 'class': classes },
      props.children
   );
};

/* harmony default export */ var toast = (toast_Toast);
// CONCATENATED MODULE: ./routes/Login/login-form.js


function login_form__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function login_form__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function login_form__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var login_form__ref = Object(preact_min["h"])(
   'h1',
   null,
   'Login'
);

var login_form_LoginForm = function (_Component) {
   login_form__inherits(LoginForm, _Component);

   function LoginForm() {
      login_form__classCallCheck(this, LoginForm);

      return login_form__possibleConstructorReturn(this, _Component.apply(this, arguments));
   }

   LoginForm.prototype.render = function render(props) {

      var formClasses = classnames_default()('form-group', { 'has-error': props.emailError || props.passwordError });

      var loginBtnClasses = classnames_default()('btn', 'btn-primary', { 'loading': props.loginBtnLoading });

      var recoverBtnClasses = classnames_default()('btn', 'btn-link', 'float-right', { 'loading': props.recoverBtnLoading });

      var emailHintClasses = classnames_default()('form-input-hint', { 'd-hide': !props.emailError });

      var passwordHintClasses = classnames_default()('form-input-hint', { 'd-hide': !props.passwordError });

      return Object(preact_min["h"])(
         'div',
         { 'class': formClasses },
         login_form__ref,
         Object(preact_min["h"])(
            toast,
            { error: true, active: props.showServerError },
            props.serverError
         ),
         Object(preact_min["h"])(login_form_inputs_EmailInput, {
            email: props.email,
            handleEmailChange: props.handleEmailChange
         }),
         Object(preact_min["h"])(
            'p',
            { 'class': emailHintClasses },
            'Please enter a valid email address'
         ),
         Object(preact_min["h"])(login_form_inputs_PasswordInput, {
            password: props.password,
            handlePasswordChange: props.handlePasswordChange,
            toggleShowPassword: props.toggleShowPassword,
            showPassword: props.showPassword
         }),
         Object(preact_min["h"])(
            'p',
            { 'class': passwordHintClasses },
            'Gotta have a password to login...'
         ),
         Object(preact_min["h"])(
            'div',
            { 'class': 'row' },
            Object(preact_min["h"])(
               'button',
               {
                  'class': loginBtnClasses,
                  onClick: props.handleLogin
               },
               'Login'
            ),
            Object(preact_min["h"])(
               'button',
               {
                  'class': recoverBtnClasses,
                  onClick: props.handleRecoverAccount
               },
               'Recover account'
            )
         )
      );
   };

   return LoginForm;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/Login/login-form-container.js


function login_form_container__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function login_form_container__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function login_form_container__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var login_form_container_LoginFormContainer = function (_Component) {
   login_form_container__inherits(LoginFormContainer, _Component);

   function LoginFormContainer(props) {
      login_form_container__classCallCheck(this, LoginFormContainer);

      // this._handleLogin = this._handleLogin.bind(this);
      var _this = login_form_container__possibleConstructorReturn(this, _Component.call(this, props));

      _this._handleLogin = function () {
         // if email is not valid
         if (!isEmail_default()(_this.state.email)) {
            // throw email error, don't submit
            _this.setState({ emailError: true });
            return;
         } else {
            _this.setState({ emailError: false });
         }

         // make sure there's a password
         if (!_this.state.password) {
            _this.setState({ passwordError: true });
            return;
         } else {
            _this.setState({ passwordError: false });
         }

         // loading spinner on button
         _this.setState({ loginBtnLoading: true });

         fetch(api + "!loginUser", {
            method: "POST",
            body: JSON.stringify({
               // on the server...
               //
               // (let [Json (json~decode *Post)
               //       Em   (getJson "em" Json)
               //       Pw   (getJson "pw" Json) ]
               //    ... )
               //
               em: _this.state.email,
               pw: _this.state.password
            })
         }).then(function (res) {
            return res.json();
         }).then(function (json) {
            if (json.error) {
               _this.setState({
                  // display errors and remove loading spinner
                  serverError: json.error,
                  showServerError: true,
                  loginBtnLoading: false
               });
            } else {
               // remove loading spinner
               _this.setState({ loginBtnLoading: false });
               // store login token in sessionStorage
               console.log('JWT: ', json.loginToken);
               window.sessionStorage.setItem("loginToken", json.loginToken);
               Object(preact_router_es["route"])("/user");
            }
         });

         // clear password
         _this.setState({ password: '' });
      };

      _this._handleRecoverAccount = function () {
         // loading spinner on button
         _this.setState({ recoverBtnLoading: true });

         fetch("https://erikdgustafson.com/api/!recoverUserAccount?" + _this.state.email).then(function (resp) {
            return resp.json();
         }).then(function (json) {
            if (json.error) {
               _this.setState({
                  // display errors and remove loading spinner
                  serverError: json.error,
                  showServerError: true,
                  recoverBtnLoading: false
               });
            } else if (json.email) {
               // remove loading spinner
               // set loginSuccess flag to true to trigger route change to 'Profile'
               // FIXME - the above feels like a hack. 
               // might be time to add a redux-style store?
               _this.setState({ recoverBtnLoading: false, recoverAccountSuccess: true });
               // send event up to set global app state with logged in user
               _this.props.handleRecoverAccountSuccess(json.email);
            }
         }).then(function () {
            if (_this.state.recoverAccountSuccess) {
               Object(preact_router_es["route"])('/recover-account', true);
            }
         });
      };

      _this._handleEmailChange = _this._handleEmailChange.bind(_this);
      _this._handlePasswordChange = _this._handlePasswordChange.bind(_this);
      _this._toggleShowPassword = _this._toggleShowPassword.bind(_this);
      _this.state = {
         email: '',
         emailError: false,
         password: '',
         passwordError: false,
         showPassword: false,
         serverError: '',
         showServerError: false,
         loginBtnLoading: false,
         recoverBtnLoading: false,
         loginSuccess: false,
         recoverAccountSuccess: false
      };
      return _this;
   }

   LoginFormContainer.prototype._toggleShowPassword = function _toggleShowPassword() {
      var showPassword = !this.state.showPassword;
      this.setState({ showPassword: showPassword });
   };

   LoginFormContainer.prototype._handleEmailChange = function _handleEmailChange(e) {
      this.setState({ email: e.target.value });
   };

   LoginFormContainer.prototype._handlePasswordChange = function _handlePasswordChange(e) {
      this.setState({ password: e.target.value });
   };

   LoginFormContainer.prototype.render = function render() {
      return Object(preact_min["h"])(login_form_LoginForm, {

         serverError: this.state.serverError,
         showServerError: this.state.showServerError,

         email: this.state.email,
         emailError: this.state.emailError,
         handleEmailChange: this._handleEmailChange,

         password: this.state.password,
         passwordError: this.state.passwordError,
         handlePasswordChange: this._handlePasswordChange,

         toggleShowPassword: this._toggleShowPassword,
         showPassword: this.state.showPassword,

         handleLogin: this._handleLogin,

         loginBtnLoading: this.state.loginBtnLoading,
         recoverBtnLoading: this.state.recoverBtnLoading,

         handleRecoverAccount: this._handleRecoverAccount

      });
   };

   return LoginFormContainer;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/Login/index.js


function Login__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Login__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Login__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var Login_Login = function (_Component) {
   Login__inherits(Login, _Component);

   function Login() {
      Login__classCallCheck(this, Login);

      return Login__possibleConstructorReturn(this, _Component.apply(this, arguments));
   }

   Login.prototype.render = function render(props) {
      return Object(preact_min["h"])(FlexContainer_FlexContainer, {
         formRail: Object(preact_min["h"])(login_form_container_LoginFormContainer, {
            handleLoginSuccess: function handleLoginSuccess(user, token) {
               return props.handleLoginSuccess(user, token);
            },
            handleRecoverAccountSuccess: function handleRecoverAccountSuccess(email) {
               return props.handleRecoverAccountSuccess(email);
            }
         })
      });
   };

   return Login;
}(preact_min["Component"]);

/* harmony default export */ var routes_Login = (Login_Login);
// CONCATENATED MODULE: ./routes/signup/signup-form-inputs.js


function signup_form_inputs__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function signup_form_inputs__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function signup_form_inputs__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var signup_form_inputs__ref = Object(preact_min["h"])(
   'label',
   { 'class': 'form-label' },
   'Email'
);

var signup_form_inputs_EmailInput = function EmailInput(props) {
   return Object(preact_min["h"])(
      'div',
      null,
      signup_form_inputs__ref,
      Object(preact_min["h"])('input', {
         value: props.email,
         onChange: props.handleEmailChange,
         type: 'email',
         'class': 'form-input',
         placeholder: 'Your email'
      })
   );
};

var signup_form_inputs__ref2 = Object(preact_min["h"])(
   'div',
   { 'class': 'card' },
   Object(preact_min["h"])(
      'div',
      { 'class': 'card-body' },
      'Make sure to use a strong password or phrase (i.e. more than 8 characters). You know the drill.'
   )
);

var signup_form_inputs__ref3 = Object(preact_min["h"])(
   'label',
   { 'class': 'form-label' },
   'Password'
);

var signup_form_inputs__ref4 = Object(preact_min["h"])('i', { 'class': 'form-icon' });

var signup_form_inputs_PasswordInput = function (_Component) {
   signup_form_inputs__inherits(PasswordInput, _Component);

   function PasswordInput(props) {
      signup_form_inputs__classCallCheck(this, PasswordInput);

      var _this = signup_form_inputs__possibleConstructorReturn(this, _Component.call(this, props));

      _this._toggleDialog = _this._toggleDialog.bind(_this);
      _this._showDialog = _this._showDialog.bind(_this);
      _this._hideDialog = _this._hideDialog.bind(_this);
      _this.state = {
         showDialog: false
      };
      return _this;
   }

   PasswordInput.prototype._toggleDialog = function _toggleDialog() {
      var showDialog = !this.state.showDialog;
      this.setState({ showDialog: showDialog });
   };

   PasswordInput.prototype._showDialog = function _showDialog() {
      this.setState({ showDialog: true });
   };

   PasswordInput.prototype._hideDialog = function _hideDialog() {
      this.setState({ showDialog: showDialog });
   };

   PasswordInput.prototype.render = function render(props) {
      return Object(preact_min["h"])(
         'div',
         null,
         Object(preact_min["h"])(
            dialog_Dialog,
            { active: this.state.showDialog },
            signup_form_inputs__ref2
         ),
         signup_form_inputs__ref3,
         Object(preact_min["h"])('input', {
            value: props.password,
            onChange: props.handlePasswordChange,
            onFocus: this._showDialog,
            'class': 'form-input',
            type: props.showPassword ? "text" : "password",
            placeholder: 'Your password'
         }),
         Object(preact_min["h"])(
            'label',
            { 'class': 'form-switch' },
            Object(preact_min["h"])('input', { type: 'checkbox',
               onClick: props.toggleShowPassword
            }),
            signup_form_inputs__ref4,
            'Show password'
         )
      );
   };

   return PasswordInput;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/signup/signup-form.js


function signup_form__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function signup_form__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function signup_form__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var signup_form__ref = Object(preact_min["h"])(
   'h1',
   null,
   'Signup'
);

var signup_form_SignupForm = function (_Component) {
   signup_form__inherits(SignupForm, _Component);

   function SignupForm() {
      signup_form__classCallCheck(this, SignupForm);

      return signup_form__possibleConstructorReturn(this, _Component.apply(this, arguments));
   }

   SignupForm.prototype.render = function render(props) {
      var formClasses = classnames_default()('form-group', { 'has-error': props.emailError || props.passwordError });

      var btnClasses = classnames_default()('btn', 'btn-primary', { 'loading': props.loading });

      var emailHintClasses = classnames_default()('form-input-hint', { 'd-hide': !props.emailError });

      var passwordHintClasses = classnames_default()('form-input-hint', { 'd-hide': !props.passwordError });

      return Object(preact_min["h"])(
         'div',
         { 'class': formClasses },
         signup_form__ref,
         Object(preact_min["h"])(
            toast,
            { error: true, active: props.showServerError },
            props.serverError
         ),
         Object(preact_min["h"])(signup_form_inputs_EmailInput, {
            email: props.email,
            handleEmailChange: props.handleEmailChange
         }),
         Object(preact_min["h"])(
            'p',
            { 'class': emailHintClasses },
            'Please enter a valid email address'
         ),
         Object(preact_min["h"])(signup_form_inputs_PasswordInput, {
            password: props.password,
            handlePasswordChange: props.handlePasswordChange,
            toggleShowPassword: props.toggleShowPassword,
            showPassword: props.showPassword
         }),
         Object(preact_min["h"])(
            'p',
            { 'class': passwordHintClasses },
            'Every account needs a password...'
         ),
         Object(preact_min["h"])(
            'button',
            {
               'class': btnClasses,
               onClick: props.handleSignup
            },
            'Create account'
         )
      );
   };

   return SignupForm;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/signup/signup-form-container.js


function signup_form_container__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function signup_form_container__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function signup_form_container__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var signup_form_container_SignupFormContainer = function (_Component) {
   signup_form_container__inherits(SignupFormContainer, _Component);

   function SignupFormContainer(props) {
      signup_form_container__classCallCheck(this, SignupFormContainer);

      var _this = signup_form_container__possibleConstructorReturn(this, _Component.call(this, props));

      _this._handleSignup = _this._handleSignup.bind(_this);
      _this._handleEmailChange = _this._handleEmailChange.bind(_this);
      _this._handlePasswordChange = _this._handlePasswordChange.bind(_this);
      _this._toggleShowPassword = _this._toggleShowPassword.bind(_this);
      _this.state = {
         email: '',
         emailError: false,
         password: '',
         passwordError: false,
         showPassword: false,
         serverError: '',
         showServerError: false,
         loading: false,
         signupSuccess: false
      };
      return _this;
   }

   SignupFormContainer.prototype._toggleShowPassword = function _toggleShowPassword() {
      var showPassword = !this.state.showPassword;
      this.setState({ showPassword: showPassword });
   };

   SignupFormContainer.prototype._handleSignup = function _handleSignup() {
      var _this2 = this;

      // if not valid email address
      if (!isEmail_default()(this.state.email)) {
         // throw email error, don't submit
         this.setState({ emailError: true });
         return;
      } else {
         this.setState({ emailError: false });
      }

      // make sure there's a password
      if (!this.state.password) {
         this.setState({ passwordError: true });
         return;
      } else {
         this.setState({ passwordError: false });
      }

      this.setState({ loading: true });

      fetch("https://erikdgustafson.com/api/!newUser?" + this.state.email + "&" + this.state.password, { method: "POST" }).then(function (resp) {
         return resp.json();
      }).then(function (json) {
         if (json.error) {
            _this2.setState({
               // display errors and remove loading spinner
               serverError: json.error,
               showServerError: true,
               loading: false
            });
         } else if (json.email) {
            _this2.setState({ loading: false, signupSuccess: true });
            _this2.props.handleSignupSuccess(json.email);
         }
      }).then(function () {
         if (_this2.state.signupSuccess) {
            Object(preact_router_es["route"])('/confirm-account', true);
         }
      });
   };

   SignupFormContainer.prototype._handleEmailChange = function _handleEmailChange(e) {
      this.setState({ email: e.target.value });
   };

   SignupFormContainer.prototype._handlePasswordChange = function _handlePasswordChange(e) {
      this.setState({ password: e.target.value });
   };

   SignupFormContainer.prototype.componentWillUnmount = function componentWillUnmount() {
      this.setState({ email: '', password: '' });
   };

   SignupFormContainer.prototype.render = function render() {
      return Object(preact_min["h"])(signup_form_SignupForm, {

         serverError: this.state.serverError,
         showServerError: this.state.showServerError,

         email: this.state.email,
         emailError: this.state.emailError,
         handleEmailChange: this._handleEmailChange,

         password: this.state.password,
         passwordError: this.state.passwordError,
         handlePasswordChange: this._handlePasswordChange,

         toggleShowPassword: this._toggleShowPassword,
         showPassword: this.state.showPassword,

         handleSignup: this._handleSignup,

         loading: this.state.loading

      });
   };

   return SignupFormContainer;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/signup/index.js


function signup__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function signup__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function signup__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var signup_Signup = function (_Component) {
   signup__inherits(Signup, _Component);

   function Signup() {
      signup__classCallCheck(this, Signup);

      return signup__possibleConstructorReturn(this, _Component.apply(this, arguments));
   }

   Signup.prototype.render = function render(props) {
      return Object(preact_min["h"])(FlexContainer_FlexContainer, {
         formRail: Object(preact_min["h"])(signup_form_container_SignupFormContainer, {
            handleSignupSuccess: function handleSignupSuccess(email) {
               return props.handleSignupSuccess(email);
            }
         })
      });
   };

   return Signup;
}(preact_min["Component"]);

/* harmony default export */ var signup = (signup_Signup);
// CONCATENATED MODULE: ./components/form-inputs/index.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function form_inputs__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function form_inputs__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function form_inputs__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



var form_inputs__ref2 = Object(preact_min["h"])("i", { "class": "form-icon" });

var form_inputs_Radio = function Radio(_ref) {
   var label = _ref.label,
       name = _ref.name,
       props = _objectWithoutProperties(_ref, ["label", "name"]);

   return Object(preact_min["h"])(
      "label",
      { "class": "form-radio" },
      Object(preact_min["h"])("input", _extends({}, props, {
         name: name,
         type: "radio"
      })),
      form_inputs__ref2,
      label
   );
};

var form_inputs_Label = function Label(props) {
   return Object(preact_min["h"])(
      "label",
      { "class": "form-label" },
      props.children
   );
};

var form_inputs__ref3 = Object(preact_min["h"])(
   "label",
   { "class": "form-label" },
   "Email"
);

var form_inputs_EmailInput = function EmailInput(props) {
   return Object(preact_min["h"])(
      "div",
      null,
      form_inputs__ref3,
      Object(preact_min["h"])("input", _extends({}, props, {
         type: "email",
         "class": "form-input",
         placeholder: "Your email"
      }))
   );
};

var form_inputs_TextInput = function TextInput(_ref4) {
   var label = _ref4.label,
       props = _objectWithoutProperties(_ref4, ["label"]);

   return Object(preact_min["h"])(
      "div",
      null,
      Object(preact_min["h"])(
         "label",
         { "class": "form-label" },
         label
      ),
      Object(preact_min["h"])("input", _extends({}, props, {
         type: "text",
         "class": "form-input"
      }))
   );
};

var form_inputs_TextArea = function TextArea(_ref5) {
   var label = _ref5.label,
       props = _objectWithoutProperties(_ref5, ["label"]);

   return Object(preact_min["h"])(
      "div",
      null,
      Object(preact_min["h"])(
         "label",
         { "class": "form-label" },
         label
      ),
      Object(preact_min["h"])("textarea", _extends({
         "class": "form-input"
      }, props))
   );
};

var form_inputs_DateInput = function DateInput(_ref6) {
   var label = _ref6.label,
       props = _objectWithoutProperties(_ref6, ["label"]);

   return Object(preact_min["h"])(
      "div",
      null,
      Object(preact_min["h"])(
         "label",
         { "class": "form-label" },
         label
      ),
      Object(preact_min["h"])("input", _extends({}, props, {
         type: "date",
         "class": "form-input"
      }))
   );
};

var form_inputs_FileInput = function FileInput(_ref7) {
   var label = _ref7.label,
       props = _objectWithoutProperties(_ref7, ["label"]);

   return Object(preact_min["h"])(
      "div",
      null,
      Object(preact_min["h"])(
         "label",
         { "class": "form-label" },
         label
      ),
      Object(preact_min["h"])("input", _extends({}, props, {
         type: "file",
         "class": "form-input " + props.class
      }))
   );
};

var form_inputs_NumberInput = function NumberInput(props) {
   return Object(preact_min["h"])("input", _extends({
      type: "number",
      "class": "form-input"
   }, props));
};

var form_inputs_PasswordInput = function (_Component) {
   form_inputs__inherits(PasswordInput, _Component);

   function PasswordInput(props) {
      form_inputs__classCallCheck(this, PasswordInput);

      var _this = form_inputs__possibleConstructorReturn(this, _Component.call(this, props));

      _this._toggleShowPassword = _this._toggleShowPassword.bind(_this);
      _this.state = {
         showPassword: false
      };
      return _this;
   }

   PasswordInput.prototype._toggleShowPassword = function _toggleShowPassword() {
      var showPassword = !this.state.showPassword;
      this.setState({ showPassword: showPassword });
   };

   PasswordInput.prototype.render = function render(props) {
      var label = props.label ? props.label : 'Password';
      return Object(preact_min["h"])(
         "div",
         null,
         Object(preact_min["h"])(
            "label",
            { "class": "form-label" },
            label
         ),
         Object(preact_min["h"])("input", _extends({}, props, {
            "class": "form-input",
            type: this.state.showPassword ? "text" : "password",
            placeholder: "Your password"
         })),
         Object(preact_min["h"])(form_inputs_ShowPasswordSwitch, { onClick: this._toggleShowPassword })
      );
   };

   return PasswordInput;
}(preact_min["Component"]);

var _ref8 = Object(preact_min["h"])("i", { "class": "form-icon" });

var form_inputs_ShowPasswordSwitch = function ShowPasswordSwitch(props) {
   return Object(preact_min["h"])(
      "div",
      null,
      Object(preact_min["h"])(
         "label",
         { "class": "form-switch" },
         Object(preact_min["h"])("input", _extends({ type: "checkbox"
         }, props)),
         _ref8,
         "Show password"
      )
   );
};


// CONCATENATED MODULE: ./routes/user/ConfirmAccountModal.js


function ConfirmAccountModal__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ConfirmAccountModal__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function ConfirmAccountModal__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var ConfirmAccountModal__ref = Object(preact_min["h"])(
   'div',
   { 'class': 'modal-title h5' },
   'Confirm Account'
);

var ConfirmAccountModal__ref2 = Object(preact_min["h"])(
   'p',
   null,
   'We sent you an email with a 6-digit code. Please enter the code below to confirm your account.'
);

var ConfirmAccountModal_ConfirmAccountModal = function (_Component) {
   ConfirmAccountModal__inherits(ConfirmAccountModal, _Component);

   function ConfirmAccountModal() {
      var _temp, _this, _ret;

      ConfirmAccountModal__classCallCheck(this, ConfirmAccountModal);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
         args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = ConfirmAccountModal__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
         // 6-digit confirmation code
         code: ""
      }, _this.onChange = function (e) {
         var _this$setState;

         _this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState));
      }, _this.codeHasError = function () {
         if (_this.state.code && (isNaN(_this.state.code) || !(_this.state.code.length === 6))) {
            return true;
         }
      }, _temp), ConfirmAccountModal__possibleConstructorReturn(_this, _ret);
   }

   // returns true if code exists and is not a number or is not 6 digits


   ConfirmAccountModal.prototype.render = function render(props) {
      var modalClasses = classnames_default()("modal", "modal-sm", { "active": props.showModal }, { "has-error": this.codeHasError() });

      var errorHint = classnames_default()("form-input-hint", "float-left"
      // { "d-hide": !this.codeHasError() }
      );

      return Object(preact_min["h"])(
         'div',
         { 'class': modalClasses },
         Object(preact_min["h"])('a', { onClick: props.hideModal,
            'class': 'modal-overlay',
            'aria-label': 'Close'
         }),
         Object(preact_min["h"])(
            'div',
            { 'class': 'modal-container' },
            Object(preact_min["h"])(
               'div',
               { 'class': 'modal-header' },
               Object(preact_min["h"])('a', { onClick: props.hideModal,
                  'class': 'btn btn-clear float-right',
                  'aria-label': 'Close'
               }),
               ConfirmAccountModal__ref
            ),
            Object(preact_min["h"])(
               'div',
               { 'class': 'modal-body' },
               Object(preact_min["h"])(
                  'div',
                  { 'class': 'content' },
                  ConfirmAccountModal__ref2,
                  Object(preact_min["h"])(
                     'form',
                     { 'class': 'form-group' },
                     Object(preact_min["h"])(
                        'p',
                        { 'class': errorHint },
                        'Enter a 6-digit number'
                     ),
                     Object(preact_min["h"])(form_inputs_TextInput, {
                        onChange: this.onChange,
                        name: 'code',
                        value: this.state.code,
                        placeholder: 'e.g. 123456'
                     })
                  )
               )
            ),
            Object(preact_min["h"])(
               'div',
               { 'class': 'modal-footer' },
               Object(preact_min["h"])(
                  'button',
                  {
                     'class': 'btn btn-primary',
                     onClick: props.confirmAccount
                  },
                  'Confirm'
               )
            )
         )
      );
   };

   return ConfirmAccountModal;
}(preact_min["Component"]);

/* harmony default export */ var user_ConfirmAccountModal = (ConfirmAccountModal_ConfirmAccountModal);
// CONCATENATED MODULE: ./routes/user/MemorialList.js




var MemorialList__ref = Object(preact_min["h"])(
   'h3',
   null,
   'Memorials'
);

var MemorialList_MemorialList = function MemorialList(props) {
   return Object(preact_min["h"])(
      'div',
      null,
      MemorialList__ref,
      props.memorials.map(function (m) {
         return Object(preact_min["h"])(MemorialList_MemorialTile, {
            urlNm: m.urlNm,
            urlStr: m.urlStr,
            nm: m.nm,
            born: m.born,
            died: m.died,
            avatar: m.avatar
         });
      })
   );
};

var MemorialList_MemorialTile = function MemorialTile(props) {
   return Object(preact_min["h"])(
      'div',
      { 'class': 'tile', style: 'max-width: 500px;' },
      Object(preact_min["h"])(
         'div',
         { 'class': 'tile-icon' },
         Object(preact_min["h"])(
            'figure',
            { 'class': 'avatar avatar-lg' },
            Object(preact_min["h"])('img', { src: props.avatar })
         )
      ),
      Object(preact_min["h"])(
         'div',
         { 'class': 'tile-content' },
         Object(preact_min["h"])(
            'p',
            { 'class': 'tile-title' },
            props.nm
         ),
         Object(preact_min["h"])(
            'p',
            { 'class': 'tile-subtitle text-gray' },
            props.born,
            ' - ',
            props.died
         )
      ),
      Object(preact_min["h"])(
         'div',
         { 'class': 'tile-action' },
         Object(preact_min["h"])(
            'button',
            {
               'class': 'btn',
               onClick: function onClick() {
                  return Object(preact_router_es["route"])("/user/manage-memorial/" + props.urlNm);
               }
            },
            'Manage content'
         ),
         Object(preact_min["h"])(
            'button',
            {
               'class': 'btn',
               onClick: function onClick() {
                  return Object(preact_router_es["route"])("/" + props.urlStr + "/" + props.urlNm + "/chronicle");
               }
            },
            'View Chronicle'
         )
      )
   );
};

/* harmony default export */ var user_MemorialList = (MemorialList_MemorialList);
// CONCATENATED MODULE: ./routes/user/index.js


function user__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function user__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function user__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



// import style from './style';





var user_User = function (_Component) {
   user__inherits(User, _Component);

   function User() {
      var _temp, _this, _ret;

      user__classCallCheck(this, User);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
         args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = user__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
         showModal: true
      }, _this.hideModal = function () {
         _this.setState({ showModal: false });
      }, _this.neverShowConfirmationToastAgain = function () {
         console.log("We'll never show the confirmation toast again");
         // this.setState({ ... });
      }, _temp), user__possibleConstructorReturn(_this, _ret);
   }

   User.prototype.render = function render() {
      return Object(preact_min["h"])(
         'div',
         null,
         Object(preact_min["h"])(
            'h1',
            null,
            'User Profile: ',
            this.props.user.name || this.props.user.email
         ),
         !this.props.user.confirmed && Object(preact_min["h"])(user_ConfirmAccountModal, {
            showModal: this.state.showModal,
            hideModal: this.hideModal
         }),
         this.props.user.memorials[0] ? Object(preact_min["h"])(user_MemorialList, { memorials: this.props.user.memorials }) : Object(preact_min["h"])(
            'button',
            {
               'class': 'btn btn-primary',
               onClick: function onClick() {
                  return Object(preact_router_es["route"])("/create-shrine");
               }
            },
            'Start a memorial'
         )
      );
   };

   return User;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/create-shrine/next-step-button/index.js

var next_step_button_NextStepButton = function NextStepButton(props) {
   return Object(preact_min["h"])(
      "button",
      {
         "class": "btn btn-primary float-right",
         onClick: props.onClick
      },
      "Next Step"
   );
};


// CONCATENATED MODULE: ./routes/create-shrine/create-shrine-form-step1/index.js


function create_shrine_form_step1__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function create_shrine_form_step1__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function create_shrine_form_step1__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var create_shrine_form_step1_CreateShrineFormStep1 = function (_Component) {
   create_shrine_form_step1__inherits(CreateShrineFormStep1, _Component);

   function CreateShrineFormStep1() {
      var _temp, _this, _ret;

      create_shrine_form_step1__classCallCheck(this, CreateShrineFormStep1);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
         args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = create_shrine_form_step1__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
         firstNameError: false
      }, _this._handleNextStep = function () {
         if (!(_this.props.firstName === '')) {
            _this.setState({ firstNameError: false });
         } else {
            _this.setState({ firstNameError: true });
         }

         if (_this.state.firstNameError) {
            return;
         }

         _this.props.handleNextStep();
      }, _temp), create_shrine_form_step1__possibleConstructorReturn(_this, _ret);
   }

   CreateShrineFormStep1.prototype.render = function render(props, state) {

      var formClasses = classnames_default()('form-group', { 'has-error': this.state.firstNameError || this.state.lastNameError });

      var firstNameHintClasses = classnames_default()('form-input-hint', { 'd-hide': !this.state.firstNameError });

      return Object(preact_min["h"])(
         'div',
         { 'class': formClasses },
         Object(preact_min["h"])(form_inputs_TextInput, {
            label: 'First name',
            firstName: props.firstName,
            name: 'firstName',
            value: props.firstName,
            onChange: props.onChange
         }),
         Object(preact_min["h"])(
            'p',
            { 'class': firstNameHintClasses },
            'Please enter a first name'
         ),
         Object(preact_min["h"])(form_inputs_TextInput, {
            label: 'Middle name(s) or initial',
            name: 'middleName',
            value: props.middleName,
            onChange: props.onChange
         }),
         Object(preact_min["h"])(form_inputs_TextInput, {
            label: 'Last name',
            lastName: props.lastName,
            name: 'lastName',
            value: props.lastName,
            onChange: props.onChange
         }),
         Object(preact_min["h"])(
            'div',
            { 'class': 'row my-2' },
            Object(preact_min["h"])(next_step_button_NextStepButton, {
               onClick: this._handleNextStep
            })
         )
      );
   };

   return CreateShrineFormStep1;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/create-shrine/prev-step-button.js



var prev_step_button_PrevStepButton = function PrevStepButton(props) {
   return Object(preact_min["h"])(
      "button",
      {
         "class": "btn btn-link",
         onClick: props.onClick
      },
      "prev"
   );
};


// CONCATENATED MODULE: ./routes/create-shrine/create-shrine-form-step2/index.js







var create_shrine_form_step2_CreateShrineFormStep2 = function CreateShrineFormStep2(props) {
   return Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(form_inputs_FileInput, {
         'class': 'text-ellipsis',
         label: 'Upload a Photo',
         onChange: props.onFileChange
      }),
      Object(preact_min["h"])(
         'div',
         { 'class': 'row my-2' },
         Object(preact_min["h"])(prev_step_button_PrevStepButton, {
            onClick: props.handlePrevStep
         }),
         Object(preact_min["h"])(next_step_button_NextStepButton, {
            onClick: props.handleNextStep
         })
      )
   );
};


// CONCATENATED MODULE: ./routes/create-shrine/create-shrine-form-step3/choose-gender.js






var choose_gender__ref = Object(preact_min["h"])(
   'strong',
   null,
   'We\'ll use this answer for the email template in the next section.'
);

var choose_gender__ref2 = Object(preact_min["h"])(
   'p',
   null,
   'How did... '
);

var choose_gender__ref3 = Object(preact_min["h"])(
   form_inputs_Label,
   null,
   'Gender & Pronoun'
);

var choose_gender__ref4 = Object(preact_min["h"])(
   'div',
   { 'class': 'row' },
   Object(preact_min["h"])(form_inputs_Radio, {
      label: 'Female',
      value: 'Female',
      name: 'gender'
   }),
   Object(preact_min["h"])(
      'span',
      { 'class': 'text-gray' },
      '- She/Her'
   )
);

var choose_gender__ref5 = Object(preact_min["h"])(
   'div',
   { 'class': 'row' },
   Object(preact_min["h"])(form_inputs_Radio, {
      label: 'Male',
      value: 'Male',
      name: 'gender'
   }),
   Object(preact_min["h"])(
      'span',
      { 'class': 'text-gray' },
      '- He/Him'
   )
);

var choose_gender_ChooseGender = function ChooseGender(props) {
   return Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(
         dialog_Dialog,
         { active: 'true' },
         Object(preact_min["h"])(
            'div',
            { 'class': 'card' },
            Object(preact_min["h"])(
               'div',
               { 'class': 'card-body' },
               choose_gender__ref,
               Object(preact_min["h"])(
                  'div',
                  null,
                  Object(preact_min["h"])(
                     'p',
                     null,
                     'Think about ',
                     props.firstName,
                     '.'
                  ),
                  props.subjPronoun ? Object(preact_min["h"])(
                     'p',
                     null,
                     'How did ',
                     props.subjPronoun,
                     '... What was ',
                     props.posPronoun,
                     ' favorite...'
                  ) : choose_gender__ref2
               )
            )
         )
      ),
      choose_gender__ref3,
      Object(preact_min["h"])(
         'div',
         { onChange: props.handleGenderChange, 'class': 'col mx-2' },
         choose_gender__ref4,
         choose_gender__ref5
      )
   );
};


// CONCATENATED MODULE: ./routes/create-shrine/create-shrine-form-step3/date-of-birth.js





var date_of_birth_DateOfBirth = function DateOfBirth(props) {
   return Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(form_inputs_DateInput, {
         label: 'Date of Birth',
         name: 'born',
         value: props.born,
         onChange: props.onChange

      })
   );
};


// CONCATENATED MODULE: ./routes/create-shrine/create-shrine-form-step3/still-with-us.js






var still_with_us__ref = Object(preact_min["h"])(
   'div',
   { 'class': 'row' },
   Object(preact_min["h"])(form_inputs_Radio, {
      label: 'Still alive and well',
      name: 'deceased',
      value: 'false'
   })
);

var still_with_us__ref2 = Object(preact_min["h"])(
   'div',
   { 'class': 'row' },
   Object(preact_min["h"])(form_inputs_Radio, {
      label: 'Will pass soon',
      name: 'deceased',
      value: 'false'
   })
);

var still_with_us__ref3 = Object(preact_min["h"])(
   'div',
   { 'class': 'row' },
   Object(preact_min["h"])(form_inputs_Radio, {
      label: 'Passed away',
      name: 'deceased',
      value: 'true'
   })
);

var still_with_us_StillWithUs = function StillWithUs(props) {
   return Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(
         form_inputs_Label,
         null,
         'Is ',
         props.firstName,
         ' still with us?'
      ),
      Object(preact_min["h"])(
         'div',
         { onChange: props.handleDeath, 'class': 'col mx-2' },
         still_with_us__ref,
         still_with_us__ref2,
         still_with_us__ref3
      )
   );
};


// CONCATENATED MODULE: ./routes/create-shrine/create-shrine-form-step3/date-of-death.js






var date_of_death_DateOfDeath = function DateOfDeath(props) {

   var classes = classnames_default()({ 'd-none': !props.deceased });

   return Object(preact_min["h"])(
      'div',
      { 'class': classes },
      Object(preact_min["h"])(form_inputs_DateInput, {
         label: 'Date of Death',
         name: 'died',
         value: props.died,
         onChange: props.onChange
      })
   );
};


// CONCATENATED MODULE: ./routes/create-shrine/create-shrine-form-step3/index.js













var create_shrine_form_step3_CreateShrineFormStep3 = function CreateShrineFormStep3(props) {
   var createBtnClasses = classnames_default()("btn", "btn-primary", "float-right", { loading: props.loading });
   return Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(date_of_birth_DateOfBirth, {
         firstName: props.firstName,
         onChange: props.onChange,
         born: props.born
      }),
      Object(preact_min["h"])(still_with_us_StillWithUs, {
         firstName: props.firstName,
         handleDeath: props.handleDeath
      }),
      Object(preact_min["h"])(date_of_death_DateOfDeath, {
         deceased: props.deceased,
         firstName: props.firstName,
         onChange: props.onChange,
         died: props.died
      }),
      Object(preact_min["h"])(
         'div',
         { 'class': 'row my-2' },
         Object(preact_min["h"])(prev_step_button_PrevStepButton, {
            onClick: props.handlePrevStep
         }),
         Object(preact_min["h"])(
            'button',
            { 'class': createBtnClasses,
               onClick: props.newMemorial
            },
            'Create Memorial'
         )
      )
   );
};


// CONCATENATED MODULE: ./routes/create-shrine/create-shrine-form-step4/index.js







var create_shrine_form_step4_CreateShrineFormStep4 = function CreateShrineFormStep4(props) {
   return Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(
         'div',
         { 'class': 'row my-2' },
         Object(preact_min["h"])(prev_step_button_PrevStepButton, {
            onClick: props.handlePrevStep
         }),
         Object(preact_min["h"])(next_step_button_NextStepButton, {
            onClick: props.handleNextStep
         })
      )
   );
};


// CONCATENATED MODULE: ./routes/create-shrine/create-shrine-form-step5/index.js







var create_shrine_form_step5_CreateShrineFormStep5 = function CreateShrineFormStep5(props) {
   return Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(
         'div',
         { 'class': 'row my-2' },
         Object(preact_min["h"])(prev_step_button_PrevStepButton, {
            onClick: props.handlePrevStep
         }),
         Object(preact_min["h"])(next_step_button_NextStepButton, {
            onClick: props.handleNextStep
         })
      )
   );
};


// CONCATENATED MODULE: ./routes/create-shrine/create-shrine-form-step6/index.js


function create_shrine_form_step6__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function create_shrine_form_step6__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function create_shrine_form_step6__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var create_shrine_form_step6__ref = Object(preact_min["h"])(
   'label',
   { 'class': 'form-label' },
   'Enter email addresses'
);

var create_shrine_form_step6_CreateShrineFormStep6 = function (_Component) {
   create_shrine_form_step6__inherits(CreateShrineFormStep6, _Component);

   function CreateShrineFormStep6() {
      var _temp, _this, _ret;

      create_shrine_form_step6__classCallCheck(this, CreateShrineFormStep6);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
         args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = create_shrine_form_step6__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
         email: '',
         emails: [],
         emailError: false
      }, _this._handleEmailChange = function (e) {
         _this.setState({ email: e.target.value });
      }, _this._addEmail = function () {
         // if not valid email address
         if (!isEmail_default()(_this.state.email)) {
            // throw email error, don't submit
            _this.setState({ emailError: true });
            return;
         } else {
            _this.setState({ emailError: false });
         }

         _this.setState({
            emails: [].concat(_this.state.emails, [_this.state.email]),
            email: ''
         });
      }, _this._removeEmail = function (e) {
         // save all emails except the one we want to get rid of...
         // NOTE - originally intended to use e.target.value, but that isn't
         // a thing when clicking on <a> tags. went with e.target.name as
         // that was something I could set when the element is created.
         // see line 67 below.
         var emails = _this.state.emails.filter(function (email) {
            return email !== e.target.name;
         });
         // and set the state to that.
         _this.setState({ emails: emails });
      }, _temp), create_shrine_form_step6__possibleConstructorReturn(_this, _ret);
   }

   CreateShrineFormStep6.prototype.render = function render(props, state) {
      var _this2 = this;

      var formClasses = classnames_default()('form-group', { 'has-error': this.state.emailError });

      var emailHintClasses = classnames_default()('form-input-hint', { 'd-hide': !this.state.emailError });

      return Object(preact_min["h"])(
         'div',
         null,
         Object(preact_min["h"])(
            'div',
            { 'class': formClasses },
            create_shrine_form_step6__ref,
            Object(preact_min["h"])(
               'div',
               { 'class': 'input-group' },
               Object(preact_min["h"])('input', {
                  type: 'email',
                  'class': 'form-input',
                  value: this.state.email,
                  onChange: this._handleEmailChange
               }),
               Object(preact_min["h"])(
                  'button',
                  {
                     'class': 'btn btn-primary input-group-btn',
                     onClick: this._addEmail
                  },
                  'Add'
               )
            ),
            Object(preact_min["h"])(
               'p',
               { 'class': emailHintClasses },
               'Please enter a valid email address'
            )
         ),
         Object(preact_min["h"])(
            'div',
            { 'class': 'mt-2' },
            this.state.emails.map(function (email) {
               return Object(preact_min["h"])(
                  'span',
                  {
                     'class': 'chip'
                  },
                  email,
                  Object(preact_min["h"])('a', {
                     'class': 'btn btn-clear',
                     'aria-label': 'Close',
                     role: 'button',
                     onClick: _this2._removeEmail,
                     name: email
                  })
               );
            })
         ),
         Object(preact_min["h"])(
            'div',
            { 'class': 'row my-2' },
            Object(preact_min["h"])(prev_step_button_PrevStepButton, {
               onClick: props.handlePrevStep
            })
         )
      );
   };

   return CreateShrineFormStep6;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/create-shrine/create-shrine-form-container/index.js


function create_shrine_form_container__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function create_shrine_form_container__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function create_shrine_form_container__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var create_shrine_form_container_CreateShrineFormContainer = function (_Component) {
   create_shrine_form_container__inherits(CreateShrineFormContainer, _Component);

   function CreateShrineFormContainer() {
      create_shrine_form_container__classCallCheck(this, CreateShrineFormContainer);

      return create_shrine_form_container__possibleConstructorReturn(this, _Component.apply(this, arguments));
   }

   CreateShrineFormContainer.prototype.render = function render(props) {
      switch (props.step) {
         case 1:
            return Object(preact_min["h"])(create_shrine_form_step1_CreateShrineFormStep1, {
               onChange: props.onChange,

               firstName: props.firstName,
               middleName: props.middleName,
               lastName: props.lastName,

               handleNextStep: props.handleNextStep
            });
            break;

         case 2:
            return Object(preact_min["h"])(create_shrine_form_step2_CreateShrineFormStep2, {
               handleNextStep: props.handleNextStep,
               handlePrevStep: props.handlePrevStep,
               onFileChange: props.onFileChange
            });
            break;

         case 3:
            return Object(preact_min["h"])(create_shrine_form_step3_CreateShrineFormStep3, {
               firstName: props.firstName,
               born: props.born,
               died: props.died,
               onChange: props.onChange,

               subjPronoun: props.subjPronoun,
               objPronoun: props.objPronoun,
               posPronoun: props.posPronoun,
               handleGenderChange: props.handleGenderChange,

               deceased: props.deceased,
               handleDeath: props.handleDeath,

               newMemorial: props.newMemorial,
               loading: props.loading,

               handleNextStep: props.handleNextStep,
               handlePrevStep: props.handlePrevStep
            });
            break;

         case 4:
            return Object(preact_min["h"])(create_shrine_form_step4_CreateShrineFormStep4, {
               handleNextStep: props.handleNextStep,
               handlePrevStep: props.handlePrevStep
            });
            break;

         case 5:
            return Object(preact_min["h"])(create_shrine_form_step5_CreateShrineFormStep5, {
               handleNextStep: props.handleNextStep,
               handlePrevStep: props.handlePrevStep
            });
            break;

         case 6:
            return Object(preact_min["h"])(create_shrine_form_step6_CreateShrineFormStep6, {
               handleNextStep: props.handleNextStep,
               handlePrevStep: props.handlePrevStep
            });
            break;
      }
   };

   return CreateShrineFormContainer;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/menu/index.js


var menu_Menu = function Menu(props) {
   return Object(preact_min["h"])(
      "ul",
      { "class": "menu " + props.class, style: props.style },
      props.children
   );
};

var menu_MenuItem = function MenuItem(props) {
   return Object(preact_min["h"])(
      "li",
      { "class": "menu-item " + props.class },
      props.children
   );
};

var menu_MenuHeader = function MenuHeader(props) {
   return Object(preact_min["h"])("li", { "class": "divider", "data-content": props.children });
};

var menu_MenuDivider = function MenuDivider(props) {
   return Object(preact_min["h"])("li", { "class": "divider", "data-content": props.children });
};


// CONCATENATED MODULE: ./routes/create-shrine/avatar-rail/index.js





var avatar_rail__ref = Object(preact_min["h"])(
   menu_MenuDivider,
   null,
   'Shrine Basics'
);

var avatar_rail__ref2 = Object(preact_min["h"])(
   menu_MenuDivider,
   null,
   'Invite Others'
);

var avatar_rail_AvatarRail = function AvatarRail(props) {
   var initials = props.firstName.charAt(0) + props.lastName.charAt(0);
   return Object(preact_min["h"])(
      menu_Menu,
      { 'class': 'avatar-rail-menu' },
      props.step > 1 && Object(preact_min["h"])(
         'figure',
         { 'class': 'avatar avatar-xxl centered', data: initials },
         Object(preact_min["h"])('img', { src: props.src })
      ),
      props.step > 1 && Object(preact_min["h"])(
         menu_MenuItem,
         null,
         Object(preact_min["h"])(
            'h4',
            { 'class': 'text-center m-2' },
            props.firstName
         )
      ),
      Object(preact_min["h"])(
         'div',
         { 'class': props.step <= 3 ? "" : "hide-sm" },
         avatar_rail__ref,
         Object(preact_min["h"])(
            menu_MenuItem,
            {
               'class': props.step === 1 && "arrow-box"
            },
            Object(preact_min["h"])(
               'a',
               { 'class': 'btn btn-sm btn-link',
                  onClick: function onClick(n) {
                     return props.gotoStep(1);
                  }
               },
               'Name'
            )
         ),
         Object(preact_min["h"])(
            menu_MenuItem,
            {
               'class': props.step === 2 && "arrow-box"
            },
            Object(preact_min["h"])(
               'a',
               { 'class': 'btn btn-sm btn-link',
                  onClick: function onClick(n) {
                     return props.gotoStep(2);
                  }
               },
               'Photo'
            )
         ),
         Object(preact_min["h"])(
            menu_MenuItem,
            {
               'class': props.step === 3 && "arrow-box"
            },
            Object(preact_min["h"])(
               'a',
               { 'class': 'btn btn-sm btn-link', onClick: function onClick(n) {
                     return props.gotoStep(3);
                  } },
               'Information'
            )
         )
      ),
      Object(preact_min["h"])(
         'div',
         { 'class': props.step > 3 ? "" : "hide-sm" },
         avatar_rail__ref2,
         Object(preact_min["h"])(
            menu_MenuItem,
            {
               'class': props.step === 4 && "arrow-box"
            },
            Object(preact_min["h"])(
               'a',
               { 'class': 'btn btn-sm btn-link', onClick: function onClick(n) {
                     return props.gotoStep(4);
                  } },
               'Invitation Template'
            )
         ),
         Object(preact_min["h"])(
            menu_MenuItem,
            {
               'class': props.step === 5 && "arrow-box"
            },
            Object(preact_min["h"])(
               'a',
               { 'class': 'btn btn-sm btn-link', onClick: function onClick(n) {
                     return props.gotoStep(5);
                  } },
               'Customize Invitation'
            )
         ),
         Object(preact_min["h"])(
            menu_MenuItem,
            {
               'class': props.step === 6 && "arrow-box"
            },
            Object(preact_min["h"])(
               'a',
               { 'class': 'btn btn-sm btn-link', onClick: function onClick(n) {
                     return props.gotoStep(6);
                  } },
               'Invite Collaborators'
            )
         )
      )
   );
};


// CONCATENATED MODULE: ./routes/create-shrine/index.js


function create_shrine__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function create_shrine__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function create_shrine__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var create_shrine__ref = Object(preact_min["h"])(
   'h1',
   null,
   ' Create a New Shrine'
);

var create_shrine_CreateShrine = function (_Component) {
   create_shrine__inherits(CreateShrine, _Component);

   function CreateShrine() {
      var _temp, _this, _ret;

      create_shrine__classCallCheck(this, CreateShrine);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
         args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = create_shrine__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
         step: 1,

         firstName: '',
         middleName: '',
         lastName: '',
         born: '',
         died: '',
         subjPronoun: '',
         objPronoun: '',
         posPronoun: '',
         deceased: false,

         file: null,
         fileURL: '',

         loading: false
      }, _this.onChange = function (e) {
         var _this$setState;

         _this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState));
      }, _this.onFileChange = function (e) {
         // console.log(e);
         _this.setState({ file: e.target.files[0] });
         _this.makeFileURL();
      }, _this.makeFileURL = function () {
         console.log('reading file');
         var reader = new FileReader();

         reader.onload = function (e) {
            _this.setState({ fileURL: e.target.result });
         };

         reader.readAsDataURL(_this.state.file);
      }, _this._handleNextStep = function () {
         var step = _this.state.step + 1;
         _this.setState({ step: step });
      }, _this.gotoStep = function (n) {
         _this.setState({ step: n });
      }, _this._handlePrevStep = function () {
         var step = _this.state.step - 1;
         _this.setState({ step: step });
      }, _this._handleGenderChange = function (e) {
         if (e.target.value === 'Male') {
            _this.setState({
               subjPronoun: 'he',
               objPronoun: 'him',
               posPronoun: 'his'
            });
         } else if (e.target.value === 'Female') {
            _this.setState({
               subjPronoun: 'she',
               objPronoun: 'her',
               posPronoun: 'her'
            });
         }
      }, _this._handleDeath = function (e) {
         if (e.target.value === "true") {
            _this.setState({ deceased: true });
         } else if (e.target.value === "false") {
            _this.setState({ deceased: false });
         }
      }, _this.newMemorial = function () {
         var loginToken = window.sessionStorage.getItem("loginToken");

         // abort if no name or birth date
         if (!(_this.state.firstName && _this.state.born)) {
            alert("A memorial needs at least a first name and birth date to be created. " + "Please go to the corresponding pages and enter that information before continuing");
            return;
         }
         _this.setState({ loading: true });
         fetch(api + "!newMemorial", {
            method: "POST",
            body: JSON.stringify({
               nm1: _this.state.firstName,
               nm2: _this.state.middleName,
               nm3: _this.state.lastName,
               born: _this.state.born,
               died: _this.state.died,
               // strip trailing '='s so PL can handle it
               img: _this.state.fileURL.split("=")[0],
               loginToken: loginToken
            })
         }).then(function (res) {
            return res.json();
         }).then(function (json) {
            // do something with json
            _this.setState({ loading: false });
            Object(preact_router_es["route"])("/user");
         });
      }, _temp), create_shrine__possibleConstructorReturn(_this, _ret);
   }

   // this is a terrible function name...
   // as if death could be handled with 3 lines of code.


   CreateShrine.prototype.render = function render(props) {
      var _this2 = this;

      var step = this.state.step;
      var firstName = this.state.firstName;
      var lastName = this.state.lastName;

      return Object(preact_min["h"])(
         'div',
         null,
         Object(preact_min["h"])(
            'div',
            { 'class': 'flex-container-heading' },
            step > 1 && firstName ? Object(preact_min["h"])(
               'h1',
               null,
               firstName,
               '\'s Shrine'
            ) : create_shrine__ref,
            Object(preact_min["h"])(
               'p',
               { 'class': 'text-gray' },
               'Step ',
               step,
               ' of 6'
            )
         ),
         Object(preact_min["h"])(FlexContainer_FlexContainer, {

            avatarRail: Object(preact_min["h"])(avatar_rail_AvatarRail, {
               step: step,
               firstName: firstName,
               lastName: lastName,
               gotoStep: function gotoStep(n) {
                  return _this2.gotoStep(n);
               },
               src: this.state.fileURL
            }),

            formRail: Object(preact_min["h"])(create_shrine_form_container_CreateShrineFormContainer, {
               step: step,
               handleNextStep: this._handleNextStep,
               handlePrevStep: this._handlePrevStep,

               newMemorial: this.newMemorial,
               loading: this.state.loading,

               onChange: this.onChange,
               onFileChange: this.onFileChange,
               born: this.state.born,
               died: this.state.died,

               firstName: firstName,
               middleName: this.state.middleName,
               lastName: lastName,

               subjPronoun: this.state.subjPronoun,
               objPronoun: this.state.objPronoun,
               posPronoun: this.state.posPronoun,
               handleGenderChange: this._handleGenderChange,

               deceased: this.state.deceased,
               handleDeath: this._handleDeath
            })

         })
      );
   };

   return CreateShrine;
}(preact_min["Component"]);

/* harmony default export */ var create_shrine = (create_shrine_CreateShrine);
// EXTERNAL MODULE: ./components/GridContainer/style.css
var style = __webpack_require__("cUJj");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./components/GridContainer/index.js



var GridContainer_GridContainer = function GridContainer(props) {
   return Object(preact_min["h"])(
      'div',
      { 'class': style_default.a.gridContainer },
      Object(preact_min["h"])(
         'div',
         { 'class': style_default.a.avatarColumn },
         props.avatarColumn
      ),
      Object(preact_min["h"])(
         'div',
         { 'class': style_default.a.contentColumn },
         props.contentColumn
      )
   );
};

/* harmony default export */ var components_GridContainer = (GridContainer_GridContainer);
// CONCATENATED MODULE: ./routes/ManageMemorial/ContentList.js




var ContentList__ref = Object(preact_min["h"])(
   'h4',
   { 'class': 'col' },
   'Chronicle Items'
);

var ContentList__ref2 = Object(preact_min["h"])('div', { 'class': 'col' });

var ContentList__ref3 = Object(preact_min["h"])('div', { 'class': 'divider' });

var ContentList_ContentList = function ContentList(props) {
   return Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(
         'div',
         { 'class': 'row' },
         ContentList__ref,
         ContentList__ref2,
         Object(preact_min["h"])(
            'button',
            {
               'class': 'col btn btn-primary',
               onClick: props.newItem
            },
            'Add Item'
         )
      ),
      ContentList__ref3,
      Object(preact_min["h"])(
         'div',
         {
            style: "display:flex;" + "flex-direction:row;" + "flex-wrap:wrap;" + "align-items:flex-start;" + "justify-content:center;"
         },
         props.items.map(function (item) {
            return Object(preact_min["h"])(ContentList_ContentCard, {
               id: item.id,
               title: item.title,
               date: item.start,
               location: item.location,
               src: item.src,
               showModal: function showModal(id) {
                  return props.showModal(id);
               },
               edited: item.edited
            });
         })
      )
   );
};

var ContentList_ContentCard = function ContentCard(props) {
   return Object(preact_min["h"])(
      'div',
      { 'class': 'card m-2', style: "width:200px;" + (props.edited ? "background:lightcoral;" : "") },
      props.src && Object(preact_min["h"])('img', { 'class': 'responsive-img mt-2 mx-2 centered', src: props.src, style: 'max-width:182px' }),
      Object(preact_min["h"])(
         'div',
         { 'class': 'card-body' },
         Object(preact_min["h"])(
            'div',
            { 'class': 'h6 text-ellipsis' },
            props.title
         ),
         Object(preact_min["h"])(
            'div',
            { 'class': 'text-gray text-ellipsis', style: 'font-size:smaller;' },
            props.location
         ),
         Object(preact_min["h"])(
            'div',
            { 'class': 'text-gray', style: 'font-size:smaller;' },
            props.date
         )
      ),
      Object(preact_min["h"])(
         'div',
         { 'class': 'card-footer' },
         Object(preact_min["h"])(
            'button',
            {
               'class': 'btn btn-sm float-right',
               onClick: function onClick(id) {
                  return props.showModal(props.id);
               }
            },
            'edit'
         )
      )
   );
};

/* harmony default export */ var ManageMemorial_ContentList = (ContentList_ContentList);
// CONCATENATED MODULE: ./routes/ManageMemorial/EditCard.js



var EditCard_EditCard = function EditCard(props) {
   return Object(preact_min["h"])(
      "div",
      { "class": "panel" },
      Object(preact_min["h"])(
         "div",
         { "class": "panel-body mt-2" },
         props.item.src && Object(preact_min["h"])("img", {
            src: props.item.src,
            alt: props.item.title,
            "class": "img-responsive my-2"
         }),
         Object(preact_min["h"])(
            "h4",
            null,
            props.item.title
         ),
         Object(preact_min["h"])(
            "div",
            { "class": "text-gray d-inline" },
            props.item.location
         ),
         Object(preact_min["h"])(
            "div",
            { "class": "text-gray d-inline mx-2" },
            props.item.start
         ),
         Object(preact_min["h"])(
            "p",
            null,
            props.item.caption
         )
      )
   );
};

/* harmony default export */ var ManageMemorial_EditCard = (EditCard_EditCard);
// CONCATENATED MODULE: ./routes/ManageMemorial/EditModal.js


function EditModal__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EditModal__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function EditModal__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// edit a chronicle item

var EditModal__ref = Object(preact_min["h"])(
   'div',
   { 'class': 'text-center text-gray', style: 'font-size:smaller;' },
   '- Scroll down to see a preview -'
);

var EditModal_EditModal = function (_Component) {
   EditModal__inherits(EditModal, _Component);

   function EditModal() {
      EditModal__classCallCheck(this, EditModal);

      return EditModal__possibleConstructorReturn(this, _Component.apply(this, arguments));
   }

   EditModal.prototype.render = function render(props) {
      var modalClasses = classnames_default()("modal", "modal-lg", { "active": props.showModal }, { "has-error": props.modalError });

      var width = window.innerWidth || document.documentElement.clientWidth || document.body.client.width;

      return Object(preact_min["h"])(
         'div',
         { 'class': modalClasses },
         Object(preact_min["h"])('a', { onClick: props.hideModal,
            'class': 'modal-overlay',
            'aria-label': 'Close'
         }),
         Object(preact_min["h"])(
            'div',
            { 'class': 'modal-container' },
            Object(preact_min["h"])(
               'div',
               { 'class': 'modal-header' },
               Object(preact_min["h"])('a', { onClick: props.hideModal,
                  'class': 'btn btn-clear float-right',
                  'aria-label': 'Close'
               }),
               Object(preact_min["h"])(
                  'div',
                  { 'class': 'modal-title h5' },
                  props.item.id ? "Edit Item" : "Add Item"
               ),
               width < 840 && EditModal__ref
            ),
            Object(preact_min["h"])(
               'div',
               { 'class': 'modal-body' },
               Object(preact_min["h"])(
                  'div',
                  { 'class': width < 840 ? "content" : "content container columns" },
                  Object(preact_min["h"])(
                     'form',
                     { 'class': width < 840 ? "form-group" : "form-group column col-5" },
                     Object(preact_min["h"])(form_inputs_TextInput, {
                        label: 'Title',
                        name: 'title',
                        value: props.item.title,
                        onChange: props.onChange
                     }),
                     Object(preact_min["h"])(form_inputs_TextInput, {
                        label: 'Location',
                        name: 'location',
                        value: props.item.location,
                        onChange: props.onChange
                     }),
                     Object(preact_min["h"])(form_inputs_DateInput, {
                        label: 'Date',
                        name: 'start',
                        value: props.item.start,
                        onChange: props.onChange
                     }),
                     Object(preact_min["h"])(
                        'label',
                        {
                           'class': 'form-label'
                        },
                        'Change photo',
                        Object(preact_min["h"])('input', {
                           'class': 'form-input',
                           type: 'file',
                           accept: '.jpg, .jpeg, .png',
                           value: props.item.file,
                           onChange: props.onFileChange
                        })
                     )
                  ),
                  Object(preact_min["h"])(
                     'div',
                     { 'class': width < 840 ? "" : "column col-7" },
                     Object(preact_min["h"])(ManageMemorial_EditCard, { item: props.item })
                  )
               )
            ),
            Object(preact_min["h"])(
               'div',
               { 'class': 'modal-footer' },
               Object(preact_min["h"])(
                  'button',
                  {
                     'class': 'btn btn-primary',
                     onClick: props.item.id ? props.updChronicle : props.newChronicle
                  },
                  props.item.id ? "Update item" : "Add item"
               )
            )
         )
      );
   };

   return EditModal;
}(preact_min["Component"]);

/* harmony default export */ var ManageMemorial_EditModal = (EditModal_EditModal);
// CONCATENATED MODULE: ./routes/ManageMemorial/PublicUrl.js



var PublicUrl_PublicUrl = function PublicUrl(props) {
   return Object(preact_min["h"])(
      'button',
      {
         'class': 'btn btn-link',
         onClick: function onClick() {
            return Object(preact_router_es["route"])('/' + props.urlStr + '/' + props.urlNm + '/chronicle');
         }
      },
      'loveswake.com/' + props.urlStr + '/' + props.urlNm + '/chronicle'
   );
};

/* harmony default export */ var ManageMemorial_PublicUrl = (PublicUrl_PublicUrl);
// CONCATENATED MODULE: ./routes/ManageMemorial/index.js


function ManageMemorial__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ManageMemorial__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function ManageMemorial__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var ManageMemorial_ManageMemorial = function (_Component) {
   ManageMemorial__inherits(ManageMemorial, _Component);

   function ManageMemorial() {
      var _temp, _this, _ret;

      ManageMemorial__classCallCheck(this, ManageMemorial);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
         args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = ManageMemorial__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
         item: {},
         showModal: false
      }, _this.onChange = function (e) {
         var oldState = _this.state.item;
         var newState = _this.state.item;
         newState[e.target.name] = e.target.value;
         _this.setState({ oldState: newState });
      }, _this.onFileChange = function (e) {
         var oldState = _this.state.item;
         var newState = _this.state.item;
         newState["file"] = e.target.files[0];
         _this.setState({ oldState: newState });
         // needed to do this as a separate step so the state
         // updates properly. which means this is a hack.
         _this.makeFileURL();
      }, _this.makeFileURL = function () {
         var oldState = _this.state.item;
         var newState = _this.state.item;
         var reader = new FileReader();

         reader.onload = function (e) {
            newState["src"] = e.target.result;
            _this.setState({ oldState: newState });
         };

         reader.readAsDataURL(_this.state.item.file);
      }, _this.updChronicle = function () {
         console.log('updChronicle');

         // handle errors
         if (!(_this.state.item.title && _this.state.item.start)) {
            alert("A new item must have a title and a date");
            return;
         }

         // NOTE - this whole thing feels like a hack as the fetch call
         // is basically repeated. look into async/await or a promise.

         // if there's an image to upload...
         if (_this.state.item.file) {

            var reader = new FileReader();

            reader.readAsDataURL(_this.state.item.file);

            reader.onload = function (e) {
               // NOTE - must remove padding for picolisp
               //
               // base64 strings are padded with one or two '='s to make sure it aligns
               // to proper byte boundaries. the picolisp server does not handle this 
               // well. so we must remove any padding before it is sent. after picolisp
               // has parsed the http request, we can add the appropriate padding back
               // to the string by checking if it is an even multiple of 4.
               //
               // see 'server.l' for the picolisp side.
               //
               // NOTE - turns out that we don't need to add padding back on the server
               // as the base64 utility is still able to decode.

               // base64 string without padding
               var str = e.target.result.split('=')[0];

               fetch(api + "!updChronicle?" + _this.props.urlNm, {
                  method: "POST",
                  body: JSON.stringify({
                     loginToken: window.sessionStorage.getItem("loginToken"),
                     id: _this.state.item.id,
                     title: _this.state.item.title,
                     location: _this.state.item.location,
                     date: _this.state.item.start,
                     txt: _this.state.item.txt,
                     image: str
                  })
               }).then(function (res) {
                  return res.json();
               }).then(function (json) {
                  console.log(json);
                  // UPDATE TIMELINE STATE HERE
                  // NOTE - this may not be necessary, as new entries
                  // will likely go into a holding container to await
                  // editing/approval by shrine moderator
                  // this.refs.timeline.addItem(json);
                  // this.addItem(json);
               }).then(_this.setState({
                  item: {}
               }));
            };
         } else {

            // EDIT URL BELOW
            fetch(api + "!updChronicle?" + _this.props.urlNm, {
               method: "POST",
               body: JSON.stringify({
                  loginToken: window.sessionStorage.getItem("loginToken"),
                  id: _this.state.item.id,
                  title: _this.state.item.title,
                  location: _this.state.item.location,
                  date: _this.state.item.start,
                  txt: _this.state.item.txt
               })
            }).then(function (res) {
               return res.json();
            }).then(function (json) {
               console.log(json);
               // UPDATE TIMELINE STATE HERE
               // NOTE - this may not be necessary, as new entries
               // will likely go into a holding container to await
               // editing/approval by shrine moderator
               // this.refs.timeline.addItem(json);
               // this.addItem(json);
            }).then(_this.setState({
               item: {}
            }));
         }

         _this.hideModal();
      }, _this.newChronicle = function () {
         console.log('newChronicle');
         // handle errors
         if (!(_this.state.item.title && _this.state.item.start)) {
            alert("A new item must have a title and a date");
            return;
         }

         // NOTE - this whole thing feels like a hack as the fetch call
         // is basically repeated. look into async/await or a promise.

         // if there's an image to upload...
         if (_this.state.item.file) {

            var reader = new FileReader();

            reader.readAsDataURL(_this.state.item.file);

            reader.onload = function (e) {
               // NOTE - must remove padding for picolisp
               //
               // base64 strings are padded with one or two '='s to make sure it aligns
               // to proper byte boundaries. the picolisp server does not handle this 
               // well. so we must remove any padding before it is sent. after picolisp
               // has parsed the http request, we can add the appropriate padding back
               // to the string by checking if it is an even multiple of 4.
               //
               // see 'server.l' for the picolisp side.
               //
               // NOTE - turns out that we don't need to add padding back on the server
               // as the base64 utility is still able to decode.

               // base64 string without padding
               var str = e.target.result.split('=')[0];

               fetch(api + "!postChronicle?" + _this.props.urlNm, {
                  method: "POST",
                  body: JSON.stringify({
                     title: _this.state.item.title,
                     subtitle: _this.state.item.subtitle,
                     location: _this.state.item.location,
                     date: _this.state.item.start,
                     txt: _this.state.item.txt,
                     image: str
                  })
               }).then(function (res) {
                  return res.json();
               }).then(function (json) {
                  console.log(json);
                  // UPDATE TIMELINE STATE HERE
                  // NOTE - this may not be necessary, as new entries
                  // will likely go into a holding container to await
                  // editing/approval by shrine moderator
                  // this.refs.timeline.addItem(json);
                  _this.addItem(json);
               }).then(_this.setState({
                  item: {}
               }));
            };
         } else {

            // EDIT URL BELOW
            fetch(api + "!postChronicle?" + _this.props.urlNm, {
               method: "POST",
               body: JSON.stringify({
                  title: _this.state.item.title,
                  subtitle: _this.state.item.subtitle,
                  location: _this.state.item.location,
                  date: _this.state.item.start,
                  txt: _this.state.item.txt
               })
            }).then(function (res) {
               return res.json();
            }).then(function (json) {
               console.log(json);
               // UPDATE TIMELINE STATE HERE
               // NOTE - this may not be necessary, as new entries
               // will likely go into a holding container to await
               // editing/approval by shrine moderator
               // this.refs.timeline.addItem(json);
               _this.addItem(json);
            }).then(_this.setState({
               item: {}
            }));
         }

         _this.hideModal();
      }, _this.showModal = function (id) {
         var memorial = _this.props.user.memorials.find(function (m) {
            return m.urlNm === _this.props.urlNm;
         });
         _this.setState({ showModal: true, item: memorial.items.find(function (item) {
               return item.id === id;
            }) });
      }, _this.hideModal = function () {
         var oldItem = _this.state.item;
         var newItem = _this.state.item;
         newItem["edited"] = true;
         _this.setState({
            showModal: false,
            modalError: false,
            oldItem: newItem
         });
      }, _this.newItem = function () {
         _this.showModal();
         _this.setState({ item: {} });
      }, _temp), ManageMemorial__possibleConstructorReturn(_this, _ret);
   }

   ManageMemorial.prototype.render = function render() {
      var _this2 = this;

      var memorial = this.props.user.memorials.find(function (m) {
         return m.urlNm === _this2.props.urlNm;
      });
      return Object(preact_min["h"])(components_GridContainer, {
         avatarColumn: Object(preact_min["h"])(
            'div',
            { 'class': 'menu', style: 'z-index:1;' },
            Object(preact_min["h"])(
               'figure',
               { 'class': 'centered avatar avatar-xxl' },
               Object(preact_min["h"])('img', { src: memorial.avatar })
            ),
            Object(preact_min["h"])(
               'h3',
               { 'class': 'text-center mt-2' },
               memorial.nm
            )
         ),
         contentColumn: Object(preact_min["h"])(
            'div',
            null,
            Object(preact_min["h"])(ManageMemorial_ContentList, {
               showModal: this.showModal,
               items: memorial.items,
               newItem: this.newItem
            }),
            Object(preact_min["h"])(ManageMemorial_EditModal, {
               showModal: this.state.showModal,
               hideModal: this.hideModal,

               updChronicle: this.updChronicle,
               newChronicle: this.newChronicle,

               onChange: this.onChange,
               onFileChange: this.onFileChange,

               item: this.state.item
            })
         )
      });
   };

   return ManageMemorial;
}(preact_min["Component"]);

/* harmony default export */ var routes_ManageMemorial = (ManageMemorial_ManageMemorial);
// CONCATENATED MODULE: ./routes/Entry/index.js


function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function Entry__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Entry__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Entry__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



// import style from './style';

var Entry__ref3 = Object(preact_min["h"])('hr', null);

var Entry_Entry = function (_Component) {
   Entry__inherits(Entry, _Component);

   function Entry() {
      Entry__classCallCheck(this, Entry);

      return Entry__possibleConstructorReturn(this, _Component.apply(this, arguments));
   }

   // Note: `name` comes from the URL, courtesy of our router
   Entry.prototype.render = function render(_ref, _ref2) {
      var name = _ref.name;

      _objectDestructuringEmpty(_ref2);

      return Object(preact_min["h"])(
         'div',
         null,
         Object(preact_min["h"])(
            'h1',
            null,
            ' In Memory of ',
            name
         ),
         Entry__ref3,
         Object(preact_min["h"])(
            'ul',
            null,
            Object(preact_min["h"])(
               'li',
               null,
               Object(preact_min["h"])(
                  match["Link"],
                  { href: '/' + name + '/shrine' },
                  name,
                  '\'s Shrine'
               )
            ),
            Object(preact_min["h"])(
               'li',
               null,
               Object(preact_min["h"])(
                  match["Link"],
                  { href: '/' + name + '/atlas' },
                  name,
                  '\'s Atlas'
               )
            ),
            Object(preact_min["h"])(
               'li',
               null,
               Object(preact_min["h"])(
                  match["Link"],
                  { href: '/' + name + '/chronicle' },
                  name,
                  '\'s Chronicle'
               )
            )
         )
      );
   };

   return Entry;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/Shrine/index.js


function Shrine__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Shrine__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Shrine__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



// import style from './style';

var Shrine_Shrine = function (_Component) {
   Shrine__inherits(Shrine, _Component);

   function Shrine() {
      Shrine__classCallCheck(this, Shrine);

      return Shrine__possibleConstructorReturn(this, _Component.apply(this, arguments));
   }

   // this should be in a higher order component
   Shrine.prototype.componentDidMount = function componentDidMount() {
      var _this2 = this;

      fetch(api + "!getMemorial?" + this.props.urlNm).then(function (res) {
         return res.json();
      }).then(function (json) {
         _this2.setState({
            nm: json.nm,
            nm1: json.nm1,
            nm2: json.nm2,
            nm3: json.nm3,
            born: json.born,
            died: json.died,
            avatar: json.avatar
         });
      });
   };

   // Note: `name` comes from the URL, courtesy of our router


   Shrine.prototype.render = function render() {
      return Object(preact_min["h"])(
         'div',
         null,
         Object(preact_min["h"])(
            'h1',
            null,
            this.state.nm,
            '\'s Shrine'
         )
      );
   };

   return Shrine;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/Atlas/index.js


function Atlas__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Atlas__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Atlas__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



// import style from './style';

var Atlas_Atlas = function (_Component) {
   Atlas__inherits(Atlas, _Component);

   function Atlas() {
      Atlas__classCallCheck(this, Atlas);

      return Atlas__possibleConstructorReturn(this, _Component.apply(this, arguments));
   }

   // this should be in a higher order component
   Atlas.prototype.componentDidMount = function componentDidMount() {
      var _this2 = this;

      fetch(api + "!getMemorial?" + this.props.urlNm).then(function (res) {
         return res.json();
      }).then(function (json) {
         _this2.setState({
            nm: json.nm,
            nm1: json.nm1,
            nm2: json.nm2,
            nm3: json.nm3,
            born: json.born,
            died: json.died,
            avatar: json.avatar
         });
      });
   };

   // Note: `name` comes from the URL, courtesy of our router


   Atlas.prototype.render = function render() {
      return Object(preact_min["h"])(
         'div',
         null,
         Object(preact_min["h"])(
            'h1',
            null,
            this.state.nm,
            '\'s Atlas'
         )
      );
   };

   return Atlas;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/Chronicle/style.css
var Chronicle_style = __webpack_require__("uDFM");
var Chronicle_style_default = /*#__PURE__*/__webpack_require__.n(Chronicle_style);

// CONCATENATED MODULE: ./routes/Chronicle/linked-ref.js


// OPTIONAL: patch Component by default (you might want to delete this if you're a purist)
preact_min["Component"].prototype.linkRef = function (name) {
   return linkRef(this, name);
};

// Export the linker as a standalone function:
function linkRef(component, name) {
   var cache = component._linkedRefs || (component._linkedRefs = {});
   if (!component.refs) component.refs = {};
   return cache[name] || (cache[name] = function (c) {
      component.refs[name] = c;
   });
}
// CONCATENATED MODULE: ./components/avatar.js

// import classNames from 'classnames';

var avatar_Avatar = function Avatar(props) {
   return Object(preact_min["h"])(
      "figure",
      {
         "class": props.class ? "avatar " + props.class : "avatar",
         "data-initial": props.data
      },
      Object(preact_min["h"])("img", { src: props.src })
   );
};


// CONCATENATED MODULE: ./components/AvatarRail/index.js







var AvatarRail__ref = Object(preact_min["h"])(menu_MenuDivider, null);

var AvatarRail_AvatarRail = function AvatarRail(props) {
   return Object(preact_min["h"])(
      menu_Menu,
      { style: 'z-index:1;' },
      Object(preact_min["h"])(
         'figure',
         { 'class': 'avatar avatar-xxl centered mt-2', 'data-initial': props.firstName.charAt[0] },
         Object(preact_min["h"])('img', { src: props.avatar })
      ),
      Object(preact_min["h"])(
         menu_MenuItem,
         null,
         Object(preact_min["h"])(
            'h4',
            { 'class': 'text-center m-2' },
            props.firstName
         )
      ),
      AvatarRail__ref,
      Object(preact_min["h"])(
         menu_MenuItem,
         null,
         Object(preact_min["h"])(
            match["Link"],
            { activeClass: 'active',
               href: "/" + props.urlStr + "/" + props.urlNm + "/shrine" },
            'Shrine'
         )
      ),
      Object(preact_min["h"])(
         menu_MenuItem,
         null,
         Object(preact_min["h"])(
            match["Link"],
            { activeClass: 'active',
               href: "/" + props.urlStr + "/" + props.urlNm + "/chronicle" },
            'Chronicle'
         )
      ),
      Object(preact_min["h"])(
         menu_MenuItem,
         null,
         Object(preact_min["h"])(
            match["Link"],
            { activeClass: 'active',
               href: "/" + props.urlStr + "/" + props.urlNm + "/atlas" },
            'Atlas'
         )
      )
   );
};

/* harmony default export */ var components_AvatarRail = (AvatarRail_AvatarRail);
// EXTERNAL MODULE: ./routes/Chronicle/vis-timeline-graph2d.min.js
var vis_timeline_graph2d_min = __webpack_require__("keCY");
var vis_timeline_graph2d_min_default = /*#__PURE__*/__webpack_require__.n(vis_timeline_graph2d_min);

// EXTERNAL MODULE: ./style/vis-timeline-graph2d.min.css
var style_vis_timeline_graph2d_min = __webpack_require__("Rdqd");
var style_vis_timeline_graph2d_min_default = /*#__PURE__*/__webpack_require__.n(style_vis_timeline_graph2d_min);

// EXTERNAL MODULE: ./style/timeline.css
var timeline = __webpack_require__("G3al");
var timeline_default = /*#__PURE__*/__webpack_require__.n(timeline);

// CONCATENATED MODULE: ./routes/Chronicle/TimeLine.js


function TimeLine__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TimeLine__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function TimeLine__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var TimeLine_TimeLine = function (_Component) {
   TimeLine__inherits(TimeLine, _Component);

   function TimeLine() {
      var _temp, _this, _ret;

      TimeLine__classCallCheck(this, TimeLine);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
         args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = TimeLine__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
         created: false
      }, _this.createTimeline = function () {
         var born = _this.props.born;
         var min = (parseInt(born) - 10).toString();

         _this.timelineDataSet = new vis_timeline_graph2d_min_default.a.DataSet(_this.props.data);

         _this.timeline = new vis_timeline_graph2d_min_default.a.Timeline(_this.refs.timeline, _this.timelineDataSet, {
            //options
            // NOTE - start/min of timeline set dynamically below, after data has loaded
            min: min,
            start: born,
            max: '2025',
            end: '2020',

            margin: {
               axis: 10
            },

            height: '160px',

            // clickable stuff
            selectable: true,
            // editable: true,

            // stack: false,
            type: 'point',
            // one year
            zoomMin: 31557600000,
            // // fifty years
            zoomMax: 1577880000000,

            onInitialDrawComplete: function onInitialDrawComplete() {
               // console.log('timeline draw complete');
               _this.setState(function (prevState) {
                  return { created: !prevState.created };
               });
               _this.forceUpdate();
            }
         });

         // 'properties' not to be confused with 'props'
         _this.timeline.on('select', function (properties) {
            // console.log(properties.items[0]);
            if (!properties.items[0]) {
               return;
            };
            _this.props.changeItem(properties.items[0]);
         });
      }, _this.addItem = function (item) {
         _this.timelineDataSet.add(item);
         _this.selectItem(item);
         _this.timeline.redraw();
      }, _this.selectItem = function (item) {
         _this.timeline.setSelection(item.id, { focus: true, animation: true });
      }, _temp), TimeLine__possibleConstructorReturn(_this, _ret);
   }

   TimeLine.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.data === this.props.data) {
         return false;
      }
   };

   TimeLine.prototype.componentDidUpdate = function componentDidUpdate() {
      if (!this.state.created) {
         this.createTimeline();
         // this.setState((prevState) => ({ created: !prevState.created }));
         this.selectItem(this.props.data[0]);
      }
   };

   TimeLine.prototype.render = function render(props) {
      return Object(preact_min["h"])('div', {
         ref: this.linkRef('timeline'),
         'class': !this.state.created ? "loading loading-lg" : "my-2"
      });
   };

   return TimeLine;
}(preact_min["Component"]);


// EXTERNAL MODULE: ../node_modules/marked/lib/marked.js
var marked = __webpack_require__("3F7m");
var marked_default = /*#__PURE__*/__webpack_require__.n(marked);

// CONCATENATED MODULE: ./routes/Chronicle/ChronicleCard.js





var ChronicleCard_ChronicleCard = function ChronicleCard(props) {
   return Object(preact_min["h"])(
      'div',
      {
         'class': props.stylesheet ? "panel " + Chronicle_style_default.a.ChronicleCard : "panel",
         style: props.style ? "min-height:400px;" : ""
      },
      Object(preact_min["h"])(
         'div',
         { 'class': 'panel-body my-2' },
         props.txt ? Object(preact_min["h"])('div', { dangerouslySetInnerHTML: { __html: marked_default()(props.txt.split("^J^J").join("\n")) } }) : Object(preact_min["h"])(
            'div',
            null,
            props.src && Object(preact_min["h"])('img', {
               src: props.src,
               alt: props.title,
               'class': 'img-responsive centered my-2'
            }),
            Object(preact_min["h"])(
               'h4',
               null,
               props.title
            ),
            Object(preact_min["h"])(
               'div',
               { 'class': 'text-gray d-inline' },
               props.location
            ),
            Object(preact_min["h"])(
               'div',
               { 'class': 'text-gray d-inline mx-2' },
               props.date
            )
         )
      )
   );
};

/* harmony default export */ var Chronicle_ChronicleCard = (ChronicleCard_ChronicleCard);
// CONCATENATED MODULE: ./routes/Chronicle/ChronicleModal.js






// add a new item to chronicle

var ChronicleModal__ref = Object(preact_min["h"])(
   'div',
   { 'class': 'text-center text-gray', style: 'font-size:smaller;' },
   '- Scroll down to see a preview -'
);

var ChronicleModal_ChronicleModal = function ChronicleModal(props) {
   var modalClasses = classnames_default()("modal", "modal-lg", { "active": props.showModal }, { "has-error": props.modalError });

   var errorHint = classnames_default()("form-input-hint", "float-left", { "d-hide": !props.modalError });

   var width = window.innerWidth || document.documentElement.clientWidth || document.body.client.width;

   return Object(preact_min["h"])(
      'div',
      { 'class': modalClasses },
      Object(preact_min["h"])('a', { onClick: props.hideModal,
         'class': 'modal-overlay',
         'aria-label': 'Close'
      }),
      Object(preact_min["h"])(
         'div',
         { 'class': 'modal-container' },
         Object(preact_min["h"])(
            'div',
            { 'class': 'modal-header' },
            Object(preact_min["h"])('a', { onClick: props.hideModal,
               'class': 'btn btn-clear float-right',
               'aria-label': 'Close'
            }),
            Object(preact_min["h"])(
               'div',
               { 'class': 'modal-title h5' },
               'Add Something to ',
               props.name,
               '\'s Chronicle'
            ),
            width < 840 && ChronicleModal__ref
         ),
         Object(preact_min["h"])(
            'div',
            { 'class': 'modal-body' },
            Object(preact_min["h"])(
               'div',
               { 'class': width < 840 ? "content" : "content container columns" },
               Object(preact_min["h"])(
                  'form',
                  { 'class': width < 840 ? "form-group" : "form-group column col-5" },
                  Object(preact_min["h"])(form_inputs_TextInput, {
                     label: 'Title',
                     name: 'title',
                     value: props.title,
                     onInput: props.onChange
                  }),
                  Object(preact_min["h"])(form_inputs_TextInput, {
                     label: 'Location',
                     name: 'location',
                     value: props.location,
                     onInput: props.onChange
                  }),
                  Object(preact_min["h"])(form_inputs_DateInput, {
                     label: 'Date',
                     name: 'date',
                     value: props.date,
                     onChange: props.onChange
                  }),
                  Object(preact_min["h"])(
                     'label',
                     {
                        'class': 'form-label'
                     },
                     'Add a photo',
                     Object(preact_min["h"])('input', {
                        'class': 'form-input',
                        type: 'file',
                        accept: '.jpg, .jpeg, .png',
                        value: props.file,
                        onChange: props.onFileChange
                     })
                  ),
                  Object(preact_min["h"])(
                     'button',
                     {
                        'class': width < 840 ? "btn" : "btn float-right",
                        onClick: props.clearModalFields
                     },
                     'Clear fields'
                  )
               ),
               Object(preact_min["h"])(
                  'div',
                  { 'class': width < 840 ? "" : "column col-7" },
                  Object(preact_min["h"])(Chronicle_ChronicleCard, {
                     title: props.title,
                     location: props.location,
                     date: props.date,
                     src: props.src,
                     style: true
                  })
               )
            )
         ),
         Object(preact_min["h"])(
            'div',
            { 'class': 'modal-footer' },
            Object(preact_min["h"])(
               'p',
               { 'class': errorHint },
               'Every post needs a title and date'
            ),
            Object(preact_min["h"])(
               'button',
               {
                  'class': 'btn btn-primary',
                  onClick: props.postChronicle
               },
               'Add'
            )
         )
      )
   );
};

/* harmony default export */ var Chronicle_ChronicleModal = (ChronicleModal_ChronicleModal);
// CONCATENATED MODULE: ./routes/Chronicle/AddSomethingBtn.js



var AddSomethingBtn__ref = Object(preact_min["h"])(
   "button",
   {
      "class": "circle btn btn-primary float-right tooltip tooltip-left dropdown-toggle",
      "tab-index": "0",
      "data-tooltip": "Add Something"
   },
   Object(preact_min["h"])("i", { "class": "icon icon-plus" })
);

var AddSomethingBtn_AddSomethingBtn = function AddSomethingBtn(props) {
   return Object(preact_min["h"])(
      "div",
      { "class": "dropdown d-block " + Chronicle_style_default.a.AddSomething },
      AddSomethingBtn__ref,
      Object(preact_min["h"])(
         "ul",
         { "class": "menu d-block",
            style: "top:40px;left:unset;right:0px;"
         },
         Object(preact_min["h"])(
            "li",
            { "class": "menu-item" },
            Object(preact_min["h"])(
               "a",
               { onClick: props.showModal },
               "Visual Artifact"
            )
         ),
         Object(preact_min["h"])(
            "li",
            { "class": "menu-item" },
            Object(preact_min["h"])(
               "a",
               { onClick: props.showWrittenModal },
               "Written Artifact"
            )
         )
      )
   );
};

/* harmony default export */ var Chronicle_AddSomethingBtn = (AddSomethingBtn_AddSomethingBtn);
// CONCATENATED MODULE: ./routes/Chronicle/AddWrittenModal.js


function AddWrittenModal__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AddWrittenModal__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function AddWrittenModal__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







// add a new item to chronicle

var AddWrittenModal__ref = Object(preact_min["h"])(
   'label',
   { 'class': 'form-label' },
   'Markdown'
);

var AddWrittenModal_AddWrittenModal = function (_Component) {
   AddWrittenModal__inherits(AddWrittenModal, _Component);

   function AddWrittenModal(props) {
      AddWrittenModal__classCallCheck(this, AddWrittenModal);

      var _this = AddWrittenModal__possibleConstructorReturn(this, _Component.call(this, props));

      _this.state = {
         modalError: false,

         title: '',
         date: '',
         text: '',
         html: ''
      };

      _this.onChange = function (e) {
         var _this$setState;

         _this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState));
      };

      _this.clearData = function () {
         _this.setState({
            title: '',
            date: '',
            text: ''
         });
      };

      _this.postWrittenChronicle = function () {
         // handle errors
         if (!(_this.state.title && _this.state.date)) {
            _this.setState({ modalError: true });
            return;
         }
         _this.setState({ modalError: false });

         // NOTE - this whole thing feels like a hack as the fetch call
         // is basically repeated. look into async/await or a promise.

         // EDIT URL BELOW
         fetch(api + "!postWrittenChronicle?" + _this.props.urlNm, {
            method: "POST",
            body: JSON.stringify({
               title: _this.state.title,
               date: _this.state.date,
               txt: _this.state.text
            })
         }).then(function (res) {
            return res.json();
         }).then(function (json) {
            console.log(json);
            // UPDATE TIMELINE STATE HERE
            // NOTE - this may not be necessary, as new entries
            // will likely go into a holding container to await
            // editing/approval by shrine moderator
            // this.refs.timeline.addItem(json);
            _this.props.addItem(json);
         }).then(_this.clearData());

         _this.props.hideModal();
      };

      marked_default.a.setOptions({
         sanitize: true
      });
      return _this;
   }

   AddWrittenModal.prototype.render = function render(props) {
      var modalClasses = classnames_default()("modal", "modal-lg", { "active": props.showWrittenModal }, { "has-error": props.modalError });

      var errorHint = classnames_default()("form-input-hint", "float-left", { "d-hide": !props.modalError });

      return Object(preact_min["h"])(
         'div',
         { 'class': modalClasses },
         Object(preact_min["h"])('a', { onClick: props.hideModal,
            'class': 'modal-overlay',
            'aria-label': 'Close'
         }),
         Object(preact_min["h"])(
            'div',
            { 'class': 'modal-container' },
            Object(preact_min["h"])(
               'div',
               { 'class': 'modal-header' },
               Object(preact_min["h"])('a', { onClick: props.hideModal,
                  'class': 'btn btn-clear float-right',
                  'aria-label': 'Close'
               }),
               Object(preact_min["h"])(
                  'div',
                  { 'class': 'modal-title h5' },
                  'Add Something to ',
                  props.name,
                  '\'s Chronicle'
               )
            ),
            Object(preact_min["h"])(
               'div',
               { 'class': 'modal-body' },
               Object(preact_min["h"])(
                  'div',
                  { 'class': 'content container columns' },
                  Object(preact_min["h"])(
                     'div',
                     { 'class': 'card column col-7' },
                     Object(preact_min["h"])('div', { 'class': 'card-body',
                        dangerouslySetInnerHTML: { __html: marked_default()(this.state.text) }
                     })
                  ),
                  Object(preact_min["h"])(
                     'form',
                     { 'class': 'form-group column col-5' },
                     Object(preact_min["h"])(form_inputs_TextInput, {
                        label: 'Title',
                        name: 'title',
                        value: this.state.title,
                        onChange: this.onChange
                     }),
                     Object(preact_min["h"])(form_inputs_DateInput, {
                        label: 'Date',
                        name: 'date',
                        value: this.state.date,
                        onChange: this.onChange
                     }),
                     AddWrittenModal__ref,
                     Object(preact_min["h"])('textarea', {
                        'class': 'form-input',
                        rows: '12',
                        name: 'text',
                        value: this.state.text,
                        onInput: this.onChange
                     })
                  )
               )
            ),
            Object(preact_min["h"])(
               'div',
               { 'class': 'modal-footer' },
               Object(preact_min["h"])(
                  'p',
                  { 'class': errorHint },
                  'Every post needs a title and date'
               ),
               Object(preact_min["h"])(
                  'button',
                  {
                     'class': 'btn',
                     onClick: this.clearData
                  },
                  'Clear'
               ),
               Object(preact_min["h"])(
                  'button',
                  {
                     'class': 'btn btn-primary mx-2',
                     onClick: this.postWrittenChronicle
                  },
                  'Add'
               )
            )
         )
      );
   };

   return AddWrittenModal;
}(preact_min["Component"]);

/* harmony default export */ var Chronicle_AddWrittenModal = (AddWrittenModal_AddWrittenModal);
// CONCATENATED MODULE: ./routes/Chronicle/index.js


function Chronicle__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Chronicle__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Chronicle__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





// API


// generic components



// route specific components






var Chronicle__ref = Object(preact_min["h"])('i', { 'class': 'icon icon-arrow-left' });

var Chronicle__ref2 = Object(preact_min["h"])('i', { 'class': 'icon icon-arrow-right' });

var Chronicle_Chronicle = function (_Component) {
   Chronicle__inherits(Chronicle, _Component);

   function Chronicle() {
      var _temp, _this, _ret;

      Chronicle__classCallCheck(this, Chronicle);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
         args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = Chronicle__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
         showModal: false,
         showWrittenModal: false,
         modalError: false,

         // modal fields
         title: '',
         // subtitle: '',
         location: '',
         date: '',
         // txt: '',    // description
         file: '', // image file
         src: '', // image file url, for preview

         nm: '',
         nm1: '',
         nm2: '',
         nm3: '',
         // avatar image url
         avatar: '',
         born: '',
         died: '',
         // timeline data
         currentItem: {},
         items: []
      }, _this.onChange = function (e) {
         var _this$setState;

         _this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState));
      }, _this.onFileChange = function (e) {
         // console.log(e);
         _this.setState({ file: e.target.files[0] });
         _this.makeFileURL();
      }, _this.makeFileURL = function () {
         var reader = new FileReader();

         reader.onload = function (e) {
            _this.setState({ src: e.target.result });
         };

         reader.readAsDataURL(_this.state.file);
      }, _this.postChronicle = function () {
         // handle errors
         if (!(_this.state.title && _this.state.date)) {
            _this.setState({ modalError: true });
            return;
         }
         _this.setState({ modalError: false });

         // NOTE - this whole thing feels like a hack as the fetch call
         // is basically repeated. look into async/await or a promise.
         _this.hideModal();

         // if there's an image to upload...
         if (_this.state.file) {

            var reader = new FileReader();

            reader.onload = function (e) {
               // NOTE - must remove padding for picolisp
               //
               // base64 strings are padded with one or two '='s to make sure it aligns
               // to proper byte boundaries. the picolisp server does not handle this 
               // well. so we must remove any padding before it is sent. after picolisp
               // has parsed the http request, we can add the appropriate padding back
               // to the string by checking if it is an even multiple of 4.
               //
               // see 'server.l' for the picolisp side.
               //
               // NOTE - turns out that we don't need to add padding back on the server
               // as the base64 utility is still able to decode.

               // base64 string without padding
               var str = e.target.result.split('=')[0];

               fetch(api + "!postChronicle?" + _this.props.urlNm, {
                  method: "POST",
                  body: JSON.stringify({
                     title: _this.state.title,
                     subtitle: _this.state.subtitle,
                     location: _this.state.location,
                     date: _this.state.date,
                     txt: _this.state.txt,
                     image: str
                  })
               }).then(function (res) {
                  return res.json();
               }).then(function (json) {
                  console.log(json);
                  // UPDATE TIMELINE STATE HERE
                  // NOTE - this may not be necessary, as new entries
                  // will likely go into a holding container to await
                  // editing/approval by shrine moderator
                  // this.refs.timeline.addItem(json);
                  _this.addItem(json);
               }).then(_this.setState({
                  title: '',
                  subtitle: '',
                  location: '',
                  date: '',
                  txt: '',
                  file: ''
               }));
            };

            reader.readAsDataURL(_this.state.file);
         } else {

            // EDIT URL BELOW
            fetch(api + "!postChronicle?" + _this.props.urlNm, {
               method: "POST",
               body: JSON.stringify({
                  title: _this.state.title,
                  subtitle: _this.state.subtitle,
                  location: _this.state.location,
                  date: _this.state.date,
                  txt: _this.state.txt
               })
            }).then(function (res) {
               return res.json();
            }).then(function (json) {
               console.log(json);
               // UPDATE TIMELINE STATE HERE
               // NOTE - this may not be necessary, as new entries
               // will likely go into a holding container to await
               // editing/approval by shrine moderator
               // this.refs.timeline.addItem(json);
               _this.addItem(json);
            }).then(_this.setState({
               title: '',
               subtitle: '',
               location: '',
               date: '',
               txt: '',
               file: ''
            }));
         }
      }, _this.addItem = function (item) {
         _this.refs.timeline.addItem(item);
         var newState = [].concat(_this.state.items, [item]);
         var sortedState = newState.sort(function (a, b) {
            return parseInt(a.start.split("-").join("")) - parseInt(b.start.split("-").join(""));
         });
         _this.setState({ items: sortedState, currentItem: item });
      }, _this.changeItem = function (id) {
         var current = _this.state.items.find(function (x) {
            return x.id === id;
         });
         _this.setState({ currentItem: current });
      }, _this.clearModalFields = function (e) {
         e.preventDefault();
         _this.setState({
            title: '',
            location: '',
            date: '',
            file: '',
            src: ''
         });
      }, _this.showModal = function () {
         _this.setState({ showModal: true });
      }, _this.showWrittenModal = function () {
         _this.setState({ showWrittenModal: true });
      }, _this.hideModal = function () {
         _this.setState({
            showModal: false,
            showWrittenModal: false,
            modalError: false
         });
      }, _this.prevItem = function () {
         var index = _this.state.items.indexOf(_this.state.currentItem);
         // make sure it's not the first item in array
         if (!(index === 0)) {
            _this.setState({ currentItem: _this.state.items[index - 1] });
            _this.refs.timeline.selectItem(_this.state.currentItem);
         }
      }, _this.nextItem = function () {
         var length = _this.state.items.length;
         var index = _this.state.items.indexOf(_this.state.currentItem);
         if (!(index === length - 1)) {
            _this.setState({ currentItem: _this.state.items[index + 1] });
            _this.refs.timeline.selectItem(_this.state.currentItem);
         }
      }, _temp), Chronicle__possibleConstructorReturn(_this, _ret);
   }

   Chronicle.prototype.componentDidMount = function componentDidMount() {
      var _this2 = this;

      // fetch chronicle items
      fetch(api + "!getChronicle?" + this.props.urlStr + "&" + this.props.urlNm).then(function (res) {
         return res.json();
      }).then(function (json) {
         // sort items by date, earliest first
         var sorted = json.items.sort(function (a, b) {
            return parseInt(a.start.split("-").join("")) - parseInt(b.start.split("-").join(""));
         });
         _this2.setState({
            items: sorted,
            currentItem: sorted[0],

            nm: json.nm,
            nm1: json.nm1,
            nm2: json.nm2,
            nm3: json.nm3,
            avatar: json.avatar,
            born: json.born,
            died: json.died
         });
      });
   };

   // Note: `user` comes from the URL, courtesy of our router
   Chronicle.prototype.render = function render(props, state) {
      var _this3 = this;

      return Object(preact_min["h"])(components_GridContainer, {
         avatarColumn: Object(preact_min["h"])(components_AvatarRail, {
            firstName: this.state.nm1,
            urlNm: props.urlNm,
            urlStr: props.urlStr,
            avatar: this.state.avatar
         }),

         contentColumn: Object(preact_min["h"])(
            'div',
            { 'class': Chronicle_style_default.a.ContentColumnContainer },
            Object(preact_min["h"])(Chronicle_ChronicleCard, { 'class': 'column', stylesheet: true,
               title: this.state.currentItem.title,
               location: this.state.currentItem.location,
               date: this.state.currentItem.start,
               src: this.state.currentItem.src,
               txt: this.state.currentItem.txt
            }),
            Object(preact_min["h"])(Chronicle_AddSomethingBtn, {
               showModal: this.showModal,
               showWrittenModal: this.showWrittenModal
            }),
            Object(preact_min["h"])(
               'button',
               {
                  'class': "circle btn " + Chronicle_style_default.a.LeftArrow,
                  onClick: this.prevItem
               },
               Chronicle__ref
            ),
            Object(preact_min["h"])(
               'button',
               {
                  'class': "circle btn float-right " + Chronicle_style_default.a.RightArrow,
                  onClick: this.nextItem
               },
               Chronicle__ref2
            ),
            Object(preact_min["h"])(TimeLine_TimeLine, {
               ref: this.linkRef('timeline'),
               data: this.state.items,
               born: this.state.born.split("-")[0],
               changeItem: this.changeItem
            }),
            Object(preact_min["h"])(Chronicle_ChronicleModal, {
               showModal: this.state.showModal,
               hideModal: this.hideModal,
               modalError: this.state.modalError,

               name: this.state.nm1,

               onChange: this.onChange,
               onFileChange: this.onFileChange,

               title: this.state.title,
               subtitle: this.state.subtitle,
               location: this.state.location,
               date: this.state.date,
               txt: this.state.txt,
               file: this.state.file,
               src: this.state.src,

               postChronicle: this.postChronicle,
               clearModalFields: this.clearModalFields
            }),
            Object(preact_min["h"])(Chronicle_AddWrittenModal, {
               showWrittenModal: this.state.showWrittenModal,
               hideModal: this.hideModal,
               name: this.state.nm1,
               addItem: function addItem(item) {
                  return _this3.addItem(item);
               },
               urlNm: props.urlNm
            })
         )
      });
   };

   return Chronicle;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















// public shrines




// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

if (false) {
   require('preact/debug');
}

// routes requiring auth
var UserWithAuth = components_withAuth(user_User);
var CreateShrineWithAuth = components_withAuth(create_shrine);
var ManageMemorialWithAuth = components_withAuth(routes_ManageMemorial);

var app__ref = Object(preact_min["h"])(Home, { path: '/' });

var app__ref2 = Object(preact_min["h"])(routes_Login, { path: '/login' });

var app__ref3 = Object(preact_min["h"])(signup, { path: '/signup' });

var app__ref4 = Object(preact_min["h"])(Entry_Entry, { path: '/:urlStr/:urlNm' });

var app__ref5 = Object(preact_min["h"])(Shrine_Shrine, { path: '/:urlStr/:urlNm/shrine' });

var app__ref6 = Object(preact_min["h"])(Chronicle_Chronicle, { path: '/:urlStr/:urlNm/chronicle' });

var app__ref7 = Object(preact_min["h"])(Atlas_Atlas, { path: '/:urlStr/:urlNm/atlas' });

var app_App = function (_Component) {
   app__inherits(App, _Component);

   function App() {
      var _temp, _this, _ret;

      app__classCallCheck(this, App);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
         args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
         user: {}
         /** Gets fired when the route changes.
         *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
         *	@param {string} event.url	The newly routed URL
         */
      }, _this.handleRoute = function (e) {
         _this.currentUrl = e.url;
      }, _this.setUserData = function (user) {
         _this.setState({ user: user });
      }, _temp), app__possibleConstructorReturn(_this, _ret);
   }

   App.prototype.render = function render() {
      var _this2 = this;

      return Object(preact_min["h"])(
         'div',
         { id: 'app' },
         Object(preact_min["h"])(header, { isLoggedIn: this.state.user.email ? true : false, name: this.state.user.name || this.state.user.email }),
         Object(preact_min["h"])(
            preact_router_es["Router"],
            { onChange: this.handleRoute },
            app__ref,
            app__ref2,
            app__ref3,
            Object(preact_min["h"])(CreateShrineWithAuth, { path: '/create-shrine',
               setUserData: function setUserData(user) {
                  return _this2.setUserData(user);
               },
               user: this.state.user
            }),
            app__ref4,
            app__ref5,
            app__ref6,
            app__ref7,
            Object(preact_min["h"])(UserWithAuth, { path: '/user',
               setUserData: function setUserData(user) {
                  return _this2.setUserData(user);
               },
               user: this.state.user
            }),
            Object(preact_min["h"])(ManageMemorialWithAuth, {
               path: '/user/manage-memorial/:urlNm',
               user: this.state.user,
               setUserData: function setUserData(user) {
                  return _this2.setUserData(user);
               }
            })
         )
      );
   };

   return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js












/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KGu6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFQDN;

var _assertString = __webpack_require__("d3m2");

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__("hxfi");

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFQDN(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  var parts = str.split('.');
  if (options.require_tld) {
    var tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
    // disallow spaces
    if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
      return false;
    }
  }
  for (var part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink\:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "Rdqd":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "SDRd":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Zoy9":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "cUJj":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"gridContainer":"gridContainer__3MQ5X","avatarColumn":"avatarColumn__3AYMn","contentColumn":"contentColumn__2un7q"};

/***/ }),

/***/ "d3m2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];

/***/ }),

/***/ "hxfi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports['default'];

/***/ }),

/***/ "jY1m":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

exports.default = isByteLength;

var _assertString = __webpack_require__("d3m2");

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString2.default)(str);
  var min = void 0;
  var max = void 0;
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports['default'];

/***/ }),

/***/ "kAHu":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "keCY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * vis.js
 * https://github.com/almende/vis
 *
 * A dynamic, browser-based visualization library.
 *
 * @version 4.21.0
 * @date    2017-10-12
 *
 * @license
 * Copyright (C) 2011-2017 Almende B.V, http://almende.com
 *
 * Vis.js is dual licensed under both
 *
 * * The Apache 2.0 License
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * and
 *
 * * The MIT License
 *   http://opensource.org/licenses/MIT
 *
 * Vis.js may be distributed under either license.
 */

!function (t, e) {
   true ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.vis = e() : t.vis = e();
}(this, function () {
  return function (t) {
    function e(o) {
      if (i[o]) return i[o].exports;var n = i[o] = { i: o, l: !1, exports: {} };return t[o].call(n.exports, n, n.exports, e), n.l = !0, n.exports;
    }var i = {};return e.m = t, e.c = i, e.d = function (t, i, o) {
      e.o(t, i) || Object.defineProperty(t, i, { configurable: !1, enumerable: !0, get: o });
    }, e.n = function (t) {
      var i = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };return e.d(i, "a", i), i;
    }, e.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 85);
  }([function (t, e, i) {
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }function n(t, e, i, o) {
      var n = !1;!0 === o && (n = null === e[i] && void 0 !== t[i]), n ? delete t[i] : t[i] = e[i];
    }var s = i(86),
        r = o(s),
        a = i(43),
        h = o(a),
        d = i(4),
        l = o(d),
        u = i(1),
        p = o(u),
        c = i(3),
        m = i(126);e.isNumber = function (t) {
      return t instanceof Number || "number" == typeof t;
    }, e.recursiveDOMDelete = function (t) {
      if (t) for (; !0 === t.hasChildNodes();) {
        e.recursiveDOMDelete(t.firstChild), t.removeChild(t.firstChild);
      }
    }, e.giveRange = function (t, e, i, o) {
      if (e == t) return .5;var n = 1 / (e - t);return Math.max(0, (o - t) * n);
    }, e.isString = function (t) {
      return t instanceof String || "string" == typeof t;
    }, e.isDate = function (t) {
      if (t instanceof Date) return !0;if (e.isString(t)) {
        if (f.exec(t)) return !0;if (!isNaN(Date.parse(t))) return !0;
      }return !1;
    }, e.randomUUID = function () {
      return m.v4();
    }, e.assignAllKeys = function (t, e) {
      for (var i in t) {
        t.hasOwnProperty(i) && "object" !== (0, p.default)(t[i]) && (t[i] = e);
      }
    }, e.fillIfDefined = function (t, i) {
      var o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];for (var s in t) {
        void 0 !== i[s] && (null === i[s] || "object" !== (0, p.default)(i[s]) ? n(t, i, s, o) : "object" === (0, p.default)(t[s]) && e.fillIfDefined(t[s], i[s], o));
      }
    }, e.extend = function (t, e) {
      for (var i = 1; i < arguments.length; i++) {
        var o = arguments[i];for (var n in o) {
          o.hasOwnProperty(n) && (t[n] = o[n]);
        }
      }return t;
    }, e.selectiveExtend = function (t, e, i) {
      if (!Array.isArray(t)) throw new Error("Array with property names expected as first argument");for (var o = 2; o < arguments.length; o++) {
        for (var n = arguments[o], s = 0; s < t.length; s++) {
          var r = t[s];n && n.hasOwnProperty(r) && (e[r] = n[r]);
        }
      }return e;
    }, e.selectiveDeepExtend = function (t, i, o) {
      var s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];if (Array.isArray(o)) throw new TypeError("Arrays are not supported by deepExtend");for (var r = 0; r < t.length; r++) {
        var a = t[r];if (o.hasOwnProperty(a)) if (o[a] && o[a].constructor === Object) void 0 === i[a] && (i[a] = {}), i[a].constructor === Object ? e.deepExtend(i[a], o[a], !1, s) : n(i, o, a, s);else {
          if (Array.isArray(o[a])) throw new TypeError("Arrays are not supported by deepExtend");n(i, o, a, s);
        }
      }return i;
    }, e.selectiveNotDeepExtend = function (t, i, o) {
      var s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];if (Array.isArray(o)) throw new TypeError("Arrays are not supported by deepExtend");for (var r in o) {
        if (o.hasOwnProperty(r) && -1 === t.indexOf(r)) if (o[r] && o[r].constructor === Object) void 0 === i[r] && (i[r] = {}), i[r].constructor === Object ? e.deepExtend(i[r], o[r]) : n(i, o, r, s);else if (Array.isArray(o[r])) {
          i[r] = [];for (var a = 0; a < o[r].length; a++) {
            i[r].push(o[r][a]);
          }
        } else n(i, o, r, s);
      }return i;
    }, e.deepExtend = function (t, i) {
      var o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];for (var r in i) {
        if (i.hasOwnProperty(r) || !0 === o) if (i[r] && i[r].constructor === Object) void 0 === t[r] && (t[r] = {}), t[r].constructor === Object ? e.deepExtend(t[r], i[r], o) : n(t, i, r, s);else if (Array.isArray(i[r])) {
          t[r] = [];for (var a = 0; a < i[r].length; a++) {
            t[r].push(i[r][a]);
          }
        } else n(t, i, r, s);
      }return t;
    }, e.equalArray = function (t, e) {
      if (t.length != e.length) return !1;for (var i = 0, o = t.length; i < o; i++) {
        if (t[i] != e[i]) return !1;
      }return !0;
    }, e.convert = function (t, i) {
      var o;if (void 0 !== t) {
        if (null === t) return null;if (!i) return t;if ("string" != typeof i && !(i instanceof String)) throw new Error("Type must be a string");switch (i) {case "boolean":case "Boolean":
            return Boolean(t);case "number":case "Number":
            return e.isString(t) && !isNaN(Date.parse(t)) ? c(t).valueOf() : Number(t.valueOf());case "string":case "String":
            return String(t);case "Date":
            if (e.isNumber(t)) return new Date(t);if (t instanceof Date) return new Date(t.valueOf());if (c.isMoment(t)) return new Date(t.valueOf());if (e.isString(t)) return o = f.exec(t), o ? new Date(Number(o[1])) : c(new Date(t)).toDate();throw new Error("Cannot convert object of type " + e.getType(t) + " to type Date");case "Moment":
            if (e.isNumber(t)) return c(t);if (t instanceof Date) return c(t.valueOf());if (c.isMoment(t)) return c(t);if (e.isString(t)) return o = f.exec(t), c(o ? Number(o[1]) : t);throw new Error("Cannot convert object of type " + e.getType(t) + " to type Date");case "ISODate":
            if (e.isNumber(t)) return new Date(t);if (t instanceof Date) return t.toISOString();if (c.isMoment(t)) return t.toDate().toISOString();if (e.isString(t)) return o = f.exec(t), o ? new Date(Number(o[1])).toISOString() : c(t).format();throw new Error("Cannot convert object of type " + e.getType(t) + " to type ISODate");case "ASPDate":
            if (e.isNumber(t)) return "/Date(" + t + ")/";if (t instanceof Date) return "/Date(" + t.valueOf() + ")/";if (e.isString(t)) {
              o = f.exec(t);return "/Date(" + (o ? new Date(Number(o[1])).valueOf() : new Date(t).valueOf()) + ")/";
            }throw new Error("Cannot convert object of type " + e.getType(t) + " to type ASPDate");default:
            throw new Error('Unknown type "' + i + '"');}
      }
    };var f = /^\/?Date\((\-?\d+)/i;e.getType = function (t) {
      var e = void 0 === t ? "undefined" : (0, p.default)(t);return "object" == e ? null === t ? "null" : t instanceof Boolean ? "Boolean" : t instanceof Number ? "Number" : t instanceof String ? "String" : Array.isArray(t) ? "Array" : t instanceof Date ? "Date" : "Object" : "number" == e ? "Number" : "boolean" == e ? "Boolean" : "string" == e ? "String" : void 0 === e ? "undefined" : e;
    }, e.copyAndExtendArray = function (t, e) {
      for (var i = [], o = 0; o < t.length; o++) {
        i.push(t[o]);
      }return i.push(e), i;
    }, e.copyArray = function (t) {
      for (var e = [], i = 0; i < t.length; i++) {
        e.push(t[i]);
      }return e;
    }, e.getAbsoluteLeft = function (t) {
      return t.getBoundingClientRect().left;
    }, e.getAbsoluteRight = function (t) {
      return t.getBoundingClientRect().right;
    }, e.getAbsoluteTop = function (t) {
      return t.getBoundingClientRect().top;
    }, e.addClassName = function (t, e) {
      var i = t.className.split(" "),
          o = e.split(" ");i = i.concat(o.filter(function (t) {
        return i.indexOf(t) < 0;
      })), t.className = i.join(" ");
    }, e.removeClassName = function (t, e) {
      var i = t.className.split(" "),
          o = e.split(" ");i = i.filter(function (t) {
        return o.indexOf(t) < 0;
      }), t.className = i.join(" ");
    }, e.forEach = function (t, e) {
      var i, o;if (Array.isArray(t)) for (i = 0, o = t.length; i < o; i++) {
        e(t[i], i, t);
      } else for (i in t) {
        t.hasOwnProperty(i) && e(t[i], i, t);
      }
    }, e.toArray = function (t) {
      var e = [];for (var i in t) {
        t.hasOwnProperty(i) && e.push(t[i]);
      }return e;
    }, e.updateProperty = function (t, e, i) {
      return t[e] !== i && (t[e] = i, !0);
    }, e.throttle = function (t) {
      var e = !1;return function () {
        e || (e = !0, requestAnimationFrame(function () {
          e = !1, t();
        }));
      };
    }, e.addEventListener = function (t, e, i, o) {
      t.addEventListener ? (void 0 === o && (o = !1), "mousewheel" === e && navigator.userAgent.indexOf("Firefox") >= 0 && (e = "DOMMouseScroll"), t.addEventListener(e, i, o)) : t.attachEvent("on" + e, i);
    }, e.removeEventListener = function (t, e, i, o) {
      t.removeEventListener ? (void 0 === o && (o = !1), "mousewheel" === e && navigator.userAgent.indexOf("Firefox") >= 0 && (e = "DOMMouseScroll"), t.removeEventListener(e, i, o)) : t.detachEvent("on" + e, i);
    }, e.preventDefault = function (t) {
      t || (t = window.event), t.preventDefault ? t.preventDefault() : t.returnValue = !1;
    }, e.getTarget = function (t) {
      t || (t = window.event);var e;return t.target ? e = t.target : t.srcElement && (e = t.srcElement), void 0 != e.nodeType && 3 == e.nodeType && (e = e.parentNode), e;
    }, e.hasParent = function (t, e) {
      for (var i = t; i;) {
        if (i === e) return !0;i = i.parentNode;
      }return !1;
    }, e.option = {}, e.option.asBoolean = function (t, e) {
      return "function" == typeof t && (t = t()), null != t ? 0 != t : e || null;
    }, e.option.asNumber = function (t, e) {
      return "function" == typeof t && (t = t()), null != t ? Number(t) || e || null : e || null;
    }, e.option.asString = function (t, e) {
      return "function" == typeof t && (t = t()), null != t ? String(t) : e || null;
    }, e.option.asSize = function (t, i) {
      return "function" == typeof t && (t = t()), e.isString(t) ? t : e.isNumber(t) ? t + "px" : i || null;
    }, e.option.asElement = function (t, e) {
      return "function" == typeof t && (t = t()), t || e || null;
    }, e.hexToRGB = function (t) {
      var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;t = t.replace(e, function (t, e, i, o) {
        return e + e + i + i + o + o;
      });var i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return i ? { r: parseInt(i[1], 16), g: parseInt(i[2], 16), b: parseInt(i[3], 16) } : null;
    }, e.overrideOpacity = function (t, i) {
      var o;return -1 != t.indexOf("rgba") ? t : -1 != t.indexOf("rgb") ? (o = t.substr(t.indexOf("(") + 1).replace(")", "").split(","), "rgba(" + o[0] + "," + o[1] + "," + o[2] + "," + i + ")") : (o = e.hexToRGB(t), null == o ? t : "rgba(" + o.r + "," + o.g + "," + o.b + "," + i + ")");
    }, e.RGBToHex = function (t, e, i) {
      return "#" + ((1 << 24) + (t << 16) + (e << 8) + i).toString(16).slice(1);
    }, e.parseColor = function (t) {
      var i;if (!0 === e.isString(t)) {
        if (!0 === e.isValidRGB(t)) {
          var o = t.substr(4).substr(0, t.length - 5).split(",").map(function (t) {
            return parseInt(t);
          });t = e.RGBToHex(o[0], o[1], o[2]);
        }if (!0 === e.isValidHex(t)) {
          var n = e.hexToHSV(t),
              s = { h: n.h, s: .8 * n.s, v: Math.min(1, 1.02 * n.v) },
              r = { h: n.h, s: Math.min(1, 1.25 * n.s), v: .8 * n.v },
              a = e.HSVToHex(r.h, r.s, r.v),
              h = e.HSVToHex(s.h, s.s, s.v);i = { background: t, border: a, highlight: { background: h, border: a }, hover: { background: h, border: a } };
        } else i = { background: t, border: t, highlight: { background: t, border: t }, hover: { background: t, border: t } };
      } else i = {}, i.background = t.background || void 0, i.border = t.border || void 0, e.isString(t.highlight) ? i.highlight = { border: t.highlight, background: t.highlight } : (i.highlight = {}, i.highlight.background = t.highlight && t.highlight.background || void 0, i.highlight.border = t.highlight && t.highlight.border || void 0), e.isString(t.hover) ? i.hover = { border: t.hover, background: t.hover } : (i.hover = {}, i.hover.background = t.hover && t.hover.background || void 0, i.hover.border = t.hover && t.hover.border || void 0);return i;
    }, e.RGBToHSV = function (t, e, i) {
      t /= 255, e /= 255, i /= 255;var o = Math.min(t, Math.min(e, i)),
          n = Math.max(t, Math.max(e, i));if (o == n) return { h: 0, s: 0, v: o };var s = t == o ? e - i : i == o ? t - e : i - t;return { h: 60 * ((t == o ? 3 : i == o ? 1 : 5) - s / (n - o)) / 360, s: (n - o) / n, v: n };
    };var g = { split: function split(t) {
        var e = {};return t.split(";").forEach(function (t) {
          if ("" != t.trim()) {
            var i = t.split(":"),
                o = i[0].trim(),
                n = i[1].trim();e[o] = n;
          }
        }), e;
      }, join: function join(t) {
        return (0, l.default)(t).map(function (e) {
          return e + ": " + t[e];
        }).join("; ");
      } };e.addCssText = function (t, i) {
      var o = g.split(t.style.cssText),
          n = g.split(i),
          s = e.extend(o, n);t.style.cssText = g.join(s);
    }, e.removeCssText = function (t, e) {
      var i = g.split(t.style.cssText),
          o = g.split(e);for (var n in o) {
        o.hasOwnProperty(n) && delete i[n];
      }t.style.cssText = g.join(i);
    }, e.HSVToRGB = function (t, e, i) {
      var o,
          n,
          s,
          r = Math.floor(6 * t),
          a = 6 * t - r,
          h = i * (1 - e),
          d = i * (1 - a * e),
          l = i * (1 - (1 - a) * e);switch (r % 6) {case 0:
          o = i, n = l, s = h;break;case 1:
          o = d, n = i, s = h;break;case 2:
          o = h, n = i, s = l;break;case 3:
          o = h, n = d, s = i;break;case 4:
          o = l, n = h, s = i;break;case 5:
          o = i, n = h, s = d;}return { r: Math.floor(255 * o), g: Math.floor(255 * n), b: Math.floor(255 * s) };
    }, e.HSVToHex = function (t, i, o) {
      var n = e.HSVToRGB(t, i, o);return e.RGBToHex(n.r, n.g, n.b);
    }, e.hexToHSV = function (t) {
      var i = e.hexToRGB(t);return e.RGBToHSV(i.r, i.g, i.b);
    }, e.isValidHex = function (t) {
      return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)
      );
    }, e.isValidRGB = function (t) {
      return t = t.replace(" ", ""), /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/i.test(t);
    }, e.isValidRGBA = function (t) {
      return t = t.replace(" ", ""), /rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(.{1,3})\)/i.test(t);
    }, e.selectiveBridgeObject = function (t, i) {
      if (null !== i && "object" === (void 0 === i ? "undefined" : (0, p.default)(i))) {
        for (var o = (0, h.default)(i), n = 0; n < t.length; n++) {
          i.hasOwnProperty(t[n]) && "object" == (0, p.default)(i[t[n]]) && (o[t[n]] = e.bridgeObject(i[t[n]]));
        }return o;
      }return null;
    }, e.bridgeObject = function (t) {
      if (null !== t && "object" === (void 0 === t ? "undefined" : (0, p.default)(t))) {
        var i = (0, h.default)(t);if (t instanceof Element) i = t;else {
          i = (0, h.default)(t);for (var o in t) {
            t.hasOwnProperty(o) && "object" == (0, p.default)(t[o]) && (i[o] = e.bridgeObject(t[o]));
          }
        }return i;
      }return null;
    }, e.insertSort = function (t, e) {
      for (var i = 0; i < t.length; i++) {
        for (var o = t[i], n = i; n > 0 && e(o, t[n - 1]) < 0; n--) {
          t[n] = t[n - 1];
        }t[n] = o;
      }return t;
    }, e.mergeOptions = function (t, e, i) {
      var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
          n = function n(t) {
        return null !== t && void 0 !== t;
      },
          s = function s(t) {
        return null !== t && "object" === (void 0 === t ? "undefined" : (0, p.default)(t));
      };if (!s(t)) throw new Error("Parameter mergeTarget must be an object");if (!s(e)) throw new Error("Parameter options must be an object");if (!n(i)) throw new Error("Parameter option must have a value");if (!s(o)) throw new Error("Parameter globalOptions must be an object");var r = e[i],
          a = s(o) && !function (t) {
        for (var e in t) {
          if (t.hasOwnProperty(e)) return !1;
        }return !0;
      }(o),
          d = a ? o[i] : void 0,
          l = d ? d.enabled : void 0;if (void 0 !== r) {
        if ("boolean" == typeof r) return s(t[i]) || (t[i] = {}), void (t[i].enabled = r);if (null === r && !s(t[i])) {
          if (!n(d)) return;t[i] = (0, h.default)(d);
        }if (s(r)) {
          var u = !0;void 0 !== r.enabled ? u = r.enabled : void 0 !== l && (u = d.enabled), function (t, e, i) {
            s(t[i]) || (t[i] = {});var o = e[i],
                n = t[i];for (var r in o) {
              o.hasOwnProperty(r) && (n[r] = o[r]);
            }
          }(t, e, i), t[i].enabled = u;
        }
      }
    }, e.binarySearchCustom = function (t, e, i, o) {
      for (var n = 0, s = 0, r = t.length - 1; s <= r && n < 1e4;) {
        var a = Math.floor((s + r) / 2),
            h = t[a],
            d = void 0 === o ? h[i] : h[i][o],
            l = e(d);if (0 == l) return a;-1 == l ? s = a + 1 : r = a - 1, n++;
      }return -1;
    }, e.binarySearchValue = function (t, e, i, o, n) {
      var s,
          r,
          a,
          h,
          d = 0,
          l = 0,
          u = t.length - 1;for (n = void 0 != n ? n : function (t, e) {
        return t == e ? 0 : t < e ? -1 : 1;
      }; l <= u && d < 1e4;) {
        if (h = Math.floor(.5 * (u + l)), s = t[Math.max(0, h - 1)][i], r = t[h][i], a = t[Math.min(t.length - 1, h + 1)][i], 0 == n(r, e)) return h;if (n(s, e) < 0 && n(r, e) > 0) return "before" == o ? Math.max(0, h - 1) : h;if (n(r, e) < 0 && n(a, e) > 0) return "before" == o ? h : Math.min(t.length - 1, h + 1);n(r, e) < 0 ? l = h + 1 : u = h - 1, d++;
      }return -1;
    }, e.easingFunctions = { linear: function linear(t) {
        return t;
      }, easeInQuad: function easeInQuad(t) {
        return t * t;
      }, easeOutQuad: function easeOutQuad(t) {
        return t * (2 - t);
      }, easeInOutQuad: function easeInOutQuad(t) {
        return t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1;
      }, easeInCubic: function easeInCubic(t) {
        return t * t * t;
      }, easeOutCubic: function easeOutCubic(t) {
        return --t * t * t + 1;
      }, easeInOutCubic: function easeInOutCubic(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      }, easeInQuart: function easeInQuart(t) {
        return t * t * t * t;
      }, easeOutQuart: function easeOutQuart(t) {
        return 1 - --t * t * t * t;
      }, easeInOutQuart: function easeInOutQuart(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      }, easeInQuint: function easeInQuint(t) {
        return t * t * t * t * t;
      }, easeOutQuint: function easeOutQuint(t) {
        return 1 + --t * t * t * t * t;
      }, easeInOutQuint: function easeInOutQuint(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
      } }, e.getScrollBarWidth = function () {
      var t = document.createElement("p");t.style.width = "100%", t.style.height = "200px";var e = document.createElement("div");e.style.position = "absolute", e.style.top = "0px", e.style.left = "0px", e.style.visibility = "hidden", e.style.width = "200px", e.style.height = "150px", e.style.overflow = "hidden", e.appendChild(t), document.body.appendChild(e);var i = t.offsetWidth;e.style.overflow = "scroll";var o = t.offsetWidth;return i == o && (o = e.clientWidth), document.body.removeChild(e), i - o;
    }, e.topMost = function (t, e) {
      var i = void 0;Array.isArray(e) || (e = [e]);var o = !0,
          n = !1,
          s = void 0;try {
        for (var a, h = (0, r.default)(t); !(o = (a = h.next()).done); o = !0) {
          var d = a.value;if (d) {
            i = d[e[0]];for (var l = 1; l < e.length; l++) {
              i && (i = i[e[l]]);
            }if (void 0 !== i) break;
          }
        }
      } catch (t) {
        n = !0, s = t;
      } finally {
        try {
          !o && h.return && h.return();
        } finally {
          if (n) throw s;
        }
      }return i;
    };
  }, function (t, e, i) {
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }e.__esModule = !0;var n = i(110),
        s = o(n),
        r = i(112),
        a = o(r),
        h = "function" == typeof a.default && "symbol" == typeof s.default ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof a.default && t.constructor === a.default && t !== a.default.prototype ? "symbol" : typeof t;
    };e.default = "function" == typeof a.default && "symbol" === h(s.default) ? function (t) {
      return void 0 === t ? "undefined" : h(t);
    } : function (t) {
      return t && "function" == typeof a.default && t.constructor === a.default && t !== a.default.prototype ? "symbol" : void 0 === t ? "undefined" : h(t);
    };
  }, function (t, e) {
    var i = t.exports = { version: "2.5.1" };"number" == typeof __e && (__e = i);
  }, function (t, e, i) {
    t.exports = "undefined" != typeof window && window.moment || i(123);
  }, function (t, e, i) {
    t.exports = { default: i(107), __esModule: !0 };
  }, function (t, e, i) {
    function o(t, e) {
      this.options = null, this.props = null;
    }var n = i(0);o.prototype.setOptions = function (t) {
      t && n.extend(this.options, t);
    }, o.prototype.redraw = function () {
      return !1;
    }, o.prototype.destroy = function () {}, o.prototype._isResized = function () {
      var t = this.props._previousWidth !== this.props.width || this.props._previousHeight !== this.props.height;return this.props._previousWidth = this.props.width, this.props._previousHeight = this.props.height, t;
    }, t.exports = o;
  }, function (t, e) {
    var i = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = i);
  }, function (t, e, i) {
    var o = i(40)("wks"),
        n = i(27),
        s = i(6).Symbol,
        r = "function" == typeof s;(t.exports = function (t) {
      return o[t] || (o[t] = r && s[t] || (r ? s : n)("Symbol." + t));
    }).store = o;
  }, function (t, e, i) {
    var o = i(18),
        n = i(57),
        s = i(36),
        r = Object.defineProperty;e.f = i(9) ? Object.defineProperty : function (t, e, i) {
      if (o(t), e = s(e, !0), o(i), n) try {
        return r(t, e, i);
      } catch (t) {}if ("get" in i || "set" in i) throw TypeError("Accessors not supported!");return "value" in i && (t[e] = i.value), t;
    };
  }, function (t, e, i) {
    t.exports = !i(19)(function () {
      return 7 != Object.defineProperty({}, "a", { get: function get() {
          return 7;
        } }).a;
    });
  }, function (t, e) {
    var i = {}.hasOwnProperty;t.exports = function (t, e) {
      return i.call(t, e);
    };
  }, function (t, e, i) {
    e.prepareElements = function (t) {
      for (var e in t) {
        t.hasOwnProperty(e) && (t[e].redundant = t[e].used, t[e].used = []);
      }
    }, e.cleanupElements = function (t) {
      for (var e in t) {
        if (t.hasOwnProperty(e) && t[e].redundant) {
          for (var i = 0; i < t[e].redundant.length; i++) {
            t[e].redundant[i].parentNode.removeChild(t[e].redundant[i]);
          }t[e].redundant = [];
        }
      }
    }, e.resetElements = function (t) {
      e.prepareElements(t), e.cleanupElements(t), e.prepareElements(t);
    }, e.getSVGElement = function (t, e, i) {
      var o;return e.hasOwnProperty(t) ? e[t].redundant.length > 0 ? (o = e[t].redundant[0], e[t].redundant.shift()) : (o = document.createElementNS("http://www.w3.org/2000/svg", t), i.appendChild(o)) : (o = document.createElementNS("http://www.w3.org/2000/svg", t), e[t] = { used: [], redundant: [] }, i.appendChild(o)), e[t].used.push(o), o;
    }, e.getDOMElement = function (t, e, i, o) {
      var n;return e.hasOwnProperty(t) ? e[t].redundant.length > 0 ? (n = e[t].redundant[0], e[t].redundant.shift()) : (n = document.createElement(t), void 0 !== o ? i.insertBefore(n, o) : i.appendChild(n)) : (n = document.createElement(t), e[t] = { used: [], redundant: [] }, void 0 !== o ? i.insertBefore(n, o) : i.appendChild(n)), e[t].used.push(n), n;
    }, e.drawPoint = function (t, i, o, n, s, r) {
      var a;if ("circle" == o.style ? (a = e.getSVGElement("circle", n, s), a.setAttributeNS(null, "cx", t), a.setAttributeNS(null, "cy", i), a.setAttributeNS(null, "r", .5 * o.size)) : (a = e.getSVGElement("rect", n, s), a.setAttributeNS(null, "x", t - .5 * o.size), a.setAttributeNS(null, "y", i - .5 * o.size), a.setAttributeNS(null, "width", o.size), a.setAttributeNS(null, "height", o.size)), void 0 !== o.styles && a.setAttributeNS(null, "style", o.styles), a.setAttributeNS(null, "class", o.className + " vis-point"), r) {
        var h = e.getSVGElement("text", n, s);r.xOffset && (t += r.xOffset), r.yOffset && (i += r.yOffset), r.content && (h.textContent = r.content), r.className && h.setAttributeNS(null, "class", r.className + " vis-label"), h.setAttributeNS(null, "x", t), h.setAttributeNS(null, "y", i);
      }return a;
    }, e.drawBar = function (t, i, o, n, s, r, a, h) {
      if (0 != n) {
        n < 0 && (n *= -1, i -= n);var d = e.getSVGElement("rect", r, a);d.setAttributeNS(null, "x", t - .5 * o), d.setAttributeNS(null, "y", i), d.setAttributeNS(null, "width", o), d.setAttributeNS(null, "height", n), d.setAttributeNS(null, "class", s), h && d.setAttributeNS(null, "style", h);
      }
    };
  }, function (t, e, i) {
    function o() {
      var t = function t() {};return { on: t, off: t, destroy: t, emit: t, get: function get(e) {
          return { set: t };
        } };
    }if ("undefined" != typeof window) {
      var n = i(130),
          s = window.Hammer || i(131);t.exports = n(s, { preventDefault: "mouse" });
    } else t.exports = function () {
      return o();
    };
  }, function (t, e, i) {
    var o = i(91),
        n = i(34);t.exports = function (t) {
      return o(n(t));
    };
  }, function (t, e, i) {
    var o = i(8),
        n = i(25);t.exports = i(9) ? function (t, e, i) {
      return o.f(t, e, n(1, i));
    } : function (t, e, i) {
      return t[e] = i, t;
    };
  }, function (t, e, i) {
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }function n(t, e) {
      if (t && !Array.isArray(t) && (e = t, t = null), this._options = e || {}, this._data = {}, this.length = 0, this._fieldId = this._options.fieldId || "id", this._type = {}, this._options.type) for (var i = (0, l.default)(this._options.type), o = 0, n = i.length; o < n; o++) {
        var s = i[o],
            r = this._options.type[s];this._type[s] = "Date" == r || "ISODate" == r || "ASPDate" == r ? "Date" : r;
      }this._subscribers = {}, t && this.add(t), this.setOptions(e);
    }var s = i(16),
        r = o(s),
        a = i(1),
        h = o(a),
        d = i(4),
        l = o(d),
        u = i(0),
        p = i(65);n.prototype.setOptions = function (t) {
      t && void 0 !== t.queue && (!1 === t.queue ? this._queue && (this._queue.destroy(), delete this._queue) : (this._queue || (this._queue = p.extend(this, { replace: ["add", "update", "remove"] })), "object" === (0, h.default)(t.queue) && this._queue.setOptions(t.queue)));
    }, n.prototype.on = function (t, e) {
      var i = this._subscribers[t];i || (i = [], this._subscribers[t] = i), i.push({ callback: e });
    }, n.prototype.off = function (t, e) {
      var i = this._subscribers[t];i && (this._subscribers[t] = i.filter(function (t) {
        return t.callback != e;
      }));
    }, n.prototype._trigger = function (t, e, i) {
      if ("*" == t) throw new Error("Cannot trigger event *");var o = [];t in this._subscribers && (o = o.concat(this._subscribers[t])), "*" in this._subscribers && (o = o.concat(this._subscribers["*"]));for (var n = 0, s = o.length; n < s; n++) {
        var r = o[n];r.callback && r.callback(t, e, i || null);
      }
    }, n.prototype.add = function (t, e) {
      var i,
          o = [],
          n = this;if (Array.isArray(t)) for (var s = 0, r = t.length; s < r; s++) {
        i = n._addItem(t[s]), o.push(i);
      } else {
        if (!t || "object" !== (void 0 === t ? "undefined" : (0, h.default)(t))) throw new Error("Unknown dataType");i = n._addItem(t), o.push(i);
      }return o.length && this._trigger("add", { items: o }, e), o;
    }, n.prototype.update = function (t, e) {
      var i = [],
          o = [],
          n = [],
          s = [],
          r = this,
          a = r._fieldId,
          d = function d(t) {
        var e = t[a];if (r._data[e]) {
          var h = u.extend({}, r._data[e]);e = r._updateItem(t), o.push(e), s.push(t), n.push(h);
        } else e = r._addItem(t), i.push(e);
      };if (Array.isArray(t)) for (var l = 0, p = t.length; l < p; l++) {
        t[l] && "object" === (0, h.default)(t[l]) ? d(t[l]) : console.warn("Ignoring input item, which is not an object at index " + l);
      } else {
        if (!t || "object" !== (void 0 === t ? "undefined" : (0, h.default)(t))) throw new Error("Unknown dataType");d(t);
      }if (i.length && this._trigger("add", { items: i }, e), o.length) {
        var c = { items: o, oldData: n, data: s };this._trigger("update", c, e);
      }return i.concat(o);
    }, n.prototype.get = function (t) {
      var e,
          i,
          o,
          n = this,
          s = u.getType(arguments[0]);"String" == s || "Number" == s ? (e = arguments[0], o = arguments[1]) : "Array" == s ? (i = arguments[0], o = arguments[1]) : o = arguments[0];var r;if (o && o.returnType) {
        r = -1 == ["Array", "Object"].indexOf(o.returnType) ? "Array" : o.returnType;
      } else r = "Array";var a,
          h,
          d,
          p,
          c,
          m = o && o.type || this._options.type,
          f = o && o.filter,
          g = [];if (void 0 != e) (a = n._getItem(e, m)) && f && !f(a) && (a = null);else if (void 0 != i) for (p = 0, c = i.length; p < c; p++) {
        a = n._getItem(i[p], m), f && !f(a) || g.push(a);
      } else for (h = (0, l.default)(this._data), p = 0, c = h.length; p < c; p++) {
        d = h[p], a = n._getItem(d, m), f && !f(a) || g.push(a);
      }if (o && o.order && void 0 == e && this._sort(g, o.order), o && o.fields) {
        var v = o.fields;if (void 0 != e) a = this._filterFields(a, v);else for (p = 0, c = g.length; p < c; p++) {
          g[p] = this._filterFields(g[p], v);
        }
      }if ("Object" == r) {
        var y,
            b = {};for (p = 0, c = g.length; p < c; p++) {
          y = g[p], b[y.id] = y;
        }return b;
      }return void 0 != e ? a : g;
    }, n.prototype.getIds = function (t) {
      var e,
          i,
          o,
          n,
          s,
          r = this._data,
          a = t && t.filter,
          h = t && t.order,
          d = t && t.type || this._options.type,
          u = (0, l.default)(r),
          p = [];if (a) {
        if (h) {
          for (s = [], e = 0, i = u.length; e < i; e++) {
            o = u[e], n = this._getItem(o, d), a(n) && s.push(n);
          }for (this._sort(s, h), e = 0, i = s.length; e < i; e++) {
            p.push(s[e][this._fieldId]);
          }
        } else for (e = 0, i = u.length; e < i; e++) {
          o = u[e], n = this._getItem(o, d), a(n) && p.push(n[this._fieldId]);
        }
      } else if (h) {
        for (s = [], e = 0, i = u.length; e < i; e++) {
          o = u[e], s.push(r[o]);
        }for (this._sort(s, h), e = 0, i = s.length; e < i; e++) {
          p.push(s[e][this._fieldId]);
        }
      } else for (e = 0, i = u.length; e < i; e++) {
        o = u[e], n = r[o], p.push(n[this._fieldId]);
      }return p;
    }, n.prototype.getDataSet = function () {
      return this;
    }, n.prototype.forEach = function (t, e) {
      var i,
          o,
          n,
          s,
          r = e && e.filter,
          a = e && e.type || this._options.type,
          h = this._data,
          d = (0, l.default)(h);if (e && e.order) {
        var u = this.get(e);for (i = 0, o = u.length; i < o; i++) {
          n = u[i], s = n[this._fieldId], t(n, s);
        }
      } else for (i = 0, o = d.length; i < o; i++) {
        s = d[i], n = this._getItem(s, a), r && !r(n) || t(n, s);
      }
    }, n.prototype.map = function (t, e) {
      var i,
          o,
          n,
          s,
          r = e && e.filter,
          a = e && e.type || this._options.type,
          h = [],
          d = this._data,
          u = (0, l.default)(d);for (i = 0, o = u.length; i < o; i++) {
        n = u[i], s = this._getItem(n, a), r && !r(s) || h.push(t(s, n));
      }return e && e.order && this._sort(h, e.order), h;
    }, n.prototype._filterFields = function (t, e) {
      if (!t) return t;var i,
          o,
          n = {},
          s = (0, l.default)(t),
          r = s.length;if (Array.isArray(e)) for (i = 0; i < r; i++) {
        o = s[i], -1 != e.indexOf(o) && (n[o] = t[o]);
      } else for (i = 0; i < r; i++) {
        o = s[i], e.hasOwnProperty(o) && (n[e[o]] = t[o]);
      }return n;
    }, n.prototype._sort = function (t, e) {
      if (u.isString(e)) {
        var i = e;t.sort(function (t, e) {
          var o = t[i],
              n = e[i];return o > n ? 1 : o < n ? -1 : 0;
        });
      } else {
        if ("function" != typeof e) throw new TypeError("Order must be a function or a string");t.sort(e);
      }
    }, n.prototype.remove = function (t, e) {
      var i,
          o,
          n,
          s,
          r = [],
          a = [],
          h = [];for (h = Array.isArray(t) ? t : [t], i = 0, o = h.length; i < o; i++) {
        (s = this._remove(h[i])) && void 0 != (n = s[this._fieldId]) && (r.push(n), a.push(s));
      }return r.length && this._trigger("remove", { items: r, oldData: a }, e), r;
    }, n.prototype._remove = function (t) {
      var e, i;return u.isNumber(t) || u.isString(t) ? i = t : t && "object" === (void 0 === t ? "undefined" : (0, h.default)(t)) && (i = t[this._fieldId]), void 0 !== i && this._data[i] ? (e = this._data[i], delete this._data[i], this.length--, e) : null;
    }, n.prototype.clear = function (t) {
      var e,
          i,
          o = (0, l.default)(this._data),
          n = [];for (e = 0, i = o.length; e < i; e++) {
        n.push(this._data[o[e]]);
      }return this._data = {}, this.length = 0, this._trigger("remove", { items: o, oldData: n }, t), o;
    }, n.prototype.max = function (t) {
      var e,
          i,
          o = this._data,
          n = (0, l.default)(o),
          s = null,
          r = null;for (e = 0, i = n.length; e < i; e++) {
        var a = n[e],
            h = o[a],
            d = h[t];null != d && (!s || d > r) && (s = h, r = d);
      }return s;
    }, n.prototype.min = function (t) {
      var e,
          i,
          o = this._data,
          n = (0, l.default)(o),
          s = null,
          r = null;for (e = 0, i = n.length; e < i; e++) {
        var a = n[e],
            h = o[a],
            d = h[t];null != d && (!s || d < r) && (s = h, r = d);
      }return s;
    }, n.prototype.distinct = function (t) {
      var e,
          i,
          o,
          n = this._data,
          s = (0, l.default)(n),
          r = [],
          a = this._options.type && this._options.type[t] || null,
          h = 0;for (e = 0, o = s.length; e < o; e++) {
        var d = s[e],
            p = n[d],
            c = p[t],
            m = !1;for (i = 0; i < h; i++) {
          if (r[i] == c) {
            m = !0;break;
          }
        }m || void 0 === c || (r[h] = c, h++);
      }if (a) for (e = 0, o = r.length; e < o; e++) {
        r[e] = u.convert(r[e], a);
      }return r;
    }, n.prototype._addItem = function (t) {
      var e = t[this._fieldId];if (void 0 != e) {
        if (this._data[e]) throw new Error("Cannot add item: item with id " + e + " already exists");
      } else e = u.randomUUID(), t[this._fieldId] = e;var i,
          o,
          n = {},
          s = (0, l.default)(t);for (i = 0, o = s.length; i < o; i++) {
        var r = s[i],
            a = this._type[r];n[r] = u.convert(t[r], a);
      }return this._data[e] = n, this.length++, e;
    }, n.prototype._getItem = function (t, e) {
      var i,
          o,
          n,
          s,
          r = this._data[t];if (!r) return null;var a = {},
          h = (0, l.default)(r);if (e) for (n = 0, s = h.length; n < s; n++) {
        i = h[n], o = r[i], a[i] = u.convert(o, e[i]);
      } else for (n = 0, s = h.length; n < s; n++) {
        i = h[n], o = r[i], a[i] = o;
      }return a[this._fieldId] || (a[this._fieldId] = r.id), a;
    }, n.prototype._updateItem = function (t) {
      var e = t[this._fieldId];if (void 0 == e) throw new Error("Cannot update item: item has no id (item: " + (0, r.default)(t) + ")");var i = this._data[e];if (!i) throw new Error("Cannot update item: no item with id " + e + " found");for (var o = (0, l.default)(t), n = 0, s = o.length; n < s; n++) {
        var a = o[n],
            h = this._type[a];i[a] = u.convert(t[a], h);
      }return e;
    }, t.exports = n;
  }, function (t, e, i) {
    t.exports = { default: i(128), __esModule: !0 };
  }, function (t, e, i) {
    var o = i(6),
        n = i(2),
        s = i(92),
        r = i(14),
        a = function a(t, e, i) {
      var h,
          d,
          l,
          u = t & a.F,
          p = t & a.G,
          c = t & a.S,
          m = t & a.P,
          f = t & a.B,
          g = t & a.W,
          v = p ? n : n[e] || (n[e] = {}),
          y = v.prototype,
          b = p ? o : c ? o[e] : (o[e] || {}).prototype;p && (i = e);for (h in i) {
        (d = !u && b && void 0 !== b[h]) && h in v || (l = d ? b[h] : i[h], v[h] = p && "function" != typeof b[h] ? i[h] : f && d ? s(l, o) : g && b[h] == l ? function (t) {
          var e = function e(_e2, i, o) {
            if (this instanceof t) {
              switch (arguments.length) {case 0:
                  return new t();case 1:
                  return new t(_e2);case 2:
                  return new t(_e2, i);}return new t(_e2, i, o);
            }return t.apply(this, arguments);
          };return e.prototype = t.prototype, e;
        }(l) : m && "function" == typeof l ? s(Function.call, l) : l, m && ((v.virtual || (v.virtual = {}))[h] = l, t & a.R && y && !y[h] && r(y, h, l)));
      }
    };a.F = 1, a.G = 2, a.S = 4, a.P = 8, a.B = 16, a.W = 32, a.U = 64, a.R = 128, t.exports = a;
  }, function (t, e, i) {
    var o = i(24);t.exports = function (t) {
      if (!o(t)) throw TypeError(t + " is not an object!");return t;
    };
  }, function (t, e) {
    t.exports = function (t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    };
  }, function (t, e, i) {
    function o(t, e) {
      this._data = null, this._ids = {}, this.length = 0, this._options = e || {}, this._fieldId = "id", this._subscribers = {};var i = this;this.listener = function () {
        i._onEvent.apply(i, arguments);
      }, this.setData(t);
    }var n = i(4),
        s = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(n),
        r = i(0),
        a = i(15);o.prototype.setData = function (t) {
      var e, i, o, n, s;if (this._data) {
        for (this._data.off && this._data.off("*", this.listener), e = this._data.getIds({ filter: this._options && this._options.filter }), s = [], o = 0, n = e.length; o < n; o++) {
          s.push(this._data._data[e[o]]);
        }this._ids = {}, this.length = 0, this._trigger("remove", { items: e, oldData: s });
      }if (this._data = t, this._data) {
        for (this._fieldId = this._options.fieldId || this._data && this._data.options && this._data.options.fieldId || "id", e = this._data.getIds({ filter: this._options && this._options.filter }), o = 0, n = e.length; o < n; o++) {
          i = e[o], this._ids[i] = !0;
        }this.length = e.length, this._trigger("add", { items: e }), this._data.on && this._data.on("*", this.listener);
      }
    }, o.prototype.refresh = function () {
      var t,
          e,
          i,
          o = this._data.getIds({ filter: this._options && this._options.filter }),
          n = (0, s.default)(this._ids),
          r = {},
          a = [],
          h = [],
          d = [];for (e = 0, i = o.length; e < i; e++) {
        t = o[e], r[t] = !0, this._ids[t] || (a.push(t), this._ids[t] = !0);
      }for (e = 0, i = n.length; e < i; e++) {
        t = n[e], r[t] || (h.push(t), d.push(this._data._data[t]), delete this._ids[t]);
      }this.length += a.length - h.length, a.length && this._trigger("add", { items: a }), h.length && this._trigger("remove", { items: h, oldData: d });
    }, o.prototype.get = function (t) {
      var e,
          i,
          o,
          n = this,
          s = r.getType(arguments[0]);"String" == s || "Number" == s || "Array" == s ? (e = arguments[0], i = arguments[1], o = arguments[2]) : (i = arguments[0], o = arguments[1]);var a = r.extend({}, this._options, i);this._options.filter && i && i.filter && (a.filter = function (t) {
        return n._options.filter(t) && i.filter(t);
      });var h = [];return void 0 != e && h.push(e), h.push(a), h.push(o), this._data && this._data.get.apply(this._data, h);
    }, o.prototype.getIds = function (t) {
      var e;if (this._data) {
        var i,
            o = this._options.filter;i = t && t.filter ? o ? function (e) {
          return o(e) && t.filter(e);
        } : t.filter : o, e = this._data.getIds({ filter: i, order: t && t.order });
      } else e = [];return e;
    }, o.prototype.map = function (t, e) {
      var i = [];if (this._data) {
        var o,
            n = this._options.filter;o = e && e.filter ? n ? function (t) {
          return n(t) && e.filter(t);
        } : e.filter : n, i = this._data.map(t, { filter: o, order: e && e.order });
      } else i = [];return i;
    }, o.prototype.getDataSet = function () {
      for (var t = this; t instanceof o;) {
        t = t._data;
      }return t || null;
    }, o.prototype._onEvent = function (t, e, i) {
      var o,
          n,
          s,
          r,
          a = e && e.items,
          h = [],
          d = [],
          l = [],
          u = [],
          p = [],
          c = [];if (a && this._data) {
        switch (t) {case "add":
            for (o = 0, n = a.length; o < n; o++) {
              s = a[o], (r = this.get(s)) && (this._ids[s] = !0, h.push(s));
            }break;case "update":
            for (o = 0, n = a.length; o < n; o++) {
              s = a[o], r = this.get(s), r ? this._ids[s] ? (d.push(s), p.push(e.data[o]), u.push(e.oldData[o])) : (this._ids[s] = !0, h.push(s)) : this._ids[s] && (delete this._ids[s], l.push(s), c.push(e.oldData[o]));
            }break;case "remove":
            for (o = 0, n = a.length; o < n; o++) {
              s = a[o], this._ids[s] && (delete this._ids[s], l.push(s), c.push(e.oldData[o]));
            }}this.length += h.length - l.length, h.length && this._trigger("add", { items: h }, i), d.length && this._trigger("update", { items: d, oldData: u, data: p }, i), l.length && this._trigger("remove", { items: l, oldData: c }, i);
      }
    }, o.prototype.on = a.prototype.on, o.prototype.off = a.prototype.off, o.prototype._trigger = a.prototype._trigger, o.prototype.subscribe = o.prototype.on, o.prototype.unsubscribe = o.prototype.off, t.exports = o;
  }, function (t, e, i) {
    e.convertHiddenOptions = function (t, i, o) {
      if (o && !Array.isArray(o)) return e.convertHiddenOptions(t, i, [o]);if (i.hiddenDates = [], o && 1 == Array.isArray(o)) {
        for (var n = 0; n < o.length; n++) {
          if (void 0 === o[n].repeat) {
            var s = {};s.start = t(o[n].start).toDate().valueOf(), s.end = t(o[n].end).toDate().valueOf(), i.hiddenDates.push(s);
          }
        }i.hiddenDates.sort(function (t, e) {
          return t.start - e.start;
        });
      }
    }, e.updateHiddenDates = function (t, i, o) {
      if (o && !Array.isArray(o)) return e.updateHiddenDates(t, i, [o]);if (o && void 0 !== i.domProps.centerContainer.width) {
        e.convertHiddenOptions(t, i, o);for (var n = t(i.range.start), s = t(i.range.end), r = i.range.end - i.range.start, a = r / i.domProps.centerContainer.width, h = 0; h < o.length; h++) {
          if (void 0 !== o[h].repeat) {
            var d = t(o[h].start),
                l = t(o[h].end);if ("Invalid Date" == d._d) throw new Error("Supplied start date is not valid: " + o[h].start);if ("Invalid Date" == l._d) throw new Error("Supplied end date is not valid: " + o[h].end);var u = l - d;if (u >= 4 * a) {
              var p = 0,
                  c = s.clone();switch (o[h].repeat) {case "daily":
                  d.day() != l.day() && (p = 1), d.dayOfYear(n.dayOfYear()), d.year(n.year()), d.subtract(7, "days"), l.dayOfYear(n.dayOfYear()), l.year(n.year()), l.subtract(7 - p, "days"), c.add(1, "weeks");break;case "weekly":
                  var m = l.diff(d, "days"),
                      f = d.day();d.date(n.date()), d.month(n.month()), d.year(n.year()), l = d.clone(), d.day(f), l.day(f), l.add(m, "days"), d.subtract(1, "weeks"), l.subtract(1, "weeks"), c.add(1, "weeks");break;case "monthly":
                  d.month() != l.month() && (p = 1), d.month(n.month()), d.year(n.year()), d.subtract(1, "months"), l.month(n.month()), l.year(n.year()), l.subtract(1, "months"), l.add(p, "months"), c.add(1, "months");break;case "yearly":
                  d.year() != l.year() && (p = 1), d.year(n.year()), d.subtract(1, "years"), l.year(n.year()), l.subtract(1, "years"), l.add(p, "years"), c.add(1, "years");break;default:
                  return void console.log("Wrong repeat format, allowed are: daily, weekly, monthly, yearly. Given:", o[h].repeat);}for (; d < c;) {
                switch (i.hiddenDates.push({ start: d.valueOf(), end: l.valueOf() }), o[h].repeat) {case "daily":
                    d.add(1, "days"), l.add(1, "days");break;case "weekly":
                    d.add(1, "weeks"), l.add(1, "weeks");break;case "monthly":
                    d.add(1, "months"), l.add(1, "months");break;case "yearly":
                    d.add(1, "y"), l.add(1, "y");break;default:
                    return void console.log("Wrong repeat format, allowed are: daily, weekly, monthly, yearly. Given:", o[h].repeat);}
              }i.hiddenDates.push({ start: d.valueOf(), end: l.valueOf() });
            }
          }
        }e.removeDuplicates(i);var g = e.isHidden(i.range.start, i.hiddenDates),
            v = e.isHidden(i.range.end, i.hiddenDates),
            y = i.range.start,
            b = i.range.end;1 == g.hidden && (y = 1 == i.range.startToFront ? g.startDate - 1 : g.endDate + 1), 1 == v.hidden && (b = 1 == i.range.endToFront ? v.startDate - 1 : v.endDate + 1), 1 != g.hidden && 1 != v.hidden || i.range._applyRange(y, b);
      }
    }, e.removeDuplicates = function (t) {
      for (var e = t.hiddenDates, i = [], o = 0; o < e.length; o++) {
        for (var n = 0; n < e.length; n++) {
          o != n && 1 != e[n].remove && 1 != e[o].remove && (e[n].start >= e[o].start && e[n].end <= e[o].end ? e[n].remove = !0 : e[n].start >= e[o].start && e[n].start <= e[o].end ? (e[o].end = e[n].end, e[n].remove = !0) : e[n].end >= e[o].start && e[n].end <= e[o].end && (e[o].start = e[n].start, e[n].remove = !0));
        }
      }for (o = 0; o < e.length; o++) {
        !0 !== e[o].remove && i.push(e[o]);
      }t.hiddenDates = i, t.hiddenDates.sort(function (t, e) {
        return t.start - e.start;
      });
    }, e.printDates = function (t) {
      for (var e = 0; e < t.length; e++) {
        console.log(e, new Date(t[e].start), new Date(t[e].end), t[e].start, t[e].end, t[e].remove);
      }
    }, e.stepOverHiddenDates = function (t, e, i) {
      for (var o = !1, n = e.current.valueOf(), s = 0; s < e.hiddenDates.length; s++) {
        var r = e.hiddenDates[s].start,
            a = e.hiddenDates[s].end;if (n >= r && n < a) {
          o = !0;break;
        }
      }if (1 == o && n < e._end.valueOf() && n != i) {
        var h = t(i),
            d = t(a);h.year() != d.year() ? e.switchedYear = !0 : h.month() != d.month() ? e.switchedMonth = !0 : h.dayOfYear() != d.dayOfYear() && (e.switchedDay = !0), e.current = d;
      }
    }, e.toScreen = function (t, i, o) {
      var n;if (0 == t.body.hiddenDates.length) return n = t.range.conversion(o), (i.valueOf() - n.offset) * n.scale;var s = e.isHidden(i, t.body.hiddenDates);1 == s.hidden && (i = s.startDate);var r = e.getHiddenDurationBetween(t.body.hiddenDates, t.range.start, t.range.end);if (i < t.range.start) {
        n = t.range.conversion(o, r);var a = e.getHiddenDurationBeforeStart(t.body.hiddenDates, i, n.offset);return i = t.options.moment(i).toDate().valueOf(), i += a, -(n.offset - i.valueOf()) * n.scale;
      }if (i > t.range.end) {
        var h = { start: t.range.start, end: i };return i = e.correctTimeForHidden(t.options.moment, t.body.hiddenDates, h, i), n = t.range.conversion(o, r), (i.valueOf() - n.offset) * n.scale;
      }return i = e.correctTimeForHidden(t.options.moment, t.body.hiddenDates, t.range, i), n = t.range.conversion(o, r), (i.valueOf() - n.offset) * n.scale;
    }, e.toTime = function (t, i, o) {
      if (0 == t.body.hiddenDates.length) {
        var n = t.range.conversion(o);return new Date(i / n.scale + n.offset);
      }var s = e.getHiddenDurationBetween(t.body.hiddenDates, t.range.start, t.range.end),
          r = t.range.end - t.range.start - s,
          a = r * i / o,
          h = e.getAccumulatedHiddenDuration(t.body.hiddenDates, t.range, a);return new Date(h + a + t.range.start);
    }, e.getHiddenDurationBetween = function (t, e, i) {
      for (var o = 0, n = 0; n < t.length; n++) {
        var s = t[n].start,
            r = t[n].end;s >= e && r < i && (o += r - s);
      }return o;
    }, e.getHiddenDurationBeforeStart = function (t, e, i) {
      for (var o = 0, n = 0; n < t.length; n++) {
        var s = t[n].start,
            r = t[n].end;s >= e && r <= i && (o += r - s);
      }return o;
    }, e.correctTimeForHidden = function (t, i, o, n) {
      return n = t(n).toDate().valueOf(), n -= e.getHiddenDurationBefore(t, i, o, n);
    }, e.getHiddenDurationBefore = function (t, e, i, o) {
      var n = 0;o = t(o).toDate().valueOf();for (var s = 0; s < e.length; s++) {
        var r = e[s].start,
            a = e[s].end;r >= i.start && a < i.end && o >= a && (n += a - r);
      }return n;
    }, e.getAccumulatedHiddenDuration = function (t, e, i) {
      for (var o = 0, n = 0, s = e.start, r = 0; r < t.length; r++) {
        var a = t[r].start,
            h = t[r].end;if (a >= e.start && h < e.end) {
          if (n += a - s, s = h, n >= i) break;o += h - a;
        }
      }return o;
    }, e.snapAwayFromHidden = function (t, i, o, n) {
      var s = e.isHidden(i, t);return 1 == s.hidden ? o < 0 ? 1 == n ? s.startDate - (s.endDate - i) - 1 : s.startDate - 1 : 1 == n ? s.endDate + (i - s.startDate) + 1 : s.endDate + 1 : i;
    }, e.isHidden = function (t, e) {
      for (var i = 0; i < e.length; i++) {
        var o = e[i].start,
            n = e[i].end;if (t >= o && t < n) return { hidden: !0, startDate: o, endDate: n };
      }return { hidden: !1, startDate: o, endDate: n };
    };
  }, function (t, e, i) {
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }function n(t, e, i) {
      this.id = null, this.parent = null, this.data = t, this.dom = null, this.conversion = e || {}, this.options = i || {}, this.selected = !1, this.displayed = !1, this.groupShowing = !0, this.dirty = !0, this.top = null, this.right = null, this.left = null, this.width = null, this.height = null, this.editable = null, this._updateEditStatus();
    }var s = i(1),
        r = o(s),
        a = i(4),
        h = o(a),
        d = i(12),
        l = i(0),
        u = i(3);n.prototype.stack = !0, n.prototype.select = function () {
      this.selected = !0, this.dirty = !0, this.displayed && this.redraw();
    }, n.prototype.unselect = function () {
      this.selected = !1, this.dirty = !0, this.displayed && this.redraw();
    }, n.prototype.setData = function (t) {
      void 0 != t.group && this.data.group != t.group && null != this.parent && this.parent.itemSet._moveToGroup(this, t.group), this.parent && (this.parent.stackDirty = !0), void 0 != t.subgroup && this.data.subgroup != t.subgroup && null != this.parent && this.parent.changeSubgroup(this, this.data.subgroup, t.subgroup), this.data = t, this._updateEditStatus(), this.dirty = !0, this.displayed && this.redraw();
    }, n.prototype.setParent = function (t) {
      this.displayed ? (this.hide(), this.parent = t, this.parent && this.show()) : this.parent = t;
    }, n.prototype.isVisible = function (t) {
      return !1;
    }, n.prototype.show = function () {
      return !1;
    }, n.prototype.hide = function () {
      return !1;
    }, n.prototype.redraw = function () {}, n.prototype.repositionX = function () {}, n.prototype.repositionY = function () {}, n.prototype._repaintDragCenter = function () {
      if (this.selected && this.options.editable.updateTime && !this.dom.dragCenter) {
        var t = this,
            e = document.createElement("div");e.className = "vis-drag-center", e.dragCenterItem = this;var i = new d(e);i.on("tap", function (e) {
          t.parent.itemSet.body.emitter.emit("click", { event: e, item: t.id });
        }), i.on("doubletap", function (e) {
          e.stopPropagation(), t.parent.itemSet._onUpdateItem(t), t.parent.itemSet.body.emitter.emit("doubleClick", { event: e, item: t.id });
        }), this.dom.box ? this.dom.dragLeft ? this.dom.box.insertBefore(e, this.dom.dragLeft) : this.dom.box.appendChild(e) : this.dom.point && this.dom.point.appendChild(e), this.dom.dragCenter = e;
      } else !this.selected && this.dom.dragCenter && (this.dom.dragCenter.parentNode && this.dom.dragCenter.parentNode.removeChild(this.dom.dragCenter), this.dom.dragCenter = null);
    }, n.prototype._repaintDeleteButton = function (t) {
      var e = (this.options.editable.overrideItems || null == this.editable) && this.options.editable.remove || !this.options.editable.overrideItems && null != this.editable && this.editable.remove;if (this.selected && e && !this.dom.deleteButton) {
        var i = this,
            o = document.createElement("div");this.options.rtl ? o.className = "vis-delete-rtl" : o.className = "vis-delete", o.title = "Delete this item", new d(o).on("tap", function (t) {
          t.stopPropagation(), i.parent.removeFromDataSet(i);
        }), t.appendChild(o), this.dom.deleteButton = o;
      } else !this.selected && this.dom.deleteButton && (this.dom.deleteButton.parentNode && this.dom.deleteButton.parentNode.removeChild(this.dom.deleteButton), this.dom.deleteButton = null);
    }, n.prototype._repaintOnItemUpdateTimeTooltip = function (t) {
      if (this.options.tooltipOnItemUpdateTime) {
        var e = (this.options.editable.updateTime || !0 === this.data.editable) && !1 !== this.data.editable;if (this.selected && e && !this.dom.onItemUpdateTimeTooltip) {
          var i = document.createElement("div");i.className = "vis-onUpdateTime-tooltip", t.appendChild(i), this.dom.onItemUpdateTimeTooltip = i;
        } else !this.selected && this.dom.onItemUpdateTimeTooltip && (this.dom.onItemUpdateTimeTooltip.parentNode && this.dom.onItemUpdateTimeTooltip.parentNode.removeChild(this.dom.onItemUpdateTimeTooltip), this.dom.onItemUpdateTimeTooltip = null);if (this.dom.onItemUpdateTimeTooltip) {
          this.dom.onItemUpdateTimeTooltip.style.visibility = this.parent.itemSet.touchParams.itemIsDragging ? "visible" : "hidden", this.options.rtl ? this.dom.onItemUpdateTimeTooltip.style.right = this.dom.content.style.right : this.dom.onItemUpdateTimeTooltip.style.left = this.dom.content.style.left;var o,
              n = this.parent.itemSet.body.domProps.scrollTop;o = "top" == this.options.orientation.item ? this.top : this.parent.height - this.top - this.height;o + this.parent.top - 50 < -n ? (this.dom.onItemUpdateTimeTooltip.style.bottom = "", this.dom.onItemUpdateTimeTooltip.style.top = this.height + 2 + "px") : (this.dom.onItemUpdateTimeTooltip.style.top = "", this.dom.onItemUpdateTimeTooltip.style.bottom = this.height + 2 + "px");var s, r;this.options.tooltipOnItemUpdateTime && this.options.tooltipOnItemUpdateTime.template ? (r = this.options.tooltipOnItemUpdateTime.template.bind(this), s = r(this.data)) : (s = "start: " + u(this.data.start).format("MM/DD/YYYY hh:mm"), this.data.end && (s += "<br> end: " + u(this.data.end).format("MM/DD/YYYY hh:mm"))), this.dom.onItemUpdateTimeTooltip.innerHTML = s;
        }
      }
    }, n.prototype._updateContents = function (t) {
      var e,
          i,
          o,
          n,
          s = this.parent.itemSet.itemsData.get(this.id),
          r = this.dom.box || this.dom.point,
          a = r.getElementsByClassName("vis-item-visible-frame")[0];if (this.options.visibleFrameTemplate ? (n = this.options.visibleFrameTemplate.bind(this), o = n(s, r)) : o = "", a) if (o instanceof Object && !(o instanceof Element)) n(s, a);else if (this._contentToString(this.itemVisibleFrameContent) !== this._contentToString(o)) {
        if (o instanceof Element) a.innerHTML = "", a.appendChild(o);else if (void 0 != o) a.innerHTML = o;else if ("background" != this.data.type || void 0 !== this.data.content) throw new Error('Property "content" missing in item ' + this.id);this.itemVisibleFrameContent = o;
      }if (this.options.template ? (i = this.options.template.bind(this), e = i(s, t, this.data)) : e = this.data.content, e instanceof Object && !(e instanceof Element)) i(s, t);else if (this._contentToString(this.content) !== this._contentToString(e)) {
        if (e instanceof Element) t.innerHTML = "", t.appendChild(e);else if (void 0 != e) t.innerHTML = e;else if ("background" != this.data.type || void 0 !== this.data.content) throw new Error('Property "content" missing in item ' + this.id);this.content = e;
      }
    }, n.prototype._updateDataAttributes = function (t) {
      if (this.options.dataAttributes && this.options.dataAttributes.length > 0) {
        var e = [];if (Array.isArray(this.options.dataAttributes)) e = this.options.dataAttributes;else {
          if ("all" != this.options.dataAttributes) return;e = (0, h.default)(this.data);
        }for (var i = 0; i < e.length; i++) {
          var o = e[i],
              n = this.data[o];null != n ? t.setAttribute("data-" + o, n) : t.removeAttribute("data-" + o);
        }
      }
    }, n.prototype._updateStyle = function (t) {
      this.style && (l.removeCssText(t, this.style), this.style = null), this.data.style && (l.addCssText(t, this.data.style), this.style = this.data.style);
    }, n.prototype._contentToString = function (t) {
      return "string" == typeof t ? t : t && "outerHTML" in t ? t.outerHTML : t;
    }, n.prototype._updateEditStatus = function () {
      this.options && ("boolean" == typeof this.options.editable ? this.editable = { updateTime: this.options.editable, updateGroup: this.options.editable, remove: this.options.editable } : "object" === (0, r.default)(this.options.editable) && (this.editable = {}, l.selectiveExtend(["updateTime", "updateGroup", "remove"], this.editable, this.options.editable))), this.options && this.options.editable && !0 === this.options.editable.overrideItems || this.data && ("boolean" == typeof this.data.editable ? this.editable = { updateTime: this.data.editable, updateGroup: this.data.editable, remove: this.data.editable } : "object" === (0, r.default)(this.data.editable) && (this.editable = {}, l.selectiveExtend(["updateTime", "updateGroup", "remove"], this.editable, this.data.editable)));
    }, n.prototype.getWidthLeft = function () {
      return 0;
    }, n.prototype.getWidthRight = function () {
      return 0;
    }, n.prototype.getTitle = function () {
      return this.data.title;
    }, t.exports = n;
  }, function (t, e) {
    t.exports = {};
  }, function (t, e) {
    t.exports = function (t) {
      return "object" == typeof t ? null !== t : "function" == typeof t;
    };
  }, function (t, e) {
    t.exports = function (t, e) {
      return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e };
    };
  }, function (t, e, i) {
    var o = i(60),
        n = i(41);t.exports = Object.keys || function (t) {
      return o(t, n);
    };
  }, function (t, e) {
    var i = 0,
        o = Math.random();t.exports = function (t) {
      return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++i + o).toString(36));
    };
  }, function (t, e, i) {
    function o(t, e) {
      this.dom = { foreground: null, lines: [], majorTexts: [], minorTexts: [], redundant: { lines: [], majorTexts: [], minorTexts: [] } }, this.props = { range: { start: 0, end: 0, minimumStep: 0 }, lineTop: 0 }, this.defaultOptions = { orientation: { axis: "bottom" }, showMinorLabels: !0, showMajorLabels: !0, maxMinorChars: 7, format: h.FORMAT, moment: l, timeAxis: null }, this.options = r.extend({}, this.defaultOptions), this.body = t, this._create(), this.setOptions(e);
    }var n = i(1),
        s = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(n),
        r = i(0),
        a = i(5),
        h = i(49),
        d = i(21),
        l = i(3);o.prototype = new a(), o.prototype.setOptions = function (t) {
      t && (r.selectiveExtend(["showMinorLabels", "showMajorLabels", "maxMinorChars", "hiddenDates", "timeAxis", "moment", "rtl"], this.options, t), r.selectiveDeepExtend(["format"], this.options, t), "orientation" in t && ("string" == typeof t.orientation ? this.options.orientation.axis = t.orientation : "object" === (0, s.default)(t.orientation) && "axis" in t.orientation && (this.options.orientation.axis = t.orientation.axis)), "locale" in t && ("function" == typeof l.locale ? l.locale(t.locale) : l.lang(t.locale)));
    }, o.prototype._create = function () {
      this.dom.foreground = document.createElement("div"), this.dom.background = document.createElement("div"), this.dom.foreground.className = "vis-time-axis vis-foreground", this.dom.background.className = "vis-time-axis vis-background";
    }, o.prototype.destroy = function () {
      this.dom.foreground.parentNode && this.dom.foreground.parentNode.removeChild(this.dom.foreground), this.dom.background.parentNode && this.dom.background.parentNode.removeChild(this.dom.background), this.body = null;
    }, o.prototype.redraw = function () {
      var t = this.props,
          e = this.dom.foreground,
          i = this.dom.background,
          o = "top" == this.options.orientation.axis ? this.body.dom.top : this.body.dom.bottom,
          n = e.parentNode !== o;this._calculateCharSize();var s = this.options.showMinorLabels && "none" !== this.options.orientation.axis,
          r = this.options.showMajorLabels && "none" !== this.options.orientation.axis;t.minorLabelHeight = s ? t.minorCharHeight : 0, t.majorLabelHeight = r ? t.majorCharHeight : 0, t.height = t.minorLabelHeight + t.majorLabelHeight, t.width = e.offsetWidth, t.minorLineHeight = this.body.domProps.root.height - t.majorLabelHeight - ("top" == this.options.orientation.axis ? this.body.domProps.bottom.height : this.body.domProps.top.height), t.minorLineWidth = 1, t.majorLineHeight = t.minorLineHeight + t.majorLabelHeight, t.majorLineWidth = 1;var a = e.nextSibling,
          h = i.nextSibling;return e.parentNode && e.parentNode.removeChild(e), i.parentNode && i.parentNode.removeChild(i), e.style.height = this.props.height + "px", this._repaintLabels(), a ? o.insertBefore(e, a) : o.appendChild(e), h ? this.body.dom.backgroundVertical.insertBefore(i, h) : this.body.dom.backgroundVertical.appendChild(i), this._isResized() || n;
    }, o.prototype._repaintLabels = function () {
      var t = this.options.orientation.axis,
          e = r.convert(this.body.range.start, "Number"),
          i = r.convert(this.body.range.end, "Number"),
          o = this.body.util.toTime((this.props.minorCharWidth || 10) * this.options.maxMinorChars).valueOf(),
          n = o - d.getHiddenDurationBefore(this.options.moment, this.body.hiddenDates, this.body.range, o);n -= this.body.util.toTime(0).valueOf();var s = new h(new Date(e), new Date(i), n, this.body.hiddenDates, this.options);s.setMoment(this.options.moment), this.options.format && s.setFormat(this.options.format), this.options.timeAxis && s.setScale(this.options.timeAxis), this.step = s;var a = this.dom;a.redundant.lines = a.lines, a.redundant.majorTexts = a.majorTexts, a.redundant.minorTexts = a.minorTexts, a.lines = [], a.majorTexts = [], a.minorTexts = [];var l,
          p,
          c,
          m,
          f,
          g,
          v,
          y,
          b,
          _ = 0,
          w = void 0,
          x = 0;for (s.start(), l = s.getCurrent(), c = this.body.util.toScreen(l); s.hasNext() && x < 1e3;) {
        switch (x++, m = s.isMajor(), b = s.getClassName(), y = s.getLabelMinor(), l, p = c, s.next(), l = s.getCurrent(), s.isMajor(), c = this.body.util.toScreen(l), g = _, _ = c - p, s.scale) {case "week":
            f = !0;break;default:
            f = _ >= .4 * g;}if (this.options.showMinorLabels && f) {
          var D = this._repaintMinorText(p, y, t, b);D.style.width = _ + "px";
        }m && this.options.showMajorLabels ? (p > 0 && (void 0 == w && (w = p), D = this._repaintMajorText(p, s.getLabelMajor(), t, b)), v = this._repaintMajorLine(p, _, t, b)) : f ? v = this._repaintMinorLine(p, _, t, b) : v && (v.style.width = parseInt(v.style.width) + _ + "px");
      }if (1e3 !== x || u || (console.warn("Something is wrong with the Timeline scale. Limited drawing of grid lines to 1000 lines."), u = !0), this.options.showMajorLabels) {
        var S = this.body.util.toTime(0),
            k = s.getLabelMajor(S),
            C = k.length * (this.props.majorCharWidth || 10) + 10;(void 0 == w || C < w) && this._repaintMajorText(0, k, t, b);
      }r.forEach(this.dom.redundant, function (t) {
        for (; t.length;) {
          var e = t.pop();e && e.parentNode && e.parentNode.removeChild(e);
        }
      });
    }, o.prototype._repaintMinorText = function (t, e, i, o) {
      var n = this.dom.redundant.minorTexts.shift();if (!n) {
        var s = document.createTextNode("");n = document.createElement("div"), n.appendChild(s), this.dom.foreground.appendChild(n);
      }return this.dom.minorTexts.push(n), n.innerHTML = e, n.style.top = "top" == i ? this.props.majorLabelHeight + "px" : "0", this.options.rtl ? (n.style.left = "", n.style.right = t + "px") : n.style.left = t + "px", n.className = "vis-text vis-minor " + o, n;
    }, o.prototype._repaintMajorText = function (t, e, i, o) {
      var n = this.dom.redundant.majorTexts.shift();if (!n) {
        var s = document.createElement("div");n = document.createElement("div"), n.appendChild(s), this.dom.foreground.appendChild(n);
      }return n.childNodes[0].innerHTML = e, n.className = "vis-text vis-major " + o, n.style.top = "top" == i ? "0" : this.props.minorLabelHeight + "px", this.options.rtl ? (n.style.left = "", n.style.right = t + "px") : n.style.left = t + "px", this.dom.majorTexts.push(n), n;
    }, o.prototype._repaintMinorLine = function (t, e, i, o) {
      var n = this.dom.redundant.lines.shift();n || (n = document.createElement("div"), this.dom.background.appendChild(n)), this.dom.lines.push(n);var s = this.props;return n.style.top = "top" == i ? s.majorLabelHeight + "px" : this.body.domProps.top.height + "px", n.style.height = s.minorLineHeight + "px", this.options.rtl ? (n.style.left = "", n.style.right = t - s.minorLineWidth / 2 + "px", n.className = "vis-grid vis-vertical-rtl vis-minor " + o) : (n.style.left = t - s.minorLineWidth / 2 + "px", n.className = "vis-grid vis-vertical vis-minor " + o), n.style.width = e + "px", n;
    }, o.prototype._repaintMajorLine = function (t, e, i, o) {
      var n = this.dom.redundant.lines.shift();n || (n = document.createElement("div"), this.dom.background.appendChild(n)), this.dom.lines.push(n);var s = this.props;return n.style.top = "top" == i ? "0" : this.body.domProps.top.height + "px", this.options.rtl ? (n.style.left = "", n.style.right = t - s.majorLineWidth / 2 + "px", n.className = "vis-grid vis-vertical-rtl vis-major " + o) : (n.style.left = t - s.majorLineWidth / 2 + "px", n.className = "vis-grid vis-vertical vis-major " + o), n.style.height = s.majorLineHeight + "px", n.style.width = e + "px", n;
    }, o.prototype._calculateCharSize = function () {
      this.dom.measureCharMinor || (this.dom.measureCharMinor = document.createElement("DIV"), this.dom.measureCharMinor.className = "vis-text vis-minor vis-measure", this.dom.measureCharMinor.style.position = "absolute", this.dom.measureCharMinor.appendChild(document.createTextNode("0")), this.dom.foreground.appendChild(this.dom.measureCharMinor)), this.props.minorCharHeight = this.dom.measureCharMinor.clientHeight, this.props.minorCharWidth = this.dom.measureCharMinor.clientWidth, this.dom.measureCharMajor || (this.dom.measureCharMajor = document.createElement("DIV"), this.dom.measureCharMajor.className = "vis-text vis-major vis-measure", this.dom.measureCharMajor.style.position = "absolute", this.dom.measureCharMajor.appendChild(document.createTextNode("0")), this.dom.foreground.appendChild(this.dom.measureCharMajor)), this.props.majorCharHeight = this.dom.measureCharMajor.clientHeight, this.props.majorCharWidth = this.dom.measureCharMajor.clientWidth;
    };var u = !1;t.exports = o;
  }, function (t, e, i) {
    function o(t, e) {
      this.body = t, this.defaultOptions = { moment: a, locales: h, locale: "en", id: void 0, title: void 0 }, this.options = s.extend({}, this.defaultOptions), e && e.time ? this.customTime = e.time : this.customTime = new Date(), this.eventParams = {}, this.setOptions(e), this._create();
    }var n = i(12),
        s = i(0),
        r = i(5),
        a = i(3),
        h = i(69);o.prototype = new r(), o.prototype.setOptions = function (t) {
      t && s.selectiveExtend(["moment", "locale", "locales", "id"], this.options, t);
    }, o.prototype._create = function () {
      function t(t) {
        this.body.range._onMouseWheel(t);
      }var e = document.createElement("div");e["custom-time"] = this, e.className = "vis-custom-time " + (this.options.id || ""), e.style.position = "absolute", e.style.top = "0px", e.style.height = "100%", this.bar = e;var i = document.createElement("div");i.style.position = "relative", i.style.top = "0px", i.style.left = "-10px", i.style.height = "100%", i.style.width = "20px", i.addEventListener ? (i.addEventListener("mousewheel", t.bind(this), !1), i.addEventListener("DOMMouseScroll", t.bind(this), !1)) : i.attachEvent("onmousewheel", t.bind(this)), e.appendChild(i), this.hammer = new n(i), this.hammer.on("panstart", this._onDragStart.bind(this)), this.hammer.on("panmove", this._onDrag.bind(this)), this.hammer.on("panend", this._onDragEnd.bind(this)), this.hammer.get("pan").set({ threshold: 5, direction: n.DIRECTION_HORIZONTAL });
    }, o.prototype.destroy = function () {
      this.hide(), this.hammer.destroy(), this.hammer = null, this.body = null;
    }, o.prototype.redraw = function () {
      var t = this.body.dom.backgroundVertical;this.bar.parentNode != t && (this.bar.parentNode && this.bar.parentNode.removeChild(this.bar), t.appendChild(this.bar));var e = this.body.util.toScreen(this.customTime),
          i = this.options.locales[this.options.locale];i || (this.warned || (console.log("WARNING: options.locales['" + this.options.locale + "'] not found. See http://visjs.org/docs/timeline/#Localization"), this.warned = !0), i = this.options.locales.en);var o = this.options.title;return void 0 === o ? (o = i.time + ": " + this.options.moment(this.customTime).format("dddd, MMMM Do YYYY, H:mm:ss"), o = o.charAt(0).toUpperCase() + o.substring(1)) : "function" == typeof o && (o = o.call(this.customTime)), this.bar.style.left = e + "px", this.bar.title = o, !1;
    }, o.prototype.hide = function () {
      this.bar.parentNode && this.bar.parentNode.removeChild(this.bar);
    }, o.prototype.setCustomTime = function (t) {
      this.customTime = s.convert(t, "Date"), this.redraw();
    }, o.prototype.getCustomTime = function () {
      return new Date(this.customTime.valueOf());
    }, o.prototype.setCustomTitle = function (t) {
      this.options.title = t;
    }, o.prototype._onDragStart = function (t) {
      this.eventParams.dragging = !0, this.eventParams.customTime = this.customTime, t.stopPropagation();
    }, o.prototype._onDrag = function (t) {
      if (this.eventParams.dragging) {
        var e = this.body.util.toScreen(this.eventParams.customTime) + t.deltaX,
            i = this.body.util.toTime(e);this.setCustomTime(i), this.body.emitter.emit("timechange", { id: this.options.id, time: new Date(this.customTime.valueOf()), event: t }), t.stopPropagation();
      }
    }, o.prototype._onDragEnd = function (t) {
      this.eventParams.dragging && (this.body.emitter.emit("timechanged", { id: this.options.id, time: new Date(this.customTime.valueOf()), event: t }), t.stopPropagation());
    }, o.customTimeFromTarget = function (t) {
      for (var e = t.target; e;) {
        if (e.hasOwnProperty("custom-time")) return e["custom-time"];e = e.parentNode;
      }return null;
    }, t.exports = o;
  }, function (t, e, i) {
    e.__esModule = !0, e.default = function (t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    };
  }, function (t, e, i) {
    e.__esModule = !0;var o = i(134),
        n = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(o);e.default = function () {
      function t(t, e) {
        for (var i = 0; i < e.length; i++) {
          var o = e[i];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), (0, n.default)(t, o.key, o);
        }
      }return function (e, i, o) {
        return i && t(e.prototype, i), o && t(e, o), e;
      };
    }();
  }, function (t, e, i) {
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }Object.defineProperty(e, "__esModule", { value: !0 }), e.printStyle = void 0;var n = i(16),
        s = o(n),
        r = i(1),
        a = o(r),
        h = i(4),
        d = o(h),
        l = i(30),
        u = o(l),
        p = i(31),
        c = o(p),
        m = i(0),
        f = !1,
        g = void 0,
        v = "background: #FFeeee; color: #dd0000",
        y = function () {
      function t() {
        (0, u.default)(this, t);
      }return (0, c.default)(t, null, [{ key: "validate", value: function value(e, i, o) {
          f = !1, g = i;var n = i;return void 0 !== o && (n = i[o]), t.parse(e, n, []), f;
        } }, { key: "parse", value: function value(e, i, o) {
          for (var n in e) {
            e.hasOwnProperty(n) && t.check(n, e, i, o);
          }
        } }, { key: "check", value: function value(e, i, o, n) {
          if (void 0 === o[e] && void 0 === o.__any__) return void t.getSuggestion(e, o, n);var s = e,
              r = !0;void 0 === o[e] && void 0 !== o.__any__ && (s = "__any__", r = "object" === t.getType(i[e]));var a = o[s];r && void 0 !== a.__type__ && (a = a.__type__), t.checkFields(e, i, o, s, a, n);
        } }, { key: "checkFields", value: function value(e, i, o, n, s, r) {
          var a = function a(i) {
            console.log("%c" + i + t.printLocation(r, e), v);
          },
              h = t.getType(i[e]),
              l = s[h];void 0 !== l ? "array" === t.getType(l) && -1 === l.indexOf(i[e]) ? (a('Invalid option detected in "' + e + '". Allowed values are:' + t.print(l) + ' not "' + i[e] + '". '), f = !0) : "object" === h && "__any__" !== n && (r = m.copyAndExtendArray(r, e), t.parse(i[e], o[n], r)) : void 0 === s.any && (a('Invalid type received for "' + e + '". Expected: ' + t.print((0, d.default)(s)) + ". Received [" + h + '] "' + i[e] + '"'), f = !0);
        } }, { key: "getType", value: function value(t) {
          var e = void 0 === t ? "undefined" : (0, a.default)(t);return "object" === e ? null === t ? "null" : t instanceof Boolean ? "boolean" : t instanceof Number ? "number" : t instanceof String ? "string" : Array.isArray(t) ? "array" : t instanceof Date ? "date" : void 0 !== t.nodeType ? "dom" : !0 === t._isAMomentObject ? "moment" : "object" : "number" === e ? "number" : "boolean" === e ? "boolean" : "string" === e ? "string" : void 0 === e ? "undefined" : e;
        } }, { key: "getSuggestion", value: function value(e, i, o) {
          var n = t.findInOptions(e, i, o, !1),
              s = t.findInOptions(e, g, [], !0),
              r = void 0;r = void 0 !== n.indexMatch ? " in " + t.printLocation(n.path, e, "") + 'Perhaps it was incomplete? Did you mean: "' + n.indexMatch + '"?\n\n' : s.distance <= 4 && n.distance > s.distance ? " in " + t.printLocation(n.path, e, "") + "Perhaps it was misplaced? Matching option found at: " + t.printLocation(s.path, s.closestMatch, "") : n.distance <= 8 ? '. Did you mean "' + n.closestMatch + '"?' + t.printLocation(n.path, e) : ". Did you mean one of these: " + t.print((0, d.default)(i)) + t.printLocation(o, e), console.log('%cUnknown option detected: "' + e + '"' + r, v), f = !0;
        } }, { key: "findInOptions", value: function value(e, i, o) {
          var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
              s = 1e9,
              r = "",
              a = [],
              h = e.toLowerCase(),
              d = void 0;for (var l in i) {
            var u = void 0;if (void 0 !== i[l].__type__ && !0 === n) {
              var p = t.findInOptions(e, i[l], m.copyAndExtendArray(o, l));s > p.distance && (r = p.closestMatch, a = p.path, s = p.distance, d = p.indexMatch);
            } else -1 !== l.toLowerCase().indexOf(h) && (d = l), u = t.levenshteinDistance(e, l), s > u && (r = l, a = m.copyArray(o), s = u);
          }return { closestMatch: r, path: a, distance: s, indexMatch: d };
        } }, { key: "printLocation", value: function value(t, e) {
          for (var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Problem value found at: \n", o = "\n\n" + i + "options = {\n", n = 0; n < t.length; n++) {
            for (var s = 0; s < n + 1; s++) {
              o += "  ";
            }o += t[n] + ": {\n";
          }for (var r = 0; r < t.length + 1; r++) {
            o += "  ";
          }o += e + "\n";for (var a = 0; a < t.length + 1; a++) {
            for (var h = 0; h < t.length - a; h++) {
              o += "  ";
            }o += "}\n";
          }return o + "\n\n";
        } }, { key: "print", value: function value(t) {
          return (0, s.default)(t).replace(/(\")|(\[)|(\])|(,"__type__")/g, "").replace(/(\,)/g, ", ");
        } }, { key: "levenshteinDistance", value: function value(t, e) {
          if (0 === t.length) return e.length;if (0 === e.length) return t.length;var i,
              o = [];for (i = 0; i <= e.length; i++) {
            o[i] = [i];
          }var n;for (n = 0; n <= t.length; n++) {
            o[0][n] = n;
          }for (i = 1; i <= e.length; i++) {
            for (n = 1; n <= t.length; n++) {
              e.charAt(i - 1) == t.charAt(n - 1) ? o[i][n] = o[i - 1][n - 1] : o[i][n] = Math.min(o[i - 1][n - 1] + 1, Math.min(o[i][n - 1] + 1, o[i - 1][n] + 1));
            }
          }return o[e.length][t.length];
        } }]), t;
    }();e.default = y, e.printStyle = v;
  }, function (t, e) {
    var i = {}.toString;t.exports = function (t) {
      return i.call(t).slice(8, -1);
    };
  }, function (t, e) {
    t.exports = function (t) {
      if (void 0 == t) throw TypeError("Can't call method on  " + t);return t;
    };
  }, function (t, e) {
    t.exports = !0;
  }, function (t, e, i) {
    var o = i(24);t.exports = function (t, e) {
      if (!o(t)) return t;var i, n;if (e && "function" == typeof (i = t.toString) && !o(n = i.call(t))) return n;if ("function" == typeof (i = t.valueOf) && !o(n = i.call(t))) return n;if (!e && "function" == typeof (i = t.toString) && !o(n = i.call(t))) return n;throw TypeError("Can't convert object to primitive value");
    };
  }, function (t, e, i) {
    var o = i(18),
        n = i(95),
        s = i(41),
        r = i(39)("IE_PROTO"),
        a = function a() {},
        _h = function h() {
      var t,
          e = i(58)("iframe"),
          o = s.length;for (e.style.display = "none", i(99).appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write("<script>document.F=Object<\/script>"), t.close(), _h = t.F; o--;) {
        delete _h.prototype[s[o]];
      }return _h();
    };t.exports = Object.create || function (t, e) {
      var i;return null !== t ? (a.prototype = o(t), i = new a(), a.prototype = null, i[r] = t) : i = _h(), void 0 === e ? i : n(i, e);
    };
  }, function (t, e) {
    var i = Math.ceil,
        o = Math.floor;t.exports = function (t) {
      return isNaN(t = +t) ? 0 : (t > 0 ? o : i)(t);
    };
  }, function (t, e, i) {
    var o = i(40)("keys"),
        n = i(27);t.exports = function (t) {
      return o[t] || (o[t] = n(t));
    };
  }, function (t, e, i) {
    var o = i(6),
        n = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});t.exports = function (t) {
      return n[t] || (n[t] = {});
    };
  }, function (t, e) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  }, function (t, e, i) {
    var o = i(8).f,
        n = i(10),
        s = i(7)("toStringTag");t.exports = function (t, e, i) {
      t && !n(t = i ? t : t.prototype, s) && o(t, s, { configurable: !0, value: e });
    };
  }, function (t, e, i) {
    t.exports = { default: i(105), __esModule: !0 };
  }, function (t, e, i) {
    e.f = i(7);
  }, function (t, e, i) {
    var o = i(6),
        n = i(2),
        s = i(35),
        r = i(44),
        a = i(8).f;t.exports = function (t) {
      var e = n.Symbol || (n.Symbol = s ? {} : o.Symbol || {});"_" == t.charAt(0) || t in e || a(e, t, { value: r.f(t) });
    };
  }, function (t, e) {
    e.f = {}.propertyIsEnumerable;
  }, function (t, e, i) {
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }function n(t, e) {
      var i = c().hours(0).minutes(0).seconds(0).milliseconds(0),
          o = i.clone().add(-3, "days").valueOf(),
          n = i.clone().add(3, "days").valueOf();this.millisecondsPerPixelCache = void 0, void 0 === e ? (this.start = o, this.end = n) : (this.start = e.start || o, this.end = e.end || n), this.rolling = !1, this.body = t, this.deltaDifference = 0, this.scaleOffset = 0, this.startToFront = !1, this.endToFront = !0, this.defaultOptions = { rtl: !1, start: null, end: null, moment: c, direction: "horizontal", moveable: !0, zoomable: !0, min: null, max: null, zoomMin: 10, zoomMax: 31536e10, rollingMode: { follow: !1, offset: .5 } }, this.options = p.extend({}, this.defaultOptions), this.props = { touch: {} }, this.animationTimer = null, this.body.emitter.on("panstart", this._onDragStart.bind(this)), this.body.emitter.on("panmove", this._onDrag.bind(this)), this.body.emitter.on("panend", this._onDragEnd.bind(this)), this.body.emitter.on("mousewheel", this._onMouseWheel.bind(this)), this.body.emitter.on("touch", this._onTouch.bind(this)), this.body.emitter.on("pinch", this._onPinch.bind(this)), this.body.dom.rollingModeBtn.addEventListener("click", this.startRolling.bind(this)), this.setOptions(e);
    }function s(t) {
      if ("horizontal" != t && "vertical" != t) throw new TypeError('Unknown direction "' + t + '". Choose "horizontal" or "vertical".');
    }var r = i(4),
        a = o(r),
        h = i(16),
        d = o(h),
        l = i(1),
        u = o(l),
        p = i(0),
        c = i(3),
        m = i(5),
        f = i(21);n.prototype = new m(), n.prototype.setOptions = function (t) {
      if (t) {
        var e = ["animation", "direction", "min", "max", "zoomMin", "zoomMax", "moveable", "zoomable", "moment", "activate", "hiddenDates", "zoomKey", "rtl", "showCurrentTime", "rollingMode", "horizontalScroll"];p.selectiveExtend(e, this.options, t), t.rollingMode && t.rollingMode.follow && this.startRolling(), ("start" in t || "end" in t) && this.setRange(t.start, t.end);
      }
    }, n.prototype.startRolling = function () {
      function t() {
        e.stopRolling(), e.rolling = !0;var i = e.end - e.start,
            o = p.convert(new Date(), "Date").valueOf(),
            n = o - i * e.options.rollingMode.offset,
            s = o + i * (1 - e.options.rollingMode.offset),
            r = { animation: !1 };e.setRange(n, s, r), i = 1 / e.conversion(e.body.domProps.center.width).scale / 10, i < 30 && (i = 30), i > 1e3 && (i = 1e3), e.body.dom.rollingModeBtn.style.visibility = "hidden", e.currentTimeTimer = setTimeout(t, i);
      }var e = this;t();
    }, n.prototype.stopRolling = function () {
      void 0 !== this.currentTimeTimer && (clearTimeout(this.currentTimeTimer), this.rolling = !1, this.body.dom.rollingModeBtn.style.visibility = "visible");
    }, n.prototype.setRange = function (t, e, i, o, n) {
      i || (i = {}), !0 !== i.byUser && (i.byUser = !1);var s = this,
          r = void 0 != t ? p.convert(t, "Date").valueOf() : null,
          h = void 0 != e ? p.convert(e, "Date").valueOf() : null;if (this._cancelAnimation(), this.millisecondsPerPixelCache = void 0, i.animation) {
        var l = this.start,
            c = this.end,
            m = "object" === (0, u.default)(i.animation) && "duration" in i.animation ? i.animation.duration : 500,
            g = "object" === (0, u.default)(i.animation) && "easingFunction" in i.animation ? i.animation.easingFunction : "easeInOutQuad",
            v = p.easingFunctions[g];if (!v) throw new Error("Unknown easing function " + (0, d.default)(g) + ". Choose from: " + (0, a.default)(p.easingFunctions).join(", "));var y = new Date().valueOf(),
            b = !1;return function t() {
          if (!s.props.touch.dragging) {
            var e = new Date().valueOf(),
                a = e - y,
                d = v(a / m),
                u = a > m,
                p = u || null === r ? r : l + (r - l) * d,
                g = u || null === h ? h : c + (h - c) * d;_ = s._applyRange(p, g), f.updateHiddenDates(s.options.moment, s.body, s.options.hiddenDates), b = b || _;var w = { start: new Date(s.start), end: new Date(s.end), byUser: i.byUser, event: i.event };if (n && n(d, _, u), _ && s.body.emitter.emit("rangechange", w), u) {
              if (b && (s.body.emitter.emit("rangechanged", w), o)) return o();
            } else s.animationTimer = setTimeout(t, 20);
          }
        }();
      }var _ = this._applyRange(r, h);if (f.updateHiddenDates(this.options.moment, this.body, this.options.hiddenDates), _) {
        var w = { start: new Date(this.start), end: new Date(this.end), byUser: i.byUser, event: i.event };if (this.body.emitter.emit("rangechange", w), clearTimeout(s.timeoutID), s.timeoutID = setTimeout(function () {
          s.body.emitter.emit("rangechanged", w);
        }, 200), o) return o();
      }
    }, n.prototype.getMillisecondsPerPixel = function () {
      return void 0 === this.millisecondsPerPixelCache && (this.millisecondsPerPixelCache = (this.end - this.start) / this.body.dom.center.clientWidth), this.millisecondsPerPixelCache;
    }, n.prototype._cancelAnimation = function () {
      this.animationTimer && (clearTimeout(this.animationTimer), this.animationTimer = null);
    }, n.prototype._applyRange = function (t, e) {
      var i,
          o = null != t ? p.convert(t, "Date").valueOf() : this.start,
          n = null != e ? p.convert(e, "Date").valueOf() : this.end,
          s = null != this.options.max ? p.convert(this.options.max, "Date").valueOf() : null,
          r = null != this.options.min ? p.convert(this.options.min, "Date").valueOf() : null;if (isNaN(o) || null === o) throw new Error('Invalid start "' + t + '"');if (isNaN(n) || null === n) throw new Error('Invalid end "' + e + '"');if (n < o && (n = o), null !== r && o < r && (i = r - o, o += i, n += i, null != s && n > s && (n = s)), null !== s && n > s && (i = n - s, o -= i, n -= i, null != r && o < r && (o = r)), null !== this.options.zoomMin) {
        var a = parseFloat(this.options.zoomMin);if (a < 0 && (a = 0), n - o < a) {
          this.end - this.start === a && o >= this.start - .5 && n <= this.end ? (o = this.start, n = this.end) : (i = a - (n - o), o -= i / 2, n += i / 2);
        }
      }if (null !== this.options.zoomMax) {
        var h = parseFloat(this.options.zoomMax);h < 0 && (h = 0), n - o > h && (this.end - this.start === h && o < this.start && n > this.end ? (o = this.start, n = this.end) : (i = n - o - h, o += i / 2, n -= i / 2));
      }var d = this.start != o || this.end != n;return o >= this.start && o <= this.end || n >= this.start && n <= this.end || this.start >= o && this.start <= n || this.end >= o && this.end <= n || this.body.emitter.emit("checkRangedItems"), this.start = o, this.end = n, d;
    }, n.prototype.getRange = function () {
      return { start: this.start, end: this.end };
    }, n.prototype.conversion = function (t, e) {
      return n.conversion(this.start, this.end, t, e);
    }, n.conversion = function (t, e, i, o) {
      return void 0 === o && (o = 0), 0 != i && e - t != 0 ? { offset: t, scale: i / (e - t - o) } : { offset: 0, scale: 1 };
    }, n.prototype._onDragStart = function (t) {
      this.deltaDifference = 0, this.previousDelta = 0, this.options.moveable && this._isInsideRange(t) && this.props.touch.allowDragging && (this.stopRolling(), this.props.touch.start = this.start, this.props.touch.end = this.end, this.props.touch.dragging = !0, this.body.dom.root && (this.body.dom.root.style.cursor = "move"));
    }, n.prototype._onDrag = function (t) {
      if (t && this.props.touch.dragging && this.options.moveable && this.props.touch.allowDragging) {
        var e = this.options.direction;s(e);var i = "horizontal" == e ? t.deltaX : t.deltaY;i -= this.deltaDifference;var o = this.props.touch.end - this.props.touch.start;o -= f.getHiddenDurationBetween(this.body.hiddenDates, this.start, this.end);var n,
            r = "horizontal" == e ? this.body.domProps.center.width : this.body.domProps.center.height;n = this.options.rtl ? i / r * o : -i / r * o;var a = this.props.touch.start + n,
            h = this.props.touch.end + n,
            d = f.snapAwayFromHidden(this.body.hiddenDates, a, this.previousDelta - i, !0),
            l = f.snapAwayFromHidden(this.body.hiddenDates, h, this.previousDelta - i, !0);if (d != a || l != h) return this.deltaDifference += i, this.props.touch.start = d, this.props.touch.end = l, void this._onDrag(t);this.previousDelta = i, this._applyRange(a, h);var u = new Date(this.start),
            p = new Date(this.end);this.body.emitter.emit("rangechange", { start: u, end: p, byUser: !0, event: t }), this.body.emitter.emit("panmove");
      }
    }, n.prototype._onDragEnd = function (t) {
      this.props.touch.dragging && this.options.moveable && this.props.touch.allowDragging && (this.props.touch.dragging = !1, this.body.dom.root && (this.body.dom.root.style.cursor = "auto"), this.body.emitter.emit("rangechanged", { start: new Date(this.start), end: new Date(this.end), byUser: !0, event: t }));
    }, n.prototype._onMouseWheel = function (t) {
      var e = 0;if (t.wheelDelta ? e = t.wheelDelta / 120 : t.detail && (e = -t.detail / 3), !(this.options.zoomKey && !t[this.options.zoomKey] && this.options.zoomable || !this.options.zoomable && this.options.moveable) && this.options.zoomable && this.options.moveable && this._isInsideRange(t) && e) {
        var i;i = e < 0 ? 1 - e / 5 : 1 / (1 + e / 5);var o;if (this.rolling) o = this.start + (this.end - this.start) * this.options.rollingMode.offset;else {
          var n = this.getPointer({ x: t.clientX, y: t.clientY }, this.body.dom.center);o = this._pointerToDate(n);
        }this.zoom(i, o, e, t), t.preventDefault();
      }
    }, n.prototype._onTouch = function (t) {
      this.props.touch.start = this.start, this.props.touch.end = this.end, this.props.touch.allowDragging = !0, this.props.touch.center = null, this.scaleOffset = 0, this.deltaDifference = 0, p.preventDefault(t);
    }, n.prototype._onPinch = function (t) {
      if (this.options.zoomable && this.options.moveable) {
        p.preventDefault(t), this.props.touch.allowDragging = !1, this.props.touch.center || (this.props.touch.center = this.getPointer(t.center, this.body.dom.center)), this.stopRolling();var e = 1 / (t.scale + this.scaleOffset),
            i = this._pointerToDate(this.props.touch.center),
            o = f.getHiddenDurationBetween(this.body.hiddenDates, this.start, this.end),
            n = f.getHiddenDurationBefore(this.options.moment, this.body.hiddenDates, this, i),
            s = o - n,
            r = i - n + (this.props.touch.start - (i - n)) * e,
            a = i + s + (this.props.touch.end - (i + s)) * e;this.startToFront = 1 - e <= 0, this.endToFront = e - 1 <= 0;var h = f.snapAwayFromHidden(this.body.hiddenDates, r, 1 - e, !0),
            d = f.snapAwayFromHidden(this.body.hiddenDates, a, e - 1, !0);h == r && d == a || (this.props.touch.start = h, this.props.touch.end = d, this.scaleOffset = 1 - t.scale, r = h, a = d);var l = { animation: !1, byUser: !0, event: t };this.setRange(r, a, l), this.startToFront = !1, this.endToFront = !0;
      }
    }, n.prototype._isInsideRange = function (t) {
      var e,
          i = t.center ? t.center.x : t.clientX;e = this.options.rtl ? i - p.getAbsoluteLeft(this.body.dom.centerContainer) : p.getAbsoluteRight(this.body.dom.centerContainer) - i;var o = this.body.util.toTime(e);return o >= this.start && o <= this.end;
    }, n.prototype._pointerToDate = function (t) {
      var e,
          i = this.options.direction;if (s(i), "horizontal" == i) return this.body.util.toTime(t.x).valueOf();var o = this.body.domProps.center.height;return e = this.conversion(o), t.y / e.scale + e.offset;
    }, n.prototype.getPointer = function (t, e) {
      return this.options.rtl ? { x: p.getAbsoluteRight(e) - t.x, y: t.y - p.getAbsoluteTop(e) } : { x: t.x - p.getAbsoluteLeft(e), y: t.y - p.getAbsoluteTop(e) };
    }, n.prototype.zoom = function (t, e, i, o) {
      null == e && (e = (this.start + this.end) / 2);var n = f.getHiddenDurationBetween(this.body.hiddenDates, this.start, this.end),
          s = f.getHiddenDurationBefore(this.options.moment, this.body.hiddenDates, this, e),
          r = n - s,
          a = e - s + (this.start - (e - s)) * t,
          h = e + r + (this.end - (e + r)) * t;this.startToFront = !(i > 0), this.endToFront = !(-i > 0);var d = f.snapAwayFromHidden(this.body.hiddenDates, a, i, !0),
          l = f.snapAwayFromHidden(this.body.hiddenDates, h, -i, !0);d == a && l == h || (a = d, h = l);var u = { animation: !1, byUser: !0, event: o };this.setRange(a, h, u), this.startToFront = !1, this.endToFront = !0;
    }, n.prototype.move = function (t) {
      var e = this.end - this.start,
          i = this.start + e * t,
          o = this.end + e * t;this.start = i, this.end = o;
    }, n.prototype.moveTo = function (t) {
      var e = (this.start + this.end) / 2,
          i = e - t,
          o = this.start - i,
          n = this.end - i,
          s = { animation: !1, byUser: !0, event: null };this.setRange(o, n, s);
    }, t.exports = n;
  }, function (t, e, i) {
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }function n() {}var s = i(16),
        r = o(s),
        a = i(1),
        h = o(a),
        d = i(66),
        l = i(12),
        u = i(67),
        p = i(0),
        c = i(28),
        m = i(132),
        f = i(21),
        g = i(29);d(n.prototype), n.prototype._create = function (t) {
      function e(t) {
        this.isActive() && this.emit("mousewheel", t);var e = 0,
            i = 0;if ("detail" in t && (i = -1 * t.detail), "wheelDelta" in t && (i = t.wheelDelta), "wheelDeltaY" in t && (i = t.wheelDeltaY), "wheelDeltaX" in t && (e = -1 * t.wheelDeltaX), "axis" in t && t.axis === t.HORIZONTAL_AXIS && (e = -1 * i, i = 0), "deltaY" in t && (i = -1 * t.deltaY), "deltaX" in t && (e = t.deltaX), this.options.zoomKey && !t[this.options.zoomKey]) if (t.preventDefault(), this.options.verticalScroll && Math.abs(i) >= Math.abs(e)) {
          var o = this.props.scrollTop,
              n = o + i;this.isActive() && (this._setScrollTop(n), this._redraw(), this.emit("scroll", t));
        } else if (this.options.horizontalScroll) {
          var s = Math.abs(e) >= Math.abs(i) ? e : i,
              r = s / 120 * (this.range.end - this.range.start) / 20,
              a = this.range.start + r,
              h = this.range.end + r,
              d = { animation: !1, byUser: !0, event: t };this.range.setRange(a, h, d);
        }
      }function i(t) {
        if (s.options.verticalScroll && (t.preventDefault(), s.isActive())) {
          var e = -t.target.scrollTop;s._setScrollTop(e), s._redraw(), s.emit("scrollSide", t);
        }
      }function o(t) {
        if (t.preventDefault && t.preventDefault(), !(!t.target.className.indexOf("vis") > -1 || a)) return t.dataTransfer.dropEffect = "move", a = !0, !1;
      }function n(t) {
        t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation();try {
          var e = JSON.parse(t.dataTransfer.getData("text"));if (!e || !e.content) return;
        } catch (t) {
          return !1;
        }return a = !1, t.center = { x: t.clientX, y: t.clientY }, "item" !== e.target ? s.itemSet._onAddItem(t) : s.itemSet._onDropObjectOnItem(t), s.emit("drop", s.getEventProperties(t)), !1;
      }this.dom = {}, this.dom.container = t, this.dom.root = document.createElement("div"), this.dom.background = document.createElement("div"), this.dom.backgroundVertical = document.createElement("div"), this.dom.backgroundHorizontal = document.createElement("div"), this.dom.centerContainer = document.createElement("div"), this.dom.leftContainer = document.createElement("div"), this.dom.rightContainer = document.createElement("div"), this.dom.center = document.createElement("div"), this.dom.left = document.createElement("div"), this.dom.right = document.createElement("div"), this.dom.top = document.createElement("div"), this.dom.bottom = document.createElement("div"), this.dom.shadowTop = document.createElement("div"), this.dom.shadowBottom = document.createElement("div"), this.dom.shadowTopLeft = document.createElement("div"), this.dom.shadowBottomLeft = document.createElement("div"), this.dom.shadowTopRight = document.createElement("div"), this.dom.shadowBottomRight = document.createElement("div"), this.dom.rollingModeBtn = document.createElement("div"), this.dom.root.className = "vis-timeline", this.dom.background.className = "vis-panel vis-background", this.dom.backgroundVertical.className = "vis-panel vis-background vis-vertical", this.dom.backgroundHorizontal.className = "vis-panel vis-background vis-horizontal", this.dom.centerContainer.className = "vis-panel vis-center", this.dom.leftContainer.className = "vis-panel vis-left", this.dom.rightContainer.className = "vis-panel vis-right", this.dom.top.className = "vis-panel vis-top", this.dom.bottom.className = "vis-panel vis-bottom", this.dom.left.className = "vis-content", this.dom.center.className = "vis-content", this.dom.right.className = "vis-content", this.dom.shadowTop.className = "vis-shadow vis-top", this.dom.shadowBottom.className = "vis-shadow vis-bottom", this.dom.shadowTopLeft.className = "vis-shadow vis-top", this.dom.shadowBottomLeft.className = "vis-shadow vis-bottom", this.dom.shadowTopRight.className = "vis-shadow vis-top", this.dom.shadowBottomRight.className = "vis-shadow vis-bottom", this.dom.rollingModeBtn.className = "vis-rolling-mode-btn", this.dom.root.appendChild(this.dom.background), this.dom.root.appendChild(this.dom.backgroundVertical), this.dom.root.appendChild(this.dom.backgroundHorizontal), this.dom.root.appendChild(this.dom.centerContainer), this.dom.root.appendChild(this.dom.leftContainer), this.dom.root.appendChild(this.dom.rightContainer), this.dom.root.appendChild(this.dom.top), this.dom.root.appendChild(this.dom.bottom), this.dom.root.appendChild(this.dom.bottom), this.dom.root.appendChild(this.dom.rollingModeBtn), this.dom.centerContainer.appendChild(this.dom.center), this.dom.leftContainer.appendChild(this.dom.left), this.dom.rightContainer.appendChild(this.dom.right), this.dom.centerContainer.appendChild(this.dom.shadowTop), this.dom.centerContainer.appendChild(this.dom.shadowBottom), this.dom.leftContainer.appendChild(this.dom.shadowTopLeft), this.dom.leftContainer.appendChild(this.dom.shadowBottomLeft), this.dom.rightContainer.appendChild(this.dom.shadowTopRight), this.dom.rightContainer.appendChild(this.dom.shadowBottomRight), this.props = { root: {}, background: {}, centerContainer: {}, leftContainer: {}, rightContainer: {}, center: {}, left: {}, right: {}, top: {}, bottom: {}, border: {}, scrollTop: 0, scrollTopMin: 0 }, this.on("rangechange", function () {
        !0 === this.initialDrawDone && this._redraw();
      }.bind(this)), this.on("rangechanged", function () {
        this.initialRangeChangeDone || (this.initialRangeChangeDone = !0);
      }.bind(this)), this.on("touch", this._onTouch.bind(this)), this.on("panmove", this._onDrag.bind(this));var s = this;this._origRedraw = this._redraw.bind(this), this._redraw = p.throttle(this._origRedraw), this.on("_change", function (t) {
        s.itemSet && s.itemSet.initialItemSetDrawn && t && 1 == t.queue ? s._redraw() : s._origRedraw();
      }), this.hammer = new l(this.dom.root);var r = this.hammer.get("pinch").set({ enable: !0 });u.disablePreventDefaultVertically(r), this.hammer.get("pan").set({ threshold: 5, direction: l.DIRECTION_HORIZONTAL }), this.listeners = {}, ["tap", "doubletap", "press", "pinch", "pan", "panstart", "panmove", "panend"].forEach(function (t) {
        var e = function e(_e3) {
          s.isActive() && s.emit(t, _e3);
        };s.hammer.on(t, e), s.listeners[t] = e;
      }), u.onTouch(this.hammer, function (t) {
        s.emit("touch", t);
      }.bind(this)), u.onRelease(this.hammer, function (t) {
        s.emit("release", t);
      }.bind(this)), this.dom.centerContainer.addEventListener ? (this.dom.centerContainer.addEventListener("mousewheel", e.bind(this), !1), this.dom.centerContainer.addEventListener("DOMMouseScroll", e.bind(this), !1)) : this.dom.centerContainer.attachEvent("onmousewheel", e.bind(this)), this.dom.left.parentNode.addEventListener("scroll", i.bind(this)), this.dom.right.parentNode.addEventListener("scroll", i.bind(this));var a = !1;if (this.dom.center.addEventListener("dragover", o.bind(this), !1), this.dom.center.addEventListener("drop", n.bind(this), !1), this.customTimes = [], this.touch = {}, this.redrawCount = 0, this.initialDrawDone = !1, this.initialRangeChangeDone = !1, !t) throw new Error("No container provided");t.appendChild(this.dom.root);
    }, n.prototype.setOptions = function (t) {
      if (t) {
        var e = ["width", "height", "minHeight", "maxHeight", "autoResize", "start", "end", "clickToUse", "dataAttributes", "hiddenDates", "locale", "locales", "moment", "rtl", "zoomKey", "horizontalScroll", "verticalScroll"];if (p.selectiveExtend(e, this.options, t), this.dom.rollingModeBtn.style.visibility = "hidden", this.options.rtl && (this.dom.container.style.direction = "rtl", this.dom.backgroundVertical.className = "vis-panel vis-background vis-vertical-rtl"), this.options.verticalScroll && (this.options.rtl ? this.dom.rightContainer.className = "vis-panel vis-right vis-vertical-scroll" : this.dom.leftContainer.className = "vis-panel vis-left vis-vertical-scroll"), "object" !== (0, h.default)(this.options.orientation) && (this.options.orientation = { item: void 0, axis: void 0 }), "orientation" in t && ("string" == typeof t.orientation ? this.options.orientation = { item: t.orientation, axis: t.orientation } : "object" === (0, h.default)(t.orientation) && ("item" in t.orientation && (this.options.orientation.item = t.orientation.item), "axis" in t.orientation && (this.options.orientation.axis = t.orientation.axis))), "both" === this.options.orientation.axis) {
          if (!this.timeAxis2) {
            var i = this.timeAxis2 = new c(this.body);i.setOptions = function (t) {
              var e = t ? p.extend({}, t) : {};e.orientation = "top", c.prototype.setOptions.call(i, e);
            }, this.components.push(i);
          }
        } else if (this.timeAxis2) {
          var o = this.components.indexOf(this.timeAxis2);-1 !== o && this.components.splice(o, 1), this.timeAxis2.destroy(), this.timeAxis2 = null;
        }if ("function" == typeof t.drawPoints && (t.drawPoints = { onRender: t.drawPoints }), "hiddenDates" in this.options && f.convertHiddenOptions(this.options.moment, this.body, this.options.hiddenDates), "clickToUse" in t && (t.clickToUse ? this.activator || (this.activator = new m(this.dom.root)) : this.activator && (this.activator.destroy(), delete this.activator)), "showCustomTime" in t) throw new Error("Option `showCustomTime` is deprecated. Create a custom time bar via timeline.addCustomTime(time [, id])");this._initAutoResize();
      }if (this.components.forEach(function (e) {
        return e.setOptions(t);
      }), "configure" in t) {
        this.configurator || (this.configurator = this._createConfigurator()), this.configurator.setOptions(t.configure);var n = p.deepExtend({}, this.options);this.components.forEach(function (t) {
          p.deepExtend(n, t.options);
        }), this.configurator.setModuleOptions({ global: n });
      }this._redraw();
    }, n.prototype.isActive = function () {
      return !this.activator || this.activator.active;
    }, n.prototype.destroy = function () {
      this.setItems(null), this.setGroups(null), this.off(), this._stopAutoResize(), this.dom.root.parentNode && this.dom.root.parentNode.removeChild(this.dom.root), this.dom = null, this.activator && (this.activator.destroy(), delete this.activator);for (var t in this.listeners) {
        this.listeners.hasOwnProperty(t) && delete this.listeners[t];
      }this.listeners = null, this.hammer = null, this.components.forEach(function (t) {
        return t.destroy();
      }), this.body = null;
    }, n.prototype.setCustomTime = function (t, e) {
      var i = this.customTimes.filter(function (t) {
        return e === t.options.id;
      });if (0 === i.length) throw new Error("No custom time bar found with id " + (0, r.default)(e));i.length > 0 && i[0].setCustomTime(t);
    }, n.prototype.getCustomTime = function (t) {
      var e = this.customTimes.filter(function (e) {
        return e.options.id === t;
      });if (0 === e.length) throw new Error("No custom time bar found with id " + (0, r.default)(t));return e[0].getCustomTime();
    }, n.prototype.setCustomTimeTitle = function (t, e) {
      var i = this.customTimes.filter(function (t) {
        return t.options.id === e;
      });if (0 === i.length) throw new Error("No custom time bar found with id " + (0, r.default)(e));if (i.length > 0) return i[0].setCustomTitle(t);
    }, n.prototype.getEventProperties = function (t) {
      return { event: t };
    }, n.prototype.addCustomTime = function (t, e) {
      var i = void 0 !== t ? p.convert(t, "Date").valueOf() : new Date();if (this.customTimes.some(function (t) {
        return t.options.id === e;
      })) throw new Error("A custom time with id " + (0, r.default)(e) + " already exists");var o = new g(this.body, p.extend({}, this.options, { time: i, id: e }));return this.customTimes.push(o), this.components.push(o), this._redraw(), e;
    }, n.prototype.removeCustomTime = function (t) {
      var e = this.customTimes.filter(function (e) {
        return e.options.id === t;
      });if (0 === e.length) throw new Error("No custom time bar found with id " + (0, r.default)(t));e.forEach(function (t) {
        this.customTimes.splice(this.customTimes.indexOf(t), 1), this.components.splice(this.components.indexOf(t), 1), t.destroy();
      }.bind(this));
    }, n.prototype.getVisibleItems = function () {
      return this.itemSet && this.itemSet.getVisibleItems() || [];
    }, n.prototype.fit = function (t, e) {
      var i = this.getDataRange();if (null !== i.min || null !== i.max) {
        var o = i.max - i.min,
            n = new Date(i.min.valueOf() - .01 * o),
            s = new Date(i.max.valueOf() + .01 * o),
            r = !t || void 0 === t.animation || t.animation;this.range.setRange(n, s, { animation: r }, e);
      }
    }, n.prototype.getDataRange = function () {
      throw new Error("Cannot invoke abstract method getDataRange");
    }, n.prototype.setWindow = function (t, e, i, o) {
      "function" == typeof arguments[2] && (o = arguments[2], i = {});var n, s;1 == arguments.length ? (s = arguments[0], n = void 0 === s.animation || s.animation, this.range.setRange(s.start, s.end, { animation: n })) : 2 == arguments.length && "function" == typeof arguments[1] ? (s = arguments[0], o = arguments[1], n = void 0 === s.animation || s.animation, this.range.setRange(s.start, s.end, { animation: n }, o)) : (n = !i || void 0 === i.animation || i.animation, this.range.setRange(t, e, { animation: n }, o));
    }, n.prototype.moveTo = function (t, e, i) {
      "function" == typeof arguments[1] && (i = arguments[1], e = {});var o = this.range.end - this.range.start,
          n = p.convert(t, "Date").valueOf(),
          s = n - o / 2,
          r = n + o / 2,
          a = !e || void 0 === e.animation || e.animation;this.range.setRange(s, r, { animation: a }, i);
    }, n.prototype.getWindow = function () {
      var t = this.range.getRange();return { start: new Date(t.start), end: new Date(t.end) };
    }, n.prototype.zoomIn = function (t, e, i) {
      if (!(!t || t < 0 || t > 1)) {
        "function" == typeof arguments[1] && (i = arguments[1], e = {});var o = this.getWindow(),
            n = o.start.valueOf(),
            s = o.end.valueOf(),
            r = s - n,
            a = r / (1 + t),
            h = (r - a) / 2,
            d = n + h,
            l = s - h;this.setWindow(d, l, e, i);
      }
    }, n.prototype.zoomOut = function (t, e, i) {
      if (!(!t || t < 0 || t > 1)) {
        "function" == typeof arguments[1] && (i = arguments[1], e = {});var o = this.getWindow(),
            n = o.start.valueOf(),
            s = o.end.valueOf(),
            r = s - n,
            a = n - r * t / 2,
            h = s + r * t / 2;this.setWindow(a, h, e, i);
      }
    }, n.prototype.redraw = function () {
      this._redraw();
    }, n.prototype._redraw = function () {
      this.redrawCount++;var t = !1,
          e = this.options,
          i = this.props,
          o = this.dom;if (o && o.container && 0 != o.root.offsetWidth) {
        f.updateHiddenDates(this.options.moment, this.body, this.options.hiddenDates), "top" == e.orientation ? (p.addClassName(o.root, "vis-top"), p.removeClassName(o.root, "vis-bottom")) : (p.removeClassName(o.root, "vis-top"), p.addClassName(o.root, "vis-bottom")), o.root.style.maxHeight = p.option.asSize(e.maxHeight, ""), o.root.style.minHeight = p.option.asSize(e.minHeight, ""), o.root.style.width = p.option.asSize(e.width, ""), i.border.left = (o.centerContainer.offsetWidth - o.centerContainer.clientWidth) / 2, i.border.right = i.border.left, i.border.top = (o.centerContainer.offsetHeight - o.centerContainer.clientHeight) / 2, i.border.bottom = i.border.top, i.borderRootHeight = o.root.offsetHeight - o.root.clientHeight, i.borderRootWidth = o.root.offsetWidth - o.root.clientWidth, 0 === o.centerContainer.clientHeight && (i.border.left = i.border.top, i.border.right = i.border.left), 0 === o.root.clientHeight && (i.borderRootWidth = i.borderRootHeight), i.center.height = o.center.offsetHeight, i.left.height = o.left.offsetHeight, i.right.height = o.right.offsetHeight, i.top.height = o.top.clientHeight || -i.border.top, i.bottom.height = o.bottom.clientHeight || -i.border.bottom;var n = Math.max(i.left.height, i.center.height, i.right.height),
            s = i.top.height + n + i.bottom.height + i.borderRootHeight + i.border.top + i.border.bottom;o.root.style.height = p.option.asSize(e.height, s + "px"), i.root.height = o.root.offsetHeight, i.background.height = i.root.height - i.borderRootHeight;var r = i.root.height - i.top.height - i.bottom.height - i.borderRootHeight;i.centerContainer.height = r, i.leftContainer.height = r, i.rightContainer.height = i.leftContainer.height, i.root.width = o.root.offsetWidth, i.background.width = i.root.width - i.borderRootWidth, this.initialDrawDone || (i.scrollbarWidth = p.getScrollBarWidth()), e.verticalScroll ? e.rtl ? (i.left.width = o.leftContainer.clientWidth || -i.border.left, i.right.width = o.rightContainer.clientWidth + i.scrollbarWidth || -i.border.right) : (i.left.width = o.leftContainer.clientWidth + i.scrollbarWidth || -i.border.left, i.right.width = o.rightContainer.clientWidth || -i.border.right) : (i.left.width = o.leftContainer.clientWidth || -i.border.left, i.right.width = o.rightContainer.clientWidth || -i.border.right), this._setDOM();var a = this._updateScrollTop();"top" != e.orientation.item && (a += Math.max(i.centerContainer.height - i.center.height - i.border.top - i.border.bottom, 0)), o.center.style.top = a + "px";var h = 0 == i.scrollTop ? "hidden" : "",
            d = i.scrollTop == i.scrollTopMin ? "hidden" : "";o.shadowTop.style.visibility = h, o.shadowBottom.style.visibility = d, o.shadowTopLeft.style.visibility = h, o.shadowBottomLeft.style.visibility = d, o.shadowTopRight.style.visibility = h, o.shadowBottomRight.style.visibility = d, e.verticalScroll && (o.rightContainer.className = "vis-panel vis-right vis-vertical-scroll", o.leftContainer.className = "vis-panel vis-left vis-vertical-scroll", o.shadowTopRight.style.visibility = "hidden", o.shadowBottomRight.style.visibility = "hidden", o.shadowTopLeft.style.visibility = "hidden", o.shadowBottomLeft.style.visibility = "hidden", o.left.style.top = "0px", o.right.style.top = "0px"), (!e.verticalScroll || i.center.height < i.centerContainer.height) && (o.left.style.top = a + "px", o.right.style.top = a + "px", o.rightContainer.className = o.rightContainer.className.replace(new RegExp("(?:^|\\s)vis-vertical-scroll(?:\\s|$)"), " "), o.leftContainer.className = o.leftContainer.className.replace(new RegExp("(?:^|\\s)vis-vertical-scroll(?:\\s|$)"), " "), i.left.width = o.leftContainer.clientWidth || -i.border.left, i.right.width = o.rightContainer.clientWidth || -i.border.right, this._setDOM());var u = i.center.height > i.centerContainer.height;this.hammer.get("pan").set({ direction: u ? l.DIRECTION_ALL : l.DIRECTION_HORIZONTAL }), this.components.forEach(function (e) {
          t = e.redraw() || t;
        });if (t) {
          if (this.redrawCount < 5) return void this.body.emitter.emit("_change");console.log("WARNING: infinite loop in redraw?");
        } else this.redrawCount = 0;this.body.emitter.emit("changed");
      }
    }, n.prototype._setDOM = function () {
      var t = this.props,
          e = this.dom;t.leftContainer.width = t.left.width, t.rightContainer.width = t.right.width;var i = t.root.width - t.left.width - t.right.width - t.borderRootWidth;t.center.width = i, t.centerContainer.width = i, t.top.width = i, t.bottom.width = i, e.background.style.height = t.background.height + "px", e.backgroundVertical.style.height = t.background.height + "px", e.backgroundHorizontal.style.height = t.centerContainer.height + "px", e.centerContainer.style.height = t.centerContainer.height + "px", e.leftContainer.style.height = t.leftContainer.height + "px", e.rightContainer.style.height = t.rightContainer.height + "px", e.background.style.width = t.background.width + "px", e.backgroundVertical.style.width = t.centerContainer.width + "px", e.backgroundHorizontal.style.width = t.background.width + "px", e.centerContainer.style.width = t.center.width + "px", e.top.style.width = t.top.width + "px", e.bottom.style.width = t.bottom.width + "px", e.background.style.left = "0", e.background.style.top = "0", e.backgroundVertical.style.left = t.left.width + t.border.left + "px", e.backgroundVertical.style.top = "0", e.backgroundHorizontal.style.left = "0", e.backgroundHorizontal.style.top = t.top.height + "px", e.centerContainer.style.left = t.left.width + "px", e.centerContainer.style.top = t.top.height + "px", e.leftContainer.style.left = "0", e.leftContainer.style.top = t.top.height + "px", e.rightContainer.style.left = t.left.width + t.center.width + "px", e.rightContainer.style.top = t.top.height + "px", e.top.style.left = t.left.width + "px", e.top.style.top = "0", e.bottom.style.left = t.left.width + "px", e.bottom.style.top = t.top.height + t.centerContainer.height + "px", e.center.style.left = "0", e.left.style.left = "0", e.right.style.left = "0";
    }, n.prototype.repaint = function () {
      throw new Error("Function repaint is deprecated. Use redraw instead.");
    }, n.prototype.setCurrentTime = function (t) {
      if (!this.currentTime) throw new Error("Option showCurrentTime must be true");this.currentTime.setCurrentTime(t);
    }, n.prototype.getCurrentTime = function () {
      if (!this.currentTime) throw new Error("Option showCurrentTime must be true");return this.currentTime.getCurrentTime();
    }, n.prototype._toTime = function (t) {
      return f.toTime(this, t, this.props.center.width);
    }, n.prototype._toGlobalTime = function (t) {
      return f.toTime(this, t, this.props.root.width);
    }, n.prototype._toScreen = function (t) {
      return f.toScreen(this, t, this.props.center.width);
    }, n.prototype._toGlobalScreen = function (t) {
      return f.toScreen(this, t, this.props.root.width);
    }, n.prototype._initAutoResize = function () {
      1 == this.options.autoResize ? this._startAutoResize() : this._stopAutoResize();
    }, n.prototype._startAutoResize = function () {
      var t = this;this._stopAutoResize(), this._onResize = function () {
        if (1 != t.options.autoResize) return void t._stopAutoResize();t.dom.root && (t.dom.root.offsetWidth == t.props.lastWidth && t.dom.root.offsetHeight == t.props.lastHeight || (t.props.lastWidth = t.dom.root.offsetWidth, t.props.lastHeight = t.dom.root.offsetHeight, t.props.scrollbarWidth = p.getScrollBarWidth(), t.body.emitter.emit("_change")));
      }, p.addEventListener(window, "resize", this._onResize), t.dom.root && (t.props.lastWidth = t.dom.root.offsetWidth, t.props.lastHeight = t.dom.root.offsetHeight), this.watchTimer = setInterval(this._onResize, 1e3);
    }, n.prototype._stopAutoResize = function () {
      this.watchTimer && (clearInterval(this.watchTimer), this.watchTimer = void 0), this._onResize && (p.removeEventListener(window, "resize", this._onResize), this._onResize = null);
    }, n.prototype._onTouch = function (t) {
      this.touch.allowDragging = !0, this.touch.initialScrollTop = this.props.scrollTop;
    }, n.prototype._onPinch = function (t) {
      this.touch.allowDragging = !1;
    }, n.prototype._onDrag = function (t) {
      if (t && this.touch.allowDragging) {
        var e = t.deltaY,
            i = this._getScrollTop(),
            o = this._setScrollTop(this.touch.initialScrollTop + e);this.options.verticalScroll && (this.dom.left.parentNode.scrollTop = -this.props.scrollTop, this.dom.right.parentNode.scrollTop = -this.props.scrollTop), o != i && this.emit("verticalDrag");
      }
    }, n.prototype._setScrollTop = function (t) {
      return this.props.scrollTop = t, this._updateScrollTop(), this.props.scrollTop;
    }, n.prototype._updateScrollTop = function () {
      var t = Math.min(this.props.centerContainer.height - this.props.center.height, 0);return t != this.props.scrollTopMin && ("top" != this.options.orientation.item && (this.props.scrollTop += t - this.props.scrollTopMin), this.props.scrollTopMin = t), this.props.scrollTop > 0 && (this.props.scrollTop = 0), this.props.scrollTop < t && (this.props.scrollTop = t), this.options.verticalScroll && (this.dom.left.parentNode.scrollTop = -this.props.scrollTop, this.dom.right.parentNode.scrollTop = -this.props.scrollTop), this.props.scrollTop;
    }, n.prototype._getScrollTop = function () {
      return this.props.scrollTop;
    }, n.prototype._createConfigurator = function () {
      throw new Error("Cannot invoke abstract method _createConfigurator");
    }, t.exports = n;
  }, function (t, e, i) {
    function o(t, e, i, s, r) {
      this.moment = n, this.current = this.moment(), this._start = this.moment(), this._end = this.moment(), this.autoScale = !0, this.scale = "day", this.step = 1, this.setRange(t, e, i), this.switchedDay = !1, this.switchedMonth = !1, this.switchedYear = !1, Array.isArray(s) ? this.hiddenDates = s : this.hiddenDates = void 0 != s ? [s] : [], this.format = o.FORMAT, this.options = r || {};
    }var n = i(3),
        s = i(21),
        r = i(0);o.FORMAT = { minorLabels: { millisecond: "SSS", second: "s", minute: "HH:mm", hour: "HH:mm", weekday: "ddd D", day: "D", week: "w", month: "MMM", year: "YYYY" }, majorLabels: { millisecond: "HH:mm:ss", second: "D MMMM HH:mm", minute: "ddd D MMMM", hour: "ddd D MMMM", weekday: "MMMM YYYY", day: "MMMM YYYY", week: "MMMM YYYY", month: "YYYY", year: "" } }, o.prototype.setMoment = function (t) {
      this.moment = t, this.current = this.moment(this.current.valueOf()), this._start = this.moment(this._start.valueOf()), this._end = this.moment(this._end.valueOf());
    }, o.prototype.setFormat = function (t) {
      var e = r.deepExtend({}, o.FORMAT);this.format = r.deepExtend(e, t);
    }, o.prototype.setRange = function (t, e, i) {
      if (!(t instanceof Date && e instanceof Date)) throw "No legal start or end date in method setRange";this._start = void 0 != t ? this.moment(t.valueOf()) : new Date(), this._end = void 0 != e ? this.moment(e.valueOf()) : new Date(), this.autoScale && this.setMinimumStep(i);
    }, o.prototype.start = function () {
      this.current = this._start.clone(), this.roundToMinor();
    }, o.prototype.roundToMinor = function () {
      switch ("week" == this.scale && this.current.weekday(0), this.scale) {case "year":
          this.current.year(this.step * Math.floor(this.current.year() / this.step)), this.current.month(0);case "month":
          this.current.date(1);case "week":case "day":case "weekday":
          this.current.hours(0);case "hour":
          this.current.minutes(0);case "minute":
          this.current.seconds(0);case "second":
          this.current.milliseconds(0);}if (1 != this.step) switch (this.scale) {case "millisecond":
          this.current.subtract(this.current.milliseconds() % this.step, "milliseconds");break;case "second":
          this.current.subtract(this.current.seconds() % this.step, "seconds");break;case "minute":
          this.current.subtract(this.current.minutes() % this.step, "minutes");break;case "hour":
          this.current.subtract(this.current.hours() % this.step, "hours");break;case "weekday":case "day":
          this.current.subtract((this.current.date() - 1) % this.step, "day");break;case "week":
          this.current.subtract(this.current.week() % this.step, "week");break;case "month":
          this.current.subtract(this.current.month() % this.step, "month");break;case "year":
          this.current.subtract(this.current.year() % this.step, "year");}
    }, o.prototype.hasNext = function () {
      return this.current.valueOf() <= this._end.valueOf();
    }, o.prototype.next = function () {
      var t = this.current.valueOf();switch (this.scale) {case "millisecond":
          this.current.add(this.step, "millisecond");break;case "second":
          this.current.add(this.step, "second");break;case "minute":
          this.current.add(this.step, "minute");break;case "hour":
          this.current.add(this.step, "hour"), this.current.month() < 6 ? this.current.subtract(this.current.hours() % this.step, "hour") : this.current.hours() % this.step != 0 && this.current.add(this.step - this.current.hours() % this.step, "hour");break;case "weekday":case "day":
          this.current.add(this.step, "day");break;case "week":
          if (0 !== this.current.weekday()) this.current.weekday(0), this.current.add(this.step, "week");else if (!1 === this.options.showMajorLabels) this.current.add(this.step, "week");else {
            var e = this.current.clone();e.add(1, "week"), e.isSame(this.current, "month") ? this.current.add(this.step, "week") : (this.current.add(this.step, "week"), this.current.date(1));
          }break;case "month":
          this.current.add(this.step, "month");break;case "year":
          this.current.add(this.step, "year");}if (1 != this.step) switch (this.scale) {case "millisecond":
          this.current.milliseconds() > 0 && this.current.milliseconds() < this.step && this.current.milliseconds(0);break;case "second":
          this.current.seconds() > 0 && this.current.seconds() < this.step && this.current.seconds(0);break;case "minute":
          this.current.minutes() > 0 && this.current.minutes() < this.step && this.current.minutes(0);break;case "hour":
          this.current.hours() > 0 && this.current.hours() < this.step && this.current.hours(0);break;case "weekday":case "day":
          this.current.date() < this.step + 1 && this.current.date(1);break;case "week":
          this.current.week() < this.step && this.current.week(1);break;case "month":
          this.current.month() < this.step && this.current.month(0);}this.current.valueOf() == t && (this.current = this._end.clone()), this.switchedDay = !1, this.switchedMonth = !1, this.switchedYear = !1, s.stepOverHiddenDates(this.moment, this, t);
    }, o.prototype.getCurrent = function () {
      return this.current;
    }, o.prototype.setScale = function (t) {
      t && "string" == typeof t.scale && (this.scale = t.scale, this.step = t.step > 0 ? t.step : 1, this.autoScale = !1);
    }, o.prototype.setAutoScale = function (t) {
      this.autoScale = t;
    }, o.prototype.setMinimumStep = function (t) {
      if (void 0 != t) {
        31104e9 > t && (this.scale = "year", this.step = 1e3), 15552e9 > t && (this.scale = "year", this.step = 500), 31104e8 > t && (this.scale = "year", this.step = 100), 15552e8 > t && (this.scale = "year", this.step = 50), 31104e7 > t && (this.scale = "year", this.step = 10), 15552e7 > t && (this.scale = "year", this.step = 5), 31104e6 > t && (this.scale = "year", this.step = 1), 7776e6 > t && (this.scale = "month", this.step = 3), 2592e6 > t && (this.scale = "month", this.step = 1), 432e6 > t && (this.scale = "day", this.step = 5), 1728e5 > t && (this.scale = "day", this.step = 2), 864e5 > t && (this.scale = "day", this.step = 1), 432e5 > t && (this.scale = "weekday", this.step = 1), 144e5 > t && (this.scale = "hour", this.step = 4), 36e5 > t && (this.scale = "hour", this.step = 1), 9e5 > t && (this.scale = "minute", this.step = 15), 6e5 > t && (this.scale = "minute", this.step = 10), 3e5 > t && (this.scale = "minute", this.step = 5), 6e4 > t && (this.scale = "minute", this.step = 1), 15e3 > t && (this.scale = "second", this.step = 15), 1e4 > t && (this.scale = "second", this.step = 10), 5e3 > t && (this.scale = "second", this.step = 5), 1e3 > t && (this.scale = "second", this.step = 1), 200 > t && (this.scale = "millisecond", this.step = 200), 100 > t && (this.scale = "millisecond", this.step = 100), 50 > t && (this.scale = "millisecond", this.step = 50), 10 > t && (this.scale = "millisecond", this.step = 10), 5 > t && (this.scale = "millisecond", this.step = 5), 1 > t && (this.scale = "millisecond", this.step = 1);
      }
    }, o.snap = function (t, e, i) {
      var o = n(t);if ("year" == e) {
        var s = o.year() + Math.round(o.month() / 12);o.year(Math.round(s / i) * i), o.month(0), o.date(0), o.hours(0), o.minutes(0), o.seconds(0), o.milliseconds(0);
      } else if ("month" == e) o.date() > 15 ? (o.date(1), o.add(1, "month")) : o.date(1), o.hours(0), o.minutes(0), o.seconds(0), o.milliseconds(0);else if ("week" == e) o.weekday() > 2 ? (o.weekday(0), o.add(1, "week")) : o.weekday(0), o.hours(0), o.minutes(0), o.seconds(0), o.milliseconds(0);else if ("day" == e) {
        switch (i) {case 5:case 2:
            o.hours(24 * Math.round(o.hours() / 24));break;default:
            o.hours(12 * Math.round(o.hours() / 12));}o.minutes(0), o.seconds(0), o.milliseconds(0);
      } else if ("weekday" == e) {
        switch (i) {case 5:case 2:
            o.hours(12 * Math.round(o.hours() / 12));break;default:
            o.hours(6 * Math.round(o.hours() / 6));}o.minutes(0), o.seconds(0), o.milliseconds(0);
      } else if ("hour" == e) {
        switch (i) {case 4:
            o.minutes(60 * Math.round(o.minutes() / 60));break;default:
            o.minutes(30 * Math.round(o.minutes() / 30));}o.seconds(0), o.milliseconds(0);
      } else if ("minute" == e) {
        switch (i) {case 15:case 10:
            o.minutes(5 * Math.round(o.minutes() / 5)), o.seconds(0);break;case 5:
            o.seconds(60 * Math.round(o.seconds() / 60));break;default:
            o.seconds(30 * Math.round(o.seconds() / 30));}o.milliseconds(0);
      } else if ("second" == e) switch (i) {case 15:case 10:
          o.seconds(5 * Math.round(o.seconds() / 5)), o.milliseconds(0);break;case 5:
          o.milliseconds(1e3 * Math.round(o.milliseconds() / 1e3));break;default:
          o.milliseconds(500 * Math.round(o.milliseconds() / 500));} else if ("millisecond" == e) {
        var r = i > 5 ? i / 2 : 1;o.milliseconds(Math.round(o.milliseconds() / r) * r);
      }return o;
    }, o.prototype.isMajor = function () {
      if (1 == this.switchedYear) switch (this.scale) {case "year":case "month":case "week":case "weekday":case "day":case "hour":case "minute":case "second":case "millisecond":
          return !0;default:
          return !1;} else if (1 == this.switchedMonth) switch (this.scale) {case "week":case "weekday":case "day":case "hour":case "minute":case "second":case "millisecond":
          return !0;default:
          return !1;} else if (1 == this.switchedDay) switch (this.scale) {case "millisecond":case "second":case "minute":case "hour":
          return !0;default:
          return !1;}var t = this.moment(this.current);switch (this.scale) {case "millisecond":
          return 0 == t.milliseconds();case "second":
          return 0 == t.seconds();case "minute":
          return 0 == t.hours() && 0 == t.minutes();case "hour":
          return 0 == t.hours();case "weekday":case "day":case "week":
          return 1 == t.date();case "month":
          return 0 == t.month();case "year":default:
          return !1;}
    }, o.prototype.getLabelMinor = function (t) {
      if (void 0 == t && (t = this.current), t instanceof Date && (t = this.moment(t)), "function" == typeof this.format.minorLabels) return this.format.minorLabels(t, this.scale, this.step);var e = this.format.minorLabels[this.scale];switch (this.scale) {case "week":
          if (this.isMajor() && 0 !== t.weekday()) return "";default:
          return e && e.length > 0 ? this.moment(t).format(e) : "";}
    }, o.prototype.getLabelMajor = function (t) {
      if (void 0 == t && (t = this.current), t instanceof Date && (t = this.moment(t)), "function" == typeof this.format.majorLabels) return this.format.majorLabels(t, this.scale, this.step);var e = this.format.majorLabels[this.scale];return e && e.length > 0 ? this.moment(t).format(e) : "";
    }, o.prototype.getClassName = function () {
      function t(t) {
        return t / a % 2 == 0 ? " vis-even" : " vis-odd";
      }function e(t) {
        return t.isSame(new Date(), "day") ? " vis-today" : t.isSame(n().add(1, "day"), "day") ? " vis-tomorrow" : t.isSame(n().add(-1, "day"), "day") ? " vis-yesterday" : "";
      }function i(t) {
        return t.isSame(new Date(), "week") ? " vis-current-week" : "";
      }function o(t) {
        return t.isSame(new Date(), "month") ? " vis-current-month" : "";
      }var n = this.moment,
          s = this.moment(this.current),
          r = s.locale ? s.locale("en") : s.lang("en"),
          a = this.step,
          h = [];switch (this.scale) {case "millisecond":
          h.push(e(r)), h.push(t(r.milliseconds()));break;case "second":
          h.push(e(r)), h.push(t(r.seconds()));break;case "minute":
          h.push(e(r)), h.push(t(r.minutes()));break;case "hour":
          h.push("vis-h" + r.hours() + (4 == this.step ? "-h" + (r.hours() + 4) : "")), h.push(e(r)), h.push(t(r.hours()));break;case "weekday":
          h.push("vis-" + r.format("dddd").toLowerCase()), h.push(e(r)), h.push(i(r)), h.push(t(r.date()));break;case "day":
          h.push("vis-day" + r.date()), h.push("vis-" + r.format("MMMM").toLowerCase()), h.push(e(r)), h.push(o(r)), h.push(this.step <= 2 ? e(r) : ""), h.push(this.step <= 2 ? "vis-" + r.format("dddd").toLowerCase() : ""), h.push(t(r.date() - 1));break;case "week":
          h.push("vis-week" + r.format("w")), h.push(i(r)), h.push(t(r.week()));break;case "month":
          h.push("vis-" + r.format("MMMM").toLowerCase()), h.push(o(r)), h.push(t(r.month()));break;case "year":
          h.push("vis-year" + r.year()), h.push(function (t) {
            return t.isSame(new Date(), "year") ? " vis-current-year" : "";
          }(r)), h.push(t(r.year()));}return h.filter(String).join(" ");
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e) {
      this.body = t, this.defaultOptions = { rtl: !1, showCurrentTime: !0, moment: r, locales: a, locale: "en" }, this.options = n.extend({}, this.defaultOptions), this.offset = 0, this._create(), this.setOptions(e);
    }var n = i(0),
        s = i(5),
        r = i(3),
        a = i(69);o.prototype = new s(), o.prototype._create = function () {
      var t = document.createElement("div");t.className = "vis-current-time", t.style.position = "absolute", t.style.top = "0px", t.style.height = "100%", this.bar = t;
    }, o.prototype.destroy = function () {
      this.options.showCurrentTime = !1, this.redraw(), this.body = null;
    }, o.prototype.setOptions = function (t) {
      t && n.selectiveExtend(["rtl", "showCurrentTime", "moment", "locale", "locales"], this.options, t);
    }, o.prototype.redraw = function () {
      if (this.options.showCurrentTime) {
        var t = this.body.dom.backgroundVertical;this.bar.parentNode != t && (this.bar.parentNode && this.bar.parentNode.removeChild(this.bar), t.appendChild(this.bar), this.start());var e = this.options.moment(new Date().valueOf() + this.offset),
            i = this.body.util.toScreen(e),
            o = this.options.locales[this.options.locale];o || (this.warned || (console.log("WARNING: options.locales['" + this.options.locale + "'] not found. See http://visjs.org/docs/timeline/#Localization"), this.warned = !0), o = this.options.locales.en);var n = o.current + " " + o.time + ": " + e.format("dddd, MMMM Do YYYY, H:mm:ss");n = n.charAt(0).toUpperCase() + n.substring(1), this.options.rtl ? this.bar.style.right = i + "px" : this.bar.style.left = i + "px", this.bar.title = n;
      } else this.bar.parentNode && this.bar.parentNode.removeChild(this.bar), this.stop();return !1;
    }, o.prototype.start = function () {
      function t() {
        e.stop();var i = e.body.range.conversion(e.body.domProps.center.width).scale,
            o = 1 / i / 10;o < 30 && (o = 30), o > 1e3 && (o = 1e3), e.redraw(), e.body.emitter.emit("currentTimeTick"), e.currentTimeTimer = setTimeout(t, o);
      }var e = this;t();
    }, o.prototype.stop = function () {
      void 0 !== this.currentTimeTimer && (clearTimeout(this.currentTimeTimer), delete this.currentTimeTimer);
    }, o.prototype.setCurrentTime = function (t) {
      var e = n.convert(t, "Date").valueOf(),
          i = new Date().valueOf();this.offset = e - i, this.redraw();
    }, o.prototype.getCurrentTime = function () {
      return new Date(new Date().valueOf() + this.offset);
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e, i) {
      if (this.groupId = t, this.subgroups = {}, this.subgroupStack = {}, this.subgroupStackAll = !1, this.doInnerStack = !1, this.subgroupIndex = 0, this.subgroupOrderer = e && e.subgroupOrder, this.itemSet = i, this.isVisible = null, this.stackDirty = !0, e && e.nestedGroups && (this.nestedGroups = e.nestedGroups, 0 == e.showNested ? this.showNested = !1 : this.showNested = !0), e && e.subgroupStack) if ("boolean" == typeof e.subgroupStack) this.doInnerStack = e.subgroupStack, this.subgroupStackAll = e.subgroupStack;else for (var o in e.subgroupStack) {
        this.subgroupStack[o] = e.subgroupStack[o], this.doInnerStack = this.doInnerStack || e.subgroupStack[o];
      }this.nestedInGroup = null, this.dom = {}, this.props = { label: { width: 0, height: 0 } }, this.className = null, this.items = {}, this.visibleItems = [], this.itemsInRange = [], this.orderedItems = { byStart: [], byEnd: [] }, this.checkRangedItems = !1;var n = this;this.itemSet.body.emitter.on("checkRangedItems", function () {
        n.checkRangedItems = !0;
      }), this._create(), this.setData(e);
    }var n = i(4),
        s = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(n),
        r = i(0),
        a = i(71);o.prototype._create = function () {
      var t = document.createElement("div");this.itemSet.options.groupEditable.order ? t.className = "vis-label draggable" : t.className = "vis-label", this.dom.label = t;var e = document.createElement("div");e.className = "vis-inner", t.appendChild(e), this.dom.inner = e;var i = document.createElement("div");i.className = "vis-group", i["timeline-group"] = this, this.dom.foreground = i, this.dom.background = document.createElement("div"), this.dom.background.className = "vis-group", this.dom.axis = document.createElement("div"), this.dom.axis.className = "vis-group", this.dom.marker = document.createElement("div"), this.dom.marker.style.visibility = "hidden", this.dom.marker.style.position = "absolute", this.dom.marker.innerHTML = "", this.dom.background.appendChild(this.dom.marker);
    }, o.prototype.setData = function (t) {
      var e, i;if (this.itemSet.options && this.itemSet.options.groupTemplate ? (i = this.itemSet.options.groupTemplate.bind(this), e = i(t, this.dom.inner)) : e = t && t.content, e instanceof Element) {
        for (this.dom.inner.appendChild(e); this.dom.inner.firstChild;) {
          this.dom.inner.removeChild(this.dom.inner.firstChild);
        }this.dom.inner.appendChild(e);
      } else e instanceof Object ? i(t, this.dom.inner) : this.dom.inner.innerHTML = void 0 !== e && null !== e ? e : this.groupId || "";if (this.dom.label.title = t && t.title || "", this.dom.inner.firstChild ? r.removeClassName(this.dom.inner, "vis-hidden") : r.addClassName(this.dom.inner, "vis-hidden"), t && t.nestedGroups) {
        this.nestedGroups && this.nestedGroups == t.nestedGroups || (this.nestedGroups = t.nestedGroups), void 0 === t.showNested && void 0 !== this.showNested || (0 == t.showNested ? this.showNested = !1 : this.showNested = !0), r.addClassName(this.dom.label, "vis-nesting-group");var o = this.itemSet.options.rtl ? "collapsed-rtl" : "collapsed";this.showNested ? (r.removeClassName(this.dom.label, o), r.addClassName(this.dom.label, "expanded")) : (r.removeClassName(this.dom.label, "expanded"), r.addClassName(this.dom.label, o));
      } else this.nestedGroups && (this.nestedGroups = null, o = this.itemSet.options.rtl ? "collapsed-rtl" : "collapsed", r.removeClassName(this.dom.label, o), r.removeClassName(this.dom.label, "expanded"), r.removeClassName(this.dom.label, "vis-nesting-group"));t && t.nestedInGroup && (r.addClassName(this.dom.label, "vis-nested-group"), this.itemSet.options && this.itemSet.options.rtl ? this.dom.inner.style.paddingRight = "30px" : this.dom.inner.style.paddingLeft = "30px");var n = t && t.className || null;n != this.className && (this.className && (r.removeClassName(this.dom.label, this.className), r.removeClassName(this.dom.foreground, this.className), r.removeClassName(this.dom.background, this.className), r.removeClassName(this.dom.axis, this.className)), r.addClassName(this.dom.label, n), r.addClassName(this.dom.foreground, n), r.addClassName(this.dom.background, n), r.addClassName(this.dom.axis, n), this.className = n), this.style && (r.removeCssText(this.dom.label, this.style), this.style = null), t && t.style && (r.addCssText(this.dom.label, t.style), this.style = t.style);
    }, o.prototype.getLabelWidth = function () {
      return this.props.label.width;
    }, o.prototype._didMarkerHeightChange = function () {
      var t = this.dom.marker.clientHeight;if (t != this.lastMarkerHeight) {
        this.lastMarkerHeight = t;var e = {},
            i = 0;r.forEach(this.items, function (t, o) {
          if (t.dirty = !0, t.displayed) {
            e[o] = t.redraw(!0), i = e[o].length;
          }
        });if (i > 0) for (var o = 0; o < i; o++) {
          r.forEach(e, function (t) {
            t[o]();
          });
        }return !0;
      }
    }, o.prototype._calculateGroupSizeAndPosition = function () {
      var t = this.dom.foreground.offsetTop,
          e = this.dom.foreground.offsetLeft,
          i = this.dom.foreground.offsetWidth;this.top = t, this.right = e, this.width = i;
    }, o.prototype._redrawItems = function (t, e, i, o) {
      if (t || this.stackDirty || this.isVisible && !e) {
        var n = {},
            s = null;if ("function" == typeof this.itemSet.options.order) {
          var h = this,
              d = {},
              l = 0;if (r.forEach(this.items, function (t, e) {
            t.displayed || (d[e] = t.redraw(!0), l = d[e].length, h.visibleItems.push(t));
          }), l > 0) for (var u = 0; u < l; u++) {
            r.forEach(d, function (t) {
              t[u]();
            });
          }if (r.forEach(this.items, function (t) {
            t.repositionX(!1);
          }), this.doInnerStack && this.itemSet.options.stackSubgroups) {
            for (s in this.subgroups) {
              n[s] = this.subgroups[s].items.slice().sort(function (t, e) {
                return h.itemSet.options.order(t.data, e.data);
              });
            }a.stackSubgroupsWithInnerStack(n, i, this.subgroups);
          } else {
            var p = this.orderedItems.byStart.slice().sort(function (t, e) {
              return h.itemSet.options.order(t.data, e.data);
            });a.stack(p, i, !0);
          }this.visibleItems = this._updateItemsInRange(this.orderedItems, this.visibleItems, o);
        } else if (this.visibleItems = this._updateItemsInRange(this.orderedItems, this.visibleItems, o), this.itemSet.options.stack) {
          if (this.doInnerStack && this.itemSet.options.stackSubgroups) {
            for (s in this.subgroups) {
              n[s] = this.subgroups[s].items;
            }a.stackSubgroupsWithInnerStack(n, i, this.subgroups);
          } else a.stack(this.visibleItems, i, !0);
        } else a.nostack(this.visibleItems, i, this.subgroups, this.itemSet.options.stackSubgroups);this.stackDirty = !1;
      }
    }, o.prototype._didResize = function (t, e) {
      t = r.updateProperty(this, "height", e) || t;var i = this.dom.inner.clientWidth,
          o = this.dom.inner.clientHeight;return t = r.updateProperty(this.props.label, "width", i) || t, t = r.updateProperty(this.props.label, "height", o) || t;
    }, o.prototype._applyGroupHeight = function (t) {
      this.dom.background.style.height = t + "px", this.dom.foreground.style.height = t + "px", this.dom.label.style.height = t + "px";
    }, o.prototype._updateItemsVerticalPosition = function (t) {
      for (var e = 0, i = this.visibleItems.length; e < i; e++) {
        var o = this.visibleItems[e];o.repositionY(t), this.isVisible || "__background__" == this.groupId || o.displayed && o.hide();
      }
    }, o.prototype.redraw = function (t, e, i, o) {
      var n,
          s = !1,
          r = this.isVisible,
          a = [function () {
        i = this._didMarkerHeightChange.bind(this);
      }.bind(this), this._updateSubGroupHeights.bind(this, e), this._calculateGroupSizeAndPosition.bind(this), function () {
        this.isVisible = this._isGroupVisible.bind(this)(t, e);
      }.bind(this), function () {
        this._redrawItems.bind(this)(i, r, e, t);
      }.bind(this), this._updateSubgroupsSizes.bind(this), function () {
        n = this._calculateHeight.bind(this)(e);
      }.bind(this), this._calculateGroupSizeAndPosition.bind(this), function () {
        s = this._didResize.bind(this)(s, n);
      }.bind(this), function () {
        this._applyGroupHeight.bind(this)(n);
      }.bind(this), function () {
        this._updateItemsVerticalPosition.bind(this)(e);
      }.bind(this), function () {
        return !this.isVisible && this.height && (s = !1), s;
      }];if (o) return a;var h;return a.forEach(function (t) {
        h = t();
      }), h;
    }, o.prototype._updateSubGroupHeights = function (t) {
      if ((0, s.default)(this.subgroups).length > 0) {
        var e = this;this.resetSubgroups(), r.forEach(this.visibleItems, function (i) {
          void 0 !== i.data.subgroup && (e.subgroups[i.data.subgroup].height = Math.max(e.subgroups[i.data.subgroup].height, i.height + t.item.vertical), e.subgroups[i.data.subgroup].visible = !0);
        });
      }
    }, o.prototype._isGroupVisible = function (t, e) {
      return this.top <= t.body.domProps.centerContainer.height - t.body.domProps.scrollTop + e.axis && this.top + this.height + e.axis >= -t.body.domProps.scrollTop;
    }, o.prototype._calculateHeight = function (t) {
      var e,
          i = this.visibleItems;if (i.length > 0) {
        var o = i[0].top,
            n = i[0].top + i[0].height;if (r.forEach(i, function (t) {
          o = Math.min(o, t.top), n = Math.max(n, t.top + t.height);
        }), o > t.axis) {
          var s = o - t.axis;n -= s, r.forEach(i, function (t) {
            t.top -= s;
          });
        }e = n + t.item.vertical / 2;
      } else e = 0;return e = Math.max(e, this.props.label.height);
    }, o.prototype.show = function () {
      this.dom.label.parentNode || this.itemSet.dom.labelSet.appendChild(this.dom.label), this.dom.foreground.parentNode || this.itemSet.dom.foreground.appendChild(this.dom.foreground), this.dom.background.parentNode || this.itemSet.dom.background.appendChild(this.dom.background), this.dom.axis.parentNode || this.itemSet.dom.axis.appendChild(this.dom.axis);
    }, o.prototype.hide = function () {
      var t = this.dom.label;t.parentNode && t.parentNode.removeChild(t);var e = this.dom.foreground;e.parentNode && e.parentNode.removeChild(e);var i = this.dom.background;i.parentNode && i.parentNode.removeChild(i);var o = this.dom.axis;o.parentNode && o.parentNode.removeChild(o);
    }, o.prototype.add = function (t) {
      if (this.items[t.id] = t, t.setParent(this), this.stackDirty = !0, void 0 !== t.data.subgroup && (this._addToSubgroup(t), this.orderSubgroups()), -1 == this.visibleItems.indexOf(t)) {
        var e = this.itemSet.body.range;this._checkIfVisible(t, this.visibleItems, e);
      }
    }, o.prototype._addToSubgroup = function (t, e) {
      e = e || t.data.subgroup, void 0 != e && void 0 === this.subgroups[e] && (this.subgroups[e] = { height: 0, top: 0, start: t.data.start, end: t.data.end || t.data.start, visible: !1, index: this.subgroupIndex, items: [], stack: this.subgroupStackAll || this.subgroupStack[e] || !1 }, this.subgroupIndex++), new Date(t.data.start) < new Date(this.subgroups[e].start) && (this.subgroups[e].start = t.data.start);var i = t.data.end || t.data.start;new Date(i) > new Date(this.subgroups[e].end) && (this.subgroups[e].end = i), this.subgroups[e].items.push(t);
    }, o.prototype._updateSubgroupsSizes = function () {
      var t = this;if (t.subgroups) for (var e in t.subgroups) {
        var i = t.subgroups[e].items[0].data.end || t.subgroups[e].items[0].data.start,
            o = t.subgroups[e].items[0].data.start,
            n = i - 1;t.subgroups[e].items.forEach(function (t) {
          new Date(t.data.start) < new Date(o) && (o = t.data.start);var e = t.data.end || t.data.start;new Date(e) > new Date(n) && (n = e);
        }), t.subgroups[e].start = o, t.subgroups[e].end = new Date(n - 1);
      }
    }, o.prototype.orderSubgroups = function () {
      if (void 0 !== this.subgroupOrderer) {
        var t,
            e = [];if ("string" == typeof this.subgroupOrderer) {
          for (t in this.subgroups) {
            e.push({ subgroup: t, sortField: this.subgroups[t].items[0].data[this.subgroupOrderer] });
          }e.sort(function (t, e) {
            return t.sortField - e.sortField;
          });
        } else if ("function" == typeof this.subgroupOrderer) {
          for (t in this.subgroups) {
            e.push(this.subgroups[t].items[0].data);
          }e.sort(this.subgroupOrderer);
        }if (e.length > 0) for (var i = 0; i < e.length; i++) {
          this.subgroups[e[i].subgroup].index = i;
        }
      }
    }, o.prototype.resetSubgroups = function () {
      for (var t in this.subgroups) {
        this.subgroups.hasOwnProperty(t) && (this.subgroups[t].visible = !1, this.subgroups[t].height = 0);
      }
    }, o.prototype.remove = function (t) {
      delete this.items[t.id], t.setParent(null), this.stackDirty = !0;var e = this.visibleItems.indexOf(t);-1 != e && this.visibleItems.splice(e, 1), void 0 !== t.data.subgroup && (this._removeFromSubgroup(t), this.orderSubgroups());
    }, o.prototype._removeFromSubgroup = function (t, e) {
      if (void 0 != (e = e || t.data.subgroup)) {
        var i = this.subgroups[e];if (i) {
          var o = i.items.indexOf(t);o >= 0 && (i.items.splice(o, 1), i.items.length ? this._updateSubgroupsSizes() : delete this.subgroups[e]);
        }
      }
    }, o.prototype.removeFromDataSet = function (t) {
      this.itemSet.removeItem(t.id);
    }, o.prototype.order = function () {
      for (var t = r.toArray(this.items), e = [], i = [], o = 0; o < t.length; o++) {
        void 0 !== t[o].data.end && i.push(t[o]), e.push(t[o]);
      }this.orderedItems = { byStart: e, byEnd: i }, a.orderByStart(this.orderedItems.byStart), a.orderByEnd(this.orderedItems.byEnd);
    }, o.prototype._updateItemsInRange = function (t, e, i) {
      var o = [],
          n = {},
          s = (i.end - i.start) / 4,
          a = i.start - s,
          h = i.end + s,
          d = function d(t) {
        return t < a ? -1 : t <= h ? 0 : 1;
      };if (e.length > 0) for (var l = 0; l < e.length; l++) {
        this._checkIfVisibleWithReference(e[l], o, n, i);
      }var u = r.binarySearchCustom(t.byStart, d, "data", "start");if (this._traceVisible(u, t.byStart, o, n, function (t) {
        return t.data.start < a || t.data.start > h;
      }), 1 == this.checkRangedItems) for (this.checkRangedItems = !1, l = 0; l < t.byEnd.length; l++) {
        this._checkIfVisibleWithReference(t.byEnd[l], o, n, i);
      } else {
        var p = r.binarySearchCustom(t.byEnd, d, "data", "end");this._traceVisible(p, t.byEnd, o, n, function (t) {
          return t.data.end < a || t.data.end > h;
        });
      }var c = {},
          m = 0;for (l = 0; l < o.length; l++) {
        var f = o[l];if (!f.displayed) {
          c[l] = f.redraw(!0), m = c[l].length;
        }
      }if (m > 0) for (var g = 0; g < m; g++) {
        r.forEach(c, function (t) {
          t[g]();
        });
      }for (l = 0; l < o.length; l++) {
        o[l].repositionX();
      }return o;
    }, o.prototype._traceVisible = function (t, e, i, o, n) {
      if (-1 != t) {
        var s, r;for (s = t; s >= 0 && (r = e[s], !n(r)); s--) {
          void 0 === o[r.id] && (o[r.id] = !0, i.push(r));
        }for (s = t + 1; s < e.length && (r = e[s], !n(r)); s++) {
          void 0 === o[r.id] && (o[r.id] = !0, i.push(r));
        }
      }
    }, o.prototype._checkIfVisible = function (t, e, i) {
      t.isVisible(i) ? (t.displayed || t.show(), t.repositionX(), e.push(t)) : t.displayed && t.hide();
    }, o.prototype._checkIfVisibleWithReference = function (t, e, i, o) {
      t.isVisible(o) ? void 0 === i[t.id] && (i[t.id] = !0, e.push(t)) : t.displayed && t.hide();
    }, o.prototype.changeSubgroup = function (t, e, i) {
      this._removeFromSubgroup(t, e), this._addToSubgroup(t, i), this.orderSubgroups();
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e, i) {
      r.call(this, t, e, i), this.width = 0, this.height = 0, this.top = 0, this.left = 0;
    }var n = i(43),
        s = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(n),
        r = i(51);o.prototype = (0, s.default)(r.prototype), o.prototype.redraw = function (t, e, i) {
      this.visibleItems = this._updateItemsInRange(this.orderedItems, this.visibleItems, t), this.width = this.dom.background.offsetWidth, this.dom.background.style.height = "0";for (var o = 0, n = this.visibleItems.length; o < n; o++) {
        this.visibleItems[o].repositionY(e);
      }return !1;
    }, o.prototype.show = function () {
      this.dom.background.parentNode || this.itemSet.dom.background.appendChild(this.dom.background);
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e, i) {
      if (this.props = { content: { width: 0 } }, this.overflow = !1, this.options = i, t) {
        if (void 0 == t.start) throw new Error('Property "start" missing in item ' + t.id);if (void 0 == t.end) throw new Error('Property "end" missing in item ' + t.id);
      }n.call(this, t, e, i);
    }var n = i(22);o.prototype = new n(null, null, null), o.prototype.baseClassName = "vis-item vis-range", o.prototype.isVisible = function (t) {
      return this.data.start < t.end && this.data.end > t.start;
    }, o.prototype._createDomElement = function () {
      this.dom || (this.dom = {}, this.dom.box = document.createElement("div"), this.dom.frame = document.createElement("div"), this.dom.frame.className = "vis-item-overflow", this.dom.box.appendChild(this.dom.frame), this.dom.visibleFrame = document.createElement("div"), this.dom.visibleFrame.className = "vis-item-visible-frame", this.dom.box.appendChild(this.dom.visibleFrame), this.dom.content = document.createElement("div"), this.dom.content.className = "vis-item-content", this.dom.frame.appendChild(this.dom.content), this.dom.box["timeline-item"] = this, this.dirty = !0);
    }, o.prototype._appendDomElement = function () {
      if (!this.parent) throw new Error("Cannot redraw item: no parent attached");if (!this.dom.box.parentNode) {
        var t = this.parent.dom.foreground;if (!t) throw new Error("Cannot redraw item: parent has no foreground container element");t.appendChild(this.dom.box);
      }this.displayed = !0;
    }, o.prototype._updateDirtyDomComponents = function () {
      if (this.dirty) {
        this._updateContents(this.dom.content), this._updateDataAttributes(this.dom.box), this._updateStyle(this.dom.box);var t = this.editable.updateTime || this.editable.updateGroup,
            e = (this.data.className ? " " + this.data.className : "") + (this.selected ? " vis-selected" : "") + (t ? " vis-editable" : " vis-readonly");this.dom.box.className = this.baseClassName + e, this.dom.content.style.maxWidth = "none";
      }
    }, o.prototype._getDomComponentsSizes = function () {
      return this.overflow = "hidden" !== window.getComputedStyle(this.dom.frame).overflow, { content: { width: this.dom.content.offsetWidth }, box: { height: this.dom.box.offsetHeight } };
    }, o.prototype._updateDomComponentsSizes = function (t) {
      this.props.content.width = t.content.width, this.height = t.box.height, this.dom.content.style.maxWidth = "", this.dirty = !1;
    }, o.prototype._repaintDomAdditionals = function () {
      this._repaintOnItemUpdateTimeTooltip(this.dom.box), this._repaintDeleteButton(this.dom.box), this._repaintDragCenter(), this._repaintDragLeft(), this._repaintDragRight();
    }, o.prototype.redraw = function (t) {
      var e,
          i = [this._createDomElement.bind(this), this._appendDomElement.bind(this), this._updateDirtyDomComponents.bind(this), function () {
        this.dirty && (e = this._getDomComponentsSizes.bind(this)());
      }.bind(this), function () {
        this.dirty && this._updateDomComponentsSizes.bind(this)(e);
      }.bind(this), this._repaintDomAdditionals.bind(this)];if (t) return i;var o;return i.forEach(function (t) {
        o = t();
      }), o;
    }, o.prototype.show = function () {
      this.displayed || this.redraw();
    }, o.prototype.hide = function () {
      if (this.displayed) {
        var t = this.dom.box;t.parentNode && t.parentNode.removeChild(t), this.displayed = !1;
      }
    }, o.prototype.repositionX = function (t) {
      var e,
          i,
          o = this.parent.width,
          n = this.conversion.toScreen(this.data.start),
          s = this.conversion.toScreen(this.data.end),
          r = void 0 === this.data.align ? this.options.align : this.data.align;!1 === this.data.limitSize || void 0 !== t && !0 !== t || (n < -o && (n = -o), s > 2 * o && (s = 2 * o));var a = Math.max(s - n + .5, 1);switch (this.overflow ? (this.options.rtl ? this.right = n : this.left = n, this.width = a + this.props.content.width, i = this.props.content.width) : (this.options.rtl ? this.right = n : this.left = n, this.width = a, i = Math.min(s - n, this.props.content.width)), this.options.rtl ? this.dom.box.style.right = this.right + "px" : this.dom.box.style.left = this.left + "px", this.dom.box.style.width = a + "px", r) {case "left":
          this.options.rtl ? this.dom.content.style.right = "0" : this.dom.content.style.left = "0";break;case "right":
          this.options.rtl ? this.dom.content.style.right = Math.max(a - i, 0) + "px" : this.dom.content.style.left = Math.max(a - i, 0) + "px";break;case "center":
          this.options.rtl ? this.dom.content.style.right = Math.max((a - i) / 2, 0) + "px" : this.dom.content.style.left = Math.max((a - i) / 2, 0) + "px";break;default:
          e = this.overflow ? s > 0 ? Math.max(-n, 0) : -i : n < 0 ? -n : 0, this.options.rtl ? this.dom.content.style.right = e + "px" : (this.dom.content.style.left = e + "px", this.dom.content.style.width = "calc(100% - " + e + "px)");}
    }, o.prototype.repositionY = function () {
      var t = this.options.orientation.item,
          e = this.dom.box;e.style.top = "top" == t ? this.top + "px" : this.parent.height - this.top - this.height + "px";
    }, o.prototype._repaintDragLeft = function () {
      if ((this.selected || this.options.itemsAlwaysDraggable.range) && this.options.editable.updateTime && !this.dom.dragLeft) {
        var t = document.createElement("div");t.className = "vis-drag-left", t.dragLeftItem = this, this.dom.box.appendChild(t), this.dom.dragLeft = t;
      } else this.selected || this.options.itemsAlwaysDraggable.range || !this.dom.dragLeft || (this.dom.dragLeft.parentNode && this.dom.dragLeft.parentNode.removeChild(this.dom.dragLeft), this.dom.dragLeft = null);
    }, o.prototype._repaintDragRight = function () {
      if ((this.selected || this.options.itemsAlwaysDraggable.range) && this.options.editable.updateTime && !this.dom.dragRight) {
        var t = document.createElement("div");t.className = "vis-drag-right", t.dragRightItem = this, this.dom.box.appendChild(t), this.dom.dragRight = t;
      } else this.selected || this.options.itemsAlwaysDraggable.range || !this.dom.dragRight || (this.dom.dragRight.parentNode && this.dom.dragRight.parentNode.removeChild(this.dom.dragRight), this.dom.dragRight = null);
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e) {}function n(t, e) {
      return e = void 0 === e ? {} : e, { style: e.style || t.options.drawPoints.style, styles: e.styles || t.options.drawPoints.styles, size: e.size || t.options.drawPoints.size, className: e.className || t.className };
    }function s(t, e) {
      var i = void 0;return t.options && t.options.drawPoints && t.options.drawPoints.onRender && "function" == typeof t.options.drawPoints.onRender && (i = t.options.drawPoints.onRender), e.group.options && e.group.options.drawPoints && e.group.options.drawPoints.onRender && "function" == typeof e.group.options.drawPoints.onRender && (i = e.group.options.drawPoints.onRender), i;
    }var r = i(1),
        a = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(r),
        h = i(11);o.draw = function (t, e, i, o) {
      o = o || 0;for (var r = s(i, e), d = 0; d < t.length; d++) {
        if (r) {
          var l = r(t[d], e);!0 !== l && "object" !== (void 0 === l ? "undefined" : (0, a.default)(l)) || h.drawPoint(t[d].screen_x + o, t[d].screen_y, n(e, l), i.svgElements, i.svg, t[d].label);
        } else h.drawPoint(t[d].screen_x + o, t[d].screen_y, n(e), i.svgElements, i.svg, t[d].label);
      }
    }, o.drawIcon = function (t, e, i, o, s, r) {
      var a = .5 * s,
          d = h.getSVGElement("rect", r.svgElements, r.svg);d.setAttributeNS(null, "x", e), d.setAttributeNS(null, "y", i - a), d.setAttributeNS(null, "width", o), d.setAttributeNS(null, "height", 2 * a), d.setAttributeNS(null, "class", "vis-outline"), h.drawPoint(e + .5 * o, i, n(t), r.svgElements, r.svg);
    }, t.exports = o;
  }, function (t, e, i) {
    i(88);for (var o = i(6), n = i(14), s = i(23), r = i(7)("toStringTag"), a = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), h = 0; h < a.length; h++) {
      var d = a[h],
          l = o[d],
          u = l && l.prototype;u && !u[r] && n(u, r, d), s[d] = s.Array;
    }
  }, function (t, e, i) {
    var o = i(35),
        n = i(17),
        s = i(59),
        r = i(14),
        a = i(10),
        h = i(23),
        d = i(94),
        l = i(42),
        u = i(100),
        p = i(7)("iterator"),
        c = !([].keys && "next" in [].keys()),
        m = function m() {
      return this;
    };t.exports = function (t, e, i, f, g, v, y) {
      d(i, e, f);var b,
          _,
          w,
          x = function x(t) {
        if (!c && t in C) return C[t];switch (t) {case "keys":case "values":
            return function () {
              return new i(this, t);
            };}return function () {
          return new i(this, t);
        };
      },
          D = e + " Iterator",
          S = "values" == g,
          k = !1,
          C = t.prototype,
          T = C[p] || C["@@iterator"] || g && C[g],
          M = T || x(g),
          O = g ? S ? x("entries") : M : void 0,
          E = "Array" == e ? C.entries || T : T;if (E && (w = u(E.call(new t()))) !== Object.prototype && w.next && (l(w, D, !0), o || a(w, p) || r(w, p, m)), S && T && "values" !== T.name && (k = !0, M = function M() {
        return T.call(this);
      }), o && !y || !c && !k && C[p] || r(C, p, M), h[e] = M, h[D] = m, g) if (b = { values: S ? M : x("values"), keys: v ? M : x("keys"), entries: O }, y) for (_ in b) {
        _ in C || s(C, _, b[_]);
      } else n(n.P + n.F * (c || k), e, b);return b;
    };
  }, function (t, e, i) {
    t.exports = !i(9) && !i(19)(function () {
      return 7 != Object.defineProperty(i(58)("div"), "a", { get: function get() {
          return 7;
        } }).a;
    });
  }, function (t, e, i) {
    var o = i(24),
        n = i(6).document,
        s = o(n) && o(n.createElement);t.exports = function (t) {
      return s ? n.createElement(t) : {};
    };
  }, function (t, e, i) {
    t.exports = i(14);
  }, function (t, e, i) {
    var o = i(10),
        n = i(13),
        s = i(96)(!1),
        r = i(39)("IE_PROTO");t.exports = function (t, e) {
      var i,
          a = n(t),
          h = 0,
          d = [];for (i in a) {
        i != r && o(a, i) && d.push(i);
      }for (; e.length > h;) {
        o(a, i = e[h++]) && (~s(d, i) || d.push(i));
      }return d;
    };
  }, function (t, e, i) {
    var o = i(34);t.exports = function (t) {
      return Object(o(t));
    };
  }, function (t, e, i) {
    var o = i(101)(!0);i(56)(String, "String", function (t) {
      this._t = String(t), this._i = 0;
    }, function () {
      var t,
          e = this._t,
          i = this._i;return i >= e.length ? { value: void 0, done: !0 } : (t = o(e, i), this._i += t.length, { value: t, done: !1 });
    });
  }, function (t, e) {
    e.f = Object.getOwnPropertySymbols;
  }, function (t, e, i) {
    var o = i(60),
        n = i(41).concat("length", "prototype");e.f = Object.getOwnPropertyNames || function (t) {
      return o(t, n);
    };
  }, function (t, e, i) {
    function o(t) {
      this.delay = null, this.max = 1 / 0, this._queue = [], this._timeout = null, this._extended = null, this.setOptions(t);
    }o.prototype.setOptions = function (t) {
      t && void 0 !== t.delay && (this.delay = t.delay), t && void 0 !== t.max && (this.max = t.max), this._flushIfNeeded();
    }, o.extend = function (t, e) {
      var i = new o(e);if (void 0 !== t.flush) throw new Error("Target object already has a property flush");t.flush = function () {
        i.flush();
      };var n = [{ name: "flush", original: void 0 }];if (e && e.replace) for (var s = 0; s < e.replace.length; s++) {
        var r = e.replace[s];n.push({ name: r, original: t[r] }), i.replace(t, r);
      }return i._extended = { object: t, methods: n }, i;
    }, o.prototype.destroy = function () {
      if (this.flush(), this._extended) {
        for (var t = this._extended.object, e = this._extended.methods, i = 0; i < e.length; i++) {
          var o = e[i];o.original ? t[o.name] = o.original : delete t[o.name];
        }this._extended = null;
      }
    }, o.prototype.replace = function (t, e) {
      var i = this,
          o = t[e];if (!o) throw new Error("Method " + e + " undefined");t[e] = function () {
        for (var t = [], e = 0; e < arguments.length; e++) {
          t[e] = arguments[e];
        }i.queue({ args: t, fn: o, context: this });
      };
    }, o.prototype.queue = function (t) {
      "function" == typeof t ? this._queue.push({ fn: t }) : this._queue.push(t), this._flushIfNeeded();
    }, o.prototype._flushIfNeeded = function () {
      if (this._queue.length > this.max && this.flush(), clearTimeout(this._timeout), this.queue.length > 0 && "number" == typeof this.delay) {
        var t = this;this._timeout = setTimeout(function () {
          t.flush();
        }, this.delay);
      }
    }, o.prototype.flush = function () {
      for (; this._queue.length > 0;) {
        var t = this._queue.shift();t.fn.apply(t.context || t.fn, t.args || []);
      }
    }, t.exports = o;
  }, function (t, e) {
    function i(t) {
      if (t) return o(t);
    }function o(t) {
      for (var e in i.prototype) {
        t[e] = i.prototype[e];
      }return t;
    }t.exports = i, i.prototype.on = i.prototype.addEventListener = function (t, e) {
      return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this;
    }, i.prototype.once = function (t, e) {
      function i() {
        o.off(t, i), e.apply(this, arguments);
      }var o = this;return this._callbacks = this._callbacks || {}, i.fn = e, this.on(t, i), this;
    }, i.prototype.off = i.prototype.removeListener = i.prototype.removeAllListeners = i.prototype.removeEventListener = function (t, e) {
      if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;var i = this._callbacks[t];if (!i) return this;if (1 == arguments.length) return delete this._callbacks[t], this;for (var o, n = 0; n < i.length; n++) {
        if ((o = i[n]) === e || o.fn === e) {
          i.splice(n, 1);break;
        }
      }return this;
    }, i.prototype.emit = function (t) {
      this._callbacks = this._callbacks || {};var e = [].slice.call(arguments, 1),
          i = this._callbacks[t];if (i) {
        i = i.slice(0);for (var o = 0, n = i.length; o < n; ++o) {
          i[o].apply(this, e);
        }
      }return this;
    }, i.prototype.listeners = function (t) {
      return this._callbacks = this._callbacks || {}, this._callbacks[t] || [];
    }, i.prototype.hasListeners = function (t) {
      return !!this.listeners(t).length;
    };
  }, function (t, e, i) {
    e.onTouch = function (t, e) {
      e.inputHandler = function (t) {
        t.isFirst && e(t);
      }, t.on("hammer.input", e.inputHandler);
    }, e.onRelease = function (t, e) {
      return e.inputHandler = function (t) {
        t.isFinal && e(t);
      }, t.on("hammer.input", e.inputHandler);
    }, e.offTouch = function (t, e) {
      t.off("hammer.input", e.inputHandler);
    }, e.offRelease = e.offTouch, e.disablePreventDefaultVertically = function (t) {
      return t.getTouchAction = function () {
        return ["pan-y"];
      }, t;
    };
  }, function (t, e, i) {
    var o, n, s;!function (i, r) {
      n = [], o = r, void 0 !== (s = "function" == typeof o ? o.apply(e, n) : o) && (t.exports = s);
    }(0, function () {
      function t(t) {
        var e,
            i = t && t.preventDefault || !1,
            o = t && t.container || window,
            n = {},
            s = { keydown: {}, keyup: {} },
            r = {};for (e = 97; e <= 122; e++) {
          r[String.fromCharCode(e)] = { code: e - 97 + 65, shift: !1 };
        }for (e = 65; e <= 90; e++) {
          r[String.fromCharCode(e)] = { code: e, shift: !0 };
        }for (e = 0; e <= 9; e++) {
          r["" + e] = { code: 48 + e, shift: !1 };
        }for (e = 1; e <= 12; e++) {
          r["F" + e] = { code: 111 + e, shift: !1 };
        }for (e = 0; e <= 9; e++) {
          r["num" + e] = { code: 96 + e, shift: !1 };
        }r["num*"] = { code: 106, shift: !1 }, r["num+"] = { code: 107, shift: !1 }, r["num-"] = { code: 109, shift: !1 }, r["num/"] = { code: 111, shift: !1 }, r["num."] = { code: 110, shift: !1 }, r.left = { code: 37, shift: !1 }, r.up = { code: 38, shift: !1 }, r.right = { code: 39, shift: !1 }, r.down = { code: 40, shift: !1 }, r.space = { code: 32, shift: !1 }, r.enter = { code: 13, shift: !1 }, r.shift = { code: 16, shift: void 0 }, r.esc = { code: 27, shift: !1 }, r.backspace = { code: 8, shift: !1 }, r.tab = { code: 9, shift: !1 }, r.ctrl = { code: 17, shift: !1 }, r.alt = { code: 18, shift: !1 }, r.delete = { code: 46, shift: !1 }, r.pageup = { code: 33, shift: !1 }, r.pagedown = { code: 34, shift: !1 }, r["="] = { code: 187, shift: !1 }, r["-"] = { code: 189, shift: !1 }, r["]"] = { code: 221, shift: !1 }, r["["] = { code: 219, shift: !1 };var a = function a(t) {
          d(t, "keydown");
        },
            h = function h(t) {
          d(t, "keyup");
        },
            d = function d(t, e) {
          if (void 0 !== s[e][t.keyCode]) {
            for (var o = s[e][t.keyCode], n = 0; n < o.length; n++) {
              void 0 === o[n].shift ? o[n].fn(t) : 1 == o[n].shift && 1 == t.shiftKey ? o[n].fn(t) : 0 == o[n].shift && 0 == t.shiftKey && o[n].fn(t);
            }1 == i && t.preventDefault();
          }
        };return n.bind = function (t, e, i) {
          if (void 0 === i && (i = "keydown"), void 0 === r[t]) throw new Error("unsupported key: " + t);void 0 === s[i][r[t].code] && (s[i][r[t].code] = []), s[i][r[t].code].push({ fn: e, shift: r[t].shift });
        }, n.bindAll = function (t, e) {
          void 0 === e && (e = "keydown");for (var i in r) {
            r.hasOwnProperty(i) && n.bind(i, t, e);
          }
        }, n.getKey = function (t) {
          for (var e in r) {
            if (r.hasOwnProperty(e)) {
              if (1 == t.shiftKey && 1 == r[e].shift && t.keyCode == r[e].code) return e;if (0 == t.shiftKey && 0 == r[e].shift && t.keyCode == r[e].code) return e;if (t.keyCode == r[e].code && "shift" == e) return e;
            }
          }return "unknown key, currently not supported";
        }, n.unbind = function (t, e, i) {
          if (void 0 === i && (i = "keydown"), void 0 === r[t]) throw new Error("unsupported key: " + t);if (void 0 !== e) {
            var o = [],
                n = s[i][r[t].code];if (void 0 !== n) for (var a = 0; a < n.length; a++) {
              n[a].fn == e && n[a].shift == r[t].shift || o.push(s[i][r[t].code][a]);
            }s[i][r[t].code] = o;
          } else s[i][r[t].code] = [];
        }, n.reset = function () {
          s = { keydown: {}, keyup: {} };
        }, n.destroy = function () {
          s = { keydown: {}, keyup: {} }, o.removeEventListener("keydown", a, !0), o.removeEventListener("keyup", h, !0);
        }, o.addEventListener("keydown", a, !0), o.addEventListener("keyup", h, !0), n;
      }return t;
    });
  }, function (t, e, i) {
    e.en = { current: "current", time: "time" }, e.en_EN = e.en, e.en_US = e.en, e.it = { current: "attuale", time: "tempo" }, e.it_IT = e.it, e.it_CH = e.it, e.nl = { current: "huidige", time: "tijd" }, e.nl_NL = e.nl, e.nl_BE = e.nl, e.de = { current: "Aktuelle", time: "Zeit" }, e.de_DE = e.de, e.fr = { current: "actuel", time: "heure" }, e.fr_FR = e.fr, e.fr_CA = e.fr, e.fr_BE = e.fr, e.es = { current: "corriente", time: "hora" }, e.es_ES = e.es;
  }, function (t, e, i) {
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }function n(t, e) {
      this.body = t, this.defaultOptions = { type: null, orientation: { item: "bottom" }, align: "auto", stack: !0, stackSubgroups: !0, groupOrderSwap: function groupOrderSwap(t, e, i) {
          var o = e.order;e.order = t.order, t.order = o;
        }, groupOrder: "order", selectable: !0, multiselect: !1, itemsAlwaysDraggable: { item: !1, range: !1 }, editable: { updateTime: !1, updateGroup: !1, add: !1, remove: !1, overrideItems: !1 }, groupEditable: { order: !1, add: !1, remove: !1 }, snap: c.snap, onDropObjectOnItem: function onDropObjectOnItem(t, e, i) {
          i(e);
        }, onAdd: function onAdd(t, e) {
          e(t);
        }, onUpdate: function onUpdate(t, e) {
          e(t);
        }, onMove: function onMove(t, e) {
          e(t);
        }, onRemove: function onRemove(t, e) {
          e(t);
        }, onMoving: function onMoving(t, e) {
          e(t);
        }, onAddGroup: function onAddGroup(t, e) {
          e(t);
        }, onMoveGroup: function onMoveGroup(t, e) {
          e(t);
        }, onRemoveGroup: function onRemoveGroup(t, e) {
          e(t);
        }, margin: { item: { horizontal: 10, vertical: 10 }, axis: 20 }, showTooltips: !0, tooltip: { followMouse: !1, overflowMethod: "flip" }, tooltipOnItemUpdateTime: !1 }, this.options = l.extend({}, this.defaultOptions), this.options.rtl = e.rtl, this.itemOptions = { type: { start: "Date", end: "Date" } }, this.conversion = { toScreen: t.util.toScreen, toTime: t.util.toTime }, this.dom = {}, this.props = {}, this.hammer = null;var i = this;this.itemsData = null, this.groupsData = null, this.itemListeners = { add: function add(t, e, o) {
          i._onAdd(e.items);
        }, update: function update(t, e, o) {
          i._onUpdate(e.items);
        }, remove: function remove(t, e, o) {
          i._onRemove(e.items);
        } }, this.groupListeners = { add: function add(t, e, o) {
          if (i._onAddGroups(e.items), i.groupsData && i.groupsData.length > 0) {
            var n = i.groupsData.getDataSet();n.get().forEach(function (t) {
              if (t.nestedGroups) {
                0 != t.showNested && (t.showNested = !0);var e = [];t.nestedGroups.forEach(function (i) {
                  var o = n.get(i);o && (o.nestedInGroup = t.id, 0 == t.showNested && (o.visible = !1), e = e.concat(o));
                }), n.update(e, o);
              }
            });
          }
        }, update: function update(t, e, o) {
          i._onUpdateGroups(e.items);
        }, remove: function remove(t, e, o) {
          i._onRemoveGroups(e.items);
        } }, this.items = {}, this.groups = {}, this.groupIds = [], this.selection = [], this.popup = null, this.touchParams = {}, this.groupTouchParams = {}, this._create(), this.setOptions(e);
    }var s = i(43),
        r = o(s),
        a = i(1),
        h = o(a),
        d = i(12),
        l = i(0),
        u = i(15),
        p = i(20),
        c = i(49),
        m = i(5),
        f = i(51),
        g = i(52),
        v = i(72),
        y = i(73),
        b = i(53),
        _ = i(74),
        w = i(133).default,
        x = "__ungrouped__",
        D = "__background__";n.prototype = new m(), n.types = { background: _, box: v, range: b, point: y }, n.prototype._create = function () {
      var t = document.createElement("div");t.className = "vis-itemset", t["timeline-itemset"] = this, this.dom.frame = t;var e = document.createElement("div");e.className = "vis-background", t.appendChild(e), this.dom.background = e;var i = document.createElement("div");i.className = "vis-foreground", t.appendChild(i), this.dom.foreground = i;var o = document.createElement("div");o.className = "vis-axis", this.dom.axis = o;var n = document.createElement("div");n.className = "vis-labelset", this.dom.labelSet = n, this._updateUngrouped();var s = new g(D, null, this);s.show(), this.groups[D] = s, this.hammer = new d(this.body.dom.centerContainer), this.hammer.on("hammer.input", function (t) {
        t.isFirst && this._onTouch(t);
      }.bind(this)), this.hammer.on("panstart", this._onDragStart.bind(this)), this.hammer.on("panmove", this._onDrag.bind(this)), this.hammer.on("panend", this._onDragEnd.bind(this)), this.hammer.get("pan").set({ threshold: 5, direction: d.DIRECTION_HORIZONTAL }), this.hammer.on("tap", this._onSelectItem.bind(this)), this.hammer.on("press", this._onMultiSelectItem.bind(this)), this.hammer.on("doubletap", this._onAddItem.bind(this)), this.options.rtl ? this.groupHammer = new d(this.body.dom.rightContainer) : this.groupHammer = new d(this.body.dom.leftContainer), this.groupHammer.on("tap", this._onGroupClick.bind(this)), this.groupHammer.on("panstart", this._onGroupDragStart.bind(this)), this.groupHammer.on("panmove", this._onGroupDrag.bind(this)), this.groupHammer.on("panend", this._onGroupDragEnd.bind(this)), this.groupHammer.get("pan").set({ threshold: 5, direction: d.DIRECTION_VERTICAL }), this.body.dom.centerContainer.addEventListener("mouseover", this._onMouseOver.bind(this)), this.body.dom.centerContainer.addEventListener("mouseout", this._onMouseOut.bind(this)), this.body.dom.centerContainer.addEventListener("mousemove", this._onMouseMove.bind(this)), this.body.dom.centerContainer.addEventListener("contextmenu", this._onDragEnd.bind(this)), this.body.dom.centerContainer.addEventListener("mousewheel", this._onMouseWheel.bind(this)), this.show();
    }, n.prototype.setOptions = function (t) {
      if (t) {
        var e = ["type", "rtl", "align", "order", "stack", "stackSubgroups", "selectable", "multiselect", "multiselectPerGroup", "groupOrder", "dataAttributes", "template", "groupTemplate", "visibleFrameTemplate", "hide", "snap", "groupOrderSwap", "showTooltips", "tooltip", "tooltipOnItemUpdateTime"];l.selectiveExtend(e, this.options, t), "itemsAlwaysDraggable" in t && ("boolean" == typeof t.itemsAlwaysDraggable ? (this.options.itemsAlwaysDraggable.item = t.itemsAlwaysDraggable, this.options.itemsAlwaysDraggable.range = !1) : "object" === (0, h.default)(t.itemsAlwaysDraggable) && (l.selectiveExtend(["item", "range"], this.options.itemsAlwaysDraggable, t.itemsAlwaysDraggable), this.options.itemsAlwaysDraggable.item || (this.options.itemsAlwaysDraggable.range = !1))), "orientation" in t && ("string" == typeof t.orientation ? this.options.orientation.item = "top" === t.orientation ? "top" : "bottom" : "object" === (0, h.default)(t.orientation) && "item" in t.orientation && (this.options.orientation.item = t.orientation.item)), "margin" in t && ("number" == typeof t.margin ? (this.options.margin.axis = t.margin, this.options.margin.item.horizontal = t.margin, this.options.margin.item.vertical = t.margin) : "object" === (0, h.default)(t.margin) && (l.selectiveExtend(["axis"], this.options.margin, t.margin), "item" in t.margin && ("number" == typeof t.margin.item ? (this.options.margin.item.horizontal = t.margin.item, this.options.margin.item.vertical = t.margin.item) : "object" === (0, h.default)(t.margin.item) && l.selectiveExtend(["horizontal", "vertical"], this.options.margin.item, t.margin.item)))), "editable" in t && ("boolean" == typeof t.editable ? (this.options.editable.updateTime = t.editable, this.options.editable.updateGroup = t.editable, this.options.editable.add = t.editable, this.options.editable.remove = t.editable, this.options.editable.overrideItems = !1) : "object" === (0, h.default)(t.editable) && l.selectiveExtend(["updateTime", "updateGroup", "add", "remove", "overrideItems"], this.options.editable, t.editable)), "groupEditable" in t && ("boolean" == typeof t.groupEditable ? (this.options.groupEditable.order = t.groupEditable, this.options.groupEditable.add = t.groupEditable, this.options.groupEditable.remove = t.groupEditable) : "object" === (0, h.default)(t.groupEditable) && l.selectiveExtend(["order", "add", "remove"], this.options.groupEditable, t.groupEditable));["onDropObjectOnItem", "onAdd", "onUpdate", "onRemove", "onMove", "onMoving", "onAddGroup", "onMoveGroup", "onRemoveGroup"].forEach(function (e) {
          var i = t[e];if (i) {
            if (!(i instanceof Function)) throw new Error("option " + e + " must be a function " + e + "(item, callback)");this.options[e] = i;
          }
        }.bind(this)), this.markDirty();
      }
    }, n.prototype.markDirty = function (t) {
      this.groupIds = [], t && t.refreshItems && l.forEach(this.items, function (t) {
        t.dirty = !0, t.displayed && t.redraw();
      });
    }, n.prototype.destroy = function () {
      this.hide(), this.setItems(null), this.setGroups(null), this.hammer = null, this.body = null, this.conversion = null;
    }, n.prototype.hide = function () {
      this.dom.frame.parentNode && this.dom.frame.parentNode.removeChild(this.dom.frame), this.dom.axis.parentNode && this.dom.axis.parentNode.removeChild(this.dom.axis), this.dom.labelSet.parentNode && this.dom.labelSet.parentNode.removeChild(this.dom.labelSet);
    }, n.prototype.show = function () {
      this.dom.frame.parentNode || this.body.dom.center.appendChild(this.dom.frame), this.dom.axis.parentNode || this.body.dom.backgroundVertical.appendChild(this.dom.axis), this.dom.labelSet.parentNode || (this.options.rtl ? this.body.dom.right.appendChild(this.dom.labelSet) : this.body.dom.left.appendChild(this.dom.labelSet));
    }, n.prototype.setSelection = function (t) {
      var e, i, o, n;for (void 0 == t && (t = []), Array.isArray(t) || (t = [t]), e = 0, i = this.selection.length; e < i; e++) {
        o = this.selection[e], (n = this.items[o]) && n.unselect();
      }for (this.selection = [], e = 0, i = t.length; e < i; e++) {
        o = t[e], (n = this.items[o]) && (this.selection.push(o), n.select());
      }
    }, n.prototype.getSelection = function () {
      return this.selection.concat([]);
    }, n.prototype.getVisibleItems = function () {
      var t,
          e,
          i = this.body.range.getRange();this.options.rtl ? (t = this.body.util.toScreen(i.start), e = this.body.util.toScreen(i.end)) : (e = this.body.util.toScreen(i.start), t = this.body.util.toScreen(i.end));var o = [];for (var n in this.groups) {
        if (this.groups.hasOwnProperty(n)) for (var s = this.groups[n], r = s.isVisible ? s.visibleItems : [], a = 0; a < r.length; a++) {
          var h = r[a];this.options.rtl ? h.right < e && h.right + h.width > t && o.push(h.id) : h.left < t && h.left + h.width > e && o.push(h.id);
        }
      }return o;
    }, n.prototype._deselect = function (t) {
      for (var e = this.selection, i = 0, o = e.length; i < o; i++) {
        if (e[i] == t) {
          e.splice(i, 1);break;
        }
      }
    }, n.prototype.redraw = function () {
      var t = this.options.margin,
          e = this.body.range,
          i = l.option.asSize,
          o = this.options,
          n = o.orientation.item,
          s = !1,
          r = this.dom.frame;this.props.top = this.body.domProps.top.height + this.body.domProps.border.top, this.options.rtl ? this.props.right = this.body.domProps.right.width + this.body.domProps.border.right : this.props.left = this.body.domProps.left.width + this.body.domProps.border.left, r.className = "vis-itemset", s = this._orderGroups() || s;var a = e.end - e.start,
          h = a != this.lastVisibleInterval || this.props.width != this.props.lastWidth,
          d = e.start != this.lastRangeStart,
          u = o.stack != this.lastStack,
          p = o.stackSubgroups != this.lastStackSubgroups,
          c = h || d || u || p;this.lastVisibleInterval = a, this.lastRangeStart = e.start, this.lastStack = o.stack, this.lastStackSubgroups = o.stackSubgroups, this.props.lastWidth = this.props.width;var m = this._firstGroup(),
          f = { item: t.item, axis: t.axis },
          g = { item: t.item, axis: t.item.vertical / 2 },
          v = 0,
          y = t.axis + t.item.vertical;this.groups[D].redraw(e, g, c);var b = {},
          _ = 0;if (l.forEach(this.groups, function (t, i) {
        if (i !== D) {
          var o = t == m ? f : g;b[i] = t.redraw(e, o, c, !0), _ = b[i].length;
        }
      }), _ > 0) {
        for (var w = {}, x = 0; x < _; x++) {
          l.forEach(b, function (t, e) {
            w[e] = t[x]();
          });
        }l.forEach(this.groups, function (t, e) {
          if (e !== D) {
            var i = w[e];s = i || s, v += t.height;
          }
        }), v = Math.max(v, y);
      }return v = Math.max(v, y), r.style.height = i(v), this.props.width = r.offsetWidth, this.props.height = v, this.dom.axis.style.top = i("top" == n ? this.body.domProps.top.height + this.body.domProps.border.top : this.body.domProps.top.height + this.body.domProps.centerContainer.height), this.options.rtl ? this.dom.axis.style.right = "0" : this.dom.axis.style.left = "0", this.initialItemSetDrawn = !0, s = this._isResized() || s;
    }, n.prototype._firstGroup = function () {
      var t = "top" == this.options.orientation.item ? 0 : this.groupIds.length - 1,
          e = this.groupIds[t];return this.groups[e] || this.groups[x] || null;
    }, n.prototype._updateUngrouped = function () {
      var t,
          e,
          i = this.groups[x];if (this.groupsData) {
        if (i) {
          i.hide(), delete this.groups[x];for (e in this.items) {
            if (this.items.hasOwnProperty(e)) {
              t = this.items[e], t.parent && t.parent.remove(t);var o = this._getGroupId(t.data),
                  n = this.groups[o];n && n.add(t) || t.hide();
            }
          }
        }
      } else if (!i) {
        i = new f(null, null, this), this.groups[x] = i;for (e in this.items) {
          this.items.hasOwnProperty(e) && (t = this.items[e], i.add(t));
        }i.show();
      }
    }, n.prototype.getLabelSet = function () {
      return this.dom.labelSet;
    }, n.prototype.setItems = function (t) {
      var e,
          i = this,
          o = this.itemsData;if (t) {
        if (!(t instanceof u || t instanceof p)) throw new TypeError("Data must be an instance of DataSet or DataView");this.itemsData = t;
      } else this.itemsData = null;if (o && (l.forEach(this.itemListeners, function (t, e) {
        o.off(e, t);
      }), e = o.getIds(), this._onRemove(e)), this.itemsData) {
        var n = this.id;l.forEach(this.itemListeners, function (t, e) {
          i.itemsData.on(e, t, n);
        }), e = this.itemsData.getIds(), this._onAdd(e), this._updateUngrouped();
      }this.body.emitter.emit("_change", { queue: !0 });
    }, n.prototype.getItems = function () {
      return this.itemsData;
    }, n.prototype.setGroups = function (t) {
      var e,
          i = this;if (this.groupsData && (l.forEach(this.groupListeners, function (t, e) {
        i.groupsData.off(e, t);
      }), e = this.groupsData.getIds(), this.groupsData = null, this._onRemoveGroups(e)), t) {
        if (!(t instanceof u || t instanceof p)) throw new TypeError("Data must be an instance of DataSet or DataView");this.groupsData = t;
      } else this.groupsData = null;if (this.groupsData) {
        var o = this.groupsData;this.groupsData instanceof p && (o = this.groupsData.getDataSet()), o.get().forEach(function (t) {
          t.nestedGroups && t.nestedGroups.forEach(function (e) {
            var i = o.get(e);i.nestedInGroup = t.id, 0 == t.showNested && (i.visible = !1), o.update(i);
          });
        });var n = this.id;l.forEach(this.groupListeners, function (t, e) {
          i.groupsData.on(e, t, n);
        }), e = this.groupsData.getIds(), this._onAddGroups(e);
      }this._updateUngrouped(), this._order(), this.body.emitter.emit("_change", { queue: !0 });
    }, n.prototype.getGroups = function () {
      return this.groupsData;
    }, n.prototype.removeItem = function (t) {
      var e = this.itemsData.get(t),
          i = this.itemsData.getDataSet();e && this.options.onRemove(e, function (e) {
        e && i.remove(t);
      });
    }, n.prototype._getType = function (t) {
      return t.type || this.options.type || (t.end ? "range" : "box");
    }, n.prototype._getGroupId = function (t) {
      return "background" == this._getType(t) && void 0 == t.group ? D : this.groupsData ? t.group : x;
    }, n.prototype._onUpdate = function (t) {
      var e = this;t.forEach(function (t) {
        var i,
            o = e.itemsData.get(t, e.itemOptions),
            s = e.items[t],
            r = o ? e._getType(o) : null,
            a = n.types[r];if (s && (a && s instanceof a ? e._updateItem(s, o) : (i = s.selected, e._removeItem(s), s = null)), !s && o) {
          if (!a) throw "rangeoverflow" == r ? new TypeError('Item type "rangeoverflow" is deprecated. Use css styling instead: .vis-item.vis-range .vis-item-content {overflow: visible;}') : new TypeError('Unknown item type "' + r + '"');s = new a(o, e.conversion, e.options), s.id = t, e._addItem(s), i && (this.selection.push(t), s.select());
        }
      }.bind(this)), this._order(), this.body.emitter.emit("_change", { queue: !0 });
    }, n.prototype._onAdd = n.prototype._onUpdate, n.prototype._onRemove = function (t) {
      var e = 0,
          i = this;t.forEach(function (t) {
        var o = i.items[t];o && (e++, i._removeItem(o));
      }), e && (this._order(), this.body.emitter.emit("_change", { queue: !0 }));
    }, n.prototype._order = function () {
      l.forEach(this.groups, function (t) {
        t.order();
      });
    }, n.prototype._onUpdateGroups = function (t) {
      this._onAddGroups(t);
    }, n.prototype._onAddGroups = function (t) {
      var e = this;t.forEach(function (t) {
        var i = e.groupsData.get(t),
            o = e.groups[t];if (o) o.setData(i);else {
          if (t == x || t == D) throw new Error("Illegal group id. " + t + " is a reserved id.");var n = (0, r.default)(e.options);l.extend(n, { height: null }), o = new f(t, i, e), e.groups[t] = o;for (var s in e.items) {
            if (e.items.hasOwnProperty(s)) {
              var a = e.items[s];a.data.group == t && o.add(a);
            }
          }o.order(), o.show();
        }
      }), this.body.emitter.emit("_change", { queue: !0 });
    }, n.prototype._onRemoveGroups = function (t) {
      var e = this.groups;t.forEach(function (t) {
        var i = e[t];i && (i.hide(), delete e[t]);
      }), this.markDirty(), this.body.emitter.emit("_change", { queue: !0 });
    }, n.prototype._orderGroups = function () {
      if (this.groupsData) {
        var t = this.groupsData.getIds({ order: this.options.groupOrder });t = this._orderNestedGroups(t);var e = !l.equalArray(t, this.groupIds);if (e) {
          var i = this.groups;t.forEach(function (t) {
            i[t].hide();
          }), t.forEach(function (t) {
            i[t].show();
          }), this.groupIds = t;
        }return e;
      }return !1;
    }, n.prototype._orderNestedGroups = function (t) {
      var e = [];return t.forEach(function (t) {
        var i = this.groupsData.get(t);if (i.nestedInGroup || e.push(t), i.nestedGroups) {
          var o = this.groupsData.get({ filter: function filter(e) {
              return e.nestedInGroup == t;
            }, order: this.options.groupOrder }),
              n = o.map(function (t) {
            return t.id;
          });e = e.concat(n);
        }
      }, this), e;
    }, n.prototype._addItem = function (t) {
      this.items[t.id] = t;var e = this._getGroupId(t.data),
          i = this.groups[e];i ? i && i.data && i.data.showNested && (t.groupShowing = !0) : t.groupShowing = !1, i && i.add(t);
    }, n.prototype._updateItem = function (t, e) {
      t.setData(e);var i = this._getGroupId(t.data),
          o = this.groups[i];o ? o && o.data && o.data.showNested && (t.groupShowing = !0) : t.groupShowing = !1;
    }, n.prototype._removeItem = function (t) {
      t.hide(), delete this.items[t.id];var e = this.selection.indexOf(t.id);-1 != e && this.selection.splice(e, 1), t.parent && t.parent.remove(t);
    }, n.prototype._constructByEndArray = function (t) {
      for (var e = [], i = 0; i < t.length; i++) {
        t[i] instanceof b && e.push(t[i]);
      }return e;
    }, n.prototype._onTouch = function (t) {
      this.touchParams.item = this.itemFromTarget(t), this.touchParams.dragLeftItem = t.target.dragLeftItem || !1, this.touchParams.dragRightItem = t.target.dragRightItem || !1, this.touchParams.itemProps = null;
    }, n.prototype._getGroupIndex = function (t) {
      for (var e = 0; e < this.groupIds.length; e++) {
        if (t == this.groupIds[e]) return e;
      }
    }, n.prototype._onDragStart = function (t) {
      if (!this.touchParams.itemIsDragging) {
        var e,
            i = this.touchParams.item || null,
            o = this;if (i && (i.selected || this.options.itemsAlwaysDraggable.item)) {
          if (this.options.editable.overrideItems && !this.options.editable.updateTime && !this.options.editable.updateGroup) return;if (null != i.editable && !i.editable.updateTime && !i.editable.updateGroup && !this.options.editable.overrideItems) return;var n = this.touchParams.dragLeftItem,
              s = this.touchParams.dragRightItem;if (this.touchParams.itemIsDragging = !0, this.touchParams.selectedItem = i, n) e = { item: n, initialX: t.center.x, dragLeft: !0, data: this._cloneItemData(i.data) }, this.touchParams.itemProps = [e];else if (s) e = { item: s, initialX: t.center.x, dragRight: !0, data: this._cloneItemData(i.data) }, this.touchParams.itemProps = [e];else if (this.options.editable.add && (t.srcEvent.ctrlKey || t.srcEvent.metaKey)) this._onDragStartAddItem(t);else {
            this.groupIds.length < 1 && this.redraw();var r = this._getGroupIndex(i.data.group),
                a = this.options.itemsAlwaysDraggable.item && !i.selected ? [i.id] : this.getSelection();this.touchParams.itemProps = a.map(function (e) {
              var i = o.items[e],
                  n = o._getGroupIndex(i.data.group);return { item: i, initialX: t.center.x, groupOffset: r - n, data: this._cloneItemData(i.data) };
            }.bind(this));
          }t.stopPropagation();
        } else this.options.editable.add && (t.srcEvent.ctrlKey || t.srcEvent.metaKey) && this._onDragStartAddItem(t);
      }
    }, n.prototype._onDragStartAddItem = function (t) {
      var e,
          i,
          o = this.options.snap || null;this.options.rtl ? (e = l.getAbsoluteRight(this.dom.frame), i = e - t.center.x + 10) : (e = l.getAbsoluteLeft(this.dom.frame), i = t.center.x - e - 10);var n = this.body.util.toTime(i),
          s = this.body.util.getScale(),
          r = this.body.util.getStep(),
          a = o ? o(n, s, r) : n,
          h = a,
          d = { type: "range", start: a, end: h, content: "new item" },
          u = l.randomUUID();d[this.itemsData._fieldId] = u;var p = this.groupFromTarget(t);p && (d.group = p.groupId);var c = new b(d, this.conversion, this.options);c.id = u, c.data = this._cloneItemData(d), this._addItem(c), this.touchParams.selectedItem = c;var m = { item: c, initialX: t.center.x, data: c.data };this.options.rtl ? m.dragLeft = !0 : m.dragRight = !0, this.touchParams.itemProps = [m], t.stopPropagation();
    }, n.prototype._onDrag = function (t) {
      if (this.touchParams.itemProps) {
        t.stopPropagation();var e,
            i = this,
            o = this.options.snap || null;e = this.options.rtl ? this.body.dom.root.offsetLeft + this.body.domProps.right.width : this.body.dom.root.offsetLeft + this.body.domProps.left.width;var n = this.body.util.getScale(),
            s = this.body.util.getStep(),
            r = this.touchParams.selectedItem,
            a = (this.options.editable.overrideItems || null == r.editable) && this.options.editable.updateGroup || !this.options.editable.overrideItems && null != r.editable && r.editable.updateGroup,
            h = null;if (a && r && void 0 != r.data.group) {
          var d = i.groupFromTarget(t);d && (h = this._getGroupIndex(d.groupId));
        }this.touchParams.itemProps.forEach(function (d) {
          var u,
              p,
              c,
              m,
              f,
              g = i.body.util.toTime(t.center.x - e),
              v = i.body.util.toTime(d.initialX - e);u = this.options.rtl ? -(g - v) : g - v;var y = this._cloneItemData(d.item.data);if (null == d.item.editable || d.item.editable.updateTime || d.item.editable.updateGroup || i.options.editable.overrideItems) {
            if ((this.options.editable.overrideItems || null == r.editable) && this.options.editable.updateTime || !this.options.editable.overrideItems && null != r.editable && r.editable.updateTime) if (d.dragLeft) this.options.rtl ? void 0 != y.end && (c = l.convert(d.data.end, "Date"), f = new Date(c.valueOf() + u), y.end = o ? o(f, n, s) : f) : void 0 != y.start && (p = l.convert(d.data.start, "Date"), m = new Date(p.valueOf() + u), y.start = o ? o(m, n, s) : m);else if (d.dragRight) this.options.rtl ? void 0 != y.start && (p = l.convert(d.data.start, "Date"), m = new Date(p.valueOf() + u), y.start = o ? o(m, n, s) : m) : void 0 != y.end && (c = l.convert(d.data.end, "Date"), f = new Date(c.valueOf() + u), y.end = o ? o(f, n, s) : f);else if (void 0 != y.start) if (p = l.convert(d.data.start, "Date").valueOf(), m = new Date(p + u), void 0 != y.end) {
              c = l.convert(d.data.end, "Date");var b = c.valueOf() - p.valueOf();y.start = o ? o(m, n, s) : m, y.end = new Date(y.start.valueOf() + b);
            } else y.start = o ? o(m, n, s) : m;if (a && !d.dragLeft && !d.dragRight && null != h && void 0 != y.group) {
              var _ = h - d.groupOffset;_ = Math.max(0, _), _ = Math.min(i.groupIds.length - 1, _), y.group = i.groupIds[_];
            }y = this._cloneItemData(y), i.options.onMoving(y, function (t) {
              t && d.item.setData(this._cloneItemData(t, "Date"));
            }.bind(this));
          }
        }.bind(this)), this.body.emitter.emit("_change");
      }
    }, n.prototype._moveToGroup = function (t, e) {
      var i = this.groups[e];if (i && i.groupId != t.data.group) {
        var o = t.parent;o.remove(t), o.order(), t.data.group = i.groupId, i.add(t), i.order();
      }
    }, n.prototype._onDragEnd = function (t) {
      if (this.touchParams.itemIsDragging = !1, this.touchParams.itemProps) {
        t.stopPropagation();var e = this,
            i = this.itemsData.getDataSet(),
            o = this.touchParams.itemProps;this.touchParams.itemProps = null, o.forEach(function (t) {
          var o = t.item.id;if (null != e.itemsData.get(o, e.itemOptions)) {
            var n = this._cloneItemData(t.item.data);e.options.onMove(n, function (n) {
              n ? (n[i._fieldId] = o, i.update(n)) : (t.item.setData(t.data), e.body.emitter.emit("_change"));
            });
          } else e.options.onAdd(t.item.data, function (i) {
            e._removeItem(t.item), i && e.itemsData.getDataSet().add(i), e.body.emitter.emit("_change");
          });
        }.bind(this));
      }
    }, n.prototype._onGroupClick = function (t) {
      var e = this.groupFromTarget(t);if (e && e.nestedGroups) {
        var i = this.groupsData.getDataSet(),
            o = i.get(e.groupId);void 0 == o.showNested && (o.showNested = !0), o.showNested = !o.showNested;var n = i.get(e.nestedGroups).map(function (t) {
          return t.visible = o.showNested, t;
        });if (i.update(n.concat(o)), o.showNested) l.removeClassName(e.dom.label, "collapsed"), l.addClassName(e.dom.label, "expanded");else {
          l.removeClassName(e.dom.label, "expanded");var s = this.options.rtl ? "collapsed-rtl" : "collapsed";l.addClassName(e.dom.label, s);
        }
      }
    }, n.prototype._onGroupDragStart = function (t) {
      this.options.groupEditable.order && (this.groupTouchParams.group = this.groupFromTarget(t), this.groupTouchParams.group && (t.stopPropagation(), this.groupTouchParams.originalOrder = this.groupsData.getIds({ order: this.options.groupOrder })));
    }, n.prototype._onGroupDrag = function (t) {
      if (this.options.groupEditable.order && this.groupTouchParams.group) {
        t.stopPropagation();var e = this.groupsData;this.groupsData instanceof p && (e = this.groupsData.getDataSet());var i = this.groupFromTarget(t);if (i && i.height != this.groupTouchParams.group.height) {
          var o = i.top < this.groupTouchParams.group.top,
              n = t.center ? t.center.y : t.clientY,
              s = l.getAbsoluteTop(i.dom.foreground),
              r = this.groupTouchParams.group.height;if (o) {
            if (s + r < n) return;
          } else {
            if (s + i.height - r > n) return;
          }
        }if (i && i != this.groupTouchParams.group) {
          var a = e.get(i.groupId),
              h = e.get(this.groupTouchParams.group.groupId);h && a && (this.options.groupOrderSwap(h, a, e), e.update(h), e.update(a));var d = e.getIds({ order: this.options.groupOrder });if (!l.equalArray(d, this.groupTouchParams.originalOrder)) for (var u = this.groupTouchParams.originalOrder, c = this.groupTouchParams.group.groupId, m = Math.min(u.length, d.length), f = 0, g = 0, v = 0; f < m;) {
            for (; f + g < m && f + v < m && d[f + g] == u[f + v];) {
              f++;
            }if (f + g >= m) break;if (d[f + g] == c) g = 1;else if (u[f + v] == c) v = 1;else {
              var y = d.indexOf(u[f + v]),
                  b = e.get(d[f + g]),
                  _ = e.get(u[f + v]);this.options.groupOrderSwap(b, _, e), e.update(b), e.update(_);var w = d[f + g];d[f + g] = u[f + v], d[y] = w, f++;
            }
          }
        }
      }
    }, n.prototype._onGroupDragEnd = function (t) {
      if (this.options.groupEditable.order && this.groupTouchParams.group) {
        t.stopPropagation();var e = this,
            i = e.groupTouchParams.group.groupId,
            o = e.groupsData.getDataSet(),
            n = l.extend({}, o.get(i));e.options.onMoveGroup(n, function (t) {
          if (t) t[o._fieldId] = i, o.update(t);else {
            var n = o.getIds({ order: e.options.groupOrder });if (!l.equalArray(n, e.groupTouchParams.originalOrder)) for (var s = e.groupTouchParams.originalOrder, r = Math.min(s.length, n.length), a = 0; a < r;) {
              for (; a < r && n[a] == s[a];) {
                a++;
              }if (a >= r) break;var h = n.indexOf(s[a]),
                  d = o.get(n[a]),
                  u = o.get(s[a]);e.options.groupOrderSwap(d, u, o), o.update(d), o.update(u);var p = n[a];n[a] = s[a], n[h] = p, a++;
            }
          }
        }), e.body.emitter.emit("groupDragged", { groupId: i });
      }
    }, n.prototype._onSelectItem = function (t) {
      if (this.options.selectable) {
        var e = t.srcEvent && (t.srcEvent.ctrlKey || t.srcEvent.metaKey),
            i = t.srcEvent && t.srcEvent.shiftKey;if (e || i) return void this._onMultiSelectItem(t);var o = this.getSelection(),
            n = this.itemFromTarget(t),
            s = n ? [n.id] : [];this.setSelection(s);var r = this.getSelection();(r.length > 0 || o.length > 0) && this.body.emitter.emit("select", { items: r, event: t });
      }
    }, n.prototype._onMouseOver = function (t) {
      var e = this.itemFromTarget(t);if (e) {
        if (e !== this.itemFromRelatedTarget(t)) {
          var i = e.getTitle();if (this.options.showTooltips && i) {
            null == this.popup && (this.popup = new w(this.body.dom.root, this.options.tooltip.overflowMethod || "flip")), this.popup.setText(i);var o = this.body.dom.centerContainer;this.popup.setPosition(t.clientX - l.getAbsoluteLeft(o) + o.offsetLeft, t.clientY - l.getAbsoluteTop(o) + o.offsetTop), this.popup.show();
          } else null != this.popup && this.popup.hide();this.body.emitter.emit("itemover", { item: e.id, event: t });
        }
      }
    }, n.prototype._onMouseOut = function (t) {
      var e = this.itemFromTarget(t);if (e) {
        e !== this.itemFromRelatedTarget(t) && (null != this.popup && this.popup.hide(), this.body.emitter.emit("itemout", { item: e.id, event: t }));
      }
    }, n.prototype._onMouseMove = function (t) {
      if (this.itemFromTarget(t) && this.options.showTooltips && this.options.tooltip.followMouse && this.popup && !this.popup.hidden) {
        var e = this.body.dom.centerContainer;this.popup.setPosition(t.clientX - l.getAbsoluteLeft(e) + e.offsetLeft, t.clientY - l.getAbsoluteTop(e) + e.offsetTop), this.popup.show();
      }
    }, n.prototype._onMouseWheel = function (t) {
      this.touchParams.itemIsDragging && this._onDragEnd(t);
    }, n.prototype._onUpdateItem = function (t) {
      if (this.options.selectable && this.options.editable.add) {
        var e = this;if (t) {
          var i = e.itemsData.get(t.id);this.options.onUpdate(i, function (t) {
            t && e.itemsData.getDataSet().update(t);
          });
        }
      }
    }, n.prototype._onDropObjectOnItem = function (t) {
      var e = this.itemFromTarget(t),
          i = JSON.parse(t.dataTransfer.getData("text"));this.options.onDropObjectOnItem(i, e);
    }, n.prototype._onAddItem = function (t) {
      if (this.options.selectable && this.options.editable.add) {
        var e,
            i,
            o = this,
            n = this.options.snap || null;this.options.rtl ? (e = l.getAbsoluteRight(this.dom.frame), i = e - t.center.x) : (e = l.getAbsoluteLeft(this.dom.frame), i = t.center.x - e);var s,
            r,
            a = this.body.util.toTime(i),
            h = this.body.util.getScale(),
            d = this.body.util.getStep();"drop" == t.type ? (r = JSON.parse(t.dataTransfer.getData("text")), r.content = r.content ? r.content : "new item", r.start = r.start ? r.start : n ? n(a, h, d) : a, r.type = r.type || "box", r[this.itemsData._fieldId] = r.id || l.randomUUID(), "range" != r.type || r.end || (s = this.body.util.toTime(i + this.props.width / 5), r.end = n ? n(s, h, d) : s)) : (r = { start: n ? n(a, h, d) : a, content: "new item" }, r[this.itemsData._fieldId] = l.randomUUID(), "range" === this.options.type && (s = this.body.util.toTime(i + this.props.width / 5), r.end = n ? n(s, h, d) : s));var u = this.groupFromTarget(t);u && (r.group = u.groupId), r = this._cloneItemData(r), this.options.onAdd(r, function (e) {
          e && (o.itemsData.getDataSet().add(e), "drop" == t.type && o.setSelection([e.id]));
        });
      }
    }, n.prototype._onMultiSelectItem = function (t) {
      if (this.options.selectable) {
        var e = this.itemFromTarget(t);if (e) {
          var i = this.options.multiselect ? this.getSelection() : [];if ((t.srcEvent && t.srcEvent.shiftKey || !1) && this.options.multiselect) {
            var o = this.itemsData.get(e.id).group,
                s = void 0;this.options.multiselectPerGroup && i.length > 0 && (s = this.itemsData.get(i[0]).group), this.options.multiselectPerGroup && void 0 != s && s != o || i.push(e.id);var r = n._getItemRange(this.itemsData.get(i, this.itemOptions));if (!this.options.multiselectPerGroup || s == o) {
              i = [];for (var a in this.items) {
                if (this.items.hasOwnProperty(a)) {
                  var h = this.items[a],
                      d = h.data.start,
                      l = void 0 !== h.data.end ? h.data.end : d;!(d >= r.min && l <= r.max) || this.options.multiselectPerGroup && s != this.itemsData.get(h.id).group || h instanceof _ || i.push(h.id);
                }
              }
            }
          } else {
            var u = i.indexOf(e.id);-1 == u ? i.push(e.id) : i.splice(u, 1);
          }this.setSelection(i), this.body.emitter.emit("select", { items: this.getSelection(), event: t });
        }
      }
    }, n._getItemRange = function (t) {
      var e = null,
          i = null;return t.forEach(function (t) {
        (null == i || t.start < i) && (i = t.start), void 0 != t.end ? (null == e || t.end > e) && (e = t.end) : (null == e || t.start > e) && (e = t.start);
      }), { min: i, max: e };
    }, n.prototype.itemFromElement = function (t) {
      for (var e = t; e;) {
        if (e.hasOwnProperty("timeline-item")) return e["timeline-item"];e = e.parentNode;
      }return null;
    }, n.prototype.itemFromTarget = function (t) {
      return this.itemFromElement(t.target);
    }, n.prototype.itemFromRelatedTarget = function (t) {
      return this.itemFromElement(t.relatedTarget);
    }, n.prototype.groupFromTarget = function (t) {
      var e = t.center ? t.center.y : t.clientY,
          i = this.groupIds;i.length <= 0 && this.groupsData && (i = this.groupsData.getIds({ order: this.options.groupOrder }));for (var o = 0; o < i.length; o++) {
        var n = i[o],
            s = this.groups[n],
            r = s.dom.foreground,
            a = l.getAbsoluteTop(r);if (e > a && e < a + r.offsetHeight) return s;if ("top" === this.options.orientation.item) {
          if (o === this.groupIds.length - 1 && e > a) return s;
        } else if (0 === o && e < a + r.offset) return s;
      }return null;
    }, n.itemSetFromTarget = function (t) {
      for (var e = t.target; e;) {
        if (e.hasOwnProperty("timeline-itemset")) return e["timeline-itemset"];e = e.parentNode;
      }return null;
    }, n.prototype._cloneItemData = function (t, e) {
      var i = l.extend({}, t);return e || (e = this.itemsData.getDataSet()._options.type), void 0 != i.start && (i.start = l.convert(i.start, e && e.start || "Date")), void 0 != i.end && (i.end = l.convert(i.end, e && e.end || "Date")), i;
    }, t.exports = n;
  }, function (t, e, i) {
    e.orderByStart = function (t) {
      t.sort(function (t, e) {
        return t.data.start - e.data.start;
      });
    }, e.orderByEnd = function (t) {
      t.sort(function (t, e) {
        return ("end" in t.data ? t.data.end : t.data.start) - ("end" in e.data ? e.data.end : e.data.start);
      });
    }, e.stack = function (t, i, o) {
      if (o) for (var n = 0; n < t.length; n++) {
        t[n].top = null;
      }for (var n = 0; n < t.length; n++) {
        var s = t[n];if (s.stack && null === s.top) {
          s.top = i.axis;do {
            for (var r = null, a = 0, h = t.length; a < h; a++) {
              var d = t[a];if (null !== d.top && d !== s && d.stack && e.collision(s, d, i.item, d.options.rtl)) {
                r = d;break;
              }
            }null != r && (s.top = r.top + r.height + i.item.vertical);
          } while (r);
        }
      }
    }, e.substack = function (t, i, o) {
      for (var n = 0; n < t.length; n++) {
        t[n].top = null;
      }var s = o.height;for (n = 0; n < t.length; n++) {
        var r = t[n];if (r.stack && null === r.top) {
          r.top = r.baseTop;do {
            for (var a = null, h = 0, d = t.length; h < d; h++) {
              var l = t[h];if (null !== l.top && l !== r && e.collision(r, l, i.item, l.options.rtl)) {
                a = l;break;
              }
            }null != a && (r.top = a.top + a.height + i.item.vertical), r.top + r.height > s && (s = r.top + r.height);
          } while (a);
        }
      }o.height = s - o.top + .5 * i.item.vertical;
    }, e.nostack = function (t, i, o, n) {
      for (var s = 0; s < t.length; s++) {
        if (void 0 == t[s].data.subgroup) t[s].top = i.item.vertical;else if (void 0 !== t[s].data.subgroup && n) {
          var r = 0;for (var a in o) {
            o.hasOwnProperty(a) && 1 == o[a].visible && o[a].index < o[t[s].data.subgroup].index && (r += o[a].height, o[t[s].data.subgroup].top = r);
          }t[s].top = r + .5 * i.item.vertical;
        }
      }n || e.stackSubgroups(t, i, o);
    }, e.stackSubgroups = function (t, i, o) {
      for (var n in o) {
        if (o.hasOwnProperty(n)) {
          o[n].top = 0;do {
            var s = null;for (var r in o) {
              if (null !== o[r].top && r !== n && o[n].index > o[r].index && e.collisionByTimes(o[n], o[r])) {
                s = o[r];break;
              }
            }null != s && (o[n].top = s.top + s.height);
          } while (s);
        }
      }for (var a = 0; a < t.length; a++) {
        void 0 !== t[a].data.subgroup && (t[a].top = o[t[a].data.subgroup].top + .5 * i.item.vertical);
      }
    }, e.stackSubgroupsWithInnerStack = function (t, i, o) {
      var n = !1,
          s = [];for (var r in o) {
        o[r].hasOwnProperty("index") ? s[o[r].index] = r : s.push(r);
      }for (var a = 0; a < s.length; a++) {
        if (r = s[a], o.hasOwnProperty(r)) {
          n = n || o[r].stack, o[r].top = 0;for (var h in o) {
            o[h].visible && o[r].index > o[h].index && (o[r].top += o[h].height);
          }for (var d = t[r], l = 0; l < d.length; l++) {
            void 0 !== d[l].data.subgroup && (d[l].top = o[d[l].data.subgroup].top + .5 * i.item.vertical, o[r].stack && (d[l].baseTop = d[l].top));
          }n && o[r].stack && e.substack(t[r], i, o[r]);
        }
      }
    }, e.collision = function (t, e, i, o) {
      return o ? t.right - i.horizontal + .001 < e.right + e.width && t.right + t.width + i.horizontal - .001 > e.right && t.top - i.vertical + .001 < e.top + e.height && t.top + t.height + i.vertical - .001 > e.top : t.left - i.horizontal + .001 < e.left + e.width && t.left + t.width + i.horizontal - .001 > e.left && t.top - i.vertical + .001 < e.top + e.height && t.top + t.height + i.vertical - .001 > e.top;
    }, e.collisionByTimes = function (t, e) {
      return t.start <= e.start && t.end >= e.start && t.top < e.top + e.height && t.top + t.height > e.top || e.start <= t.start && e.end >= t.start && e.top < t.top + t.height && e.top + e.height > t.top;
    };
  }, function (t, e, i) {
    function o(t, e, i) {
      if (this.props = { dot: { width: 0, height: 0 }, line: { width: 0, height: 0 } }, this.options = i, t && void 0 == t.start) throw new Error('Property "start" missing in item ' + t);n.call(this, t, e, i);
    }var n = i(22);o.prototype = new n(null, null, null), o.prototype.isVisible = function (t) {
      var e = this.options.align,
          i = this.width * t.getMillisecondsPerPixel();return "right" == e ? this.data.start.getTime() > t.start && this.data.start.getTime() - i < t.end : "left" == e ? this.data.start.getTime() + i > t.start && this.data.start.getTime() < t.end : this.data.start.getTime() + i / 2 > t.start && this.data.start.getTime() - i / 2 < t.end;
    }, o.prototype._createDomElement = function () {
      this.dom || (this.dom = {}, this.dom.box = document.createElement("DIV"), this.dom.content = document.createElement("DIV"), this.dom.content.className = "vis-item-content", this.dom.box.appendChild(this.dom.content), this.dom.line = document.createElement("DIV"), this.dom.line.className = "vis-line", this.dom.dot = document.createElement("DIV"), this.dom.dot.className = "vis-dot", this.dom.box["timeline-item"] = this, this.dirty = !0);
    }, o.prototype._appendDomElement = function () {
      if (!this.parent) throw new Error("Cannot redraw item: no parent attached");if (!this.dom.box.parentNode) {
        var t = this.parent.dom.foreground;if (!t) throw new Error("Cannot redraw item: parent has no foreground container element");t.appendChild(this.dom.box);
      }if (!this.dom.line.parentNode) {
        var e = this.parent.dom.background;if (!e) throw new Error("Cannot redraw item: parent has no background container element");e.appendChild(this.dom.line);
      }if (!this.dom.dot.parentNode) {
        var i = this.parent.dom.axis;if (!e) throw new Error("Cannot redraw item: parent has no axis container element");i.appendChild(this.dom.dot);
      }this.displayed = !0;
    }, o.prototype._updateDirtyDomComponents = function () {
      if (this.dirty) {
        this._updateContents(this.dom.content), this._updateDataAttributes(this.dom.box), this._updateStyle(this.dom.box);var t = this.editable.updateTime || this.editable.updateGroup,
            e = (this.data.className ? " " + this.data.className : "") + (this.selected ? " vis-selected" : "") + (t ? " vis-editable" : " vis-readonly");this.dom.box.className = "vis-item vis-box" + e, this.dom.line.className = "vis-item vis-line" + e, this.dom.dot.className = "vis-item vis-dot" + e;
      }
    }, o.prototype._getDomComponentsSizes = function () {
      return { previous: { right: this.dom.box.style.right, left: this.dom.box.style.left }, dot: { height: this.dom.dot.offsetHeight, width: this.dom.dot.offsetWidth }, line: { width: this.dom.line.offsetWidth }, box: { width: this.dom.box.offsetWidth, height: this.dom.box.offsetHeight } };
    }, o.prototype._updateDomComponentsSizes = function (t) {
      this.options.rtl ? this.dom.box.style.right = "0px" : this.dom.box.style.left = "0px", this.props.dot.height = t.dot.height, this.props.dot.width = t.dot.width, this.props.line.width = t.line.width, this.width = t.box.width, this.height = t.box.height, this.options.rtl ? this.dom.box.style.right = t.previous.right : this.dom.box.style.left = t.previous.left, this.dirty = !1;
    }, o.prototype._repaintDomAdditionals = function () {
      this._repaintOnItemUpdateTimeTooltip(this.dom.box), this._repaintDragCenter(), this._repaintDeleteButton(this.dom.box);
    }, o.prototype.redraw = function (t) {
      var e,
          i = [this._createDomElement.bind(this), this._appendDomElement.bind(this), this._updateDirtyDomComponents.bind(this), function () {
        this.dirty && (e = this._getDomComponentsSizes());
      }.bind(this), function () {
        this.dirty && this._updateDomComponentsSizes.bind(this)(e);
      }.bind(this), this._repaintDomAdditionals.bind(this)];if (t) return i;var o;return i.forEach(function (t) {
        o = t();
      }), o;
    }, o.prototype.show = function () {
      this.displayed || this.redraw();
    }, o.prototype.hide = function () {
      if (this.displayed) {
        var t = this.dom;t.box.parentNode && t.box.parentNode.removeChild(t.box), t.line.parentNode && t.line.parentNode.removeChild(t.line), t.dot.parentNode && t.dot.parentNode.removeChild(t.dot), this.displayed = !1;
      }
    }, o.prototype.repositionX = function () {
      var t = this.conversion.toScreen(this.data.start),
          e = this.options.align;"right" == e ? this.options.rtl ? (this.right = t - this.width, this.dom.box.style.right = this.right + "px", this.dom.line.style.right = t - this.props.line.width + "px", this.dom.dot.style.right = t - this.props.line.width / 2 - this.props.dot.width / 2 + "px") : (this.left = t - this.width, this.dom.box.style.left = this.left + "px", this.dom.line.style.left = t - this.props.line.width + "px", this.dom.dot.style.left = t - this.props.line.width / 2 - this.props.dot.width / 2 + "px") : "left" == e ? this.options.rtl ? (this.right = t, this.dom.box.style.right = this.right + "px", this.dom.line.style.right = t + "px", this.dom.dot.style.right = t + this.props.line.width / 2 - this.props.dot.width / 2 + "px") : (this.left = t, this.dom.box.style.left = this.left + "px", this.dom.line.style.left = t + "px", this.dom.dot.style.left = t + this.props.line.width / 2 - this.props.dot.width / 2 + "px") : this.options.rtl ? (this.right = t - this.width / 2, this.dom.box.style.right = this.right + "px", this.dom.line.style.right = t - this.props.line.width + "px", this.dom.dot.style.right = t - this.props.dot.width / 2 + "px") : (this.left = t - this.width / 2, this.dom.box.style.left = this.left + "px", this.dom.line.style.left = t - this.props.line.width / 2 + "px", this.dom.dot.style.left = t - this.props.dot.width / 2 + "px");
    }, o.prototype.repositionY = function () {
      var t = this.options.orientation.item,
          e = this.dom.box,
          i = this.dom.line,
          o = this.dom.dot;if ("top" == t) e.style.top = (this.top || 0) + "px", i.style.top = "0", i.style.height = this.parent.top + this.top + 1 + "px", i.style.bottom = "";else {
        var n = this.parent.itemSet.props.height,
            s = n - this.parent.top - this.parent.height + this.top;e.style.top = (this.parent.height - this.top - this.height || 0) + "px", i.style.top = n - s + "px", i.style.bottom = "0";
      }o.style.top = -this.props.dot.height / 2 + "px";
    }, o.prototype.getWidthLeft = function () {
      return this.width / 2;
    }, o.prototype.getWidthRight = function () {
      return this.width / 2;
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e, i) {
      if (this.props = { dot: { top: 0, width: 0, height: 0 }, content: { height: 0, marginLeft: 0, marginRight: 0 } }, this.options = i, t && void 0 == t.start) throw new Error('Property "start" missing in item ' + t);n.call(this, t, e, i);
    }var n = i(22);o.prototype = new n(null, null, null), o.prototype.isVisible = function (t) {
      var e = this.width * t.getMillisecondsPerPixel();return this.data.start.getTime() + e > t.start && this.data.start < t.end;
    }, o.prototype._createDomElement = function () {
      this.dom || (this.dom = {}, this.dom.point = document.createElement("div"), this.dom.content = document.createElement("div"), this.dom.content.className = "vis-item-content", this.dom.point.appendChild(this.dom.content), this.dom.dot = document.createElement("div"), this.dom.point.appendChild(this.dom.dot), this.dom.point["timeline-item"] = this, this.dirty = !0);
    }, o.prototype._appendDomElement = function () {
      if (!this.parent) throw new Error("Cannot redraw item: no parent attached");if (!this.dom.point.parentNode) {
        var t = this.parent.dom.foreground;if (!t) throw new Error("Cannot redraw item: parent has no foreground container element");t.appendChild(this.dom.point);
      }this.displayed = !0;
    }, o.prototype._updateDirtyDomComponents = function () {
      if (this.dirty) {
        this._updateContents(this.dom.content), this._updateDataAttributes(this.dom.point), this._updateStyle(this.dom.point);var t = this.editable.updateTime || this.editable.updateGroup,
            e = (this.data.className ? " " + this.data.className : "") + (this.selected ? " vis-selected" : "") + (t ? " vis-editable" : " vis-readonly");this.dom.point.className = "vis-item vis-point" + e, this.dom.dot.className = "vis-item vis-dot" + e;
      }
    }, o.prototype._getDomComponentsSizes = function () {
      return { dot: { width: this.dom.dot.offsetWidth, height: this.dom.dot.offsetHeight }, content: { width: this.dom.content.offsetWidth, height: this.dom.content.offsetHeight }, point: { width: this.dom.point.offsetWidth, height: this.dom.point.offsetHeight } };
    }, o.prototype._updateDomComponentsSizes = function (t) {
      this.props.dot.width = t.dot.width, this.props.dot.height = t.dot.height, this.props.content.height = t.content.height, this.options.rtl ? this.dom.content.style.marginRight = 2 * this.props.dot.width + "px" : this.dom.content.style.marginLeft = 2 * this.props.dot.width + "px", this.width = t.point.width, this.height = t.point.height, this.dom.dot.style.top = (this.height - this.props.dot.height) / 2 + "px", this.options.rtl ? this.dom.dot.style.right = this.props.dot.width / 2 + "px" : this.dom.dot.style.left = this.props.dot.width / 2 + "px", this.dirty = !1;
    }, o.prototype._repaintDomAdditionals = function () {
      this._repaintOnItemUpdateTimeTooltip(this.dom.point), this._repaintDragCenter(), this._repaintDeleteButton(this.dom.point);
    }, o.prototype.redraw = function (t) {
      var e,
          i = [this._createDomElement.bind(this), this._appendDomElement.bind(this), this._updateDirtyDomComponents.bind(this), function () {
        this.dirty && (e = this._getDomComponentsSizes());
      }.bind(this), function () {
        this.dirty && this._updateDomComponentsSizes.bind(this)(e);
      }.bind(this), this._repaintDomAdditionals.bind(this)];if (t) return i;var o;return i.forEach(function (t) {
        o = t();
      }), o;
    }, o.prototype.show = function () {
      this.displayed || this.redraw();
    }, o.prototype.hide = function () {
      this.displayed && (this.dom.point.parentNode && this.dom.point.parentNode.removeChild(this.dom.point), this.displayed = !1);
    }, o.prototype.repositionX = function () {
      var t = this.conversion.toScreen(this.data.start);this.options.rtl ? (this.right = t - this.props.dot.width, this.dom.point.style.right = this.right + "px") : (this.left = t - this.props.dot.width, this.dom.point.style.left = this.left + "px");
    }, o.prototype.repositionY = function () {
      var t = this.options.orientation.item,
          e = this.dom.point;e.style.top = "top" == t ? this.top + "px" : this.parent.height - this.top - this.height + "px";
    }, o.prototype.getWidthLeft = function () {
      return this.props.dot.width;
    }, o.prototype.getWidthRight = function () {
      return this.props.dot.width;
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e, i) {
      if (this.props = { content: { width: 0 } }, this.overflow = !1, t) {
        if (void 0 == t.start) throw new Error('Property "start" missing in item ' + t.id);if (void 0 == t.end) throw new Error('Property "end" missing in item ' + t.id);
      }n.call(this, t, e, i);
    }var n = i(22),
        s = i(52),
        r = i(53);o.prototype = new n(null, null, null), o.prototype.baseClassName = "vis-item vis-background", o.prototype.stack = !1, o.prototype.isVisible = function (t) {
      return this.data.start < t.end && this.data.end > t.start;
    }, o.prototype._createDomElement = function () {
      this.dom || (this.dom = {}, this.dom.box = document.createElement("div"), this.dom.frame = document.createElement("div"), this.dom.frame.className = "vis-item-overflow", this.dom.box.appendChild(this.dom.frame), this.dom.content = document.createElement("div"), this.dom.content.className = "vis-item-content", this.dom.frame.appendChild(this.dom.content), this.dirty = !0);
    }, o.prototype._appendDomElement = function () {
      if (!this.parent) throw new Error("Cannot redraw item: no parent attached");if (!this.dom.box.parentNode) {
        var t = this.parent.dom.background;if (!t) throw new Error("Cannot redraw item: parent has no background container element");t.appendChild(this.dom.box);
      }this.displayed = !0;
    }, o.prototype._updateDirtyDomComponents = function () {
      if (this.dirty) {
        this._updateContents(this.dom.content), this._updateDataAttributes(this.dom.content), this._updateStyle(this.dom.box);var t = (this.data.className ? " " + this.data.className : "") + (this.selected ? " vis-selected" : "");this.dom.box.className = this.baseClassName + t;
      }
    }, o.prototype._getDomComponentsSizes = function () {
      return this.overflow = "hidden" !== window.getComputedStyle(this.dom.content).overflow, { content: { width: this.dom.content.offsetWidth } };
    }, o.prototype._updateDomComponentsSizes = function (t) {
      this.props.content.width = t.content.width, this.height = 0, this.dirty = !1;
    }, o.prototype._repaintDomAdditionals = function () {}, o.prototype.redraw = function (t) {
      var e,
          i = [this._createDomElement.bind(this), this._appendDomElement.bind(this), this._updateDirtyDomComponents.bind(this), function () {
        this.dirty && (e = this._getDomComponentsSizes.bind(this)());
      }.bind(this), function () {
        this.dirty && this._updateDomComponentsSizes.bind(this)(e);
      }.bind(this), this._repaintDomAdditionals.bind(this)];if (t) return i;var o;return i.forEach(function (t) {
        o = t();
      }), o;
    }, o.prototype.show = r.prototype.show, o.prototype.hide = r.prototype.hide, o.prototype.repositionX = r.prototype.repositionX, o.prototype.repositionY = function (t) {
      var e,
          i = this.options.orientation.item;if (void 0 !== this.data.subgroup) {
        var o = this.data.subgroup;this.dom.box.style.height = this.parent.subgroups[o].height + "px", this.dom.box.style.top = "top" == i ? this.parent.top + this.parent.subgroups[o].top + "px" : this.parent.top + this.parent.height - this.parent.subgroups[o].top - this.parent.subgroups[o].height + "px", this.dom.box.style.bottom = "";
      } else this.parent instanceof s ? (e = Math.max(this.parent.height, this.parent.itemSet.body.domProps.center.height, this.parent.itemSet.body.domProps.centerContainer.height), this.dom.box.style.bottom = "bottom" == i ? "0" : "", this.dom.box.style.top = "top" == i ? "0" : "") : (e = this.parent.height, this.dom.box.style.top = this.parent.top + "px", this.dom.box.style.bottom = "");this.dom.box.style.height = e + "px";
    }, t.exports = o;
  }, function (t, e, i) {
    Object.defineProperty(e, "__esModule", { value: !0 });var o = "string",
        n = "boolean",
        s = "number",
        r = "object",
        a = { configure: { enabled: { boolean: n }, filter: { boolean: n, function: "function" }, container: { dom: "dom" }, __type__: { object: r, boolean: n, function: "function" } }, align: { string: o }, rtl: { boolean: n, undefined: "undefined" }, rollingMode: { follow: { boolean: n }, offset: { number: s, undefined: "undefined" }, __type__: { object: r } }, verticalScroll: { boolean: n, undefined: "undefined" }, horizontalScroll: { boolean: n, undefined: "undefined" }, autoResize: { boolean: n }, throttleRedraw: { number: s }, clickToUse: { boolean: n }, dataAttributes: { string: o, array: "array" }, editable: { add: { boolean: n, undefined: "undefined" }, remove: { boolean: n, undefined: "undefined" }, updateGroup: { boolean: n, undefined: "undefined" }, updateTime: { boolean: n, undefined: "undefined" }, overrideItems: { boolean: n, undefined: "undefined" }, __type__: { boolean: n, object: r } }, end: { number: s, date: "date", string: o, moment: "moment" }, format: { minorLabels: { millisecond: { string: o, undefined: "undefined" }, second: { string: o, undefined: "undefined" }, minute: { string: o, undefined: "undefined" }, hour: { string: o, undefined: "undefined" }, weekday: { string: o, undefined: "undefined" }, day: { string: o, undefined: "undefined" }, week: { string: o, undefined: "undefined" }, month: { string: o, undefined: "undefined" }, year: { string: o, undefined: "undefined" }, __type__: { object: r, function: "function" } }, majorLabels: { millisecond: { string: o, undefined: "undefined" }, second: { string: o, undefined: "undefined" }, minute: { string: o, undefined: "undefined" }, hour: { string: o, undefined: "undefined" }, weekday: { string: o, undefined: "undefined" }, day: { string: o, undefined: "undefined" }, week: { string: o, undefined: "undefined" }, month: { string: o, undefined: "undefined" }, year: { string: o, undefined: "undefined" }, __type__: { object: r, function: "function" } }, __type__: { object: r } }, moment: { function: "function" }, groupOrder: { string: o, function: "function" }, groupEditable: { add: { boolean: n, undefined: "undefined" }, remove: { boolean: n, undefined: "undefined" }, order: { boolean: n, undefined: "undefined" }, __type__: { boolean: n, object: r } }, groupOrderSwap: { function: "function" }, height: { string: o, number: s }, hiddenDates: { start: { date: "date", number: s, string: o, moment: "moment" }, end: { date: "date", number: s, string: o, moment: "moment" }, repeat: { string: o }, __type__: { object: r, array: "array" } }, itemsAlwaysDraggable: { item: { boolean: n, undefined: "undefined" }, range: { boolean: n, undefined: "undefined" }, __type__: { boolean: n, object: r } }, limitSize: { boolean: n }, locale: { string: o }, locales: { __any__: { any: "any" }, __type__: { object: r } }, margin: { axis: { number: s }, item: { horizontal: { number: s, undefined: "undefined" }, vertical: { number: s, undefined: "undefined" }, __type__: { object: r, number: s } }, __type__: { object: r, number: s } }, max: { date: "date", number: s, string: o, moment: "moment" }, maxHeight: { number: s, string: o }, maxMinorChars: { number: s }, min: { date: "date", number: s, string: o, moment: "moment" }, minHeight: { number: s, string: o }, moveable: { boolean: n }, multiselect: { boolean: n }, multiselectPerGroup: { boolean: n }, onAdd: { function: "function" }, onDropObjectOnItem: { function: "function" }, onUpdate: { function: "function" }, onMove: { function: "function" }, onMoving: { function: "function" }, onRemove: { function: "function" }, onAddGroup: { function: "function" }, onMoveGroup: { function: "function" }, onRemoveGroup: { function: "function" }, onInitialDrawComplete: { function: "function" }, order: { function: "function" }, orientation: { axis: { string: o, undefined: "undefined" }, item: { string: o, undefined: "undefined" }, __type__: { string: o, object: r } }, selectable: { boolean: n }, showCurrentTime: { boolean: n }, showMajorLabels: { boolean: n }, showMinorLabels: { boolean: n }, stack: { boolean: n }, stackSubgroups: { boolean: n }, snap: { function: "function", null: "null" }, start: { date: "date", number: s, string: o, moment: "moment" }, template: { function: "function" }, groupTemplate: { function: "function" }, visibleFrameTemplate: { string: o, function: "function" }, showTooltips: { boolean: n }, tooltip: { followMouse: { boolean: n }, overflowMethod: { string: ["cap", "flip"] }, __type__: { object: r } }, tooltipOnItemUpdateTime: { template: { function: "function" }, __type__: { boolean: n, object: r } }, timeAxis: { scale: { string: o, undefined: "undefined" }, step: { number: s, undefined: "undefined" }, __type__: { object: r } }, type: { string: o }, width: { string: o, number: s }, zoomable: { boolean: n }, zoomKey: { string: ["ctrlKey", "altKey", "metaKey", ""] }, zoomMax: { number: s }, zoomMin: { number: s }, __type__: { object: r } },
        h = { global: { align: ["center", "left", "right"], direction: !1, autoResize: !0, clickToUse: !1, editable: { add: !1, remove: !1, updateGroup: !1, updateTime: !1 }, end: "", format: { minorLabels: { millisecond: "SSS", second: "s", minute: "HH:mm", hour: "HH:mm", weekday: "ddd D", day: "D", week: "w", month: "MMM", year: "YYYY" }, majorLabels: { millisecond: "HH:mm:ss", second: "D MMMM HH:mm", minute: "ddd D MMMM", hour: "ddd D MMMM", weekday: "MMMM YYYY", day: "MMMM YYYY", week: "MMMM YYYY", month: "YYYY", year: "" } }, groupsDraggable: !1, height: "", locale: "", margin: { axis: [20, 0, 100, 1], item: { horizontal: [10, 0, 100, 1], vertical: [10, 0, 100, 1] } }, max: "", maxHeight: "", maxMinorChars: [7, 0, 20, 1], min: "", minHeight: "", moveable: !1, multiselect: !1, multiselectPerGroup: !1, orientation: { axis: ["both", "bottom", "top"], item: ["bottom", "top"] }, selectable: !0, showCurrentTime: !1, showMajorLabels: !0, showMinorLabels: !0, stack: !0, stackSubgroups: !0, start: "", showTooltips: !0, tooltip: { followMouse: !1, overflowMethod: "flip" }, tooltipOnItemUpdateTime: !1, type: ["box", "point", "range", "background"], width: "100%", zoomable: !0, zoomKey: ["ctrlKey", "altKey", "metaKey", ""], zoomMax: [31536e10, 10, 31536e10, 1], zoomMin: [10, 10, 31536e10, 1] } };e.allOptions = a, e.configureOptions = h;
  }, function (t, e, i) {
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }Object.defineProperty(e, "__esModule", { value: !0 });var n = i(16),
        s = o(n),
        r = i(1),
        a = o(r),
        h = i(30),
        d = o(h),
        l = i(31),
        u = o(l),
        p = i(0),
        c = i(137).default,
        m = function () {
      function t(e, i, o) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;(0, d.default)(this, t), this.parent = e, this.changedOptions = [], this.container = i, this.allowCreation = !1, this.options = {}, this.initialized = !1, this.popupCounter = 0, this.defaultOptions = { enabled: !1, filter: !0, container: void 0, showButton: !0 }, p.extend(this.options, this.defaultOptions), this.configureOptions = o, this.moduleOptions = {}, this.domElements = [], this.popupDiv = {}, this.popupLimit = 5, this.popupHistory = {}, this.colorPicker = new c(n), this.wrapper = void 0;
      }return (0, u.default)(t, [{ key: "setOptions", value: function value(t) {
          if (void 0 !== t) {
            this.popupHistory = {}, this._removePopup();var e = !0;"string" == typeof t ? this.options.filter = t : t instanceof Array ? this.options.filter = t.join() : "object" === (void 0 === t ? "undefined" : (0, a.default)(t)) ? (void 0 !== t.container && (this.options.container = t.container), void 0 !== t.filter && (this.options.filter = t.filter), void 0 !== t.showButton && (this.options.showButton = t.showButton), void 0 !== t.enabled && (e = t.enabled)) : "boolean" == typeof t ? (this.options.filter = !0, e = t) : "function" == typeof t && (this.options.filter = t, e = !0), !1 === this.options.filter && (e = !1), this.options.enabled = e;
          }this._clean();
        } }, { key: "setModuleOptions", value: function value(t) {
          this.moduleOptions = t, !0 === this.options.enabled && (this._clean(), void 0 !== this.options.container && (this.container = this.options.container), this._create());
        } }, { key: "_create", value: function value() {
          var t = this;this._clean(), this.changedOptions = [];var e = this.options.filter,
              i = 0,
              o = !1;for (var n in this.configureOptions) {
            this.configureOptions.hasOwnProperty(n) && (this.allowCreation = !1, o = !1, "function" == typeof e ? (o = e(n, []), o = o || this._handleObject(this.configureOptions[n], [n], !0)) : !0 !== e && -1 === e.indexOf(n) || (o = !0), !1 !== o && (this.allowCreation = !0, i > 0 && this._makeItem([]), this._makeHeader(n), this._handleObject(this.configureOptions[n], [n])), i++);
          }if (!0 === this.options.showButton) {
            var s = document.createElement("div");s.className = "vis-configuration vis-config-button", s.innerHTML = "generate options", s.onclick = function () {
              t._printOptions();
            }, s.onmouseover = function () {
              s.className = "vis-configuration vis-config-button hover";
            }, s.onmouseout = function () {
              s.className = "vis-configuration vis-config-button";
            }, this.optionsContainer = document.createElement("div"), this.optionsContainer.className = "vis-configuration vis-config-option-container", this.domElements.push(this.optionsContainer), this.domElements.push(s);
          }this._push();
        } }, { key: "_push", value: function value() {
          this.wrapper = document.createElement("div"), this.wrapper.className = "vis-configuration-wrapper", this.container.appendChild(this.wrapper);for (var t = 0; t < this.domElements.length; t++) {
            this.wrapper.appendChild(this.domElements[t]);
          }this._showPopupIfNeeded();
        } }, { key: "_clean", value: function value() {
          for (var t = 0; t < this.domElements.length; t++) {
            this.wrapper.removeChild(this.domElements[t]);
          }void 0 !== this.wrapper && (this.container.removeChild(this.wrapper), this.wrapper = void 0), this.domElements = [], this._removePopup();
        } }, { key: "_getValue", value: function value(t) {
          for (var e = this.moduleOptions, i = 0; i < t.length; i++) {
            if (void 0 === e[t[i]]) {
              e = void 0;break;
            }e = e[t[i]];
          }return e;
        } }, { key: "_makeItem", value: function value(t) {
          if (!0 === this.allowCreation) {
            var e = document.createElement("div");e.className = "vis-configuration vis-config-item vis-config-s" + t.length;for (var i = arguments.length, o = Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++) {
              o[n - 1] = arguments[n];
            }return o.forEach(function (t) {
              e.appendChild(t);
            }), this.domElements.push(e), this.domElements.length;
          }return 0;
        } }, { key: "_makeHeader", value: function value(t) {
          var e = document.createElement("div");e.className = "vis-configuration vis-config-header", e.innerHTML = t, this._makeItem([], e);
        } }, { key: "_makeLabel", value: function value(t, e) {
          var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              o = document.createElement("div");return o.className = "vis-configuration vis-config-label vis-config-s" + e.length, o.innerHTML = !0 === i ? "<i><b>" + t + ":</b></i>" : t + ":", o;
        } }, { key: "_makeDropdown", value: function value(t, e, i) {
          var o = document.createElement("select");o.className = "vis-configuration vis-config-select";var n = 0;void 0 !== e && -1 !== t.indexOf(e) && (n = t.indexOf(e));for (var s = 0; s < t.length; s++) {
            var r = document.createElement("option");r.value = t[s], s === n && (r.selected = "selected"), r.innerHTML = t[s], o.appendChild(r);
          }var a = this;o.onchange = function () {
            a._update(this.value, i);
          };var h = this._makeLabel(i[i.length - 1], i);this._makeItem(i, h, o);
        } }, { key: "_makeRange", value: function value(t, e, i) {
          var o = t[0],
              n = t[1],
              s = t[2],
              r = t[3],
              a = document.createElement("input");a.className = "vis-configuration vis-config-range";try {
            a.type = "range", a.min = n, a.max = s;
          } catch (t) {}a.step = r;var h = "",
              d = 0;if (void 0 !== e) {
            e < 0 && 1.2 * e < n ? (a.min = Math.ceil(1.2 * e), d = a.min, h = "range increased") : e / 1.2 < n && (a.min = Math.ceil(e / 1.2), d = a.min, h = "range increased"), 1.2 * e > s && 1 !== s && (a.max = Math.ceil(1.2 * e), d = a.max, h = "range increased"), a.value = e;
          } else a.value = o;var l = document.createElement("input");l.className = "vis-configuration vis-config-rangeinput", l.value = a.value;var u = this;a.onchange = function () {
            l.value = this.value, u._update(Number(this.value), i);
          }, a.oninput = function () {
            l.value = this.value;
          };var p = this._makeLabel(i[i.length - 1], i),
              c = this._makeItem(i, p, a, l);"" !== h && this.popupHistory[c] !== d && (this.popupHistory[c] = d, this._setupPopup(h, c));
        } }, { key: "_setupPopup", value: function value(t, e) {
          var i = this;if (!0 === this.initialized && !0 === this.allowCreation && this.popupCounter < this.popupLimit) {
            var o = document.createElement("div");o.id = "vis-configuration-popup", o.className = "vis-configuration-popup", o.innerHTML = t, o.onclick = function () {
              i._removePopup();
            }, this.popupCounter += 1, this.popupDiv = { html: o, index: e };
          }
        } }, { key: "_removePopup", value: function value() {
          void 0 !== this.popupDiv.html && (this.popupDiv.html.parentNode.removeChild(this.popupDiv.html), clearTimeout(this.popupDiv.hideTimeout), clearTimeout(this.popupDiv.deleteTimeout), this.popupDiv = {});
        } }, { key: "_showPopupIfNeeded", value: function value() {
          var t = this;if (void 0 !== this.popupDiv.html) {
            var e = this.domElements[this.popupDiv.index],
                i = e.getBoundingClientRect();this.popupDiv.html.style.left = i.left + "px", this.popupDiv.html.style.top = i.top - 30 + "px", document.body.appendChild(this.popupDiv.html), this.popupDiv.hideTimeout = setTimeout(function () {
              t.popupDiv.html.style.opacity = 0;
            }, 1500), this.popupDiv.deleteTimeout = setTimeout(function () {
              t._removePopup();
            }, 1800);
          }
        } }, { key: "_makeCheckbox", value: function value(t, e, i) {
          var o = document.createElement("input");o.type = "checkbox", o.className = "vis-configuration vis-config-checkbox", o.checked = t, void 0 !== e && (o.checked = e, e !== t && ("object" === (void 0 === t ? "undefined" : (0, a.default)(t)) ? e !== t.enabled && this.changedOptions.push({ path: i, value: e }) : this.changedOptions.push({ path: i, value: e })));var n = this;o.onchange = function () {
            n._update(this.checked, i);
          };var s = this._makeLabel(i[i.length - 1], i);this._makeItem(i, s, o);
        } }, { key: "_makeTextInput", value: function value(t, e, i) {
          var o = document.createElement("input");o.type = "text", o.className = "vis-configuration vis-config-text", o.value = e, e !== t && this.changedOptions.push({ path: i, value: e });var n = this;o.onchange = function () {
            n._update(this.value, i);
          };var s = this._makeLabel(i[i.length - 1], i);this._makeItem(i, s, o);
        } }, { key: "_makeColorField", value: function value(t, e, i) {
          var o = this,
              n = t[1],
              s = document.createElement("div");e = void 0 === e ? n : e, "none" !== e ? (s.className = "vis-configuration vis-config-colorBlock", s.style.backgroundColor = e) : s.className = "vis-configuration vis-config-colorBlock none", e = void 0 === e ? n : e, s.onclick = function () {
            o._showColorPicker(e, s, i);
          };var r = this._makeLabel(i[i.length - 1], i);this._makeItem(i, r, s);
        } }, { key: "_showColorPicker", value: function value(t, e, i) {
          var o = this;e.onclick = function () {}, this.colorPicker.insertTo(e), this.colorPicker.show(), this.colorPicker.setColor(t), this.colorPicker.setUpdateCallback(function (t) {
            var n = "rgba(" + t.r + "," + t.g + "," + t.b + "," + t.a + ")";e.style.backgroundColor = n, o._update(n, i);
          }), this.colorPicker.setCloseCallback(function () {
            e.onclick = function () {
              o._showColorPicker(t, e, i);
            };
          });
        } }, { key: "_handleObject", value: function value(t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
              i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              o = !1,
              n = this.options.filter,
              s = !1;for (var r in t) {
            if (t.hasOwnProperty(r)) {
              o = !0;var a = t[r],
                  h = p.copyAndExtendArray(e, r);if ("function" == typeof n && !1 === (o = n(r, e)) && !(a instanceof Array) && "string" != typeof a && "boolean" != typeof a && a instanceof Object && (this.allowCreation = !1, o = this._handleObject(a, h, !0), this.allowCreation = !1 === i), !1 !== o) {
                s = !0;var d = this._getValue(h);if (a instanceof Array) this._handleArray(a, d, h);else if ("string" == typeof a) this._makeTextInput(a, d, h);else if ("boolean" == typeof a) this._makeCheckbox(a, d, h);else if (a instanceof Object) {
                  var l = !0;if (-1 !== e.indexOf("physics") && this.moduleOptions.physics.solver !== r && (l = !1), !0 === l) if (void 0 !== a.enabled) {
                    var u = p.copyAndExtendArray(h, "enabled"),
                        c = this._getValue(u);if (!0 === c) {
                      var m = this._makeLabel(r, h, !0);this._makeItem(h, m), s = this._handleObject(a, h) || s;
                    } else this._makeCheckbox(a, c, h);
                  } else {
                    var f = this._makeLabel(r, h, !0);this._makeItem(h, f), s = this._handleObject(a, h) || s;
                  }
                } else console.error("dont know how to handle", a, r, h);
              }
            }
          }return s;
        } }, { key: "_handleArray", value: function value(t, e, i) {
          "string" == typeof t[0] && "color" === t[0] ? (this._makeColorField(t, e, i), t[1] !== e && this.changedOptions.push({ path: i, value: e })) : "string" == typeof t[0] ? (this._makeDropdown(t, e, i), t[0] !== e && this.changedOptions.push({ path: i, value: e })) : "number" == typeof t[0] && (this._makeRange(t, e, i), t[0] !== e && this.changedOptions.push({ path: i, value: Number(e) }));
        } }, { key: "_update", value: function value(t, e) {
          var i = this._constructOptions(t, e);this.parent.body && this.parent.body.emitter && this.parent.body.emitter.emit && this.parent.body.emitter.emit("configChange", i), this.initialized = !0, this.parent.setOptions(i);
        } }, { key: "_constructOptions", value: function value(t, e) {
          var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
              o = i;t = "true" === t || t, t = "false" !== t && t;for (var n = 0; n < e.length; n++) {
            "global" !== e[n] && (void 0 === o[e[n]] && (o[e[n]] = {}), n !== e.length - 1 ? o = o[e[n]] : o[e[n]] = t);
          }return i;
        } }, { key: "_printOptions", value: function value() {
          var t = this.getOptions();this.optionsContainer.innerHTML = "<pre>var options = " + (0, s.default)(t, null, 2) + "</pre>";
        } }, { key: "getOptions", value: function value() {
          for (var t = {}, e = 0; e < this.changedOptions.length; e++) {
            this._constructOptions(this.changedOptions[e].value, this.changedOptions[e].path, t);
          }return t;
        } }]), t;
    }();e.default = m;
  }, function (t, e, i) {
    function o(t, e) {
      this.id = r.randomUUID(), this.body = t, this.defaultOptions = { yAxisOrientation: "left", defaultGroup: "default", sort: !0, sampling: !0, stack: !1, graphHeight: "400px", shaded: { enabled: !1, orientation: "bottom" }, style: "line", barChart: { width: 50, sideBySide: !1, align: "center" }, interpolation: { enabled: !0, parametrization: "centripetal", alpha: .5 }, drawPoints: { enabled: !0, size: 6, style: "square" }, dataAxis: {}, legend: {}, groups: { visibility: {} } }, this.options = r.extend({}, this.defaultOptions), this.dom = {}, this.props = {}, this.hammer = null, this.groups = {}, this.abortedGraphUpdate = !1, this.updateSVGheight = !1, this.updateSVGheightOnResize = !1, this.forceGraphUpdate = !0;var i = this;this.itemsData = null, this.groupsData = null, this.itemListeners = { add: function add(t, e, o) {
          i._onAdd(e.items);
        }, update: function update(t, e, o) {
          i._onUpdate(e.items);
        }, remove: function remove(t, e, o) {
          i._onRemove(e.items);
        } }, this.groupListeners = { add: function add(t, e, o) {
          i._onAddGroups(e.items);
        }, update: function update(t, e, o) {
          i._onUpdateGroups(e.items);
        }, remove: function remove(t, e, o) {
          i._onRemoveGroups(e.items);
        } }, this.items = {}, this.selection = [], this.lastStart = this.body.range.start, this.touchParams = {}, this.svgElements = {}, this.setOptions(e), this.groupsUsingDefaultStyles = [0], this.body.emitter.on("rangechanged", function () {
        i.lastStart = i.body.range.start, i.svg.style.left = r.option.asSize(-i.props.width), i.forceGraphUpdate = !0, i.redraw.call(i);
      }), this._create(), this.framework = { svg: this.svg, svgElements: this.svgElements, options: this.options, groups: this.groups };
    }var n = i(1),
        s = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(n),
        r = i(0),
        a = i(11),
        h = i(15),
        d = i(20),
        l = i(5),
        u = i(78),
        p = i(80),
        c = i(83),
        m = i(81),
        f = i(82),
        g = i(54);o.prototype = new l(), o.prototype._create = function () {
      var t = document.createElement("div");t.className = "vis-line-graph", this.dom.frame = t, this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svg.style.position = "relative", this.svg.style.height = ("" + this.options.graphHeight).replace("px", "") + "px", this.svg.style.display = "block", t.appendChild(this.svg), this.options.dataAxis.orientation = "left", this.yAxisLeft = new u(this.body, this.options.dataAxis, this.svg, this.options.groups), this.options.dataAxis.orientation = "right", this.yAxisRight = new u(this.body, this.options.dataAxis, this.svg, this.options.groups), delete this.options.dataAxis.orientation, this.legendLeft = new c(this.body, this.options.legend, "left", this.options.groups), this.legendRight = new c(this.body, this.options.legend, "right", this.options.groups), this.show();
    }, o.prototype.setOptions = function (t) {
      if (t) {
        var e = ["sampling", "defaultGroup", "stack", "height", "graphHeight", "yAxisOrientation", "style", "barChart", "dataAxis", "sort", "groups"];void 0 === t.graphHeight && void 0 !== t.height ? (this.updateSVGheight = !0, this.updateSVGheightOnResize = !0) : void 0 !== this.body.domProps.centerContainer.height && void 0 !== t.graphHeight && parseInt((t.graphHeight + "").replace("px", "")) < this.body.domProps.centerContainer.height && (this.updateSVGheight = !0), r.selectiveDeepExtend(e, this.options, t), r.mergeOptions(this.options, t, "interpolation"), r.mergeOptions(this.options, t, "drawPoints"), r.mergeOptions(this.options, t, "shaded"), r.mergeOptions(this.options, t, "legend"), t.interpolation && "object" == (0, s.default)(t.interpolation) && t.interpolation.parametrization && ("uniform" == t.interpolation.parametrization ? this.options.interpolation.alpha = 0 : "chordal" == t.interpolation.parametrization ? this.options.interpolation.alpha = 1 : (this.options.interpolation.parametrization = "centripetal", this.options.interpolation.alpha = .5)), this.yAxisLeft && void 0 !== t.dataAxis && (this.yAxisLeft.setOptions(this.options.dataAxis), this.yAxisRight.setOptions(this.options.dataAxis)), this.legendLeft && void 0 !== t.legend && (this.legendLeft.setOptions(this.options.legend), this.legendRight.setOptions(this.options.legend)), this.groups.hasOwnProperty("__ungrouped__") && this.groups.__ungrouped__.setOptions(t);
      }this.dom.frame && (this.forceGraphUpdate = !0, this.body.emitter.emit("_change", { queue: !0 }));
    }, o.prototype.hide = function () {
      this.dom.frame.parentNode && this.dom.frame.parentNode.removeChild(this.dom.frame);
    }, o.prototype.show = function () {
      this.dom.frame.parentNode || this.body.dom.center.appendChild(this.dom.frame);
    }, o.prototype.setItems = function (t) {
      var e,
          i = this,
          o = this.itemsData;if (t) {
        if (!(t instanceof h || t instanceof d)) throw new TypeError("Data must be an instance of DataSet or DataView");this.itemsData = t;
      } else this.itemsData = null;if (o && (r.forEach(this.itemListeners, function (t, e) {
        o.off(e, t);
      }), e = o.getIds(), this._onRemove(e)), this.itemsData) {
        var n = this.id;r.forEach(this.itemListeners, function (t, e) {
          i.itemsData.on(e, t, n);
        }), e = this.itemsData.getIds(), this._onAdd(e);
      }
    }, o.prototype.setGroups = function (t) {
      var e,
          i = this;if (this.groupsData) {
        r.forEach(this.groupListeners, function (t, e) {
          i.groupsData.off(e, t);
        }), e = this.groupsData.getIds(), this.groupsData = null;for (var o = 0; o < e.length; o++) {
          this._removeGroup(e[o]);
        }
      }if (t) {
        if (!(t instanceof h || t instanceof d)) throw new TypeError("Data must be an instance of DataSet or DataView");this.groupsData = t;
      } else this.groupsData = null;if (this.groupsData) {
        var n = this.id;r.forEach(this.groupListeners, function (t, e) {
          i.groupsData.on(e, t, n);
        }), e = this.groupsData.getIds(), this._onAddGroups(e);
      }
    }, o.prototype._onUpdate = function (t) {
      this._updateAllGroupData(t);
    }, o.prototype._onAdd = function (t) {
      this._onUpdate(t);
    }, o.prototype._onRemove = function (t) {
      this._onUpdate(t);
    }, o.prototype._onUpdateGroups = function (t) {
      this._updateAllGroupData(null, t);
    }, o.prototype._onAddGroups = function (t) {
      this._onUpdateGroups(t);
    }, o.prototype._onRemoveGroups = function (t) {
      for (var e = 0; e < t.length; e++) {
        this._removeGroup(t[e]);
      }this.forceGraphUpdate = !0, this.body.emitter.emit("_change", { queue: !0 });
    }, o.prototype._removeGroup = function (t) {
      this.groups.hasOwnProperty(t) && ("right" == this.groups[t].options.yAxisOrientation ? (this.yAxisRight.removeGroup(t), this.legendRight.removeGroup(t), this.legendRight.redraw()) : (this.yAxisLeft.removeGroup(t), this.legendLeft.removeGroup(t), this.legendLeft.redraw()), delete this.groups[t]);
    }, o.prototype._updateGroup = function (t, e) {
      this.groups.hasOwnProperty(e) ? (this.groups[e].update(t), "right" == this.groups[e].options.yAxisOrientation ? (this.yAxisRight.updateGroup(e, this.groups[e]), this.legendRight.updateGroup(e, this.groups[e]), this.yAxisLeft.removeGroup(e), this.legendLeft.removeGroup(e)) : (this.yAxisLeft.updateGroup(e, this.groups[e]), this.legendLeft.updateGroup(e, this.groups[e]), this.yAxisRight.removeGroup(e), this.legendRight.removeGroup(e))) : (this.groups[e] = new p(t, e, this.options, this.groupsUsingDefaultStyles), "right" == this.groups[e].options.yAxisOrientation ? (this.yAxisRight.addGroup(e, this.groups[e]), this.legendRight.addGroup(e, this.groups[e])) : (this.yAxisLeft.addGroup(e, this.groups[e]), this.legendLeft.addGroup(e, this.groups[e]))), this.legendLeft.redraw(), this.legendRight.redraw();
    }, o.prototype._updateAllGroupData = function (t, e) {
      if (null != this.itemsData) {
        var i = {},
            o = this.itemsData.get(),
            n = this.itemsData._fieldId,
            s = {};t && t.map(function (t) {
          s[t] = t;
        });for (var a = {}, h = 0; h < o.length; h++) {
          var d = o[h],
              l = d.group;null !== l && void 0 !== l || (l = "__ungrouped__"), a.hasOwnProperty(l) ? a[l]++ : a[l] = 1;
        }var u = {};if (!e && t) for (l in this.groups) {
          if (this.groups.hasOwnProperty(l)) {
            g = this.groups[l];var p = g.getItems();i[l] = p.filter(function (t) {
              return u[t[n]] = t[n], t[n] !== s[t[n]];
            });var c = a[l];a[l] -= i[l].length, i[l].length < c && (i[l][c - 1] = {});
          }
        }for (h = 0; h < o.length; h++) {
          if (d = o[h], l = d.group, null !== l && void 0 !== l || (l = "__ungrouped__"), e || !t || d[n] === s[d[n]] || !u.hasOwnProperty(d[n])) {
            i.hasOwnProperty(l) || (i[l] = new Array(a[l]));var m = r.bridgeObject(d);m.x = r.convert(d.x, "Date"), m.end = r.convert(d.end, "Date"), m.orginalY = d.y, m.y = Number(d.y), m[n] = d[n];var f = i[l].length - a[l]--;i[l][f] = m;
          }
        }for (l in this.groups) {
          this.groups.hasOwnProperty(l) && (i.hasOwnProperty(l) || (i[l] = new Array(0)));
        }for (l in i) {
          if (i.hasOwnProperty(l)) if (0 == i[l].length) this.groups.hasOwnProperty(l) && this._removeGroup(l);else {
            var g = void 0;void 0 != this.groupsData && (g = this.groupsData.get(l)), void 0 == g && (g = { id: l, content: this.options.defaultGroup + l }), this._updateGroup(g, l), this.groups[l].setItems(i[l]);
          }
        }this.forceGraphUpdate = !0, this.body.emitter.emit("_change", { queue: !0 });
      }
    }, o.prototype.redraw = function () {
      var t = !1;this.props.width = this.dom.frame.offsetWidth, this.props.height = this.body.domProps.centerContainer.height - this.body.domProps.border.top - this.body.domProps.border.bottom, t = this._isResized() || t;var e = this.body.range.end - this.body.range.start,
          i = e != this.lastVisibleInterval;if (this.lastVisibleInterval = e, 1 == t && (this.svg.style.width = r.option.asSize(3 * this.props.width), this.svg.style.left = r.option.asSize(-this.props.width), -1 == (this.options.height + "").indexOf("%") && 1 != this.updateSVGheightOnResize || (this.updateSVGheight = !0)), 1 == this.updateSVGheight ? (this.options.graphHeight != this.props.height + "px" && (this.options.graphHeight = this.props.height + "px", this.svg.style.height = this.props.height + "px"), this.updateSVGheight = !1) : this.svg.style.height = ("" + this.options.graphHeight).replace("px", "") + "px", 1 == t || 1 == i || 1 == this.abortedGraphUpdate || 1 == this.forceGraphUpdate) t = this._updateGraph() || t, this.forceGraphUpdate = !1;else if (0 != this.lastStart) {
        var o = this.body.range.start - this.lastStart,
            n = this.body.range.end - this.body.range.start;if (0 != this.props.width) {
          var s = this.props.width / n,
              a = o * s;this.svg.style.left = -this.props.width - a + "px";
        }
      }return this.legendLeft.redraw(), this.legendRight.redraw(), t;
    }, o.prototype._getSortedGroupIds = function () {
      var t = [];for (var e in this.groups) {
        if (this.groups.hasOwnProperty(e)) {
          var i = this.groups[e];1 != i.visible || void 0 !== this.options.groups.visibility[e] && 1 != this.options.groups.visibility[e] || t.push({ id: e, zIndex: i.options.zIndex });
        }
      }r.insertSort(t, function (t, e) {
        var i = t.zIndex,
            o = e.zIndex;return void 0 === i && (i = 0), void 0 === o && (o = 0), i == o ? 0 : i < o ? -1 : 1;
      });for (var o = new Array(t.length), n = 0; n < t.length; n++) {
        o[n] = t[n].id;
      }return o;
    }, o.prototype._updateGraph = function () {
      if (a.prepareElements(this.svgElements), 0 != this.props.width && null != this.itemsData) {
        var t,
            e,
            i = {},
            o = this.body.util.toGlobalTime(-this.body.domProps.root.width),
            n = this.body.util.toGlobalTime(2 * this.body.domProps.root.width),
            s = this._getSortedGroupIds();if (s.length > 0) {
          var r = {};for (this._getRelevantData(s, r, o, n), this._applySampling(s, r), e = 0; e < s.length; e++) {
            this._convertXcoordinates(r[s[e]]);
          }if (this._getYRanges(s, r, i), 1 == this._updateYAxis(s, i)) return a.cleanupElements(this.svgElements), this.abortedGraphUpdate = !0, !0;this.abortedGraphUpdate = !1;var h = void 0;for (e = 0; e < s.length; e++) {
            t = this.groups[s[e]], !0 === this.options.stack && "line" === this.options.style && (void 0 != t.options.excludeFromStacking && t.options.excludeFromStacking || (void 0 != h && (this._stack(r[t.id], r[h.id]), 1 == t.options.shaded.enabled && "group" !== t.options.shaded.orientation && ("top" == t.options.shaded.orientation && "group" !== h.options.shaded.orientation ? (h.options.shaded.orientation = "group", h.options.shaded.groupId = t.id) : (t.options.shaded.orientation = "group", t.options.shaded.groupId = h.id))), h = t)), this._convertYcoordinates(r[s[e]], t);
          }var d = {};for (e = 0; e < s.length; e++) {
            if (t = this.groups[s[e]], "line" === t.options.style && 1 == t.options.shaded.enabled) {
              var l = r[s[e]];if (null == l || 0 == l.length) continue;if (d.hasOwnProperty(s[e]) || (d[s[e]] = f.calcPath(l, t)), "group" === t.options.shaded.orientation) {
                var u = t.options.shaded.groupId;if (-1 === s.indexOf(u)) {
                  console.log(t.id + ": Unknown shading group target given:" + u);continue;
                }d.hasOwnProperty(u) || (d[u] = f.calcPath(r[u], this.groups[u])), f.drawShading(d[s[e]], t, d[u], this.framework);
              } else f.drawShading(d[s[e]], t, void 0, this.framework);
            }
          }for (m.draw(s, r, this.framework), e = 0; e < s.length; e++) {
            if (t = this.groups[s[e]], r[s[e]].length > 0) switch (t.options.style) {case "line":
                d.hasOwnProperty(s[e]) || (d[s[e]] = f.calcPath(r[s[e]], t)), f.draw(d[s[e]], t, this.framework);case "point":case "points":
                "point" != t.options.style && "points" != t.options.style && 1 != t.options.drawPoints.enabled || g.draw(r[s[e]], t, this.framework);}
          }
        }
      }return a.cleanupElements(this.svgElements), !1;
    }, o.prototype._stack = function (t, e) {
      var i, o, n, s, r;i = 0;for (var a = 0; a < t.length; a++) {
        s = void 0, r = void 0;for (var h = i; h < e.length; h++) {
          if (e[h].x === t[a].x) {
            s = e[h], r = e[h], i = h;break;
          }if (e[h].x > t[a].x) {
            r = e[h], s = 0 == h ? r : e[h - 1], i = h;break;
          }
        }void 0 === r && (s = e[e.length - 1], r = e[e.length - 1]), o = r.x - s.x, n = r.y - s.y, t[a].y = 0 == o ? t[a].orginalY + r.y : t[a].orginalY + n / o * (t[a].x - s.x) + s.y;
      }
    }, o.prototype._getRelevantData = function (t, e, i, o) {
      var n, s, a, h;if (t.length > 0) for (s = 0; s < t.length; s++) {
        n = this.groups[t[s]];var d = n.getItems();if (1 == n.options.sort) {
          var l = function l(t, e) {
            return t.getTime() == e.getTime() ? 0 : t < e ? -1 : 1;
          },
              u = Math.max(0, r.binarySearchValue(d, i, "x", "before", l)),
              p = Math.min(d.length, r.binarySearchValue(d, o, "x", "after", l) + 1);p <= 0 && (p = d.length);var c = new Array(p - u);for (a = u; a < p; a++) {
            h = n.itemsData[a], c[a - u] = h;
          }e[t[s]] = c;
        } else e[t[s]] = n.itemsData;
      }
    }, o.prototype._applySampling = function (t, e) {
      var i;if (t.length > 0) for (var o = 0; o < t.length; o++) {
        if (i = this.groups[t[o]], 1 == i.options.sampling) {
          var n = e[t[o]];if (n.length > 0) {
            var s = 1,
                r = n.length,
                a = this.body.util.toGlobalScreen(n[n.length - 1].x) - this.body.util.toGlobalScreen(n[0].x),
                h = r / a;s = Math.min(Math.ceil(.2 * r), Math.max(1, Math.round(h)));for (var d = new Array(r), l = 0; l < r; l += s) {
              var u = Math.round(l / s);d[u] = n[l];
            }e[t[o]] = d.splice(0, Math.round(r / s));
          }
        }
      }
    }, o.prototype._getYRanges = function (t, e, i) {
      var o,
          n,
          s,
          r,
          a = [],
          h = [];if (t.length > 0) {
        for (s = 0; s < t.length; s++) {
          o = e[t[s]], r = this.groups[t[s]].options, o.length > 0 && (n = this.groups[t[s]], !0 === r.stack && "bar" === r.style ? "left" === r.yAxisOrientation ? a = a.concat(o) : h = h.concat(o) : i[t[s]] = n.getYRange(o, t[s]));
        }m.getStackedYRange(a, i, t, "__barStackLeft", "left"), m.getStackedYRange(h, i, t, "__barStackRight", "right");
      }
    }, o.prototype._updateYAxis = function (t, e) {
      var i,
          o,
          n = !1,
          s = !1,
          r = !1,
          a = 1e9,
          h = 1e9,
          d = -1e9,
          l = -1e9;if (t.length > 0) {
        for (var u = 0; u < t.length; u++) {
          var p = this.groups[t[u]];p && "right" != p.options.yAxisOrientation ? (s = !0, a = 1e9, d = -1e9) : p && p.options.yAxisOrientation && (r = !0, h = 1e9, l = -1e9);
        }for (u = 0; u < t.length; u++) {
          e.hasOwnProperty(t[u]) && !0 !== e[t[u]].ignore && (i = e[t[u]].min, o = e[t[u]].max, "right" != e[t[u]].yAxisOrientation ? (s = !0, a = a > i ? i : a, d = d < o ? o : d) : (r = !0, h = h > i ? i : h, l = l < o ? o : l));
        }1 == s && this.yAxisLeft.setRange(a, d), 1 == r && this.yAxisRight.setRange(h, l);
      }n = this._toggleAxisVisiblity(s, this.yAxisLeft) || n, n = this._toggleAxisVisiblity(r, this.yAxisRight) || n, 1 == r && 1 == s ? (this.yAxisLeft.drawIcons = !0, this.yAxisRight.drawIcons = !0) : (this.yAxisLeft.drawIcons = !1, this.yAxisRight.drawIcons = !1), this.yAxisRight.master = !s, this.yAxisRight.masterAxis = this.yAxisLeft, 0 == this.yAxisRight.master ? (this.yAxisLeft.lineOffset = 1 == r ? this.yAxisRight.width : 0, n = this.yAxisLeft.redraw() || n, n = this.yAxisRight.redraw() || n) : n = this.yAxisRight.redraw() || n;var c = ["__barStackLeft", "__barStackRight", "__lineStackLeft", "__lineStackRight"];for (u = 0; u < c.length; u++) {
        -1 != t.indexOf(c[u]) && t.splice(t.indexOf(c[u]), 1);
      }return n;
    }, o.prototype._toggleAxisVisiblity = function (t, e) {
      var i = !1;return 0 == t ? e.dom.frame.parentNode && 0 == e.hidden && (e.hide(), i = !0) : e.dom.frame.parentNode || 1 != e.hidden || (e.show(), i = !0), i;
    }, o.prototype._convertXcoordinates = function (t) {
      for (var e = this.body.util.toScreen, i = 0; i < t.length; i++) {
        t[i].screen_x = e(t[i].x) + this.props.width, t[i].screen_y = t[i].y, void 0 != t[i].end ? t[i].screen_end = e(t[i].end) + this.props.width : t[i].screen_end = void 0;
      }
    }, o.prototype._convertYcoordinates = function (t, e) {
      var i = this.yAxisLeft,
          o = Number(this.svg.style.height.replace("px", ""));"right" == e.options.yAxisOrientation && (i = this.yAxisRight);for (var n = 0; n < t.length; n++) {
        t[n].screen_y = Math.round(i.convertValue(t[n].y));
      }e.setZeroPosition(Math.min(o, i.convertValue(0)));
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e, i, o) {
      this.id = r.randomUUID(), this.body = t, this.defaultOptions = { orientation: "left", showMinorLabels: !0, showMajorLabels: !0, icons: !1, majorLinesOffset: 7, minorLinesOffset: 4, labelOffsetX: 10, labelOffsetY: 2, iconWidth: 20, width: "40px", visible: !0, alignZeros: !0, left: { range: { min: void 0, max: void 0 }, format: function format(t) {
            return "" + parseFloat(t.toPrecision(3));
          }, title: { text: void 0, style: void 0 } }, right: { range: { min: void 0, max: void 0 }, format: function format(t) {
            return "" + parseFloat(t.toPrecision(3));
          }, title: { text: void 0, style: void 0 } } }, this.linegraphOptions = o, this.linegraphSVG = i, this.props = {}, this.DOMelements = { lines: {}, labels: {}, title: {} }, this.dom = {}, this.scale = void 0, this.range = { start: 0, end: 0 }, this.options = r.extend({}, this.defaultOptions), this.conversionFactor = 1, this.setOptions(e), this.width = Number(("" + this.options.width).replace("px", "")), this.minWidth = this.width, this.height = this.linegraphSVG.getBoundingClientRect().height, this.hidden = !1, this.stepPixels = 25, this.zeroCrossing = -1, this.amountOfSteps = -1, this.lineOffset = 0, this.master = !0, this.masterAxis = null, this.svgElements = {}, this.iconsRemoved = !1, this.groups = {}, this.amountOfGroups = 0, this._create(), this.framework = { svg: this.svg, svgElements: this.svgElements, options: this.options, groups: this.groups };var n = this;this.body.emitter.on("verticalDrag", function () {
        n.dom.lineContainer.style.top = n.body.domProps.scrollTop + "px";
      });
    }var n = i(4),
        s = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(n),
        r = i(0),
        a = i(11),
        h = i(5),
        d = i(79);o.prototype = new h(), o.prototype.addGroup = function (t, e) {
      this.groups.hasOwnProperty(t) || (this.groups[t] = e), this.amountOfGroups += 1;
    }, o.prototype.updateGroup = function (t, e) {
      this.groups.hasOwnProperty(t) || (this.amountOfGroups += 1), this.groups[t] = e;
    }, o.prototype.removeGroup = function (t) {
      this.groups.hasOwnProperty(t) && (delete this.groups[t], this.amountOfGroups -= 1);
    }, o.prototype.setOptions = function (t) {
      if (t) {
        var e = !1;this.options.orientation != t.orientation && void 0 !== t.orientation && (e = !0);var i = ["orientation", "showMinorLabels", "showMajorLabels", "icons", "majorLinesOffset", "minorLinesOffset", "labelOffsetX", "labelOffsetY", "iconWidth", "width", "visible", "left", "right", "alignZeros"];r.selectiveDeepExtend(i, this.options, t), this.minWidth = Number(("" + this.options.width).replace("px", "")), !0 === e && this.dom.frame && (this.hide(), this.show());
      }
    }, o.prototype._create = function () {
      this.dom.frame = document.createElement("div"), this.dom.frame.style.width = this.options.width, this.dom.frame.style.height = this.height, this.dom.lineContainer = document.createElement("div"), this.dom.lineContainer.style.width = "100%", this.dom.lineContainer.style.height = this.height, this.dom.lineContainer.style.position = "relative", this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svg.style.position = "absolute", this.svg.style.top = "0px", this.svg.style.height = "100%", this.svg.style.width = "100%", this.svg.style.display = "block", this.dom.frame.appendChild(this.svg);
    }, o.prototype._redrawGroupIcons = function () {
      a.prepareElements(this.svgElements);var t,
          e = this.options.iconWidth,
          i = 11.5;t = "left" === this.options.orientation ? 4 : this.width - e - 4;var o = (0, s.default)(this.groups);o.sort(function (t, e) {
        return t < e ? -1 : 1;
      });for (var n = 0; n < o.length; n++) {
        var r = o[n];!0 !== this.groups[r].visible || void 0 !== this.linegraphOptions.visibility[r] && !0 !== this.linegraphOptions.visibility[r] || (this.groups[r].getLegend(e, 15, this.framework, t, i), i += 19);
      }a.cleanupElements(this.svgElements), this.iconsRemoved = !1;
    }, o.prototype._cleanupIcons = function () {
      !1 === this.iconsRemoved && (a.prepareElements(this.svgElements), a.cleanupElements(this.svgElements), this.iconsRemoved = !0);
    }, o.prototype.show = function () {
      this.hidden = !1, this.dom.frame.parentNode || ("left" === this.options.orientation ? this.body.dom.left.appendChild(this.dom.frame) : this.body.dom.right.appendChild(this.dom.frame)), this.dom.lineContainer.parentNode || this.body.dom.backgroundHorizontal.appendChild(this.dom.lineContainer);
    }, o.prototype.hide = function () {
      this.hidden = !0, this.dom.frame.parentNode && this.dom.frame.parentNode.removeChild(this.dom.frame), this.dom.lineContainer.parentNode && this.dom.lineContainer.parentNode.removeChild(this.dom.lineContainer);
    }, o.prototype.setRange = function (t, e) {
      this.range.start = t, this.range.end = e;
    }, o.prototype.redraw = function () {
      var t = !1,
          e = 0;this.dom.lineContainer.style.top = this.body.domProps.scrollTop + "px";for (var i in this.groups) {
        this.groups.hasOwnProperty(i) && (!0 !== this.groups[i].visible || void 0 !== this.linegraphOptions.visibility[i] && !0 !== this.linegraphOptions.visibility[i] || e++);
      }if (0 === this.amountOfGroups || 0 === e) this.hide();else {
        this.show(), this.height = Number(this.linegraphSVG.style.height.replace("px", "")), this.dom.lineContainer.style.height = this.height + "px", this.width = !0 === this.options.visible ? Number(("" + this.options.width).replace("px", "")) : 0;var o = this.props,
            n = this.dom.frame;n.className = "vis-data-axis", this._calculateCharSize();var s = this.options.orientation,
            r = this.options.showMinorLabels,
            a = this.options.showMajorLabels;o.minorLabelHeight = r ? o.minorCharHeight : 0, o.majorLabelHeight = a ? o.majorCharHeight : 0, o.minorLineWidth = this.body.dom.backgroundHorizontal.offsetWidth - this.lineOffset - this.width + 2 * this.options.minorLinesOffset, o.minorLineHeight = 1, o.majorLineWidth = this.body.dom.backgroundHorizontal.offsetWidth - this.lineOffset - this.width + 2 * this.options.majorLinesOffset, o.majorLineHeight = 1, "left" === s ? (n.style.top = "0", n.style.left = "0", n.style.bottom = "", n.style.width = this.width + "px", n.style.height = this.height + "px", this.props.width = this.body.domProps.left.width, this.props.height = this.body.domProps.left.height) : (n.style.top = "", n.style.bottom = "0", n.style.left = "0", n.style.width = this.width + "px", n.style.height = this.height + "px", this.props.width = this.body.domProps.right.width, this.props.height = this.body.domProps.right.height), t = this._redrawLabels(), t = this._isResized() || t, !0 === this.options.icons ? this._redrawGroupIcons() : this._cleanupIcons(), this._redrawTitle(s);
      }return t;
    }, o.prototype._redrawLabels = function () {
      var t = this,
          e = !1;a.prepareElements(this.DOMelements.lines), a.prepareElements(this.DOMelements.labels);var i = this.options.orientation,
          o = void 0 != this.options[i].range ? this.options[i].range : {},
          n = !0;void 0 != o.max && (this.range.end = o.max, n = !1);var s = !0;void 0 != o.min && (this.range.start = o.min, s = !1), this.scale = new d(this.range.start, this.range.end, s, n, this.dom.frame.offsetHeight, this.props.majorCharHeight, this.options.alignZeros, this.options[i].format), !1 === this.master && void 0 != this.masterAxis && this.scale.followScale(this.masterAxis.scale), this.maxLabelSize = 0, this.scale.getLines().forEach(function (e) {
        var o = e.y,
            n = e.major;t.options.showMinorLabels && !1 === n && t._redrawLabel(o - 2, e.val, i, "vis-y-axis vis-minor", t.props.minorCharHeight), n && o >= 0 && t._redrawLabel(o - 2, e.val, i, "vis-y-axis vis-major", t.props.majorCharHeight), !0 === t.master && (n ? t._redrawLine(o, i, "vis-grid vis-horizontal vis-major", t.options.majorLinesOffset, t.props.majorLineWidth) : t._redrawLine(o, i, "vis-grid vis-horizontal vis-minor", t.options.minorLinesOffset, t.props.minorLineWidth));
      });var r = 0;void 0 !== this.options[i].title && void 0 !== this.options[i].title.text && (r = this.props.titleCharHeight);var h = !0 === this.options.icons ? Math.max(this.options.iconWidth, r) + this.options.labelOffsetX + 15 : r + this.options.labelOffsetX + 15;return this.maxLabelSize > this.width - h && !0 === this.options.visible ? (this.width = this.maxLabelSize + h, this.options.width = this.width + "px", a.cleanupElements(this.DOMelements.lines), a.cleanupElements(this.DOMelements.labels), this.redraw(), e = !0) : this.maxLabelSize < this.width - h && !0 === this.options.visible && this.width > this.minWidth ? (this.width = Math.max(this.minWidth, this.maxLabelSize + h), this.options.width = this.width + "px", a.cleanupElements(this.DOMelements.lines), a.cleanupElements(this.DOMelements.labels), this.redraw(), e = !0) : (a.cleanupElements(this.DOMelements.lines), a.cleanupElements(this.DOMelements.labels), e = !1), e;
    }, o.prototype.convertValue = function (t) {
      return this.scale.convertValue(t);
    }, o.prototype.screenToValue = function (t) {
      return this.scale.screenToValue(t);
    }, o.prototype._redrawLabel = function (t, e, i, o, n) {
      var s = a.getDOMElement("div", this.DOMelements.labels, this.dom.frame);s.className = o, s.innerHTML = e, "left" === i ? (s.style.left = "-" + this.options.labelOffsetX + "px", s.style.textAlign = "right") : (s.style.right = "-" + this.options.labelOffsetX + "px", s.style.textAlign = "left"), s.style.top = t - .5 * n + this.options.labelOffsetY + "px", e += "";var r = Math.max(this.props.majorCharWidth, this.props.minorCharWidth);this.maxLabelSize < e.length * r && (this.maxLabelSize = e.length * r);
    }, o.prototype._redrawLine = function (t, e, i, o, n) {
      if (!0 === this.master) {
        var s = a.getDOMElement("div", this.DOMelements.lines, this.dom.lineContainer);s.className = i, s.innerHTML = "", "left" === e ? s.style.left = this.width - o + "px" : s.style.right = this.width - o + "px", s.style.width = n + "px", s.style.top = t + "px";
      }
    }, o.prototype._redrawTitle = function (t) {
      if (a.prepareElements(this.DOMelements.title), void 0 !== this.options[t].title && void 0 !== this.options[t].title.text) {
        var e = a.getDOMElement("div", this.DOMelements.title, this.dom.frame);e.className = "vis-y-axis vis-title vis-" + t, e.innerHTML = this.options[t].title.text, void 0 !== this.options[t].title.style && r.addCssText(e, this.options[t].title.style), "left" === t ? e.style.left = this.props.titleCharHeight + "px" : e.style.right = this.props.titleCharHeight + "px", e.style.width = this.height + "px";
      }a.cleanupElements(this.DOMelements.title);
    }, o.prototype._calculateCharSize = function () {
      if (!("minorCharHeight" in this.props)) {
        var t = document.createTextNode("0"),
            e = document.createElement("div");e.className = "vis-y-axis vis-minor vis-measure", e.appendChild(t), this.dom.frame.appendChild(e), this.props.minorCharHeight = e.clientHeight, this.props.minorCharWidth = e.clientWidth, this.dom.frame.removeChild(e);
      }if (!("majorCharHeight" in this.props)) {
        var i = document.createTextNode("0"),
            o = document.createElement("div");o.className = "vis-y-axis vis-major vis-measure", o.appendChild(i), this.dom.frame.appendChild(o), this.props.majorCharHeight = o.clientHeight, this.props.majorCharWidth = o.clientWidth, this.dom.frame.removeChild(o);
      }if (!("titleCharHeight" in this.props)) {
        var n = document.createTextNode("0"),
            s = document.createElement("div");s.className = "vis-y-axis vis-title vis-measure", s.appendChild(n), this.dom.frame.appendChild(s), this.props.titleCharHeight = s.clientHeight, this.props.titleCharWidth = s.clientWidth, this.dom.frame.removeChild(s);
      }
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e, i, o, n, s) {
      var r = arguments.length > 6 && void 0 !== arguments[6] && arguments[6],
          a = arguments.length > 7 && void 0 !== arguments[7] && arguments[7];if (this.majorSteps = [1, 2, 5, 10], this.minorSteps = [.25, .5, 1, 2], this.customLines = null, this.containerHeight = n, this.majorCharHeight = s, this._start = t, this._end = e, this.scale = 1, this.minorStepIdx = -1, this.magnitudefactor = 1, this.determineScale(), this.zeroAlign = r, this.autoScaleStart = i, this.autoScaleEnd = o, this.formattingFunction = a, i || o) {
        var h = this,
            d = function d(t) {
          var e = t - t % (h.magnitudefactor * h.minorSteps[h.minorStepIdx]);return t % (h.magnitudefactor * h.minorSteps[h.minorStepIdx]) > h.magnitudefactor * h.minorSteps[h.minorStepIdx] * .5 ? e + h.magnitudefactor * h.minorSteps[h.minorStepIdx] : e;
        };i && (this._start -= 2 * this.magnitudefactor * this.minorSteps[this.minorStepIdx], this._start = d(this._start)), o && (this._end += this.magnitudefactor * this.minorSteps[this.minorStepIdx], this._end = d(this._end)), this.determineScale();
      }
    }o.prototype.setCharHeight = function (t) {
      this.majorCharHeight = t;
    }, o.prototype.setHeight = function (t) {
      this.containerHeight = t;
    }, o.prototype.determineScale = function () {
      var t = this._end - this._start;this.scale = this.containerHeight / t;var e = this.majorCharHeight / this.scale,
          i = t > 0 ? Math.round(Math.log(t) / Math.LN10) : 0;this.minorStepIdx = -1, this.magnitudefactor = Math.pow(10, i);var o = 0;i < 0 && (o = i);for (var n = !1, s = o; Math.abs(s) <= Math.abs(i); s++) {
        this.magnitudefactor = Math.pow(10, s);for (var r = 0; r < this.minorSteps.length; r++) {
          if (this.magnitudefactor * this.minorSteps[r] >= e) {
            n = !0, this.minorStepIdx = r;break;
          }
        }if (!0 === n) break;
      }
    }, o.prototype.is_major = function (t) {
      return t % (this.magnitudefactor * this.majorSteps[this.minorStepIdx]) == 0;
    }, o.prototype.getStep = function () {
      return this.magnitudefactor * this.minorSteps[this.minorStepIdx];
    }, o.prototype.getFirstMajor = function () {
      var t = this.magnitudefactor * this.majorSteps[this.minorStepIdx];return this.convertValue(this._start + (t - this._start % t) % t);
    }, o.prototype.formatValue = function (t) {
      var e = t.toPrecision(5);return "function" == typeof this.formattingFunction && (e = this.formattingFunction(t)), "number" == typeof e ? "" + e : "string" == typeof e ? e : t.toPrecision(5);
    }, o.prototype.getLines = function () {
      for (var t = [], e = this.getStep(), i = (e - this._start % e) % e, o = this._start + i; this._end - o > 1e-5; o += e) {
        o != this._start && t.push({ major: this.is_major(o), y: this.convertValue(o), val: this.formatValue(o) });
      }return t;
    }, o.prototype.followScale = function (t) {
      var e = this.minorStepIdx,
          i = this._start,
          o = this._end,
          n = this,
          s = function s() {
        n.magnitudefactor *= 2;
      },
          r = function r() {
        n.magnitudefactor /= 2;
      };t.minorStepIdx <= 1 && this.minorStepIdx <= 1 || t.minorStepIdx > 1 && this.minorStepIdx > 1 || (t.minorStepIdx < this.minorStepIdx ? (this.minorStepIdx = 1, 2 == e ? s() : (s(), s())) : (this.minorStepIdx = 2, 1 == e ? r() : (r(), r())));for (var a = t.convertValue(0), h = t.getStep() * t.scale, d = !1, l = 0; !d && l++ < 5;) {
        this.scale = h / (this.minorSteps[this.minorStepIdx] * this.magnitudefactor);var u = this.containerHeight / this.scale;this._start = i, this._end = this._start + u;var p = this._end * this.scale,
            c = this.magnitudefactor * this.majorSteps[this.minorStepIdx],
            m = this.getFirstMajor() - t.getFirstMajor();if (this.zeroAlign) {
          var f = a - p;this._end += f / this.scale, this._start = this._end - u;
        } else this.autoScaleStart ? (this._start -= m / this.scale, this._end = this._start + u) : (this._start += c - m / this.scale, this._end = this._start + u);if (!this.autoScaleEnd && this._end > o + 1e-5) r(), d = !1;else {
          if (!this.autoScaleStart && this._start < i - 1e-5) {
            if (!(this.zeroAlign && i >= 0)) {
              r(), d = !1;continue;
            }console.warn("Can't adhere to given 'min' range, due to zeroalign");
          }this.autoScaleStart && this.autoScaleEnd && u < o - i ? (s(), d = !1) : d = !0;
        }
      }
    }, o.prototype.convertValue = function (t) {
      return this.containerHeight - (t - this._start) * this.scale;
    }, o.prototype.screenToValue = function (t) {
      return (this.containerHeight - t) / this.scale + this._start;
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e, i, o) {
      this.id = e;var n = ["sampling", "style", "sort", "yAxisOrientation", "barChart", "drawPoints", "shaded", "interpolation", "zIndex", "excludeFromStacking", "excludeFromLegend"];this.options = r.selectiveBridgeObject(n, i), this.usingDefaultStyle = void 0 === t.className, this.groupsUsingDefaultStyles = o, this.zeroPosition = 0, this.update(t), 1 == this.usingDefaultStyle && (this.groupsUsingDefaultStyles[0] += 1), this.itemsData = [], this.visible = void 0 === t.visible || t.visible;
    }var n = i(1),
        s = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(n),
        r = i(0),
        a = i(81),
        h = i(82),
        d = i(54);o.prototype.setItems = function (t) {
      null != t ? (this.itemsData = t, 1 == this.options.sort && r.insertSort(this.itemsData, function (t, e) {
        return t.x > e.x ? 1 : -1;
      })) : this.itemsData = [];
    }, o.prototype.getItems = function () {
      return this.itemsData;
    }, o.prototype.setZeroPosition = function (t) {
      this.zeroPosition = t;
    }, o.prototype.setOptions = function (t) {
      if (void 0 !== t) {
        var e = ["sampling", "style", "sort", "yAxisOrientation", "barChart", "zIndex", "excludeFromStacking", "excludeFromLegend"];r.selectiveDeepExtend(e, this.options, t), "function" == typeof t.drawPoints && (t.drawPoints = { onRender: t.drawPoints }), r.mergeOptions(this.options, t, "interpolation"), r.mergeOptions(this.options, t, "drawPoints"), r.mergeOptions(this.options, t, "shaded"), t.interpolation && "object" == (0, s.default)(t.interpolation) && t.interpolation.parametrization && ("uniform" == t.interpolation.parametrization ? this.options.interpolation.alpha = 0 : "chordal" == t.interpolation.parametrization ? this.options.interpolation.alpha = 1 : (this.options.interpolation.parametrization = "centripetal", this.options.interpolation.alpha = .5));
      }
    }, o.prototype.update = function (t) {
      this.group = t, this.content = t.content || "graph", this.className = t.className || this.className || "vis-graph-group" + this.groupsUsingDefaultStyles[0] % 10, this.visible = void 0 === t.visible || t.visible, this.style = t.style, this.setOptions(t.options);
    }, o.prototype.getLegend = function (t, e, i, o, n) {
      if (void 0 == i || null == i) {
        i = { svg: document.createElementNS("http://www.w3.org/2000/svg", "svg"), svgElements: {}, options: this.options, groups: [this] };
      }switch (void 0 != o && null != o || (o = 0), void 0 != n && null != n || (n = .5 * e), this.options.style) {case "line":
          h.drawIcon(this, o, n, t, e, i);break;case "points":case "point":
          d.drawIcon(this, o, n, t, e, i);break;case "bar":
          a.drawIcon(this, o, n, t, e, i);}return { icon: i.svg, label: this.content, orientation: this.options.yAxisOrientation };
    }, o.prototype.getYRange = function (t) {
      for (var e = t[0].y, i = t[0].y, o = 0; o < t.length; o++) {
        e = e > t[o].y ? t[o].y : e, i = i < t[o].y ? t[o].y : i;
      }return { min: e, max: i, yAxisOrientation: this.options.yAxisOrientation };
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e) {}var n = i(11),
        s = i(54);o.drawIcon = function (t, e, i, o, s, r) {
      var a = .5 * s,
          h = n.getSVGElement("rect", r.svgElements, r.svg);h.setAttributeNS(null, "x", e), h.setAttributeNS(null, "y", i - a), h.setAttributeNS(null, "width", o), h.setAttributeNS(null, "height", 2 * a), h.setAttributeNS(null, "class", "vis-outline");var d = Math.round(.3 * o),
          l = t.options.barChart.width,
          u = l / d,
          p = Math.round(.4 * s),
          c = Math.round(.75 * s),
          m = Math.round((o - 2 * d) / 3);if (n.drawBar(e + .5 * d + m, i + a - p - 1, d, p, t.className + " vis-bar", r.svgElements, r.svg, t.style), n.drawBar(e + 1.5 * d + m + 2, i + a - c - 1, d, c, t.className + " vis-bar", r.svgElements, r.svg, t.style), 1 == t.options.drawPoints.enabled) {
        var f = { style: t.options.drawPoints.style, styles: t.options.drawPoints.styles, size: t.options.drawPoints.size / u, className: t.className };n.drawPoint(e + .5 * d + m, i + a - p - 1, f, r.svgElements, r.svg), n.drawPoint(e + 1.5 * d + m + 2, i + a - c - 1, f, r.svgElements, r.svg);
      }
    }, o.draw = function (t, e, i) {
      var r,
          a,
          h,
          d,
          l,
          u,
          p = [],
          c = {},
          m = 0;for (l = 0; l < t.length; l++) {
        if (d = i.groups[t[l]], "bar" === d.options.style && !0 === d.visible && (void 0 === i.options.groups.visibility[t[l]] || !0 === i.options.groups.visibility[t[l]])) for (u = 0; u < e[t[l]].length; u++) {
          p.push({ screen_x: e[t[l]][u].screen_x, screen_end: e[t[l]][u].screen_end, screen_y: e[t[l]][u].screen_y, x: e[t[l]][u].x, end: e[t[l]][u].end, y: e[t[l]][u].y, groupId: t[l], label: e[t[l]][u].label }), m += 1;
        }
      }if (0 !== m) for (p.sort(function (t, e) {
        return t.screen_x === e.screen_x ? t.groupId < e.groupId ? -1 : 1 : t.screen_x - e.screen_x;
      }), o._getDataIntersections(c, p), l = 0; l < p.length; l++) {
        d = i.groups[p[l].groupId];var f = void 0 != d.options.barChart.minWidth ? d.options.barChart.minWidth : .1 * d.options.barChart.width;a = p[l].screen_x;var g = 0;if (void 0 === c[a]) l + 1 < p.length && (r = Math.abs(p[l + 1].screen_x - a)), h = o._getSafeDrawData(r, d, f);else {
          var v = l + (c[a].amount - c[a].resolved);v < p.length && (r = Math.abs(p[v].screen_x - a)), h = o._getSafeDrawData(r, d, f), c[a].resolved += 1, !0 === d.options.stack && !0 !== d.options.excludeFromStacking ? p[l].screen_y < d.zeroPosition ? (g = c[a].accumulatedNegative, c[a].accumulatedNegative += d.zeroPosition - p[l].screen_y) : (g = c[a].accumulatedPositive, c[a].accumulatedPositive += d.zeroPosition - p[l].screen_y) : !0 === d.options.barChart.sideBySide && (h.width = h.width / c[a].amount, h.offset += c[a].resolved * h.width - .5 * h.width * (c[a].amount + 1));
        }var y = h.width,
            b = p[l].screen_x;if (void 0 != p[l].screen_end ? (y = p[l].screen_end - p[l].screen_x, b += .5 * y) : b += h.offset, n.drawBar(b, p[l].screen_y - g, y, d.zeroPosition - p[l].screen_y, d.className + " vis-bar", i.svgElements, i.svg, d.style), !0 === d.options.drawPoints.enabled) {
          var _ = { screen_x: p[l].screen_x, screen_y: p[l].screen_y - g, x: p[l].x, y: p[l].y, groupId: p[l].groupId, label: p[l].label };s.draw([_], d, i, h.offset);
        }
      }
    }, o._getDataIntersections = function (t, e) {
      for (var i, o = 0; o < e.length; o++) {
        o + 1 < e.length && (i = Math.abs(e[o + 1].screen_x - e[o].screen_x)), o > 0 && (i = Math.min(i, Math.abs(e[o - 1].screen_x - e[o].screen_x))), 0 === i && (void 0 === t[e[o].screen_x] && (t[e[o].screen_x] = { amount: 0, resolved: 0, accumulatedPositive: 0, accumulatedNegative: 0 }), t[e[o].screen_x].amount += 1);
      }
    }, o._getSafeDrawData = function (t, e, i) {
      var o, n;return t < e.options.barChart.width && t > 0 ? (o = t < i ? i : t, n = 0, "left" === e.options.barChart.align ? n -= .5 * t : "right" === e.options.barChart.align && (n += .5 * t)) : (o = e.options.barChart.width, n = 0, "left" === e.options.barChart.align ? n -= .5 * e.options.barChart.width : "right" === e.options.barChart.align && (n += .5 * e.options.barChart.width)), { width: o, offset: n };
    }, o.getStackedYRange = function (t, e, i, n, s) {
      if (t.length > 0) {
        t.sort(function (t, e) {
          return t.screen_x === e.screen_x ? t.groupId < e.groupId ? -1 : 1 : t.screen_x - e.screen_x;
        });var r = {};o._getDataIntersections(r, t), e[n] = o._getStackedYRange(r, t), e[n].yAxisOrientation = s, i.push(n);
      }
    }, o._getStackedYRange = function (t, e) {
      for (var i, o = e[0].screen_y, n = e[0].screen_y, s = 0; s < e.length; s++) {
        i = e[s].screen_x, void 0 === t[i] ? (o = o > e[s].screen_y ? e[s].screen_y : o, n = n < e[s].screen_y ? e[s].screen_y : n) : e[s].screen_y < 0 ? t[i].accumulatedNegative += e[s].screen_y : t[i].accumulatedPositive += e[s].screen_y;
      }for (var r in t) {
        t.hasOwnProperty(r) && (o = o > t[r].accumulatedNegative ? t[r].accumulatedNegative : o, o = o > t[r].accumulatedPositive ? t[r].accumulatedPositive : o, n = n < t[r].accumulatedNegative ? t[r].accumulatedNegative : n, n = n < t[r].accumulatedPositive ? t[r].accumulatedPositive : n);
      }return { min: o, max: n };
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e) {}var n = i(11);o.calcPath = function (t, e) {
      if (null != t && t.length > 0) {
        return 1 == e.options.interpolation.enabled ? o._catmullRom(t, e) : o._linear(t);
      }
    }, o.drawIcon = function (t, e, i, o, s, r) {
      var a,
          h,
          d = .5 * s,
          l = n.getSVGElement("rect", r.svgElements, r.svg);if (l.setAttributeNS(null, "x", e), l.setAttributeNS(null, "y", i - d), l.setAttributeNS(null, "width", o), l.setAttributeNS(null, "height", 2 * d), l.setAttributeNS(null, "class", "vis-outline"), a = n.getSVGElement("path", r.svgElements, r.svg), a.setAttributeNS(null, "class", t.className), void 0 !== t.style && a.setAttributeNS(null, "style", t.style), a.setAttributeNS(null, "d", "M" + e + "," + i + " L" + (e + o) + "," + i), 1 == t.options.shaded.enabled && (h = n.getSVGElement("path", r.svgElements, r.svg), "top" == t.options.shaded.orientation ? h.setAttributeNS(null, "d", "M" + e + ", " + (i - d) + "L" + e + "," + i + " L" + (e + o) + "," + i + " L" + (e + o) + "," + (i - d)) : h.setAttributeNS(null, "d", "M" + e + "," + i + " L" + e + "," + (i + d) + " L" + (e + o) + "," + (i + d) + "L" + (e + o) + "," + i), h.setAttributeNS(null, "class", t.className + " vis-icon-fill"), void 0 !== t.options.shaded.style && "" !== t.options.shaded.style && h.setAttributeNS(null, "style", t.options.shaded.style)), 1 == t.options.drawPoints.enabled) {
        var u = { style: t.options.drawPoints.style, styles: t.options.drawPoints.styles, size: t.options.drawPoints.size, className: t.className };n.drawPoint(e + .5 * o, i, u, r.svgElements, r.svg);
      }
    }, o.drawShading = function (t, e, i, o) {
      if (1 == e.options.shaded.enabled) {
        var s = Number(o.svg.style.height.replace("px", "")),
            r = n.getSVGElement("path", o.svgElements, o.svg),
            a = "L";1 == e.options.interpolation.enabled && (a = "C");var h,
            d = 0;d = "top" == e.options.shaded.orientation ? 0 : "bottom" == e.options.shaded.orientation ? s : Math.min(Math.max(0, e.zeroPosition), s), h = "group" == e.options.shaded.orientation && null != i && void 0 != i ? "M" + t[0][0] + "," + t[0][1] + " " + this.serializePath(t, a, !1) + " L" + i[i.length - 1][0] + "," + i[i.length - 1][1] + " " + this.serializePath(i, a, !0) + i[0][0] + "," + i[0][1] + " Z" : "M" + t[0][0] + "," + t[0][1] + " " + this.serializePath(t, a, !1) + " V" + d + " H" + t[0][0] + " Z", r.setAttributeNS(null, "class", e.className + " vis-fill"), void 0 !== e.options.shaded.style && r.setAttributeNS(null, "style", e.options.shaded.style), r.setAttributeNS(null, "d", h);
      }
    }, o.draw = function (t, e, i) {
      if (null != t && void 0 != t) {
        var o = n.getSVGElement("path", i.svgElements, i.svg);o.setAttributeNS(null, "class", e.className), void 0 !== e.style && o.setAttributeNS(null, "style", e.style);var s = "L";1 == e.options.interpolation.enabled && (s = "C"), o.setAttributeNS(null, "d", "M" + t[0][0] + "," + t[0][1] + " " + this.serializePath(t, s, !1));
      }
    }, o.serializePath = function (t, e, i) {
      if (t.length < 2) return "";var o,
          n = e;if (i) for (o = t.length - 2; o > 0; o--) {
        n += t[o][0] + "," + t[o][1] + " ";
      } else for (o = 1; o < t.length; o++) {
        n += t[o][0] + "," + t[o][1] + " ";
      }return n;
    }, o._catmullRomUniform = function (t) {
      var e,
          i,
          o,
          n,
          s,
          r,
          a = [];a.push([Math.round(t[0].screen_x), Math.round(t[0].screen_y)]);for (var h = t.length, d = 0; d < h - 1; d++) {
        e = 0 == d ? t[0] : t[d - 1], i = t[d], o = t[d + 1], n = d + 2 < h ? t[d + 2] : o, s = { screen_x: (-e.screen_x + 6 * i.screen_x + o.screen_x) * (1 / 6), screen_y: (-e.screen_y + 6 * i.screen_y + o.screen_y) * (1 / 6) }, r = { screen_x: (i.screen_x + 6 * o.screen_x - n.screen_x) * (1 / 6), screen_y: (i.screen_y + 6 * o.screen_y - n.screen_y) * (1 / 6) }, a.push([s.screen_x, s.screen_y]), a.push([r.screen_x, r.screen_y]), a.push([o.screen_x, o.screen_y]);
      }return a;
    }, o._catmullRom = function (t, e) {
      var i = e.options.interpolation.alpha;if (0 == i || void 0 === i) return this._catmullRomUniform(t);var o,
          n,
          s,
          r,
          a,
          h,
          d,
          l,
          u,
          p,
          c,
          m,
          f,
          g,
          v,
          y,
          b,
          _,
          w,
          x = [];x.push([Math.round(t[0].screen_x), Math.round(t[0].screen_y)]);for (var D = t.length, S = 0; S < D - 1; S++) {
        o = 0 == S ? t[0] : t[S - 1], n = t[S], s = t[S + 1], r = S + 2 < D ? t[S + 2] : s, d = Math.sqrt(Math.pow(o.screen_x - n.screen_x, 2) + Math.pow(o.screen_y - n.screen_y, 2)), l = Math.sqrt(Math.pow(n.screen_x - s.screen_x, 2) + Math.pow(n.screen_y - s.screen_y, 2)), u = Math.sqrt(Math.pow(s.screen_x - r.screen_x, 2) + Math.pow(s.screen_y - r.screen_y, 2)), g = Math.pow(u, i), y = Math.pow(u, 2 * i), v = Math.pow(l, i), b = Math.pow(l, 2 * i), w = Math.pow(d, i), _ = Math.pow(d, 2 * i), p = 2 * _ + 3 * w * v + b, c = 2 * y + 3 * g * v + b, m = 3 * w * (w + v), m > 0 && (m = 1 / m), f = 3 * g * (g + v), f > 0 && (f = 1 / f), a = { screen_x: (-b * o.screen_x + p * n.screen_x + _ * s.screen_x) * m, screen_y: (-b * o.screen_y + p * n.screen_y + _ * s.screen_y) * m }, h = { screen_x: (y * n.screen_x + c * s.screen_x - b * r.screen_x) * f, screen_y: (y * n.screen_y + c * s.screen_y - b * r.screen_y) * f }, 0 == a.screen_x && 0 == a.screen_y && (a = n), 0 == h.screen_x && 0 == h.screen_y && (h = s), x.push([a.screen_x, a.screen_y]), x.push([h.screen_x, h.screen_y]), x.push([s.screen_x, s.screen_y]);
      }return x;
    }, o._linear = function (t) {
      for (var e = [], i = 0; i < t.length; i++) {
        e.push([t[i].screen_x, t[i].screen_y]);
      }return e;
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t, e, i, o) {
      this.body = t, this.defaultOptions = { enabled: !1, icons: !0, iconSize: 20, iconSpacing: 6, left: { visible: !0, position: "top-left" }, right: { visible: !0, position: "top-right" } }, this.side = i, this.options = r.extend({}, this.defaultOptions), this.linegraphOptions = o, this.svgElements = {}, this.dom = {}, this.groups = {}, this.amountOfGroups = 0, this._create(), this.framework = { svg: this.svg, svgElements: this.svgElements, options: this.options, groups: this.groups }, this.setOptions(e);
    }var n = i(4),
        s = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(n),
        r = i(0),
        a = i(11),
        h = i(5);o.prototype = new h(), o.prototype.clear = function () {
      this.groups = {}, this.amountOfGroups = 0;
    }, o.prototype.addGroup = function (t, e) {
      1 != e.options.excludeFromLegend && (this.groups.hasOwnProperty(t) || (this.groups[t] = e), this.amountOfGroups += 1);
    }, o.prototype.updateGroup = function (t, e) {
      this.groups[t] = e;
    }, o.prototype.removeGroup = function (t) {
      this.groups.hasOwnProperty(t) && (delete this.groups[t], this.amountOfGroups -= 1);
    }, o.prototype._create = function () {
      this.dom.frame = document.createElement("div"), this.dom.frame.className = "vis-legend", this.dom.frame.style.position = "absolute", this.dom.frame.style.top = "10px", this.dom.frame.style.display = "block", this.dom.textArea = document.createElement("div"), this.dom.textArea.className = "vis-legend-text", this.dom.textArea.style.position = "relative", this.dom.textArea.style.top = "0px", this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svg.style.position = "absolute", this.svg.style.top = "0px", this.svg.style.width = this.options.iconSize + 5 + "px", this.svg.style.height = "100%", this.dom.frame.appendChild(this.svg), this.dom.frame.appendChild(this.dom.textArea);
    }, o.prototype.hide = function () {
      this.dom.frame.parentNode && this.dom.frame.parentNode.removeChild(this.dom.frame);
    }, o.prototype.show = function () {
      this.dom.frame.parentNode || this.body.dom.center.appendChild(this.dom.frame);
    }, o.prototype.setOptions = function (t) {
      var e = ["enabled", "orientation", "icons", "left", "right"];r.selectiveDeepExtend(e, this.options, t);
    }, o.prototype.redraw = function () {
      var t = 0,
          e = (0, s.default)(this.groups);e.sort(function (t, e) {
        return t < e ? -1 : 1;
      });for (var i = 0; i < e.length; i++) {
        var o = e[i];1 != this.groups[o].visible || void 0 !== this.linegraphOptions.visibility[o] && 1 != this.linegraphOptions.visibility[o] || t++;
      }if (0 == this.options[this.side].visible || 0 == this.amountOfGroups || 0 == this.options.enabled || 0 == t) this.hide();else {
        if (this.show(), "top-left" == this.options[this.side].position || "bottom-left" == this.options[this.side].position ? (this.dom.frame.style.left = "4px", this.dom.frame.style.textAlign = "left", this.dom.textArea.style.textAlign = "left", this.dom.textArea.style.left = this.options.iconSize + 15 + "px", this.dom.textArea.style.right = "", this.svg.style.left = "0px", this.svg.style.right = "") : (this.dom.frame.style.right = "4px", this.dom.frame.style.textAlign = "right", this.dom.textArea.style.textAlign = "right", this.dom.textArea.style.right = this.options.iconSize + 15 + "px", this.dom.textArea.style.left = "", this.svg.style.right = "0px", this.svg.style.left = ""), "top-left" == this.options[this.side].position || "top-right" == this.options[this.side].position) this.dom.frame.style.top = 4 - Number(this.body.dom.center.style.top.replace("px", "")) + "px", this.dom.frame.style.bottom = "";else {
          var n = this.body.domProps.center.height - this.body.domProps.centerContainer.height;this.dom.frame.style.bottom = 4 + n + Number(this.body.dom.center.style.top.replace("px", "")) + "px", this.dom.frame.style.top = "";
        }0 == this.options.icons ? (this.dom.frame.style.width = this.dom.textArea.offsetWidth + 10 + "px", this.dom.textArea.style.right = "", this.dom.textArea.style.left = "", this.svg.style.width = "0px") : (this.dom.frame.style.width = this.options.iconSize + 15 + this.dom.textArea.offsetWidth + 10 + "px", this.drawLegendIcons());var r = "";for (i = 0; i < e.length; i++) {
          o = e[i], 1 != this.groups[o].visible || void 0 !== this.linegraphOptions.visibility[o] && 1 != this.linegraphOptions.visibility[o] || (r += this.groups[o].content + "<br />");
        }this.dom.textArea.innerHTML = r, this.dom.textArea.style.lineHeight = .75 * this.options.iconSize + this.options.iconSpacing + "px";
      }
    }, o.prototype.drawLegendIcons = function () {
      if (this.dom.frame.parentNode) {
        var t = (0, s.default)(this.groups);t.sort(function (t, e) {
          return t < e ? -1 : 1;
        }), a.resetElements(this.svgElements);var e = window.getComputedStyle(this.dom.frame).paddingTop,
            i = Number(e.replace("px", "")),
            o = i,
            n = this.options.iconSize,
            r = .75 * this.options.iconSize,
            h = i + .5 * r + 3;this.svg.style.width = n + 5 + i + "px";for (var d = 0; d < t.length; d++) {
          var l = t[d];1 != this.groups[l].visible || void 0 !== this.linegraphOptions.visibility[l] && 1 != this.linegraphOptions.visibility[l] || (this.groups[l].getLegend(n, r, this.framework, o, h), h += r + this.options.iconSpacing);
        }
      }
    }, t.exports = o;
  }, function (t, e, i) {
    Object.defineProperty(e, "__esModule", { value: !0 });var o = "string",
        n = "boolean",
        s = "number",
        r = "object",
        a = { configure: { enabled: { boolean: n }, filter: { boolean: n, function: "function" }, container: { dom: "dom" }, __type__: { object: r, boolean: n, function: "function" } }, yAxisOrientation: { string: ["left", "right"] }, defaultGroup: { string: o }, sort: { boolean: n }, sampling: { boolean: n }, stack: { boolean: n }, graphHeight: { string: o, number: s }, shaded: { enabled: { boolean: n }, orientation: { string: ["bottom", "top", "zero", "group"] }, groupId: { object: r }, __type__: { boolean: n, object: r } }, style: { string: ["line", "bar", "points"] }, barChart: { width: { number: s }, minWidth: { number: s }, sideBySide: { boolean: n }, align: { string: ["left", "center", "right"] }, __type__: { object: r } }, interpolation: { enabled: { boolean: n }, parametrization: { string: ["centripetal", "chordal", "uniform"] }, alpha: { number: s }, __type__: { object: r, boolean: n } }, drawPoints: { enabled: { boolean: n }, onRender: { function: "function" }, size: { number: s }, style: { string: ["square", "circle"] }, __type__: { object: r, boolean: n, function: "function" } }, dataAxis: { showMinorLabels: { boolean: n }, showMajorLabels: { boolean: n }, icons: { boolean: n }, width: { string: o, number: s }, visible: { boolean: n }, alignZeros: { boolean: n }, left: { range: { min: { number: s, undefined: "undefined" }, max: { number: s, undefined: "undefined" }, __type__: { object: r } }, format: { function: "function" }, title: { text: { string: o, number: s, undefined: "undefined" }, style: { string: o, undefined: "undefined" }, __type__: { object: r } }, __type__: { object: r } }, right: { range: { min: { number: s, undefined: "undefined" }, max: { number: s, undefined: "undefined" }, __type__: { object: r } }, format: { function: "function" }, title: { text: { string: o, number: s, undefined: "undefined" }, style: { string: o, undefined: "undefined" }, __type__: { object: r } }, __type__: { object: r } }, __type__: { object: r } }, legend: { enabled: { boolean: n }, icons: { boolean: n }, left: { visible: { boolean: n }, position: { string: ["top-right", "bottom-right", "top-left", "bottom-left"] }, __type__: { object: r } }, right: { visible: { boolean: n }, position: { string: ["top-right", "bottom-right", "top-left", "bottom-left"] }, __type__: { object: r } }, __type__: { object: r, boolean: n } }, groups: { visibility: { any: "any" }, __type__: { object: r } }, autoResize: { boolean: n }, throttleRedraw: { number: s }, clickToUse: { boolean: n }, end: { number: s, date: "date", string: o, moment: "moment" }, format: { minorLabels: { millisecond: { string: o, undefined: "undefined" }, second: { string: o, undefined: "undefined" }, minute: { string: o, undefined: "undefined" }, hour: { string: o, undefined: "undefined" }, weekday: { string: o, undefined: "undefined" }, day: { string: o, undefined: "undefined" }, month: { string: o, undefined: "undefined" }, year: { string: o, undefined: "undefined" }, __type__: { object: r } }, majorLabels: { millisecond: { string: o, undefined: "undefined" }, second: { string: o, undefined: "undefined" }, minute: { string: o, undefined: "undefined" }, hour: { string: o, undefined: "undefined" }, weekday: { string: o, undefined: "undefined" }, day: { string: o, undefined: "undefined" }, month: { string: o, undefined: "undefined" }, year: { string: o, undefined: "undefined" }, __type__: { object: r } }, __type__: { object: r } }, moment: { function: "function" }, height: { string: o, number: s }, hiddenDates: { start: { date: "date", number: s, string: o, moment: "moment" }, end: { date: "date", number: s, string: o, moment: "moment" }, repeat: { string: o }, __type__: { object: r, array: "array" } }, locale: { string: o }, locales: { __any__: { any: "any" }, __type__: { object: r } }, max: { date: "date", number: s, string: o, moment: "moment" }, maxHeight: { number: s, string: o }, maxMinorChars: { number: s }, min: { date: "date", number: s, string: o, moment: "moment" }, minHeight: { number: s, string: o }, moveable: { boolean: n }, multiselect: { boolean: n }, orientation: { string: o }, showCurrentTime: { boolean: n }, showMajorLabels: { boolean: n }, showMinorLabels: { boolean: n }, start: { date: "date", number: s, string: o, moment: "moment" }, timeAxis: { scale: { string: o, undefined: "undefined" }, step: { number: s, undefined: "undefined" }, __type__: { object: r } }, width: { string: o, number: s }, zoomable: { boolean: n }, zoomKey: { string: ["ctrlKey", "altKey", "metaKey", ""] }, zoomMax: { number: s }, zoomMin: { number: s }, zIndex: { number: s }, __type__: { object: r } },
        h = { global: { sort: !0, sampling: !0, stack: !1, shaded: { enabled: !1, orientation: ["zero", "top", "bottom", "group"] }, style: ["line", "bar", "points"], barChart: { width: [50, 5, 100, 5], minWidth: [50, 5, 100, 5], sideBySide: !1, align: ["left", "center", "right"] }, interpolation: { enabled: !0, parametrization: ["centripetal", "chordal", "uniform"] }, drawPoints: { enabled: !0, size: [6, 2, 30, 1], style: ["square", "circle"] }, dataAxis: { showMinorLabels: !0, showMajorLabels: !0, icons: !1, width: [40, 0, 200, 1], visible: !0, alignZeros: !0, left: { title: { text: "", style: "" } }, right: { title: { text: "", style: "" } } }, legend: { enabled: !1, icons: !0, left: { visible: !0, position: ["top-right", "bottom-right", "top-left", "bottom-left"] }, right: { visible: !0, position: ["top-right", "bottom-right", "top-left", "bottom-left"] } }, autoResize: !0, clickToUse: !1, end: "", format: { minorLabels: { millisecond: "SSS", second: "s", minute: "HH:mm", hour: "HH:mm", weekday: "ddd D", day: "D", month: "MMM", year: "YYYY" }, majorLabels: { millisecond: "HH:mm:ss", second: "D MMMM HH:mm", minute: "ddd D MMMM", hour: "ddd D MMMM", weekday: "MMMM YYYY", day: "MMMM YYYY", month: "YYYY", year: "" } }, height: "", locale: "", max: "", maxHeight: "", maxMinorChars: [7, 0, 20, 1], min: "", minHeight: "", moveable: !0, orientation: ["both", "bottom", "top"], showCurrentTime: !1, showMajorLabels: !0, showMinorLabels: !0, start: "", width: "100%", zoomable: !0, zoomKey: ["ctrlKey", "altKey", "metaKey", ""], zoomMax: [31536e10, 10, 31536e10, 1], zoomMin: [10, 10, 31536e10, 1], zIndex: 0 } };e.allOptions = a, e.configureOptions = h;
  }, function (t, e, i) {
    e.util = i(0), e.DOMutil = i(11), e.DataSet = i(15), e.DataView = i(20), e.Queue = i(65), e.Timeline = i(129), e.Graph2d = i(138), e.timeline = { Core: i(48), DateUtil: i(21), Range: i(47), stack: i(71), TimeStep: i(49), components: { items: { Item: i(22), BackgroundItem: i(74), BoxItem: i(72), PointItem: i(73), RangeItem: i(53) }, BackgroundGroup: i(52), Component: i(5), CurrentTime: i(50), CustomTime: i(29), DataAxis: i(78), DataScale: i(79), GraphGroup: i(80), Group: i(51), ItemSet: i(70), Legend: i(83), LineGraph: i(77), TimeAxis: i(28) } }, e.moment = i(3), e.Hammer = i(12), e.keycharm = i(68);
  }, function (t, e, i) {
    t.exports = { default: i(87), __esModule: !0 };
  }, function (t, e, i) {
    i(55), i(62), t.exports = i(102);
  }, function (t, e, i) {
    var o = i(89),
        n = i(90),
        s = i(23),
        r = i(13);t.exports = i(56)(Array, "Array", function (t, e) {
      this._t = r(t), this._i = 0, this._k = e;
    }, function () {
      var t = this._t,
          e = this._k,
          i = this._i++;return !t || i >= t.length ? (this._t = void 0, n(1)) : "keys" == e ? n(0, i) : "values" == e ? n(0, t[i]) : n(0, [i, t[i]]);
    }, "values"), s.Arguments = s.Array, o("keys"), o("values"), o("entries");
  }, function (t, e) {
    t.exports = function () {};
  }, function (t, e) {
    t.exports = function (t, e) {
      return { value: e, done: !!t };
    };
  }, function (t, e, i) {
    var o = i(33);t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
      return "String" == o(t) ? t.split("") : Object(t);
    };
  }, function (t, e, i) {
    var o = i(93);t.exports = function (t, e, i) {
      if (o(t), void 0 === e) return t;switch (i) {case 1:
          return function (i) {
            return t.call(e, i);
          };case 2:
          return function (i, o) {
            return t.call(e, i, o);
          };case 3:
          return function (i, o, n) {
            return t.call(e, i, o, n);
          };}return function () {
        return t.apply(e, arguments);
      };
    };
  }, function (t, e) {
    t.exports = function (t) {
      if ("function" != typeof t) throw TypeError(t + " is not a function!");return t;
    };
  }, function (t, e, i) {
    var o = i(37),
        n = i(25),
        s = i(42),
        r = {};i(14)(r, i(7)("iterator"), function () {
      return this;
    }), t.exports = function (t, e, i) {
      t.prototype = o(r, { next: n(1, i) }), s(t, e + " Iterator");
    };
  }, function (t, e, i) {
    var o = i(8),
        n = i(18),
        s = i(26);t.exports = i(9) ? Object.defineProperties : function (t, e) {
      n(t);for (var i, r = s(e), a = r.length, h = 0; a > h;) {
        o.f(t, i = r[h++], e[i]);
      }return t;
    };
  }, function (t, e, i) {
    var o = i(13),
        n = i(97),
        s = i(98);t.exports = function (t) {
      return function (e, i, r) {
        var a,
            h = o(e),
            d = n(h.length),
            l = s(r, d);if (t && i != i) {
          for (; d > l;) {
            if ((a = h[l++]) != a) return !0;
          }
        } else for (; d > l; l++) {
          if ((t || l in h) && h[l] === i) return t || l || 0;
        }return !t && -1;
      };
    };
  }, function (t, e, i) {
    var o = i(38),
        n = Math.min;t.exports = function (t) {
      return t > 0 ? n(o(t), 9007199254740991) : 0;
    };
  }, function (t, e, i) {
    var o = i(38),
        n = Math.max,
        s = Math.min;t.exports = function (t, e) {
      return t = o(t), t < 0 ? n(t + e, 0) : s(t, e);
    };
  }, function (t, e, i) {
    var o = i(6).document;t.exports = o && o.documentElement;
  }, function (t, e, i) {
    var o = i(10),
        n = i(61),
        s = i(39)("IE_PROTO"),
        r = Object.prototype;t.exports = Object.getPrototypeOf || function (t) {
      return t = n(t), o(t, s) ? t[s] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? r : null;
    };
  }, function (t, e, i) {
    var o = i(38),
        n = i(34);t.exports = function (t) {
      return function (e, i) {
        var s,
            r,
            a = String(n(e)),
            h = o(i),
            d = a.length;return h < 0 || h >= d ? t ? "" : void 0 : (s = a.charCodeAt(h), s < 55296 || s > 56319 || h + 1 === d || (r = a.charCodeAt(h + 1)) < 56320 || r > 57343 ? t ? a.charAt(h) : s : t ? a.slice(h, h + 2) : r - 56320 + (s - 55296 << 10) + 65536);
      };
    };
  }, function (t, e, i) {
    var o = i(18),
        n = i(103);t.exports = i(2).getIterator = function (t) {
      var e = n(t);if ("function" != typeof e) throw TypeError(t + " is not iterable!");return o(e.call(t));
    };
  }, function (t, e, i) {
    var o = i(104),
        n = i(7)("iterator"),
        s = i(23);t.exports = i(2).getIteratorMethod = function (t) {
      if (void 0 != t) return t[n] || t["@@iterator"] || s[o(t)];
    };
  }, function (t, e, i) {
    var o = i(33),
        n = i(7)("toStringTag"),
        s = "Arguments" == o(function () {
      return arguments;
    }()),
        r = function r(t, e) {
      try {
        return t[e];
      } catch (t) {}
    };t.exports = function (t) {
      var e, i, a;return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (i = r(e = Object(t), n)) ? i : s ? o(e) : "Object" == (a = o(e)) && "function" == typeof e.callee ? "Arguments" : a;
    };
  }, function (t, e, i) {
    i(106);var o = i(2).Object;t.exports = function (t, e) {
      return o.create(t, e);
    };
  }, function (t, e, i) {
    var o = i(17);o(o.S, "Object", { create: i(37) });
  }, function (t, e, i) {
    i(108), t.exports = i(2).Object.keys;
  }, function (t, e, i) {
    var o = i(61),
        n = i(26);i(109)("keys", function () {
      return function (t) {
        return n(o(t));
      };
    });
  }, function (t, e, i) {
    var o = i(17),
        n = i(2),
        s = i(19);t.exports = function (t, e) {
      var i = (n.Object || {})[t] || Object[t],
          r = {};r[t] = e(i), o(o.S + o.F * s(function () {
        i(1);
      }), "Object", r);
    };
  }, function (t, e, i) {
    t.exports = { default: i(111), __esModule: !0 };
  }, function (t, e, i) {
    i(62), i(55), t.exports = i(44).f("iterator");
  }, function (t, e, i) {
    t.exports = { default: i(113), __esModule: !0 };
  }, function (t, e, i) {
    i(114), i(120), i(121), i(122), t.exports = i(2).Symbol;
  }, function (t, e, i) {
    var o = i(6),
        n = i(10),
        s = i(9),
        r = i(17),
        a = i(59),
        h = i(115).KEY,
        d = i(19),
        l = i(40),
        u = i(42),
        p = i(27),
        c = i(7),
        m = i(44),
        f = i(45),
        g = i(116),
        v = i(117),
        y = i(18),
        b = i(13),
        _ = i(36),
        w = i(25),
        x = i(37),
        D = i(118),
        S = i(119),
        k = i(8),
        C = i(26),
        T = S.f,
        M = k.f,
        O = D.f,
        _E = o.Symbol,
        P = o.JSON,
        I = P && P.stringify,
        N = c("_hidden"),
        A = c("toPrimitive"),
        R = {}.propertyIsEnumerable,
        L = l("symbol-registry"),
        F = l("symbols"),
        H = l("op-symbols"),
        j = Object.prototype,
        Y = "function" == typeof _E,
        G = o.QObject,
        z = !G || !G.prototype || !G.prototype.findChild,
        W = s && d(function () {
      return 7 != x(M({}, "a", { get: function get() {
          return M(this, "a", { value: 7 }).a;
        } })).a;
    }) ? function (t, e, i) {
      var o = T(j, e);o && delete j[e], M(t, e, i), o && t !== j && M(j, e, o);
    } : M,
        V = function V(t) {
      var e = F[t] = x(_E.prototype);return e._k = t, e;
    },
        B = Y && "symbol" == typeof _E.iterator ? function (t) {
      return "symbol" == typeof t;
    } : function (t) {
      return t instanceof _E;
    },
        U = function U(t, e, i) {
      return t === j && U(H, e, i), y(t), e = _(e, !0), y(i), n(F, e) ? (i.enumerable ? (n(t, N) && t[N][e] && (t[N][e] = !1), i = x(i, { enumerable: w(0, !1) })) : (n(t, N) || M(t, N, w(1, {})), t[N][e] = !0), W(t, e, i)) : M(t, e, i);
    },
        q = function q(t, e) {
      y(t);for (var i, o = g(e = b(e)), n = 0, s = o.length; s > n;) {
        U(t, i = o[n++], e[i]);
      }return t;
    },
        X = function X(t, e) {
      return void 0 === e ? x(t) : q(x(t), e);
    },
        Z = function Z(t) {
      var e = R.call(this, t = _(t, !0));return !(this === j && n(F, t) && !n(H, t)) && (!(e || !n(this, t) || !n(F, t) || n(this, N) && this[N][t]) || e);
    },
        K = function K(t, e) {
      if (t = b(t), e = _(e, !0), t !== j || !n(F, e) || n(H, e)) {
        var i = T(t, e);return !i || !n(F, e) || n(t, N) && t[N][e] || (i.enumerable = !0), i;
      }
    },
        J = function J(t) {
      for (var e, i = O(b(t)), o = [], s = 0; i.length > s;) {
        n(F, e = i[s++]) || e == N || e == h || o.push(e);
      }return o;
    },
        $ = function $(t) {
      for (var e, i = t === j, o = O(i ? H : b(t)), s = [], r = 0; o.length > r;) {
        !n(F, e = o[r++]) || i && !n(j, e) || s.push(F[e]);
      }return s;
    };Y || (_E = function E() {
      if (this instanceof _E) throw TypeError("Symbol is not a constructor!");var t = p(arguments.length > 0 ? arguments[0] : void 0),
          e = function e(i) {
        this === j && e.call(H, i), n(this, N) && n(this[N], t) && (this[N][t] = !1), W(this, t, w(1, i));
      };return s && z && W(j, t, { configurable: !0, set: e }), V(t);
    }, a(_E.prototype, "toString", function () {
      return this._k;
    }), S.f = K, k.f = U, i(64).f = D.f = J, i(46).f = Z, i(63).f = $, s && !i(35) && a(j, "propertyIsEnumerable", Z, !0), m.f = function (t) {
      return V(c(t));
    }), r(r.G + r.W + r.F * !Y, { Symbol: _E });for (var Q = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), tt = 0; Q.length > tt;) {
      c(Q[tt++]);
    }for (var et = C(c.store), it = 0; et.length > it;) {
      f(et[it++]);
    }r(r.S + r.F * !Y, "Symbol", { for: function _for(t) {
        return n(L, t += "") ? L[t] : L[t] = _E(t);
      }, keyFor: function keyFor(t) {
        if (!B(t)) throw TypeError(t + " is not a symbol!");for (var e in L) {
          if (L[e] === t) return e;
        }
      }, useSetter: function useSetter() {
        z = !0;
      }, useSimple: function useSimple() {
        z = !1;
      } }), r(r.S + r.F * !Y, "Object", { create: X, defineProperty: U, defineProperties: q, getOwnPropertyDescriptor: K, getOwnPropertyNames: J, getOwnPropertySymbols: $ }), P && r(r.S + r.F * (!Y || d(function () {
      var t = _E();return "[null]" != I([t]) || "{}" != I({ a: t }) || "{}" != I(Object(t));
    })), "JSON", { stringify: function stringify(t) {
        if (void 0 !== t && !B(t)) {
          for (var e, i, o = [t], n = 1; arguments.length > n;) {
            o.push(arguments[n++]);
          }return e = o[1], "function" == typeof e && (i = e), !i && v(e) || (e = function e(t, _e4) {
            if (i && (_e4 = i.call(this, t, _e4)), !B(_e4)) return _e4;
          }), o[1] = e, I.apply(P, o);
        }
      } }), _E.prototype[A] || i(14)(_E.prototype, A, _E.prototype.valueOf), u(_E, "Symbol"), u(Math, "Math", !0), u(o.JSON, "JSON", !0);
  }, function (t, e, i) {
    var o = i(27)("meta"),
        n = i(24),
        s = i(10),
        r = i(8).f,
        a = 0,
        h = Object.isExtensible || function () {
      return !0;
    },
        d = !i(19)(function () {
      return h(Object.preventExtensions({}));
    }),
        l = function l(t) {
      r(t, o, { value: { i: "O" + ++a, w: {} } });
    },
        u = function u(t, e) {
      if (!n(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;if (!s(t, o)) {
        if (!h(t)) return "F";if (!e) return "E";l(t);
      }return t[o].i;
    },
        p = function p(t, e) {
      if (!s(t, o)) {
        if (!h(t)) return !0;if (!e) return !1;l(t);
      }return t[o].w;
    },
        c = function c(t) {
      return d && m.NEED && h(t) && !s(t, o) && l(t), t;
    },
        m = t.exports = { KEY: o, NEED: !1, fastKey: u, getWeak: p, onFreeze: c };
  }, function (t, e, i) {
    var o = i(26),
        n = i(63),
        s = i(46);t.exports = function (t) {
      var e = o(t),
          i = n.f;if (i) for (var r, a = i(t), h = s.f, d = 0; a.length > d;) {
        h.call(t, r = a[d++]) && e.push(r);
      }return e;
    };
  }, function (t, e, i) {
    var o = i(33);t.exports = Array.isArray || function (t) {
      return "Array" == o(t);
    };
  }, function (t, e, i) {
    var o = i(13),
        n = i(64).f,
        s = {}.toString,
        r = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        a = function a(t) {
      try {
        return n(t);
      } catch (t) {
        return r.slice();
      }
    };t.exports.f = function (t) {
      return r && "[object Window]" == s.call(t) ? a(t) : n(o(t));
    };
  }, function (t, e, i) {
    var o = i(46),
        n = i(25),
        s = i(13),
        r = i(36),
        a = i(10),
        h = i(57),
        d = Object.getOwnPropertyDescriptor;e.f = i(9) ? d : function (t, e) {
      if (t = s(t), e = r(e, !0), h) try {
        return d(t, e);
      } catch (t) {}if (a(t, e)) return n(!o.f.call(t, e), t[e]);
    };
  }, function (t, e) {}, function (t, e, i) {
    i(45)("asyncIterator");
  }, function (t, e, i) {
    i(45)("observable");
  }, function (t, e, i) {
    (function (t) {
      !function (e, i) {
        t.exports = i();
      }(0, function () {
        function e() {
          return To.apply(null, arguments);
        }function i(t) {
          return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t);
        }function o(t) {
          return null != t && "[object Object]" === Object.prototype.toString.call(t);
        }function n(t) {
          if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(t).length;var e;for (e in t) {
            if (t.hasOwnProperty(e)) return !1;
          }return !0;
        }function s(t) {
          return void 0 === t;
        }function r(t) {
          return "number" == typeof t || "[object Number]" === Object.prototype.toString.call(t);
        }function a(t) {
          return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t);
        }function h(t, e) {
          var i,
              o = [];for (i = 0; i < t.length; ++i) {
            o.push(e(t[i], i));
          }return o;
        }function d(t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        }function l(t, e) {
          for (var i in e) {
            d(e, i) && (t[i] = e[i]);
          }return d(e, "toString") && (t.toString = e.toString), d(e, "valueOf") && (t.valueOf = e.valueOf), t;
        }function u(t, e, i, o) {
          return Se(t, e, i, o, !0).utc();
        }function p() {
          return { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1, parsedDateParts: [], meridiem: null, rfc2822: !1, weekdayMismatch: !1 };
        }function c(t) {
          return null == t._pf && (t._pf = p()), t._pf;
        }function m(t) {
          if (null == t._isValid) {
            var e = c(t),
                i = Mo.call(e.parsedDateParts, function (t) {
              return null != t;
            }),
                o = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.weekdayMismatch && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && i);if (t._strict && (o = o && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour), null != Object.isFrozen && Object.isFrozen(t)) return o;t._isValid = o;
          }return t._isValid;
        }function f(t) {
          var e = u(NaN);return null != t ? l(c(e), t) : c(e).userInvalidated = !0, e;
        }function g(t, e) {
          var i, o, n;if (s(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), s(e._i) || (t._i = e._i), s(e._f) || (t._f = e._f), s(e._l) || (t._l = e._l), s(e._strict) || (t._strict = e._strict), s(e._tzm) || (t._tzm = e._tzm), s(e._isUTC) || (t._isUTC = e._isUTC), s(e._offset) || (t._offset = e._offset), s(e._pf) || (t._pf = c(e)), s(e._locale) || (t._locale = e._locale), Oo.length > 0) for (i = 0; i < Oo.length; i++) {
            o = Oo[i], n = e[o], s(n) || (t[o] = n);
          }return t;
        }function v(t) {
          g(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === Eo && (Eo = !0, e.updateOffset(this), Eo = !1);
        }function y(t) {
          return t instanceof v || null != t && null != t._isAMomentObject;
        }function b(t) {
          return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
        }function _(t) {
          var e = +t,
              i = 0;return 0 !== e && isFinite(e) && (i = b(e)), i;
        }function w(t, e, i) {
          var o,
              n = Math.min(t.length, e.length),
              s = Math.abs(t.length - e.length),
              r = 0;for (o = 0; o < n; o++) {
            (i && t[o] !== e[o] || !i && _(t[o]) !== _(e[o])) && r++;
          }return r + s;
        }function x(t) {
          !1 === e.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t);
        }function D(t, i) {
          var o = !0;return l(function () {
            if (null != e.deprecationHandler && e.deprecationHandler(null, t), o) {
              for (var n, s = [], r = 0; r < arguments.length; r++) {
                if (n = "", "object" == typeof arguments[r]) {
                  n += "\n[" + r + "] ";for (var a in arguments[0]) {
                    n += a + ": " + arguments[0][a] + ", ";
                  }n = n.slice(0, -2);
                } else n = arguments[r];s.push(n);
              }x(t + "\nArguments: " + Array.prototype.slice.call(s).join("") + "\n" + new Error().stack), o = !1;
            }return i.apply(this, arguments);
          }, i);
        }function S(t, i) {
          null != e.deprecationHandler && e.deprecationHandler(t, i), Po[t] || (x(i), Po[t] = !0);
        }function k(t) {
          return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t);
        }function C(t) {
          var e, i;for (i in t) {
            e = t[i], k(e) ? this[i] = e : this["_" + i] = e;
          }this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
        }function T(t, e) {
          var i,
              n = l({}, t);for (i in e) {
            d(e, i) && (o(t[i]) && o(e[i]) ? (n[i] = {}, l(n[i], t[i]), l(n[i], e[i])) : null != e[i] ? n[i] = e[i] : delete n[i]);
          }for (i in t) {
            d(t, i) && !d(e, i) && o(t[i]) && (n[i] = l({}, n[i]));
          }return n;
        }function M(t) {
          null != t && this.set(t);
        }function O(t, e, i) {
          var o = this._calendar[t] || this._calendar.sameElse;return k(o) ? o.call(e, i) : o;
        }function E(t) {
          var e = this._longDateFormat[t],
              i = this._longDateFormat[t.toUpperCase()];return e || !i ? e : (this._longDateFormat[t] = i.replace(/MMMM|MM|DD|dddd/g, function (t) {
            return t.slice(1);
          }), this._longDateFormat[t]);
        }function P() {
          return this._invalidDate;
        }function I(t) {
          return this._ordinal.replace("%d", t);
        }function N(t, e, i, o) {
          var n = this._relativeTime[i];return k(n) ? n(t, e, i, o) : n.replace(/%d/i, t);
        }function A(t, e) {
          var i = this._relativeTime[t > 0 ? "future" : "past"];return k(i) ? i(e) : i.replace(/%s/i, e);
        }function R(t, e) {
          var i = t.toLowerCase();Fo[i] = Fo[i + "s"] = Fo[e] = t;
        }function L(t) {
          return "string" == typeof t ? Fo[t] || Fo[t.toLowerCase()] : void 0;
        }function F(t) {
          var e,
              i,
              o = {};for (i in t) {
            d(t, i) && (e = L(i)) && (o[e] = t[i]);
          }return o;
        }function H(t, e) {
          Ho[t] = e;
        }function j(t) {
          var e = [];for (var i in t) {
            e.push({ unit: i, priority: Ho[i] });
          }return e.sort(function (t, e) {
            return t.priority - e.priority;
          }), e;
        }function Y(t, e, i) {
          var o = "" + Math.abs(t),
              n = e - o.length;return (t >= 0 ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, n)).toString().substr(1) + o;
        }function G(t, e, i, o) {
          var n = o;"string" == typeof o && (n = function n() {
            return this[o]();
          }), t && (zo[t] = n), e && (zo[e[0]] = function () {
            return Y(n.apply(this, arguments), e[1], e[2]);
          }), i && (zo[i] = function () {
            return this.localeData().ordinal(n.apply(this, arguments), t);
          });
        }function z(t) {
          return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");
        }function W(t) {
          var e,
              i,
              o = t.match(jo);for (e = 0, i = o.length; e < i; e++) {
            zo[o[e]] ? o[e] = zo[o[e]] : o[e] = z(o[e]);
          }return function (e) {
            var n,
                s = "";for (n = 0; n < i; n++) {
              s += k(o[n]) ? o[n].call(e, t) : o[n];
            }return s;
          };
        }function V(t, e) {
          return t.isValid() ? (e = B(e, t.localeData()), Go[e] = Go[e] || W(e), Go[e](t)) : t.localeData().invalidDate();
        }function B(t, e) {
          function i(t) {
            return e.longDateFormat(t) || t;
          }var o = 5;for (Yo.lastIndex = 0; o >= 0 && Yo.test(t);) {
            t = t.replace(Yo, i), Yo.lastIndex = 0, o -= 1;
          }return t;
        }function U(t, e, i) {
          an[t] = k(e) ? e : function (t, o) {
            return t && i ? i : e;
          };
        }function q(t, e) {
          return d(an, t) ? an[t](e._strict, e._locale) : new RegExp(X(t));
        }function X(t) {
          return Z(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, e, i, o, n) {
            return e || i || o || n;
          }));
        }function Z(t) {
          return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        }function K(t, e) {
          var i,
              o = e;for ("string" == typeof t && (t = [t]), r(e) && (o = function o(t, i) {
            i[e] = _(t);
          }), i = 0; i < t.length; i++) {
            hn[t[i]] = o;
          }
        }function J(t, e) {
          K(t, function (t, i, o, n) {
            o._w = o._w || {}, e(t, o._w, o, n);
          });
        }function $(t, e, i) {
          null != e && d(hn, t) && hn[t](e, i._a, i, t);
        }function Q(t) {
          return tt(t) ? 366 : 365;
        }function tt(t) {
          return t % 4 == 0 && t % 100 != 0 || t % 400 == 0;
        }function et() {
          return tt(this.year());
        }function it(t, i) {
          return function (o) {
            return null != o ? (nt(this, t, o), e.updateOffset(this, i), this) : ot(this, t);
          };
        }function ot(t, e) {
          return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN;
        }function nt(t, e, i) {
          t.isValid() && !isNaN(i) && ("FullYear" === e && tt(t.year()) ? t._d["set" + (t._isUTC ? "UTC" : "") + e](i, t.month(), ht(i, t.month())) : t._d["set" + (t._isUTC ? "UTC" : "") + e](i));
        }function st(t) {
          return t = L(t), k(this[t]) ? this[t]() : this;
        }function rt(t, e) {
          if ("object" == typeof t) {
            t = F(t);for (var i = j(t), o = 0; o < i.length; o++) {
              this[i[o].unit](t[i[o].unit]);
            }
          } else if (t = L(t), k(this[t])) return this[t](e);return this;
        }function at(t, e) {
          return (t % e + e) % e;
        }function ht(t, e) {
          if (isNaN(t) || isNaN(e)) return NaN;var i = at(e, 12);return t += (e - i) / 12, 1 === i ? tt(t) ? 29 : 28 : 31 - i % 7 % 2;
        }function dt(t, e) {
          return t ? i(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || _n).test(e) ? "format" : "standalone"][t.month()] : i(this._months) ? this._months : this._months.standalone;
        }function lt(t, e) {
          return t ? i(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[_n.test(e) ? "format" : "standalone"][t.month()] : i(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
        }function ut(t, e, i) {
          var o,
              n,
              s,
              r = t.toLocaleLowerCase();if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], o = 0; o < 12; ++o) {
            s = u([2e3, o]), this._shortMonthsParse[o] = this.monthsShort(s, "").toLocaleLowerCase(), this._longMonthsParse[o] = this.months(s, "").toLocaleLowerCase();
          }return i ? "MMM" === e ? (n = yn.call(this._shortMonthsParse, r), -1 !== n ? n : null) : (n = yn.call(this._longMonthsParse, r), -1 !== n ? n : null) : "MMM" === e ? -1 !== (n = yn.call(this._shortMonthsParse, r)) ? n : (n = yn.call(this._longMonthsParse, r), -1 !== n ? n : null) : -1 !== (n = yn.call(this._longMonthsParse, r)) ? n : (n = yn.call(this._shortMonthsParse, r), -1 !== n ? n : null);
        }function pt(t, e, i) {
          var o, n, s;if (this._monthsParseExact) return ut.call(this, t, e, i);for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), o = 0; o < 12; o++) {
            if (n = u([2e3, o]), i && !this._longMonthsParse[o] && (this._longMonthsParse[o] = new RegExp("^" + this.months(n, "").replace(".", "") + "$", "i"), this._shortMonthsParse[o] = new RegExp("^" + this.monthsShort(n, "").replace(".", "") + "$", "i")), i || this._monthsParse[o] || (s = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[o] = new RegExp(s.replace(".", ""), "i")), i && "MMMM" === e && this._longMonthsParse[o].test(t)) return o;if (i && "MMM" === e && this._shortMonthsParse[o].test(t)) return o;if (!i && this._monthsParse[o].test(t)) return o;
          }
        }function ct(t, e) {
          var i;if (!t.isValid()) return t;if ("string" == typeof e) if (/^\d+$/.test(e)) e = _(e);else if (e = t.localeData().monthsParse(e), !r(e)) return t;return i = Math.min(t.date(), ht(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i), t;
        }function mt(t) {
          return null != t ? (ct(this, t), e.updateOffset(this, !0), this) : ot(this, "Month");
        }function ft() {
          return ht(this.year(), this.month());
        }function gt(t) {
          return this._monthsParseExact ? (d(this, "_monthsRegex") || yt.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (d(this, "_monthsShortRegex") || (this._monthsShortRegex = Dn), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex);
        }function vt(t) {
          return this._monthsParseExact ? (d(this, "_monthsRegex") || yt.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (d(this, "_monthsRegex") || (this._monthsRegex = Sn), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex);
        }function yt() {
          function t(t, e) {
            return e.length - t.length;
          }var e,
              i,
              o = [],
              n = [],
              s = [];for (e = 0; e < 12; e++) {
            i = u([2e3, e]), o.push(this.monthsShort(i, "")), n.push(this.months(i, "")), s.push(this.months(i, "")), s.push(this.monthsShort(i, ""));
          }for (o.sort(t), n.sort(t), s.sort(t), e = 0; e < 12; e++) {
            o[e] = Z(o[e]), n[e] = Z(n[e]);
          }for (e = 0; e < 24; e++) {
            s[e] = Z(s[e]);
          }this._monthsRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + o.join("|") + ")", "i");
        }function bt(t, e, i, o, n, s, r) {
          var a = new Date(t, e, i, o, n, s, r);return t < 100 && t >= 0 && isFinite(a.getFullYear()) && a.setFullYear(t), a;
        }function _t(t) {
          var e = new Date(Date.UTC.apply(null, arguments));return t < 100 && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), e;
        }function wt(t, e, i) {
          var o = 7 + e - i;return -(7 + _t(t, 0, o).getUTCDay() - e) % 7 + o - 1;
        }function xt(t, e, i, o, n) {
          var s,
              r,
              a = (7 + i - o) % 7,
              h = wt(t, o, n),
              d = 1 + 7 * (e - 1) + a + h;return d <= 0 ? (s = t - 1, r = Q(s) + d) : d > Q(t) ? (s = t + 1, r = d - Q(t)) : (s = t, r = d), { year: s, dayOfYear: r };
        }function Dt(t, e, i) {
          var o,
              n,
              s = wt(t.year(), e, i),
              r = Math.floor((t.dayOfYear() - s - 1) / 7) + 1;return r < 1 ? (n = t.year() - 1, o = r + St(n, e, i)) : r > St(t.year(), e, i) ? (o = r - St(t.year(), e, i), n = t.year() + 1) : (n = t.year(), o = r), { week: o, year: n };
        }function St(t, e, i) {
          var o = wt(t, e, i),
              n = wt(t + 1, e, i);return (Q(t) - o + n) / 7;
        }function kt(t) {
          return Dt(t, this._week.dow, this._week.doy).week;
        }function Ct() {
          return this._week.dow;
        }function Tt() {
          return this._week.doy;
        }function Mt(t) {
          var e = this.localeData().week(this);return null == t ? e : this.add(7 * (t - e), "d");
        }function Ot(t) {
          var e = Dt(this, 1, 4).week;return null == t ? e : this.add(7 * (t - e), "d");
        }function Et(t, e) {
          return "string" != typeof t ? t : isNaN(t) ? (t = e.weekdaysParse(t), "number" == typeof t ? t : null) : parseInt(t, 10);
        }function Pt(t, e) {
          return "string" == typeof t ? e.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t;
        }function It(t, e) {
          return t ? i(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? "format" : "standalone"][t.day()] : i(this._weekdays) ? this._weekdays : this._weekdays.standalone;
        }function Nt(t) {
          return t ? this._weekdaysShort[t.day()] : this._weekdaysShort;
        }function At(t) {
          return t ? this._weekdaysMin[t.day()] : this._weekdaysMin;
        }function Rt(t, e, i) {
          var o,
              n,
              s,
              r = t.toLocaleLowerCase();if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], o = 0; o < 7; ++o) {
            s = u([2e3, 1]).day(o), this._minWeekdaysParse[o] = this.weekdaysMin(s, "").toLocaleLowerCase(), this._shortWeekdaysParse[o] = this.weekdaysShort(s, "").toLocaleLowerCase(), this._weekdaysParse[o] = this.weekdays(s, "").toLocaleLowerCase();
          }return i ? "dddd" === e ? (n = yn.call(this._weekdaysParse, r), -1 !== n ? n : null) : "ddd" === e ? (n = yn.call(this._shortWeekdaysParse, r), -1 !== n ? n : null) : (n = yn.call(this._minWeekdaysParse, r), -1 !== n ? n : null) : "dddd" === e ? -1 !== (n = yn.call(this._weekdaysParse, r)) ? n : -1 !== (n = yn.call(this._shortWeekdaysParse, r)) ? n : (n = yn.call(this._minWeekdaysParse, r), -1 !== n ? n : null) : "ddd" === e ? -1 !== (n = yn.call(this._shortWeekdaysParse, r)) ? n : -1 !== (n = yn.call(this._weekdaysParse, r)) ? n : (n = yn.call(this._minWeekdaysParse, r), -1 !== n ? n : null) : -1 !== (n = yn.call(this._minWeekdaysParse, r)) ? n : -1 !== (n = yn.call(this._weekdaysParse, r)) ? n : (n = yn.call(this._shortWeekdaysParse, r), -1 !== n ? n : null);
        }function Lt(t, e, i) {
          var o, n, s;if (this._weekdaysParseExact) return Rt.call(this, t, e, i);for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), o = 0; o < 7; o++) {
            if (n = u([2e3, 1]).day(o), i && !this._fullWeekdaysParse[o] && (this._fullWeekdaysParse[o] = new RegExp("^" + this.weekdays(n, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[o] = new RegExp("^" + this.weekdaysShort(n, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[o] = new RegExp("^" + this.weekdaysMin(n, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[o] || (s = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[o] = new RegExp(s.replace(".", ""), "i")), i && "dddd" === e && this._fullWeekdaysParse[o].test(t)) return o;if (i && "ddd" === e && this._shortWeekdaysParse[o].test(t)) return o;if (i && "dd" === e && this._minWeekdaysParse[o].test(t)) return o;if (!i && this._weekdaysParse[o].test(t)) return o;
          }
        }function Ft(t) {
          if (!this.isValid()) return null != t ? this : NaN;var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();return null != t ? (t = Et(t, this.localeData()), this.add(t - e, "d")) : e;
        }function Ht(t) {
          if (!this.isValid()) return null != t ? this : NaN;var e = (this.day() + 7 - this.localeData()._week.dow) % 7;return null == t ? e : this.add(t - e, "d");
        }function jt(t) {
          if (!this.isValid()) return null != t ? this : NaN;if (null != t) {
            var e = Pt(t, this.localeData());return this.day(this.day() % 7 ? e : e - 7);
          }return this.day() || 7;
        }function Yt(t) {
          return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || Wt.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (d(this, "_weekdaysRegex") || (this._weekdaysRegex = On), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex);
        }function Gt(t) {
          return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || Wt.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (d(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = En), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
        }function zt(t) {
          return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || Wt.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (d(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Pn), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
        }function Wt() {
          function t(t, e) {
            return e.length - t.length;
          }var e,
              i,
              o,
              n,
              s,
              r = [],
              a = [],
              h = [],
              d = [];for (e = 0; e < 7; e++) {
            i = u([2e3, 1]).day(e), o = this.weekdaysMin(i, ""), n = this.weekdaysShort(i, ""), s = this.weekdays(i, ""), r.push(o), a.push(n), h.push(s), d.push(o), d.push(n), d.push(s);
          }for (r.sort(t), a.sort(t), h.sort(t), d.sort(t), e = 0; e < 7; e++) {
            a[e] = Z(a[e]), h[e] = Z(h[e]), d[e] = Z(d[e]);
          }this._weekdaysRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + r.join("|") + ")", "i");
        }function Vt() {
          return this.hours() % 12 || 12;
        }function Bt() {
          return this.hours() || 24;
        }function Ut(t, e) {
          G(t, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), e);
          });
        }function qt(t, e) {
          return e._meridiemParse;
        }function Xt(t) {
          return "p" === (t + "").toLowerCase().charAt(0);
        }function Zt(t, e, i) {
          return t > 11 ? i ? "pm" : "PM" : i ? "am" : "AM";
        }function Kt(t) {
          return t ? t.toLowerCase().replace("_", "-") : t;
        }function Jt(t) {
          for (var e, i, o, n, s = 0; s < t.length;) {
            for (n = Kt(t[s]).split("-"), e = n.length, i = Kt(t[s + 1]), i = i ? i.split("-") : null; e > 0;) {
              if (o = $t(n.slice(0, e).join("-"))) return o;if (i && i.length >= e && w(n, i, !0) >= e - 1) break;e--;
            }s++;
          }return null;
        }function $t(e) {
          var i = null;if (!Ln[e] && void 0 !== t && t && t.exports) try {
            i = In._abbr;!function () {
              var t = new Error('Cannot find module "./locale"');throw t.code = "MODULE_NOT_FOUND", t;
            }(), Qt(i);
          } catch (t) {}return Ln[e];
        }function Qt(t, e) {
          var i;return t && (i = s(e) ? ie(t) : te(t, e)) && (In = i), In._abbr;
        }function te(t, e) {
          if (null !== e) {
            var i = Rn;if (e.abbr = t, null != Ln[t]) S("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), i = Ln[t]._config;else if (null != e.parentLocale) {
              if (null == Ln[e.parentLocale]) return Fn[e.parentLocale] || (Fn[e.parentLocale] = []), Fn[e.parentLocale].push({ name: t, config: e }), null;i = Ln[e.parentLocale]._config;
            }return Ln[t] = new M(T(i, e)), Fn[t] && Fn[t].forEach(function (t) {
              te(t.name, t.config);
            }), Qt(t), Ln[t];
          }return delete Ln[t], null;
        }function ee(t, e) {
          if (null != e) {
            var i,
                o = Rn;null != Ln[t] && (o = Ln[t]._config), e = T(o, e), i = new M(e), i.parentLocale = Ln[t], Ln[t] = i, Qt(t);
          } else null != Ln[t] && (null != Ln[t].parentLocale ? Ln[t] = Ln[t].parentLocale : null != Ln[t] && delete Ln[t]);return Ln[t];
        }function ie(t) {
          var e;if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return In;if (!i(t)) {
            if (e = $t(t)) return e;t = [t];
          }return Jt(t);
        }function oe() {
          return Io(Ln);
        }function ne(t) {
          var e,
              i = t._a;return i && -2 === c(t).overflow && (e = i[ln] < 0 || i[ln] > 11 ? ln : i[un] < 1 || i[un] > ht(i[dn], i[ln]) ? un : i[pn] < 0 || i[pn] > 24 || 24 === i[pn] && (0 !== i[cn] || 0 !== i[mn] || 0 !== i[fn]) ? pn : i[cn] < 0 || i[cn] > 59 ? cn : i[mn] < 0 || i[mn] > 59 ? mn : i[fn] < 0 || i[fn] > 999 ? fn : -1, c(t)._overflowDayOfYear && (e < dn || e > un) && (e = un), c(t)._overflowWeeks && -1 === e && (e = gn), c(t)._overflowWeekday && -1 === e && (e = vn), c(t).overflow = e), t;
        }function se(t, e, i) {
          return null != t ? t : null != e ? e : i;
        }function re(t) {
          var i = new Date(e.now());return t._useUTC ? [i.getUTCFullYear(), i.getUTCMonth(), i.getUTCDate()] : [i.getFullYear(), i.getMonth(), i.getDate()];
        }function ae(t) {
          var e,
              i,
              o,
              n,
              s = [];if (!t._d) {
            for (o = re(t), t._w && null == t._a[un] && null == t._a[ln] && he(t), null != t._dayOfYear && (n = se(t._a[dn], o[dn]), (t._dayOfYear > Q(n) || 0 === t._dayOfYear) && (c(t)._overflowDayOfYear = !0), i = _t(n, 0, t._dayOfYear), t._a[ln] = i.getUTCMonth(), t._a[un] = i.getUTCDate()), e = 0; e < 3 && null == t._a[e]; ++e) {
              t._a[e] = s[e] = o[e];
            }for (; e < 7; e++) {
              t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
            }24 === t._a[pn] && 0 === t._a[cn] && 0 === t._a[mn] && 0 === t._a[fn] && (t._nextDay = !0, t._a[pn] = 0), t._d = (t._useUTC ? _t : bt).apply(null, s), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[pn] = 24), t._w && void 0 !== t._w.d && t._w.d !== t._d.getDay() && (c(t).weekdayMismatch = !0);
          }
        }function he(t) {
          var e, i, o, n, s, r, a, h;if (e = t._w, null != e.GG || null != e.W || null != e.E) s = 1, r = 4, i = se(e.GG, t._a[dn], Dt(ke(), 1, 4).year), o = se(e.W, 1), ((n = se(e.E, 1)) < 1 || n > 7) && (h = !0);else {
            s = t._locale._week.dow, r = t._locale._week.doy;var d = Dt(ke(), s, r);i = se(e.gg, t._a[dn], d.year), o = se(e.w, d.week), null != e.d ? ((n = e.d) < 0 || n > 6) && (h = !0) : null != e.e ? (n = e.e + s, (e.e < 0 || e.e > 6) && (h = !0)) : n = s;
          }o < 1 || o > St(i, s, r) ? c(t)._overflowWeeks = !0 : null != h ? c(t)._overflowWeekday = !0 : (a = xt(i, o, n, s, r), t._a[dn] = a.year, t._dayOfYear = a.dayOfYear);
        }function de(t) {
          var e,
              i,
              o,
              n,
              s,
              r,
              a = t._i,
              h = Hn.exec(a) || jn.exec(a);if (h) {
            for (c(t).iso = !0, e = 0, i = Gn.length; e < i; e++) {
              if (Gn[e][1].exec(h[1])) {
                n = Gn[e][0], o = !1 !== Gn[e][2];break;
              }
            }if (null == n) return void (t._isValid = !1);if (h[3]) {
              for (e = 0, i = zn.length; e < i; e++) {
                if (zn[e][1].exec(h[3])) {
                  s = (h[2] || " ") + zn[e][0];break;
                }
              }if (null == s) return void (t._isValid = !1);
            }if (!o && null != s) return void (t._isValid = !1);if (h[4]) {
              if (!Yn.exec(h[4])) return void (t._isValid = !1);r = "Z";
            }t._f = n + (s || "") + (r || ""), ve(t);
          } else t._isValid = !1;
        }function le(t, e, i, o, n, s) {
          var r = [ue(t), xn.indexOf(e), parseInt(i, 10), parseInt(o, 10), parseInt(n, 10)];return s && r.push(parseInt(s, 10)), r;
        }function ue(t) {
          var e = parseInt(t, 10);return e <= 49 ? 2e3 + e : e <= 999 ? 1900 + e : e;
        }function pe(t) {
          return t.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
        }function ce(t, e, i) {
          if (t) {
            if (Tn.indexOf(t) !== new Date(e[0], e[1], e[2]).getDay()) return c(i).weekdayMismatch = !0, i._isValid = !1, !1;
          }return !0;
        }function me(t, e, i) {
          if (t) return Bn[t];if (e) return 0;var o = parseInt(i, 10),
              n = o % 100;return (o - n) / 100 * 60 + n;
        }function fe(t) {
          var e = Vn.exec(pe(t._i));if (e) {
            var i = le(e[4], e[3], e[2], e[5], e[6], e[7]);if (!ce(e[1], i, t)) return;t._a = i, t._tzm = me(e[8], e[9], e[10]), t._d = _t.apply(null, t._a), t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), c(t).rfc2822 = !0;
          } else t._isValid = !1;
        }function ge(t) {
          var i = Wn.exec(t._i);if (null !== i) return void (t._d = new Date(+i[1]));de(t), !1 === t._isValid && (delete t._isValid, fe(t), !1 === t._isValid && (delete t._isValid, e.createFromInputFallback(t)));
        }function ve(t) {
          if (t._f === e.ISO_8601) return void de(t);if (t._f === e.RFC_2822) return void fe(t);t._a = [], c(t).empty = !0;var i,
              o,
              n,
              s,
              r,
              a = "" + t._i,
              h = a.length,
              d = 0;for (n = B(t._f, t._locale).match(jo) || [], i = 0; i < n.length; i++) {
            s = n[i], o = (a.match(q(s, t)) || [])[0], o && (r = a.substr(0, a.indexOf(o)), r.length > 0 && c(t).unusedInput.push(r), a = a.slice(a.indexOf(o) + o.length), d += o.length), zo[s] ? (o ? c(t).empty = !1 : c(t).unusedTokens.push(s), $(s, o, t)) : t._strict && !o && c(t).unusedTokens.push(s);
          }c(t).charsLeftOver = h - d, a.length > 0 && c(t).unusedInput.push(a), t._a[pn] <= 12 && !0 === c(t).bigHour && t._a[pn] > 0 && (c(t).bigHour = void 0), c(t).parsedDateParts = t._a.slice(0), c(t).meridiem = t._meridiem, t._a[pn] = ye(t._locale, t._a[pn], t._meridiem), ae(t), ne(t);
        }function ye(t, e, i) {
          var o;return null == i ? e : null != t.meridiemHour ? t.meridiemHour(e, i) : null != t.isPM ? (o = t.isPM(i), o && e < 12 && (e += 12), o || 12 !== e || (e = 0), e) : e;
        }function be(t) {
          var e, i, o, n, s;if (0 === t._f.length) return c(t).invalidFormat = !0, void (t._d = new Date(NaN));for (n = 0; n < t._f.length; n++) {
            s = 0, e = g({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[n], ve(e), m(e) && (s += c(e).charsLeftOver, s += 10 * c(e).unusedTokens.length, c(e).score = s, (null == o || s < o) && (o = s, i = e));
          }l(t, i || e);
        }function _e(t) {
          if (!t._d) {
            var e = F(t._i);t._a = h([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function (t) {
              return t && parseInt(t, 10);
            }), ae(t);
          }
        }function we(t) {
          var e = new v(ne(xe(t)));return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e;
        }function xe(t) {
          var e = t._i,
              o = t._f;return t._locale = t._locale || ie(t._l), null === e || void 0 === o && "" === e ? f({ nullInput: !0 }) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), y(e) ? new v(ne(e)) : (a(e) ? t._d = e : i(o) ? be(t) : o ? ve(t) : De(t), m(t) || (t._d = null), t));
        }function De(t) {
          var n = t._i;s(n) ? t._d = new Date(e.now()) : a(n) ? t._d = new Date(n.valueOf()) : "string" == typeof n ? ge(t) : i(n) ? (t._a = h(n.slice(0), function (t) {
            return parseInt(t, 10);
          }), ae(t)) : o(n) ? _e(t) : r(n) ? t._d = new Date(n) : e.createFromInputFallback(t);
        }function Se(t, e, s, r, a) {
          var h = {};return !0 !== s && !1 !== s || (r = s, s = void 0), (o(t) && n(t) || i(t) && 0 === t.length) && (t = void 0), h._isAMomentObject = !0, h._useUTC = h._isUTC = a, h._l = s, h._i = t, h._f = e, h._strict = r, we(h);
        }function ke(t, e, i, o) {
          return Se(t, e, i, o, !1);
        }function Ce(t, e) {
          var o, n;if (1 === e.length && i(e[0]) && (e = e[0]), !e.length) return ke();for (o = e[0], n = 1; n < e.length; ++n) {
            e[n].isValid() && !e[n][t](o) || (o = e[n]);
          }return o;
        }function Te() {
          return Ce("isBefore", [].slice.call(arguments, 0));
        }function Me() {
          return Ce("isAfter", [].slice.call(arguments, 0));
        }function Oe(t) {
          for (var e in t) {
            if (-1 === yn.call(Zn, e) || null != t[e] && isNaN(t[e])) return !1;
          }for (var i = !1, o = 0; o < Zn.length; ++o) {
            if (t[Zn[o]]) {
              if (i) return !1;parseFloat(t[Zn[o]]) !== _(t[Zn[o]]) && (i = !0);
            }
          }return !0;
        }function Ee() {
          return this._isValid;
        }function Pe() {
          return Ke(NaN);
        }function Ie(t) {
          var e = F(t),
              i = e.year || 0,
              o = e.quarter || 0,
              n = e.month || 0,
              s = e.week || 0,
              r = e.day || 0,
              a = e.hour || 0,
              h = e.minute || 0,
              d = e.second || 0,
              l = e.millisecond || 0;this._isValid = Oe(e), this._milliseconds = +l + 1e3 * d + 6e4 * h + 1e3 * a * 60 * 60, this._days = +r + 7 * s, this._months = +n + 3 * o + 12 * i, this._data = {}, this._locale = ie(), this._bubble();
        }function Ne(t) {
          return t instanceof Ie;
        }function Ae(t) {
          return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t);
        }function Re(t, e) {
          G(t, 0, 0, function () {
            var t = this.utcOffset(),
                i = "+";return t < 0 && (t = -t, i = "-"), i + Y(~~(t / 60), 2) + e + Y(~~t % 60, 2);
          });
        }function Le(t, e) {
          var i = (e || "").match(t);if (null === i) return null;var o = i[i.length - 1] || [],
              n = (o + "").match(Kn) || ["-", 0, 0],
              s = 60 * n[1] + _(n[2]);return 0 === s ? 0 : "+" === n[0] ? s : -s;
        }function Fe(t, i) {
          var o, n;return i._isUTC ? (o = i.clone(), n = (y(t) || a(t) ? t.valueOf() : ke(t).valueOf()) - o.valueOf(), o._d.setTime(o._d.valueOf() + n), e.updateOffset(o, !1), o) : ke(t).local();
        }function He(t) {
          return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
        }function je(t, i, o) {
          var n,
              s = this._offset || 0;if (!this.isValid()) return null != t ? this : NaN;if (null != t) {
            if ("string" == typeof t) {
              if (null === (t = Le(nn, t))) return this;
            } else Math.abs(t) < 16 && !o && (t *= 60);return !this._isUTC && i && (n = He(this)), this._offset = t, this._isUTC = !0, null != n && this.add(n, "m"), s !== t && (!i || this._changeInProgress ? ei(this, Ke(t - s, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, e.updateOffset(this, !0), this._changeInProgress = null)), this;
          }return this._isUTC ? s : He(this);
        }function Ye(t, e) {
          return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset();
        }function Ge(t) {
          return this.utcOffset(0, t);
        }function ze(t) {
          return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(He(this), "m")), this;
        }function We() {
          if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);else if ("string" == typeof this._i) {
            var t = Le(on, this._i);null != t ? this.utcOffset(t) : this.utcOffset(0, !0);
          }return this;
        }function Ve(t) {
          return !!this.isValid() && (t = t ? ke(t).utcOffset() : 0, (this.utcOffset() - t) % 60 == 0);
        }function Be() {
          return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
        }function Ue() {
          if (!s(this._isDSTShifted)) return this._isDSTShifted;var t = {};if (g(t, this), t = xe(t), t._a) {
            var e = t._isUTC ? u(t._a) : ke(t._a);this._isDSTShifted = this.isValid() && w(t._a, e.toArray()) > 0;
          } else this._isDSTShifted = !1;return this._isDSTShifted;
        }function qe() {
          return !!this.isValid() && !this._isUTC;
        }function Xe() {
          return !!this.isValid() && this._isUTC;
        }function Ze() {
          return !!this.isValid() && this._isUTC && 0 === this._offset;
        }function Ke(t, e) {
          var i,
              o,
              n,
              s = t,
              a = null;return Ne(t) ? s = { ms: t._milliseconds, d: t._days, M: t._months } : r(t) ? (s = {}, e ? s[e] = t : s.milliseconds = t) : (a = Jn.exec(t)) ? (i = "-" === a[1] ? -1 : 1, s = { y: 0, d: _(a[un]) * i, h: _(a[pn]) * i, m: _(a[cn]) * i, s: _(a[mn]) * i, ms: _(Ae(1e3 * a[fn])) * i }) : (a = $n.exec(t)) ? (i = "-" === a[1] ? -1 : (a[1], 1), s = { y: Je(a[2], i), M: Je(a[3], i), w: Je(a[4], i), d: Je(a[5], i), h: Je(a[6], i), m: Je(a[7], i), s: Je(a[8], i) }) : null == s ? s = {} : "object" == typeof s && ("from" in s || "to" in s) && (n = Qe(ke(s.from), ke(s.to)), s = {}, s.ms = n.milliseconds, s.M = n.months), o = new Ie(s), Ne(t) && d(t, "_locale") && (o._locale = t._locale), o;
        }function Je(t, e) {
          var i = t && parseFloat(t.replace(",", "."));return (isNaN(i) ? 0 : i) * e;
        }function $e(t, e) {
          var i = { milliseconds: 0, months: 0 };return i.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(i.months, "M").isAfter(e) && --i.months, i.milliseconds = +e - +t.clone().add(i.months, "M"), i;
        }function Qe(t, e) {
          var i;return t.isValid() && e.isValid() ? (e = Fe(e, t), t.isBefore(e) ? i = $e(t, e) : (i = $e(e, t), i.milliseconds = -i.milliseconds, i.months = -i.months), i) : { milliseconds: 0, months: 0 };
        }function ti(t, e) {
          return function (i, o) {
            var n, s;return null === o || isNaN(+o) || (S(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), s = i, i = o, o = s), i = "string" == typeof i ? +i : i, n = Ke(i, o), ei(this, n, t), this;
          };
        }function ei(t, i, o, n) {
          var s = i._milliseconds,
              r = Ae(i._days),
              a = Ae(i._months);t.isValid() && (n = null == n || n, a && ct(t, ot(t, "Month") + a * o), r && nt(t, "Date", ot(t, "Date") + r * o), s && t._d.setTime(t._d.valueOf() + s * o), n && e.updateOffset(t, r || a));
        }function ii(t, e) {
          var i = t.diff(e, "days", !0);return i < -6 ? "sameElse" : i < -1 ? "lastWeek" : i < 0 ? "lastDay" : i < 1 ? "sameDay" : i < 2 ? "nextDay" : i < 7 ? "nextWeek" : "sameElse";
        }function oi(t, i) {
          var o = t || ke(),
              n = Fe(o, this).startOf("day"),
              s = e.calendarFormat(this, n) || "sameElse",
              r = i && (k(i[s]) ? i[s].call(this, o) : i[s]);return this.format(r || this.localeData().calendar(s, this, ke(o)));
        }function ni() {
          return new v(this);
        }function si(t, e) {
          var i = y(t) ? t : ke(t);return !(!this.isValid() || !i.isValid()) && (e = L(s(e) ? "millisecond" : e), "millisecond" === e ? this.valueOf() > i.valueOf() : i.valueOf() < this.clone().startOf(e).valueOf());
        }function ri(t, e) {
          var i = y(t) ? t : ke(t);return !(!this.isValid() || !i.isValid()) && (e = L(s(e) ? "millisecond" : e), "millisecond" === e ? this.valueOf() < i.valueOf() : this.clone().endOf(e).valueOf() < i.valueOf());
        }function ai(t, e, i, o) {
          return o = o || "()", ("(" === o[0] ? this.isAfter(t, i) : !this.isBefore(t, i)) && (")" === o[1] ? this.isBefore(e, i) : !this.isAfter(e, i));
        }function hi(t, e) {
          var i,
              o = y(t) ? t : ke(t);return !(!this.isValid() || !o.isValid()) && (e = L(e || "millisecond"), "millisecond" === e ? this.valueOf() === o.valueOf() : (i = o.valueOf(), this.clone().startOf(e).valueOf() <= i && i <= this.clone().endOf(e).valueOf()));
        }function di(t, e) {
          return this.isSame(t, e) || this.isAfter(t, e);
        }function li(t, e) {
          return this.isSame(t, e) || this.isBefore(t, e);
        }function ui(t, e, i) {
          var o, n, s;if (!this.isValid()) return NaN;if (o = Fe(t, this), !o.isValid()) return NaN;switch (n = 6e4 * (o.utcOffset() - this.utcOffset()), e = L(e)) {case "year":
              s = pi(this, o) / 12;break;case "month":
              s = pi(this, o);break;case "quarter":
              s = pi(this, o) / 3;break;case "second":
              s = (this - o) / 1e3;break;case "minute":
              s = (this - o) / 6e4;break;case "hour":
              s = (this - o) / 36e5;break;case "day":
              s = (this - o - n) / 864e5;break;case "week":
              s = (this - o - n) / 6048e5;break;default:
              s = this - o;}return i ? s : b(s);
        }function pi(t, e) {
          var i,
              o,
              n = 12 * (e.year() - t.year()) + (e.month() - t.month()),
              s = t.clone().add(n, "months");return e - s < 0 ? (i = t.clone().add(n - 1, "months"), o = (e - s) / (s - i)) : (i = t.clone().add(n + 1, "months"), o = (e - s) / (i - s)), -(n + o) || 0;
        }function ci() {
          return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        }function mi() {
          if (!this.isValid()) return null;var t = this.clone().utc();return t.year() < 0 || t.year() > 9999 ? V(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : k(Date.prototype.toISOString) ? this.toDate().toISOString() : V(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
        }function fi() {
          if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";var t = "moment",
              e = "";this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", e = "Z");var i = "[" + t + '("]',
              o = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
              n = e + '[")]';return this.format(i + o + "-MM-DD[T]HH:mm:ss.SSS" + n);
        }function gi(t) {
          t || (t = this.isUtc() ? e.defaultFormatUtc : e.defaultFormat);var i = V(this, t);return this.localeData().postformat(i);
        }function vi(t, e) {
          return this.isValid() && (y(t) && t.isValid() || ke(t).isValid()) ? Ke({ to: this, from: t }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
        }function yi(t) {
          return this.from(ke(), t);
        }function bi(t, e) {
          return this.isValid() && (y(t) && t.isValid() || ke(t).isValid()) ? Ke({ from: this, to: t }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
        }function _i(t) {
          return this.to(ke(), t);
        }function wi(t) {
          var e;return void 0 === t ? this._locale._abbr : (e = ie(t), null != e && (this._locale = e), this);
        }function xi() {
          return this._locale;
        }function Di(t) {
          switch (t = L(t)) {case "year":
              this.month(0);case "quarter":case "month":
              this.date(1);case "week":case "isoWeek":case "day":case "date":
              this.hours(0);case "hour":
              this.minutes(0);case "minute":
              this.seconds(0);case "second":
              this.milliseconds(0);}return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this;
        }function Si(t) {
          return void 0 === (t = L(t)) || "millisecond" === t ? this : ("date" === t && (t = "day"), this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms"));
        }function ki() {
          return this._d.valueOf() - 6e4 * (this._offset || 0);
        }function Ci() {
          return Math.floor(this.valueOf() / 1e3);
        }function Ti() {
          return new Date(this.valueOf());
        }function Mi() {
          var t = this;return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()];
        }function Oi() {
          var t = this;return { years: t.year(), months: t.month(), date: t.date(), hours: t.hours(), minutes: t.minutes(), seconds: t.seconds(), milliseconds: t.milliseconds() };
        }function Ei() {
          return this.isValid() ? this.toISOString() : null;
        }function Pi() {
          return m(this);
        }function Ii() {
          return l({}, c(this));
        }function Ni() {
          return c(this).overflow;
        }function Ai() {
          return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict };
        }function Ri(t, e) {
          G(0, [t, t.length], 0, e);
        }function Li(t) {
          return Yi.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
        }function Fi(t) {
          return Yi.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4);
        }function Hi() {
          return St(this.year(), 1, 4);
        }function ji() {
          var t = this.localeData()._week;return St(this.year(), t.dow, t.doy);
        }function Yi(t, e, i, o, n) {
          var s;return null == t ? Dt(this, o, n).year : (s = St(t, o, n), e > s && (e = s), Gi.call(this, t, e, i, o, n));
        }function Gi(t, e, i, o, n) {
          var s = xt(t, e, i, o, n),
              r = _t(s.year, 0, s.dayOfYear);return this.year(r.getUTCFullYear()), this.month(r.getUTCMonth()), this.date(r.getUTCDate()), this;
        }function zi(t) {
          return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3);
        }function Wi(t) {
          var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;return null == t ? e : this.add(t - e, "d");
        }function Vi(t, e) {
          e[fn] = _(1e3 * ("0." + t));
        }function Bi() {
          return this._isUTC ? "UTC" : "";
        }function Ui() {
          return this._isUTC ? "Coordinated Universal Time" : "";
        }function qi(t) {
          return ke(1e3 * t);
        }function Xi() {
          return ke.apply(null, arguments).parseZone();
        }function Zi(t) {
          return t;
        }function Ki(t, e, i, o) {
          var n = ie(),
              s = u().set(o, e);return n[i](s, t);
        }function Ji(t, e, i) {
          if (r(t) && (e = t, t = void 0), t = t || "", null != e) return Ki(t, e, i, "month");var o,
              n = [];for (o = 0; o < 12; o++) {
            n[o] = Ki(t, o, i, "month");
          }return n;
        }function $i(t, e, i, o) {
          "boolean" == typeof t ? (r(e) && (i = e, e = void 0), e = e || "") : (e = t, i = e, t = !1, r(e) && (i = e, e = void 0), e = e || "");var n = ie(),
              s = t ? n._week.dow : 0;if (null != i) return Ki(e, (i + s) % 7, o, "day");var a,
              h = [];for (a = 0; a < 7; a++) {
            h[a] = Ki(e, (a + s) % 7, o, "day");
          }return h;
        }function Qi(t, e) {
          return Ji(t, e, "months");
        }function to(t, e) {
          return Ji(t, e, "monthsShort");
        }function eo(t, e, i) {
          return $i(t, e, i, "weekdays");
        }function io(t, e, i) {
          return $i(t, e, i, "weekdaysShort");
        }function oo(t, e, i) {
          return $i(t, e, i, "weekdaysMin");
        }function no() {
          var t = this._data;return this._milliseconds = ds(this._milliseconds), this._days = ds(this._days), this._months = ds(this._months), t.milliseconds = ds(t.milliseconds), t.seconds = ds(t.seconds), t.minutes = ds(t.minutes), t.hours = ds(t.hours), t.months = ds(t.months), t.years = ds(t.years), this;
        }function so(t, e, i, o) {
          var n = Ke(e, i);return t._milliseconds += o * n._milliseconds, t._days += o * n._days, t._months += o * n._months, t._bubble();
        }function ro(t, e) {
          return so(this, t, e, 1);
        }function ao(t, e) {
          return so(this, t, e, -1);
        }function ho(t) {
          return t < 0 ? Math.floor(t) : Math.ceil(t);
        }function lo() {
          var t,
              e,
              i,
              o,
              n,
              s = this._milliseconds,
              r = this._days,
              a = this._months,
              h = this._data;return s >= 0 && r >= 0 && a >= 0 || s <= 0 && r <= 0 && a <= 0 || (s += 864e5 * ho(po(a) + r), r = 0, a = 0), h.milliseconds = s % 1e3, t = b(s / 1e3), h.seconds = t % 60, e = b(t / 60), h.minutes = e % 60, i = b(e / 60), h.hours = i % 24, r += b(i / 24), n = b(uo(r)), a += n, r -= ho(po(n)), o = b(a / 12), a %= 12, h.days = r, h.months = a, h.years = o, this;
        }function uo(t) {
          return 4800 * t / 146097;
        }function po(t) {
          return 146097 * t / 4800;
        }function co(t) {
          if (!this.isValid()) return NaN;var e,
              i,
              o = this._milliseconds;if ("month" === (t = L(t)) || "year" === t) return e = this._days + o / 864e5, i = this._months + uo(e), "month" === t ? i : i / 12;switch (e = this._days + Math.round(po(this._months)), t) {case "week":
              return e / 7 + o / 6048e5;case "day":
              return e + o / 864e5;case "hour":
              return 24 * e + o / 36e5;case "minute":
              return 1440 * e + o / 6e4;case "second":
              return 86400 * e + o / 1e3;case "millisecond":
              return Math.floor(864e5 * e) + o;default:
              throw new Error("Unknown unit " + t);}
        }function mo() {
          return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * _(this._months / 12) : NaN;
        }function fo(t) {
          return function () {
            return this.as(t);
          };
        }function go() {
          return Ke(this);
        }function vo(t) {
          return t = L(t), this.isValid() ? this[t + "s"]() : NaN;
        }function yo(t) {
          return function () {
            return this.isValid() ? this._data[t] : NaN;
          };
        }function bo() {
          return b(this.days() / 7);
        }function _o(t, e, i, o, n) {
          return n.relativeTime(e || 1, !!i, t, o);
        }function wo(t, e, i) {
          var o = Ke(t).abs(),
              n = ks(o.as("s")),
              s = ks(o.as("m")),
              r = ks(o.as("h")),
              a = ks(o.as("d")),
              h = ks(o.as("M")),
              d = ks(o.as("y")),
              l = n <= Cs.ss && ["s", n] || n < Cs.s && ["ss", n] || s <= 1 && ["m"] || s < Cs.m && ["mm", s] || r <= 1 && ["h"] || r < Cs.h && ["hh", r] || a <= 1 && ["d"] || a < Cs.d && ["dd", a] || h <= 1 && ["M"] || h < Cs.M && ["MM", h] || d <= 1 && ["y"] || ["yy", d];return l[2] = e, l[3] = +t > 0, l[4] = i, _o.apply(null, l);
        }function xo(t) {
          return void 0 === t ? ks : "function" == typeof t && (ks = t, !0);
        }function Do(t, e) {
          return void 0 !== Cs[t] && (void 0 === e ? Cs[t] : (Cs[t] = e, "s" === t && (Cs.ss = e - 1), !0));
        }function So(t) {
          if (!this.isValid()) return this.localeData().invalidDate();var e = this.localeData(),
              i = wo(this, !t, e);return t && (i = e.pastFuture(+this, i)), e.postformat(i);
        }function ko(t) {
          return (t > 0) - (t < 0) || +t;
        }function Co() {
          if (!this.isValid()) return this.localeData().invalidDate();var t,
              e,
              i,
              o = Ts(this._milliseconds) / 1e3,
              n = Ts(this._days),
              s = Ts(this._months);t = b(o / 60), e = b(t / 60), o %= 60, t %= 60, i = b(s / 12), s %= 12;var r = i,
              a = s,
              h = n,
              d = e,
              l = t,
              u = o ? o.toFixed(3).replace(/\.?0+$/, "") : "",
              p = this.asSeconds();if (!p) return "P0D";var c = p < 0 ? "-" : "",
              m = ko(this._months) !== ko(p) ? "-" : "",
              f = ko(this._days) !== ko(p) ? "-" : "",
              g = ko(this._milliseconds) !== ko(p) ? "-" : "";return c + "P" + (r ? m + r + "Y" : "") + (a ? m + a + "M" : "") + (h ? f + h + "D" : "") + (d || l || u ? "T" : "") + (d ? g + d + "H" : "") + (l ? g + l + "M" : "") + (u ? g + u + "S" : "");
        }var To, Mo;Mo = Array.prototype.some ? Array.prototype.some : function (t) {
          for (var e = Object(this), i = e.length >>> 0, o = 0; o < i; o++) {
            if (o in e && t.call(this, e[o], o, e)) return !0;
          }return !1;
        };var Oo = e.momentProperties = [],
            Eo = !1,
            Po = {};e.suppressDeprecationWarnings = !1, e.deprecationHandler = null;var Io;Io = Object.keys ? Object.keys : function (t) {
          var e,
              i = [];for (e in t) {
            d(t, e) && i.push(e);
          }return i;
        };var No = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" },
            Ao = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" },
            Ro = /\d{1,2}/,
            Lo = { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" },
            Fo = {},
            Ho = {},
            jo = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            Yo = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            Go = {},
            zo = {},
            Wo = /\d/,
            Vo = /\d\d/,
            Bo = /\d{3}/,
            Uo = /\d{4}/,
            qo = /[+-]?\d{6}/,
            Xo = /\d\d?/,
            Zo = /\d\d\d\d?/,
            Ko = /\d\d\d\d\d\d?/,
            Jo = /\d{1,3}/,
            $o = /\d{1,4}/,
            Qo = /[+-]?\d{1,6}/,
            tn = /\d+/,
            en = /[+-]?\d+/,
            on = /Z|[+-]\d\d:?\d\d/gi,
            nn = /Z|[+-]\d\d(?::?\d\d)?/gi,
            sn = /[+-]?\d+(\.\d{1,3})?/,
            rn = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
            an = {},
            hn = {},
            dn = 0,
            ln = 1,
            un = 2,
            pn = 3,
            cn = 4,
            mn = 5,
            fn = 6,
            gn = 7,
            vn = 8;G("Y", 0, 0, function () {
          var t = this.year();return t <= 9999 ? "" + t : "+" + t;
        }), G(0, ["YY", 2], 0, function () {
          return this.year() % 100;
        }), G(0, ["YYYY", 4], 0, "year"), G(0, ["YYYYY", 5], 0, "year"), G(0, ["YYYYYY", 6, !0], 0, "year"), R("year", "y"), H("year", 1), U("Y", en), U("YY", Xo, Vo), U("YYYY", $o, Uo), U("YYYYY", Qo, qo), U("YYYYYY", Qo, qo), K(["YYYYY", "YYYYYY"], dn), K("YYYY", function (t, i) {
          i[dn] = 2 === t.length ? e.parseTwoDigitYear(t) : _(t);
        }), K("YY", function (t, i) {
          i[dn] = e.parseTwoDigitYear(t);
        }), K("Y", function (t, e) {
          e[dn] = parseInt(t, 10);
        }), e.parseTwoDigitYear = function (t) {
          return _(t) + (_(t) > 68 ? 1900 : 2e3);
        };var yn,
            bn = it("FullYear", !0);yn = Array.prototype.indexOf ? Array.prototype.indexOf : function (t) {
          var e;for (e = 0; e < this.length; ++e) {
            if (this[e] === t) return e;
          }return -1;
        }, G("M", ["MM", 2], "Mo", function () {
          return this.month() + 1;
        }), G("MMM", 0, 0, function (t) {
          return this.localeData().monthsShort(this, t);
        }), G("MMMM", 0, 0, function (t) {
          return this.localeData().months(this, t);
        }), R("month", "M"), H("month", 8), U("M", Xo), U("MM", Xo, Vo), U("MMM", function (t, e) {
          return e.monthsShortRegex(t);
        }), U("MMMM", function (t, e) {
          return e.monthsRegex(t);
        }), K(["M", "MM"], function (t, e) {
          e[ln] = _(t) - 1;
        }), K(["MMM", "MMMM"], function (t, e, i, o) {
          var n = i._locale.monthsParse(t, o, i._strict);null != n ? e[ln] = n : c(i).invalidMonth = t;
        });var _n = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
            wn = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            xn = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            Dn = rn,
            Sn = rn;G("w", ["ww", 2], "wo", "week"), G("W", ["WW", 2], "Wo", "isoWeek"), R("week", "w"), R("isoWeek", "W"), H("week", 5), H("isoWeek", 5), U("w", Xo), U("ww", Xo, Vo), U("W", Xo), U("WW", Xo, Vo), J(["w", "ww", "W", "WW"], function (t, e, i, o) {
          e[o.substr(0, 1)] = _(t);
        });var kn = { dow: 0, doy: 6 };G("d", 0, "do", "day"), G("dd", 0, 0, function (t) {
          return this.localeData().weekdaysMin(this, t);
        }), G("ddd", 0, 0, function (t) {
          return this.localeData().weekdaysShort(this, t);
        }), G("dddd", 0, 0, function (t) {
          return this.localeData().weekdays(this, t);
        }), G("e", 0, 0, "weekday"), G("E", 0, 0, "isoWeekday"), R("day", "d"), R("weekday", "e"), R("isoWeekday", "E"), H("day", 11), H("weekday", 11), H("isoWeekday", 11), U("d", Xo), U("e", Xo), U("E", Xo), U("dd", function (t, e) {
          return e.weekdaysMinRegex(t);
        }), U("ddd", function (t, e) {
          return e.weekdaysShortRegex(t);
        }), U("dddd", function (t, e) {
          return e.weekdaysRegex(t);
        }), J(["dd", "ddd", "dddd"], function (t, e, i, o) {
          var n = i._locale.weekdaysParse(t, o, i._strict);null != n ? e.d = n : c(i).invalidWeekday = t;
        }), J(["d", "e", "E"], function (t, e, i, o) {
          e[o] = _(t);
        });var Cn = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            Tn = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            Mn = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            On = rn,
            En = rn,
            Pn = rn;G("H", ["HH", 2], 0, "hour"), G("h", ["hh", 2], 0, Vt), G("k", ["kk", 2], 0, Bt), G("hmm", 0, 0, function () {
          return "" + Vt.apply(this) + Y(this.minutes(), 2);
        }), G("hmmss", 0, 0, function () {
          return "" + Vt.apply(this) + Y(this.minutes(), 2) + Y(this.seconds(), 2);
        }), G("Hmm", 0, 0, function () {
          return "" + this.hours() + Y(this.minutes(), 2);
        }), G("Hmmss", 0, 0, function () {
          return "" + this.hours() + Y(this.minutes(), 2) + Y(this.seconds(), 2);
        }), Ut("a", !0), Ut("A", !1), R("hour", "h"), H("hour", 13), U("a", qt), U("A", qt), U("H", Xo), U("h", Xo), U("k", Xo), U("HH", Xo, Vo), U("hh", Xo, Vo), U("kk", Xo, Vo), U("hmm", Zo), U("hmmss", Ko), U("Hmm", Zo), U("Hmmss", Ko), K(["H", "HH"], pn), K(["k", "kk"], function (t, e, i) {
          var o = _(t);e[pn] = 24 === o ? 0 : o;
        }), K(["a", "A"], function (t, e, i) {
          i._isPm = i._locale.isPM(t), i._meridiem = t;
        }), K(["h", "hh"], function (t, e, i) {
          e[pn] = _(t), c(i).bigHour = !0;
        }), K("hmm", function (t, e, i) {
          var o = t.length - 2;e[pn] = _(t.substr(0, o)), e[cn] = _(t.substr(o)), c(i).bigHour = !0;
        }), K("hmmss", function (t, e, i) {
          var o = t.length - 4,
              n = t.length - 2;e[pn] = _(t.substr(0, o)), e[cn] = _(t.substr(o, 2)), e[mn] = _(t.substr(n)), c(i).bigHour = !0;
        }), K("Hmm", function (t, e, i) {
          var o = t.length - 2;e[pn] = _(t.substr(0, o)), e[cn] = _(t.substr(o));
        }), K("Hmmss", function (t, e, i) {
          var o = t.length - 4,
              n = t.length - 2;e[pn] = _(t.substr(0, o)), e[cn] = _(t.substr(o, 2)), e[mn] = _(t.substr(n));
        });var In,
            Nn = /[ap]\.?m?\.?/i,
            An = it("Hours", !0),
            Rn = { calendar: No, longDateFormat: Ao, invalidDate: "Invalid date", ordinal: "%d", dayOfMonthOrdinalParse: Ro, relativeTime: Lo, months: wn, monthsShort: xn, week: kn, weekdays: Cn, weekdaysMin: Mn, weekdaysShort: Tn, meridiemParse: Nn },
            Ln = {},
            Fn = {},
            Hn = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            jn = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            Yn = /Z|[+-]\d\d(?::?\d\d)?/,
            Gn = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
            zn = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
            Wn = /^\/?Date\((\-?\d+)/i,
            Vn = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
            Bn = { UT: 0, GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };e.createFromInputFallback = D("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (t) {
          t._d = new Date(t._i + (t._useUTC ? " UTC" : ""));
        }), e.ISO_8601 = function () {}, e.RFC_2822 = function () {};var Un = D("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
          var t = ke.apply(null, arguments);return this.isValid() && t.isValid() ? t < this ? this : t : f();
        }),
            qn = D("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
          var t = ke.apply(null, arguments);return this.isValid() && t.isValid() ? t > this ? this : t : f();
        }),
            Xn = function Xn() {
          return Date.now ? Date.now() : +new Date();
        },
            Zn = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];Re("Z", ":"), Re("ZZ", ""), U("Z", nn), U("ZZ", nn), K(["Z", "ZZ"], function (t, e, i) {
          i._useUTC = !0, i._tzm = Le(nn, t);
        });var Kn = /([\+\-]|\d\d)/gi;e.updateOffset = function () {};var Jn = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
            $n = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;Ke.fn = Ie.prototype, Ke.invalid = Pe;var Qn = ti(1, "add"),
            ts = ti(-1, "subtract");e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", e.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";var es = D("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
          return void 0 === t ? this.localeData() : this.locale(t);
        });G(0, ["gg", 2], 0, function () {
          return this.weekYear() % 100;
        }), G(0, ["GG", 2], 0, function () {
          return this.isoWeekYear() % 100;
        }), Ri("gggg", "weekYear"), Ri("ggggg", "weekYear"), Ri("GGGG", "isoWeekYear"), Ri("GGGGG", "isoWeekYear"), R("weekYear", "gg"), R("isoWeekYear", "GG"), H("weekYear", 1), H("isoWeekYear", 1), U("G", en), U("g", en), U("GG", Xo, Vo), U("gg", Xo, Vo), U("GGGG", $o, Uo), U("gggg", $o, Uo), U("GGGGG", Qo, qo), U("ggggg", Qo, qo), J(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, i, o) {
          e[o.substr(0, 2)] = _(t);
        }), J(["gg", "GG"], function (t, i, o, n) {
          i[n] = e.parseTwoDigitYear(t);
        }), G("Q", 0, "Qo", "quarter"), R("quarter", "Q"), H("quarter", 7), U("Q", Wo), K("Q", function (t, e) {
          e[ln] = 3 * (_(t) - 1);
        }), G("D", ["DD", 2], "Do", "date"), R("date", "D"), H("date", 9), U("D", Xo), U("DD", Xo, Vo), U("Do", function (t, e) {
          return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient;
        }), K(["D", "DD"], un), K("Do", function (t, e) {
          e[un] = _(t.match(Xo)[0], 10);
        });var is = it("Date", !0);G("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), R("dayOfYear", "DDD"), H("dayOfYear", 4), U("DDD", Jo), U("DDDD", Bo), K(["DDD", "DDDD"], function (t, e, i) {
          i._dayOfYear = _(t);
        }), G("m", ["mm", 2], 0, "minute"), R("minute", "m"), H("minute", 14), U("m", Xo), U("mm", Xo, Vo), K(["m", "mm"], cn);var os = it("Minutes", !1);G("s", ["ss", 2], 0, "second"), R("second", "s"), H("second", 15), U("s", Xo), U("ss", Xo, Vo), K(["s", "ss"], mn);var ns = it("Seconds", !1);G("S", 0, 0, function () {
          return ~~(this.millisecond() / 100);
        }), G(0, ["SS", 2], 0, function () {
          return ~~(this.millisecond() / 10);
        }), G(0, ["SSS", 3], 0, "millisecond"), G(0, ["SSSS", 4], 0, function () {
          return 10 * this.millisecond();
        }), G(0, ["SSSSS", 5], 0, function () {
          return 100 * this.millisecond();
        }), G(0, ["SSSSSS", 6], 0, function () {
          return 1e3 * this.millisecond();
        }), G(0, ["SSSSSSS", 7], 0, function () {
          return 1e4 * this.millisecond();
        }), G(0, ["SSSSSSSS", 8], 0, function () {
          return 1e5 * this.millisecond();
        }), G(0, ["SSSSSSSSS", 9], 0, function () {
          return 1e6 * this.millisecond();
        }), R("millisecond", "ms"), H("millisecond", 16), U("S", Jo, Wo), U("SS", Jo, Vo), U("SSS", Jo, Bo);var ss;for (ss = "SSSS"; ss.length <= 9; ss += "S") {
          U(ss, tn);
        }for (ss = "S"; ss.length <= 9; ss += "S") {
          K(ss, Vi);
        }var rs = it("Milliseconds", !1);G("z", 0, 0, "zoneAbbr"), G("zz", 0, 0, "zoneName");var as = v.prototype;as.add = Qn, as.calendar = oi, as.clone = ni, as.diff = ui, as.endOf = Si, as.format = gi, as.from = vi, as.fromNow = yi, as.to = bi, as.toNow = _i, as.get = st, as.invalidAt = Ni, as.isAfter = si, as.isBefore = ri, as.isBetween = ai, as.isSame = hi, as.isSameOrAfter = di, as.isSameOrBefore = li, as.isValid = Pi, as.lang = es, as.locale = wi, as.localeData = xi, as.max = qn, as.min = Un, as.parsingFlags = Ii, as.set = rt, as.startOf = Di, as.subtract = ts, as.toArray = Mi, as.toObject = Oi, as.toDate = Ti, as.toISOString = mi, as.inspect = fi, as.toJSON = Ei, as.toString = ci, as.unix = Ci, as.valueOf = ki, as.creationData = Ai, as.year = bn, as.isLeapYear = et, as.weekYear = Li, as.isoWeekYear = Fi, as.quarter = as.quarters = zi, as.month = mt, as.daysInMonth = ft, as.week = as.weeks = Mt, as.isoWeek = as.isoWeeks = Ot, as.weeksInYear = ji, as.isoWeeksInYear = Hi, as.date = is, as.day = as.days = Ft, as.weekday = Ht, as.isoWeekday = jt, as.dayOfYear = Wi, as.hour = as.hours = An, as.minute = as.minutes = os, as.second = as.seconds = ns, as.millisecond = as.milliseconds = rs, as.utcOffset = je, as.utc = Ge, as.local = ze, as.parseZone = We, as.hasAlignedHourOffset = Ve, as.isDST = Be, as.isLocal = qe, as.isUtcOffset = Xe, as.isUtc = Ze, as.isUTC = Ze, as.zoneAbbr = Bi, as.zoneName = Ui, as.dates = D("dates accessor is deprecated. Use date instead.", is), as.months = D("months accessor is deprecated. Use month instead", mt), as.years = D("years accessor is deprecated. Use year instead", bn), as.zone = D("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Ye), as.isDSTShifted = D("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Ue);var hs = M.prototype;hs.calendar = O, hs.longDateFormat = E, hs.invalidDate = P, hs.ordinal = I, hs.preparse = Zi, hs.postformat = Zi, hs.relativeTime = N, hs.pastFuture = A, hs.set = C, hs.months = dt, hs.monthsShort = lt, hs.monthsParse = pt, hs.monthsRegex = vt, hs.monthsShortRegex = gt, hs.week = kt, hs.firstDayOfYear = Tt, hs.firstDayOfWeek = Ct, hs.weekdays = It, hs.weekdaysMin = At, hs.weekdaysShort = Nt, hs.weekdaysParse = Lt, hs.weekdaysRegex = Yt, hs.weekdaysShortRegex = Gt, hs.weekdaysMinRegex = zt, hs.isPM = Xt, hs.meridiem = Zt, Qt("en", { dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function ordinal(t) {
            var e = t % 10;return t + (1 === _(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th");
          } }), e.lang = D("moment.lang is deprecated. Use moment.locale instead.", Qt), e.langData = D("moment.langData is deprecated. Use moment.localeData instead.", ie);var ds = Math.abs,
            ls = fo("ms"),
            us = fo("s"),
            ps = fo("m"),
            cs = fo("h"),
            ms = fo("d"),
            fs = fo("w"),
            gs = fo("M"),
            vs = fo("y"),
            ys = yo("milliseconds"),
            bs = yo("seconds"),
            _s = yo("minutes"),
            ws = yo("hours"),
            xs = yo("days"),
            Ds = yo("months"),
            Ss = yo("years"),
            ks = Math.round,
            Cs = { ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11 },
            Ts = Math.abs,
            Ms = Ie.prototype;return Ms.isValid = Ee, Ms.abs = no, Ms.add = ro, Ms.subtract = ao, Ms.as = co, Ms.asMilliseconds = ls, Ms.asSeconds = us, Ms.asMinutes = ps, Ms.asHours = cs, Ms.asDays = ms, Ms.asWeeks = fs, Ms.asMonths = gs, Ms.asYears = vs, Ms.valueOf = mo, Ms._bubble = lo, Ms.clone = go, Ms.get = vo, Ms.milliseconds = ys, Ms.seconds = bs, Ms.minutes = _s, Ms.hours = ws, Ms.days = xs, Ms.weeks = bo, Ms.months = Ds, Ms.years = Ss, Ms.humanize = So, Ms.toISOString = Co, Ms.toString = Co, Ms.toJSON = Co, Ms.locale = wi, Ms.localeData = xi, Ms.toIsoString = D("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Co), Ms.lang = es, G("X", 0, 0, "unix"), G("x", 0, 0, "valueOf"), U("x", en), U("X", sn), K("X", function (t, e, i) {
          i._d = new Date(1e3 * parseFloat(t, 10));
        }), K("x", function (t, e, i) {
          i._d = new Date(_(t));
        }), e.version = "2.19.1", function (t) {
          To = t;
        }(ke), e.fn = as, e.min = Te, e.max = Me, e.now = Xn, e.utc = u, e.unix = qi, e.months = Qi, e.isDate = a, e.locale = Qt, e.invalid = f, e.duration = Ke, e.isMoment = y, e.weekdays = eo, e.parseZone = Xi, e.localeData = ie, e.isDuration = Ne, e.monthsShort = to, e.weekdaysMin = oo, e.defineLocale = te, e.updateLocale = ee, e.locales = oe, e.weekdaysShort = io, e.normalizeUnits = L, e.relativeTimeRounding = xo, e.relativeTimeThreshold = Do, e.calendarFormat = ii, e.prototype = as, e;
      });
    }).call(e, i(124)(t));
  }, function (t, e) {
    t.exports = function (t) {
      return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", { enumerable: !0, get: function get() {
          return t.l;
        } }), Object.defineProperty(t, "id", { enumerable: !0, get: function get() {
          return t.i;
        } }), t.webpackPolyfill = 1), t;
    };
  }, function (t, e) {
    function i(t) {
      throw new Error("Cannot find module '" + t + "'.");
    }i.keys = function () {
      return [];
    }, i.resolve = i, t.exports = i, i.id = 125;
  }, function (t, e, i) {
    (function (e) {
      function i(t, e, i) {
        var o = e && i || 0,
            n = 0;for (e = e || [], t.toLowerCase().replace(/[0-9a-f]{2}/g, function (t) {
          n < 16 && (e[o + n++] = u[t]);
        }); n < 16;) {
          e[o + n++] = 0;
        }return e;
      }function o(t, e) {
        var i = e || 0,
            o = l;return o[t[i++]] + o[t[i++]] + o[t[i++]] + o[t[i++]] + "-" + o[t[i++]] + o[t[i++]] + "-" + o[t[i++]] + o[t[i++]] + "-" + o[t[i++]] + o[t[i++]] + "-" + o[t[i++]] + o[t[i++]] + o[t[i++]] + o[t[i++]] + o[t[i++]] + o[t[i++]];
      }function n(t, e, i) {
        var n = e && i || 0,
            s = e || [];t = t || {};var r = void 0 !== t.clockseq ? t.clockseq : f,
            a = void 0 !== t.msecs ? t.msecs : new Date().getTime(),
            h = void 0 !== t.nsecs ? t.nsecs : v + 1,
            d = a - g + (h - v) / 1e4;if (d < 0 && void 0 === t.clockseq && (r = r + 1 & 16383), (d < 0 || a > g) && void 0 === t.nsecs && (h = 0), h >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");g = a, v = h, f = r, a += 122192928e5;var l = (1e4 * (268435455 & a) + h) % 4294967296;s[n++] = l >>> 24 & 255, s[n++] = l >>> 16 & 255, s[n++] = l >>> 8 & 255, s[n++] = 255 & l;var u = a / 4294967296 * 1e4 & 268435455;s[n++] = u >>> 8 & 255, s[n++] = 255 & u, s[n++] = u >>> 24 & 15 | 16, s[n++] = u >>> 16 & 255, s[n++] = r >>> 8 | 128, s[n++] = 255 & r;for (var p = t.node || m, c = 0; c < 6; c++) {
          s[n + c] = p[c];
        }return e || o(s);
      }function s(t, e, i) {
        var n = e && i || 0;"string" == typeof t && (e = "binary" == t ? new Array(16) : null, t = null), t = t || {};var s = t.random || (t.rng || r)();if (s[6] = 15 & s[6] | 64, s[8] = 63 & s[8] | 128, e) for (var a = 0; a < 16; a++) {
          e[n + a] = s[a];
        }return e || o(s);
      }var r,
          a = "undefined" != typeof window ? window : void 0 !== e ? e : null;if (a && a.crypto && crypto.getRandomValues) {
        var h = new Uint8Array(16);r = function r() {
          return crypto.getRandomValues(h), h;
        };
      }if (!r) {
        var d = new Array(16);r = function r() {
          for (var t, e = 0; e < 16; e++) {
            0 == (3 & e) && (t = 4294967296 * Math.random()), d[e] = t >>> ((3 & e) << 3) & 255;
          }return d;
        };
      }for (var l = [], u = {}, p = 0; p < 256; p++) {
        l[p] = (p + 256).toString(16).substr(1), u[l[p]] = p;
      }var c = r(),
          m = [1 | c[0], c[1], c[2], c[3], c[4], c[5]],
          f = 16383 & (c[6] << 8 | c[7]),
          g = 0,
          v = 0,
          y = s;y.v1 = n, y.v4 = s, y.parse = i, y.unparse = o, t.exports = y;
    }).call(e, i(127));
  }, function (t, e) {
    var i;i = function () {
      return this;
    }();try {
      i = i || Function("return this")() || (0, eval)("this");
    } catch (t) {
      "object" == typeof window && (i = window);
    }t.exports = i;
  }, function (t, e, i) {
    var o = i(2),
        n = o.JSON || (o.JSON = { stringify: JSON.stringify });t.exports = function (t) {
      return n.stringify.apply(n, arguments);
    };
  }, function (t, e, i) {
    function o(t, e, i, n) {
      if (!(this instanceof o)) throw new SyntaxError("Constructor must be called with the new operator");if (!(Array.isArray(i) || i instanceof d || i instanceof l) && i instanceof Object) {
        var s = n;n = i, i = s;
      }n && n.throttleRedraw && console.warn('Timeline option "throttleRedraw" is DEPRICATED and no longer supported. It will be removed in the next MAJOR release.');var r = this;if (this.defaultOptions = { start: null, end: null, autoResize: !0, orientation: { axis: "bottom", item: "bottom" }, moment: a, width: null, height: null, maxHeight: null, minHeight: null }, this.options = h.deepExtend({}, this.defaultOptions), this._create(t), !n || n && void 0 === n.rtl) {
        this.dom.root.style.visibility = "hidden";for (var p, f = this.dom.root; !p && f;) {
          p = window.getComputedStyle(f, null).direction, f = f.parentElement;
        }this.options.rtl = p && "rtl" == p.toLowerCase();
      } else this.options.rtl = n.rtl;this.options.rollingMode = n && n.rollingMode, this.options.onInitialDrawComplete = n && n.onInitialDrawComplete, this.components = [], this.body = { dom: this.dom, domProps: this.props, emitter: { on: this.on.bind(this), off: this.off.bind(this), emit: this.emit.bind(this) }, hiddenDates: [], util: { getScale: function getScale() {
            return r.timeAxis.step.scale;
          }, getStep: function getStep() {
            return r.timeAxis.step.step;
          }, toScreen: r._toScreen.bind(r), toGlobalScreen: r._toGlobalScreen.bind(r), toTime: r._toTime.bind(r), toGlobalTime: r._toGlobalTime.bind(r) } }, this.range = new u(this.body, this.options), this.components.push(this.range), this.body.range = this.range, this.timeAxis = new c(this.body, this.options), this.timeAxis2 = null, this.components.push(this.timeAxis), this.currentTime = new m(this.body, this.options), this.components.push(this.currentTime), this.itemSet = new g(this.body, this.options), this.components.push(this.itemSet), this.itemsData = null, this.groupsData = null, this.dom.root.onclick = function (t) {
        r.emit("click", r.getEventProperties(t));
      }, this.dom.root.ondblclick = function (t) {
        r.emit("doubleClick", r.getEventProperties(t));
      }, this.dom.root.oncontextmenu = function (t) {
        r.emit("contextmenu", r.getEventProperties(t));
      }, this.dom.root.onmouseover = function (t) {
        r.emit("mouseOver", r.getEventProperties(t));
      }, window.PointerEvent ? (this.dom.root.onpointerdown = function (t) {
        r.emit("mouseDown", r.getEventProperties(t));
      }, this.dom.root.onpointermove = function (t) {
        r.emit("mouseMove", r.getEventProperties(t));
      }, this.dom.root.onpointerup = function (t) {
        r.emit("mouseUp", r.getEventProperties(t));
      }) : (this.dom.root.onmousemove = function (t) {
        r.emit("mouseMove", r.getEventProperties(t));
      }, this.dom.root.onmousedown = function (t) {
        r.emit("mouseDown", r.getEventProperties(t));
      }, this.dom.root.onmouseup = function (t) {
        r.emit("mouseUp", r.getEventProperties(t));
      }), this.initialFitDone = !1, this.on("changed", function () {
        if (null != this.itemsData && !this.options.rollingMode) {
          if (!r.initialFitDone) if (r.initialFitDone = !0, void 0 != r.options.start || void 0 != r.options.end) {
            if (void 0 == r.options.start || void 0 == r.options.end) var t = r.getItemRange();var e = void 0 != r.options.start ? r.options.start : t.min,
                i = void 0 != r.options.end ? r.options.end : t.max;r.setWindow(e, i, { animation: !1 });
          } else r.fit({ animation: !1 });!r.initialDrawDone && r.initialRangeChangeDone && (r.initialDrawDone = !0, r.dom.root.style.visibility = "visible", r.options.onInitialDrawComplete && setTimeout(function () {
            return r.options.onInitialDrawComplete();
          }, 0));
        }
      }), n && this.setOptions(n), i && this.setGroups(i), e && this.setItems(e), this._redraw();
    }function n(t) {
      return h.convert(t.data.start, "Date").valueOf();
    }function s(t) {
      var e = void 0 != t.data.end ? t.data.end : t.data.start;return h.convert(e, "Date").valueOf();
    }function r(t, e) {
      var i = t.props.leftContainer.height,
          o = t.props.left.height,
          n = e.parent,
          s = n.top,
          r = !0,
          a = t.timeAxis.options.orientation.axis,
          h = function h() {
        return "bottom" == a ? n.height - e.top - e.height : e.top;
      },
          d = -1 * t._getScrollTop(),
          l = s + h(),
          u = e.height;return l < d ? s + i <= s + h() + u && (s += h() - t.itemSet.options.margin.item.vertical) : l + u > d + i ? s += h() + u - i + t.itemSet.options.margin.item.vertical : r = !1, s = Math.min(s, o - i), { shouldScroll: r, scrollOffset: s, itemTop: l };
    }var a = i(3),
        h = i(0),
        d = i(15),
        l = i(20),
        u = i(47),
        p = i(48),
        c = i(28),
        m = i(50),
        f = i(29),
        g = i(70),
        v = i(32).printStyle,
        y = i(75).allOptions,
        b = i(75).configureOptions,
        _ = i(76).default,
        w = i(32).default;o.prototype = new p(), o.prototype._createConfigurator = function () {
      return new _(this, this.dom.container, b);
    }, o.prototype.redraw = function () {
      this.itemSet && this.itemSet.markDirty({ refreshItems: !0 }), this._redraw();
    }, o.prototype.setOptions = function (t) {
      if (!0 === w.validate(t, y) && console.log("%cErrors have been found in the supplied options object.", v), p.prototype.setOptions.call(this, t), "type" in t && t.type !== this.options.type) {
        this.options.type = t.type;var e = this.itemsData;if (e) {
          var i = this.getSelection();this.setItems(null), this.setItems(e), this.setSelection(i);
        }
      }
    }, o.prototype.setItems = function (t) {
      var e;e = t ? t instanceof d || t instanceof l ? t : new d(t, { type: { start: "Date", end: "Date" } }) : null, this.itemsData = e, this.itemSet && this.itemSet.setItems(e);
    }, o.prototype.setGroups = function (t) {
      var e;if (t) {
        var i = function i(t) {
          return !1 !== t.visible;
        };e = t instanceof d || t instanceof l ? new l(t, { filter: i }) : new d(t.filter(i));
      } else e = null;this.groupsData = e, this.itemSet.setGroups(e);
    }, o.prototype.setData = function (t) {
      t && t.groups && this.setGroups(t.groups), t && t.items && this.setItems(t.items);
    }, o.prototype.setSelection = function (t, e) {
      this.itemSet && this.itemSet.setSelection(t), e && e.focus && this.focus(t, e);
    }, o.prototype.getSelection = function () {
      return this.itemSet && this.itemSet.getSelection() || [];
    }, o.prototype.focus = function (t, e) {
      if (this.itemsData && void 0 != t) {
        var i = Array.isArray(t) ? t : [t],
            o = this.itemsData.getDataSet().get(i, { type: { start: "Date", end: "Date" } }),
            n = null,
            s = null;if (o.forEach(function (t) {
          var e = t.start.valueOf(),
              i = "end" in t ? t.end.valueOf() : t.start.valueOf();(null === n || e < n) && (n = e), (null === s || i > s) && (s = i);
        }), null !== n && null !== s) {
          var a = this,
              h = this.itemSet.items[i[0]],
              d = -1 * this._getScrollTop(),
              l = null,
              u = function u(t, e, i) {
            var o = r(a, h);if (l || (l = o), l.itemTop != o.itemTop || l.shouldScroll) {
              l.itemTop != o.itemTop && o.shouldScroll && (l = o, d = -1 * a._getScrollTop());var n = d,
                  s = l.scrollOffset,
                  u = i ? s : n + (s - n) * t;a._setScrollTop(-u), e || a._redraw();
            }
          },
              p = function p() {
            var t = r(a, h);t.shouldScroll && t.itemTop != l.itemTop && (a._setScrollTop(-t.scrollOffset), a._redraw());
          },
              c = function c() {
            p(), setTimeout(p, 100);
          },
              m = (n + s) / 2,
              f = Math.max(this.range.end - this.range.start, 1.1 * (s - n)),
              g = !e || void 0 === e.animation || e.animation;g || (l = { shouldScroll: !1, scrollOffset: -1, itemTop: -1 }), this.range.setRange(m - f / 2, m + f / 2, { animation: g }, c, u);
        }
      }
    }, o.prototype.fit = function (t, e) {
      var i,
          o = !t || void 0 === t.animation || t.animation,
          n = this.itemsData && this.itemsData.getDataSet();1 === n.length && void 0 === n.get()[0].end ? (i = this.getDataRange(), this.moveTo(i.min.valueOf(), { animation: o }, e)) : (i = this.getItemRange(), this.range.setRange(i.min, i.max, { animation: o }, e));
    }, o.prototype.getItemRange = function () {
      var t = this.getDataRange(),
          e = null !== t.min ? t.min.valueOf() : null,
          i = null !== t.max ? t.max.valueOf() : null,
          o = null,
          r = null;if (null != e && null != i) {
        var a = i - e;a <= 0 && (a = 10);var d = a / this.props.center.width,
            l = {},
            u = 0;h.forEach(this.itemSet.items, function (t, e) {
          if (t.groupShowing) {
            l[e] = t.redraw(!0), u = l[e].length;
          }
        });if (u > 0) for (var p = 0; p < u; p++) {
          h.forEach(l, function (t) {
            t[p]();
          });
        }if (h.forEach(this.itemSet.items, function (t) {
          var a,
              h,
              l = n(t),
              u = s(t);this.options.rtl ? (a = l - (t.getWidthRight() + 10) * d, h = u + (t.getWidthLeft() + 10) * d) : (a = l - (t.getWidthLeft() + 10) * d, h = u + (t.getWidthRight() + 10) * d), a < e && (e = a, o = t), h > i && (i = h, r = t);
        }.bind(this)), o && r) {
          var c = o.getWidthLeft() + 10,
              m = r.getWidthRight() + 10,
              f = this.props.center.width - c - m;f > 0 && (this.options.rtl ? (e = n(o) - m * a / f, i = s(r) + c * a / f) : (e = n(o) - c * a / f, i = s(r) + m * a / f));
        }
      }return { min: null != e ? new Date(e) : null, max: null != i ? new Date(i) : null };
    }, o.prototype.getDataRange = function () {
      var t = null,
          e = null,
          i = this.itemsData && this.itemsData.getDataSet();return i && i.forEach(function (i) {
        var o = h.convert(i.start, "Date").valueOf(),
            n = h.convert(void 0 != i.end ? i.end : i.start, "Date").valueOf();(null === t || o < t) && (t = o), (null === e || n > e) && (e = n);
      }), { min: null != t ? new Date(t) : null, max: null != e ? new Date(e) : null };
    }, o.prototype.getEventProperties = function (t) {
      var e,
          i = t.center ? t.center.x : t.clientX,
          o = t.center ? t.center.y : t.clientY;e = this.options.rtl ? h.getAbsoluteRight(this.dom.centerContainer) - i : i - h.getAbsoluteLeft(this.dom.centerContainer);var n = o - h.getAbsoluteTop(this.dom.centerContainer),
          s = this.itemSet.itemFromTarget(t),
          r = this.itemSet.groupFromTarget(t),
          a = f.customTimeFromTarget(t),
          d = this.itemSet.options.snap || null,
          l = this.body.util.getScale(),
          u = this.body.util.getStep(),
          p = this._toTime(e),
          c = d ? d(p, l, u) : p,
          m = h.getTarget(t),
          g = null;return null != s ? g = "item" : null != a ? g = "custom-time" : h.hasParent(m, this.timeAxis.dom.foreground) ? g = "axis" : this.timeAxis2 && h.hasParent(m, this.timeAxis2.dom.foreground) ? g = "axis" : h.hasParent(m, this.itemSet.dom.labelSet) ? g = "group-label" : h.hasParent(m, this.currentTime.bar) ? g = "current-time" : h.hasParent(m, this.dom.center) && (g = "background"), { event: t, item: s ? s.id : null, group: r ? r.groupId : null, what: g, pageX: t.srcEvent ? t.srcEvent.pageX : t.pageX, pageY: t.srcEvent ? t.srcEvent.pageY : t.pageY, x: e, y: n, time: p, snappedTime: c };
    }, o.prototype.toggleRollingMode = function () {
      this.range.rolling ? this.range.stopRolling() : (void 0 == this.options.rollingMode && this.setOptions(this.options), this.range.startRolling());
    }, t.exports = o;
  }, function (t, e, i) {
    var o, n, s;!function (i) {
      n = [], o = i, void 0 !== (s = "function" == typeof o ? o.apply(e, n) : o) && (t.exports = s);
    }(function () {
      var t = null;return function e(i, o) {
        function n(t) {
          return t.match(/[^ ]+/g);
        }function s(e) {
          if ("hammer.input" !== e.type) {
            if (e.srcEvent._handled || (e.srcEvent._handled = {}), e.srcEvent._handled[e.type]) return;e.srcEvent._handled[e.type] = !0;
          }var i = !1;e.stopPropagation = function () {
            i = !0;
          };var o = e.srcEvent.stopPropagation.bind(e.srcEvent);"function" == typeof o && (e.srcEvent.stopPropagation = function () {
            o(), e.stopPropagation();
          }), e.firstTarget = t;for (var n = t; n && !i;) {
            var s = n.hammer;if (s) for (var r, a = 0; a < s.length; a++) {
              if (r = s[a]._handlers[e.type]) for (var h = 0; h < r.length && !i; h++) {
                r[h](e);
              }
            }n = n.parentNode;
          }
        }var r = o || { preventDefault: !1 };if (i.Manager) {
          var a = i,
              h = function h(t, i) {
            var o = Object.create(r);return i && a.assign(o, i), e(new a(t, o), o);
          };return a.assign(h, a), h.Manager = function (t, i) {
            var o = Object.create(r);return i && a.assign(o, i), e(new a.Manager(t, o), o);
          }, h;
        }var d = Object.create(i),
            l = i.element;return l.hammer || (l.hammer = []), l.hammer.push(d), i.on("hammer.input", function (e) {
          !0 !== r.preventDefault && r.preventDefault !== e.pointerType || e.preventDefault(), e.isFirst && (t = e.target);
        }), d._handlers = {}, d.on = function (t, e) {
          return n(t).forEach(function (t) {
            var o = d._handlers[t];o || (d._handlers[t] = o = [], i.on(t, s)), o.push(e);
          }), d;
        }, d.off = function (t, e) {
          return n(t).forEach(function (t) {
            var o = d._handlers[t];o && (o = e ? o.filter(function (t) {
              return t !== e;
            }) : [], o.length > 0 ? d._handlers[t] = o : (i.off(t, s), delete d._handlers[t]));
          }), d;
        }, d.emit = function (e, o) {
          t = o.target, i.emit(e, o);
        }, d.destroy = function () {
          var t = i.element.hammer,
              e = t.indexOf(d);-1 !== e && t.splice(e, 1), t.length || delete i.element.hammer, d._handlers = {}, i.destroy();
        }, d;
      };
    });
  }, function (t, e, i) {
    var o; /*! Hammer.JS - v2.0.7 - 2016-04-22
           * http://hammerjs.github.io/
           *
           * Copyright (c) 2016 Jorik Tangelder;
           * Licensed under the MIT license */
    !function (n, s, r, a) {
      function h(t, e, i) {
        return setTimeout(c(t, i), e);
      }function d(t, e, i) {
        return !!Array.isArray(t) && (l(t, i[e], i), !0);
      }function l(t, e, i) {
        var o;if (t) if (t.forEach) t.forEach(e, i);else if (t.length !== a) for (o = 0; o < t.length;) {
          e.call(i, t[o], o, t), o++;
        } else for (o in t) {
          t.hasOwnProperty(o) && e.call(i, t[o], o, t);
        }
      }function u(t, e, i) {
        var o = "DEPRECATED METHOD: " + e + "\n" + i + " AT \n";return function () {
          var e = new Error("get-stack-trace"),
              i = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
              s = n.console && (n.console.warn || n.console.log);return s && s.call(n.console, o, i), t.apply(this, arguments);
        };
      }function p(t, e, i) {
        var o,
            n = e.prototype;o = t.prototype = Object.create(n), o.constructor = t, o._super = n, i && mt(o, i);
      }function c(t, e) {
        return function () {
          return t.apply(e, arguments);
        };
      }function m(t, e) {
        return typeof t == vt ? t.apply(e ? e[0] || a : a, e) : t;
      }function f(t, e) {
        return t === a ? e : t;
      }function g(t, e, i) {
        l(_(e), function (e) {
          t.addEventListener(e, i, !1);
        });
      }function v(t, e, i) {
        l(_(e), function (e) {
          t.removeEventListener(e, i, !1);
        });
      }function y(t, e) {
        for (; t;) {
          if (t == e) return !0;t = t.parentNode;
        }return !1;
      }function b(t, e) {
        return t.indexOf(e) > -1;
      }function _(t) {
        return t.trim().split(/\s+/g);
      }function w(t, e, i) {
        if (t.indexOf && !i) return t.indexOf(e);for (var o = 0; o < t.length;) {
          if (i && t[o][i] == e || !i && t[o] === e) return o;o++;
        }return -1;
      }function x(t) {
        return Array.prototype.slice.call(t, 0);
      }function D(t, e, i) {
        for (var o = [], n = [], s = 0; s < t.length;) {
          var r = e ? t[s][e] : t[s];w(n, r) < 0 && o.push(t[s]), n[s] = r, s++;
        }return i && (o = e ? o.sort(function (t, i) {
          return t[e] > i[e];
        }) : o.sort()), o;
      }function S(t, e) {
        for (var i, o, n = e[0].toUpperCase() + e.slice(1), s = 0; s < ft.length;) {
          if (i = ft[s], (o = i ? i + n : e) in t) return o;s++;
        }return a;
      }function k() {
        return Dt++;
      }function C(t) {
        var e = t.ownerDocument || t;return e.defaultView || e.parentWindow || n;
      }function T(t, e) {
        var i = this;this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function (e) {
          m(t.options.enable, [t]) && i.handler(e);
        }, this.init();
      }function M(t) {
        var e = t.options.inputClass;return new (e || (Ct ? z : Tt ? B : kt ? q : G))(t, O);
      }function O(t, e, i) {
        var o = i.pointers.length,
            n = i.changedPointers.length,
            s = e & Ot && o - n == 0,
            r = e & (Pt | It) && o - n == 0;i.isFirst = !!s, i.isFinal = !!r, s && (t.session = {}), i.eventType = e, E(t, i), t.emit("hammer.input", i), t.recognize(i), t.session.prevInput = i;
      }function E(t, e) {
        var i = t.session,
            o = e.pointers,
            n = o.length;i.firstInput || (i.firstInput = N(e)), n > 1 && !i.firstMultiple ? i.firstMultiple = N(e) : 1 === n && (i.firstMultiple = !1);var s = i.firstInput,
            r = i.firstMultiple,
            a = r ? r.center : s.center,
            h = e.center = A(o);e.timeStamp = _t(), e.deltaTime = e.timeStamp - s.timeStamp, e.angle = H(a, h), e.distance = F(a, h), P(i, e), e.offsetDirection = L(e.deltaX, e.deltaY);var d = R(e.deltaTime, e.deltaX, e.deltaY);e.overallVelocityX = d.x, e.overallVelocityY = d.y, e.overallVelocity = bt(d.x) > bt(d.y) ? d.x : d.y, e.scale = r ? Y(r.pointers, o) : 1, e.rotation = r ? j(r.pointers, o) : 0, e.maxPointers = i.prevInput ? e.pointers.length > i.prevInput.maxPointers ? e.pointers.length : i.prevInput.maxPointers : e.pointers.length, I(i, e);var l = t.element;y(e.srcEvent.target, l) && (l = e.srcEvent.target), e.target = l;
      }function P(t, e) {
        var i = e.center,
            o = t.offsetDelta || {},
            n = t.prevDelta || {},
            s = t.prevInput || {};e.eventType !== Ot && s.eventType !== Pt || (n = t.prevDelta = { x: s.deltaX || 0, y: s.deltaY || 0 }, o = t.offsetDelta = { x: i.x, y: i.y }), e.deltaX = n.x + (i.x - o.x), e.deltaY = n.y + (i.y - o.y);
      }function I(t, e) {
        var i,
            o,
            n,
            s,
            r = t.lastInterval || e,
            h = e.timeStamp - r.timeStamp;if (e.eventType != It && (h > Mt || r.velocity === a)) {
          var d = e.deltaX - r.deltaX,
              l = e.deltaY - r.deltaY,
              u = R(h, d, l);o = u.x, n = u.y, i = bt(u.x) > bt(u.y) ? u.x : u.y, s = L(d, l), t.lastInterval = e;
        } else i = r.velocity, o = r.velocityX, n = r.velocityY, s = r.direction;e.velocity = i, e.velocityX = o, e.velocityY = n, e.direction = s;
      }function N(t) {
        for (var e = [], i = 0; i < t.pointers.length;) {
          e[i] = { clientX: yt(t.pointers[i].clientX), clientY: yt(t.pointers[i].clientY) }, i++;
        }return { timeStamp: _t(), pointers: e, center: A(e), deltaX: t.deltaX, deltaY: t.deltaY };
      }function A(t) {
        var e = t.length;if (1 === e) return { x: yt(t[0].clientX), y: yt(t[0].clientY) };for (var i = 0, o = 0, n = 0; n < e;) {
          i += t[n].clientX, o += t[n].clientY, n++;
        }return { x: yt(i / e), y: yt(o / e) };
      }function R(t, e, i) {
        return { x: e / t || 0, y: i / t || 0 };
      }function L(t, e) {
        return t === e ? Nt : bt(t) >= bt(e) ? t < 0 ? At : Rt : e < 0 ? Lt : Ft;
      }function F(t, e, i) {
        i || (i = Gt);var o = e[i[0]] - t[i[0]],
            n = e[i[1]] - t[i[1]];return Math.sqrt(o * o + n * n);
      }function H(t, e, i) {
        i || (i = Gt);var o = e[i[0]] - t[i[0]],
            n = e[i[1]] - t[i[1]];return 180 * Math.atan2(n, o) / Math.PI;
      }function j(t, e) {
        return H(e[1], e[0], zt) + H(t[1], t[0], zt);
      }function Y(t, e) {
        return F(e[0], e[1], zt) / F(t[0], t[1], zt);
      }function G() {
        this.evEl = Vt, this.evWin = Bt, this.pressed = !1, T.apply(this, arguments);
      }function z() {
        this.evEl = Xt, this.evWin = Zt, T.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
      }function W() {
        this.evTarget = Jt, this.evWin = $t, this.started = !1, T.apply(this, arguments);
      }function V(t, e) {
        var i = x(t.touches),
            o = x(t.changedTouches);return e & (Pt | It) && (i = D(i.concat(o), "identifier", !0)), [i, o];
      }function B() {
        this.evTarget = te, this.targetIds = {}, T.apply(this, arguments);
      }function U(t, e) {
        var i = x(t.touches),
            o = this.targetIds;if (e & (Ot | Et) && 1 === i.length) return o[i[0].identifier] = !0, [i, i];var n,
            s,
            r = x(t.changedTouches),
            a = [],
            h = this.target;if (s = i.filter(function (t) {
          return y(t.target, h);
        }), e === Ot) for (n = 0; n < s.length;) {
          o[s[n].identifier] = !0, n++;
        }for (n = 0; n < r.length;) {
          o[r[n].identifier] && a.push(r[n]), e & (Pt | It) && delete o[r[n].identifier], n++;
        }return a.length ? [D(s.concat(a), "identifier", !0), a] : void 0;
      }function q() {
        T.apply(this, arguments);var t = c(this.handler, this);this.touch = new B(this.manager, t), this.mouse = new G(this.manager, t), this.primaryTouch = null, this.lastTouches = [];
      }function X(t, e) {
        t & Ot ? (this.primaryTouch = e.changedPointers[0].identifier, Z.call(this, e)) : t & (Pt | It) && Z.call(this, e);
      }function Z(t) {
        var e = t.changedPointers[0];if (e.identifier === this.primaryTouch) {
          var i = { x: e.clientX, y: e.clientY };this.lastTouches.push(i);var o = this.lastTouches,
              n = function n() {
            var t = o.indexOf(i);t > -1 && o.splice(t, 1);
          };setTimeout(n, ee);
        }
      }function K(t) {
        for (var e = t.srcEvent.clientX, i = t.srcEvent.clientY, o = 0; o < this.lastTouches.length; o++) {
          var n = this.lastTouches[o],
              s = Math.abs(e - n.x),
              r = Math.abs(i - n.y);if (s <= ie && r <= ie) return !0;
        }return !1;
      }function J(t, e) {
        this.manager = t, this.set(e);
      }function $(t) {
        if (b(t, ae)) return ae;var e = b(t, he),
            i = b(t, de);return e && i ? ae : e || i ? e ? he : de : b(t, re) ? re : se;
      }function Q(t) {
        this.options = mt({}, this.defaults, t || {}), this.id = k(), this.manager = null, this.options.enable = f(this.options.enable, !0), this.state = ue, this.simultaneous = {}, this.requireFail = [];
      }function tt(t) {
        return t & ge ? "cancel" : t & me ? "end" : t & ce ? "move" : t & pe ? "start" : "";
      }function et(t) {
        return t == Ft ? "down" : t == Lt ? "up" : t == At ? "left" : t == Rt ? "right" : "";
      }function it(t, e) {
        var i = e.manager;return i ? i.get(t) : t;
      }function ot() {
        Q.apply(this, arguments);
      }function nt() {
        ot.apply(this, arguments), this.pX = null, this.pY = null;
      }function st() {
        ot.apply(this, arguments);
      }function rt() {
        Q.apply(this, arguments), this._timer = null, this._input = null;
      }function at() {
        ot.apply(this, arguments);
      }function ht() {
        ot.apply(this, arguments);
      }function dt() {
        Q.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
      }function lt(t, e) {
        return e = e || {}, e.recognizers = f(e.recognizers, lt.defaults.preset), new ut(t, e);
      }function ut(t, e) {
        this.options = mt({}, lt.defaults, e || {}), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = t, this.input = M(this), this.touchAction = new J(this, this.options.touchAction), pt(this, !0), l(this.options.recognizers, function (t) {
          var e = this.add(new t[0](t[1]));t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3]);
        }, this);
      }function pt(t, e) {
        var i = t.element;if (i.style) {
          var o;l(t.options.cssProps, function (n, s) {
            o = S(i.style, s), e ? (t.oldCssProps[o] = i.style[o], i.style[o] = n) : i.style[o] = t.oldCssProps[o] || "";
          }), e || (t.oldCssProps = {});
        }
      }function ct(t, e) {
        var i = s.createEvent("Event");i.initEvent(t, !0, !0), i.gesture = e, e.target.dispatchEvent(i);
      }var mt,
          ft = ["", "webkit", "Moz", "MS", "ms", "o"],
          gt = s.createElement("div"),
          vt = "function",
          yt = Math.round,
          bt = Math.abs,
          _t = Date.now;mt = "function" != typeof Object.assign ? function (t) {
        if (t === a || null === t) throw new TypeError("Cannot convert undefined or null to object");for (var e = Object(t), i = 1; i < arguments.length; i++) {
          var o = arguments[i];if (o !== a && null !== o) for (var n in o) {
            o.hasOwnProperty(n) && (e[n] = o[n]);
          }
        }return e;
      } : Object.assign;var wt = u(function (t, e, i) {
        for (var o = Object.keys(e), n = 0; n < o.length;) {
          (!i || i && t[o[n]] === a) && (t[o[n]] = e[o[n]]), n++;
        }return t;
      }, "extend", "Use `assign`."),
          xt = u(function (t, e) {
        return wt(t, e, !0);
      }, "merge", "Use `assign`."),
          Dt = 1,
          St = /mobile|tablet|ip(ad|hone|od)|android/i,
          kt = "ontouchstart" in n,
          Ct = S(n, "PointerEvent") !== a,
          Tt = kt && St.test(navigator.userAgent),
          Mt = 25,
          Ot = 1,
          Et = 2,
          Pt = 4,
          It = 8,
          Nt = 1,
          At = 2,
          Rt = 4,
          Lt = 8,
          Ft = 16,
          Ht = At | Rt,
          jt = Lt | Ft,
          Yt = Ht | jt,
          Gt = ["x", "y"],
          zt = ["clientX", "clientY"];T.prototype = { handler: function handler() {}, init: function init() {
          this.evEl && g(this.element, this.evEl, this.domHandler), this.evTarget && g(this.target, this.evTarget, this.domHandler), this.evWin && g(C(this.element), this.evWin, this.domHandler);
        }, destroy: function destroy() {
          this.evEl && v(this.element, this.evEl, this.domHandler), this.evTarget && v(this.target, this.evTarget, this.domHandler), this.evWin && v(C(this.element), this.evWin, this.domHandler);
        } };var Wt = { mousedown: Ot, mousemove: Et, mouseup: Pt },
          Vt = "mousedown",
          Bt = "mousemove mouseup";p(G, T, { handler: function handler(t) {
          var e = Wt[t.type];e & Ot && 0 === t.button && (this.pressed = !0), e & Et && 1 !== t.which && (e = Pt), this.pressed && (e & Pt && (this.pressed = !1), this.callback(this.manager, e, { pointers: [t], changedPointers: [t], pointerType: "mouse", srcEvent: t }));
        } });var Ut = { pointerdown: Ot, pointermove: Et, pointerup: Pt, pointercancel: It, pointerout: It },
          qt = { 2: "touch", 3: "pen", 4: "mouse", 5: "kinect" },
          Xt = "pointerdown",
          Zt = "pointermove pointerup pointercancel";n.MSPointerEvent && !n.PointerEvent && (Xt = "MSPointerDown", Zt = "MSPointerMove MSPointerUp MSPointerCancel"), p(z, T, { handler: function handler(t) {
          var e = this.store,
              i = !1,
              o = t.type.toLowerCase().replace("ms", ""),
              n = Ut[o],
              s = qt[t.pointerType] || t.pointerType,
              r = "touch" == s,
              a = w(e, t.pointerId, "pointerId");n & Ot && (0 === t.button || r) ? a < 0 && (e.push(t), a = e.length - 1) : n & (Pt | It) && (i = !0), a < 0 || (e[a] = t, this.callback(this.manager, n, { pointers: e, changedPointers: [t], pointerType: s, srcEvent: t }), i && e.splice(a, 1));
        } });var Kt = { touchstart: Ot, touchmove: Et, touchend: Pt, touchcancel: It },
          Jt = "touchstart",
          $t = "touchstart touchmove touchend touchcancel";p(W, T, { handler: function handler(t) {
          var e = Kt[t.type];if (e === Ot && (this.started = !0), this.started) {
            var i = V.call(this, t, e);e & (Pt | It) && i[0].length - i[1].length == 0 && (this.started = !1), this.callback(this.manager, e, { pointers: i[0], changedPointers: i[1], pointerType: "touch", srcEvent: t });
          }
        } });var Qt = { touchstart: Ot, touchmove: Et, touchend: Pt, touchcancel: It },
          te = "touchstart touchmove touchend touchcancel";p(B, T, { handler: function handler(t) {
          var e = Qt[t.type],
              i = U.call(this, t, e);i && this.callback(this.manager, e, { pointers: i[0], changedPointers: i[1], pointerType: "touch", srcEvent: t });
        } });var ee = 2500,
          ie = 25;p(q, T, { handler: function handler(t, e, i) {
          var o = "touch" == i.pointerType,
              n = "mouse" == i.pointerType;if (!(n && i.sourceCapabilities && i.sourceCapabilities.firesTouchEvents)) {
            if (o) X.call(this, e, i);else if (n && K.call(this, i)) return;this.callback(t, e, i);
          }
        }, destroy: function destroy() {
          this.touch.destroy(), this.mouse.destroy();
        } });var oe = S(gt.style, "touchAction"),
          ne = oe !== a,
          se = "auto",
          re = "manipulation",
          ae = "none",
          he = "pan-x",
          de = "pan-y",
          le = function () {
        if (!ne) return !1;var t = {},
            e = n.CSS && n.CSS.supports;return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (i) {
          t[i] = !e || n.CSS.supports("touch-action", i);
        }), t;
      }();J.prototype = { set: function set(t) {
          "compute" == t && (t = this.compute()), ne && this.manager.element.style && le[t] && (this.manager.element.style[oe] = t), this.actions = t.toLowerCase().trim();
        }, update: function update() {
          this.set(this.manager.options.touchAction);
        }, compute: function compute() {
          var t = [];return l(this.manager.recognizers, function (e) {
            m(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()));
          }), $(t.join(" "));
        }, preventDefaults: function preventDefaults(t) {
          var e = t.srcEvent,
              i = t.offsetDirection;if (this.manager.session.prevented) return void e.preventDefault();var o = this.actions,
              n = b(o, ae) && !le[ae],
              s = b(o, de) && !le[de],
              r = b(o, he) && !le[he];if (n) {
            var a = 1 === t.pointers.length,
                h = t.distance < 2,
                d = t.deltaTime < 250;if (a && h && d) return;
          }return r && s ? void 0 : n || s && i & Ht || r && i & jt ? this.preventSrc(e) : void 0;
        }, preventSrc: function preventSrc(t) {
          this.manager.session.prevented = !0, t.preventDefault();
        } };var ue = 1,
          pe = 2,
          ce = 4,
          me = 8,
          fe = me,
          ge = 16;Q.prototype = { defaults: {}, set: function set(t) {
          return mt(this.options, t), this.manager && this.manager.touchAction.update(), this;
        }, recognizeWith: function recognizeWith(t) {
          if (d(t, "recognizeWith", this)) return this;var e = this.simultaneous;return t = it(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this;
        }, dropRecognizeWith: function dropRecognizeWith(t) {
          return d(t, "dropRecognizeWith", this) ? this : (t = it(t, this), delete this.simultaneous[t.id], this);
        }, requireFailure: function requireFailure(t) {
          if (d(t, "requireFailure", this)) return this;var e = this.requireFail;return t = it(t, this), -1 === w(e, t) && (e.push(t), t.requireFailure(this)), this;
        }, dropRequireFailure: function dropRequireFailure(t) {
          if (d(t, "dropRequireFailure", this)) return this;t = it(t, this);var e = w(this.requireFail, t);return e > -1 && this.requireFail.splice(e, 1), this;
        }, hasRequireFailures: function hasRequireFailures() {
          return this.requireFail.length > 0;
        }, canRecognizeWith: function canRecognizeWith(t) {
          return !!this.simultaneous[t.id];
        }, emit: function emit(t) {
          function e(e) {
            i.manager.emit(e, t);
          }var i = this,
              o = this.state;o < me && e(i.options.event + tt(o)), e(i.options.event), t.additionalEvent && e(t.additionalEvent), o >= me && e(i.options.event + tt(o));
        }, tryEmit: function tryEmit(t) {
          if (this.canEmit()) return this.emit(t);this.state = 32;
        }, canEmit: function canEmit() {
          for (var t = 0; t < this.requireFail.length;) {
            if (!(this.requireFail[t].state & (32 | ue))) return !1;t++;
          }return !0;
        }, recognize: function recognize(t) {
          var e = mt({}, t);if (!m(this.options.enable, [this, e])) return this.reset(), void (this.state = 32);this.state & (fe | ge | 32) && (this.state = ue), this.state = this.process(e), this.state & (pe | ce | me | ge) && this.tryEmit(e);
        }, process: function process(t) {}, getTouchAction: function getTouchAction() {}, reset: function reset() {} }, p(ot, Q, { defaults: { pointers: 1 }, attrTest: function attrTest(t) {
          var e = this.options.pointers;return 0 === e || t.pointers.length === e;
        }, process: function process(t) {
          var e = this.state,
              i = t.eventType,
              o = e & (pe | ce),
              n = this.attrTest(t);return o && (i & It || !n) ? e | ge : o || n ? i & Pt ? e | me : e & pe ? e | ce : pe : 32;
        } }), p(nt, ot, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Yt }, getTouchAction: function getTouchAction() {
          var t = this.options.direction,
              e = [];return t & Ht && e.push(de), t & jt && e.push(he), e;
        }, directionTest: function directionTest(t) {
          var e = this.options,
              i = !0,
              o = t.distance,
              n = t.direction,
              s = t.deltaX,
              r = t.deltaY;return n & e.direction || (e.direction & Ht ? (n = 0 === s ? Nt : s < 0 ? At : Rt, i = s != this.pX, o = Math.abs(t.deltaX)) : (n = 0 === r ? Nt : r < 0 ? Lt : Ft, i = r != this.pY, o = Math.abs(t.deltaY))), t.direction = n, i && o > e.threshold && n & e.direction;
        }, attrTest: function attrTest(t) {
          return ot.prototype.attrTest.call(this, t) && (this.state & pe || !(this.state & pe) && this.directionTest(t));
        }, emit: function emit(t) {
          this.pX = t.deltaX, this.pY = t.deltaY;var e = et(t.direction);e && (t.additionalEvent = this.options.event + e), this._super.emit.call(this, t);
        } }), p(st, ot, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function getTouchAction() {
          return [ae];
        }, attrTest: function attrTest(t) {
          return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & pe);
        }, emit: function emit(t) {
          if (1 !== t.scale) {
            var e = t.scale < 1 ? "in" : "out";t.additionalEvent = this.options.event + e;
          }this._super.emit.call(this, t);
        } }), p(rt, Q, { defaults: { event: "press", pointers: 1, time: 251, threshold: 9 }, getTouchAction: function getTouchAction() {
          return [se];
        }, process: function process(t) {
          var e = this.options,
              i = t.pointers.length === e.pointers,
              o = t.distance < e.threshold,
              n = t.deltaTime > e.time;if (this._input = t, !o || !i || t.eventType & (Pt | It) && !n) this.reset();else if (t.eventType & Ot) this.reset(), this._timer = h(function () {
            this.state = fe, this.tryEmit();
          }, e.time, this);else if (t.eventType & Pt) return fe;return 32;
        }, reset: function reset() {
          clearTimeout(this._timer);
        }, emit: function emit(t) {
          this.state === fe && (t && t.eventType & Pt ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = _t(), this.manager.emit(this.options.event, this._input)));
        } }), p(at, ot, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function getTouchAction() {
          return [ae];
        }, attrTest: function attrTest(t) {
          return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & pe);
        } }), p(ht, ot, { defaults: { event: "swipe", threshold: 10, velocity: .3, direction: Ht | jt, pointers: 1 }, getTouchAction: function getTouchAction() {
          return nt.prototype.getTouchAction.call(this);
        }, attrTest: function attrTest(t) {
          var e,
              i = this.options.direction;return i & (Ht | jt) ? e = t.overallVelocity : i & Ht ? e = t.overallVelocityX : i & jt && (e = t.overallVelocityY), this._super.attrTest.call(this, t) && i & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && bt(e) > this.options.velocity && t.eventType & Pt;
        }, emit: function emit(t) {
          var e = et(t.offsetDirection);e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t);
        } }), p(dt, Q, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 }, getTouchAction: function getTouchAction() {
          return [re];
        }, process: function process(t) {
          var e = this.options,
              i = t.pointers.length === e.pointers,
              o = t.distance < e.threshold,
              n = t.deltaTime < e.time;if (this.reset(), t.eventType & Ot && 0 === this.count) return this.failTimeout();if (o && n && i) {
            if (t.eventType != Pt) return this.failTimeout();var s = !this.pTime || t.timeStamp - this.pTime < e.interval,
                r = !this.pCenter || F(this.pCenter, t.center) < e.posThreshold;this.pTime = t.timeStamp, this.pCenter = t.center, r && s ? this.count += 1 : this.count = 1, this._input = t;if (0 === this.count % e.taps) return this.hasRequireFailures() ? (this._timer = h(function () {
              this.state = fe, this.tryEmit();
            }, e.interval, this), pe) : fe;
          }return 32;
        }, failTimeout: function failTimeout() {
          return this._timer = h(function () {
            this.state = 32;
          }, this.options.interval, this), 32;
        }, reset: function reset() {
          clearTimeout(this._timer);
        }, emit: function emit() {
          this.state == fe && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
        } }), lt.VERSION = "2.0.7", lt.defaults = { domEvents: !1, touchAction: "compute", enable: !0, inputTarget: null, inputClass: null, preset: [[at, { enable: !1 }], [st, { enable: !1 }, ["rotate"]], [ht, { direction: Ht }], [nt, { direction: Ht }, ["swipe"]], [dt], [dt, { event: "doubletap", taps: 2 }, ["tap"]], [rt]], cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } };ut.prototype = { set: function set(t) {
          return mt(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this;
        }, stop: function stop(t) {
          this.session.stopped = t ? 2 : 1;
        }, recognize: function recognize(t) {
          var e = this.session;if (!e.stopped) {
            this.touchAction.preventDefaults(t);var i,
                o = this.recognizers,
                n = e.curRecognizer;(!n || n && n.state & fe) && (n = e.curRecognizer = null);for (var s = 0; s < o.length;) {
              i = o[s], 2 === e.stopped || n && i != n && !i.canRecognizeWith(n) ? i.reset() : i.recognize(t), !n && i.state & (pe | ce | me) && (n = e.curRecognizer = i), s++;
            }
          }
        }, get: function get(t) {
          if (t instanceof Q) return t;for (var e = this.recognizers, i = 0; i < e.length; i++) {
            if (e[i].options.event == t) return e[i];
          }return null;
        }, add: function add(t) {
          if (d(t, "add", this)) return this;var e = this.get(t.options.event);return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t;
        }, remove: function remove(t) {
          if (d(t, "remove", this)) return this;if (t = this.get(t)) {
            var e = this.recognizers,
                i = w(e, t);-1 !== i && (e.splice(i, 1), this.touchAction.update());
          }return this;
        }, on: function on(t, e) {
          if (t !== a && e !== a) {
            var i = this.handlers;return l(_(t), function (t) {
              i[t] = i[t] || [], i[t].push(e);
            }), this;
          }
        }, off: function off(t, e) {
          if (t !== a) {
            var i = this.handlers;return l(_(t), function (t) {
              e ? i[t] && i[t].splice(w(i[t], e), 1) : delete i[t];
            }), this;
          }
        }, emit: function emit(t, e) {
          this.options.domEvents && ct(t, e);var i = this.handlers[t] && this.handlers[t].slice();if (i && i.length) {
            e.type = t, e.preventDefault = function () {
              e.srcEvent.preventDefault();
            };for (var o = 0; o < i.length;) {
              i[o](e), o++;
            }
          }
        }, destroy: function destroy() {
          this.element && pt(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
        } }, mt(lt, { INPUT_START: Ot, INPUT_MOVE: Et, INPUT_END: Pt, INPUT_CANCEL: It, STATE_POSSIBLE: ue, STATE_BEGAN: pe, STATE_CHANGED: ce, STATE_ENDED: me, STATE_RECOGNIZED: fe, STATE_CANCELLED: ge, STATE_FAILED: 32, DIRECTION_NONE: Nt, DIRECTION_LEFT: At, DIRECTION_RIGHT: Rt, DIRECTION_UP: Lt, DIRECTION_DOWN: Ft, DIRECTION_HORIZONTAL: Ht, DIRECTION_VERTICAL: jt, DIRECTION_ALL: Yt, Manager: ut, Input: T, TouchAction: J, TouchInput: B, MouseInput: G, PointerEventInput: z, TouchMouseInput: q, SingleTouchInput: W, Recognizer: Q, AttrRecognizer: ot, Tap: dt, Pan: nt, Swipe: ht, Pinch: st, Rotate: at, Press: rt, on: g, off: v, each: l, merge: xt, extend: wt, assign: mt, inherit: p, bindFn: c, prefixed: S }), (void 0 !== n ? n : "undefined" != typeof self ? self : {}).Hammer = lt, (o = function () {
        return lt;
      }.call(e, i, e, t)) !== a && (t.exports = o);
    }(window, document);
  }, function (t, e, i) {
    function o(t) {
      this.active = !1, this.dom = { container: t }, this.dom.overlay = document.createElement("div"), this.dom.overlay.className = "vis-overlay", this.dom.container.appendChild(this.dom.overlay), this.hammer = a(this.dom.overlay), this.hammer.on("tap", this._onTapOverlay.bind(this));var e = this;["tap", "doubletap", "press", "pinch", "pan", "panstart", "panmove", "panend"].forEach(function (t) {
        e.hammer.on(t, function (t) {
          t.stopPropagation();
        });
      }), document && document.body && (this.onClick = function (i) {
        n(i.target, t) || e.deactivate();
      }, document.body.addEventListener("click", this.onClick)), void 0 !== this.keycharm && this.keycharm.destroy(), this.keycharm = s(), this.escListener = this.deactivate.bind(this);
    }function n(t, e) {
      for (; t;) {
        if (t === e) return !0;t = t.parentNode;
      }return !1;
    }var s = i(68),
        r = i(66),
        a = i(12),
        h = i(0);r(o.prototype), o.current = null, o.prototype.destroy = function () {
      this.deactivate(), this.dom.overlay.parentNode.removeChild(this.dom.overlay), this.onClick && document.body.removeEventListener("click", this.onClick), this.hammer.destroy(), this.hammer = null;
    }, o.prototype.activate = function () {
      o.current && o.current.deactivate(), o.current = this, this.active = !0, this.dom.overlay.style.display = "none", h.addClassName(this.dom.container, "vis-active"), this.emit("change"), this.emit("activate"), this.keycharm.bind("esc", this.escListener);
    }, o.prototype.deactivate = function () {
      this.active = !1, this.dom.overlay.style.display = "", h.removeClassName(this.dom.container, "vis-active"), this.keycharm.unbind("esc", this.escListener), this.emit("change"), this.emit("deactivate");
    }, o.prototype._onTapOverlay = function (t) {
      this.activate(), t.stopPropagation();
    }, t.exports = o;
  }, function (t, e, i) {
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }Object.defineProperty(e, "__esModule", { value: !0 });var n = i(30),
        s = o(n),
        r = i(31),
        a = o(r),
        h = function () {
      function t(e, i) {
        (0, s.default)(this, t), this.container = e, this.overflowMethod = i || "cap", this.x = 0, this.y = 0, this.padding = 5, this.hidden = !1, this.frame = document.createElement("div"), this.frame.className = "vis-tooltip", this.container.appendChild(this.frame);
      }return (0, a.default)(t, [{ key: "setPosition", value: function value(t, e) {
          this.x = parseInt(t), this.y = parseInt(e);
        } }, { key: "setText", value: function value(t) {
          t instanceof Element ? (this.frame.innerHTML = "", this.frame.appendChild(t)) : this.frame.innerHTML = t;
        } }, { key: "show", value: function value(t) {
          if (void 0 === t && (t = !0), !0 === t) {
            var e = this.frame.clientHeight,
                i = this.frame.clientWidth,
                o = this.frame.parentNode.clientHeight,
                n = this.frame.parentNode.clientWidth,
                s = 0,
                r = 0;if ("flip" == this.overflowMethod) {
              var a = !1,
                  h = !0;this.y - e < this.padding && (h = !1), this.x + i > n - this.padding && (a = !0), s = a ? this.x - i : this.x, r = h ? this.y - e : this.y;
            } else r = this.y - e, r + e + this.padding > o && (r = o - e - this.padding), r < this.padding && (r = this.padding), s = this.x, s + i + this.padding > n && (s = n - i - this.padding), s < this.padding && (s = this.padding);this.frame.style.left = s + "px", this.frame.style.top = r + "px", this.frame.style.visibility = "visible", this.hidden = !1;
          } else this.hide();
        } }, { key: "hide", value: function value() {
          this.hidden = !0, this.frame.style.left = "0", this.frame.style.top = "0", this.frame.style.visibility = "hidden";
        } }, { key: "destroy", value: function value() {
          this.frame.parentNode.removeChild(this.frame);
        } }]), t;
    }();e.default = h;
  }, function (t, e, i) {
    t.exports = { default: i(135), __esModule: !0 };
  }, function (t, e, i) {
    i(136);var o = i(2).Object;t.exports = function (t, e, i) {
      return o.defineProperty(t, e, i);
    };
  }, function (t, e, i) {
    var o = i(17);o(o.S + o.F * !i(9), "Object", { defineProperty: i(8).f });
  }, function (t, e, i) {
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }Object.defineProperty(e, "__esModule", { value: !0 });var n = i(16),
        s = o(n),
        r = i(30),
        a = o(r),
        h = i(31),
        d = o(h),
        l = i(12),
        u = i(67),
        p = i(0),
        c = function () {
      function t() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;(0, a.default)(this, t), this.pixelRatio = e, this.generated = !1, this.centerCoordinates = { x: 144.5, y: 144.5 }, this.r = 289 * .49, this.color = { r: 255, g: 255, b: 255, a: 1 }, this.hueCircle = void 0, this.initialColor = { r: 255, g: 255, b: 255, a: 1 }, this.previousColor = void 0, this.applied = !1, this.updateCallback = function () {}, this.closeCallback = function () {}, this._create();
      }return (0, d.default)(t, [{ key: "insertTo", value: function value(t) {
          void 0 !== this.hammer && (this.hammer.destroy(), this.hammer = void 0), this.container = t, this.container.appendChild(this.frame), this._bindHammer(), this._setSize();
        } }, { key: "setUpdateCallback", value: function value(t) {
          if ("function" != typeof t) throw new Error("Function attempted to set as colorPicker update callback is not a function.");this.updateCallback = t;
        } }, { key: "setCloseCallback", value: function value(t) {
          if ("function" != typeof t) throw new Error("Function attempted to set as colorPicker closing callback is not a function.");this.closeCallback = t;
        } }, { key: "_isColorString", value: function value(t) {
          var e = { black: "#000000", navy: "#000080", darkblue: "#00008B", mediumblue: "#0000CD", blue: "#0000FF", darkgreen: "#006400", green: "#008000", teal: "#008080", darkcyan: "#008B8B", deepskyblue: "#00BFFF", darkturquoise: "#00CED1", mediumspringgreen: "#00FA9A", lime: "#00FF00", springgreen: "#00FF7F", aqua: "#00FFFF", cyan: "#00FFFF", midnightblue: "#191970", dodgerblue: "#1E90FF", lightseagreen: "#20B2AA", forestgreen: "#228B22", seagreen: "#2E8B57", darkslategray: "#2F4F4F", limegreen: "#32CD32", mediumseagreen: "#3CB371", turquoise: "#40E0D0", royalblue: "#4169E1", steelblue: "#4682B4", darkslateblue: "#483D8B", mediumturquoise: "#48D1CC", indigo: "#4B0082", darkolivegreen: "#556B2F", cadetblue: "#5F9EA0", cornflowerblue: "#6495ED", mediumaquamarine: "#66CDAA", dimgray: "#696969", slateblue: "#6A5ACD", olivedrab: "#6B8E23", slategray: "#708090", lightslategray: "#778899", mediumslateblue: "#7B68EE", lawngreen: "#7CFC00", chartreuse: "#7FFF00", aquamarine: "#7FFFD4", maroon: "#800000", purple: "#800080", olive: "#808000", gray: "#808080", skyblue: "#87CEEB", lightskyblue: "#87CEFA", blueviolet: "#8A2BE2", darkred: "#8B0000", darkmagenta: "#8B008B", saddlebrown: "#8B4513", darkseagreen: "#8FBC8F", lightgreen: "#90EE90", mediumpurple: "#9370D8", darkviolet: "#9400D3", palegreen: "#98FB98", darkorchid: "#9932CC", yellowgreen: "#9ACD32", sienna: "#A0522D", brown: "#A52A2A", darkgray: "#A9A9A9", lightblue: "#ADD8E6", greenyellow: "#ADFF2F", paleturquoise: "#AFEEEE", lightsteelblue: "#B0C4DE", powderblue: "#B0E0E6", firebrick: "#B22222", darkgoldenrod: "#B8860B", mediumorchid: "#BA55D3", rosybrown: "#BC8F8F", darkkhaki: "#BDB76B", silver: "#C0C0C0", mediumvioletred: "#C71585", indianred: "#CD5C5C", peru: "#CD853F", chocolate: "#D2691E", tan: "#D2B48C", lightgrey: "#D3D3D3", palevioletred: "#D87093", thistle: "#D8BFD8", orchid: "#DA70D6", goldenrod: "#DAA520", crimson: "#DC143C", gainsboro: "#DCDCDC", plum: "#DDA0DD", burlywood: "#DEB887", lightcyan: "#E0FFFF", lavender: "#E6E6FA", darksalmon: "#E9967A", violet: "#EE82EE", palegoldenrod: "#EEE8AA", lightcoral: "#F08080", khaki: "#F0E68C", aliceblue: "#F0F8FF", honeydew: "#F0FFF0", azure: "#F0FFFF", sandybrown: "#F4A460", wheat: "#F5DEB3", beige: "#F5F5DC", whitesmoke: "#F5F5F5", mintcream: "#F5FFFA", ghostwhite: "#F8F8FF", salmon: "#FA8072", antiquewhite: "#FAEBD7", linen: "#FAF0E6", lightgoldenrodyellow: "#FAFAD2", oldlace: "#FDF5E6", red: "#FF0000", fuchsia: "#FF00FF", magenta: "#FF00FF", deeppink: "#FF1493", orangered: "#FF4500", tomato: "#FF6347", hotpink: "#FF69B4", coral: "#FF7F50", darkorange: "#FF8C00", lightsalmon: "#FFA07A", orange: "#FFA500", lightpink: "#FFB6C1", pink: "#FFC0CB", gold: "#FFD700", peachpuff: "#FFDAB9", navajowhite: "#FFDEAD", moccasin: "#FFE4B5", bisque: "#FFE4C4", mistyrose: "#FFE4E1", blanchedalmond: "#FFEBCD", papayawhip: "#FFEFD5", lavenderblush: "#FFF0F5", seashell: "#FFF5EE", cornsilk: "#FFF8DC", lemonchiffon: "#FFFACD", floralwhite: "#FFFAF0", snow: "#FFFAFA", yellow: "#FFFF00", lightyellow: "#FFFFE0", ivory: "#FFFFF0", white: "#FFFFFF" };if ("string" == typeof t) return e[t];
        } }, { key: "setColor", value: function value(t) {
          var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];if ("none" !== t) {
            var i = void 0,
                o = this._isColorString(t);if (void 0 !== o && (t = o), !0 === p.isString(t)) {
              if (!0 === p.isValidRGB(t)) {
                var n = t.substr(4).substr(0, t.length - 5).split(",");i = { r: n[0], g: n[1], b: n[2], a: 1 };
              } else if (!0 === p.isValidRGBA(t)) {
                var r = t.substr(5).substr(0, t.length - 6).split(",");i = { r: r[0], g: r[1], b: r[2], a: r[3] };
              } else if (!0 === p.isValidHex(t)) {
                var a = p.hexToRGB(t);i = { r: a.r, g: a.g, b: a.b, a: 1 };
              }
            } else if (t instanceof Object && void 0 !== t.r && void 0 !== t.g && void 0 !== t.b) {
              var h = void 0 !== t.a ? t.a : "1.0";i = { r: t.r, g: t.g, b: t.b, a: h };
            }if (void 0 === i) throw new Error("Unknown color passed to the colorPicker. Supported are strings: rgb, hex, rgba. Object: rgb ({r:r,g:g,b:b,[a:a]}). Supplied: " + (0, s.default)(t));this._setColor(i, e);
          }
        } }, { key: "show", value: function value() {
          void 0 !== this.closeCallback && (this.closeCallback(), this.closeCallback = void 0), this.applied = !1, this.frame.style.display = "block", this._generateHueCircle();
        } }, { key: "_hide", value: function value() {
          var t = this;!0 === (!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]) && (this.previousColor = p.extend({}, this.color)), !0 === this.applied && this.updateCallback(this.initialColor), this.frame.style.display = "none", setTimeout(function () {
            void 0 !== t.closeCallback && (t.closeCallback(), t.closeCallback = void 0);
          }, 0);
        } }, { key: "_save", value: function value() {
          this.updateCallback(this.color), this.applied = !1, this._hide();
        } }, { key: "_apply", value: function value() {
          this.applied = !0, this.updateCallback(this.color), this._updatePicker(this.color);
        } }, { key: "_loadLast", value: function value() {
          void 0 !== this.previousColor ? this.setColor(this.previousColor, !1) : alert("There is no last color to load...");
        } }, { key: "_setColor", value: function value(t) {
          !0 === (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) && (this.initialColor = p.extend({}, t)), this.color = t;var e = p.RGBToHSV(t.r, t.g, t.b),
              i = 2 * Math.PI,
              o = this.r * e.s,
              n = this.centerCoordinates.x + o * Math.sin(i * e.h),
              s = this.centerCoordinates.y + o * Math.cos(i * e.h);this.colorPickerSelector.style.left = n - .5 * this.colorPickerSelector.clientWidth + "px", this.colorPickerSelector.style.top = s - .5 * this.colorPickerSelector.clientHeight + "px", this._updatePicker(t);
        } }, { key: "_setOpacity", value: function value(t) {
          this.color.a = t / 100, this._updatePicker(this.color);
        } }, { key: "_setBrightness", value: function value(t) {
          var e = p.RGBToHSV(this.color.r, this.color.g, this.color.b);e.v = t / 100;var i = p.HSVToRGB(e.h, e.s, e.v);i.a = this.color.a, this.color = i, this._updatePicker();
        } }, { key: "_updatePicker", value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.color,
              e = p.RGBToHSV(t.r, t.g, t.b),
              i = this.colorPickerCanvas.getContext("2d");void 0 === this.pixelRation && (this.pixelRatio = (window.devicePixelRatio || 1) / (i.webkitBackingStorePixelRatio || i.mozBackingStorePixelRatio || i.msBackingStorePixelRatio || i.oBackingStorePixelRatio || i.backingStorePixelRatio || 1)), i.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);var o = this.colorPickerCanvas.clientWidth,
              n = this.colorPickerCanvas.clientHeight;i.clearRect(0, 0, o, n), i.putImageData(this.hueCircle, 0, 0), i.fillStyle = "rgba(0,0,0," + (1 - e.v) + ")", i.circle(this.centerCoordinates.x, this.centerCoordinates.y, this.r), i.fill(), this.brightnessRange.value = 100 * e.v, this.opacityRange.value = 100 * t.a, this.initialColorDiv.style.backgroundColor = "rgba(" + this.initialColor.r + "," + this.initialColor.g + "," + this.initialColor.b + "," + this.initialColor.a + ")", this.newColorDiv.style.backgroundColor = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")";
        } }, { key: "_setSize", value: function value() {
          this.colorPickerCanvas.style.width = "100%", this.colorPickerCanvas.style.height = "100%", this.colorPickerCanvas.width = 289 * this.pixelRatio, this.colorPickerCanvas.height = 289 * this.pixelRatio;
        } }, { key: "_create", value: function value() {
          if (this.frame = document.createElement("div"), this.frame.className = "vis-color-picker", this.colorPickerDiv = document.createElement("div"), this.colorPickerSelector = document.createElement("div"), this.colorPickerSelector.className = "vis-selector", this.colorPickerDiv.appendChild(this.colorPickerSelector), this.colorPickerCanvas = document.createElement("canvas"), this.colorPickerDiv.appendChild(this.colorPickerCanvas), this.colorPickerCanvas.getContext) {
            var t = this.colorPickerCanvas.getContext("2d");this.pixelRatio = (window.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1), this.colorPickerCanvas.getContext("2d").setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
          } else {
            var e = document.createElement("DIV");e.style.color = "red", e.style.fontWeight = "bold", e.style.padding = "10px", e.innerHTML = "Error: your browser does not support HTML canvas", this.colorPickerCanvas.appendChild(e);
          }this.colorPickerDiv.className = "vis-color", this.opacityDiv = document.createElement("div"), this.opacityDiv.className = "vis-opacity", this.brightnessDiv = document.createElement("div"), this.brightnessDiv.className = "vis-brightness", this.arrowDiv = document.createElement("div"), this.arrowDiv.className = "vis-arrow", this.opacityRange = document.createElement("input");try {
            this.opacityRange.type = "range", this.opacityRange.min = "0", this.opacityRange.max = "100";
          } catch (t) {}this.opacityRange.value = "100", this.opacityRange.className = "vis-range", this.brightnessRange = document.createElement("input");try {
            this.brightnessRange.type = "range", this.brightnessRange.min = "0", this.brightnessRange.max = "100";
          } catch (t) {}this.brightnessRange.value = "100", this.brightnessRange.className = "vis-range", this.opacityDiv.appendChild(this.opacityRange), this.brightnessDiv.appendChild(this.brightnessRange);var i = this;this.opacityRange.onchange = function () {
            i._setOpacity(this.value);
          }, this.opacityRange.oninput = function () {
            i._setOpacity(this.value);
          }, this.brightnessRange.onchange = function () {
            i._setBrightness(this.value);
          }, this.brightnessRange.oninput = function () {
            i._setBrightness(this.value);
          }, this.brightnessLabel = document.createElement("div"), this.brightnessLabel.className = "vis-label vis-brightness", this.brightnessLabel.innerHTML = "brightness:", this.opacityLabel = document.createElement("div"), this.opacityLabel.className = "vis-label vis-opacity", this.opacityLabel.innerHTML = "opacity:", this.newColorDiv = document.createElement("div"), this.newColorDiv.className = "vis-new-color", this.newColorDiv.innerHTML = "new", this.initialColorDiv = document.createElement("div"), this.initialColorDiv.className = "vis-initial-color", this.initialColorDiv.innerHTML = "initial", this.cancelButton = document.createElement("div"), this.cancelButton.className = "vis-button vis-cancel", this.cancelButton.innerHTML = "cancel", this.cancelButton.onclick = this._hide.bind(this, !1), this.applyButton = document.createElement("div"), this.applyButton.className = "vis-button vis-apply", this.applyButton.innerHTML = "apply", this.applyButton.onclick = this._apply.bind(this), this.saveButton = document.createElement("div"), this.saveButton.className = "vis-button vis-save", this.saveButton.innerHTML = "save", this.saveButton.onclick = this._save.bind(this), this.loadButton = document.createElement("div"), this.loadButton.className = "vis-button vis-load", this.loadButton.innerHTML = "load last", this.loadButton.onclick = this._loadLast.bind(this), this.frame.appendChild(this.colorPickerDiv), this.frame.appendChild(this.arrowDiv), this.frame.appendChild(this.brightnessLabel), this.frame.appendChild(this.brightnessDiv), this.frame.appendChild(this.opacityLabel), this.frame.appendChild(this.opacityDiv), this.frame.appendChild(this.newColorDiv), this.frame.appendChild(this.initialColorDiv), this.frame.appendChild(this.cancelButton), this.frame.appendChild(this.applyButton), this.frame.appendChild(this.saveButton), this.frame.appendChild(this.loadButton);
        } }, { key: "_bindHammer", value: function value() {
          var t = this;this.drag = {}, this.pinch = {}, this.hammer = new l(this.colorPickerCanvas), this.hammer.get("pinch").set({ enable: !0 }), u.onTouch(this.hammer, function (e) {
            t._moveSelector(e);
          }), this.hammer.on("tap", function (e) {
            t._moveSelector(e);
          }), this.hammer.on("panstart", function (e) {
            t._moveSelector(e);
          }), this.hammer.on("panmove", function (e) {
            t._moveSelector(e);
          }), this.hammer.on("panend", function (e) {
            t._moveSelector(e);
          });
        } }, { key: "_generateHueCircle", value: function value() {
          if (!1 === this.generated) {
            var t = this.colorPickerCanvas.getContext("2d");void 0 === this.pixelRation && (this.pixelRatio = (window.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1)), t.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);var e = this.colorPickerCanvas.clientWidth,
                i = this.colorPickerCanvas.clientHeight;t.clearRect(0, 0, e, i);var o = void 0,
                n = void 0,
                s = void 0,
                r = void 0;this.centerCoordinates = { x: .5 * e, y: .5 * i }, this.r = .49 * e;var a = 2 * Math.PI / 360,
                h = 1 / this.r,
                d = void 0;for (s = 0; s < 360; s++) {
              for (r = 0; r < this.r; r++) {
                o = this.centerCoordinates.x + r * Math.sin(a * s), n = this.centerCoordinates.y + r * Math.cos(a * s), d = p.HSVToRGB(s * (1 / 360), r * h, 1), t.fillStyle = "rgb(" + d.r + "," + d.g + "," + d.b + ")", t.fillRect(o - .5, n - .5, 2, 2);
              }
            }t.strokeStyle = "rgba(0,0,0,1)", t.circle(this.centerCoordinates.x, this.centerCoordinates.y, this.r), t.stroke(), this.hueCircle = t.getImageData(0, 0, e, i);
          }this.generated = !0;
        } }, { key: "_moveSelector", value: function value(t) {
          var e = this.colorPickerDiv.getBoundingClientRect(),
              i = t.center.x - e.left,
              o = t.center.y - e.top,
              n = .5 * this.colorPickerDiv.clientHeight,
              s = .5 * this.colorPickerDiv.clientWidth,
              r = i - s,
              a = o - n,
              h = Math.atan2(r, a),
              d = .98 * Math.min(Math.sqrt(r * r + a * a), s),
              l = Math.cos(h) * d + n,
              u = Math.sin(h) * d + s;this.colorPickerSelector.style.top = l - .5 * this.colorPickerSelector.clientHeight + "px", this.colorPickerSelector.style.left = u - .5 * this.colorPickerSelector.clientWidth + "px";var c = h / (2 * Math.PI);c = c < 0 ? c + 1 : c;var m = d / this.r,
              f = p.RGBToHSV(this.color.r, this.color.g, this.color.b);f.h = c, f.s = m;var g = p.HSVToRGB(f.h, f.s, f.v);g.a = this.color.a, this.color = g, this.initialColorDiv.style.backgroundColor = "rgba(" + this.initialColor.r + "," + this.initialColor.g + "," + this.initialColor.b + "," + this.initialColor.a + ")", this.newColorDiv.style.backgroundColor = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")";
        } }]), t;
    }();e.default = c;
  }, function (t, e, i) {
    function o(t, e, i, o) {
      if (!(Array.isArray(i) || i instanceof r || i instanceof a) && i instanceof Object) {
        var d = o;o = i, i = d;
      }o && o.throttleRedraw && console.warn('Graph2d option "throttleRedraw" is DEPRICATED and no longer supported. It will be removed in the next MAJOR release.');var p = this;this.defaultOptions = { start: null, end: null, autoResize: !0, orientation: { axis: "bottom", item: "bottom" }, moment: n, width: null, height: null, maxHeight: null, minHeight: null }, this.options = s.deepExtend({}, this.defaultOptions), this._create(t), this.components = [], this.body = { dom: this.dom, domProps: this.props, emitter: { on: this.on.bind(this), off: this.off.bind(this), emit: this.emit.bind(this) }, hiddenDates: [], util: { toScreen: p._toScreen.bind(p), toGlobalScreen: p._toGlobalScreen.bind(p), toTime: p._toTime.bind(p), toGlobalTime: p._toGlobalTime.bind(p) } }, this.range = new h(this.body), this.components.push(this.range), this.body.range = this.range, this.timeAxis = new l(this.body), this.components.push(this.timeAxis), this.currentTime = new u(this.body), this.components.push(this.currentTime), this.linegraph = new c(this.body), this.components.push(this.linegraph), this.itemsData = null, this.groupsData = null, this.on("tap", function (t) {
        p.emit("click", p.getEventProperties(t));
      }), this.on("doubletap", function (t) {
        p.emit("doubleClick", p.getEventProperties(t));
      }), this.dom.root.oncontextmenu = function (t) {
        p.emit("contextmenu", p.getEventProperties(t));
      }, o && this.setOptions(o), i && this.setGroups(i), e && this.setItems(e), this._redraw();
    }var n = i(3),
        s = i(0),
        r = i(15),
        a = i(20),
        h = i(47),
        d = i(48),
        l = i(28),
        u = i(50),
        p = i(29),
        c = i(77),
        m = i(32).printStyle,
        f = i(84).allOptions,
        g = i(84).configureOptions,
        v = i(76).default,
        y = i(32).default;o.prototype = new d(), o.prototype.setOptions = function (t) {
      !0 === y.validate(t, f) && console.log("%cErrors have been found in the supplied options object.", m), d.prototype.setOptions.call(this, t);
    }, o.prototype.setItems = function (t) {
      var e,
          i = null == this.itemsData;if (e = t ? t instanceof r || t instanceof a ? t : new r(t, { type: { start: "Date", end: "Date" } }) : null, this.itemsData = e, this.linegraph && this.linegraph.setItems(e), i) if (void 0 != this.options.start || void 0 != this.options.end) {
        var o = void 0 != this.options.start ? this.options.start : null,
            n = void 0 != this.options.end ? this.options.end : null;this.setWindow(o, n, { animation: !1 });
      } else this.fit({ animation: !1 });
    }, o.prototype.setGroups = function (t) {
      var e;e = t ? t instanceof r || t instanceof a ? t : new r(t) : null, this.groupsData = e, this.linegraph.setGroups(e);
    }, o.prototype.getLegend = function (t, e, i) {
      return void 0 === e && (e = 15), void 0 === i && (i = 15), void 0 !== this.linegraph.groups[t] ? this.linegraph.groups[t].getLegend(e, i) : "cannot find group:'" + t + "'";
    }, o.prototype.isGroupVisible = function (t) {
      return void 0 !== this.linegraph.groups[t] && this.linegraph.groups[t].visible && (void 0 === this.linegraph.options.groups.visibility[t] || 1 == this.linegraph.options.groups.visibility[t]);
    }, o.prototype.getDataRange = function () {
      var t = null,
          e = null;for (var i in this.linegraph.groups) {
        if (this.linegraph.groups.hasOwnProperty(i) && 1 == this.linegraph.groups[i].visible) for (var o = 0; o < this.linegraph.groups[i].itemsData.length; o++) {
          var n = this.linegraph.groups[i].itemsData[o],
              r = s.convert(n.x, "Date").valueOf();t = null == t ? r : t > r ? r : t, e = null == e ? r : e < r ? r : e;
        }
      }return { min: null != t ? new Date(t) : null, max: null != e ? new Date(e) : null };
    }, o.prototype.getEventProperties = function (t) {
      var e = t.center ? t.center.x : t.clientX,
          i = t.center ? t.center.y : t.clientY,
          o = e - s.getAbsoluteLeft(this.dom.centerContainer),
          n = i - s.getAbsoluteTop(this.dom.centerContainer),
          r = this._toTime(o),
          a = p.customTimeFromTarget(t),
          h = s.getTarget(t),
          d = null;s.hasParent(h, this.timeAxis.dom.foreground) ? d = "axis" : this.timeAxis2 && s.hasParent(h, this.timeAxis2.dom.foreground) ? d = "axis" : s.hasParent(h, this.linegraph.yAxisLeft.dom.frame) ? d = "data-axis" : s.hasParent(h, this.linegraph.yAxisRight.dom.frame) ? d = "data-axis" : s.hasParent(h, this.linegraph.legendLeft.dom.frame) ? d = "legend" : s.hasParent(h, this.linegraph.legendRight.dom.frame) ? d = "legend" : null != a ? d = "custom-time" : s.hasParent(h, this.currentTime.bar) ? d = "current-time" : s.hasParent(h, this.dom.center) && (d = "background");var l = [],
          u = this.linegraph.yAxisLeft,
          c = this.linegraph.yAxisRight;return !u.hidden && this.itemsData.length > 0 && l.push(u.screenToValue(n)), !c.hidden && this.itemsData.length > 0 && l.push(c.screenToValue(n)), { event: t, what: d, pageX: t.srcEvent ? t.srcEvent.pageX : t.pageX, pageY: t.srcEvent ? t.srcEvent.pageY : t.pageY, x: o, y: n, time: r, value: l };
    }, o.prototype._createConfigurator = function () {
      return new v(this, this.dom.container, g);
    }, t.exports = o;
  }]);
});

/***/ }),

/***/ "khkS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;

var _assertString = __webpack_require__("d3m2");

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__("hxfi");

var _merge2 = _interopRequireDefault(_merge);

var _isByteLength = __webpack_require__("jY1m");

var _isByteLength2 = _interopRequireDefault(_isByteLength);

var _isFQDN = __webpack_require__("KGu6");

var _isFQDN2 = _interopRequireDefault(_isFQDN);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

function isEmail(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(displayName);
    if (display_email) {
      str = display_email[1];
    } else if (options.require_display_name) {
      return false;
    }
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var user = parts.join('@');

  var lower_domain = domain.toLowerCase();
  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
    user = user.replace(/\./g, '').toLowerCase();
  }

  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 254 })) {
    return false;
  }

  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
    return false;
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

  var user_parts = user.split('.');
  for (var i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }

  return true;
}
module.exports = exports['default'];

/***/ }),

/***/ "sYpg":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "uDFM":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"ContentColumnContainer":"ContentColumnContainer__3NHtv","ChronicleCard":"ChronicleCard__33tB6","LeftArrow":"LeftArrow__1-3KK","RightArrow":"RightArrow__1TJ3t","AddSomething":"AddSomething__21sG9"};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map