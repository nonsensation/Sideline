import{w as X}from"./index.c4b2a539.js";import{T as oe}from"./index.b0be7b9a.js";const E={};function V(n){return n==="local"?localStorage:sessionStorage}function ie(n,o,e){const c=(e==null?void 0:e.serializer)??JSON,p=(e==null?void 0:e.storage)??"local",v=typeof window<"u"&&typeof document<"u";function _(C,l){v&&V(p).setItem(C,c.stringify(l))}if(!E[n]){const C=X(o,t=>{const r=v?V(p).getItem(n):null;if(r&&t(c.parse(r)),v){const f=d=>{d.key===n&&t(d.newValue?c.parse(d.newValue):null)};return window.addEventListener("storage",f),()=>window.removeEventListener("storage",f)}}),{subscribe:l,set:u}=C;E[n]={set(t){_(n,t),u(t)},update(t){const r=t(oe(C));_(n,r),u(r)},subscribe:l}}return E[n]}var P=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ae(n){if(n.__esModule)return n;var o=n.default;if(typeof o=="function"){var e=function c(){if(this instanceof c){var p=[null];p.push.apply(p,arguments);var v=Function.bind.apply(o,p);return new v}return o.apply(this,arguments)};e.prototype=o.prototype}else e={};return Object.defineProperty(e,"__esModule",{value:!0}),Object.keys(n).forEach(function(c){var p=Object.getOwnPropertyDescriptor(n,c);Object.defineProperty(e,c,p.get?p:{enumerable:!0,get:function(){return n[c]}})}),e}var S={},ce={get exports(){return S},set exports(n){S=n}},$,U;function fe(){if(U)return $;U=1;var n=1e3,o=n*60,e=o*60,c=e*24,p=c*7,v=c*365.25;$=function(t,r){r=r||{};var f=typeof t;if(f==="string"&&t.length>0)return _(t);if(f==="number"&&isFinite(t))return r.long?l(t):C(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function _(t){if(t=String(t),!(t.length>100)){var r=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(r){var f=parseFloat(r[1]),d=(r[2]||"ms").toLowerCase();switch(d){case"years":case"year":case"yrs":case"yr":case"y":return f*v;case"weeks":case"week":case"w":return f*p;case"days":case"day":case"d":return f*c;case"hours":case"hour":case"hrs":case"hr":case"h":return f*e;case"minutes":case"minute":case"mins":case"min":case"m":return f*o;case"seconds":case"second":case"secs":case"sec":case"s":return f*n;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return f;default:return}}}}function C(t){var r=Math.abs(t);return r>=c?Math.round(t/c)+"d":r>=e?Math.round(t/e)+"h":r>=o?Math.round(t/o)+"m":r>=n?Math.round(t/n)+"s":t+"ms"}function l(t){var r=Math.abs(t);return r>=c?u(t,r,c,"day"):r>=e?u(t,r,e,"hour"):r>=o?u(t,r,o,"minute"):r>=n?u(t,r,n,"second"):t+" ms"}function u(t,r,f,d){var g=r>=f*1.5;return Math.round(t/f)+" "+d+(g?"s":"")}return $}function ue(n){e.debug=e,e.default=e,e.coerce=l,e.disable=v,e.enable=p,e.enabled=_,e.humanize=fe(),e.destroy=u,Object.keys(n).forEach(t=>{e[t]=n[t]}),e.names=[],e.skips=[],e.formatters={};function o(t){let r=0;for(let f=0;f<t.length;f++)r=(r<<5)-r+t.charCodeAt(f),r|=0;return e.colors[Math.abs(r)%e.colors.length]}e.selectColor=o;function e(t){let r,f=null,d,g;function h(...a){if(!h.enabled)return;const w=h,s=Number(new Date),i=s-(r||s);w.diff=i,w.prev=r,w.curr=s,r=s,a[0]=e.coerce(a[0]),typeof a[0]!="string"&&a.unshift("%O");let y=0;a[0]=a[0].replace(/%([a-zA-Z%])/g,(F,b)=>{if(F==="%%")return"%";y++;const x=e.formatters[b];if(typeof x=="function"){const B=a[y];F=x.call(w,B),a.splice(y,1),y--}return F}),e.formatArgs.call(w,a),(w.log||e.log).apply(w,a)}return h.namespace=t,h.useColors=e.useColors(),h.color=e.selectColor(t),h.extend=c,h.destroy=e.destroy,Object.defineProperty(h,"enabled",{enumerable:!0,configurable:!1,get:()=>f!==null?f:(d!==e.namespaces&&(d=e.namespaces,g=e.enabled(t)),g),set:a=>{f=a}}),typeof e.init=="function"&&e.init(h),h}function c(t,r){const f=e(this.namespace+(typeof r>"u"?":":r)+t);return f.log=this.log,f}function p(t){e.save(t),e.namespaces=t,e.names=[],e.skips=[];let r;const f=(typeof t=="string"?t:"").split(/[\s,]+/),d=f.length;for(r=0;r<d;r++)f[r]&&(t=f[r].replace(/\*/g,".*?"),t[0]==="-"?e.skips.push(new RegExp("^"+t.slice(1)+"$")):e.names.push(new RegExp("^"+t+"$")))}function v(){const t=[...e.names.map(C),...e.skips.map(C).map(r=>"-"+r)].join(",");return e.enable(""),t}function _(t){if(t[t.length-1]==="*")return!0;let r,f;for(r=0,f=e.skips.length;r<f;r++)if(e.skips[r].test(t))return!1;for(r=0,f=e.names.length;r<f;r++)if(e.names[r].test(t))return!0;return!1}function C(t){return t.toString().substring(2,t.toString().length-2).replace(/\.\*\?$/,"*")}function l(t){return t instanceof Error?t.stack||t.message:t}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return e.enable(e.load()),e}var le=ue;(function(n,o){o.formatArgs=c,o.save=p,o.load=v,o.useColors=e,o.storage=_(),o.destroy=(()=>{let l=!1;return()=>{l||(l=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),o.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function e(){return typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs)?!0:typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)?!1:typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function c(l){if(l[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+l[0]+(this.useColors?"%c ":" ")+"+"+n.exports.humanize(this.diff),!this.useColors)return;const u="color: "+this.color;l.splice(1,0,u,"color: inherit");let t=0,r=0;l[0].replace(/%[a-zA-Z%]/g,f=>{f!=="%%"&&(t++,f==="%c"&&(r=t))}),l.splice(r,0,u)}o.log=console.debug||console.log||(()=>{});function p(l){try{l?o.storage.setItem("debug",l):o.storage.removeItem("debug")}catch{}}function v(){let l;try{l=o.storage.getItem("debug")}catch{}return!l&&typeof process<"u"&&"env"in process&&(l={}.DEBUG),l}function _(){try{return localStorage}catch{}}n.exports=le(o);const{formatters:C}=n.exports;C.j=function(l){try{return JSON.stringify(l)}catch(u){return"[UnexpectedJSONParseError]: "+u.message}}})(ce,S);const de=S;var z={},he={get exports(){return z},set exports(n){z=n}};(function(n){var o=Object.prototype.hasOwnProperty,e="~";function c(){}Object.create&&(c.prototype=Object.create(null),new c().__proto__||(e=!1));function p(l,u,t){this.fn=l,this.context=u,this.once=t||!1}function v(l,u,t,r,f){if(typeof t!="function")throw new TypeError("The listener must be a function");var d=new p(t,r||l,f),g=e?e+u:u;return l._events[g]?l._events[g].fn?l._events[g]=[l._events[g],d]:l._events[g].push(d):(l._events[g]=d,l._eventsCount++),l}function _(l,u){--l._eventsCount===0?l._events=new c:delete l._events[u]}function C(){this._events=new c,this._eventsCount=0}C.prototype.eventNames=function(){var u=[],t,r;if(this._eventsCount===0)return u;for(r in t=this._events)o.call(t,r)&&u.push(e?r.slice(1):r);return Object.getOwnPropertySymbols?u.concat(Object.getOwnPropertySymbols(t)):u},C.prototype.listeners=function(u){var t=e?e+u:u,r=this._events[t];if(!r)return[];if(r.fn)return[r.fn];for(var f=0,d=r.length,g=new Array(d);f<d;f++)g[f]=r[f].fn;return g},C.prototype.listenerCount=function(u){var t=e?e+u:u,r=this._events[t];return r?r.fn?1:r.length:0},C.prototype.emit=function(u,t,r,f,d,g){var h=e?e+u:u;if(!this._events[h])return!1;var a=this._events[h],w=arguments.length,s,i;if(a.fn){switch(a.once&&this.removeListener(u,a.fn,void 0,!0),w){case 1:return a.fn.call(a.context),!0;case 2:return a.fn.call(a.context,t),!0;case 3:return a.fn.call(a.context,t,r),!0;case 4:return a.fn.call(a.context,t,r,f),!0;case 5:return a.fn.call(a.context,t,r,f,d),!0;case 6:return a.fn.call(a.context,t,r,f,d,g),!0}for(i=1,s=new Array(w-1);i<w;i++)s[i-1]=arguments[i];a.fn.apply(a.context,s)}else{var y=a.length,m;for(i=0;i<y;i++)switch(a[i].once&&this.removeListener(u,a[i].fn,void 0,!0),w){case 1:a[i].fn.call(a[i].context);break;case 2:a[i].fn.call(a[i].context,t);break;case 3:a[i].fn.call(a[i].context,t,r);break;case 4:a[i].fn.call(a[i].context,t,r,f);break;default:if(!s)for(m=1,s=new Array(w-1);m<w;m++)s[m-1]=arguments[m];a[i].fn.apply(a[i].context,s)}}return!0},C.prototype.on=function(u,t,r){return v(this,u,t,r,!1)},C.prototype.once=function(u,t,r){return v(this,u,t,r,!0)},C.prototype.removeListener=function(u,t,r,f){var d=e?e+u:u;if(!this._events[d])return this;if(!t)return _(this,d),this;var g=this._events[d];if(g.fn)g.fn===t&&(!f||g.once)&&(!r||g.context===r)&&_(this,d);else{for(var h=0,a=[],w=g.length;h<w;h++)(g[h].fn!==t||f&&!g[h].once||r&&g[h].context!==r)&&a.push(g[h]);a.length?this._events[d]=a.length===1?a[0]:a:_(this,d)}return this},C.prototype.removeAllListeners=function(u){var t;return u?(t=e?e+u:u,this._events[t]&&_(this,t)):(this._events=new c,this._eventsCount=0),this},C.prototype.off=C.prototype.removeListener,C.prototype.addListener=C.prototype.on,C.prefixed=e,C.EventEmitter=C,n.exports=C})(he);var R=null;typeof WebSocket<"u"?R=WebSocket:typeof MozWebSocket<"u"?R=MozWebSocket:typeof P<"u"?R=P.WebSocket||P.MozWebSocket:typeof window<"u"?R=window.WebSocket||window.MozWebSocket:typeof self<"u"&&(R=self.WebSocket||self.MozWebSocket);var W=R,N={},ve={get exports(){return N},set exports(n){N=n}};function pe(n){throw new Error('Could not dynamically require "'+n+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var j={},ge={get exports(){return j},set exports(n){j=n}};const ye={},Ce=Object.freeze(Object.defineProperty({__proto__:null,default:ye},Symbol.toStringTag,{value:"Module"})),me=ae(Ce);var J;function Y(){return J||(J=1,function(n,o){(function(e,c){n.exports=c()})(P,function(){var e=e||function(c,p){var v;if(typeof window<"u"&&window.crypto&&(v=window.crypto),typeof self<"u"&&self.crypto&&(v=self.crypto),typeof globalThis<"u"&&globalThis.crypto&&(v=globalThis.crypto),!v&&typeof window<"u"&&window.msCrypto&&(v=window.msCrypto),!v&&typeof P<"u"&&P.crypto&&(v=P.crypto),!v&&typeof pe=="function")try{v=me}catch{}var _=function(){if(v){if(typeof v.getRandomValues=="function")try{return v.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof v.randomBytes=="function")try{return v.randomBytes(4).readInt32LE()}catch{}}throw new Error("Native crypto module could not be used to get secure random number.")},C=Object.create||function(){function s(){}return function(i){var y;return s.prototype=i,y=new s,s.prototype=null,y}}(),l={},u=l.lib={},t=u.Base=function(){return{extend:function(s){var i=C(this);return s&&i.mixIn(s),(!i.hasOwnProperty("init")||this.init===i.init)&&(i.init=function(){i.$super.init.apply(this,arguments)}),i.init.prototype=i,i.$super=this,i},create:function(){var s=this.extend();return s.init.apply(s,arguments),s},init:function(){},mixIn:function(s){for(var i in s)s.hasOwnProperty(i)&&(this[i]=s[i]);s.hasOwnProperty("toString")&&(this.toString=s.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),r=u.WordArray=t.extend({init:function(s,i){s=this.words=s||[],i!=p?this.sigBytes=i:this.sigBytes=s.length*4},toString:function(s){return(s||d).stringify(this)},concat:function(s){var i=this.words,y=s.words,m=this.sigBytes,F=s.sigBytes;if(this.clamp(),m%4)for(var b=0;b<F;b++){var x=y[b>>>2]>>>24-b%4*8&255;i[m+b>>>2]|=x<<24-(m+b)%4*8}else for(var B=0;B<F;B+=4)i[m+B>>>2]=y[B>>>2];return this.sigBytes+=F,this},clamp:function(){var s=this.words,i=this.sigBytes;s[i>>>2]&=4294967295<<32-i%4*8,s.length=c.ceil(i/4)},clone:function(){var s=t.clone.call(this);return s.words=this.words.slice(0),s},random:function(s){for(var i=[],y=0;y<s;y+=4)i.push(_());return new r.init(i,s)}}),f=l.enc={},d=f.Hex={stringify:function(s){for(var i=s.words,y=s.sigBytes,m=[],F=0;F<y;F++){var b=i[F>>>2]>>>24-F%4*8&255;m.push((b>>>4).toString(16)),m.push((b&15).toString(16))}return m.join("")},parse:function(s){for(var i=s.length,y=[],m=0;m<i;m+=2)y[m>>>3]|=parseInt(s.substr(m,2),16)<<24-m%8*4;return new r.init(y,i/2)}},g=f.Latin1={stringify:function(s){for(var i=s.words,y=s.sigBytes,m=[],F=0;F<y;F++){var b=i[F>>>2]>>>24-F%4*8&255;m.push(String.fromCharCode(b))}return m.join("")},parse:function(s){for(var i=s.length,y=[],m=0;m<i;m++)y[m>>>2]|=(s.charCodeAt(m)&255)<<24-m%4*8;return new r.init(y,i)}},h=f.Utf8={stringify:function(s){try{return decodeURIComponent(escape(g.stringify(s)))}catch{throw new Error("Malformed UTF-8 data")}},parse:function(s){return g.parse(unescape(encodeURIComponent(s)))}},a=u.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init,this._nDataBytes=0},_append:function(s){typeof s=="string"&&(s=h.parse(s)),this._data.concat(s),this._nDataBytes+=s.sigBytes},_process:function(s){var i,y=this._data,m=y.words,F=y.sigBytes,b=this.blockSize,x=b*4,B=F/x;s?B=c.ceil(B):B=c.max((B|0)-this._minBufferSize,0);var k=B*b,A=c.min(k*4,F);if(k){for(var M=0;M<k;M+=b)this._doProcessBlock(m,M);i=m.splice(0,k),y.sigBytes-=A}return new r.init(i,A)},clone:function(){var s=t.clone.call(this);return s._data=this._data.clone(),s},_minBufferSize:0});u.Hasher=a.extend({cfg:t.extend(),init:function(s){this.cfg=this.cfg.extend(s),this.reset()},reset:function(){a.reset.call(this),this._doReset()},update:function(s){return this._append(s),this._process(),this},finalize:function(s){s&&this._append(s);var i=this._doFinalize();return i},blockSize:16,_createHelper:function(s){return function(i,y){return new s.init(y).finalize(i)}},_createHmacHelper:function(s){return function(i,y){return new w.HMAC.init(s,y).finalize(i)}}});var w=l.algo={};return l}(Math);return e})}(ge)),j}(function(n,o){(function(e,c){n.exports=c(Y())})(P,function(e){return function(c){var p=e,v=p.lib,_=v.WordArray,C=v.Hasher,l=p.algo,u=[],t=[];(function(){function d(w){for(var s=c.sqrt(w),i=2;i<=s;i++)if(!(w%i))return!1;return!0}function g(w){return(w-(w|0))*4294967296|0}for(var h=2,a=0;a<64;)d(h)&&(a<8&&(u[a]=g(c.pow(h,1/2))),t[a]=g(c.pow(h,1/3)),a++),h++})();var r=[],f=l.SHA256=C.extend({_doReset:function(){this._hash=new _.init(u.slice(0))},_doProcessBlock:function(d,g){for(var h=this._hash.words,a=h[0],w=h[1],s=h[2],i=h[3],y=h[4],m=h[5],F=h[6],b=h[7],x=0;x<64;x++){if(x<16)r[x]=d[g+x]|0;else{var B=r[x-15],k=(B<<25|B>>>7)^(B<<14|B>>>18)^B>>>3,A=r[x-2],M=(A<<15|A>>>17)^(A<<13|A>>>19)^A>>>10;r[x]=k+r[x-7]+M+r[x-16]}var ee=y&m^~y&F,te=a&w^a&s^w&s,ne=(a<<30|a>>>2)^(a<<19|a>>>13)^(a<<10|a>>>22),re=(y<<26|y>>>6)^(y<<21|y>>>11)^(y<<7|y>>>25),T=b+re+ee+t[x]+r[x],se=ne+te;b=F,F=m,m=y,y=i+T|0,i=s,s=w,w=a,a=T+se|0}h[0]=h[0]+a|0,h[1]=h[1]+w|0,h[2]=h[2]+s|0,h[3]=h[3]+i|0,h[4]=h[4]+y|0,h[5]=h[5]+m|0,h[6]=h[6]+F|0,h[7]=h[7]+b|0},_doFinalize:function(){var d=this._data,g=d.words,h=this._nDataBytes*8,a=d.sigBytes*8;return g[a>>>5]|=128<<24-a%32,g[(a+64>>>9<<4)+14]=c.floor(h/4294967296),g[(a+64>>>9<<4)+15]=h,d.sigBytes=g.length*4,this._process(),this._hash},clone:function(){var d=C.clone.call(this);return d._hash=this._hash.clone(),d}});p.SHA256=C._createHelper(f),p.HmacSHA256=C._createHmacHelper(f)}(Math),e.SHA256})})(ve);const G=N;var D={},we={get exports(){return D},set exports(n){D=n}};(function(n,o){(function(e,c){n.exports=c(Y())})(P,function(e){return function(){var c=e,p=c.lib,v=p.WordArray,_=c.enc;_.Base64={stringify:function(l){var u=l.words,t=l.sigBytes,r=this._map;l.clamp();for(var f=[],d=0;d<t;d+=3)for(var g=u[d>>>2]>>>24-d%4*8&255,h=u[d+1>>>2]>>>24-(d+1)%4*8&255,a=u[d+2>>>2]>>>24-(d+2)%4*8&255,w=g<<16|h<<8|a,s=0;s<4&&d+s*.75<t;s++)f.push(r.charAt(w>>>6*(3-s)&63));var i=r.charAt(64);if(i)for(;f.length%4;)f.push(i);return f.join("")},parse:function(l){var u=l.length,t=this._map,r=this._reverseMap;if(!r){r=this._reverseMap=[];for(var f=0;f<t.length;f++)r[t.charCodeAt(f)]=f}var d=t.charAt(64);if(d){var g=l.indexOf(d);g!==-1&&(u=g)}return C(l,u,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};function C(l,u,t){for(var r=[],f=0,d=0;d<u;d++)if(d%4){var g=t[l.charCodeAt(d-1)]<<d%4*2,h=t[l.charCodeAt(d)]>>>6-d%4*2,a=g|h;r[f>>>2]|=a<<24-f%4*8,f++}return v.create(r,f)}}(),e.enc.Base64})})(we);const K=D;function q(){return q=Object.assign?Object.assign.bind():function(n){for(var o=1;o<arguments.length;o++){var e=arguments[o];for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&(n[c]=e[c])}return n},q.apply(this,arguments)}function _e(n,o){if(n==null)return{};var e={},c=Object.keys(n),p,v;for(v=0;v<c.length;v++)p=c[v],!(o.indexOf(p)>=0)&&(e[p]=n[p]);return e}var I;(function(n){n[n.Hello=0]="Hello",n[n.Identify=1]="Identify",n[n.Identified=2]="Identified",n[n.Reidentify=3]="Reidentify",n[n.Event=5]="Event",n[n.Request=6]="Request",n[n.RequestResponse=7]="RequestResponse",n[n.RequestBatch=8]="RequestBatch",n[n.RequestBatchResponse=9]="RequestBatchResponse"})(I||(I={}));var Z;(function(n){n[n.None=0]="None",n[n.General=1]="General",n[n.Config=2]="Config",n[n.Scenes=4]="Scenes",n[n.Inputs=8]="Inputs",n[n.Transitions=16]="Transitions",n[n.Filters=32]="Filters",n[n.Outputs=64]="Outputs",n[n.SceneItems=128]="SceneItems",n[n.MediaInputs=256]="MediaInputs",n[n.Vendors=512]="Vendors",n[n.Ui=1024]="Ui",n[n.All=1023]="All",n[n.InputVolumeMeters=65536]="InputVolumeMeters",n[n.InputActiveStateChanged=131072]="InputActiveStateChanged",n[n.InputShowStateChanged=262144]="InputShowStateChanged",n[n.SceneItemTransformChanged=524288]="SceneItemTransformChanged"})(Z||(Z={}));var Q;(function(n){n[n.None=-1]="None",n[n.SerialRealtime=0]="SerialRealtime",n[n.SerialFrame=1]="SerialFrame",n[n.Parallel=2]="Parallel"})(Q||(Q={}));function Fe(n,o,e){const c=K.stringify(G(e+n));return K.stringify(G(c+o))}const be=["authentication","rpcVersion"],O=de("obs-websocket-js");class H extends Error{constructor(o,e){super(e),this.code=void 0,this.code=o}}class L extends z{constructor(...o){super(...o),this._identified=!1,this.internalListeners=new z,this.socket=void 0}static generateMessageId(){return String(L.requestCounter++)}get identified(){return this._identified}async connect(o="ws://127.0.0.1:4455",e,c={}){var p=this;this.socket&&await this.disconnect();try{const v=this.internalEventPromise("ConnectionClosed"),_=this.internalEventPromise("ConnectionError");return await Promise.race([async function(){const C=await p.createConnection(o);return p.emit("Hello",C),p.identify(C,e,c)}(),new Promise((C,l)=>{_.then(u=>{u.message&&l(u)}),v.then(u=>{l(u)})})])}catch(v){throw await this.disconnect(),v}}async disconnect(){if(!this.socket||this.socket.readyState===W.CLOSED)return;const o=this.internalEventPromise("ConnectionClosed");this.socket.close(),await o}async reidentify(o){const e=this.internalEventPromise(`op:${I.Identified}`);return await this.message(I.Reidentify,o),e}async call(o,e){const c=L.generateMessageId(),p=this.internalEventPromise(`res:${c}`);await this.message(I.Request,{requestId:c,requestType:o,requestData:e});const{requestStatus:v,responseData:_}=await p;if(!v.result)throw new H(v.code,v.comment);return _}async callBatch(o,e={}){const c=L.generateMessageId(),p=this.internalEventPromise(`res:${c}`);await this.message(I.RequestBatch,q({requestId:c,requests:o},e));const{results:v}=await p;return v}cleanup(){this.socket&&(this.socket.onopen=null,this.socket.onmessage=null,this.socket.onerror=null,this.socket.onclose=null,this.socket=void 0,this._identified=!1,this.internalListeners.removeAllListeners())}async createConnection(o){var e;const c=this.internalEventPromise("ConnectionOpened"),p=this.internalEventPromise(`op:${I.Hello}`);this.socket=new W(o,this.protocol),this.socket.onopen=this.onOpen.bind(this),this.socket.onmessage=this.onMessage.bind(this),this.socket.onerror=this.onError.bind(this),this.socket.onclose=this.onClose.bind(this),await c;const v=(e=this.socket)==null?void 0:e.protocol;if(!v)throw new H(-1,"Server sent no subprotocol");if(v!==this.protocol)throw new H(-1,"Server sent an invalid subprotocol");return p}async identify(o,e,c={}){let{authentication:p,rpcVersion:v}=o,_=_e(o,be);const C=q({rpcVersion:v},c);p&&e&&(C.authentication=Fe(p.salt,p.challenge,e));const l=this.internalEventPromise(`op:${I.Identified}`);await this.message(I.Identify,C);const u=await l;return this._identified=!0,this.emit("Identified",u),q({rpcVersion:v},_,u)}async message(o,e){if(!this.socket)throw new Error("Not connected");if(!this.identified&&o!==1)throw new Error("Socket not identified");const c=await this.encodeMessage({op:o,d:e});this.socket.send(c)}async internalEventPromise(o){return new Promise(e=>{this.internalListeners.once(o,e)})}onOpen(o){O("socket.open"),this.emit("ConnectionOpened"),this.internalListeners.emit("ConnectionOpened",o)}async onMessage(o){try{const{op:e,d:c}=await this.decodeMessage(o.data);if(O("socket.message: %d %j",e,c),e===void 0||c===void 0)return;switch(e){case I.Event:{const{eventType:p,eventData:v}=c;this.emit(p,v);return}case I.RequestResponse:case I.RequestBatchResponse:{const{requestId:p}=c;this.internalListeners.emit(`res:${p}`,c);return}default:this.internalListeners.emit(`op:${e}`,c)}}catch(e){O("error handling message: %o",e)}}onError(o){O("socket.error: %o",o);const e=new H(-1,o.message);this.emit("ConnectionError",e),this.internalListeners.emit("ConnectionError",e)}onClose(o){O("socket.close: %s (%d)",o.reason,o.code);const e=new H(o.code,o.reason);this.emit("ConnectionClosed",e),this.internalListeners.emit("ConnectionClosed",e),this.cleanup()}}L.requestCounter=1;typeof exports<"u"&&Object.defineProperty(exports,"__esModule",{value:!0});class xe extends L{constructor(...o){super(...o),this.protocol="obswebsocket.json"}async encodeMessage(o){return JSON.stringify(o)}async decodeMessage(o){return JSON.parse(o)}}let Pe=X(!1),Ae=ie("sl_obs",new xe);export{Ae as a,Pe as o};
