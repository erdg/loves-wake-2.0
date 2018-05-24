"use strict";var precacheConfig=[["/assets/favicon.ico","32c21b1029948e50d0b5a13138d35a26"],["/assets/icons/android-chrome-192x192.png","9473d05f9469e3bf6ad9bf9068cd9741"],["/assets/icons/android-chrome-384x384.png","56cad83eec8747f26521318e66b0a1d0"],["/assets/icons/apple-touch-icon.png","86535111dda0d14dd8a68fc4db1c072d"],["/assets/icons/favicon-16x16.png","bfca4faea75cc1bf542447036c81d489"],["/assets/icons/favicon-32x32.png","861633fa48d02ff5ed23723161973b1e"],["/assets/icons/mstile-150x150.png","e527ca999d0cd4117b919e12f7def55f"],["/assets/loves-wake-logo.png","c15ec0d101336e56a99fde70b5c695af"],["/assets/loves-wake.png","5c800bb9cb2bc1c68d91bdd059888dfa"],["/bundle.c5089.js","51e214d910178dc6981659dc20a208ea"],["/favicon.ico","32c21b1029948e50d0b5a13138d35a26"],["/index.html","d91ad6c5abfedebe9c52cf1bcad3d50e"],["/manifest.json","b3f96efd3784123dc269efd35ed29683"],["/route-Atlas.chunk.d564c.js","312f0329fa5410d77fcdd0c38cbda2e9"],["/route-Chronicle.chunk.25963.js","ddd62e353f9fa4065c98a8fc87237d20"],["/route-Entry.chunk.48e9b.js","f5e71ca4bd8e47c34ab0a1393446d9f8"],["/route-Login.chunk.50b85.js","39d7950435ed30ea62c3068c29c2c26d"],["/route-ManageMemorial.chunk.ef2fa.js","075ba53bb2661fd088d12a3daa0ebb78"],["/route-Shrine.chunk.c027b.js","c746c81a5372385aee047ccc1588ab9f"],["/route-UserSettings.chunk.edbee.js","f7459c104ef6c0fbae4455917d52f302"],["/route-create-shrine.chunk.822ea.js","4869752471c9d0b24688978f11115fd4"],["/route-home.chunk.d8b66.js","945ca7de4174439f3329c0ff651e5b6c"],["/route-signup.chunk.4bc3d.js","dca49833dc4a28950170f58b118a3baf"],["/route-user.chunk.b4b87.js","4af28e103874ddd10c9a62deeee23269"],["/style.694d1.css","fbb8afe59392487706bb7d312d226c6a"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,n){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=n),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,n,t,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(n)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,n){if(0===e.length)return!0;var t=new URL(n).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return n.every(function(n){return!n.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var n=e[0],t=e[1],a=new URL(n,self.location),r=createCacheKey(a,hashParamName,t,!1);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var a=new Request(t,{credentials:"same-origin"});return fetch(a).then(function(n){if(!n.ok)throw new Error("Request for "+t+" returned a response with status "+n.status);return cleanResponse(n).then(function(n){return e.put(t,n)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!n.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var n,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),a="index.html";(n=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,a),n=urlsToCacheKeys.has(t));var r="index.html";!n&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL(r,self.location).toString(),n=urlsToCacheKeys.has(t)),n&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(n){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,n),fetch(e.request)}))}});