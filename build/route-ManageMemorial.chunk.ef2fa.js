webpackJsonp([3],{FoBm:function(t,e,n){"use strict";function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function d(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function f(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function m(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function p(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function b(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function v(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function g(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function y(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var O=n("KM04"),j=n("/C1n"),w=n("/QC5"),S=n("v23/"),C=Object(O.h)("h4",{class:"col"},"Chronicle Items"),x=Object(O.h)("div",{class:"col"}),M=function(t){return Object(O.h)("div",null,Object(O.h)("div",{class:"row semi-transparent-bg"},C,x,Object(O.h)("button",{class:"col btn btn-primary",onClick:t.newItem},"Add Item")),Object(O.h)("div",{style:"display:flex;flex-direction:row;flex-wrap:wrap;align-items:flex-start;justify-content:center;"},t.items.map(function(e){return Object(O.h)(E,{id:e.id,title:e.title,date:e.start,location:e.location,imageSrc:e.imageSrc,audioSrc:e.audioSrc,videoSrc:e.videoSrc,showModal:function(e){return t.showModal(e)},showDeleteModal:function(e){return t.showDeleteModal(e)},edited:e.edited})})))},I=Object(O.h)("i",{class:"icon icon-delete"}),k=Object(O.h)("i",{class:"icon icon-edit"}),E=function(t){return Object(O.h)("div",{class:"card m-2 item-"+t.id,style:"width:200px;"},t.imageSrc&&Object(O.h)("img",{class:"responsive-img mt-2 mx-2 centered",src:t.imageSrc,style:"max-width:182px"}),t.audioSrc&&Object(O.h)("audio",{class:"responsive-img mt-2 mx-2 centered",src:t.audioSrc,style:"max-width:182px",controls:!0}),t.videoSrc&&Object(O.h)("video",{class:"responsive-img mt-2 mx-2 centered",src:t.videoSrc,style:"max-width:182px",controls:!0}),Object(O.h)("div",{class:"card-body"},Object(O.h)("div",{class:"h6 text-ellipsis"},t.title),Object(O.h)("div",{class:"text-gray text-ellipsis",style:"font-size:smaller;"},t.location),Object(O.h)("div",{class:"text-gray",style:"font-size:smaller;"},t.date)),Object(O.h)("div",{class:"card-footer"},Object(O.h)("button",{class:"btn btn-small btn-action tooltip float-right ml-2","data-tooltip":"delete",onClick:function(){return t.showDeleteModal(t.id)}}," ",I),Object(O.h)("button",{class:"btn float-right tooltip","data-tooltip":"edit",onClick:function(){return t.showModal(t.id)}}," ",k)))},T=M,P=n("9qb7"),A=n.n(P),N=n("AM5m"),_=function(t){return Object(O.h)("div",{class:"panel"},Object(O.h)("div",{class:"panel-body mt-2"},t.item.src&&Object(O.h)("img",{src:t.item.src,alt:t.item.title,class:"img-responsive my-2"}),Object(O.h)("h4",null,t.item.title),Object(O.h)("div",{class:"text-gray d-inline"},t.item.location),Object(O.h)("div",{class:"text-gray d-inline mx-2"},t.item.start),Object(O.h)("p",null,t.item.caption)))},D=_,F=Object(O.h)("div",{class:"text-center text-gray",style:"font-size:smaller;"},"- Scroll down to see a preview -"),L=function(t){function e(){return i(this,t.apply(this,arguments))}return r(e,t),e.prototype.render=function(t){var e=A()("modal","modal-lg",{active:t.showModal},{"has-error":t.modalError}),n=window.innerWidth||document.documentElement.clientWidth||document.body.client.width;return Object(O.h)("div",{class:e},Object(O.h)("a",{onClick:t.hideModal,class:"modal-overlay","aria-label":"Close"}),Object(O.h)("div",{class:"modal-container"},Object(O.h)("div",{class:"modal-header"},Object(O.h)("a",{onClick:t.hideModal,class:"btn btn-clear float-right","aria-label":"Close"}),Object(O.h)("div",{class:"modal-title h5"},t.item.id?"Edit Item":"Add Item"),n<840&&F),Object(O.h)("div",{class:"modal-body"},Object(O.h)("div",{class:n<840?"content":"content container columns"},Object(O.h)("form",{class:n<840?"form-group":"form-group column col-5"},Object(O.h)(N.e,{label:"Title",name:"title",value:t.item.title,onChange:t.onChange}),Object(O.h)(N.e,{label:"Location",name:"location",value:t.item.location,onChange:t.onChange}),Object(O.h)(N.a,{label:"Date",name:"start",value:t.item.start,onChange:t.onChange}),Object(O.h)("label",{class:"form-label"},"Change photo",Object(O.h)("input",{class:"form-input",type:"file",accept:".jpg, .jpeg, .png",value:t.item.file,onChange:t.onFileChange}))),Object(O.h)("div",{class:n<840?"":"column col-7"},Object(O.h)(D,{item:t.item})))),Object(O.h)("div",{class:"modal-footer"},Object(O.h)("button",{class:"btn btn-primary",onClick:t.item.id?t.updChronicle:t.newChronicle},t.item.id?"Update item":"Add item"))))},e}(O.Component),R=L,U=Object(O.h)("h4",null,"Bulk Import"),J=function(t){function e(){var n,i,r;o(this,e);for(var s=arguments.length,l=Array(s),c=0;c<s;c++)l[c]=arguments[c];return n=i=a(this,t.call.apply(t,[this].concat(l))),i.state={files:[],filesUploaded:0},i.onFileChange=function(t){i.setState({files:t.target.files,filesUploaded:0})},i.bulkImport=function(){i.setState({filesUploaded:0});var t=i.state.files;if(0===t.length)return void alert("No files selected.");var e=0,n=function(){return t[e++]};!function t(e){var r=new FileReader;r.readAsDataURL(e),r.onload=function(e){var r=e.target.result.split(",")[1];fetch(j.a+"!newChronicle",{method:"POST",body:JSON.stringify({loginToken:window.sessionStorage.getItem("loginToken"),urlNm:i.props.urlNm,image:r})}).then(function(t){return t.json()}).then(function(e){i.setState(function(t){return{filesUploaded:t.filesUploaded+1}}),t(n()),console.log(e)})}}(n())},r=n,a(i,r)}return s(e,t),e.prototype.render=function(){return Object(O.h)("div",{class:"row semi-transparent-bg",style:"margin-bottom:32px"},U,Object(O.h)("input",{class:"form-input col",style:"max-width:400px",type:"file",accept:".png, .jpg, .jpeg",value:this.state.files,onChange:this.onFileChange,multiple:!0}),Object(O.h)("button",{class:"btn btn-primary col float-right",onClick:this.bulkImport}," Bulk Import"),this.state.filesUploaded>0&&Object(O.h)("div",null,Object(O.h)("div",{class:"bar"},Object(O.h)("div",{class:"bar-item",role:"progressbar",style:"width:"+this.state.filesUploaded/this.state.files.length*100+"%;","aria-valuenow":this.state.filesUploaded.toString(),"aria-valuemin":"0","aria-valuemax":this.state.files.length.toString()})),Object(O.h)("div",null,this.state.filesUploaded,"/",this.state.files.length," uploaded")))},e}(O.Component),z=J,Y=Object(O.h)("div",{class:"modal-title h5"},"Delete Item?"),$=Object(O.h)("div",{class:"modal-body"},"Are you sure you want to delete this item? This action cannot be undone."),B=function(t){function e(){return l(this,e),c(this,t.apply(this,arguments))}return u(e,t),e.prototype.render=function(t){var e=A()("modal","modal-sm",{active:t.showDeleteModal});return Object(O.h)("div",{class:e},Object(O.h)("a",{onClick:t.hideDeleteModal,class:"modal-overlay","aria-label":"Close"}),Object(O.h)("div",{class:"modal-container"},Object(O.h)("div",{class:"modal-header"},Object(O.h)("a",{onClick:t.hideDeleteModal,class:"btn btn-clear float-right","aria-label":"Close"}),Y),$,Object(O.h)("div",{class:"modal-footer"},Object(O.h)("button",{class:"btn",onClick:t.hideDeleteModal}," Cancel"),Object(O.h)("button",{class:"btn btn-error",onClick:function(){return t.delChronicle(t.item.id)}}," Delete Item"))))},e}(O.Component),Q=B,X=n("khkS"),q=n.n(X),V=n("3F7m"),W=n.n(V),Z=Object(O.h)("div",{class:"text-center text-gray",style:"font-size:smaller;"},"- Scroll down to see a preview -"),G=function(t){function e(){var n,i,r;d(this,e);for(var o=arguments.length,a=Array(o),s=0;s<o;s++)a[s]=arguments[s];return n=i=h(this,t.call.apply(t,[this].concat(a))),i.state={invitation:i.props.memorial.invitationText.split("^J^J").join("\n")||""},i.onChange=function(t){var e;i.setState((e={},e[t.target.name]=t.target.value,e))},r=n,h(i,r)}return f(e,t),e.prototype.componentDidMount=function(){W.a.setOptions({sanitize:!0})},e.prototype.render=function(t){var e=this,n=A()("modal","modal-lg",{active:t.showModal},{"has-error":t.modalError}),i=(A()("form-input-hint","float-left",{"d-hide":!t.modalError}),window.innerWidth||document.documentElement.clientWidth||document.body.client.width);return Object(O.h)("div",{class:n},Object(O.h)("a",{onClick:t.hideModal,class:"modal-overlay","aria-label":"Close"}),Object(O.h)("div",{class:"modal-container"},Object(O.h)("div",{class:"modal-header"},Object(O.h)("a",{onClick:t.hideModal,class:"btn btn-clear float-right","aria-label":"Close"}),Object(O.h)("div",{class:"modal-title h5"},"Edit Invitation to ",t.memorial.nm1,"'s Memorial"),i<840&&Z),Object(O.h)("div",{class:"modal-body"},Object(O.h)("div",{class:i<840?"content":"content container columns"},Object(O.h)("form",{class:i<840?"form-group":"form-group column col-5"},Object(O.h)("textarea",{class:"form-input",rows:"16",value:this.state.invitation,onInput:this.onChange,name:"invitation"})),Object(O.h)("div",{class:i<840?"card":"card column col-7"},Object(O.h)("div",{class:"card-body",dangerouslySetInnerHTML:{__html:W()(this.state.invitation)}})))),Object(O.h)("div",{class:"modal-footer"},Object(O.h)("button",{class:"btn btn-primary",onClick:function(){t.updInvitation(e.state.invitation),t.hideModal()}}," Update Invitation"))))},e}(O.Component),H=G,K=(n("wI7h"),Object(O.h)("h4",{class:"col",style:"width:80%"},"Invite Others to Contribute")),tt=Object(O.h)("span",{class:"input-group-addon addon-sm"},Object(O.h)("i",{class:"icon icon-search"})),et=Object(O.h)("h5",null,"You haven't invited anyone yet"),nt=Object(O.h)("label",{class:"form-label"},"Enter email addresses"),it=function(t){function e(){var n,i,r;m(this,e);for(var o=arguments.length,a=Array(o),s=0;s<o;s++)a[s]=arguments[s];return n=i=p(this,t.call.apply(t,[this].concat(a))),i.state={email:"",emails:[],emailError:!1,active:!1,filter:"",showModal:!1},i.onChange=function(t){var e;i.setState((e={},e[t.target.name]=t.target.value,e))},i.hideModal=function(){i.setState({showModal:!1})},i._handleEmailChange=function(t){i.setState({email:t.target.value})},i._addEmail=function(t){if(t.preventDefault(),!q()(i.state.email))return void i.setState({emailError:!0});i.setState({emailError:!1}),i.setState({emails:[].concat(i.state.emails,[i.state.email]),email:""})},i._removeEmail=function(t){var e=i.state.emails.filter(function(e){return e!==t.target.name});i.setState({emails:e})},i.updEmails=function(){if(0===i.state.emails.length)return void alert("No new people to send inivations to, please add new email addresses.");fetch(j.a+"!updEmails",{method:"POST",body:JSON.stringify({emails:i.state.emails,memorial:i.props.memorial.urlNm,loginToken:window.sessionStorage.getItem("loginToken")})}).then(function(t){return t.json()}).then(function(t){console.log(t)})},r=n,p(i,r)}return b(e,t),e.prototype.render=function(t){var e=this,n=A()("form-group",{"has-error":this.state.emailError}),i=A()("form-input-hint",{"d-hide":!this.state.emailError});return Object(O.h)("div",{class:"semi-transparent-bg"},Object(O.h)("div",{class:"row my-2"},K,Object(O.h)("button",{class:"btn btn-primary col",onClick:function(){return e.setState({showModal:!0})}}," Edit Invitation")),Object(O.h)(H,{memorial:this.props.memorial,showModal:this.state.showModal,hideModal:this.hideModal,updInvitation:function(e){return t.updInvitation(e)}}),this.props.memorial.emails?Object(O.h)("div",null,Object(O.h)("span",{class:"badge","data-badge":this.props.memorial.emails.length.toString()},"Invitations Sent"),Object(O.h)("span",null,this.state.active?Object(O.h)("div",{class:"d-inline"},Object(O.h)("button",{class:"btn btn-sm ml-2",onClick:function(){return e.setState({active:!1})}}," hide"),Object(O.h)("div",{class:"input-group float-right"},tt,Object(O.h)("input",{class:"form-input input-sm",type:"text",value:this.state.filter,onInput:this.onChange,name:"filter"}))):Object(O.h)("button",{class:"btn btn-sm ml-2",onClick:function(){return e.setState({active:!0})}}," show")),this.state.active&&Object(O.h)("div",{class:"my-2"},""!==this.state.filter?this.props.memorial.emails.filter(function(t){return t.includes(e.state.filter)}).map(function(t){return Object(O.h)("span",{class:"chip"},t)}):this.props.memorial.emails.map(function(t){return Object(O.h)("span",{class:"chip"},t)}))):et,Object(O.h)("form",{class:n},nt,Object(O.h)("div",{class:"input-group"},Object(O.h)("input",{type:"email",class:"form-input",value:this.state.email,onChange:this._handleEmailChange}),Object(O.h)("button",{class:"btn btn-primary input-group-btn",type:"submit",onClick:this._addEmail},"Add")),Object(O.h)("p",{class:i},"Please enter a valid email address")),Object(O.h)("div",{class:"mt-2"},this.state.emails.map(function(t){return Object(O.h)("span",{class:"chip"},t,Object(O.h)("a",{class:"btn btn-clear","aria-label":"Close",role:"button",onClick:e._removeEmail,name:t}))})),Object(O.h)("div",{class:"row my-2"},Object(O.h)("button",{class:"btn btn-primary float-right",onClick:this.updEmails}," Send Invitations")))},e}(O.Component),rt=it,ot=n("NQR3"),at=n.n(ot),st=Object(O.h)("div",{class:"divider"}),lt=Object(O.h)("div",null,"This is the Atlas component"),ct=Object(O.h)("div",null,"This is the Shrine component"),ut=function(t){function e(n){v(this,e);var i=g(this,t.call(this,n));return i.state={item:{},showModal:!1,showDeleteModal:!1,active:"chronicle",items:i.props.user.memorials.find(function(t){return t.urlNm===i.props.urlNm}).items},i.onChange=function(t){var e=i.state.item;e[t.target.name]=t.target.value,i.setState({oldState:e})},i.onFileChange=function(t){var e=i.state.item;e.file=t.target.files[0],i.setState({oldState:e}),i.makeFileURL()},i.makeFileURL=function(){var t=i.state.item,e=new FileReader;e.onload=function(e){t.src=e.target.result,i.setState({oldState:t})},e.readAsDataURL(i.state.item.file)},i.updChronicle=function(){if(console.log("updChronicle"),!i.state.item.title||!i.state.item.start)return void alert("A new item must have a title and a date");if(i.state.item.file){var t=new FileReader;t.readAsDataURL(i.state.item.file),t.onload=function(t){var e=t.target.result.split(",")[1];fetch(j.a+"!updChronicle",{method:"POST",body:JSON.stringify({loginToken:window.sessionStorage.getItem("loginToken"),urlNm:i.props.urlNm,id:i.state.item.id,title:i.state.item.title,location:i.state.item.location,date:i.state.item.start,txt:i.state.item.txt,image:e})}).then(function(t){return t.json()}).then(function(t){console.log(t)}).then(i.setState({item:{}}))}}else fetch(j.a+"!updChronicle",{method:"POST",body:JSON.stringify({loginToken:window.sessionStorage.getItem("loginToken"),urlNm:i.props.urlNm,id:i.state.item.id,title:i.state.item.title,location:i.state.item.location,date:i.state.item.start,txt:i.state.item.txt})}).then(function(t){return t.json()}).then(function(t){console.log(t)}).then(i.setState({item:{}}));i.hideModal()},i.newChronicle=function(){if(console.log("newChronicle"),!i.state.item.title||!i.state.item.start)return void alert("A new item must have a title and a date");if(i.state.item.file){var t=new FileReader;t.readAsDataURL(i.state.item.file),t.onload=function(t){var e=t.target.result.split(",")[1];fetch(j.a+"!newChronicle",{method:"POST",body:JSON.stringify({urlNm:i.props.urlNm,title:i.state.item.title,subtitle:i.state.item.subtitle,location:i.state.item.location,date:i.state.item.start,txt:i.state.item.txt,image:e})}).then(function(t){return t.json()}).then(function(t){console.log(t),i.addItem(t)}).then(i.setState({item:{}}))}}else fetch(j.a+"!newChronicle",{method:"POST",body:JSON.stringify({urlNm:i.props.urlNm,title:i.state.item.title,subtitle:i.state.item.subtitle,location:i.state.item.location,date:i.state.item.start,txt:i.state.item.txt})}).then(function(t){return t.json()}).then(function(t){console.log(t),i.addItem(t)}).then(i.setState({item:{}}));i.hideModal()},i.delChronicle=function(){fetch(j.a+"!delChronicle",{method:"POST",body:JSON.stringify({id:i.state.item.id,loginToken:window.sessionStorage.getItem("loginToken")})}).then(function(t){return t.json()}).then(function(){i.hideDeleteModal();var t=i.state.items.find(function(t){return t.id===i.state.item.id});console.log(t),at.a.timeline().add({targets:".item-"+t.id,scale:1.1,duration:100}).add({targets:".item-"+t.id,scale:0,duration:500,complete:function(){var e=i.state.items.filter(function(e){return e!==t});i.setState({items:e});var n=document.querySelector(".item-"+t.id);n.parentNode.removeChild(n)}})})},i.updInvitation=function(t){if(i.setState(function(){return{invitation:t}}),i.state.invitation){var e=W()(i.state.invitation);console.log(e),fetch(j.a+"!updInvitation",{method:"POST",body:JSON.stringify({loginToken:window.sessionStorage.getItem("loginToken"),memorial:i.props.urlNm,markdown:e,invitation:i.state.invitation})}).then(function(t){return t.json()}).then(function(t){console.log(t)})}},i.showModal=function(t){var e=i.props.user.memorials.find(function(t){return t.urlNm===i.props.urlNm});i.setState({showModal:!0,item:e.items.find(function(e){return e.id===t})})},i.showDeleteModal=function(t){var e=i.props.user.memorials.find(function(t){return t.urlNm===i.props.urlNm});i.setState({showDeleteModal:!0,item:e.items.find(function(e){return e.id===t})})},i.hideModal=function(){var t=i.state.item;t.edited=!0,i.setState({showModal:!1,modalError:!1,oldItem:t})},i.hideDeleteModal=function(){i.setState({showDeleteModal:!1})},i.newItem=function(){i.showModal(),i.setState({item:{}})},W.a.setOptions({sanitize:!0}),i}return y(e,t),e.prototype.render=function(){var t=this,e=this.props.user.memorials.find(function(e){return e.urlNm===t.props.urlNm});return Object(O.h)(S.a,{avatarColumn:Object(O.h)("div",{class:"menu",style:"z-index:1;"},Object(O.h)("figure",{class:"centered avatar avatar-xxl"},Object(O.h)("img",{src:e.avatar})),Object(O.h)("h3",{class:"text-center mt-2"},e.nm),st,Object(O.h)("li",{class:"menu-item"},Object(O.h)(w.Link,{class:"menu-item",href:"/"+e.urlStr+"/"+e.urlNm+"/chronicle"},"View Chronicle"))),contentColumn:Object(O.h)("div",null,Object(O.h)("ul",{class:"tab tab-block"},Object(O.h)("li",{class:"tab-item c-hand "+("chronicle"===this.state.active?"active":"")},Object(O.h)("a",{onClick:function(){return t.setState({active:"chronicle"})}},"Chronicle")),Object(O.h)("li",{class:"tab-item c-hand "+("atlas"===this.state.active?"active":"")},Object(O.h)("a",{onClick:function(){return t.setState({active:"atlas"})}}," Atlas")),Object(O.h)("li",{class:"tab-item c-hand "+("shrine"===this.state.active?"active":"")},Object(O.h)("a",{onClick:function(){return t.setState({active:"shrine"})}},"Shrine")),Object(O.h)("li",{class:"tab-item c-hand "+("invitations"===this.state.active?"active":"")},Object(O.h)("a",{onClick:function(){return t.setState({active:"invitations"})}}," Invitations"))),"chronicle"===this.state.active&&Object(O.h)("div",null,Object(O.h)(z,{urlNm:e.urlNm}),Object(O.h)(T,{showModal:this.showModal,items:this.state.items,newItem:this.newItem,showDeleteModal:function(e){return t.showDeleteModal(e)}}),Object(O.h)(R,{showModal:this.state.showModal,hideModal:this.hideModal,updChronicle:this.updChronicle,newChronicle:this.newChronicle,onChange:this.onChange,onFileChange:this.onFileChange,item:this.state.item}),Object(O.h)(Q,{item:this.state.item,delChronicle:this.delChronicle,showDeleteModal:this.state.showDeleteModal,hideDeleteModal:this.hideDeleteModal})),"atlas"===this.state.active&&lt,"shrine"===this.state.active&&ct,"invitations"===this.state.active&&Object(O.h)(rt,{memorial:e,updInvitation:function(e){return t.updInvitation(e)}}))})},e}(O.Component);e.default=ut},NQR3:function(t,e,n){(function(n){var i,r,o,a={scope:{}};a.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,n){if(n.get||n.set)throw new TypeError("ES3 does not support getters and setters.");t!=Array.prototype&&t!=Object.prototype&&(t[e]=n.value)},a.getGlobal=function(t){return"undefined"!=typeof window&&window===t?t:void 0!==n&&null!=n?n:t},a.global=a.getGlobal(this),a.SYMBOL_PREFIX="jscomp_symbol_",a.initSymbol=function(){a.initSymbol=function(){},a.global.Symbol||(a.global.Symbol=a.Symbol)},a.symbolCounter_=0,a.Symbol=function(t){return a.SYMBOL_PREFIX+(t||"")+a.symbolCounter_++},a.initSymbolIterator=function(){a.initSymbol();var t=a.global.Symbol.iterator;t||(t=a.global.Symbol.iterator=a.global.Symbol("iterator")),"function"!=typeof Array.prototype[t]&&a.defineProperty(Array.prototype,t,{configurable:!0,writable:!0,value:function(){return a.arrayIterator(this)}}),a.initSymbolIterator=function(){}},a.arrayIterator=function(t){var e=0;return a.iteratorPrototype(function(){return e<t.length?{done:!1,value:t[e++]}:{done:!0}})},a.iteratorPrototype=function(t){return a.initSymbolIterator(),t={next:t},t[a.global.Symbol.iterator]=function(){return this},t},a.array=a.array||{},a.iteratorFromArray=function(t,e){a.initSymbolIterator(),t instanceof String&&(t+="");var n=0,i={next:function(){if(n<t.length){var r=n++;return{value:e(r,t[r]),done:!1}}return(i.next=function(){return{done:!0,value:void 0}})()}};return i[Symbol.iterator]=function(){return i},i},(a.polyfill=function(t,e,n,i){if(e){for(n=a.global,t=t.split("."),i=0;i<t.length-1;i++){var r=t[i];r in n||(n[r]={}),n=n[r]}t=t[t.length-1],i=n[t],e=e(i),e!=i&&null!=e&&a.defineProperty(n,t,{configurable:!0,writable:!0,value:e})}})("Array.prototype.keys",function(t){return t||function(){return a.iteratorFromArray(this,function(t){return t})}},"es6-impl","es3");var s=this;!function(n,a){r=[],i=a,void 0!==(o="function"==typeof i?i.apply(e,r):i)&&(t.exports=o)}(0,function(){function t(t){if(!R.col(t))try{return document.querySelectorAll(t)}catch(t){}}function e(t,e){for(var n=t.length,i=2<=arguments.length?arguments[1]:void 0,r=[],o=0;o<n;o++)if(o in t){var a=t[o];e.call(i,a,o,t)&&r.push(a)}return r}function n(t){return t.reduce(function(t,e){return t.concat(R.arr(e)?n(e):e)},[])}function i(e){return R.arr(e)?e:(R.str(e)&&(e=t(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function r(t,e){return t.some(function(t){return t===e})}function o(t){var e,n={};for(e in t)n[e]=t[e];return n}function a(t,e){var n,i=o(t);for(n in t)i[n]=e.hasOwnProperty(n)?e[n]:t[n];return i}function l(t,e){var n,i=o(t);for(n in e)i[n]=R.und(t[n])?e[n]:t[n];return i}function c(t){t=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(t,e,n,i){return e+e+n+n+i+i});var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);t=parseInt(e[1],16);var n=parseInt(e[2],16),e=parseInt(e[3],16);return"rgba("+t+","+n+","+e+",1)"}function u(t){function e(t,e,n){return 0>n&&(n+=1),1<n&&--n,n<1/6?t+6*(e-t)*n:.5>n?e:n<2/3?t+(e-t)*(2/3-n)*6:t}var n=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t);t=parseInt(n[1])/360;var i=parseInt(n[2])/100,r=parseInt(n[3])/100,n=n[4]||1;if(0==i)r=i=t=r;else{var o=.5>r?r*(1+i):r+i-r*i,a=2*r-o,r=e(a,o,t+1/3),i=e(a,o,t);t=e(a,o,t-1/3)}return"rgba("+255*r+","+255*i+","+255*t+","+n+")"}function d(t){if(t=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t))return t[2]}function h(t){return-1<t.indexOf("translate")||"perspective"===t?"px":-1<t.indexOf("rotate")||-1<t.indexOf("skew")?"deg":void 0}function f(t,e){return R.fnc(t)?t(e.target,e.id,e.total):t}function m(t,e){if(e in t.style)return getComputedStyle(t).getPropertyValue(e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function p(t,e){return R.dom(t)&&r(L,e)?"transform":R.dom(t)&&(t.getAttribute(e)||R.svg(t)&&t[e])?"attribute":R.dom(t)&&"transform"!==e&&m(t,e)?"css":null!=t[e]?"object":void 0}function b(t,n){var i=h(n),i=-1<n.indexOf("scale")?1:0+i;if(!(t=t.style.transform))return i;for(var r=[],o=[],a=[],s=/(\w+)\((.+?)\)/g;r=s.exec(t);)o.push(r[1]),a.push(r[2]);return t=e(a,function(t,e){return o[e]===n}),t.length?t[0]:i}function v(t,e){switch(p(t,e)){case"transform":return b(t,e);case"css":return m(t,e);case"attribute":return t.getAttribute(e)}return t[e]||0}function g(t,e){var n=/^(\*=|\+=|-=)/.exec(t);if(!n)return t;var i=d(t)||0;switch(e=parseFloat(e),t=parseFloat(t.replace(n[0],"")),n[0][0]){case"+":return e+t+i;case"-":return e-t+i;case"*":return e*t+i}}function y(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function O(t){t=t.points;for(var e,n=0,i=0;i<t.numberOfItems;i++){var r=t.getItem(i);0<i&&(n+=y(e,r)),e=r}return n}function j(t){if(t.getTotalLength)return t.getTotalLength();switch(t.tagName.toLowerCase()){case"circle":return 2*Math.PI*t.getAttribute("r");case"rect":return 2*t.getAttribute("width")+2*t.getAttribute("height");case"line":return y({x:t.getAttribute("x1"),y:t.getAttribute("y1")},{x:t.getAttribute("x2"),y:t.getAttribute("y2")});case"polyline":return O(t);case"polygon":var e=t.points;return O(t)+y(e.getItem(e.numberOfItems-1),e.getItem(0))}}function w(t,e){function n(n){return n=void 0===n?0:n,t.el.getPointAtLength(1<=e+n?e+n:0)}var i=n(),r=n(-1),o=n(1);switch(t.property){case"x":return i.x;case"y":return i.y;case"angle":return 180*Math.atan2(o.y-r.y,o.x-r.x)/Math.PI}}function S(t,e){var n,i=/-?\d*\.?\d+/g;if(n=R.pth(t)?t.totalLength:t,R.col(n))if(R.rgb(n)){var r=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(n);n=r?"rgba("+r[1]+",1)":n}else n=R.hex(n)?c(n):R.hsl(n)?u(n):void 0;else r=(r=d(n))?n.substr(0,n.length-r.length):n,n=e&&!/\s/g.test(n)?r+e:r;return n+="",{original:n,numbers:n.match(i)?n.match(i).map(Number):[0],strings:R.str(t)||e?n.split(i):[]}}function C(t){return t=t?n(R.arr(t)?t.map(i):i(t)):[],e(t,function(t,e,n){return n.indexOf(t)===e})}function x(t){var e=C(t);return e.map(function(t,n){return{target:t,id:n,total:e.length}})}function M(t,e){var n=o(e);if(R.arr(t)){var r=t.length;2!==r||R.obj(t[0])?R.fnc(e.duration)||(n.duration=e.duration/r):t={value:t}}return i(t).map(function(t,n){return n=n?0:e.delay,t=R.obj(t)&&!R.pth(t)?t:{value:t},R.und(t.delay)&&(t.delay=n),t}).map(function(t){return l(t,n)})}function I(t,e){var n,i={};for(n in t){var r=f(t[n],e);R.arr(r)&&(r=r.map(function(t){return f(t,e)}),1===r.length&&(r=r[0])),i[n]=r}return i.duration=parseFloat(i.duration),i.delay=parseFloat(i.delay),i}function k(t){return R.arr(t)?U.apply(this,t):J[t]}function E(t,e){var n;return t.tweens.map(function(i){i=I(i,e);var r=i.value,o=v(e.target,t.name),a=n?n.to.original:o,a=R.arr(r)?r[0]:a,s=g(R.arr(r)?r[1]:r,a),o=d(s)||d(a)||d(o);return i.from=S(a,o),i.to=S(s,o),i.start=n?n.end:t.offset,i.end=i.start+i.delay+i.duration,i.easing=k(i.easing),i.elasticity=(1e3-Math.min(Math.max(i.elasticity,1),999))/1e3,i.isPath=R.pth(r),i.isColor=R.col(i.from.original),i.isColor&&(i.round=1),n=i})}function T(t,i){return e(n(t.map(function(t){return i.map(function(e){var n=p(t.target,e.name);if(n){var i=E(e,t);e={type:n,property:e.name,animatable:t,tweens:i,duration:i[i.length-1].end,delay:i[0].delay}}else e=void 0;return e})})),function(t){return!R.und(t)})}function P(t,e,n,i){var r="delay"===t;return e.length?(r?Math.min:Math.max).apply(Math,e.map(function(e){return e[t]})):r?i.delay:n.offset+i.delay+i.duration}function A(t){var e,n=a(D,t),i=a(F,t),r=x(t.targets),o=[],s=l(n,i);for(e in t)s.hasOwnProperty(e)||"targets"===e||o.push({name:e,offset:s.offset,tweens:M(t[e],i)});return t=T(r,o),l(n,{children:[],animatables:r,animations:t,duration:P("duration",t,n,i),delay:P("delay",t,n,i)})}function N(t){function n(){return window.Promise&&new Promise(function(t){return d=t})}function i(t){return f.reversed?f.duration-t:t}function r(t){for(var n=0,i={},r=f.animations,o=r.length;n<o;){var a=r[n],s=a.animatable,l=a.tweens,c=l.length-1,u=l[c];c&&(u=e(l,function(e){return t<e.end})[0]||u);for(var l=Math.min(Math.max(t-u.start-u.delay,0),u.duration)/u.duration,d=isNaN(l)?1:u.easing(l,u.elasticity),l=u.to.strings,h=u.round,c=[],p=void 0,p=u.to.numbers.length,b=0;b<p;b++){var v=void 0,v=u.to.numbers[b],g=u.from.numbers[b],v=u.isPath?w(u.value,d*v):g+d*(v-g);h&&(u.isColor&&2<b||(v=Math.round(v*h)/h)),c.push(v)}if(u=l.length)for(p=l[0],d=0;d<u;d++)h=l[d+1],b=c[d],isNaN(b)||(p=h?p+(b+h):p+(b+" "));else p=c[0];z[a.type](s.target,a.property,p,i,s.id),a.currentValue=p,n++}if(n=Object.keys(i).length)for(r=0;r<n;r++)_||(_=m(document.body,"transform")?"transform":"-webkit-transform"),f.animatables[r].target.style[_]=i[r].join(" ");f.currentTime=t,f.progress=t/f.duration*100}function o(t){f[t]&&f[t](f)}function a(){f.remaining&&!0!==f.remaining&&f.remaining--}function s(t){var e=f.duration,s=f.offset,m=s+f.delay,p=f.currentTime,b=f.reversed,v=i(t);if(f.children.length){var g=f.children,y=g.length;if(v>=f.currentTime)for(var O=0;O<y;O++)g[O].seek(v);else for(;y--;)g[y].seek(v)}(v>=m||!e)&&(f.began||(f.began=!0,o("begin")),o("run")),v>s&&v<e?r(v):(v<=s&&0!==p&&(r(0),b&&a()),(v>=e&&p!==e||!e)&&(r(e),b||a())),o("update"),t>=e&&(f.remaining?(c=l,"alternate"===f.direction&&(f.reversed=!f.reversed)):(f.pause(),f.completed||(f.completed=!0,o("complete"),"Promise"in window&&(d(),h=n()))),u=0)}t=void 0===t?{}:t;var l,c,u=0,d=null,h=n(),f=A(t);return f.reset=function(){var t=f.direction,e=f.loop;for(f.currentTime=0,f.progress=0,f.paused=!0,f.began=!1,f.completed=!1,f.reversed="reverse"===t,f.remaining="alternate"===t&&1===e?2:e,r(0),t=f.children.length;t--;)f.children[t].reset()},f.tick=function(t){l=t,c||(c=l),s((u+l-c)*N.speed)},f.seek=function(t){s(i(t))},f.pause=function(){var t=Y.indexOf(f);-1<t&&Y.splice(t,1),f.paused=!0},f.play=function(){f.paused&&(f.paused=!1,c=0,u=i(f.currentTime),Y.push(f),$||B())},f.reverse=function(){f.reversed=!f.reversed,c=0,u=i(f.currentTime)},f.restart=function(){f.pause(),f.reset(),f.play()},f.finished=h,f.reset(),f.autoplay&&f.play(),f}var _,D={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},F={duration:1e3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},L="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),R={arr:function(t){return Array.isArray(t)},obj:function(t){return-1<Object.prototype.toString.call(t).indexOf("Object")},pth:function(t){return R.obj(t)&&t.hasOwnProperty("totalLength")},svg:function(t){return t instanceof SVGElement},dom:function(t){return t.nodeType||R.svg(t)},str:function(t){return"string"==typeof t},fnc:function(t){return"function"==typeof t},und:function(t){return void 0===t},hex:function(t){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)},rgb:function(t){return/^rgb/.test(t)},hsl:function(t){return/^hsl/.test(t)},col:function(t){return R.hex(t)||R.rgb(t)||R.hsl(t)}},U=function(){function t(t,e,n){return(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t}return function(e,n,i,r){if(0<=e&&1>=e&&0<=i&&1>=i){var o=new Float32Array(11);if(e!==n||i!==r)for(var a=0;11>a;++a)o[a]=t(.1*a,e,i);return function(a){if(e===n&&i===r)return a;if(0===a)return 0;if(1===a)return 1;for(var s=0,l=1;10!==l&&o[l]<=a;++l)s+=.1;--l;var l=s+(a-o[l])/(o[l+1]-o[l])*.1,c=3*(1-3*i+3*e)*l*l+2*(3*i-6*e)*l+3*e;if(.001<=c){for(s=0;4>s&&0!==(c=3*(1-3*i+3*e)*l*l+2*(3*i-6*e)*l+3*e);++s)var u=t(l,e,i)-a,l=l-u/c;a=l}else if(0===c)a=l;else{var l=s,s=s+.1,d=0;do{u=l+(s-l)/2,c=t(u,e,i)-a,0<c?s=u:l=u}while(1e-7<Math.abs(c)&&10>++d);a=u}return t(a,n,r)}}}}(),J=function(){function t(t,e){return 0===t||1===t?t:-Math.pow(2,10*(t-1))*Math.sin(2*(t-1-e/(2*Math.PI)*Math.asin(1))*Math.PI/e)}var e,n="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),i={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],t],Out:[[.25,.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(e,n){return 1-t(1-e,n)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(e,n){return.5>e?t(2*e,n)/2:1-t(-2*e+2,n)/2}]},r={linear:U(.25,.25,.75,.75)},o={};for(e in i)o.type=e,i[o.type].forEach(function(t){return function(e,i){r["ease"+t.type+n[i]]=R.fnc(e)?e:U.apply(s,e)}}(o)),o={type:o.type};return r}(),z={css:function(t,e,n){return t.style[e]=n},attribute:function(t,e,n){return t.setAttribute(e,n)},object:function(t,e,n){return t[e]=n},transform:function(t,e,n,i,r){i[r]||(i[r]=[]),i[r].push(e+"("+n+")")}},Y=[],$=0,B=function(){function t(){$=requestAnimationFrame(e)}function e(e){var n=Y.length;if(n){for(var i=0;i<n;)Y[i]&&Y[i].tick(e),i++;t()}else cancelAnimationFrame($),$=0}return t}();return N.version="2.2.0",N.speed=1,N.running=Y,N.remove=function(t){t=C(t);for(var e=Y.length;e--;)for(var n=Y[e],i=n.animations,o=i.length;o--;)r(t,i[o].animatable.target)&&(i.splice(o,1),i.length||n.pause())},N.getValue=v,N.path=function(e,n){var i=R.str(e)?t(e)[0]:e,r=n||100;return function(t){return{el:i,property:t,totalLength:j(i)*(r/100)}}},N.setDashoffset=function(t){var e=j(t);return t.setAttribute("stroke-dasharray",e),e},N.bezier=U,N.easings=J,N.timeline=function(t){var e=N(t);return e.pause(),e.duration=0,e.add=function(n){return e.children.forEach(function(t){t.began=!0,t.completed=!0}),i(n).forEach(function(n){var i=l(n,a(F,t||{}));i.targets=i.targets||t.targets,n=e.duration;var r=i.offset;i.autoplay=!1,i.direction=e.direction,i.offset=R.und(r)?n:g(r,n),e.began=!0,e.completed=!0,e.seek(i.offset),i=N(i),i.began=!0,i.completed=!0,i.duration>n&&(e.duration=i.duration),e.children.push(i)}),e.seek(0),e.reset(),e.autoplay&&e.restart(),e},e},N.random=function(t,e){return Math.floor(Math.random()*(e-t+1))+t},N})}).call(e,n("h6ac"))}});
//# sourceMappingURL=route-ManageMemorial.chunk.ef2fa.js.map