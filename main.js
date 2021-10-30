(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r){var o=e.data,i=e.handleCardClick,u=e.handleCardLike,a=e.handleCardDelete;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._data=o,this._name=o.name,this._link=o.link,this._likeCount=o.likes.length,this._id=o._id,this._handleCardClick=i,this._handleCardLike=u,this._handleCardDelete=a,this._cardSelector=n,this._userApi=r}var n,r;return n=t,(r=[{key:"_checkIsLiked",value:function(){var e=this;this._userApi.then((function(t){e._data.likes.some((function(n){n._id===t._id&&e._element.querySelector(".element__like-button").classList.add("element__like-button_active")}))}))}},{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".element__like-button").addEventListener("click",this._handleCardLike),this._element.querySelector(".element__remove-button").addEventListener("click",(function(){e._handleCardDelete()})),this._element.querySelector(".element__image").addEventListener("click",(function(){e._handleCardClick()}))}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._setEventListeners(),this._checkIsLiked(),this._title=this._element.querySelector(".element__title"),this._image=this._element.querySelector(".element__image"),this._like=this._element.querySelector(".element__like-count"),this._title.textContent=this._name,this._image.src=this._link,this._image.alt=this._name,this._like.textContent=this._likeCount,this._element}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._inactiveButtonClass=t.inactiveButtonClass,this._formElement=document.querySelector(n)}var t,r;return t=e,(r=[{key:"_showInputError",value:function(e){this._errorElement=this._formElement.querySelector("#".concat(e.id,"-error")),e.classList.add(this._inputErrorClass),this._errorElement.textContent=e.validationMessage,this._errorElement.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){this._errorElement=this._formElement.querySelector("#".concat(e.id,"-error")),e.classList.remove(this._inputErrorClass),this._errorElement.classList.remove(this._errorClass),this._errorElement.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_hasNotInputValue",value:function(){return this._inputList.every((function(e){return 0===e.value.lenght}))}},{key:"_disableSubmitButton",value:function(){this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)}},{key:"_enableSubmitButton",value:function(){this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.removeAttribute("disabled",!1)}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput(this._inputList)||this._hasNotInputValue(this._inputList)?this._disableSubmitButton():this._enableSubmitButton()}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"_setEventListeners",value:function(){var e=this;this._buttonElement=this._formElement.querySelector(this._submitButtonSelector),this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))})),this._toggleButtonState()}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&n(t.prototype,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=n}var t,n;return t=e,n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}}],n&&o(t.prototype,n),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=t,this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){t.target.classList.contains("popup_opened")&&e.close()})),this._popup.querySelector(".popup__close-button").addEventListener("click",(function(){e.close()}))}}])&&u(t.prototype,n),e}();function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t,n){return s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=h(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}},s(e,t,n||e)}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}function p(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=h(r);if(o){var n=h(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return p(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._title=t._popup.querySelector(".popup__title-card"),t._image=t._popup.querySelector(".popup__image"),t}return t=u,(n=[{key:"open",value:function(e){var t=e.link,n=e.name;this._title.textContent=n,this._title.alt=n,this._image.src=t,s(h(u.prototype),"open",this).call(this)}}])&&l(t.prototype,n),u}(a);function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t,n){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}},v(e,t,n||e)}function m(e,t){return m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},m(e,t)}function b(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(r);if(o){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return b(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._popup=e,n._form=n._popup.querySelector(".popup__form"),n._inputList=n._form.querySelectorAll(".popup__input"),n._saveButton=n._form.querySelector(".popup__save-button"),n._handleFormSubmit=t,n}return t=u,(n=[{key:"renderLoading",value:function(e){this._saveButton.textContent=e?this._saveButton.textContent+="...":this._saveButton.textContent.slice(0,-3)}},{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"close",value:function(){this._form.reset(),v(k(u.prototype),"close",this).call(this)}},{key:"setEventListeners",value:function(){var e=this;this._form.addEventListener("submit",(function(t){t.preventDefault(),e.renderLoading(!0),e._handleFormSubmit(e._getInputValues())})),v(k(u.prototype),"setEventListeners",this).call(this)}}])&&y(t.prototype,n),u}(a);function E(e){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},E(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(e,t,n){return w="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}},w(e,t,n||e)}function C(e,t){return C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},C(e,t)}function L(e,t){if(t&&("object"===E(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}var j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(o){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return L(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._popup=e,t._form=t._popup.querySelector(".popup__form"),t}return t=u,(n=[{key:"handelFunction",value:function(e){this._function=e}},{key:"setEventListeners",value:function(){var e=this;this._form.addEventListener("submit",(function(t){t.preventDefault(),e._function()})),w(O(u.prototype),"setEventListeners",this).call(this)}}])&&S(t.prototype,n),u}(a);function q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var P=function(){function e(t){var n=t.selectorName,r=t.selectorAbout,o=t.selectorAvatar,i=t.selectorProfile;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=n,this._about=r,this._avatar=o,this._profileId=i}var t,n;return t=e,n=[{key:"getUserInfo",value:function(){return this._data={name:this._name.textContent,about:this._about.textContent},this._data}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about,r=e.avatar,o=e._id;this._name.textContent=t,this._about.textContent=n,this._avatar.src=r,this._avatar.alt=t,this._profileId.id=o}}],n&&q(t.prototype,n),e}();function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var R=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=t.url,this._headers=t.headers}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"putData",value:function(e,t){return fetch("".concat(this._url).concat(e).concat(t),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"patchData",value:function(e,t){return fetch("".concat(this._url).concat(e),{method:"PATCH",headers:this._headers,body:JSON.stringify(t)}).then(this._checkResponse)}},{key:"deleteData",value:function(e,t){return fetch("".concat(this._url).concat(e).concat(t),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"addData",value:function(e,t){return fetch("".concat(this._url).concat(e),{method:"POST",headers:this._headers,body:JSON.stringify(t)}).then(this._checkResponse)}},{key:"getData",value:function(e){return fetch("".concat(this._url).concat(e),{method:"GET",headers:this._headers}).then(this._checkResponse)}}])&&I(t.prototype,n),e}(),B=document.querySelector(".popup_type_edit"),D=document.querySelector(".profile__edit-button"),T=document.querySelector(".popup_type_avatar"),x=document.querySelector(".profile__avatar-button"),A=document.querySelector(".popup__input_type_name"),V=document.querySelector(".popup__input_type_job"),U=document.querySelector(".popup_type_add"),N=document.querySelector(".profile__add-button"),F=document.querySelector(".popup_type_card"),J=document.querySelector(".popup_type_confirm"),M=document.querySelector(".elements"),z=document.querySelector(".profile__avatar"),G=document.querySelector(".profile__name"),H=document.querySelector(".profile__job"),$=document.querySelector(".profile"),K={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function Q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var W=new r(K,".popup__form_type_edit"),X=new r(K,".popup__form_type_add"),Y=new r(K,".popup__form_type_avatar");W.enableValidation(),X.enableValidation(),Y.enableValidation();var Z=new i({renderer:function(e){var n,r;Z.addItem(r=new t({data:n=e,handleCardClick:function(){ie.open(n)},handleCardLike:function(e){e.target.classList.contains("element__like-button_active")||ee.putData("cards/likes/",n._id).then((function(t){e.target.classList.add("element__like-button_active"),r.querySelector(".element__like-count").textContent=t.likes.length})).catch((function(e){console.log(e)})),e.target.classList.contains("element__like-button_active")&&ee.deleteData("cards/likes/",n._id).then((function(t){e.target.classList.remove("element__like-button_active"),r.querySelector(".element__like-count").textContent=t.likes.length})).catch((function(e){console.log(e)}))},handleCardDelete:function(){ue.open(),ue.handelFunction((function(){ee.deleteData("cards/",n._id).then((function(){r.remove()})).then((function(){ue.close()})).catch((function(e){console.log(e)}))}))}},".element-template",ae).generateCard())}},M),ee=new R({url:"https://nomoreparties.co/v1/cohort-29/",headers:{authorization:"48b4784f-cf14-43a9-b48d-b9db9c186300","Content-Type":"application/json"}}),te=new P({selectorName:G,selectorAbout:H,selectorAvatar:z,selectorProfile:$}),ne=new g(T,(function(e){ee.patchData("users/me/avatar",e).then((function(e){te.setUserInfo(e)})).then((function(){ne.close()})).catch((function(e){console.log(e)})).finally((function(){ne.renderLoading(!1)}))})),re=new g(B,(function(e){ee.patchData("users/me",e).then((function(e){te.setUserInfo(e)})).then((function(){re.close()})).catch((function(e){console.log(e)})).finally((function(){re.renderLoading(!1)}))})),oe=new g(U,(function(e){ee.addData("cards/",e).then((function(e){Z.renderItems([e])})).then((function(){oe.close()})).catch((function(e){console.log(e)})).finally((function(){oe.renderLoading(!1)}))})),ie=new _(F),ue=new j(J),ae=ee.getData("users/me"),ce=ee.getData("cards/");Promise.all([ae,ce]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],u=!0,a=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);u=!0);}catch(e){a=!0,o=e}finally{try{u||null==n.return||n.return()}finally{if(a)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return Q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Q(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];te.setUserInfo(o),Z.renderItems(i)})).catch((function(e){console.log(e)})),re.setEventListeners(),oe.setEventListeners(),ie.setEventListeners(),ue.setEventListeners(),ne.setEventListeners(),x.addEventListener("click",(function(){ne.open(),Y.resetValidation()})),D.addEventListener("click",(function(){var e;re.open(),e=te.getUserInfo(),A.value=e.name,V.value=e.about,W.resetValidation()})),N.addEventListener("click",(function(){oe.open(),X.resetValidation()}))})();