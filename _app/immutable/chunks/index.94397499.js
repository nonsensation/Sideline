function v(){}function I(t,n){for(const e in n)t[e]=n[e];return t}function T(t){return t()}function P(){return Object.create(null)}function y(t){t.forEach(T)}function q(t){return typeof t=="function"}function st(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let b;function lt(t,n){return b||(b=document.createElement("a")),b.href=n,t===b.href}function W(t){return Object.keys(t).length===0}function B(t,...n){if(t==null)return v;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function ot(t){let n;return B(t,e=>n=e)(),n}function at(t,n,e){t.$$.on_destroy.push(B(n,e))}function ft(t,n,e,i){if(t){const r=D(t,n,e,i);return t[0](r)}}function D(t,n,e,i){return t[1]&&i?I(e.ctx.slice(),t[1](i(n))):e.ctx}function _t(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const o=[],c=Math.max(n.dirty.length,r.length);for(let l=0;l<c;l+=1)o[l]=n.dirty[l]|r[l];return o}return n.dirty|r}return n.dirty}function dt(t,n,e,i,r,o){if(r){const c=D(n,e,i,o);t.p(c,r)}}function ht(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function mt(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function pt(t,n){const e={};n=new Set(n);for(const i in t)!n.has(i)&&i[0]!=="$"&&(e[i]=t[i]);return e}function yt(t){return t??""}function gt(t,n,e){return t.set(e),n}let E=!1;function G(){E=!0}function J(){E=!1}function K(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function Q(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const u=[];for(let s=0;s<n.length;s++){const f=n[s];f.claim_order!==void 0&&u.push(f)}n=u}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let u=0;u<n.length;u++){const s=n[u].claim_order,f=(r>0&&n[e[r]].claim_order<=s?r+1:K(1,r,g=>n[e[g]].claim_order,s))-1;i[u]=e[f]+1;const a=f+1;e[a]=u,r=Math.max(a,r)}const o=[],c=[];let l=n.length-1;for(let u=e[r]+1;u!=0;u=i[u-1]){for(o.push(n[u-1]);l>=u;l--)c.push(n[l]);l--}for(;l>=0;l--)c.push(n[l]);o.reverse(),c.sort((u,s)=>u.claim_order-s.claim_order);for(let u=0,s=0;u<c.length;u++){for(;s<o.length&&c[u].claim_order>=o[s].claim_order;)s++;const f=s<o.length?o[s]:null;t.insertBefore(c[u],f)}}function R(t,n){if(E){for(Q(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function bt(t,n,e){E&&!e?R(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function U(t){t.parentNode&&t.parentNode.removeChild(t)}function xt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function V(t){return document.createElement(t)}function j(t){return document.createTextNode(t)}function $t(){return j(" ")}function vt(){return j("")}function Et(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function wt(t){return function(n){return n.preventDefault(),t.call(this,n)}}function Nt(t){return function(n){return n.stopPropagation(),t.call(this,n)}}function St(t){return function(n){n.target===this&&t.call(this,n)}}function At(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function X(t){return Array.from(t.childNodes)}function Y(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function O(t,n,e,i,r=!1){Y(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const l=t[c];if(n(l)){const u=e(l);return u===void 0?t.splice(c,1):t[c]=u,r||(t.claim_info.last_index=c),l}}for(let c=t.claim_info.last_index-1;c>=0;c--){const l=t[c];if(n(l)){const u=e(l);return u===void 0?t.splice(c,1):t[c]=u,r?u===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function Z(t,n,e,i){return O(t,r=>r.nodeName===n,r=>{const o=[];for(let c=0;c<r.attributes.length;c++){const l=r.attributes[c];e[l.name]||o.push(l.name)}o.forEach(c=>r.removeAttribute(c))},()=>i(n))}function jt(t,n,e){return Z(t,n,e,V)}function tt(t,n){return O(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>j(n),!0)}function kt(t){return tt(t," ")}function Ct(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function Mt(t,n){t.value=n??""}function Pt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function Lt(t,n,e){t.classList[e?"add":"remove"](n)}function nt(t,n,{bubbles:e=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,e,i,n),r}function Tt(t,n){return new t(n)}let p;function m(t){p=t}function k(){if(!p)throw new Error("Function called outside component initialization");return p}function qt(t){k().$$.on_mount.push(t)}function Bt(t){k().$$.after_update.push(t)}function Dt(){const t=k();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const o=nt(n,e,{cancelable:i});return r.slice().forEach(c=>{c.call(t,o)}),!o.defaultPrevented}return!0}}function Ot(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(i=>i.call(this,n))}const h=[],L=[],x=[],N=[],z=Promise.resolve();let S=!1;function F(){S||(S=!0,z.then(H))}function zt(){return F(),z}function A(t){x.push(t)}function Ft(t){N.push(t)}const w=new Set;let d=0;function H(){if(d!==0)return;const t=p;do{try{for(;d<h.length;){const n=h[d];d++,m(n),et(n.$$)}}catch(n){throw h.length=0,d=0,n}for(m(null),h.length=0,d=0;L.length;)L.pop()();for(let n=0;n<x.length;n+=1){const e=x[n];w.has(e)||(w.add(e),e())}x.length=0}while(h.length);for(;N.length;)N.pop()();S=!1,w.clear(),m(t)}function et(t){if(t.fragment!==null){t.update(),y(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(A)}}const $=new Set;let _;function Ht(){_={r:0,c:[],p:_}}function It(){_.r||y(_.c),_=_.p}function it(t,n){t&&t.i&&($.delete(t),t.i(n))}function Wt(t,n,e,i){if(t&&t.o){if($.has(t))return;$.add(t),_.c.push(()=>{$.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function Gt(t,n,e){const i=t.$$.props[n];i!==void 0&&(t.$$.bound[i]=e,e(t.$$.ctx[i]))}function Jt(t){t&&t.c()}function Kt(t,n){t&&t.l(n)}function rt(t,n,e,i){const{fragment:r,after_update:o}=t.$$;r&&r.m(n,e),i||A(()=>{const c=t.$$.on_mount.map(T).filter(q);t.$$.on_destroy?t.$$.on_destroy.push(...c):y(c),t.$$.on_mount=[]}),o.forEach(A)}function ct(t,n){const e=t.$$;e.fragment!==null&&(y(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ut(t,n){t.$$.dirty[0]===-1&&(h.push(t),F(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Qt(t,n,e,i,r,o,c,l=[-1]){const u=p;m(t);const s=t.$$={fragment:null,ctx:[],props:o,update:v,not_equal:r,bound:P(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(u?u.$$.context:[])),callbacks:P(),dirty:l,skip_bound:!1,root:n.target||u.$$.root};c&&c(s.root);let f=!1;if(s.ctx=e?e(t,n.props||{},(a,g,...C)=>{const M=C.length?C[0]:g;return s.ctx&&r(s.ctx[a],s.ctx[a]=M)&&(!s.skip_bound&&s.bound[a]&&s.bound[a](M),f&&ut(t,a)),g}):[],s.update(),f=!0,y(s.before_update),s.fragment=i?i(s.ctx):!1,n.target){if(n.hydrate){G();const a=X(n.target);s.fragment&&s.fragment.l(a),a.forEach(U)}else s.fragment&&s.fragment.c();n.intro&&it(t.$$.fragment),rt(t,n.target,n.anchor,n.customElement),J(),H()}m(u)}class Rt{$destroy(){ct(this,1),this.$destroy=v}$on(n,e){if(!q(e))return v;const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!W(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{St as $,rt as A,ct as B,yt as C,R as D,v as E,I as F,mt as G,Lt as H,at as I,ft as J,dt as K,ht as L,_t as M,A as N,Et as O,wt as P,y as Q,pt as R,Rt as S,Dt as T,Ot as U,Gt as V,lt as W,Mt as X,Ft as Y,gt as Z,Nt as _,$t as a,xt as a0,ot as a1,bt as b,kt as c,Wt as d,vt as e,It as f,it as g,U as h,Qt as i,Bt as j,V as k,jt as l,X as m,At as n,qt as o,Pt as p,j as q,tt as r,st as s,zt as t,Ct as u,Ht as v,L as w,Tt as x,Jt as y,Kt as z};