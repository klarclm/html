

function AlertTipError(content, sec) {
    AlertTip(content, 0, 'error', true);
}
function AlertTipWarn(content, sec) {
    AlertTip(content, 0, 'warning', true);
}
function KAlert(content) {
    AlertTip(content, 0, 'succeed', true);
}
function len(s) {
    var l = 0;
    var a = s.split("");
    for (var i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) < 299) {
            l++;
        } else {
            l += 2;
        }
    }
    return l;
}
function AlertTip(content, sec, icon, showclosebtn) {
    if (sec == undefined) { sec = 2; }
    if (icon == undefined) { icon = 'succeed'; }
    if (showclosebtn == undefined) { showclosebtn = false; }
    var widthCur = 200;
    var length = len(content);
    if (6 < length && length <= 10) {
        widthCur = 100;
    } else if (10 < length && length <= 16) {
        widthCur = 190;
    } else if (16 < length && length <= 20) {
        widthCur = 230;
    } else {
        widthCur = 0;
    }
    //alert(length);
    art.artDialog.notice({
        title: '操作提示',
        width: widthCur, // 必须指定一个像素宽度值或者百分比，否则浏览器窗口改变可能导致artDialog收缩
        content: '<b style="font-size:12px;*font-size:15px;_font-size:14px;">' + content + '</b>', //,或' + sec + '秒后关闭//<br /><span style="font-size:12px;color:gray;font-weight:1px;">按Esc关闭</span>
        icon: icon, // 'face-smile',
        time: sec,
        esc: true,
        showclosebtn: showclosebtn
    });
    return false;
}

//底部的js
$('#alinkQuickOrdersDlg').click(function () {
    LoadOrderPrices();
});
function LoadOrderPrices() {
    var keys = "funcName=loadPriceGroup";
    LoadApIDiagnosis('', keys, function (result) {
        if (result != "-1") {
            var htmlContent = result[0].htmlContent;
            $('#divMainOrderDetailInfoList2').html(htmlContent);
            OrderDiagnoisisDlg();
        }
        else {
            AlertInSec("服务器繁忙，请稍后再试。", 3);
        }
    });
}
function LoadApIDiagnosis(scurrowdiv, para, funcResult, textLoading, funcError) {
    if (textLoading == undefined || textLoading == "") {
        textLoading = "数据加载中...";
    }
    if (scurrowdiv != "") {
        $('#' + scurrowdiv).mask(textLoading);
    }
    $.ajax({
        url: '/TaobaoToolAPI/API4Diagnosis.ashx?' + para + '&&ran=' + Math.random(),
        type: 'POST', //数据发送方式    
        dataType: 'json', //接受数据格式
        error: function (json) {
            if (scurrowdiv != "") {
                $('#' + scurrowdiv).unmask();
            }
            if (funcError != undefined) {
                funcError(json);
            } else {
                AlertTipWarn("服务器繁忙，请稍后再试。");
            }
        },
        async: true, //同步方式
        success: function (result) {
            if (scurrowdiv != "") {
                $('#' + scurrowdiv).unmask();
            }
            if (result == "-10") {
                CheckItemTitleIsOrderFn();
            } else {
                funcResult(result);
            }

        }
    });
}


function OrderDiagnoisisDlg() {
    var dialog = art.artDialog({
        //follow: document.getElementById('xiaoqiangstatus'),
        id: 'alertt234324i222p1231',
        lock: true,
        opacity: 0.7,
        background: '#fefefe', // 背景色  
        padding: '13px 15px',
        content: document.getElementById("orderDetailInfo"),
        esc: true,
        IsClickLockClose: true
    });
    dialog.button({
        name: '关闭',
        disabled: false,
        callback: function () {

        },
        focus: true
    });
    dialog.show();

    return false;
}

function AjaxMenu2() {
    var json = resultMenuAjax("FuncName=LoadKuHuiRightMainMenu");
    $("#divLeftMenu").html(json.htmlContent);
    $('#Mtest').FixedBar($(window));
}

function resultMenuAjax(para) {
    var url = "/TaobaoToolAPI/API4MainMenu.ashx?" + para + "&ran=" + Math.random();
    var result = "";
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (json) {
            result = json;
        }
    });
    return result;
}


function clear_a_blank() {
    $('body').find('a').each(function () {
        var target1 = $(this).attr('target');
        var url = $(this).attr('href');
        if (target1 == '_blank') {
            $(this).attr('target', '_self');
            if (url.indexOf('souyousoft.com') > 0 || url.indexOf('http://') < 0) {
            } else {
                $(this).click(function () {
                    NoticeCurrentTargetChange(url);
                    return false;
                });
            }
        }
    });
}

function NoticeCurrentTargetChange(newurl) {
    var dialog = art.artDialog({
        content: '<p style="font-size:14px;padding:10px 5px 5px;">因桌面规则,无法弹出新网页<br />而您的操作将跳离当前页面<br />进入新的地址是:' + newurl + '<br />复制地址可保留当前页面,点击继续将跳转</p>',
        fixed: true,
        id: 'f123213Fm7',
        icon: 'question',
        okVal: '本页直接访问',
        opacity: .5,
        lock: true,
        ok: function () {
            window.location = newurl;
        },
        cancel: true,
        cancelVal: '复制地址',
        cancel: function () {
            window.clipboardData.setData("Text", newurl);
            dialog.hide();
        }
    });
    dialog.show();
    //art.artDialog.confirm('地址跳转提示,<br />因桌面规则,您的操作将跳离当前页面,进入新的地址<br />是否保留当前页面？', function () {
    //    art.artDialog.tips('执行确定操作');
    //}, function () {
    //    art.artDialog.tips('执行取消操作');
    //});
}

//菜单事件
$.fn.menuEven = function (menuitem) {
    //菜单事件
    var el = $(this);
    el.live("mouseenter", function () {
        $(".navigation_t").hide();
        if (!(menuitem == null || menuitem == undefined || menuitem == '')) {
            //设置子菜单显示和显示位置
            var width = el.width();
            var pos = el.position();
            var top = pos.top;
            var left = pos.left + width;
            $("#" + menuitem).css({ 'left': left, 'top': top });

            $("#" + menuitem).show()
                .live("mouseover", function () {
                    el.addClass("menuSelect3");
                })
                .live("mouseleave", function () {
                    el.removeClass("menuSelect3");
                    $(this).hide()
                });
        }
    }).live("mouseleave", function (e) {
        //隐藏子菜单
        if (!(menuitem == null || menuitem == undefined || menuitem == '')) {
            var x = e.pageX;
            var y = e.pageY;
            var pos = $("#" + menuitem).position();
            var w = $("#" + menuitem).width();
            var h = $("#" + menuitem).height();
            var ex = pos.left;
            var ey = pos.top;

            if (!((x >= ex && x <= ex + w) && (y >= ey && y <= ey + h))) {
                el.removeClass("menuSelect3");
                $("#" + menuitem).hide()
            }
        }
    });
};


function goCopy(obj) {
    txt = obj.innerHTML;
    if (window.clipboardData) {
        clipboardData.setData("text", txt);
        return true
    }
    else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = txt;
    } else
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch (e) {
                alert("\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff01\n\u8bf7\u5728\u6d4f\u89c8\u5668\u5730\u5740\u680f\u8f93\u5165'about:config'\u5e76\u56de\u8f66\n\u7136\u540e\u5c06'signed.applets.codebase_principal_support'\u8bbe\u7f6e\u4e3a'true'")
            }
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!clip) {
                return false
            }
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!trans) {
                return false
            }
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = txt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip) {
                return false
            }
            clip.setData(trans, null, clipid.kGlobalClipboard);
            return true
        }
    return false
}
//新闻
var isOverFlowNotice = false;
function AutoScrollRightNotice(obj) {
    if (isOverFlowNotice == false) {
        $(obj).find("ul:first").animate({
            marginTop: "-20px"
        }, 1000, function () {
            $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
        });
    }
}

//新闻滚动start
var isOverFlowNotice = false;
function AutoScrollRightNotice(obj) {
    if (isOverFlowNotice == false) {
        $(obj).find("ul:first").animate({
            marginTop: "-20px"
        }, 1000, function () {
            $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
        });
    }
} 
$(function () {
    $("#divNoticePartAll").mouseover(function () {
        $('#img_notice_more_pic').attr("src", "/images/new_index2/noticemore_back.png");
        var pos = $(this).position();
        var top = pos.top + $(this).height();
        var left = pos.left;
        $('#Notice_more_div').attr("style", "top:" + top + "px;left:" + left + "px;");
        $('#Notice_more_div').show();
        isOverFlowNotice = true;
    }).mouseout(function () {
        $('#img_notice_more_pic').attr("src", "/images/new_index2/noticemore.png");
        $('#Notice_more_div').hide();
        isOverFlowNotice = false;
    });
    setInterval('AutoScrollRightNotice("#scrollDiv_notice")', 2000)
});
//新闻滚动end
 
//菜单2_start
function SetCurrentTopView(curCode) {
    $('.navigation_text_ul').find("a").removeClass("_slt");
    $('.navigation_text_ul').find("a").each(function () {
        var code = $(this).attr("code");
        if (code == curCode) {
            //alert(code);
            try {
                if (hky_currentMenuCode != "" && hky_currentMenuCode != code) {
                    LoadExdendModelDesc(code);
                }
            } catch (eee) { }
            $(this).addClass("_slt");
        }
    });

    $('.navigation_top_Child_text_ul').find("li").each(function () {
        var code = $(this).attr("code");
        if (code == curCode) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function GetMenuCode() {
    var currentMenuCode = "";
    $('.navigation_text_ul').find("a").each(function () {
        if (currentMenuCode == "") {
            var slt = $(this).attr("slt");
            if (slt != undefined && slt != "") {
                currentMenuCode = $(this).attr("code");
            }
        }
    });
    return currentMenuCode;
}
var hky_currentMenuCode
var hky_Stauts_IsView = false;
function SetReturnTopMenu() {
    if (hky_Stauts_IsView == true) {
        SetCurrentTopView(hky_currentMenuCode);
        ClearExdendModelDesc()
    }
}
$(function () {
    var currentMenuCode = GetMenuCode();
    hky_currentMenuCode = currentMenuCode;
    SetCurrentTopView(currentMenuCode);

    $('.navigation_text_ul').find("a").each(function () {
        $(this).mouseenter(function () {
            var thisCode = $(this).attr("code");
            SetCurrentTopView(thisCode);
            hky_Stauts_IsView = false;
        });
        $(this).mouseleave(function () {
            setTimeout("SetReturnTopMenu()", 500);
        });
    });

    $('.navigation_top_Child,.navigation_top').mouseenter(function () {
        hky_Stauts_IsView = false;
    }).mouseleave(function () {
        hky_Stauts_IsView = true;
        setTimeout("SetReturnTopMenu()", 1500);
    });


});
//菜单2_start

//菜单3_start
var hky_currentMenuCode_Child;
var hky_Stauts_IsView_Child = false;
function SetReturnTopMenuChild() {
    if (hky_currentMenuCode_Child == true) {
        $(".menu_child_kuhui_three").hide();
    }
}
$(function () {
    $(".menu_child_kuhui_second").mouseenter(function () {
        var sid = $(this).attr("sid");
        var childid = '#item_child2_' + sid;
        var chidm = $(childid);
        $(".menu_child_kuhui_three").hide();
        if (!chidm.hasClass("_slt")) {
            var pos = $(this).position();
            var left = pos.left + $(this).width();
            chidm.attr("style", "top:" + pos.top + "px;left:" + left + "px;");
            chidm.show();
        }
        hky_currentMenuCode_Child = false;
    });

    $('#divLeftMenu,.menu_child_kuhui_three').mouseenter(function () {
        hky_currentMenuCode_Child = false;
    }).mouseleave(function () {
        hky_currentMenuCode_Child = true;
        setTimeout("SetReturnTopMenuChild()", 1000);
    });
});
//菜单3_end
function adjustcss() {
    $(':checkbox').css('height', 'auto');
    $(':radio').css('height', 'auto');
}
adjustcss();
//版本判断
$(function () {
    

    //if ($.browser.msie && parseInt($.browser.version) <= 6) {
    //    var dg = new $.dialog({
    //        title: "浏览器版本太低",
    //        id: "111dd2e1",
    //        iconTitle: false,
    //        width: "400",
    //        height: "300",
    //        html: '<table width="100%" cellspacing="12"><tr><td align="center"><img src="/images/浏览器提示弹窗_03.jpg" /></td></tr><tr><td align="center"><span style="font-size:12px;color:#666666;">您的浏览器版本较低建议使用淘宝浏览器</span></td></tr><tr><td align="center"><a href="http://browser.taobao.com/" style="font-size:16px;color:#d85600;" target="_blank"><b>点击进入下载淘宝浏览器</b></a></td></tr></table>'
    //        //html: '<div style="width:120px;padding:0px 120px;"></div><div >!</div><div></div>'
    //    });
    //    dg.ShowDialog();
    //    //alert('你当前的浏览器是IE6或者以下');
    //    //window.open("http://browser.taobao.com/", '_self')
    //}

    ////判断修改通知栏菜单的超链接
    //for (var i = 0; i < 6; i++) {
    //    if ($("#atitle" + i).attr("href") == null || $("#title" + i).attr("href") == "") {
    //        var aid = $("#atitle" + i).attr("class");
    //        var bid = $("#btitle" + i).attr("class");
    //        $("#atitle" + i).attr("href", "/Diagnosis/NoticeInfo/NoticeDetails.aspx?noticeid=" + aid);
    //        $("#btitle" + i).attr("href", "/Diagnosis/NoticeInfo/NoticeDetails.aspx?noticeid=" + bid);
    //    }
    //}
});