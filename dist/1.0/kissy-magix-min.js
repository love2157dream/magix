KISSY.add("magix/body",function(i,h,a,b){var c=a.has,i=a.mix,d=a.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),p=document.body,j={},o={},r=65536,l=function(a,b,c){c?a.setAttribute(b,c):c=a.getAttribute(b);return c},b=i({processEvent:function(a){for(var b=a.target||a.srcElement;b&&1!=b.nodeType;)b=b.parentNode;var j=b,d=a.type,f=o[d]||(o[d]=RegExp("(?:^|,)"+d+"(?:,|$)"));if(!f.test(l(b,"mx-ie"))){for(var v="mx-"+d,k,t,e=[];j&&j!=p&&!(k=l(j,v),t=l(j,"mx-ie"),k||f.test(t));)e.push(j),
j=j.parentNode;if(k){d=l(j,"mx-owner");if(!d){f=j;for(t=this.VOM.all();f&&f!=p;)if(c(t,f.id)){l(j,"mx-owner",d=f.id);break}else f=f.parentNode}if(d)this.fire("event",{info:k,se:a,tId:b.id||(b.id="mx-e-"+r--),cId:j.id||(j.id="mx-e-"+r--),hld:d});else throw Error("miss mx-owner:"+k);}else for(;e.length;)a=e.shift(),t=l(a,"mx-ie"),f.test(t)||(t=t?t+","+d:d,l(a,"mx-ie",t))}},attachEvent:function(a){var b=this;if(j[a])j[a]++;else if(j[a]=1,d[a])b.onUnbubble(p,a);else p["on"+a]=function(a){(a=a||window.event)&&
b.processEvent(a)}},detachEvent:function(a){var b=j[a];0<b&&(b--,b||(d[a]?this.offUnbubble(p,a):p["on"+a]=null),j[a]=b)}},b);return a.mix(b,h)},{requires:["magix/impl/body","magix/magix","magix/event"]});
KISSY.add("magix/event",function(i,h){var a=h.safeExec;return{fire:function(b,c,d,i){var j="~"+b,o=this[j];if(o){c||(c={});if(!c.type)c.type=b;for(var b=o.length,h=b-1,l,s;b--;)l=i?b:h-b,s=o[l],s.d&&(o.splice(l,1),h--),a(s,c,this)}d&&delete this[j]},on:function(a,c,d){a="~"+a;this[a]||(this[a]=[]);h.isNumeric(d)?this[a].splice(d,0,c):(c.d=d,this[a].push(c))},un:function(a,c){h.isArray(a)||(a=[a]);for(var d=0,i=a.length;d<i;d++){var j="~"+a[d],o=this[j];if(o)if(c)for(var j=0,r=o.length;j<r;j++){if(o[j]==
c){o.splice(j,1);break}}else delete this[j]}}}},{requires:["magix/magix"]});KISSY.add("magix/impl/body",function(i,h){var a={};return{onUnbubble:function(b,c){var d=this;h.delegate(b,c,"*[mx-"+c+"]",a[c]=function(a){d.processEvent(a)})},offUnbubble:function(b,c){h.undelegate(b,c,"*[mx-"+c+"]",a[c]);delete a[c]}}},{requires:["event"]});
KISSY.add("magix/impl/magix",function(i,h){h=[].slice;return{libRequire:function(a,b){if(a){var c=this.isFunction(b),d=this.isArray(a);i.use(d?a.join(","):a,c?function(a){b.apply(a,h.call(arguments,1))}:this.noop)}else b()},libEnv:function(a){var b=a.appHome,c=location,d=c.protocol,h=a.appName;~b.indexOf(d)||(b=this.path(c.href,b));i.endsWith(b,"/")||(b+="/");a.appHome=b;var j=a.debug;j&&(j=0==b.indexOf(d+"//"+c.host));"~"==h.charAt(0)&&i.config({map:[[RegExp("/"+h+"/"),"/"]]});c="";(c=j?i.now():
a.appTag)&&(c+=".js");d=a.appCombine;i.isUndefined(d)&&(d=i.config("combine"));i.config({packages:[{name:h,path:b,debug:a.debug=j,combine:d,tag:c}]})},isArray:i.isArray,isFunction:i.isFunction,isObject:i.isObject,isRegExp:i.isRegExp,isString:i.isString,isNumber:i.isNumber}});
KISSY.add("magix/impl/router",function(i,h){var a=window;return{useState:function(){var b=this,c=location.href;h.on(a,"popstate",function(){var a=location.href==c;if(b.$firedPop||!a)b.$firedPop=!0,b.route()})},useHash:function(){var b=this;h.on(a,"hashchange",function(){b.route()})}}},{requires:["event"]});
KISSY.add("magix/impl/view",function(i,h,a){var b=function(){},c=i.Env.mods,d={wrapAsyn:1,extend:1},p=function(b,c,d){for(var h in c)i.isObject(c[h])?(a.has(b,h)||(b[h]={}),p(b[h],c[h],!0)):d&&(b[h]=c[h])};b.extend=function(c,d){var h=function(){h.superclass.constructor.apply(this,arguments);d&&a.safeExec(d,arguments,this)};h.extend=b.extend;return i.extend(h,this,c)};b.prepare=function(b,h){if(!b.wrapAsyn){for(var i in this)a.has(d,i)&&(b[i]=this[i]);i=b.prototype;for(var l=b;l.superclass;)l=l.superclass.constructor,
p(i,l.prototype);h.home=c[h.path].packageInfo.getBase();a.mix(i,h)}b.wrapAsyn()};a.mix(b.prototype,{fetchTmpl:function(a,b,c){h({url:a+(c?"?_="+i.now():""),success:b,error:function(a,c){b(c)}})}});return b},{requires:["ajax","magix/magix"]});
KISSY.add("magix/magix",function(i,h){var a=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,b=/[^\/]*$/,c=/[#?].*$/,d=/([^=&?\/#]+)=([^&=#?]*)/g,p=/^https?:\/\//i,j={},o=0,r={debug:false,iniFile:"~/ini",appName:"app",appHome:"./",tagName:"vframe",rootId:"magix_vf_root"},l=j.hasOwnProperty,s=function(n){return function(a,e,b){switch(arguments.length){case 0:b=n;break;case 1:b=g.isObject(a)?f(n,a):q(n,a)?n[a]:null;break;case 2:null===e?(delete n[a],b=e):n[a]=b=e}return b}},m=function(n){this.c=[];this.x=
n||20;this.b=this.x+5},u=function(n){return new m(n)},q=function(n,a){return n?l.call(n,a):0},f=function(n,a,e){for(var b in a)if(!0===e)n[b]=a[b];else if(q(a,b)&&(!e||!q(e,b)))n[b]=a[b];return n};f(m.prototype,{get:function(a){var e=this.c,b,a="pathname"+a;if(q(e,a)&&(b=e[a],1<=b.f))b.f++,b.t=o++,b=b.v;return b},set:function(a,e){var b=this.c,a="pathname"+a,f=b[a];if(!q(b,a)){if(b.length>=this.b){b.sort(function(a,e){return e.f==a.f?e.t-a.t:e.f-a.f});for(var c=this.b-this.x;c--;)f=b.pop(),delete b[f.k]}f=
{};b.push(f);b[a]=f}f.k=a;f.v=e;f.f=1;f.t=o++;return f},del:function(a){var a="pathname"+a,e=this.c,b=e[a];if(b)b.f=-1E5,delete e[a]}});var v=u(60),k=u(),t=function(a,e,b,f,c,d){g.isArray(a)||(a=[a]);if(!e||!g.isArray(e)&&!e.callee)e=[e];for(f=0;f<a.length;f++)try{d=a[f],c=g.isFunction(d)&&d.apply(b,e)}catch(k){}return c},e=function(){},g={isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},mix:f,has:q,safeExec:t,noop:e,config:s(r),start:function(a){var b=this,a=f(r,a);b.libEnv(a);var c=
a.iniFile.replace("~",a.appName);b.libRequire(c,function(c){r=f(a,c,a);var d=a.progress;b.libRequire(["magix/router","magix/vom"],function(f,c){f.on("changed",function(a){a.loc?c.locationUpdated(a.loc):a.changed.isView()?c.remountRoot(a):c.locationChanged(a)});c.on("progress",d||e);b.libRequire(a.extensions,function(){f.start()})})});a.ready&&(t(a.ready),delete a.ready)},keys:Object.keys||function(a){var e=[],b;for(b in a)q(a,b)&&e.push(b);return e},local:s({}),path:function(e,f){var d=e+"\n"+f,g=
k.get(d);if(!g){e=e.replace(c,"").replace(b,"");"/"==f.charAt(0)?(g=e.indexOf("://"),-1==g?g=f:(g=e.indexOf("/",g+3),g=-1==g?e+f:e.substring(0,g)+f)):g=e+f;for(;a.test(g);)g=g.replace(a,"$1/");k.set(d,g)}return g},pathToObject:function(a,e){var b=v.get(a);if(!b){var b={},f={},g="";c.test(a)?g=a.replace(c,""):~a.indexOf("=")||(g=a);if(g&&p.test(g))var k=g.indexOf("/",8),g=-1==k?"/":g.substring(k);a.replace(d,function(a,b,g){if(e)try{g=decodeURIComponent(g)}catch(c){}f[b]=g});b.pathname=g;b.params=
f;v.set(a,b)}return b},objectToPath:function(a,e){var b=a.pathname,f=[],g=a.params,c,d;for(d in g)c=g[d],e&&encodeURIComponent(c),f.push(d+"="+c);return b+(b&&f.length?"?":"")+f.join("&")},tmpl:function(a,e){return 1==arguments.length?j[a]:j[a]=e},listToMap:function(a,e){var b,f,g={},c;this.isString(a)&&(a=a.split(","));if(a&&(c=a.length))for(b=0;b<c;b++)f=a[b],g[e?f[e]:f]=e?f:1;return g},createCache:u};return g.mix(g,h)},{requires:["magix/impl/magix"]});
KISSY.add("magix/router",function(i,h,a,b){var c=window,d=a.has,p=a.mix,j=document,o=/^UTF-8$/i.test(j.charset||j.characterSet||"UTF-8"),r=a.config(),l=a.createCache(),s=a.createCache(),m,u,q,f=65536,v=/#.*$/,k=/^[^#]*#?!?/,t=r.nativeHistory,e,g,n=function(e,b,f){if(e){f=this.params;a.isArray(e)||(e=e.split(","));for(var g=0;g<e.length&&!(b=d(f,e[g]));g++);}return b},w=function(){return d(this,"pathname")},x=function(){return d(this,"view")},y=function(){return this.hash.pathname!=this.query.pathname},
B=function(a){return this.hash.params[a]!=this.query.params[a]},z=function(a){return d(this.hash.params,a)},A=function(a){return d(this.query.params,a)},C=function(a){return this.params[a]},i=p({getView:function(e){if(!q){q={routes:r.routes||{},e404:r.notFoundView};var b=r.defaultView;if(!b)throw Error("unset defaultView");q.home=b;var f=r.defaultPathname||"";q.routes[f]=b;q.pathname=f}e||(e=q.pathname);b=q.routes;b=a.isFunction(b)?b.call(r,e):b[e];return{view:b?b:q.e404||q.home,pathname:b?e:q.e404?
e:q.pathname}},start:function(){var a=c.history;e=t&&a.pushState;g=t&&!e;e?this.useState():this.useHash();this.route()},parsePath:function(e){var e=a.pathToObject(e,o),b=e.pathname;b&&"/"!=b.charAt(0)&&g&&(e.pathname=a.path(c.location.pathname,b));return e},parseQH:function(a){var a=a||c.location.href,e=l.get(a);if(!e){var e=a.replace(v,""),b=a.replace(k,""),f=this.parsePath(e),g=this.parsePath(b),d={};p(d,f.params);p(d,g.params);e={pathnameDiff:y,paramDiff:B,hashOwn:z,queryOwn:A,get:C,href:a,srcQuery:e,
srcHash:b,query:f,hash:g,params:d};l.set(a,e)}return e},parseLoc:function(a){a=this.parseQH(a);if(!a.view){var e=this.getView(t?a.hash.pathname||a.query.pathname:a.hash.pathname);p(a,e)}return a},getChged:function(a,e){var b=e.href,f=a.href+"\n"+b,g=s.get(f);g||(f=b+"\n"+f,g=s.get(f));if(!g){var c,g={params:{}};if(a.pathname!=e.pathname)c=g.pathname=1;if(a.view!=e.view)c=g.view=1;var b=a.params,d=e.params,k;for(k in b)b[k]!=d[k]&&(c=1,g.params[k]=1);for(k in d)b[k]!=d[k]&&(c=1,g.params[k]=1);g.occur=
c;g.isParam=n;g.isPathname=w;g.isView=x;s.set(f,g)}return g},route:function(){var a=this.parseLoc(),e=u||{params:{},href:"~"},b=!u;u=a;e=this.getChged(e,a);e.occur&&(m=a,this.fire("changed",{location:a,changed:e,firstFire:b}))},navigate2:function(b){if(b&&a.isString(b)){var c=this.parsePath(b),b={};b.params=p({},c.params);b.pathname=c.pathname;if(b.pathname){if(g&&(c=m.query)&&(c=c.params))for(var k in c)d(c,k)&&!d(b.params,k)&&(b.params[k]="")}else k=p({},m.params),b.params=p(k,b.params),b.pathname=
m.pathname;k=a.objectToPath(b);if(e?k!=m.srcQuery:k!=m.srcHash)e?(this.$firedPop=1,history.pushState(f--,j.title,k),this.route()):(p(b,m,b),b.srcHash=k,b.hash={params:b.params,pathname:b.pathname},this.fire("changed",{loc:m=b}),location.hash="#!"+k)}},navigate:function(e,b){!b&&a.isObject(e)&&(b=e,e="");b&&(e=a.objectToPath({params:b,pathname:e},o));this.navigate2(e)}},b);return a.mix(i,h)},{requires:["magix/impl/router","magix/magix","magix/event"]});
KISSY.add("magix/vframe",function(i,h,a,b){var c=document,d=65536,p=window.CollectGarbage||h.noop,j=h.mix,i=h.config(),o=i.tagName,r=i.rootId,l=h.has,s,m=function(a){return"object"==typeof a?a:c.getElementById(a)};c.createElement(o);var u=/<script[^>]*>[\s\S]*?<\/script>/ig,q=function(a){this.id=a;this.vId=a+"_v";this.cS={};this.rC=this.cC=0;this.sign=-2147483648;this.rM={}};j(q,{root:function(a){if(!s){var b=m(r);if(!b)b=c.createElement(o),b.id=r,c.body.insertBefore(b,c.body.firstChild);s=new q(r);
a.add(s)}return s}});j(j(q.prototype,a),{useAnimUpdate:h.noop,oldViewDestroy:h.noop,prepareNextView:h.noop,newViewCreated:h.noop,mountView:function(a,c){var k=this,d=m(k.id);d._bak?d._chgd=1:(d._bak=1,d._tmpl=d.innerHTML.replace(u,""));var e=k.vN&&k.useAnimUpdate();k.unmountView(e,1);if(a){var g=h.pathToObject(a),n=g.pathname,i=--k.sign;h.libRequire(n,function(a){if(i==k.sign){var f=k.owner;b.prepare(a,{$:m,path:n,vom:f});var h;e?(h=k.vId,k.prepareNextView()):h=k.id;var l=new a({owner:k,id:h,vId:k.vId,
vfId:k.id,location:f.getLocation()});k.view=l;l.on("interact",function(a){k.fire("viewInteract",{view:l});k.viewUsable=1;e&&k.newViewCreated(1);if(!a.tmpl){if(!e&&d._chgd)d.innerHTML=d._tmpl;k.mountZoneVframes(0,0,1)}l.on("rendered",function(){k.mountZoneVframes(0,0,1)});l.on("prerender",function(a){k.unmountZoneVframes(0,a.anim)})},0);l.load(j(g.params,c,!0))}})}},unmountView:function(a,b){if(this.view){this.childrenAlter();this.unmountZoneVframes(0,a);this.fire("viewUnmount");this.view.destroy();
var c=m(this.id);if(!a&&c._bak)c.innerHTML=c._tmpl;a&&b&&this.oldViewDestroy();delete this.view;delete this.viewUsable;p()}this.un("viewInteract");this.sign--},mountVframe:function(a,b,c,d){var e=this.owner,g=e.get(a);if(!g)g=new q(a),g.pId=this.id,l(this.cS,a)||this.cC++,this.cS[a]=d,e.add(g);g.mountView(b,c);return g},mountZoneVframes:function(a,b,c){this.unmountZoneVframes(a);var a=a?a:m(this.vId)||m(this.id),a=m(a).getElementsByTagName(o),h=a.length,e={};if(h)for(var g=0,n,i;g<h;g++){n=a[g];i=
n.id||(n.id="magix_vf_"+d--);l(e,i)||this.mountVframe(i,n.getAttribute("mx-view"),b,c);n=m(n).getElementsByTagName(o);i=0;for(var j=n.length;i<j;i++)e[n[i].id||(n[i].id="magix_vf_"+d--)]=1}else this.childrenCreated()},unmountVframe:function(a,b){var c=this.owner,d=c.get(a);d&&(d.unmountView(b),c.remove(a),delete this.cS[a],this.cC--)},unmountZoneVframes:function(a){var b;if(a){b=m(a).getElementsByTagName(o);for(var c={},d=this.cS,e=b.length-1,g;0<=e;e--)g=b[e].id,l(d,g)&&(c[g]=1);b=c}else b=this.cS;
for(var h in b)this.unmountVframe(h);if(!a)this.cS={},this.cC=0},childrenCreated:function(){var a=this.view;if(a&&!this.fcc)this.fcc=1,delete this.fca,a.fire("created"),this.fire("created");a=this.owner;a.childCreated();if(a=a.get(this.pId)){var b=this.id,c=a.rM;l(c,b)||(c[b]=a.cS[b],a.rC++,a.rC==a.cC&&a.childrenCreated())}},childrenAlter:function(){delete this.fcc;var a=this.view,b=this.id;if(a&&!this.fca)this.fca=1,a.fire("alter"),this.fire("alter");if(a=this.owner.get(this.pId)){var b=this.id,
c=a.rM,d=c[b];l(c,b)&&(a.rC--,delete c[b],d&&a.childrenAlter())}},locationChanged:function(a,b){var c=this.view;if(c&&c.sign&&(c.location=a,c.rendered)){var d=c.olChanged(b),e={location:a,changed:b,prevent:function(){this.cs=[]},toChildren:function(a){a=a||[];h.isString(a)&&(a=a.split(","));this.cs=a}};d&&h.safeExec(c.locationChange,e,c);for(var c=e.cs||h.keys(this.cS),d=0,e=c.length,g=this.owner,i;d<e;d++)(i=g.get(c[d]))&&i.locationChanged(a,b)}},locationUpdated:function(a){var b=this.view;if(b&&
b.sign){b.location=a;var b=this.cS,c,d=this.owner,e;for(e in b)(c=d.get(e))&&c.locationUpdated(a)}}});return q},{requires:["magix/magix","magix/event","magix/view"]});
KISSY.add("magix/view",function(i,h,a,b,c){var d=a.safeExec,p=a.has,j=[],o=a.config(),r=/^~[^\/]*/,l=a.mix,s=a.listToMap("render,renderUI"),m=function(a){return function(){var b;this.sign&&(this.sign++,this.fire("rendercall"),b=a.apply(this,arguments));return b}},i=function(a){l(this,a);this.sign=1};l(i,{wrapAsyn:function(){if(!this["~~"]){this["~~"]=1;var b=this.prototype,c,d;for(d in b){c=b[d];var f=null;a.isFunction(c)&&c!=a.noop&&!c["~~"]&&p(s,d)&&(f=m(c),f["~~"]=c,b[d]=f)}}}});var u=i.prototype,
q=window.CollectGarbage||a.noop,f=/\smx-[^ohv][a-z]+\s*=/g,v={prevent:function(a){a=a||this.domEvent;a.preventDefault?a.preventDefault():a.returnValue=!1},stop:function(a){a=a||this.domEvent;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},halt:function(a){this.prevent(a);this.stop(a)}},k=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,t=/(\w+):([^,]+)/g;l(u,b);l(u,{render:a.noop,locationChange:a.noop,init:a.noop,hasTmpl:!0,enableEvent:!0,enableAnim:!1,load:function(){var a=this,b=a.hasTmpl,c=arguments,
f=a.sign,h=function(){if(f==a.sign&&(a.delegateEvents(),a.fire("interact",{tmpl:b},1),d(a.init,c,a),d(a.render,j,a),!b&&!a.rendered))a.rendered=!0,a.fire("primed",null,1)};b&&!a.template?a.planTmpl(h):h()},updateViewId:function(){this.id=this.$(this.vId)?this.vId:this.vfId},beginUpdateHTML:function(){if(this.sign&&this.rendered){var a=this.enableAnim;this.fire("refresh",0,1);this.fire("prerender",{anim:a});var b=this.owner;a&&(d(b.oldViewDestroy,j,b),d(b.prepareNextView,j,b),this.updateViewId())}},
endUpdateHTML:function(){if(this.sign){if(this.rendered&&this.enableAnim){var a=this.owner;d(a.newViewCreated,j,a)}this.rendered||this.fire("primed",null,1);this.rendered=!0;this.fire("rendered");q()}},wrapMxEvent:function(a){return a?(""+a).replace(f,' mx-owner="'+this.vfId+'"$&'):a},setViewHTML:function(a){this.beginUpdateHTML();if(this.sign)this.$(this.id).innerHTML=this.wrapMxEvent(a);this.endUpdateHTML()},observeLocation:function(b){var c;if(!this.$ol)this.$ol={keys:[]};c=this.$ol;var d=c.keys;
if(a.isObject(b))c.pn=b.pathname,b=b.keys;if(b)c.keys=d.concat(a.isString(b)?b.split(","):b)},olChanged:function(a){var b=this.$ol;if(b){var c=0;b.pn&&(c=a.isPathname());c||(c=a.isParam(b.keys));return c}return 1},destroy:function(){this.fire("refresh",0,1);this.fire("destroy",0,1,1);this.delegateEvents(1);this.sign=0},parentView:function(){var a=this.vom.get(this.owner.pId),b=null;if(a&&a.viewUsable)b=a.view;return b},planTmpl:function(b){var c=this,d=a.tmpl(c.path);if(void 0===d){var d=o.debug,
f=c.home+c.path.replace(r,"")+".html";c.fetchTmpl(f,function(d){c.template=a.tmpl(c.path,d);b()},d)}else c.template=d,b()},processEvent:function(a){if(this.enableEvent&&this.sign){var b=a.se,c=a.info.match(k),f=c[1],h=c[2],c=c[3],i=this.events;if(i){var j=i[b.type];if(v[h])v[h](b);if(j&&j[f]){var u={};c&&c.replace(t,function(a,b,c){u[b]=c});d(j[f],l({view:this,currentId:a.cId,targetId:a.tId,domEvent:b,events:i,params:u},v),j)}}}},delegateEvents:function(a){var b=this.events,a=a?c.detachEvent:c.attachEvent,
d;for(d in b)a.call(c,d)}});a.mix(i,h,{prototype:!0});a.mix(i.prototype,h.prototype);return i},{requires:["magix/impl/view","magix/magix","magix/event","magix/body"]});
KISSY.add("magix/vom",function(i,h,a,b,c){var d=a.has,p=0,j=0,o=0,r=0,l={},s,m=a.mix({all:function(){return l},add:function(a){if(!d(l,a.id))p++,l[a.id]=a,a.owner=m,m.fire("add",{vframe:a})},get:function(a){return l[a]},remove:function(a){var b=l[a];b&&(p--,b.fcc&&j--,delete l[a],m.fire("remove",{vframe:b}))},childCreated:function(){if(!r){j++;var a=j/p;o<a&&(m.fire("progress",{percent:o=a}),1==a&&(r=1,m.un("progress")))}},root:function(){return h.root(m)},remountRoot:function(a){var b=m.root();s=
a.location;b.mountView(s.view)},locationChanged:function(a){s=a.location;m.root().locationChanged(s,a.changed)},locationUpdated:function(a){s=a;m.root().locationUpdated(a)},getLocation:function(){return s}},b);c.VOM=m;c.on("event",function(a){var b=m.get(a.hld);(b=b&&b.view)&&b.processEvent(a)});return m},{requires:["magix/vframe","magix/magix","magix/event","magix/body"]});
(function(i){var h=function(){};if(!i.console)i.console={log:h,info:h,error:h};var a,b={};if(!i.Magix)i.Magix={config:function(a){for(var d in a)b[d]=a[d]},start:function(b){a=b}},KISSY.use("magix/magix",function(c,d){i.Magix=d;d.config(b);a&&d.start(a)})})(this);