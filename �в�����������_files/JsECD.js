jQuery.extend(
 {
     /**
      * @brief: 加载跨域名js脚本
      * @param: 脚本URL
      * @param: 加载完毕回调函数
      */
     getScriptEx: function (jsurl, fCallback, fError) {
         var BROWSER_IE = window.navigator.userAgent.indexOf("MSIE") != -1;
         var SCRIPT_TIMEOUT = 20000;

         if (typeof (fCallback) != "function") fCallback = new Function();
         if (typeof (fError) != "function") fError = new Function();
         var oScriptEl, oTimeoutHDL, oHead;
         try {
             oScriptEl = document.createElement("script");
             oScriptEl.type = "text/javascript";
             oScriptEl.language = "javascript";
             oScriptEl.src = jsurl + "&" + Math.random() + "&rurl=" + encodeURIComponent(window.location.href);
             oScriptEl.onreadystatechange = doCallback;
             if (BROWSER_IE) {
                 oScriptEl.onload = function () {
                     this.readyState = "complete";
                     doCallback();
                 };
             };

             oTimeoutHDL = window.setTimeout(doError, SCRIPT_TIMEOUT);
             document.getElementsByTagName("head")[0].appendChild(oScriptEl);

         }
         catch (error)
         { }

         function doCallback() {
             try {
                 if (oScriptEl.readyState == "complete" || oScriptEl.readyState == "loaded") {
                     oScriptEl.onload = oScriptEl.onreadystatechange = new Function();
                     fCallback();
                     window.clearTimeout(oTimeoutHDL);
                     oScriptEl.parentNode.removeChild(oScriptEl);
                 }
             }
             catch (error)
             { }
         };

         function doError() {
             try {
                 oScriptEl.parentNode.removeChild(oScriptEl);
             }
             catch (error)
             { }
         };
     }
 });