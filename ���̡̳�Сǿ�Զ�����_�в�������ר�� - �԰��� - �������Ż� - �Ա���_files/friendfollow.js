/*pub-1|2013-09-02 11:22:55*/SNS.define(["./follow/follow","./friendfollow.css"],function(b){var d=KISSY,a=d.DOM,l=d.Event;var f=false;var g=null,j=0,c=false,h='<p><span>\u65b0\u5173\u6ce8<em class="J_NewNum friendfollow-new-num">0</em>\u4eba</span></p>',i='<div class="mod friendfollow-dialog"><div class="hd J_TipHd">'+h+'</div><div class="bd"><p class="J_TipContent"><a class="J_Link friendfollow-default" href="http://fx.taobao.com/tlive/together.htm" target=_"blank">\u53bb\u770bTA\u5206\u4eab\u7684\u5b9d\u8d1d</a></p><a class="J_CloseBtn friendfollow-close" >&times;</a></div></div>';var k={width:120,height:54};var e=SNS.createWidget({configs:{skinType:"gray",userId:"",group:"",custom:"",showTipDialog:"hide"},_init:function(){var q="friend-follow-skin-"+this.configs.skinType;var n=d.one(this.element).addClass(q).html("");var o=new d.Node("<a>").attr("href","#").addClass("J_FriendFollow").addClass("friend-follow").attr("data-userId",this.configs.userId).attr("data-group",this.configs.group).attr("data-custom",this.configs.custom).attr("data-showTipDialog",this.configs.showTipDialog).appendTo(n);d.later(function(){if(!f){f=true;b.update()}});var m=this.configs.tipConfig;if(m){m=d.mix(m,k);if(!g){var p=null;g=new d.Node(i).height(m.height).width(m.width).appendTo(document.body);p=g.one(".J_Link")[0];if(m.url){p.href=m.url;p.innerHTML=m.text;a.removeClass(p,"friendfollow-default")}g.one(".J_CloseBtn").on("click",function(){g.hide();c=false;j=0});b.on(null,"follow",function(t){var r=t.target;if(a.attr(r,"data-showTipDialog")==="show"){var s=a.offset(r);t.newfollow&&++j;g.one(".J_NewNum").html(j);a.hasClass(p,"friendfollow-default")&&(p.search="?tracelog=snssearchtipslx816&follow_count="+j);if(!c){g.css({top:s.top-a.height(g)+"px",left:s.left+"px"});g.show();c=true;if(m.xy){d.later(function(){g.animate({top:m.xy[1]+"px",left:m.xy[0]+"px"},0.5)},500)}}else{g.show()}}});typeof m.content!=="undefined"&&g.one(".J_TipContent").html(m.content)}}}});d.mix(e.prototype,b);return e});