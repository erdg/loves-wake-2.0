webpackJsonp([7],{"w7+Q":function(e,t,o){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function h(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var f=o("KM04"),w=o("o9Qj"),b=o("/QC5"),g=o("khkS"),m=o.n(g),y=o("9qb7"),v=o.n(y),O=(o("wI7h"),Object(f.h)("label",{class:"form-label"},"Email")),E=function(e){return Object(f.h)("div",null,O,Object(f.h)("input",{value:e.email,onChange:e.handleEmailChange,type:"email",class:"form-input",placeholder:"Your email"}))},S=Object(f.h)("label",{class:"form-label"},"Password"),j=Object(f.h)("i",{class:"form-icon"}),P=function(e){function t(){return r(this,e.apply(this,arguments))}return n(t,e),t.prototype.render=function(e){return Object(f.h)("div",null,S,Object(f.h)("input",{value:e.password,onChange:e.handlePasswordChange,class:"form-input",type:e.showPassword?"text":"password",placeholder:"Your password"}),Object(f.h)("label",{class:"form-switch"},Object(f.h)("input",{type:"checkbox",onClick:e.toggleShowPassword}),j,"Show password"))},t}(f.Component),_=o("r33O"),C=Object(f.h)("h1",null,"Login"),L=function(e){function t(){return s(this,t),a(this,e.apply(this,arguments))}return i(t,e),t.prototype.render=function(e){var t=v()("form-group",{"has-error":e.emailError||e.passwordError}),o=v()("btn","btn-primary",{loading:e.loginBtnLoading}),r=v()("btn","btn-link","float-right",{loading:e.recoverBtnLoading}),n=v()("form-input-hint",{"d-hide":!e.emailError}),s=v()("form-input-hint",{"d-hide":!e.passwordError});return Object(f.h)("form",{class:t},C,Object(f.h)(_.a,{error:!0,active:e.showServerError},e.serverError),Object(f.h)(E,{email:e.email,handleEmailChange:e.handleEmailChange}),Object(f.h)("p",{class:n},"Please enter a valid email address"),Object(f.h)(P,{password:e.password,handlePasswordChange:e.handlePasswordChange,toggleShowPassword:e.toggleShowPassword,showPassword:e.showPassword}),Object(f.h)("p",{class:s},"Gotta have a password to login..."),Object(f.h)("div",{class:"row"},Object(f.h)("button",{type:"submit",class:o,onClick:e.handleLogin},"Login"),Object(f.h)("button",{class:r,onClick:e.handleRecoverAccount},"Recover account")))},t}(f.Component),B=o("/C1n"),R=function(e){function t(o){c(this,t);var r=l(this,e.call(this,o));return r._handleLogin=function(e){return e.preventDefault(),m()(r.state.email)?(r.setState({emailError:!1}),r.state.password?(r.setState({passwordError:!1}),r.setState({loginBtnLoading:!0}),fetch(B.a+"!loginUser",{method:"POST",body:JSON.stringify({em:r.state.email,pw:r.state.password})}).then(function(e){return e.json()}).then(function(e){e.error?r.setState({serverError:e.error,showServerError:!0,loginBtnLoading:!1}):(r.setState({loginBtnLoading:!1}),console.log("JWT: ",e.loginToken),window.sessionStorage.setItem("loginToken",e.loginToken),Object(b.route)("/user"))}),void r.setState({password:""})):void r.setState({passwordError:!0})):void r.setState({emailError:!0})},r._handleRecoverAccount=function(){r.setState({recoverBtnLoading:!0}),fetch("https://erikdgustafson.com/api/!recoverUserAccount?"+r.state.email).then(function(e){return e.json()}).then(function(e){e.error?r.setState({serverError:e.error,showServerError:!0,recoverBtnLoading:!1}):e.email&&(r.setState({recoverBtnLoading:!1,recoverAccountSuccess:!0}),r.props.handleRecoverAccountSuccess(e.email))}).then(function(){r.state.recoverAccountSuccess&&Object(b.route)("/recover-account",!0)})},r._handleEmailChange=r._handleEmailChange.bind(r),r._handlePasswordChange=r._handlePasswordChange.bind(r),r._toggleShowPassword=r._toggleShowPassword.bind(r),r.state={email:"",emailError:!1,password:"",passwordError:!1,showPassword:!1,serverError:"",showServerError:!1,loginBtnLoading:!1,recoverBtnLoading:!1,loginSuccess:!1,recoverAccountSuccess:!1},r}return h(t,e),t.prototype._toggleShowPassword=function(){this.setState({showPassword:!this.state.showPassword})},t.prototype._handleEmailChange=function(e){this.setState({email:e.target.value})},t.prototype._handlePasswordChange=function(e){this.setState({password:e.target.value})},t.prototype.render=function(){return Object(f.h)(L,{serverError:this.state.serverError,showServerError:this.state.showServerError,email:this.state.email,emailError:this.state.emailError,handleEmailChange:this._handleEmailChange,password:this.state.password,passwordError:this.state.passwordError,handlePasswordChange:this._handlePasswordChange,toggleShowPassword:this._toggleShowPassword,showPassword:this.state.showPassword,handleLogin:this._handleLogin,loginBtnLoading:this.state.loginBtnLoading,recoverBtnLoading:this.state.recoverBtnLoading,handleRecoverAccount:this._handleRecoverAccount})},t}(f.Component),k=function(e){function t(){return u(this,t),p(this,e.apply(this,arguments))}return d(t,e),t.prototype.render=function(e){return Object(f.h)(w.a,{formRail:Object(f.h)(R,{handleLoginSuccess:function(t,o){return e.handleLoginSuccess(t,o)},handleRecoverAccountSuccess:function(t){return e.handleRecoverAccountSuccess(t)}})})},t}(f.Component);t.default=k}});
//# sourceMappingURL=route-Login.chunk.795ac.js.map