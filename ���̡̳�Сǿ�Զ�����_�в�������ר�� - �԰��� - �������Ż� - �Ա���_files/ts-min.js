if("undefined"===typeof TS){TS={}}(function(i,f){var a=i.DOM,g=location.host,j=/(?:(.+)\.)*daily\.(.+?)\.net/i,e=/(?:(.+)\.)*([^.]+?)\.com/i,b=/\{(.+?)Server\}/i,d="",c;c={_checkDaily:function(){return g.indexOf(".daily.")>-1},getServer:function(l,n){var o=this,h=b.exec(l),p,k;if(!(h&&h[1])){k=l}else{p=h[1];if(!o._checkDaily()){k=l.replace(b,p+".com")}else{k=l.replace(b,"daily."+p+".net")}}if(n){return o.addStamp(k)}return k},getCdn:function(k){var l=this,h=l._checkDaily()?"http://assets.daily.taobao.net/":"http://a.tbcdn.cn/";return k?(h+k):h},addStamp:function(k){var l=this._checkQmark(k)?"&":"?",h=new Date().getTime();return k+l+"t="+h},_checkQmark:function(h){return h.indexOf("?")>-1},buildUri:function(h,k){var l=this._checkQmark(h)?"&":"?";return h+l+(i.isPlainObject(k)?i.param(k):k)},escape:function(h){return h.replace(/(%|&|\?|#)/g,function(m,l){return escape(l)}).replace(/\+/g,"%2b")},encode:function(q){var n=this,p=/[^\x00-\xff]/g,h,l,r=d,k;if(i.isPlainObject(q)){for(k in q){var o=q[k];if(i.isString(o)){o=n.escape(o)}r+=k+"="+o+"&"}}else{r=q}if(!i.isString(r)){return false}l=r;while(h=p.exec(r)){l=l.split(h[0]).join(escape(h[0]).split("%").join("\\"))}return l}};return f.uri=c})(KISSY,TS);(function(h,c){var d=window,j=document,a=h.DOM,k=h.Event,b=c.uri,f=b.getServer("http://www.{taobaoServer}/go/act/share/loginsuccess.php"),e=b.getServer("https://login.{taobaoServer}/member/login.jhtml?from=share&style=mini&is_ignore=false&redirect_url=")+escape(f),i=b.getServer("http://www.{taobaoServer}/go/act/share/logincheck.php"),g;g={check:function(p){var o=this,n,m,l;if((h.unparam(h.Cookie.get("uc1"))["cookie15"]&&h.Cookie.get("_nk_"))||h.Cookie.get("ck1")){l=p["true"];l&&l()}else{c.IO.getScript(i+"?t="+new Date().getTime(),function(){m=c._userCookie;n=Boolean(h.unparam(m.uc1.replace(/&amp;/g,"&"))["cookie15"]&&m._nk_);l=p[n.toString()];l&&l()})}},show:function(o){var n=this,l=n.popup,m=o?o:function(){};n.callback=m;n.check({"true":function(){m()},"false":function(){if(l&&false){h.log("login: \u767b\u5f55\u5c42\u5df2\u7ecf\u5b58\u5728, \u4fee\u6539 iframe \u5730\u5740.");l.contentEl.getElementsByTagName("iframe")[0].src=e;l.show();l.center();l.fix()}else{h.log("login: \u767b\u5f55\u5c42\u4e0d\u5b58\u5728, \u521d\u59cb\u5316\u6d6e\u51fa\u5c42.");n._initOverlay()}}});return n},hide:function(){var l=this;l.popup.hide();return l},_initOverlay:function(){var m=this,l;l=m.popup=new c.Popup({elCls:"tb-ts-login",content:'<iframe width="410" height="270" data-status="0" src="'+e+'" frameborder="0" id="shareIframe" name="shareIframe" scrolling="no" onload="TS.login.checkLocation(this.name);"></iframe><a href="#" class="close J_Close"></a>'});m._initStyle();m._bindEvent();l.show();l.center();l.fix()},checkLocation:function(p){h.log("login: \u5224\u65ad\u662f\u5426\u662f\u767b\u5f55\u6210\u529f\u8df3\u8f6c.");var n=this,m=a.get("#"+p),l;if("0"===a.attr(m,"data-status")){h.log("login: \u7b2c\u4e00\u6b21\u8f7d\u5165\u767b\u5f55\u9875\u9762, \u4e0d\u8fdb\u884c\u5224\u65ad.");a.attr(m,"data-status","1")}else{h.log("login: \u5f00\u59cb\u5224\u65ad\u662f\u5426\u767b\u5f55\u6210\u529f.");try{l=d.frames[p].location.href;h.log("login: \u5c1d\u8bd5\u83b7\u53d6\u8df3\u8f6c\u540e\u7684\u94fe\u63a5: "+l+", \u662f\u4e0d\u662f: "+f);if(l){if(f===l){S.log("login: url \u4e00\u81f4, \u767b\u5f55\u6210\u529f, \u5173\u95ed\u6d6e\u51fa\u5c42, \u6267\u884c\u56de\u8c03.");n.hide();n.callback()}}else{h.log("login: \u65e0\u6cd5\u83b7\u53d6 iframe \u5730\u5740, \u5f3a\u5236\u62a5\u9519.");fuck()}}catch(o){h.log("login: \u83b7\u53d6\u94fe\u63a5\u5931\u8d25, \u5c1d\u8bd5\u5224\u65ad cookie.");n.check({"true":function(){h.log("login: \u767b\u5f55\u6210\u529f, \u5173\u95ed\u6d6e\u51fa\u5c42, \u6267\u884c\u56de\u8c03.");n.hide();n.callback()}})}}},_initStyle:function(){a.addStyleSheet(".tb-ts-login { border:1px solid #aaa; box-shadow:3px 3px 3px rgba(0, 0, 0, 0.2); width:410px; height:307px; background:#fafafa} .tb-ts-login .close { background:url(http://img03.taobaocdn.com/tps/i1/T1k.tYXadGXXXXXXXX-146-77.png) no-repeat -132px 0; height:17px; position:absolute; right:5px; top:5px; width:17px; }")},_bindEvent:function(){var l=this;k.on(l.popup["contentEl"],"click",function(m){var n=m.target;if(a.hasClass(n,"J_Close")){m.preventDefault();l.hide()}})}};return c.login=g})(KISSY,TS);(function(a,b){function c(d,g,f){var e=a.isString(g)?d[g]:g;return function(){var h=arguments?a.makeArray(arguments):[];if(f){h=f.concat(h)}e.apply(d,h)}}return b.hitch=c})(KISSY,TS);(function(n,e){var B=document,f=window,s=n.DOM,q=n.Event,h="contentEl",A="config",g="click",a="timer",c="events",o="filter",t="autoHide",l="visibility",x="hidden",u="visible",b="mask",w="display",m="none",y="block",v="srcNode",j="callback",z="J_Close",k="px",d=false,r=n.UA,p={elCls:"",content:""};function i(C){this._init(C)}i.prototype={_init:function(E){var G=this,D=s.create('<div class="ts-popup" style="position:'+(6===r.ie?"absolute":"fixed")+';z-index:10001;visibility:hidden"></div>'),F=n.merge(p,E),C=F.srcNode||B.body;G.prepend(D,C);D.innerHTML=F.content;F.style&&s.css(D,F.style);s.addClass(D,F.elCls);G[h]=D;G[A]=F;if(F.mask){G.createMask()}G._bindEvent()},_bindEvent:function(){var C=this;q.on(C[h],g,function(G){var H=G.target,F,D,E=C[A][c];if(s.hasClass(H,z)){G.preventDefault();C.hide()}if(E&&E.length>0){for(F=0,D=E.length;F<D;F++){if(E[F][o](H)){E[F][j](H)}}}})},position:function(M,L,G){var Q=this,D=Q[A],C=Q[h],E=s.get(M),R=s.offset(E),N=E.offsetWidth,I=E.offsetHeight,O=C.offsetWidth,J=C.offsetHeight,P=G||[0,0],H=D[v],G,K,F;switch(L){case"tr":K=R.left+N-O+P[0];F=R.top-J+P[1];break;case"tl":K=R.left+P[0];F=R.top-J+P[1];break;case"br":K=R.left+N-O+P[0];F=R.top+I+P[1];break;default:K=R.left+P[0];F=R.top+I+P[1]}if(H){G=s.offset(H);K-=G.left;F-=G.top}s.css(C,{left:K+k,top:F+k})},prepend:function(D,E){var C=s.children(E),F;if(C.length>0){F=C[0];s.insertBefore(D,F)}else{s.get(E).appendChild(D)}},center:function(){var C=this;C.centerAlign();C.centerValign()},centerValign:function(){var F=this,D=F[A],C=F[h],E=6===r.ie?s.scrollTop():0,H=s.viewportHeight(),G=C.offsetHeight;s.css(C,{top:E+(H-G)/2+k})},centerAlign:function(){var G=this,E=G[A],C=G[h],F=s.viewportWidth(),D=C.offsetWidth;s.css(C,{left:(F-D)/2+k})},fix:function(){var D=this,C;if(6===r.ie){if(D.hasFixedEvent){return false}q.on(f,"scroll resize",function(E){if(D[d]){D.centerValign();D.hasFixedEvent=true}})}},setContent:function(D){var F=this,C=F[h],E;C.innerHTML="";E=n.isString(D)?s.create(D):D;C.appendChild(E)},createMask:function(){var F=this,C=s.docHeight(),E=s.docWidth(),D=s.create('<div class="ts-mask" style="height:'+C+'px;display:none">'+(6===r.ie?('<iframe scrolling="no" frameborder="0" src="about:blank" width="'+E+'" height="'+C+'" style="filter:alpha(opacity=0.1)"></iframe>'):"")+"</div>");F.prepend(D,B.body);F[b]=D},showMask:function(){var C=this[b];C&&s.css(C,w,y)},hideMask:function(){var C=this[b];C&&s.css(C,w,m)},show:function(){var C=this,D;if(C[A][t]){D=C[a];if(D){clearTimeout(D)}C[a]=setTimeout(function(){C.hide();C[a]=null},3000)}C.showMask();s.css(C[h],l,u);C[d]=true;return C},hide:function(){var C=this;s.css(C[h],l,x);C.hideMask();C[d]=false;return C},destroy:function(){var D=this,C=D[h];C.parentNode.removeChild(C);D[d]=false;return D}};return e.Popup=i})(KISSY,TS);(function(){if(KISSY.Template){return false}KISSY.add("template",function(d){var i={},f={},r={"#":"start","/":"end"},t={},s=function(x){if(!(x in t)){t[x]=new RegExp(x,"ig")}return t[x]},a="KS_TEMPL_STAT_PARAM",v="KS_TEMPL",m="KS_DATA_",o="",j="as",c='");',l=v+'.push("',g="KISSY.Template: Syntax Error. ",n="KISSY.Template: Render Error. ",q="var "+v+"=[],"+a+"=false;with(",w="||{}){try{"+v+'.push("',b='");}catch(e){'+v+'=["'+n+'" + e.message]}};return '+v+'.join("");',h=function(z){var y,x;return d.trim(z).replace(s("[\r\t\n]")," ").replace(s("([\"'])"),"\\$1").replace(s("{{([#/]?)(?!}})([^}]*)}}"),function(C,E,F){y=o;if(E){F=d.trim(F);x=F.indexOf(" ");F=x===-1?[F,""]:[F.substring(0,F.indexOf(" ")),F.substring(F.indexOf(" "))];for(var A in e){if(F[0]!==A){continue}F.shift();if(E in r){var B=e[A][r[E]],D=d.trim(F.join(o).replace(s("\\\\(['\"])"),"$1"));y=d.isFunction(B)?B.apply(this,D.split(/\s+/)):B.replace(s(a),"typeof "+D+'!=="undefined"&&'+D)}}}else{y=v+".push("+F.replace(s("\\\\(['\"])"),"$1")+");"}return c+y+l})},p=function(x){return[].slice.call(x)},k=function(x){return p(x).join(o)},e={"if":{start:"if("+a+"){",end:"}"},"else":{start:"}else{"},elseif:{start:"}else if("+a+"){"},each:{start:function(){var y=p(arguments),x="_ks_value",A="_ks_index";if(y[1]===j&&y[2]){if(y[3]==="->"){A=y[2]||A;x=y[4]||x}else{x=y[2]||x}}var z="KISSY.each("+y[0]+", function("+x+", "+A+"){";return z},end:"});"},"!":{start:"/*"+a+"*/"}},u=function(B,y){d.mix(i,y);if(!(B in f)){var z=m+d.now(),A,x=[q,z,w,h(B),b];try{A=new Function(z,x.join(o))}catch(C){x[3]=c+l+g+","+C.message+c+l;A=new Function(z,x.join(o))}f[B]={name:z,parser:x.join(o),render:A}}return f[B]};d.mix(u,{log:function(x){if(x in f){if("js_beautify" in window){d.log(js_beautify(f[x].parser,{indent_size:4,indent_char:" ",preserve_newlines:true,braces_on_own_line:false,keep_array_indentation:false,space_after_anon_function:true}),"info")}else{d.log(f[x].parser,"info")}}else{u(x);this.log(x)}},addStatement:function(x,y){if(d.isString(x)&&d.isObject(y)){e[x]=y}}});d.Template=u;return u},{requires:["core"]})})();(function(f,e){if(e.root){return false}var i="_requireCount",g="_callbackQueue",j="apps/snstaoshare/widget/ts",h=document,c=f.IO,a=f.DOM,b=0,d=e.uri;f.mix(TS,{root:"apps/snstaoshare/widget/ts/",_requireCount:0,_callbackQueue:[],_globalObject:{},IO:{getScript:c?c.getScript:(f.getScript?f.getScript:f.Ajax.getScript),jsonp:c?c.jsonp:function(k,n){var l=e.IO,m="_jsonp_"+b++;l[m]=n;l.getScript(d.buildUri(k,"callback=TS.IO."+m))}},interactServer:function(l,o,p){var m=this,n,k;n=o?d.encode(o):"";m[i]++;m.IO.jsonp(d.buildUri(d.addStamp(l),n),function(q){m[i]--;m[g].push(e.hitch(m,p,[q]));m._excuteCallback()})},loadScript:function(k,m){var l=this;if(f.indexOf(k,l._loadedScript)>-1){return l._excuteCallback()}l[i]++;l.ready(m);if((location.href.indexOf("ks-debug")>-1)&&k.indexOf(".source.")<0){k=k.replace(/\.js/,".source.js")}return l.IO.getScript(k,function(){l[i]--;l._loadedScript.push(k);l._excuteCallback()})},_loadedScript:[],ready:function(l){var k=this;l&&k[g].push(l);k._excuteCallback()},_excuteCallback:function(){var l=this,k;if(0===l[i]){k=l[g];l[g]=[];f.each(k,function(m){m.call(l)})}},addStyleSheet:function(m){var l=a.get("head"),k;if(/\.css/.test(m)){k=h.createElement("link");k.setAttribute("rel","stylesheet");k.href=m;l.appendChild(k)}else{a.addStyleSheet(m)}},getTimeStamp:function(){var k=this;if("undefined"===typeof _TS_TIME_STAMP){_TS_TIME_STAMP={};return k.loadScript("http://www.taobao.com/go/rgn/sns/ts-timestamp.php")}return _TS_TIME_STAMP},define:function(m,p,q){var o=this,l=[],n,k;if(f.isFunction(p)){q=p;p=[]}k=p.length;if(k){for(n=0;n<k;n++){o.loadScript(d.getCdn(o.root+p[n]+".js"));l.push(o._globalObject[p[n]])}}o.ready(function(){o._globalObject[m]=q.apply(o,l)})},require:function(m,l,r){var n=this,o=f.isString(l),k=o?r:l,q=m.toLowerCase(),p;if(e[m]){return k&&k()}n.getTimeStamp();n.ready(function(){p=[j,q,o?l:"1.0",(location.href.indexOf("ks-debug")>-1?"main.source":"main")+".js?t="+_TS_TIME_STAMP[q]].join("/");n.loadScript(d.getCdn(p));n.ready(function(){k&&k.call(n,n._globalObject[m+"/"+l])})});return false}})})(KISSY,TS);