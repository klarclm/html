(function(){APP.use("node","io","jsonp",function(e){var c=function(){this.api_host="http://cmdtools.lz.taobao.com/mbpsdk/union/";this.logo_list={a1:"http://union.clouddata.taobao.com/sdk/union/images/logo_a1.jpg",a2:"http://union.clouddata.taobao.com/sdk/union/images/logo_a2.jpg",a3:"http://union.clouddata.taobao.com/sdk/union/images/logo_a3.jpg",a4:"http://union.clouddata.taobao.com/sdk/union/images/logo_a4.jpg"};this.s_logo="http://gtms01.alicdn.com/tps/i1/T1PnU0FfdcXXX9g2ba-18-18.png";this.union_url=
	"http://clouddata.taobao.com/union/norm_detail.htm?role=seller&id=";this.app_url="http://clouddata.taobao.com/union/auth_app_detail.htm?role=seller&appkey=";this.arr={};for(var a,d=/\/sdk\/union\/mu-loader\.js/i,e=document.getElementsByTagName("script"),b=0,f,h=e.length;b<h;b++)if(f=e[b],(f.src||"").match(d)){a=f;break}for(b=0;b<a.attributes.length;b++)d=a.attributes[b],"src"!=d.name&&d.specified&&(this.arr[d.name]=d.value)};c.prototype.getLogo=function(a){if(void 0!=a){var d=a.lId,c=a.typeId||"a1",
		b=this;e.jsonp(this.api_host+"logo?callback={callback}&appkey="+b.arr.appkey,{on:{success:function(a){0==a.retCode&&1==a.isAuth&&e.one("#"+d).set("innerHTML","<a href="+b.app_url+b.arr.appkey+" target='_blank'><img src='"+b.logo_list[c]+"' /></a>")}}})}};c.prototype.getTips=function(a){if(void 0!=a&&void 0!=a.tipClass){var d=a.tipClass,c=[];e.all("."+d).each(function(a){a.getAttribute("nId")&&c.push(a.getAttribute("nId"))});if(!(0>=c.length)){var b=[],f=this;a=this.api_host+"norm?callback={callback}&appkey="+
			f.arr.appkey+"&normIds="+c.join(",");e.jsonp(a,{on:{success:function(a){0==a.retCode&&(b=a.appkeyNorms);e.all("."+d).each(function(a){var d=a.getAttribute("nId"),c;e.Array.each(b,function(a){null!=a.normSdkInfo&&a.normSdkInfo.sdkNormId==d&&(c=a)});if(void 0!=c){var h=c.normSdkInfo.sdkNormDesc||"",g='<div class="mmu_tips" id="mmu_tips">',g=g+('<p><span class="mmu_tips_title">\u6307\u6807\u540d\u79f0\uff1a</span><span class="mmu_tips_con">'+(c.normSdkInfo.sdkNormName||"(\u7a7a)")+"</span></p>"),g=g+
				('<p><span class="mmu_tips_title">\u6307\u6807\u5b9a\u4e49\uff1a</span><span class="mmu_tips_con">'+h.substr(0,20)+"...</span></p>"),g=g+('<div><a href="'+f.union_url+d+'" target="_blank"> >> \u67e5\u770b\u8be6\u7ec6</a></div>'),g=g+"</div>";a.setStyle("width",16);a.setStyle("height",19);a.setStyle("background","url("+f.s_logo+") no-repeat");var k,l=c.isAuth;a.on("mouseenter",function(){var c="left",b=e.Node.create(g),d=a.getX()+parseInt(a.getStyle("width"))+3,f=a.getY()-92;192+d>e.one(document).get("docWidth")&&
					(d=a.getX()-192-30,c="right");var h="",h=1==l?"left"==c?"mmu_tips_bl":"mmu_tips_br":"left"==c?"mmu_tips_bl_r":"mmu_tips_br_r";b.addClass(h);e.one("body").append(b);b.setStyle("top",f).setStyle("left",d);b.on("mouseleave",function(){setTimeout(function(){b.remove()},30)});b.on("mouseenter",function(){void 0!=k&&clearTimeout(k)});a.on("mouseleave",function(){k=setTimeout(function(){b.remove()},20)})})}})}}})}}};c=new c;window._data_union=c})})();
