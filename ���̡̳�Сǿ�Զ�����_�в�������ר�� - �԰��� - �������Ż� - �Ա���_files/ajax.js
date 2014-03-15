/*pub-1|2012-11-26 23:56:36*/SNS.define(function(){var F=KISSY;var D=/^(\w+:)?\/\/([^\/?#]+)/;var A="crossdomain.htm";var J={};var B={send:function(K){if(!K.url&&K.response){K.success&&K.success(K.response)}if(!K.use){K.use=this._autoCheck(K.url)}switch(K.use){case"xhr":this._KISSYRequest(K);break;case"iframe":this._iframeRequest(K);break;case"message":this._MessageRequest(K);break;case"jsonp":this._JSONPRequest(K);break}return this},_autoCheck:function(N){var M="xhr",Q,L=location,P,K,R,O;Q=D.exec(N);if(Q){if(Q[1]!==L.protocol||Q[2]!==L.host){M="message";if(Q[1]===L.protocol){P=Q[2].split(".");K=L.host.split(".");R=P[P.length-2]+P[P.length-1];O=K[K.length-2]+K[K.length-1];if(R==O){M="iframe"}}}else{M="xhr"}}return M},_createCallback:function(L,K){return function(N,M,O){if(L){if(K.dataType=="json"){L(N,K)}else{if(K.dataType=="html"){L(N,K)}else{L(O,K)}}}}},_KISSYRequest:function(K){F.ajax(K)},_iframeRequest:function(K){C();if(F.version>="1.20"){K.xdr={subDomain:{proxy:"/crossdomain.htm"}};F.ajax(K)}else{I(K.url,function(L){if(L&&L.contentWindow){var M=L.contentWindow;K.xhr=M.ActiveXObject?function(){if(M.XmlHttpRequest){try{return new M.XMLHttpRequest()}catch(O){}}try{return new M.ActiveXObject("Microsoft.XMLHTTP")}catch(N){}}:function(){return new M.XMLHttpRequest()}}F.ajax(K)})}},_JSONPRequest:function(K){K.dataType="jsonp";K.type="get";F.log("jsonp",K);F.ajax(K)},_MessageRequest:function(K){H(K)}};function C(){document.domain=location.hostname.split(".").slice(-2).join(".");F.log("setDomain:"+document.domain);return document.domain}function I(K,N){var L=D.exec(K);var M=L[0]+"/"+A;E(M,N)}var G={};function H(L,N){var K=F.guid();L._guid=K;G[K]=L;var M="http://www."+SNS.domain.server+"/go/rgn/sns/crossdomain.htm?all";SNS.require(["sns/core/xd"],function(O){E(M,function(P){O.pm.send({target:frames[P.id],data:L})},function(P){O.pm.bind(function(Q){if(Q.t==="xda"){var R=G[Q.n];R[Q.m]&&R[Q.m](Q.data);delete G[Q.n]}})})})}function E(M,O,K){var L=J[M];if(L&&L._loaded){O&&O(L)}else{if(L&&!L._loaded){F.Event.on(L,"load",function(){L._loaded=true;O&&O(L)})}else{var N="crossdomain"+SNS.guid();L=F.DOM.create('<iframe id="'+N+'" class="crossdomain" style="display:none" frameborder="0" width="0" height="0"  ></iframe>');F.Event.on(L,"load",function(){L._loaded=true;K&&K(L);O&&O(L)});L.src=M;L._loaded=false;F.DOM.append(L,document.body);J[M]=L}}}return{ajax:function(K){if(!K.url){return B.send(K)}K.url=SNS.normalize(K.url);K.url=SNS.addParams(K.url,"t="+new Date().getTime());K.data=K.data||{};if((K.type&&(K.type.toLowerCase()=="post"))&&!K._fetchToken){SNS.fetchToken(function(L){if(F.isString(K.data)){if(K.data.indexOf("_tb_token_")==-1){K.data+="&_tb_token_="+L}}else{if(F.isPlainObject(K.data)){K.data._tb_token_=L}}F.log("ajax",K.data);B.send(K)})}else{B.send(K)}},get:function(L,M,N,K){if(F.isFunction(M)){K=N;N=M;M=null}this.ajax({type:"get",url:L,data:M,success:N,dataType:K})},post:function(L,M,N,K){if(F.isFunction(M)){K=N;N=M;M=null}this.ajax({type:"post",url:L,data:M,success:N,dataType:K})}}});