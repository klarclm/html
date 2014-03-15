/*-------------------------------- autorate公共开始------------------------------*/
//获取访问参数
function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}
function resultAjax(para) {
    var url = "/TaobaoToolAPI/API4AutoRate.ashx?" + para + "&ran=" + Math.random();
    var result = "";
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        //data: theData,
        async: false,
        success: function (json) {
            result = json;
        }
    });
    return result;
}
//ajax公共访问
function LoadApI(scurrowdiv, para, funcResult, textLoading) {
    if (textLoading == undefined || textLoading == "") {
        textLoading = "数据加载中...";
    }
    $('#' + scurrowdiv).mask(textLoading);
    $.ajax({
        url: "/TaobaoToolAPI/API4AutoRate.ashx?" + para + "&ran=" + Math.random(),
        type: 'POST', //数据发送方式    
        dataType: 'json', //接受数据格式
        error: function (json) {
            $('#' + scurrowdiv).unmask();
            alert("服务器繁忙，请稍后再试。");
        },
        async: true, //同步方式
        success: function (result) {
            $('#' + scurrowdiv).unmask();
            funcResult(result);
        }
    });
}
//删除前提示
function DeleteComfrim() {
    if (confirm("确定删除吗")) {
        return true;
    }
    return false;
}
function ClosePage() {
    var dg = frameElement.lhgDG;
    dg.cancel();
}
window.onload = function () {
    //是否隐藏自动评价菜单
    var json = resultAjax("FuncName=ShowOrHideStatisMenu");
    if (json.IsOK) {
        if (!json.ResultContent) {
            $(".itemmenu_even_1,.itemmenu_even_2").each(function () {
                var obj = $(this);
                obj.find("a").each(function () {
                    var url = $(this).attr("href").toLocaleLowerCase();
                    if (url.indexOf("/autorate/ratepicstatis.aspx") != -1) {
                        //alert("fd")
                        $(this).parents("li:eq(0)").hide();
                    }
                });
            });
        }
    }
}
/*-------------------------------- autorate公共结束------------------------------*/

/*-------------------------------- /AutoRate/AutoRateSetting.aspx 开始------------------------------*/
//默认配置
function DefaultSetting() {
    var para = "FuncName=DefaultSetting";
    LoadApI("contentMain", para, function (result) {
        if (result == "0") {
            LoadAutoRateContent(); //加载评价内容列表
            LoadAutoRateSetting(); //加载评价配置信息
        } else {
            alert("自动评价初始化配置失败!");
        }
    });
}
function ChangeStatus() {
    //LoadApI("contentMain", "FuncName=IsTmallUser", function (r) {
    //    if (r == "1") {
    var status = $.trim($("#rateStatus").text());
    var para = "FuncName=ChangeStatus&status=" + escape(status) + "&r=" + Math.random();
    LoadApI("contentMain", para, function (result) {
        if (!result.IsOK) {
            alert(result.Message);
        } else {
            if (status == "关 闭") {
                $("#rateStatus").text("开 启");
            } else {
                $("#rateStatus").text("关 闭");
            }
            StatusTip();
        }
    });


    //    } else {
    //        alert("自动评价只支持集市卖家!");
    //    }
    //});
}
//评价内容列表
function LoadAutoRateContent() {
    var para = "FuncName=LoadAutoRateContent"
    LoadApI("rateContentList", para, function (result) {
        $("#rateContentList").html(result.htmlContent)
    });
}
//编辑评价内容
function EditAutoRateContent(obj, rateContentID) {
    $(obj).dialog({
        id: 'AutoRateContent',
        title: "评价内容编辑",
        iconTitle: false,
        cover: true,
        width: 500,
        height: 250,
        btnBar: false,
        maxBtn: false,
        resize: false,
        page: "AutoRateContentEdit.aspx?rateContentID=" + rateContentID + "&r=" + Math.random()
    });
}
//删除评价内容
function DeleteAutoRateContent(rateContentID) {
    if (DeleteComfrim()) {
        var para = "FuncName=DeleteAutoRateContent&rateContentID=" + rateContentID;
        LoadApI("rateContentList", para, function (result) {
            if (result == "0") {
                LoadAutoRateContent();
                alert("删除资料成功!");
            } else {
                alert("删除资料失败!");
            }
        });
    }
}
//保存评价设置
function SaveAutoRateSetting() {
    //LoadApI("contentMain", "FuncName=IsTmallUser", function (r) {
    //    if (r == "1") {
    var len = $(".table_text").find("tr:gt(0)").length;

    if (len == 0) {
        alert("请先设置评价内容!");
        return;
    }

    if (!EmailCheck()) {
        return;
    }

    SaveAll();
    //    } else {
    //        alert("自动评价只支持集市卖家!");
    //    }
    //});
}
function StatusTip() {
    var status = $.trim($("#rateStatus").text());
    if (status == "关 闭") {
        $("#spanState").css("display", "none");
        $("#imgStatus").attr("src", "/images/bvd_03.gif");
    } else {
        $("#spanState").css("display", "inline");
        $("#imgStatus").attr("src", "/images/bvd_06.gif");
    }
    $("#imgStatus").show();
}
/*-------------------------------- /AutoRate/AutoRateSetting.aspx 结束------------------------------*/

/*-------------------------------- /AutoRate/AutoRateTrade.aspx 开始------------------------------*/
//更新评价
function UpdateRateTrade() {
    var begin = $("#txtBegin", dg.dgDoc).val();
    var end = $("#txtEnd", dg.dgDoc).val();
    if (begin.length == 0) {
        alert("请选择开始日期!");
        return;
    }
    if (end.length == 0) {
        alert("请选择结束日期!");
        return;
    }
    dg.cancel();
    var para = "FuncName=UpdateRateTrade&begin=" + begin + "&end=" + end;
    LoadApI("divMain", para, function (result) {
        if (result.IsOK) {
            probar1.show();
            $("#p1").show();
            RateSyncProcess();
        } else {
            alert(result.Message);
        }
    });
}
/*-------------------------------- /AutoRate/AutoRateTrade.aspx 结束------------------------------*/


/*-------------------------------- /AutoRate/AutoRateBuyerBlack.aspx 开始------------------------------*/
//新增黑名单
function InsertAutoRateBuyerBlack(obj) {

    $(obj).dialog({
        id: 'AutoRateBuyerBlack',
        title: "新增黑名单",
        iconTitle: false,
        cover: true,
        width: 500,
        height: 320,
        btnBar: false,
        maxBtn: false,
        resize: false,
        page: "AutoRateBuyerBlackEdit.aspx?r=" + Math.random()
    });
}

//删除
function DeleteAutoRateBuyerBlock(buyerID) {
    if (DeleteComfrim()) {
        var para = "FuncName=DeleteAutoRateBuyerBlock&buyerId=" + buyerID;
        LoadApI("autoRateBuyerBlack", para, function (result) {
            if (result == "0") {
                alert("删除资料成功!");
                LoadAutoRateBuyerBlack(0);
            } else {
                alert("删除资料失败!");
            }
        });
    }
}
/*-------------------------------- /AutoRate/AutoRateBuyerBlack.aspx 结束------------------------------*/