(function(){
    var win = window,
        doc = document,
        storage = {};

    (function() {

            if(win.localStorage){
                var localStorage = {};

                localStorage.setItem = function(key, val, context) {
                    return win.localStorage.setItem(key, val, context);
                };

                localStorage.getItem = function(key, context) {
                    return win.localStorage.getItem(key, context);
                };


                localStorage.removeItem = function(key, context) {
                    return win.localStorage.removeItem(key, context);
                };


                localStorage.clear = function() {
                    return win.localStorage.clear();
                };
                return storage = localStorage;

            }

            //for IE
            var useObject = doc.documentElement;
            useObject.style.behavior = 'url(#default#userData)';
            var userBehavor = {
                setItem: function(key, value, context) {
                    try {
                        useObject.setAttribute(key, value);
                        return useObject.save(context || 'default');
                    } catch (e) {}
                },
                getItem: function(key, context) {
                    try {
                        useObject.load(context || 'default');
                        return useObject.getAttribute(key) || '';
                    } catch (e) {}
                },
                removeItem: function(key, context) {
                    try {
                        context = context || 'default';
                        useObject.load(context);
                        useObject.removeAttribute(key);
                        return useObject.save(context);
                    } catch (e) {}
                },
                clear: function() {
                    try {
                        useObject.expires = -1;
                    } catch (e) {}
                }
            };
            return storage = userBehavor;
        })();


        var NAMESPACE = 'TB_OPEN_SECURE_API';

        var util = window[NAMESPACE] = {};

        var DOMAIN = location.href.indexOf('daily=true') === -1 ? 'http://container.api.taobao.com/' : 'http://container.api.daily.taobao.net/';

        function sexport(key, fn){
            util.key = fn;
        }

        function getScript(url){
            var script = document.createElement('script'),
            head = document.getElementsbyTagName('head')[0];
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', url);
            head.appendChild(script);
        }

        function createIframe(url){
            var iframe = document.createElement('iframe');
            iframe.setAttribute('width', 0);
            iframe.setAttribute('height', 0);
            iframe.setAttribute('src', url);
            iframe.setAttribute('frameborder', 0);
            document.body.appendChild(iframe);
            return iframe;
        }

        function heartbeat(fn, interval){
            function step(){
                fn();
                setTimeout(step, interval);
            }
            step();
        }

        var SESSION_KEY = navigator.userAgent + 'taobaoSessionTimestamp';


        function refreshSession(appkey){
            if(!appkey) {return;}
            var url = DOMAIN + 'container/heartBeat?appkey=' + appkey,
            iframe = createIframe('about:blank'),
            sessionKey = SESSION_KEY + appkey;
            function updateSession(){
                var now = new Date().getTime(),
                lastUpdatedTime = +storage.getItem(sessionKey),
                interval = 20*60*1000,
                //interval = 10*1000,
                timeGap = lastUpdatedTime ? (now - lastUpdatedTime) : interval;
                if(timeGap < interval){
                    setTimeout(updateSession, timeGap);
                }else{
                    iframe.setAttribute('src', url + '&timestamp=' + now);
                    storage.setItem(sessionKey, now);
                    setTimeout(updateSession, interval);
                }
            }
            updateSession();
            //heartbeat(updateSession, 20*60*1000);
        }

        function showDurex(){
    
        }

        function showMiniLogin(sign, timestamp){
            var url = 'https://login.taobao.com/member/login.jhtml?style=mini&full_redirect=false&timestamp=' + new Date().getTime();
        }

        function handleCheckToken(resp){
            if(resp.code === 0){
                try{window[userCallback](resp);}catch(e){}
            }else if(resp.code === 1){
                showDurex();
            }else if(resp.code === 2){
                showMiniLogin();
            }else{
        
            }
        }

        function checkToken(token, appkey, callback){
            userCallback = callback;
            var url = DOMAIN + 'container/getToken?appkey=' + appkey + '&token=' + token + '&callback' + callback;
            getScript(url);
        }

        function durex(){
        }

        function secureApi(apis, appkey, callback){
            if(typeof api.splice === 'function'){
                api = api.join(',');
            }
        }

        var SCRIPT_ID = 'J_secure_sdk_script',
            script,
            appkey = '';

        function getAppkey(){
            var script = document.getElementById(SCRIPT_ID);
            if(!script){return;}
            return script.getAttribute('data-appkey');
        }

        function checkToken(token){
        }

        function refreshJs(){
            //In order to clear the user browser's cache, we call the script with a timestamp parameter.
            new Image().src = document.getElementById(SCRIPT_ID).src + '?timestamp=' + new Date().getTime();
        }
        function initSdk(){
            var appkey = getAppkey();
            try{
                refreshSession(appkey);
            }catch(e){
            }
            setTimeout(refreshJs, 3000);
        }
        if(window.addEventListener){
            window.addEventListener('load', initSdk, false);
        }else if(window.attachEvent){
            window.attachEvent('onload', initSdk);
        }

    })();
