webpackJsonp([3],{vRPq:function(e,t,o){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function h(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var f=o("KM04"),w=o("o9Qj"),b=o("/C1n"),g=o("/QC5"),y=o("khkS"),m=o.n(y),O=o("9qb7"),S=o.n(O),j=o("wI7h"),E=Object(f.h)("label",{class:"form-label"},"Email"),v=function(e){return Object(f.h)("div",null,E,Object(f.h)("input",{value:e.email,onChange:e.handleEmailChange,type:"email",class:"form-input",placeholder:"Your email"}))},_=Object(f.h)("div",{class:"card"},Object(f.h)("div",{class:"card-body"},"Make sure to use a strong password or phrase (i.e. more than 8 characters). You know the drill.")),P=Object(f.h)("label",{class:"form-label"},"Password"),C=Object(f.h)("i",{class:"form-icon"}),D=function(e){function t(t){var o=r(this,e.call(this,t));return o._toggleDialog=o._toggleDialog.bind(o),o._showDialog=o._showDialog.bind(o),o._hideDialog=o._hideDialog.bind(o),o.state={showDialog:!1},o}return n(t,e),t.prototype._toggleDialog=function(){this.setState({showDialog:!this.state.showDialog})},t.prototype._showDialog=function(){this.setState({showDialog:!0})},t.prototype._hideDialog=function(){this.setState({showDialog:showDialog})},t.prototype.render=function(e){return Object(f.h)("div",null,Object(f.h)(j.a,{active:this.state.showDialog},_),P,Object(f.h)("input",{value:e.password,onChange:e.handlePasswordChange,onFocus:this._showDialog,class:"form-input",type:e.showPassword?"text":"password",placeholder:"Your password"}),Object(f.h)("label",{class:"form-switch"},Object(f.h)("input",{type:"checkbox",onClick:e.toggleShowPassword}),C,"Show password"))},t}(f.Component),T=o("r33O"),k=Object(f.h)("h1",null,"Signup"),x=function(e){function t(){return s(this,t),a(this,e.apply(this,arguments))}return i(t,e),t.prototype.render=function(e){var t=S()("form-group",{"has-error":e.emailError||e.passwordError}),o=S()("btn","btn-primary",{loading:e.loading}),r=S()("form-input-hint",{"d-hide":!e.emailError}),n=S()("form-input-hint",{"d-hide":!e.passwordError});return Object(f.h)("div",{class:t},k,Object(f.h)(T.a,{error:!0,active:e.showServerError},e.serverError),Object(f.h)(v,{email:e.email,handleEmailChange:e.handleEmailChange}),Object(f.h)("p",{class:r},"Please enter a valid email address"),Object(f.h)(D,{password:e.password,handlePasswordChange:e.handlePasswordChange,toggleShowPassword:e.toggleShowPassword,showPassword:e.showPassword}),Object(f.h)("p",{class:n},"Every account needs a password..."),Object(f.h)("button",{class:o,onClick:e.handleSignup},"Create account"))},t}(f.Component),R=function(e){function t(){var o,r,n;l(this,t);for(var s=arguments.length,a=Array(s),i=0;i<s;i++)a[i]=arguments[i];return o=r=c(this,e.call.apply(e,[this].concat(a))),r.state={email:"",emailError:!1,password:"",passwordError:!1,showPassword:!1,serverError:"",showServerError:!1,loading:!1,signupSuccess:!1},r._toggleShowPassword=function(){r.setState({showPassword:!r.state.showPassword})},r._handleSignup=function(){return m()(r.state.email)?(r.setState({emailError:!1}),r.state.password?(r.setState({passwordError:!1}),r.setState({loading:!0}),void fetch(b.a+"!newUser",{method:"POST",body:JSON.stringify({email:r.state.email,password:r.state.password})}).then(function(e){return e.json()}).then(function(e){e.error?r.setState({serverError:e.error,showServerError:!0,loading:!1}):(r.setState({loading:!1}),console.log("JWT: ",e.loginToken),window.sessionStorage.setItem("loginToken",e.loginToken),Object(g.route)("/user"))})):void r.setState({passwordError:!0})):void r.setState({emailError:!0})},r._handleEmailChange=function(e){r.setState({email:e.target.value})},r._handlePasswordChange=function(e){r.setState({password:e.target.value})},n=o,c(r,n)}return h(t,e),t.prototype.componentWillUnmount=function(){this.setState({email:"",password:""})},t.prototype.render=function(){return Object(f.h)(x,{serverError:this.state.serverError,showServerError:this.state.showServerError,email:this.state.email,emailError:this.state.emailError,handleEmailChange:this._handleEmailChange,password:this.state.password,passwordError:this.state.passwordError,handlePasswordChange:this._handlePasswordChange,toggleShowPassword:this._toggleShowPassword,showPassword:this.state.showPassword,handleSignup:this._handleSignup,loading:this.state.loading})},t}(f.Component),J=function(e){function t(){return u(this,t),p(this,e.apply(this,arguments))}return d(t,e),t.prototype.render=function(e){return Object(f.h)(w.a,{formRail:Object(f.h)(R,{handleSignupSuccess:function(t){return e.handleSignupSuccess(t)}})})},t}(f.Component);t.default=J}});
//# sourceMappingURL=route-signup.chunk.cab2c.js.map