KISSY.add("magix/magix",function(e){var t=[].slice,r=/\/\.\/|\/[^\/.]+?\/\.{2}\/|([^:\/])\/\/+|\.{2}\//,n=/\/[^\/]*$/,i=/[#?].*$/,a="",o=/([^=&?\/#]+)=?([^&=#?]*)/g,s="pathname",c=/^https?:\/\//i,f=0,u="/",v="vframe",m="\n",h=window.console,d=h&&h.error,l=function(){},p={tagName:v,rootId:"magix_vf_root",progress:l,coded:1,execError:function(e){d&&h.error(e)}},g=p.hasOwnProperty,x=function(e,t){return e?g.call(e,t):e},y=function(e){return function(t,r,n){switch(arguments.length){case 0:n=e;break;case 1:n=M.isObject(t)?$(e,t):x(e,t)?e[t]:null;break;case 2:null===r?(delete e[t],n=r):e[t]=n=r}return n}},w=function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f},b=function(e,t){var r=this;return r.get?(r.c=[],r.x=e||20,r.b=r.x+(0|t||5),void 0):new b(e,t)},$=function(e,t,r){for(var n in t)r&&x(r,n)||(e[n]=t[n]);return e};$(b.prototype,{get:function(e){var t,r=this,n=r.c;return e=s+e,x(n,e)&&(t=n[e],t.f>=1&&(t.f++,t.t=f++,t=t.v)),t},set:function(e,t,r){var n=this,i=n.c,a=s+e,o=i[a];if(!x(i,a)){if(i.length>=n.b){i.sort(w);for(var c=n.b-n.x;c--;)o=i.pop(),delete i[o.k],o.m&&E(o.m,o.o,o)}o={},i.push(o),i[a]=o}return o.o=e,o.k=a,o.v=t,o.f=1,o.t=f++,o.m=r,t},del:function(e){e=s+e;var t=this.c,r=t[e];r&&(r.f=-1e5,r.v=a,delete t[e],r.m&&(E(r.m,r.o,r),r.m=a))},has:function(e){return e=s+e,x(this.c,e)}});var C=b(60),S=b(),E=function(e,t,r,n,i,a){for(M.isArray(e)||(e=[e]),t&&(M.isArray(t)||t.callee)||(t=[t]),n=0;e.length>n;n++)try{a=e[n],i=a&&a.apply(r,t)}catch(o){p.execError(o)}return i},M={mix:$,has:x,safeExec:E,noop:l,config:y(p),start:function(e){var t=this;$(p,e),t.libRequire(["magix/router","magix/vom",p.iniFile],function(r,n,i){p=$(p,i,e),p["!tnc"]=p.tagName!=v,r.on("!ul",n.locChged),r.on("changed",n.locChged),n.on("progress",p.progress),t.libRequire(p.extensions,r.start)})},keys:Object.keys||function(e){var t=[];for(var r in e)x(e,r)&&t.push(r);return t},local:y({}),path:function(e,t){var o=e+m+t,s=S.get(o);if(!s){if(c.test(t))s=t;else if(e=e.replace(i,a).replace(n,a)+u,t.charAt(0)==u){var f=c.test(e)?8:0,v=e.indexOf(u,f);s=e.substring(0,v)+t}else s=e+t;for(;r.test(s);)s=s.replace(r,"$1/");S.set(o,s)}return s},pathToObject:function(e,t){var r=e+m+t,n=C.get(r);if(!n){n={};var f={},v=a;i.test(e)?v=e.replace(i,a):~e.indexOf("=")||(v=e);var h=e.replace(v,a);if(v&&c.test(v)){var d=v.indexOf(u,8);v=~d?v.substring(d):u}h.replace(o,function(e,r,n){if(t)try{n=decodeURIComponent(n)}catch(i){}f[r]=n}),n[s]=v,n.params=f,C.set(r,n)}return n},objectToPath:function(e,t,r){var n,i=e[s],a=[],o=e.params;for(var c in o)n=o[c],(!r||n||x(r,c))&&(t&&(n=encodeURIComponent(n)),a.push(c+"="+n));return a.length&&(i=i+"?"+a.join("&")),i},listToMap:function(e,t){var r,n,i,a={};if(M.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(r=0;i>r;r++)n=e[r],a[t?n[t]:n]=t?n:1;return a},cache:b};return $(M,{libRequire:function(r,n){r?e.use(r+"",function(e){n&&n.apply(e,t.call(arguments,1))}):n&&n()},isArray:e.isArray,isFunction:e.isFunction,isObject:e.isObject,isString:e.isString,isNumber:e.isNumber})}),KISSY.add("magix/router",function(e,t,r,n){var i,a,o,s,c=window,f="",u="pathname",v="view",m=t.has,h=t.mix,d=t.keys,l=t.config(),p=t.cache(),g=t.cache(40),x={params:{},href:f},y=/#.*$/,w=/^[^#]*#?!?/,b="params",$=l.nativeHistory,C=l.coded,S=function(e,r,n){if(e){n=this[b],t.isString(e)&&(e=e.split(","));for(var i=0;e.length>i&&!(r=m(n,e[i]));i++);}return r},E=function(){return this[u]},M=function(){return this[v]},P=function(e,t,r,n){return r=this,n=r[b],arguments.length>1?n[e]=t:n[e]},I=function(e){var r=t.pathToObject(e,C),n=r[u];return n&&s&&(r[u]=t.path(c.location[u],n)),r},O=h({viewInfo:function(e,r){var n,i;if(!a){a={rs:l.routes||{},nf:l.notFoundView};var o=l.defaultView;a.dv=o;var s=l.defaultPathname||f;n=a.rs,a.f=t.isFunction(n),a.f||n[s]||!o||(n[s]=o),a[u]=s}return e||(e=a[u]),n=a.rs,i=a.f?n.call(l,e,r):n[e],{view:i||a.nf||a.dv,pathname:e}},start:function(){var e=O,t=c.history;o=$&&t.pushState,s=$&&!o,o?e.useState():e.useHash(),e.route()},parseQH:function(e,t){e=e||c.location.href;var r=O,n=p.get(e);if(!n){var i=e.replace(y,f),a=e.replace(w,f),o=I(i),s=I(a),m={};h(m,o[b]),h(m,s[b]),n={get:P,set:P,href:e,refHref:x.href,srcQuery:i,srcHash:a,query:o,hash:s,params:m},p.set(e,n)}if(t&&!n[v]){var d;d=$?n.hash[u]||n.query[u]:n.hash[u];var l=r.viewInfo(d,n);h(n,l)}return n},getChged:function(e,t){var r=e.href,n=t.href,i=r+"\n"+n,a=g.get(i);if(!a){var o,s,c;a={},a[v]=c,a[u]=c,a[b]={};var f,m,h=[u,v];for(f=1;f>=0;f--)m=h[f],s=e[m],c=t[m],s!=c&&(a[m]={from:s,to:c},o=1);var l=e[b],p=t[b];for(h=d(l).concat(d(p)),f=h.length-1;f>=0;f--)m=h[f],s=l[m],c=p[m],s!=c&&(a[b][m]={from:s,to:c},o=1);a.occur=o,a.isParam=S,a.isPathname=E,a.isView=M,g.set(i,a)}return a},route:function(){var e=O,t=e.parseQH(0,1),r=!x.get,n=e.getChged(x,t);x=t,n.occur&&(i=t,e.fire("changed",{location:t,changed:n,force:r}))},navigate:function(e,r,n){var a=O;if(!r&&t.isObject(e)&&(r=e,e=f),r&&(e=t.objectToPath({params:r,pathname:e},C)),e){var c=I(e),v={};if(v[b]=h({},c[b]),v[u]=c[u],v[u]){if(s){var d=i.query[b];for(var l in d)m(d,l)&&!m(v[b],l)&&(v[b][l]=f)}}else{var p=h({},i[b]);v[b]=h(p,v[b]),v[u]=i[u]}var g,x=t.objectToPath(v,C,i.query[b]);g=o?x!=i.srcQuery:x!=i.srcHash,g&&(o?(a.poped=1,history[n?"replaceState":"pushState"](f,f,x),a.route()):(h(v,i,v),v.srcHash=x,v.hash={params:v[b],pathname:v[u]},a.fire("!ul",{loc:i=v}),x="#!"+x,n?location.replace(x):location.hash=x))}}},r);return O.useState=function(){var e=O,t=location.href;n.on(c,"popstate",function(){var r=location.href==t;(e.poped||!r)&&(e.poped=1,e.route())})},O.useHash=function(){n.on(c,"hashchange",O.route)},O},{requires:["magix/magix","magix/event","event"]}),KISSY.add("magix/body",function(e,t){var r,n=t.has,i=t.mix,a={},o=document.body,s={},c=String.fromCharCode(26),f="mx-ei",u="mx-owner",v="addEventListener",m="removeEventListener",h=o[v],d={},l=65536,p="on",g=",",x=function(e){return e.id||(e.id="mx-e-"+l--)},y=function(e,t,r){return e&&e.setAttribute&&(r?e.setAttribute(t,r):r=e.getAttribute(t)),r},w=function(){this.returnValue=!1},b=function(){this.cancelBubble=!0},$={special:function(e){i(a,e)},process:function(e){if(e=e||window.event,e&&!e[p]){var t=e.target||e.srcElement||o;for(e[p]=1;t&&1!=t.nodeType;)t=t.parentNode;var i=t,a=e.type,s=d[a]||(d[a]=RegExp(g+a+"(?:,|$)"));if(!s.test(y(t,f))){for(var v,m,l="mx-"+a,$=[];i&&(v=y(i,l),m=y(i,f),!v&&!s.test(m));)$.push(i),i=i.parentNode;if(v){var C,S=v.split(c);if(S.length>1&&(C=S[0],v=S.pop()),C=C||y(i,u),!C)for(var E=i,M=r.all();E;){if(n(M,E.id)){y(i,u,C=E.id);break}E=E.parentNode}if(!C)throw Error("bad:"+v);var P=r.get(C),I=P&&P.view;I&&(h||(e.preventDefault=w,e.stopPropagation=b),I.pEvt({info:v,se:e,st:a,tId:x(t),cId:x(i)}))}else for(var O;$.length;)O=$.shift(),m=y(O,f)||p,s.test(m)||(m=m+g+a,y(O,f,m))}}},act:function(e,t,n){var i=s[e]||0,c=i>0?1:0,f=$.process;if(i+=t?-c:c,!i){n&&(r=n);var u=a[e];u?$.lib(o,e,t,f):h?o[t?m:v](e,f,!1):o[p+e]=t?null:f,t||(i=1)}s[e]=i}},C={focusin:1,focusout:1,mouseenter:2,mouseleave:2,mousewheel:1};return $.special(C),$.lib=function(t,r,n,i){e.use("event",function(e,a){var o=C[r];1==o?(o=n?"detach":"on",a[o](t,r,i)):(o=(n?"un":"")+"delegate",a[o](t,r,"[mx-"+r+"]",i))})},$},{requires:["magix/magix"]}),KISSY.add("magix/event",function(e,t){var r=function(e){return"~"+e},n=t.safeExec,i={fire:function(e,t,i,a){var o=r(e),s=this,c=s[o];if(c){t||(t={}),t.type||(t.type=e);for(var f,u,v=c.length,m=v-1;v--;)f=a?v:m-v,u=c[f],(u.d||u.r)&&(c.splice(f,1),m--),u.d||n(u.f,t,s)}i&&delete s[o]},on:function(e,t,n){var i=r(e),a=this[i]||(this[i]=[]),o={f:t};isNaN(n)?(o.r=n,a.push(o)):a.splice(0|n,0,o)},off:function(e,t){var n=r(e),i=this[n];if(i)if(t){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==t&&!a.d){a.d=1;break}}else delete this[n]},once:function(e,t){this.on(e,t,r)}};return i},{requires:["magix/magix"]}),KISSY.add("magix/vframe",function(e,t,r,n){var i,a,o,s,c,f=document,u=f.body,v=65536,m=t.safeExec,h=[],d=t.mix,l=t.config("tagName"),p=t.config("rootId"),g=t.config("!tnc"),x=t.has,y=g?"mx-vframe":"mx-defer",w=u.contains,b=g&&u.querySelectorAll,$=" "+l+"[mx-vframe]",C="alter",S="created",E=function(e){return"object"==typeof e?e:f.getElementById(e)},M=function(e,t,r){return t=E(e),t&&(r=b?f.querySelectorAll("#"+t.id+$):t.getElementsByTagName(l)),r||h},P=function(e){return e.id||(e.id="magix_vf_"+v--)},I=function(e,t,r){if(e=E(e),t=E(t),e&&t)if(e!==t)try{r=w?t.contains(e):16&t.compareDocumentPosition(e)}catch(n){r=0}else r=1;return r},O=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<30,t.rM={},t.owner=c};return d(O,{root:function(e,t,r){if(!i){o=t,s=r,c=e;var n=E(p);n||(n=f.createElement(l),n.id=p,u.appendChild(n)),i=new O(p),e.add(i)}return i}}),d(d(O.prototype,r),{mountView:function(e,r){var i=this,a=E(i.id);if(a._bak?a._chgd=1:(a._bak=1,a._tmpl=a.innerHTML),i.unmountView(),e){var f=t.pathToObject(e),u=f.pathname,v=--i.sign;t.libRequire(u,function(e){if(v==i.sign){n.prepare(e);var t=new e({owner:i,id:i.id,$:E,path:u,vom:c,location:o});i.view=t,t.on("interact",function(e){e.tmpl||(a._chgd&&(a.innerHTML=a._tmpl),i.mountZoneVframes()),t.on("primed",function(){i.viewPrimed=1,i.fire("viewMounted")}),t.on("rendered",function(){i.mountZoneVframes()}),t.on("prerender",function(){i.unmountZoneVframes(0,1)||i.cAlter()})},0),r=r||{},t.load(d(r,f.params,r),s)}})}},unmountView:function(){var e=this,t=e.view;if(t){a||(a={}),e.unmountZoneVframes(0,1),e.cAlter(a),delete e.view,t.oust();var r=E(e.id);r&&r._bak&&(r.innerHTML=r._tmpl),delete e.viewInited,e.viewPrimed&&(delete e.viewPrimed,e.fire("viewUnmounted")),a=0}e.sign--},mountVframe:function(e,t,r){var n=this;n.fcc&&n.cAlter();var i=c.get(e);return i||(i=new O(e),i.pId=n.id,x(n.cM,e)||n.cC++,n.cM[e]=1,c.add(i)),i.mountView(t,r),i},mountZoneVframes:function(e,t){var r=this,n=e||r.id;r.unmountZoneVframes(n,1);var i=M(n),a=i.length,o={};if(a)for(var s,c,f,u,v=0;a>v;v++)if(s=i[v],c=P(s),!x(o,c)&&(f=s.getAttribute("mx-view"),u=!s.getAttribute(y),u=u!=g,u||f)){r.mountVframe(c,f,t);for(var m,h=M(s),d=0,l=h.length;l>d;d++)m=h[d],o[P(m)]=1}r.cCreated()},unmountVframe:function(e,t){var r=this;e=e||r.id;var n=c.get(e);if(n){var i=n.fcc;n.unmountView(),c.remove(e,i);var a=c.get(n.pId);a&&x(a.cM,e)&&(delete a.cM[e],a.cC--,t||a.cCreated())}},unmountZoneVframes:function(e,t){var r,n,i=this,a=i.cM;for(n in a)e?I(n,e)&&i.unmountVframe(n,r=1):i.unmountVframe(n,r=1);return t||i.cCreated(),r},cCreated:function(e){var t=this;if(t.cC==t.rC){var r=t.view;r&&!t.fcc&&(t.fcc=1,delete t.fca,r.fire(S,e),t.fire(S,e)),c.vfCreated();var n=t.id,i=c.get(t.pId);i&&!x(i.rM,n)&&(i.rM[n]=i.cM[n],i.rC++,i.cCreated(e))}},cAlter:function(e){var t=this;e||(e={});var r=t.fcc;if(delete t.fcc,!t.fca&&r){var n=t.view,i=t.id;n&&(t.fca=1,n.fire(C,e),t.fire(C,e));var a=c.get(t.pId);a&&x(a.rM,i)&&(a.rC--,delete a.rM[i],a.cAlter(e))}},locChged:function(){var e=this,r=e.view;if(e.viewInited&&r.sign>0){var n=r.olChanged(s),i={location:o,changed:s,prevent:function(){this.cs=h},to:function(e){e=e||h,t.isString(e)&&(e=e.split(",")),this.cs=e}};n&&m(r.locationChange,i,r);for(var a,f=i.cs||t.keys(e.cM),u=0,v=f.length;v>u;u++)a=c.get(f[u]),a&&a.locChged()}}}),O},{requires:["magix/magix","magix/event","magix/view"]}),KISSY.add("magix/view",function(e,t,r,n,i){var a=t.safeExec,o=t.has,s=",",c=[],f=t.noop,u=t.mix,v="~",m=function(e){return function(){var t,r=this,n=r.notifyUpdate();return n&&(t=e.apply(r,arguments)),t}},h=t.cache(40),d="<",l=">",p=/\smx-(?!view|defer|owner|vframe)[a-z]+\s*=\s*"/g,g=String.fromCharCode(26),x={prevent:function(e){e=e||this.srcEvent,e.preventDefault()},stop:function(e){e=e||this.srcEvent,e.stopPropagation()},halt:function(e){this.prevent(e),this.stop(e)}},y=/(\w+)(?:<(\w+)>)?(?:\(?{([\s\S]*)}\)?)?/,w=/(\w+):([^,]+)/g,b=/([$\w]+)<([\w,]+)>/,$=function(e){var t=this;u(t,e),t.sign=1,a($.ms,[e],t)};$.ms=[],$.prepare=function(e){if(!e[v]){e[v]=1;var t,r,n,i,a,o=e.prototype,c={};for(var u in o)if(t=o[u],r=u.match(b))for(n=r[1],i=r[2],i=i.split(s),a=i.length-1;a>-1;a--)r=i[a],c[r]=1,o[n+d+r+l]=t;else"render"==u&&t!=f&&(o[u]=m(t));i&&(o.$evts=c)}},$.mixin=function(e,t){t&&$.ms.push(t),u($.prototype,e)},u(u($.prototype,r),{render:f,locationChange:f,init:f,hasTmpl:!0,load:function(){var e=this,t=e.hasTmpl,r=arguments,n=e.sign,i=function(i){if(n>0&&n==e.sign){t&&(e.template=e.wrapMxEvent(i)),e.dEvts(),e.fire("interact",{tmpl:t},1),a(e.init,r,e),e.fire("inited",0,1),e.owner.viewInited=1,a(e.render,c,e);var o=!t&&!e.rendered;o&&(e.rendered=1,e.fire("primed",0,1))}};t?e.fetchTmpl(e.path,i):i()},beginUpdate:function(){var e=this;e.sign>0&&e.rendered&&(e.fire("refresh",0,1),e.fire("prerender"))},endUpdate:function(){var e=this;e.sign>0&&(e.rendered||(e.fire("primed",0,1),e.rendered=1),e.fire("rendered"))},notifyUpdate:function(){var e=this;return e.sign>0&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return(e+"").replace(p,"$&"+this.id+g)},wrapAsync:function(e){var t=this,r=t.sign;return function(){r==t.sign&&e&&e.apply(this,arguments)}},setViewHTML:function(e){var t,r=this;r.beginUpdate(),r.sign>0&&(t=r.$(r.id),t&&(t.innerHTML=e)),r.endUpdate()},observeLocation:function(e){var r,n=this;n.$ol||(n.$ol={keys:[]}),r=n.$ol;var i=r.keys;t.isObject(e)&&(r.pn=e.pathname,e=e.keys),e&&(r.keys=i.concat((e+"").split(s)))},olChanged:function(e){var t=this,r=t.$ol,n=1;if(r&&(r.pn&&(n=e.isPathname()),!n)){var i=r.keys;n=e.isParam(i)}return n},oust:function(){var e=this;e.sign>0&&(e.sign=0,e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.dEvts(1)),e.sign--},pEvt:function(e){var t=this;if(t.sign>0){var r=e.info,n=e.se,i=h.get(r);i||(i=r.match(y),i={n:i[1],f:i[2],i:i[3],p:{}},i.i&&i.i.replace(w,function(e,t,r){i.p[t]=r}),h.set(r,i));var o=i.n+d+e.st+l,s=t[o];if(s){var c=x[i.f];c&&c.call(x,n),a(s,{currentId:e.cId,targetId:e.tId,type:e.st,srcEvent:n,halt:x.halt,prevent:x.prevent,stop:x.stop,params:i.p},t)}}},dEvts:function(e){var t=this,r=t.$evts,i=t.vom;for(var a in r)n.act(a,e,i)}});var C="?t="+e.now(),S=e.Env.mods,E={},M={};return $.prototype.fetchTmpl=function(e,t){var r=this,n="template"in r;if(n)t(r.template);else if(o(E,e))t(E[e]);else{var s=S[r.path];if(s){var c=s.uri||s.fullpath;e=c.slice(0,c.indexOf(e)+e.length)}var f=e+".html",u=M[f],v=function(r){t(E[e]=r)};u?u.push(v):(u=M[f]=[v],i({url:f+C,complete:function(e,t){a(u,e||t),delete M[f]}}))}},$.extend=function(t,r,n){var i=this,o=function(){o.superclass.constructor.apply(this,arguments),r&&a(r,arguments,this)};return o.extend=i.extend,e.extend(o,i,t,n)},$},{requires:["magix/magix","magix/event","magix/body","ajax"]}),KISSY.add("magix/vom",function(e,t,r,n){var i=r.has,a=r.mix,o=0,s=0,c=0,f=0,u={},v={},m={},h=r.mix({all:function(){return u},add:function(e){i(u,e.id)||(o++,u[e.id]=e,h.fire("add",{vframe:e}))},get:function(e){return u[e]},remove:function(e,t){var r=u[e];r&&(o--,t&&s--,delete u[e],h.fire("remove",{vframe:r}))},vfCreated:function(){if(!f){s++;var e=s/o;e>c&&h.fire("progress",{percent:c=e},f=1==e)}},locChged:function(e){var r,n=e.loc;if(n?r=1:n=e.location,a(v,n),!r){a(m,e.changed);var i=t.root(h,v,m);m.view?i.mountView(n.view):i.locChged()}}},n);return h},{requires:["magix/vframe","magix/magix","magix/event"]}),KISSY.add("mxext/mmanager",function(e,t,r){var n=t.has,i=t.safeExec,a=t.mix,o="mr",s=String.fromCharCode(26),c=t.isFunction,f=12e5,u=function(e,t,r){t=[];for(r in e)t.push(r,o,e[r]);return t},v=function(e,t){return[e.name,u(t.urlParams),u(t.postParams)].join(s)},m=Date.now||function(){return+new Date},h=m(),d=function(e){throw Error(e)},l=function(e){var r=this;r.$mClass=e,r.$mCache=t.cache(),r.$mCacheKeys={},r.$mMetas={},r.id="mm"+h--,i(l.ms,arguments,r)},p=[].slice,g=function(e,t,r){return function(){return e.apply(t,[t,r].concat(p.call(arguments)))}},x=function(e,t,r){var n=r.key,a=r.cKeys,o=a[n];if(o){var s=o.q;delete a[n],i(s,e)}},y=function(e){return function(){var t=new $(this),r=arguments,n=r[r.length-1];return n&&n.manage&&(n.manage(t),r=p.call(r,0,-1)),t[e].apply(t,r)}},w=function(e,t){return function(r,n){var i=p.call(arguments,1);return this.send(r,i.length>1?i:n,e,t)}};a(l,{create:function(e){return e||d("ungiven modelClass"),new l(e)},mixin:function(e,t){t&&l.ms.push(t),a(l.prototype,e)},ms:[]});var b={ALL:1,ONE:2,ORDER:4},$=function(e){this.$host=e,this.$busy=0,this.$reqs={},this.id=o+h--};return a($.prototype,{send:function(e,r,a,o){var s=this;if(s.$busy)return s.next(function(){this.send(e,r,a,o)}),s;s.$busy=1;var c=s.$host,f=c.$mCache,u=c.$mCacheKeys,v=s.$reqs;t.isArray(e)||(e=[e]);var h,l,p,y=e.length,w=0,$=Array(y),C=[],S={},E=[],M=t.isArray(r);M&&(C=Array(r.length));for(var P,I=function(e,t,n){if(!s.$destroy){w++,delete v[e.id];var o=e.$mm,u=o.key;if($[t]=e,n)h=1,p=1,l=n,S.msg=n,S[t]=n;else{if(p=0,!u||u&&!f.has(u)){u&&f.set(u,e),o.done=m();var d=o.after,g=o.meta;d&&i(d,[e,g]),c.fire("done",{model:e,meta:g})}!e.fromCache&&o.used>0&&(e.fromCache=1),o.used++}if(a==b.ONE){var x=M?r[t]:r;x&&(C[t]=i(x,[p?S:null,e,S],s))}else if(a==b.ORDER){E[t]={m:e,e:p,s:n};for(var P,I,O=E.i||0;P=E[O];O++)I=M?r[O]:r,P.e&&(S.msg=P.s,S[O]=P.s),C[O]=i(I,[P.e?S:null,P.m,S].concat(C),s);E.i=O}w>=y&&(h||(S=null),a==b.ALL?($.unshift(S),C[0]=S,C[1]=i(r,$,s)):C.unshift(S),s.$ntId=setTimeout(function(){s.doNext(C)},30))}},O=0;e.length>O;O++)if(P=e[O]){var T=c.getModel(P,o),A=T.cKey,q=T.entity,V=g(I,q,O);V.id=s.id,A&&n(u,A)?u[A].q.push(V):T.update?(v[q.id]=q,A&&(u[A]={q:[V],e:q},V=x),q.request(V,{key:A,cKeys:u})):V()}else d("empty model");return s},fetchAll:function(e,t){return this.send(e,t,b.ALL)},saveAll:function(e,t){return this.send(e,t,b.ALL,1)},fetchOrder:w(b.ORDER),saveOrder:w(b.ORDER,1),saveOne:w(b.ONE,1),fetchOne:w(b.ONE),abort:function(){var e=this;clearTimeout(e.$ntId);var t=e.$host,r=e.$reqs,a=t.$mCacheKeys;for(var o in r){var s=r[o],c=s.$mm.key;if(c&&n(a,c)){for(var f,u=a[c],v=u.q,m=[],h=[],d=0;v.length>d;d++)f=v[d],f.id!=e.id?m.push(f):e.$destroy||h.push(f);i(h,["abort"],e),m.length?u.q=m:s.abort()}else s.abort()}e.$reqs={},e.$queue=[],e.$busy=0},next:function(e){var t=this;if(t.$queue||(t.$queue=[]),t.$queue.push(e),!t.$busy){var r=t.$latest;t.doNext(r)}return t},doNext:function(e){var t=this;t.$busy=0;var r=t.$queue;if(r){var n=r.shift();n&&i(n,e,t)}t.$latest=e},destroy:function(){var e=this;e.$destroy=1,e.abort()}}),a(a(l.prototype,r),{registerModels:function(e){var r=this,n=r.$mMetas;t.isArray(e)||(e=[e]);for(var i,a,o=0;e.length>o;o++)i=e[o],i&&(a=i.name,a?n[a]&&d("already exist:"+a):d("miss name"),i.cache&&(i.cacheKey||(i.cacheKey=v),i.cacheTime||(i.cacheTime=f)),n[a]=i)},registerMethods:function(e){a(this,e)},createModel:function(e){var t=this,r=t.getModelMeta(e),n=new t.$mClass;n.set(r),n.$mm={used:0};var a=e.before||r.before;c(a)&&i(a,[n,r]);var o=e.after||r.after;n.$mm.after=o;var s=e.cacheKey||r.cacheKey;return c(s)&&(s=i(s,[r,e])),n.$mm.key=s,n.$mm.meta=r,n.set(e),n.setUrlParams(r.urlParams),n.setPostParams(r.postParams),n.setUrlParams(e.urlParams),n.setPostParams(e.postParams),t.fire("inited",{model:n,meta:r}),n},getModelMeta:function(e){var r,n=this,i=n.$mMetas;r=t.isString(e)?e:e.name;var a=i[r];return a||d("Unfound:"+r),a},getModel:function(e,t){var r,n,i=this;return t||(r=i.getCachedModel(e)),r||(n=1,r=i.createModel(e)),{entity:r,cKey:r.$mm.key,update:n}},saveAll:y("saveAll"),fetchAll:y("fetchAll"),saveOrder:y("saveOrder"),fetchOrder:y("fetchOrder"),saveOne:y("saveOne"),fetchOne:y("fetchOne"),createMRequest:function(e){var t=new $(this);return e&&e.manage&&e.manage(t),t},clearCacheByKey:function(e){var t=this,r=t.$mCache;r.del(e)},clearCacheByName:function(e){for(var t=this,r=t.$mCache,n=r.c,i=0;n.length>i;i++){var a=n[i],o=a.v,s=o&&o.$mm;if(s){var c=s.meta.name;c==e&&r.del(s.key)}}},getCachedModel:function(e){var r,n,a=this,o=a.$mCache,s=null;if(t.isString(e)?r=e:(n=a.getModelMeta(e),r=e.cacheKey||n.cacheKey,c(r)&&(r=i(r,[n,e]))),r){var f=a.$mCacheKeys,u=f[r];if(u)s=u.e;else if(s=o.get(r)){n||(n=s.$mm.meta);var v=e.cacheTime||n.cacheTime||0;c(v)&&(v=i(v,[n,e])),v>0&&m()-s.$mm.done>v&&(a.clearCacheByKey(r),s=0)}}return s}}),l},{requires:["magix/magix","magix/event"]}),KISSY.add("mxext/model",function(e,t){var r=function(r,n){var i=function(){i.superclass.constructor.apply(this,arguments),n&&t.safeExec(n,[],this)};return t.mix(i,this,{prototype:!0}),e.extend(i,this,r)},n=+new Date,i=encodeURIComponent,a=t.has,o=t.isObject,s=t.toString,c=function(e){this.set(e),this.id="m"+n--};return t.mix(c,{GET:"GET",POST:"POST",extend:r}),t.mix(c.prototype,{sync:t.noop,getPostParams:function(){return this.getParams(c.POST)},getUrlParams:function(){return this.getParams(c.GET)},getParams:function(e){var r=this;e||(e=c.GET);var n,a="$"+e,o=r[a],s=[];for(var f in o){n=o[f],t.isArray(n)||(n=[n]);for(var u=0;n.length>u;u++)s.push(f+"="+i(n[u]))}return s.join("&")},setUrlParamsIf:function(e,t){this.setParams(e,t,c.GET,!0)},setPostParamsIf:function(e,t){var r=this;r.setParams(e,t,c.POST,!0)},setParams:function(e,t,r,n){var i=this,s="$"+r;i[s]||(i[s]={});var c=i[s];if(!o(e)&&e){var f={};f[e]=t,e=f}for(var u in e)n&&a(c,u)||(c[u]=e[u])},setPostParams:function(e,t){var r=this;r.setParams(e,t,c.POST)},setUrlParams:function(e,t){this.setParams(e,t,c.GET)},get:function(e,t,r){var n=this,i=arguments.length,a=2==i,o=n.$attrs;if(i){for(var c=(e+"").split(".");o&&c[0];)o=o[c.shift()];c[0]&&(o=r)}return a&&s.call(t)!=s.call(o)&&(o=t),o},set:function(e,t){var r=this;if(r.$attrs||(r.$attrs={}),o(e))for(var n in e)r.$attrs[n]=e[n];else e&&(r.$attrs[e]=t)},request:function(e,t){var r=this;r.$abt=0;var n=function(n,i){r.$abt?e("abort",null,t):n?e(n,i,t):(o(i)||(i={data:i}),r.set(i),e(n,i,t))};r.$trans=r.sync(n)},abort:function(){var e=this,t=e.$trans;t&&t.abort&&t.abort(),delete e.$trans,e.$abt=1},isAborted:function(){return this.$abt}}),c},{requires:["magix/magix"]}),KISSY.add("mxext/view",function(e,t,r,n){var i=window,a=0,o=t.safeExec,s=t.has,c=[],f="rendercall",u="destroy",v=function(e){i.clearTimeout(e),i.clearInterval(e)},m=function(e){o(e.destroy,c,e)},h=function(e){var t=this,r=t.$res,n=e.type==f,i=e.type!=u;for(var a in r){var o=r[a];(!n||o.mr)&&t.destroyManaged(a,i)}},d=r.extend({navigate:n.navigate,manage:function(e,r,n){var i=this,o=arguments,s=1,c=i.$res;if(1==o.length)r=e,e="res_"+a++,s=0;else{var f=c[e];f&&f.res!=r&&i.destroyManaged(e)}var u;t.isNumber(r)?u=v:r&&r.destroy&&(u=m);var h={hk:s,res:r,ol:n,mr:r&&r.fetchOne,oust:u};return c[e]=h,r},getManaged:function(e,t){var r=this,n=r.$res,i=null;if(s(n,e)){var a=n[e];i=a.res,t&&delete n[e]}return i},removeManaged:function(e){return this.getManaged(e,1)},destroyManaged:function(e,t){var r,n=this,i=n.$res,a=i[e];if(a&&(!t||!a.ol)){r=a.res;var o=a.oust,s=0;o&&(o(r),s=1),a.hk&&t||delete i[e],n.fire("destroyManaged",{resource:r,processed:s})}return r}},function(){var e=this;e.$res={},e.on("interact",function(){e.on(f,h),e.on("prerender",h),e.on(u,h)}),o(d.ms,arguments,e)},{ms:[],mixin:function(e,r){r&&d.ms.push(r),t.mix(d.prototype,e)}});return d},{requires:["magix/magix","magix/view","magix/router"]}),document.createElement("vframe");