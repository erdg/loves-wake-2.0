!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n=window.webpackJsonp;window.webpackJsonp=function(e,r,i){for(var a,u,c=0,l=[];c<e.length;c++)u=e[c],o[u]&&l.push(o[u][0]),o[u]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);for(n&&n(e,r,i);l.length;)l.shift()()};var r={},o={10:0};e.e=function(t){function n(){u.onerror=u.onload=null,clearTimeout(c);var e=o[t];0!==e&&(e&&e[1](new Error("Loading chunk "+t+" failed.")),o[t]=void 0)}var r=o[t];if(0===r)return new Promise(function(t){t()});if(r)return r[2];var i=new Promise(function(e,n){r=o[t]=[e,n]});r[2]=i;var a=document.getElementsByTagName("head")[0],u=document.createElement("script");u.type="text/javascript",u.charset="utf-8",u.async=!0,u.timeout=12e4,e.nc&&u.setAttribute("nonce",e.nc),u.src=e.p+""+({0:"route-Chronicle",1:"route-user",2:"route-create-shrine",3:"route-signup",4:"route-home",5:"route-Shrine",6:"route-ManageMemorial",7:"route-Login",8:"route-Entry",9:"route-Atlas"}[t]||t)+".chunk."+{0:"d3cfb",1:"eabdb",2:"22b4d",3:"8263c",4:"a7e40",5:"16726",6:"a2d57",7:"795ac",8:"077ab",9:"19564"}[t]+".js";var c=setTimeout(n,12e4);return u.onerror=u.onload=n,a.appendChild(u),i},e.m=t,e.c=r,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e.oe=function(t){throw console.error(t),t},e(e.s="pwNi")}({"+QGC":function(){},"/C1n":function(t,e){"use strict";e.a="https://erikdgustafson.com/api/"},"/QC5":function(t,e,n){"use strict";function r(t,e){for(var n in e)t[n]=e[n];return t}function o(t,e,n){var r,o=/(?:\?([^#]*))?(#.*)?$/,i=t.match(o),a={};if(i&&i[1])for(var c=i[1].split("&"),l=0;l<c.length;l++){var s=c[l].split("=");a[decodeURIComponent(s[0])]=decodeURIComponent(s.slice(1).join("="))}t=u(t.replace(o,"")),e=u(e||"");for(var f=Math.max(t.length,e.length),p=0;p<f;p++)if(e[p]&&":"===e[p].charAt(0)){var d=e[p].replace(/(^\:|[+*?]+$)/g,""),h=(e[p].match(/[+*?]+$/)||w)[0]||"",b=~h.indexOf("+"),m=~h.indexOf("*"),v=t[p]||"";if(!v&&!m&&(h.indexOf("?")<0||b)){r=!1;break}if(a[d]=decodeURIComponent(v),b||m){a[d]=t.slice(p).map(decodeURIComponent).join("/");break}}else if(e[p]!==t[p]){r=!1;break}return(!0===n.default||!1!==r)&&a}function i(t,e){return t.rank<e.rank?1:t.rank>e.rank?-1:t.index-e.index}function a(t,e){return t.index=e,t.rank=s(t),t.attributes}function u(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function c(t){return":"==t.charAt(0)?1+"*+?".indexOf(t.charAt(t.length-1))||4:5}function l(t){return u(t).map(c).join("")}function s(t){return t.attributes.default?0:l(t.attributes.path)}function f(t){return null!=t.__preactattr_||"undefined"!=typeof Symbol&&null!=t[Symbol.for("preactattr")]}function p(t,e){void 0===e&&(e="push"),x&&x[e]?x[e](t):"undefined"!=typeof history&&history[e+"State"]&&history[e+"State"](null,null,t)}function d(){var t;return t=x&&x.location?x.location:x&&x.getCurrentLocation?x.getCurrentLocation():"undefined"!=typeof location?location:S,""+(t.pathname||"")+(t.search||"")}function h(t,e){return void 0===e&&(e=!1),"string"!=typeof t&&t.url&&(e=t.replace,t=t.url),b(t)&&p(t,e?"replace":"push"),m(t)}function b(t){for(var e=C.length;e--;)if(C[e].canRoute(t))return!0;return!1}function m(t){for(var e=!1,n=0;n<C.length;n++)!0===C[n].routeTo(t)&&(e=!0);for(var r=k.length;r--;)k[r](t);return e}function v(t){if(t&&t.getAttribute){var e=t.getAttribute("href"),n=t.getAttribute("target");if(e&&e.match(/^\//g)&&(!n||n.match(/^_?self$/i)))return h(e)}}function _(t){if(0==t.button)return v(t.currentTarget||t.target||this),g(t)}function g(t){return t&&(t.stopImmediatePropagation&&t.stopImmediatePropagation(),t.stopPropagation&&t.stopPropagation(),t.preventDefault()),!1}function y(t){if(!(t.ctrlKey||t.metaKey||t.altKey||t.shiftKey||0!==t.button)){var e=t.target;do{if("A"===String(e.nodeName).toUpperCase()&&e.getAttribute("href")&&f(e)){if(e.hasAttribute("native"))return;if(v(e))return g(t)}}while(e=e.parentNode)}}function O(){F||("function"==typeof addEventListener&&(x||addEventListener("popstate",function(){m(d())}),addEventListener("click",y)),F=!0)}Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"subscribers",function(){return k}),n.d(e,"getCurrentUrl",function(){return d}),n.d(e,"route",function(){return h}),n.d(e,"Router",function(){return M}),n.d(e,"Route",function(){return P}),n.d(e,"Link",function(){return N});var j=n("KM04"),w=(n.n(j),{}),x=null,C=[],k=[],S={},F=!1,M=function(t){function e(e){t.call(this,e),e.history&&(x=e.history),this.state={url:e.url||d()},O()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.shouldComponentUpdate=function(t){return!0!==t.static||(t.url!==this.props.url||t.onChange!==this.props.onChange)},e.prototype.canRoute=function(t){return this.getMatchingChildren(this.props.children,t,!1).length>0},e.prototype.routeTo=function(t){return this._didRoute=!1,this.setState({url:t}),this.updating?this.canRoute(t):(this.forceUpdate(),this._didRoute)},e.prototype.componentWillMount=function(){C.push(this),this.updating=!0},e.prototype.componentDidMount=function(){var t=this;x&&(this.unlisten=x.listen(function(e){t.routeTo(""+(e.pathname||"")+(e.search||""))})),this.updating=!1},e.prototype.componentWillUnmount=function(){"function"==typeof this.unlisten&&this.unlisten(),C.splice(C.indexOf(this),1)},e.prototype.componentWillUpdate=function(){this.updating=!0},e.prototype.componentDidUpdate=function(){this.updating=!1},e.prototype.getMatchingChildren=function(t,e,n){return t.filter(a).sort(i).map(function(t){var i=o(e,t.attributes.path,t.attributes);if(i){if(!1!==n){var a={url:e,matches:i};return r(a,i),delete a.ref,delete a.key,Object(j.cloneElement)(t,a)}return t}}).filter(Boolean)},e.prototype.render=function(t,e){var n=t.children,r=t.onChange,o=e.url,i=this.getMatchingChildren(n,o,!0),a=i[0]||null;this._didRoute=!!a;var u=this.previousUrl;return o!==u&&(this.previousUrl=o,"function"==typeof r&&r({router:this,url:o,previous:u,active:i,current:a})),a},e}(j.Component),N=function(t){return Object(j.h)("a",r({onClick:_},t))},P=function(t){return Object(j.h)(t.component,t)};M.subscribers=k,M.getCurrentUrl=d,M.route=h,M.Router=M,M.Route=P,M.Link=N,e.default=M},"1afE":function(){},"3xze":function(){},"7N8r":function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t){function e(){var e=this;r.Component.call(this);var n=void 0,o=void 0;this.componentWillMount=function(){n=e.base=e.nextBase||e.__b,t(function(t){e.setState({child:t.default||t})})},this.shouldComponentUpdate=function(t,e){return e=void 0===e.child,o=e&&void 0===o&&n?(0,r.h)(n.nodeName,{dangerouslySetInnerHTML:{__html:n.innerHTML}}):"",!e},this.render=function(t,e){return e.child?(0,r.h)(e.child,t):o}}return(e.prototype=new r.Component).constructor=e,e};var r=n("KM04")},"9qb7":function(t,e){var n,r;!function(){"use strict";function o(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var r=typeof n;if("string"===r||"number"===r)t.push(n);else if(Array.isArray(n))t.push(o.apply(null,n));else if("object"===r)for(var a in n)i.call(n,a)&&n[a]&&t.push(a)}}return t.join(" ")}var i={}.hasOwnProperty;void 0!==t&&t.exports?t.exports=o:(n=[],void 0!==(r=function(){return o}.apply(e,n))&&(t.exports=r))}()},AM5m:function(t,e,n){"use strict";function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function i(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}n.d(e,"e",function(){return f}),n.d(e,"a",function(){return p}),n.d(e,"b",function(){return d}),n.d(e,"d",function(){return l}),n.d(e,"c",function(){return s});var a=n("KM04"),u=(n.n(a),Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}),c=Object(a.h)("i",{class:"form-icon"}),l=function(t){var e=t.label,n=t.name,r=i(t,["label","name"]);return Object(a.h)("label",{class:"form-radio"},Object(a.h)("input",u({},r,{name:n,type:"radio"})),c,e)},s=function(t){return Object(a.h)("label",{class:"form-label"},t.children)},f=(Object(a.h)("label",{class:"form-label"},"Email"),function(t){var e=t.label,n=i(t,["label"]);return Object(a.h)("div",null,Object(a.h)("label",{class:"form-label"},e),Object(a.h)("input",u({},n,{type:"text",class:"form-input"})))}),p=function(t){var e=t.label,n=i(t,["label"]);return Object(a.h)("div",null,Object(a.h)("label",{class:"form-label"},e),Object(a.h)("input",u({},n,{type:"date",class:"form-input"})))},d=function(t){var e=t.label,n=i(t,["label"]);return Object(a.h)("div",null,Object(a.h)("label",{class:"form-label"},e),Object(a.h)("input",u({},n,{type:"file",class:"form-input "+n.class})))},h=(function(t){function e(e){var n=r(this,t.call(this,e));return n._toggleShowPassword=n._toggleShowPassword.bind(n),n.state={showPassword:!1},n}o(e,t),e.prototype._toggleShowPassword=function(){this.setState({showPassword:!this.state.showPassword})},e.prototype.render=function(t){var e=t.label?t.label:"Password";return Object(a.h)("div",null,Object(a.h)("label",{class:"form-label"},e),Object(a.h)("input",u({},t,{class:"form-input",type:this.state.showPassword?"text":"password",placeholder:"Your password"})),Object(a.h)(b,{onClick:this._toggleShowPassword}))}}(a.Component),Object(a.h)("i",{class:"form-icon"})),b=function(t){return Object(a.h)("div",null,Object(a.h)("label",{class:"form-switch"},Object(a.h)("input",u({type:"checkbox"},t)),h,"Show password"))}},JkW7:function(t,e,n){"use strict";function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function i(t){n.e(4).then(function(){t(n("iOg+"))}.bind(null,n)).catch(n.oe)}function a(t){n.e(7).then(function(){t(n("w7+Q"))}.bind(null,n)).catch(n.oe)}function u(t){n.e(3).then(function(){t(n("vRPq"))}.bind(null,n)).catch(n.oe)}function c(t){n.e(1).then(function(){t(n("SJD4"))}.bind(null,n)).catch(n.oe)}function l(t){n.e(2).then(function(){t(n("iQ3s"))}.bind(null,n)).catch(n.oe)}function s(t){n.e(6).then(function(){t(n("FoBm"))}.bind(null,n)).catch(n.oe)}function f(t){n.e(8).then(function(){t(n("DkoH"))}.bind(null,n)).catch(n.oe)}function p(t){n.e(5).then(function(){t(n("ag03"))}.bind(null,n)).catch(n.oe)}function d(t){n.e(9).then(function(){t(n("D+Rg"))}.bind(null,n)).catch(n.oe)}function h(t){n.e(0).then(function(){t(n("y7x+"))}.bind(null,n)).catch(n.oe)}function b(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function v(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var _=(n("+QGC"),n("sYpg"),n("3xze"),n("1afE"),n("Zoy9"),n("kAHu"),n("SDRd"),n("/C1n")),g=n("KM04"),y=n("/QC5"),O=Object(g.h)("div",{class:"centered loading loading-xl"}),j=function(t){return function(e){function n(){for(var t,n,o,i=arguments.length,a=Array(i),u=0;u<i;u++)a[u]=arguments[u];return t=n=r(this,e.call.apply(e,[this].concat(a))),n.state={loading:!0},o=t,r(n,o)}return o(n,e),n.prototype.componentDidMount=function(){var t=this,e=window.sessionStorage.getItem("loginToken");if(!e)return alert("You need to login to access this page."),void Object(y.route)("/login");this.props.user.email?this.setState(function(t){return{loading:!t.loading}}):fetch(_.a+"!getUserData",{method:"POST",body:JSON.stringify({loginToken:e})}).then(function(e){return e.ok?(t.setState(function(t){return{loading:!t.loading}}),e.json()):(alert("You need to login to access this page."),void Object(y.route)("/login"))}).then(function(e){t.props.setUserData(e.user)})},n.prototype.render=function(){return this.state.loading?O:Object(g.h)(t,{user:this.props.user,urlNm:this.props.urlNm})},n}(g.Component)},w=j,x=n("sw5u"),C=Object(g.h)("section",{class:"navbar-section"},Object(g.h)(x.Link,{class:"navbar-brand",activeClassName:"active",href:"/"},Object(g.h)("img",{src:"../../assets/loves-wake.png",alt:"Love's Wake"}))),k=Object(g.h)("section",{class:"navbar-section"},Object(g.h)(x.Link,{class:"btn btn-primary",activeClassName:"active",href:"/create-shrine"},"Start a Shrine"),Object(g.h)(x.Link,{class:"btn btn-link",activeClassName:"active",href:"/login"},"Login"),Object(g.h)(x.Link,{class:"btn btn-link",activeClassName:"active",href:"/signup"},"Signup")),S=function(t){return Object(g.h)("header",{class:"navbar m-2"},C,t.isLoggedIn?Object(g.h)("section",{class:"navbar-section"},Object(g.h)(E,{name:t.name||t.email,notifications:t.notifications||[]})):k)},F=Object(g.h)("i",{class:"icon icon-menu"}),M=Object(g.h)("li",{class:"menu-item"},Object(g.h)(x.Link,{href:"/user"},"Your Profile")),N=Object(g.h)("li",{class:"menu-item"},"Notifications"),P=Object(g.h)("li",{class:"divider"}),U=Object(g.h)("li",{class:"menu-item"},"Settings"),D=Object(g.h)("li",{class:"menu-item"},"More Settings"),L=Object(g.h)("li",{class:"divider"}),E=function(t){var e=t.name.charAt(0),n=t.notifications.length;return Object(g.h)("div",{class:"dropdown dropdown-right mx-2"},Object(g.h)("a",{class:"dropdown-toggle",tabindex:"0",style:"cursor:pointer;white-space:nowrap;"},Object(g.h)("figure",{class:"avatar avatar-lg badge mx-1","data-badge":0===n?"":n.toString(),"data-initial":e}),F),Object(g.h)("ul",{class:"menu"},M,N,P,U,D,L,Object(g.h)("li",{class:"menu-item"},Object(g.h)(x.Link,{href:"/login",onClick:function(){return window.sessionStorage.removeItem("loginToken")}},"Logout"))))},R=(Object(g.h)("div",{class:"dropdown mx-2"},Object(g.h)("button",{class:"dropdown-toggle btn btn-link",tabindex:"0"},Object(g.h)("i",{class:"icon icon-plus"}),Object(g.h)("i",{class:"icon icon-caret"})),Object(g.h)("ul",{class:"menu"},Object(g.h)("li",{class:"menu-item"},Object(g.h)("a",{href:"/create-shrine"},"Start a memorial")),Object(g.h)("li",{class:"divider"}),Object(g.h)("li",null,"Invite others"))),S),A=n("7N8r"),T=n.n(A),W=T()(i),$=T()(a),K=T()(u),I=T()(c),q=T()(l),z=T()(s),H=T()(f),J=T()(p),Q=T()(d),Y=T()(h),B=w(I),V=w(q),G=w(z),Z=Object(g.h)(W,{path:"/"}),X=Object(g.h)($,{path:"/login"}),tt=Object(g.h)(K,{path:"/signup"}),et=Object(g.h)(H,{path:"/:urlStr/:urlNm"}),nt=Object(g.h)(J,{path:"/:urlStr/:urlNm/shrine"}),rt=Object(g.h)(Y,{path:"/:urlStr/:urlNm/chronicle"}),ot=Object(g.h)(Q,{path:"/:urlStr/:urlNm/atlas"}),it=function(t){function e(){var n,r,o;b(this,e);for(var i=arguments.length,a=Array(i),u=0;u<i;u++)a[u]=arguments[u];return n=r=m(this,t.call.apply(t,[this].concat(a))),r.state={user:{}},r.handleRoute=function(t){r.currentUrl=t.url},r.setUserData=function(t){r.setState({user:t})},o=n,m(r,o)}return v(e,t),e.prototype.render=function(){var t=this;return Object(g.h)("div",{id:"app"},Object(g.h)(R,{isLoggedIn:!!this.state.user.email,name:this.state.user.name||this.state.user.email}),Object(g.h)(y.Router,{onChange:this.handleRoute},Z,X,tt,Object(g.h)(V,{path:"/create-shrine",setUserData:function(e){return t.setUserData(e)},user:this.state.user}),et,nt,rt,ot,Object(g.h)(B,{path:"/user",setUserData:function(e){return t.setUserData(e)},user:this.state.user}),Object(g.h)(G,{path:"/user/manage-memorial/:urlNm",user:this.state.user,setUserData:function(e){return t.setUserData(e)}})))},e}(g.Component);e.default=it},KGu6:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){(0,a.default)(t),e=(0,c.default)(e,l),e.allow_trailing_dot&&"."===t[t.length-1]&&(t=t.substring(0,t.length-1));var n=t.split(".");if(e.require_tld){var r=n.pop();if(!n.length||!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(r))return!1;if(/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(r))return!1}for(var o,i=0;i<n.length;i++){if(o=n[i],e.allow_underscores&&(o=o.replace(/_/g,"")),!/^[a-z\u00a1-\uffff0-9-]+$/i.test(o))return!1;if(/[\uff01-\uff5e]/.test(o))return!1;if("-"===o[0]||"-"===o[o.length-1])return!1}return!0}Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var i=n("d3m2"),a=r(i),u=n("hxfi"),c=r(u),l={require_tld:!0,allow_underscores:!1,allow_trailing_dot:!1};t.exports=e.default},KM04:function(t){!function(){"use strict";function e(){}function n(t,n){var r,o,i,a,u=D;for(a=arguments.length;a-- >2;)U.push(arguments[a]);for(n&&null!=n.children&&(U.length||U.push(n.children),delete n.children);U.length;)if((o=U.pop())&&void 0!==o.pop)for(a=o.length;a--;)U.push(o[a]);else"boolean"==typeof o&&(o=null),(i="function"!=typeof t)&&(null==o?o="":"number"==typeof o?o+="":"string"!=typeof o&&(i=!1)),i&&r?u[u.length-1]+=o:u===D?u=[o]:u.push(o),r=i;var c=new e;return c.nodeName=t,c.children=u,c.attributes=null==n?void 0:n,c.key=null==n?void 0:n.key,void 0!==P.vnode&&P.vnode(c),c}function r(t,e){for(var n in e)t[n]=e[n];return t}function o(t,e){return n(t.nodeName,r(r({},t.attributes),e),arguments.length>2?[].slice.call(arguments,2):t.children)}function i(t){!t.__d&&(t.__d=!0)&&1==R.push(t)&&(P.debounceRendering||L)(a)}function a(){var t,e=R;for(R=[];t=e.pop();)t.__d&&k(t)}function u(t,e,n){return"string"==typeof e||"number"==typeof e?void 0!==t.splitText:"string"==typeof e.nodeName?!t._componentConstructor&&c(t,e.nodeName):n||t._componentConstructor===e.nodeName}function c(t,e){return t.__n===e||t.nodeName.toLowerCase()===e.toLowerCase()}function l(t){var e=r({},t.attributes);e.children=t.children;var n=t.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===e[o]&&(e[o]=n[o]);return e}function s(t,e){var n=e?document.createElementNS("http://www.w3.org/2000/svg",t):document.createElement(t);return n.__n=t,n}function f(t){var e=t.parentNode;e&&e.removeChild(t)}function p(t,e,n,r,o){if("className"===e&&(e="class"),"key"===e);else if("ref"===e)n&&n(null),r&&r(t);else if("class"!==e||o)if("style"===e){if(r&&"string"!=typeof r&&"string"!=typeof n||(t.style.cssText=r||""),r&&"object"==typeof r){if("string"!=typeof n)for(var i in n)i in r||(t.style[i]="");for(var i in r)t.style[i]="number"==typeof r[i]&&!1===E.test(i)?r[i]+"px":r[i]}}else if("dangerouslySetInnerHTML"===e)r&&(t.innerHTML=r.__html||"");else if("o"==e[0]&&"n"==e[1]){var a=e!==(e=e.replace(/Capture$/,""));e=e.toLowerCase().substring(2),r?n||t.addEventListener(e,h,a):t.removeEventListener(e,h,a),(t.__l||(t.__l={}))[e]=r}else if("list"!==e&&"type"!==e&&!o&&e in t)d(t,e,null==r?"":r),null!=r&&!1!==r||t.removeAttribute(e);else{var u=o&&e!==(e=e.replace(/^xlink\:?/,""));null==r||!1===r?u?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.removeAttribute(e):"function"!=typeof r&&(u?t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),r):t.setAttribute(e,r))}else t.className=r||""}function d(t,e,n){try{t[e]=n}catch(t){}}function h(t){return this.__l[t.type](P.event&&P.event(t)||t)}function b(){for(var t;t=A.pop();)P.afterMount&&P.afterMount(t),t.componentDidMount&&t.componentDidMount()}function m(t,e,n,r,o,i){T++||(W=null!=o&&void 0!==o.ownerSVGElement,$=null!=t&&!("__preactattr_"in t));var a=v(t,e,n,r,i);return o&&a.parentNode!==o&&o.appendChild(a),--T||($=!1,i||b()),a}function v(t,e,n,r,o){var i=t,a=W;if(null!=e&&"boolean"!=typeof e||(e=""),"string"==typeof e||"number"==typeof e)return t&&void 0!==t.splitText&&t.parentNode&&(!t._component||o)?t.nodeValue!=e&&(t.nodeValue=e):(i=document.createTextNode(e),t&&(t.parentNode&&t.parentNode.replaceChild(i,t),g(t,!0))),i.__preactattr_=!0,i;var u=e.nodeName;if("function"==typeof u)return S(t,e,n,r);if(W="svg"===u||"foreignObject"!==u&&W,u+="",(!t||!c(t,u))&&(i=s(u,W),t)){for(;t.firstChild;)i.appendChild(t.firstChild);t.parentNode&&t.parentNode.replaceChild(i,t),g(t,!0)}var l=i.firstChild,f=i.__preactattr_,p=e.children;if(null==f){f=i.__preactattr_={};for(var d=i.attributes,h=d.length;h--;)f[d[h].name]=d[h].value}return!$&&p&&1===p.length&&"string"==typeof p[0]&&null!=l&&void 0!==l.splitText&&null==l.nextSibling?l.nodeValue!=p[0]&&(l.nodeValue=p[0]):(p&&p.length||null!=l)&&_(i,p,n,r,$||null!=f.dangerouslySetInnerHTML),O(i,e.attributes,f),W=a,i}function _(t,e,n,r,o){var i,a,c,l,s,p=t.childNodes,d=[],h={},b=0,m=0,_=p.length,y=0,O=e?e.length:0;if(0!==_)for(var j=0;j<_;j++){var w=p[j],x=w.__preactattr_,C=O&&x?w._component?w._component.__k:x.key:null;null!=C?(b++,h[C]=w):(x||(void 0!==w.splitText?!o||w.nodeValue.trim():o))&&(d[y++]=w)}if(0!==O)for(var j=0;j<O;j++){l=e[j],s=null;var C=l.key;if(null!=C)b&&void 0!==h[C]&&(s=h[C],h[C]=void 0,b--);else if(!s&&m<y)for(i=m;i<y;i++)if(void 0!==d[i]&&u(a=d[i],l,o)){s=a,d[i]=void 0,i===y-1&&y--,i===m&&m++;break}s=v(s,l,n,r),c=p[j],s&&s!==t&&s!==c&&(null==c?t.appendChild(s):s===c.nextSibling?f(c):t.insertBefore(s,c))}if(b)for(var j in h)void 0!==h[j]&&g(h[j],!1);for(;m<=y;)void 0!==(s=d[y--])&&g(s,!1)}function g(t,e){var n=t._component;n?F(n):(null!=t.__preactattr_&&t.__preactattr_.ref&&t.__preactattr_.ref(null),!1!==e&&null!=t.__preactattr_||f(t),y(t))}function y(t){for(t=t.lastChild;t;){var e=t.previousSibling;g(t,!0),t=e}}function O(t,e,n){var r;for(r in n)e&&null!=e[r]||null==n[r]||p(t,r,n[r],n[r]=void 0,W);for(r in e)"children"===r||"innerHTML"===r||r in n&&e[r]===("value"===r||"checked"===r?t[r]:n[r])||p(t,r,n[r],n[r]=e[r],W)}function j(t){var e=t.constructor.name;(K[e]||(K[e]=[])).push(t)}function w(t,e,n){var r,o=K[t.name];if(t.prototype&&t.prototype.render?(r=new t(e,n),M.call(r,e,n)):(r=new M(e,n),r.constructor=t,r.render=x),o)for(var i=o.length;i--;)if(o[i].constructor===t){r.__b=o[i].__b,o.splice(i,1);break}return r}function x(t,e,n){return this.constructor(t,n)}function C(t,e,n,r,o){t.__x||(t.__x=!0,(t.__r=e.ref)&&delete e.ref,(t.__k=e.key)&&delete e.key,!t.base||o?t.componentWillMount&&t.componentWillMount():t.componentWillReceiveProps&&t.componentWillReceiveProps(e,r),r&&r!==t.context&&(t.__c||(t.__c=t.context),t.context=r),t.__p||(t.__p=t.props),t.props=e,t.__x=!1,0!==n&&(1!==n&&!1===P.syncComponentUpdates&&t.base?i(t):k(t,1,o)),t.__r&&t.__r(t))}function k(t,e,n,o){if(!t.__x){var i,a,u,c=t.props,s=t.state,f=t.context,p=t.__p||c,d=t.__s||s,h=t.__c||f,v=t.base,_=t.__b,y=v||_,O=t._component,j=!1;if(v&&(t.props=p,t.state=d,t.context=h,2!==e&&t.shouldComponentUpdate&&!1===t.shouldComponentUpdate(c,s,f)?j=!0:t.componentWillUpdate&&t.componentWillUpdate(c,s,f),t.props=c,t.state=s,t.context=f),t.__p=t.__s=t.__c=t.__b=null,t.__d=!1,!j){i=t.render(c,s,f),t.getChildContext&&(f=r(r({},f),t.getChildContext()));var x,S,M=i&&i.nodeName;if("function"==typeof M){var N=l(i);a=O,a&&a.constructor===M&&N.key==a.__k?C(a,N,1,f,!1):(x=a,t._component=a=w(M,N,f),a.__b=a.__b||_,a.__u=t,C(a,N,0,f,!1),k(a,1,n,!0)),S=a.base}else u=y,x=O,x&&(u=t._component=null),(y||1===e)&&(u&&(u._component=null),S=m(u,i,f,n||!v,y&&y.parentNode,!0));if(y&&S!==y&&a!==O){var U=y.parentNode;U&&S!==U&&(U.replaceChild(S,y),x||(y._component=null,g(y,!1)))}if(x&&F(x),t.base=S,S&&!o){for(var D=t,L=t;L=L.__u;)(D=L).base=S;S._component=D,S._componentConstructor=D.constructor}}if(!v||n?A.unshift(t):j||(t.componentDidUpdate&&t.componentDidUpdate(p,d,h),P.afterUpdate&&P.afterUpdate(t)),null!=t.__h)for(;t.__h.length;)t.__h.pop().call(t);T||o||b()}}function S(t,e,n,r){for(var o=t&&t._component,i=o,a=t,u=o&&t._componentConstructor===e.nodeName,c=u,s=l(e);o&&!c&&(o=o.__u);)c=o.constructor===e.nodeName;return o&&c&&(!r||o._component)?(C(o,s,3,n,r),t=o.base):(i&&!u&&(F(i),t=a=null),o=w(e.nodeName,s,n),t&&!o.__b&&(o.__b=t,a=null),C(o,s,1,n,r),t=o.base,a&&t!==a&&(a._component=null,g(a,!1))),t}function F(t){P.beforeUnmount&&P.beforeUnmount(t);var e=t.base;t.__x=!0,t.componentWillUnmount&&t.componentWillUnmount(),t.base=null;var n=t._component;n?F(n):e&&(e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),t.__b=e,f(e),j(t),y(e)),t.__r&&t.__r(null)}function M(t,e){this.__d=!0,this.context=e,this.props=t,this.state=this.state||{}}function N(t,e,n){return m(n,t,{},!1,e,!1)}var P={},U=[],D=[],L="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,E=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,R=[],A=[],T=0,W=!1,$=!1,K={};r(M.prototype,{setState:function(t,e){var n=this.state;this.__s||(this.__s=r({},n)),r(n,"function"==typeof t?t(n,this.props):t),e&&(this.__h=this.__h||[]).push(e),i(this)},forceUpdate:function(t){t&&(this.__h=this.__h||[]).push(t),k(this,2)},render:function(){}});var I={h:n,createElement:n,cloneElement:o,Component:M,render:N,rerender:a,options:P};t.exports=I}()},SDRd:function(){},Zoy9:function(){},cUJj:function(t){t.exports={gridContainer:"gridContainer__3MQ5X",avatarColumn:"avatarColumn__3AYMn",contentColumn:"contentColumn__2un7q"}},d3m2:function(t,e){"use strict";function n(t){if(!("string"==typeof t||t instanceof String))throw new TypeError("This library (validator.js) validates strings only")}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n,t.exports=e.default},hxfi:function(t,e){"use strict";function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments[1];for(var n in e)void 0===t[n]&&(t[n]=e[n]);return t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n,t.exports=e.default},jY1m:function(t,e,n){"use strict";function r(t,e){(0,a.default)(t);var n=void 0,r=void 0;"object"===(void 0===e?"undefined":o(e))?(n=e.min||0,r=e.max):(n=arguments[1],r=arguments[2]);var i=encodeURI(t).split(/%..|./).length-1;return i>=n&&(void 0===r||i<=r)}Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=r;var i=n("d3m2"),a=function(t){return t&&t.__esModule?t:{default:t}}(i);t.exports=e.default},kAHu:function(){},khkS:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if((0,a.default)(t),e=(0,c.default)(e,d),e.require_display_name||e.allow_display_name){var n=t.match(h);if(n)t=n[1];else if(e.require_display_name)return!1}var r=t.split("@"),o=r.pop(),i=r.join("@"),u=o.toLowerCase();if("gmail.com"!==u&&"googlemail.com"!==u||(i=i.replace(/\./g,"").toLowerCase()),!(0,s.default)(i,{max:64})||!(0,s.default)(o,{max:254}))return!1;if(!(0,p.default)(o,{require_tld:e.require_tld}))return!1;if('"'===i[0])return i=i.slice(1,i.length-1),e.allow_utf8_local_part?_.test(i):m.test(i);for(var l=e.allow_utf8_local_part?v:b,f=i.split("."),g=0;g<f.length;g++)if(!l.test(f[g]))return!1;return!0}Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var i=n("d3m2"),a=r(i),u=n("hxfi"),c=r(u),l=n("jY1m"),s=r(l),f=n("KGu6"),p=r(f),d={allow_display_name:!1,require_display_name:!1,allow_utf8_local_part:!0,require_tld:!0},h=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i,b=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i,m=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i,v=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i,_=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;t.exports=e.default},o9Qj:function(t,e,n){"use strict";n.d(e,"a",function(){return u});var r=n("KM04"),o=(n.n(r),Object(r.h)("div",{class:"left-rail hide-sm"})),i=Object(r.h)("div",{class:"left-gutter hide-md"}),a=Object(r.h)("div",{class:"right-gutter hide-md"}),u=function(t){var e=window.innerWidth||document.documentElement.clientWidth||document.body.client.width;return Object(r.h)("div",{class:"flex-container"},o,i,Object(r.h)("div",{class:e<800&&!t.avatarRail?"d-none":"avatar-rail"},t.avatarRail),Object(r.h)("div",{class:"form-rail"},t.formRail),Object(r.h)("div",{class:"dialog-rail hide-md"},t.dialogRail),a)}},pwNi:function(t,e,n){"use strict";var r=n("KM04");"serviceWorker"in navigator&&"https:"===location.protocol&&navigator.serviceWorker.register(n.p+"sw.js");var o=function(t){return t&&t.default?t.default:t};if("function"==typeof o(n("JkW7"))){var i=document.body.firstElementChild,a=function(){var t=o(n("JkW7"));i=(0,r.render)((0,r.h)(t),document.body,i)};a()}},r33O:function(t,e,n){"use strict";var r=n("KM04"),o=(n.n(r),n("9qb7")),i=n.n(o);e.a=function(t){var e=i()("toast",{"toast-primary":t.primary,"toast-success":t.success,"toast-warning":t.warning,"toast-error":t.error,"d-none":!t.active});return Object(r.h)("div",{class:e},t.children)}},sYpg:function(){},sw5u:function(t,e,n){"use strict";function r(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Link=e.Match=void 0;var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},u=n("KM04"),c=n("/QC5"),l=e.Match=function(t){function e(){for(var e,n,r,i=arguments.length,a=Array(i),u=0;u<i;u++)a[u]=arguments[u];return e=n=o(this,t.call.apply(t,[this].concat(a))),n.update=function(t){n.nextUrl=t,n.setState({})},r=e,o(n,r)}return i(e,t),e.prototype.componentDidMount=function(){c.subscribers.push(this.update)},e.prototype.componentWillUnmount=function(){c.subscribers.splice(c.subscribers.indexOf(this.update)>>>0,1)},e.prototype.render=function(t){var e=this.nextUrl||(0,c.getCurrentUrl)(),n=e.replace(/\?.+$/,"");return this.nextUrl=null,t.children[0]&&t.children[0]({url:e,path:n,matches:n===t.path})},e}(u.Component),s=function(t){var e=t.activeClassName,n=t.path,o=r(t,["activeClassName","path"]);return(0,u.h)(l,{path:n||o.href},function(t){var n=t.matches;return(0,u.h)(c.Link,a({},o,{class:[o.class||o.className,n&&e].filter(Boolean).join(" ")}))})};e.Link=s,e.default=l,l.Link=s},"v23/":function(t,e,n){"use strict";var r=n("KM04"),o=(n.n(r),n("cUJj")),i=n.n(o);e.a=function(t){return Object(r.h)("div",{class:i.a.gridContainer},Object(r.h)("div",{class:i.a.avatarColumn},t.avatarColumn),Object(r.h)("div",{class:i.a.contentColumn},t.contentColumn))}},wI7h:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var r=n("KM04"),o=(n.n(r),n("9qb7")),i=n.n(o),a=function(t){var e=i()("dialog",{"d-none":!t.active}),n=i()("dialog-icon","circle","text-bold","float-right","mt-2");return Object(r.h)("div",{class:"relative mt-1"},Object(r.h)("div",{class:e},t.children),Object(r.h)("div",{class:n},"i"))}}});
//# sourceMappingURL=bundle.775be.js.map