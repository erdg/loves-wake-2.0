webpackJsonp([5],{"6U9T":function(t,e,n){"use strict";function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var c=n("KM04"),l=(n("/QC5"),n("v23/")),u=n("/C1n"),p=Object(c.h)("div",{class:"tile-content"},Object(c.h)("div",{class:"tile-title"},"Avatar")),f=function(t){function e(){for(var e,n,r,i=arguments.length,a=Array(i),s=0;s<i;s++)a[s]=arguments[s];return e=n=o(this,t.call.apply(t,[this].concat(a))),n.state={file:"",src:""},n.onChange=function(t){n.setState({file:t.target.files[0]}),n.makeFileURL()},n.makeFileURL=function(){var t=new FileReader;t.readAsDataURL(n.state.file),t.onload=function(t){n.setState({src:t.target.result})}},n.updUserAvatar=function(){fetch(u.a+"!updUserAvatar",{method:"POST",body:JSON.stringify({image:n.state.src.split(",")[1],loginToken:window.sessionStorage.getItem("loginToken")})}).then(function(t){return t.json()}).then(function(t){console.log(t)})},r=e,o(n,r)}return r(e,t),e.prototype.render=function(){return Object(c.h)("div",{class:"tile"},Object(c.h)("div",{class:"tile-icon"},Object(c.h)("figure",{class:"avatar avatar-lg"},Object(c.h)("img",{src:this.state.src||this.props.img}))),p,Object(c.h)("div",{class:"tile-action"},Object(c.h)("input",{type:"file",accept:".png, .jpg, .jpeg",value:this.state.file,onChange:this.onChange}),Object(c.h)("button",{class:"btn btn-primary",onClick:this.updUserAvatar}," Update Avatar")))},e}(c.Component),h=f;n.d(e,"default",function(){return y});var b=Object(c.h)("h3",null,"Settings"),d=Object(c.h)("div",{class:"divider"}),y=function(t){function e(){var n,o,r;i(this,e);for(var s=arguments.length,c=Array(s),l=0;l<s;l++)c[l]=arguments[l];return n=o=a(this,t.call.apply(t,[this].concat(c))),o.state={showModal:!0},o.hideModal=function(){o.setState({showModal:!1})},r=n,a(o,r)}return s(e,t),e.prototype.render=function(){return Object(c.h)(l.a,{avatarColumn:Object(c.h)("div",{class:"menu",style:"z-index:1;"},Object(c.h)("p",null,"logged in as: ",this.props.user.name||this.props.user.email)),contentColumn:Object(c.h)("div",null,b,d,Object(c.h)(h,{img:this.props.user.img}))})},e}(c.Component)}});
//# sourceMappingURL=route-UserSettings.chunk.7c443.js.map