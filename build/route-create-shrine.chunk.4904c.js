webpackJsonp([2],{D9cU:function(e,t,n){"use strict";n.d(t,"a",function(){return o}),n.d(t,"c",function(){return i}),n.d(t,"b",function(){return r});var a=n("KM04"),o=(n.n(a),function(e){return Object(a.h)("ul",{class:"menu "+e.class,style:e.style},e.children)}),i=function(e){return Object(a.h)("li",{class:"menu-item "+e.class},e.children)},r=function(e){return Object(a.h)("li",{class:"divider","data-content":e.children})}},iQ3s:function(e,t,n){"use strict";function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function h(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function m(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function j(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function O(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var g=n("KM04"),y=n("/C1n"),S=(n("/QC5"),n("o9Qj")),w=n("9qb7"),C=n.n(w),N=n("AM5m"),P=function(e){return Object(g.h)("button",{class:"btn btn-primary float-right",onClick:e.onClick},"Next Step")},x=function(e){function t(){for(var t,n,o,i=arguments.length,r=Array(i),s=0;s<i;s++)r[s]=arguments[s];return t=n=a(this,e.call.apply(e,[this].concat(r))),n.state={firstNameError:!1},n._handleNextStep=function(){n.setState(""!==n.props.firstName?{firstNameError:!1}:{firstNameError:!0}),n.state.firstNameError||n.props.handleNextStep()},o=t,a(n,o)}return o(t,e),t.prototype.render=function(e){var t=C()("form-group",{"has-error":this.state.firstNameError||this.state.lastNameError}),n=C()("form-input-hint",{"d-hide":!this.state.firstNameError});return Object(g.h)("div",{class:t},Object(g.h)(N.e,{label:"First name",firstName:e.firstName,name:"firstName",value:e.firstName,onChange:e.onChange}),Object(g.h)("p",{class:n},"Please enter a first name"),Object(g.h)(N.e,{label:"Middle name(s) or initial",name:"middleName",value:e.middleName,onChange:e.onChange}),Object(g.h)(N.e,{label:"Last name",lastName:e.lastName,name:"lastName",value:e.lastName,onChange:e.onChange}),Object(g.h)("div",{class:"row my-2"},Object(g.h)(P,{onClick:this._handleNextStep})))},t}(g.Component),_=function(e){return Object(g.h)("button",{class:"btn btn-link",onClick:e.onClick},"prev")},E=function(e){return Object(g.h)("div",null,Object(g.h)(N.b,{class:"text-ellipsis",label:"Upload a Photo",onChange:e.onFileChange}),Object(g.h)("div",{class:"row my-2"},Object(g.h)(_,{onClick:e.handlePrevStep}),Object(g.h)(P,{onClick:e.handleNextStep})))},k=n("wI7h"),T=(Object(g.h)("strong",null,"We'll use this answer for the email template in the next section."),Object(g.h)("p",null,"How did... "),Object(g.h)(N.c,null,"Gender & Pronoun"),Object(g.h)("div",{class:"row"},Object(g.h)(N.d,{label:"Female",value:"Female",name:"gender"}),Object(g.h)("span",{class:"text-gray"},"- She/Her")),Object(g.h)("div",{class:"row"},Object(g.h)(N.d,{label:"Male",value:"Male",name:"gender"}),Object(g.h)("span",{class:"text-gray"},"- He/Him")),function(e){return Object(g.h)("div",null,Object(g.h)(N.a,{label:"Date of Birth",name:"born",value:e.born,onChange:e.onChange}))}),I=Object(g.h)("div",{class:"row"},Object(g.h)(N.d,{label:"Still alive and well",name:"deceased",value:"false"})),M=Object(g.h)("div",{class:"row"},Object(g.h)(N.d,{label:"Will pass soon",name:"deceased",value:"false"})),R=Object(g.h)("div",{class:"row"},Object(g.h)(N.d,{label:"Passed away",name:"deceased",value:"true"})),D=function(e){return Object(g.h)("div",null,Object(g.h)(N.c,null,"Is ",e.firstName," still with us?"),Object(g.h)("div",{onChange:e.handleDeath,class:"col mx-2"},I,M,R))},F=function(e){var t=C()({"d-none":!e.deceased});return Object(g.h)("div",{class:t},Object(g.h)(N.a,{label:"Date of Death",name:"died",value:e.died,onChange:e.onChange}))},A=function(e){C()("btn","btn-primary","float-right",{loading:e.loading});return Object(g.h)("div",null,Object(g.h)(T,{firstName:e.firstName,onChange:e.onChange,born:e.born}),Object(g.h)(D,{firstName:e.firstName,handleDeath:e.handleDeath}),Object(g.h)(F,{deceased:e.deceased,firstName:e.firstName,onChange:e.onChange,died:e.died}),Object(g.h)("div",{class:"row my-2"},Object(g.h)(_,{onClick:e.handlePrevStep}),Object(g.h)(P,{onClick:e.newMemorial})))},U=n("3F7m"),L=n.n(U),z=Object(g.h)("h5",null,"Choose an Invitation Template"),H=Object(g.h)("div",{style:"margin-left:25px;font-size:smaller;"},Object(g.h)("div",{class:"text-gray"},"- For a recent loss"),Object(g.h)("div",{class:"text-gray"},"- Encourages people to process grief")),G=Object(g.h)("div",{style:"margin-left:25px;font-size:smaller;"},Object(g.h)("div",{class:"text-gray"},"- For after a loss stops hurting"),Object(g.h)("div",{class:"text-gray"},"- Encourages people to reconsider loss")),J=Object(g.h)("div",{style:"margin-left:25px;font-size:smaller;"},Object(g.h)("div",{class:"text-gray"},"- For a loss that feels distant now"),Object(g.h)("div",{class:"text-gray"},"- Encourages people to remember")),Q=Object(g.h)("h5",null,"Preview"),W=function(e){function t(n){i(this,t);var a=r(this,e.call(this,n));return a.state={invitation:""},a.onChange=function(e){a.setState({invitation:e.target.value})},L.a.setOptions({sanitize:!0}),a}return s(t,e),t.prototype.render=function(){var e=this;return Object(g.h)("div",null,z,Object(g.h)("div",{onChange:function(t){return e.props.setInvitation(t.target.value)},class:"col mx-2"},Object(g.h)("div",{class:"row"},Object(g.h)(N.d,{label:"Mourn Together",name:"invitation",value:"This is the *Mourn Together* Template"}),H),Object(g.h)("div",{class:"row"},Object(g.h)(N.d,{label:"Heal Together",name:"invitation",value:"This is the *Heal Together* Template"}),G),Object(g.h)("div",{class:"row"},Object(g.h)(N.d,{label:"Remember Together",name:"invitation",value:"This is the *Remember Together* Template"}),J)),Object(g.h)("div",{class:"relative"},Object(g.h)("div",{class:this.props.invitation?"selectInvitationDialog":"d-hide"},Q,Object(g.h)("div",{dangerouslySetInnerHTML:{__html:L()(this.props.invitation)}}))),Object(g.h)("div",{class:"row my-2"},Object(g.h)(_,{onClick:this.props.handlePrevStep}),Object(g.h)(P,{onClick:this.props.handleNextStep})))},t}(g.Component),B=Object(g.h)("h5",null,"Customize Invitation"),K=Object(g.h)("h5",null,"Preview"),q=function(e){function t(n){l(this,t);var a=c(this,e.call(this,n));return a.onChange=function(e){var t;a.setState((t={},t[e.target.name]=e.target.value,t))},L.a.setOptions({sanitize:!0}),a}return h(t,e),t.prototype.render=function(){return Object(g.h)("div",null,B,Object(g.h)("textarea",{style:"resize:none;",class:"form-input",rows:"16",name:"invitation",value:this.props.invitation,onInput:this.props.onChange}),Object(g.h)("div",{class:"relative"},Object(g.h)("div",{class:"customizeInvitationDialog"},K,Object(g.h)("div",{dangerouslySetInnerHTML:{__html:L()(this.props.invitation)}}))),Object(g.h)("div",{class:"row my-2"},Object(g.h)(_,{onClick:this.props.handlePrevStep}),Object(g.h)(P,{onClick:this.props.updInvitation})))},t}(g.Component),V=n("khkS"),X=n.n(V),Y=Object(g.h)("h5",null,"Invite Others to Contribute"),Z=Object(g.h)("label",{class:"form-label"},"Enter email addresses"),$=function(e){function t(){var n,a,o;u(this,t);for(var i=arguments.length,r=Array(i),s=0;s<i;s++)r[s]=arguments[s];return n=a=b(this,e.call.apply(e,[this].concat(r))),a.state={email:"",emails:[],emailError:!1},a._handleEmailChange=function(e){a.setState({email:e.target.value})},a._addEmail=function(e){if(e.preventDefault(),!X()(a.state.email))return void a.setState({emailError:!0});a.setState({emailError:!1}),a.setState({emails:[].concat(a.state.emails,[a.state.email]),email:""})},a._removeEmail=function(e){var t=a.state.emails.filter(function(t){return t!==e.target.name});a.setState({emails:t})},a.updEmails=function(){fetch(y.a+"!updEmails",{method:"POST",body:JSON.stringify({emails:a.state.emails,memorial:a.props.memorial.urlNm,loginToken:window.sessionStorage.getItem("loginToken")})}).then(function(e){return e.json()}).then(function(e){console.log(e)})},o=n,b(a,o)}return p(t,e),t.prototype.render=function(e){var t=this,n=C()("form-group",{"has-error":this.state.emailError}),a=C()("form-input-hint",{"d-hide":!this.state.emailError});return Object(g.h)("div",null,Y,Object(g.h)("form",{class:n},Object(g.h)(k.a,{active:!0},"We'll send emails on your behalf to invite others to contribute to ",e.firstName?e.firstName+"'s":"this"," memorial. Unfortunately you will have to manually enter emails for the time being. In the near future we'll be able to sync with your Apple/Google contacts. Apologies for the inconvenience."),Z,Object(g.h)("div",{class:"input-group"},Object(g.h)("input",{type:"email",class:"form-input",value:this.state.email,onChange:this._handleEmailChange}),Object(g.h)("button",{class:"btn btn-primary input-group-btn",type:"submit",onClick:this._addEmail},"Add")),Object(g.h)("p",{class:a},"Please enter a valid email address")),Object(g.h)("div",{class:"mt-2"},this.state.emails.map(function(e){return Object(g.h)("span",{class:"chip"},e,Object(g.h)("a",{class:"btn btn-clear","aria-label":"Close",role:"button",onClick:t._removeEmail,name:e}))})),Object(g.h)("div",{class:"row my-2"},Object(g.h)(_,{onClick:e.handlePrevStep}),Object(g.h)("button",{class:"btn btn-primary float-right",onClick:this.updEmails}," Send Invitations")))},t}(g.Component),ee=function(e){function t(){return d(this,t),f(this,e.apply(this,arguments))}return m(t,e),t.prototype.render=function(e){switch(e.step){case 1:return Object(g.h)(x,{onChange:e.onChange,firstName:e.firstName,middleName:e.middleName,lastName:e.lastName,handleNextStep:e.handleNextStep});case 2:return Object(g.h)(E,{handleNextStep:e.handleNextStep,handlePrevStep:e.handlePrevStep,onFileChange:e.onFileChange});case 3:return Object(g.h)(A,{firstName:e.firstName,born:e.born,died:e.died,onChange:e.onChange,subjPronoun:e.subjPronoun,objPronoun:e.objPronoun,posPronoun:e.posPronoun,handleGenderChange:e.handleGenderChange,deceased:e.deceased,handleDeath:e.handleDeath,newMemorial:e.newMemorial,loading:e.loading,handleNextStep:e.handleNextStep,handlePrevStep:e.handlePrevStep});case 4:return Object(g.h)(W,{handleNextStep:e.handleNextStep,handlePrevStep:e.handlePrevStep,setInvitation:e.setInvitation,invitation:e.invitation});case 5:return Object(g.h)(q,{handleNextStep:e.handleNextStep,handlePrevStep:e.handlePrevStep,invitation:e.invitation,onChange:e.onChange,updInvitation:e.updInvitation});case 6:return Object(g.h)($,{handleNextStep:e.handleNextStep,handlePrevStep:e.handlePrevStep,firstName:e.firstName,memorial:e.memorial})}},t}(g.Component),te=n("D9cU"),ne=Object(g.h)(te.b,null,"Shrine Basics"),ae=Object(g.h)(te.b,null,"Invite Others"),oe=function(e){var t=e.firstName.charAt(0)+e.lastName.charAt(0);return Object(g.h)(te.a,{class:"avatar-rail-menu"},e.step>1&&Object(g.h)("figure",{class:"avatar avatar-xxl centered",data:t},Object(g.h)("img",{src:e.src})),e.step>1&&Object(g.h)(te.c,null,Object(g.h)("h4",{class:"text-center m-2"},e.firstName)),Object(g.h)("div",{class:e.step<=3?"":"hide-sm"},ne,Object(g.h)(te.c,{class:1===e.step&&"arrow-box"},Object(g.h)("a",{class:"btn btn-sm btn-link",onClick:function(){return e.gotoStep(1)}},"Name")),Object(g.h)(te.c,{class:2===e.step&&"arrow-box"},Object(g.h)("a",{class:"btn btn-sm btn-link",onClick:function(){return e.gotoStep(2)}},"Photo")),Object(g.h)(te.c,{class:3===e.step&&"arrow-box"},Object(g.h)("a",{class:"btn btn-sm btn-link",onClick:function(){return e.gotoStep(3)}},"Information"))),Object(g.h)("div",{class:e.step>3?"":"hide-sm"},ae,Object(g.h)(te.c,{class:4===e.step&&"arrow-box"},Object(g.h)("a",{class:"btn btn-sm btn-link",onClick:function(){e.gotoStep(4)}},"Invitation Template")),Object(g.h)(te.c,{class:5===e.step&&"arrow-box"},Object(g.h)("a",{class:"btn btn-sm btn-link",onClick:function(){e.gotoStep(5)}},"Customize Invitation")),Object(g.h)(te.c,{class:6===e.step&&"arrow-box"},Object(g.h)("a",{class:"btn btn-sm btn-link",onClick:function(){return e.gotoStep(6)}},"Invite Collaborators"))))},ie=Object(g.h)("h1",null," Create a New Shrine"),re=function(e){function t(){var n,a,o;v(this,t);for(var i=arguments.length,r=Array(i),s=0;s<i;s++)r[s]=arguments[s];return n=a=j(this,e.call.apply(e,[this].concat(r))),a.state={step:1,memorial:{},firstName:"",middleName:"",lastName:"",born:"",died:"",subjPronoun:"",objPronoun:"",posPronoun:"",deceased:!1,file:null,fileURL:"",invitation:"",loading:!1},a.onChange=function(e){var t;a.setState((t={},t[e.target.name]=e.target.value,t))},a.onFileChange=function(e){a.setState({file:e.target.files[0]}),a.makeFileURL()},a.setInvitation=function(e){a.setState({invitation:e})},a.makeFileURL=function(){console.log("reading file");var e=new FileReader;e.onload=function(e){a.setState({fileURL:e.target.result})},e.readAsDataURL(a.state.file)},a._handleNextStep=function(){a.setState({step:a.state.step+1})},a.gotoStep=function(e){a.setState({step:e})},a._handlePrevStep=function(){a.setState({step:a.state.step-1})},a._handleGenderChange=function(e){"Male"===e.target.value?a.setState({subjPronoun:"he",objPronoun:"him",posPronoun:"his"}):"Female"===e.target.value&&a.setState({subjPronoun:"she",objPronoun:"her",posPronoun:"her"})},a._handleDeath=function(e){"true"===e.target.value?a.setState({deceased:!0}):"false"===e.target.value&&a.setState({deceased:!1})},a.newMemorial=function(){var e=window.sessionStorage.getItem("loginToken");if(!a.state.firstName||!a.state.born)return void alert("A memorial needs at least a first name and birth date to be created. Please go to the corresponding pages and enter that information before continuing");a.setState({loading:!0}),fetch(y.a+"!newMemorial",{method:"POST",body:JSON.stringify({nm1:a.state.firstName,nm2:a.state.middleName,nm3:a.state.lastName,born:a.state.born,died:a.state.died,img:a.state.fileURL.split(",")[1],loginToken:e})}).then(function(e){return e.json()}).then(function(e){a.setState({loading:!1}),a.setState({memorial:e}),a.setState(function(e){return{step:e.step+1}})})},a.updInvitation=function(){a.state.invitation&&fetch(y.a+"!updInvitation",{method:"POST",body:JSON.stringify({loginToken:window.sessionStorage.getItem("loginToken"),memorial:a.state.memorial.urlNm,invitation:a.state.invitation})}).then(function(e){return e.json()}).then(function(){a.setState(function(e){return{step:e.step+1}})})},o=n,j(a,o)}return O(t,e),t.prototype.render=function(){var e=this,t=this.state.step,n=this.state.firstName,a=this.state.lastName;return Object(g.h)("div",null,Object(g.h)("div",{class:"flex-container-heading"},t>1&&n?Object(g.h)("h1",null,n,"'s Shrine"):ie,Object(g.h)("p",{class:"text-gray"},"Step ",t," of 6")),Object(g.h)(S.a,{avatarRail:Object(g.h)(oe,{step:t,firstName:n,lastName:a,gotoStep:function(t){return e.gotoStep(t)},src:this.state.fileURL}),formRail:Object(g.h)(ee,{step:t,handleNextStep:this._handleNextStep,handlePrevStep:this._handlePrevStep,newMemorial:this.newMemorial,loading:this.state.loading,onChange:this.onChange,onFileChange:this.onFileChange,born:this.state.born,died:this.state.died,setInvitation:this.setInvitation,updInvitation:this.updInvitation,invitation:this.state.invitation,firstName:n,middleName:this.state.middleName,lastName:a,subjPronoun:this.state.subjPronoun,objPronoun:this.state.objPronoun,posPronoun:this.state.posPronoun,handleGenderChange:this._handleGenderChange,deceased:this.state.deceased,handleDeath:this._handleDeath,memorial:this.state.memorial})}))},t}(g.Component);t.default=re}});
//# sourceMappingURL=route-create-shrine.chunk.4904c.js.map