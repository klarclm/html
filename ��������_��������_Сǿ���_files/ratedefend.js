/*-------------------------------- ratedefend公共开始------------------------------*/
window.onload = function () {
    //是否隐藏自动评价菜单
    var json = resultAjax("FuncName=ShowOrHideStatisMenu");
    if (json.IsOK) {
        if (!json.ResultContent) {
            $(".itemmenu_even_1,.itemmenu_even_2").each(function () {
                var obj = $(this);
                obj.find("a").each(function () {
                    var url = $(this).attr("href").toLocaleLowerCase();
                    if (url.indexOf("/ratedefend/ratedefendpicstatis.aspx") != -1) {
                        $(this).parents("li:eq(0)").hide();
                    }
                });
            });
        }
    }
}
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
function LoadApI(scurrowdiv, para, funcResult, textLoading) {
    if (textLoading == undefined || textLoading == "") {
        textLoading = "数据加载中...";
    }
    $('#' + scurrowdiv).mask(textLoading);
    $.ajax({
        url: "/TaobaoToolAPI/API4RateDefend.ashx?" + para + "&ran=" + Math.random(),
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

function resultAjax(para) {
    var url = "/TaobaoToolAPI/API4RateDefend.ashx?" + para + "&ran=" + Math.random();
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

//打开弹出窗
var dg;
function ShowDialog(id, title, width, height, url) {
    dg = new $.dialog({
        id: id,
        title: title,
        iconTitle: false,
        maxBtn: false,
        resize: false,
        cover: true,
        width: width,
        height: height,
        page: url,
        onXclick: CloseDialog,
        onCancel: CloseDialog
    });
    dg.ShowDialog();
}

//关闭弹出窗口
function CloseDialog() {
    dg.cancel();
}

function DeleteComfrim() {
    if (confirm("确定删除吗")) {
        return true;
    }
    return false;
}
$.fn.loadmainpage = function () {
    var obj = $(this);
    $(".table_text", obj).each(function () {
        var rowlen = $(this).find("tr").length;
        $(this).attr('_value', rowlen);
    });

    $(':text, :password , textarea', obj).each(function () {
        $(this).attr('_value', $(this).val());
    });
    $(':checkbox, :radio', obj).each(function () {
        var _v = this.checked ? 'on' : 'off';
        $(this).attr('_value', _v);
    });
    $('select', obj).each(function () {
        $(this).attr('_value', this.options[this.selectedIndex].value);
    });
    window.onbeforeunload = function () {
        if (is_form_changed(obj)) {
            return "页面数据还未保存！";
        }
    }
}

function is_form_changed(obj) {
    var changed = false;
    $(".table_text", obj).each(function () {
        var _v = $(this).attr('_value');
        if (typeof (_v) == 'undefined') _v = '';
        var rowlen = $(this).find("tr").length;
        if (parseInt(_v) != rowlen) changed = true;
    });
    $(':text, :password, textarea', obj).each(function () {
        var _v = $(this).attr('_value');
        if (typeof (_v) == 'undefined') _v = '';
        if (_v != $(this).val()) changed = true;
    });
    $(':checkbox, :radio', obj).each(function () {
        var _v = this.checked ? 'on' : 'off';
        if (_v != $(this).attr('_value')) changed = true;
    });
    $('select', obj).each(function () {
        var _v = $(this).attr('_value');
        if (typeof (_v) == 'undefined') _v = '';
        if (_v != this.options[this.selectedIndex].value) changed = true;
    });
    return changed;
}

$.fn.loadpage = function () {
    var obj = $(this);
    $(".table_text", obj).each(function () {
        var rowlen = $(this).find("tr").length;
        $(this).attr('_value', rowlen);
    });

    $(':text, :password , textarea', obj).each(function () {
        $(this).attr('_value', $(this).val());
    });
    $(':checkbox, :radio', obj).each(function () {
        var _v = this.checked ? 'on' : 'off';
        $(this).attr('_value', _v);
    });
    $('select', obj).each(function () {
        $(this).attr('_value', this.options[this.selectedIndex].value);
    });
    /* window.onbeforeunload = function () {
    if (is_form_changed(obj)) {
    return "页面数据还未保存！";
    }
    }*/
}

$.fn.unloadpage = function () {
    var obj = $(this);
    var changed = false;
    $(".table_text", obj).each(function () {
        var _v = $(this).attr('_value');
        if (typeof (_v) == 'undefined') _v = '';
        var rowlen = $(this).find("tr").length;
        if (parseInt(_v) != rowlen) changed = true;
    });
    $(':text, :password, textarea', obj).each(function () {
        var _v = $(this).attr('_value');
        if (typeof (_v) == 'undefined') _v = '';
        if (_v != $(this).val()) changed = true;
    });
    $(':checkbox, :radio', obj).each(function () {
        var _v = this.checked ? 'on' : 'off';
        if (_v != $(this).attr('_value')) changed = true;
    });
    $('select', obj).each(function () {
        var _v = $(this).attr('_value');
        if (typeof (_v) == 'undefined') _v = '';
        if (_v != this.options[this.selectedIndex].value) changed = true;
    });
    return changed;
}

function ismodify() {
    return $('body').unloadpage();
}
/*-------------------------------- ratedefend公共结束------------------------------*/

/*-------------------------------- /RateDefend/RateDefendSetting.aspx 开始------------------------------*/
function LoadBlackBuyerCount() {
    var para = "FuncName=LoadBlackBuyerCount";
    var result = resultAjax(para);
    $("#blackBuyerCount").text(result);
}

function LoadSetting() {
    var para = "FuncName=LoadSetting";
    LoadApI("mainContent", para, function (result) {
        if (result == "-1") {
            alert("配置获取失败!");
        } else {
            JsonReader(result, "mainContent", "hfJsonAttr");

            var status = result.ServiceStatus.toString();
            $("#rateStatus").attr("serviceStatus", status);
            $("#imgStatus").css("display", "block");
            if (status == "0") {
                $("#imgStatus").attr("src", "/images/bvd_06.gif");
                $("#rateStatus").text("开启防御");
                $("#StatusTip").css("color", "red").text("(差评师防御关闭中，无法防御)");
            } else {
                $("#imgStatus").attr("src", "/images/bvd_03.gif");
                $("#rateStatus").text("关闭防御");
                $("#StatusTip").css("color", "#666").text("(差评师防御总开关)");
            }

            var isenabled = result.IsEnabled.toString();
            $("#Div1").attr("serviceStatus", isenabled);
            $("#img1").css("display", "block");
            if (isenabled == "0") {
                $("#img1").attr("src", "/images/bvd_06.gif");
                $("#Div1").text("开启云防火墙");
            } else {
                $("#img1").attr("src", "/images/bvd_03.gif");
                $("#Div1").text("关闭云防火墙");
            }
        }
    });
}
//邮箱验证
function EmailsCheck() {
    var v = $.trim($(":text[name='Emails']").val());

    var flag = true;
    if (v.length > 0) {
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (v.indexOf(';') != -1 || v.indexOf("；") != -1) {
            var s = v.replace(/\；/g, ';').split(";");
            for (var i = 0; i < s.length; i++) {
                if (!myreg.test(s[i])) {
                    flag = false;
                    break;
                }
            }
        } else {
            if (!myreg.test(v)) {
                flag = false;
            }
        }
    }
    if (!flag) {
        alert('提示请输入有效的E_mail！');
    }

    return flag;
}
//云防火墙
function SaveOrCloseYun() {
    var status = $("#Div1").attr("serviceStatus");

    if (status == "0") {
        $("#Div1").attr("serviceStatus", "1");
        $("#Div1").text("关闭云防火墙");
        $("#img1").attr("src", "/images/bvd_03.gif");
    } else {
        $("#Div1").attr("serviceStatus", "0");
        $("#Div1").text("开启云防火墙");
        $("#img1").attr("src", "/images/bvd_06.gif");
    }
}

//保存配置
function SaveSetting() {
    JsonDefault();

    var jsonString = JsonWriter("hfJsonAttr");
    var status = $("#rateStatus").attr("serviceStatus");
    var isenabled = $("#Div1").attr("serviceStatus");
    jsonString = "{" + jsonString + "," + JsonFormat("ServiceStatus", status) + "," + JsonFormat("IsEnabled", isenabled) + "}";

    var para = "FuncName=SaveSetting&jsonString=" + escape(jsonString);
    LoadApI("mainContent", para, function (result) {
        if (result == "0") {
            alert("保存成功!");
        } else {
            alert("保存失败!");
        }
    });
}
//取消配置
function CancelSetting() {
    document.location.reload();
}
/*-------------------------------- /RateDefend/RateDefendSetting.aspx 开始------------------------------*/

/*-------------------------------- /RateDefend/RateDefendAutoBlack.aspx 开始------------------------------*/
//列表
function LoadRateDefendAutoBlackList(pageIndex) {
    var strKey = $.trim($("#txtStrKey").val());
    var pageSize = 15;
    var para = "FuncName=LoadRateDefendAutoBlackList&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&strKey=" + escape(strKey);
    LoadApI("mainContent", para, function (result) {
        totalCount = result.totalCount;
        htmlContent = result.htmlContent;
        $('#dataList').html(htmlContent);
        $("#divPager").pagination(totalCount, {
            current_page: pageIndex,
            callback: pageselectCallback2,
            items_per_page: pageSize
        });
    });
}
function pageselectCallback2(pageIndex) {
    LoadRateDefendAutoBlackList(pageIndex);
    return false;
}
//弹出框
function RateDefendAutoBlackDialog(id) {
    if (id == 0) {
        var para = "FuncName=AutoBlackCountReg";
        var rs = resultAjax(para);
        if (rs == "1") {
            alert("目前智能黑名单已经上限，请续费差评师防御高级版！");
            return;
        }
    }

    var title = "新增智能黑名单";
    if (id != 0) {
        title = "编辑智能黑名单";
    }

    //弹出框
    var url = "/RateDefend/RateDefendAutoBlackDialog.aspx?RateDefendAutoBlackId=" + id + "&rr=" + Math.random();
    ShowDialog("autoBlack", title, 750, 430, url);
    dg.addBtn("btnOk", "保存", SaveAutoBlack)
    dg.SetCancelBtn("关闭", dg.cancel);
}
//保存
function SaveAutoBlack() {
    var jsonString = dg.dgWin.ReaderAutoBlackJson();
    if (jsonString.length > 0) {
        var para = "FuncName=SaveAutoBlack&jsonString=" + escape(jsonString);
        LoadApI("mainContent", para, function (result) {
            if (result == "0") {
                alert("保存成功!");
                CloseDialog();
                LoadRateDefendAutoBlackList(0);
            } else {
                alert("保存失败!");
            }
        });
    }
}
//删除
function DelRateDefendAutoBlack(id) {
    if (confirm("确定删除吗?")) {
        var para = "FuncName=DelRateDefendAutoBlack&RateDefendAutoBlackId=" + id;
        LoadApI("mainContent", para, function (result) {
            if (result == "0") {
                alert("删除成功!");
                LoadRateDefendAutoBlackList(0);
            } else {
                alert("删除失败!");
            }
        });
    }
}
/*-------------------------------- /RateDefend/RateDefendAutoBlack.aspx 结束------------------------------*/

/*-------------------------------- /RateDefend/RateDefendAutoBlackDialog.aspx 开始------------------------------*/
function LoadAutoBlackData() {
    var id = request("RateDefendAutoBlackId");
    if (id != 0)//编辑
    {
        var para = "FuncName=LoadAutoBlackData&RateDefendAutoBlackId=" + id;
        LoadApI("mainContent", para, function (json) {
            JsonReader(json, "mainContent", "hfJsonAttr");

            AutoBlackTip(json.BuyerProvince, json.IsProvinceLike, 0);
            AutoBlackTip(json.BuyerCity, json.IsCityLike, 1);
            AutoBlackTip(json.BuyerArea, json.IsAreaLike, 2);
            AutoBlackTip(json.BuyerAddress, json.IsLike, 3);

        });
    }
}

function AutoBlackChange(stype) {
    var val, isdefend;
    switch (stype) {
        case 0:
            val = $.trim($(":text[name='BuyerProvince']").val());
            isdefend = $("#IsProvinceLike").attr("checked") ? 1 : 0;
            break;
        case 1:
            val = $.trim($(":text[name='BuyerCity']").val());
            isdefend = $("#IsCityLike").attr("checked") ? 1 : 0;
            break;
        case 2:
            val = $.trim($(":text[name='BuyerArea']").val());
            isdefend = $("#IsAreaLike").attr("checked") ? 1 : 0;
            break;
        default:
            val = $.trim($(":text[name='BuyerAddress']").val());
            isdefend = $("#IsLike").attr("checked") ? 1 : 0;
            break;
    }
    AutoBlackTip(val, isdefend, stype);
}

function AutoBlackTip(val, isdefend, stype) {
    var obj, str;

    switch (stype) {
        case 0://省
            obj = $("#tip1");
            str = "省份";
            break;
        case 1://市
            obj = $("#tip2");
            str = "城市";
            break;
        case 2://区
            obj = $("#tip3");
            str = "地区";
            break;
        default://详细地址
            obj = $("#tip4");
            str = "详细地址";
            break;
    }
    if ($.trim(val) == "") {
        $(obj).html("提示：当前未填" + str + "关键词，不对收货的" + str + "进行防御！");
    } else {
        if (isdefend == 0) {
            $(obj).html("提示：收货" + str + "和“<span style='color:red;font-weight:bold;'>" + val + "</span>”关键词相同时，则防御！");
        } else {
            $(obj).html("提示：收货" + str + "中包含“<span style='color:red;font-weight:bold;'>" + val + "</span>”关键词时，则防御！");
        }
    }

}

function ReaderAutoBlackJson() {
    var closeReson = $.trim($(":text[name='CloseReson']").val());
    if (closeReson.length == 0) {
        alert("请输入关闭解释!");
        $(":text[name='CloseReson']").focus();
        return "";
    }
    JsonDefault();

    var jsonString = JsonWriter("hfJsonAttr");
    jsonString = "{" + jsonString + "}";
    return jsonString;
}
/*-------------------------------- /RateDefend/RateDefendAutoBlackDialog.aspx 结束------------------------------*/

/*-------------------------------- /RateDefend/RateDefendBuyerBlack.aspx 开始------------------------------*/
//列表
function LoadRateDefendBuyerBlackList(pageIndex) {
    var buyerName = $.trim($("#txtBuyerName").val());
    var pageSize = 15;
    var para = "FuncName=LoadRateDefendBuyerBlackList&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&buyerName=" + escape(buyerName);
    LoadApI("mainContent", para, function (result) {
        totalCount = result.totalCount;
        htmlContent = result.htmlContent;
        $('#dataList').html(htmlContent);
        $("#divPager").pagination(totalCount, {
            current_page: pageIndex,
            callback: pageselectCallback3,
            items_per_page: pageSize
        });
    });
}
function pageselectCallback3(pageIndex) {
    LoadRateDefendBuyerBlackList(pageIndex);
    return false;
}
//弹出框
function RateDefendBuyerBlackDialog(id) {
    if (id == 0) {
        //todo:新增前验证是否超过个数
        var para = "FuncName=BuyerBlackCountReg";
        var rs = resultAjax(para);
        if (rs == "1") {
            alert("目前买家黑名单已经上限，请续费差评师防御高级版！");
            return;
        }
    }

    var title = "新增黑名单";
    if (id != 0) {
        title = "编辑黑名单";
    }

    //弹出框
    var url = "/RateDefend/RateDefendBuyerBlackDialog.aspx?RateDefendBuyerBlackId=" + id + "&rr=" + Math.random();
    ShowDialog("buyerblack", title, 400, 185, url);
    dg.addBtn("btnOk", "保存", SaveBuyerBlack)
    dg.SetCancelBtn("关闭", dg.cancel);
}
//保存
function SaveBuyerBlack() {
    var jsonString = dg.dgWin.ReaderBuyerBlackJson();
    if (jsonString.length > 0) {
        var para = "FuncName=SaveBuyerBlack&jsonString=" + escape(jsonString);
        LoadApI("mainContent", para, function (result) {
            if (result.IsOK) {
                alert("保存成功!");
                CloseDialog();
                LoadRateDefendBuyerBlackList(0);
            } else {
                alert(result.Message);
            }
        });
    }
}
//删除
function DelRateDefendBuyerBlack(id) {
    if (confirm("确定删除吗?")) {
        var para = "FuncName=DelRateDefendBuyerBlack&RateDefendBuyerBlackId=" + id;
        LoadApI("mainContent", para, function (result) {
            if (result == "0") {
                alert("删除成功!");
                LoadRateDefendBuyerBlackList(0);
            } else {
                alert("删除失败!");
            }
        });
    }
}

function FastBlackDialog() {
    //弹出框
    var url = "/RateDefend/RateDefendFastBlackDialog.aspx?&rr=" + Math.random();
    ShowDialog("fastbuyerblack", "一键黑名单", 755, 450, url);
}
/*-------------------------------- /RateDefend/RateDefendBuyerBlack.aspx 结束------------------------------*/

/*-------------------------------- /RateDefend/RateDefendBuyerBlackDialog.aspx 开始------------------------------*/
function LoadBuyerBlackData() {
    var id = request("RateDefendBuyerBlackId");
    if (id != 0)//编辑
    {
        var para = "FuncName=LoadBuyerBlackData&RateDefendBuyerBlackId=" + id;
        LoadApI("mainContent", para, function (json) {
            JsonReader(json, "mainContent", "hfJsonAttr");
        });
    }
}

function ReaderBuyerBlackJson() {
    var buyerName = $.trim($(":text[name='BuyerName']").val());
    if (buyerName.length == 0) {
        alert("请输入买家名称!");
        $(":text[name='BuyerName']").focus();
        return "";
    }
    var closeReson = $.trim($(":text[name='CloseReson']").val());
    if (closeReson.length == 0) {
        alert("请输入关闭解释!");
        $(":text[name='CloseReson']").focus();
        return "";
    }

    JsonDefault();
    var jsonString = JsonWriter("hfJsonAttr");
    jsonString = "{" + jsonString + "}";
    return jsonString;
}
/*-------------------------------- /RateDefend/RateDefendBuyerBlackDialog.aspx 结束------------------------------*/

/*-------------------------------- /RateDefend/RateDefendBuyerWhite.aspx 开始------------------------------*/
//列表
function LoadRateDefendBuyerWhiteList(pageIndex) {
    var buyerName = $.trim($("#txtBuyerName").val());
    var pageSize = 15;
    var para = "FuncName=LoadRateDefendBuyerWhiteList&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&buyerName=" + escape(buyerName);
    LoadApI("mainContent", para, function (result) {
        totalCount = result.totalCount;
        htmlContent = result.htmlContent;
        $('#dataList').html(htmlContent);
        $("#divPager").pagination(totalCount, {
            current_page: pageIndex,
            callback: pageselectCallback4,
            items_per_page: pageSize
        });
    });
}
function pageselectCallback4(pageIndex) {
    LoadRateDefendBuyerWhiteList(pageIndex);
    return false;
}
//弹出框
function RateDefendBuyerWhiteDialog(id) {
    if (id == 0) {
        //todo:新增前验证是否超过个数
        var para = "FuncName=BuyerWhiteCountReg";
        var rs = resultAjax(para);
        if (rs == "1") {
            alert("目前买家白名单已经上限，请续费差评师防御高级版！");
            return;
        }
    }

    var title = "新增白名单";
    if (id != 0) {
        title = "编辑白名单";
    }

    //弹出框
    var url = "/RateDefend/RateDefendBuyerWhiteDialog.aspx?RateDefendBuyerWhiteId=" + id + "&rr=" + Math.random();
    ShowDialog("buyerWhite", title, 400, 185, url);
    dg.addBtn("btnOk", "保存", SaveBuyerWhite)
    dg.SetCancelBtn("关闭", dg.cancel);
}
//保存
function SaveBuyerWhite() {
    var jsonString = dg.dgWin.ReaderBuyerWhiteJson();


    if (jsonString.length > 0) {
        var para = "FuncName=SaveBuyerWhite&jsonString=" + escape(jsonString);
        LoadApI("mainContent", para, function (result) {
            alert(result.Message);
            if (result.IsOK) {
                CloseDialog();
                LoadRateDefendBuyerWhiteList(0);
            }
        });
    }
}
//删除
function DelRateDefendBuyerWhite(id) {
    if (confirm("确定删除吗?")) {
        var para = "FuncName=DelRateDefendBuyerWhite&RateDefendBuyerWhiteId=" + id;
        LoadApI("mainContent", para, function (result) {
            if (result == "0") {
                alert("删除成功!");
                LoadRateDefendBuyerWhiteList(0);
            } else {
                alert("删除失败!");
            }
        });
    }
}
/*-------------------------------- /RateDefend/RateDefendBuyerWhite.aspx 结束------------------------------*/

/*-------------------------------- /RateDefend/RateDefendBuyerWhiteDialog.aspx 开始------------------------------*/
function LoadBuyerWhiteData() {
    var id = request("RateDefendBuyerWhiteId");
    if (id != 0)//编辑
    {
        var para = "FuncName=LoadBuyerWhiteData&RateDefendBuyerWhiteId=" + id;
        LoadApI("mainContent", para, function (json) {
            JsonReader(json, "mainContent", "hfJsonAttr");
        });
    }
}

function ReaderBuyerWhiteJson() {
    var buyerName = $.trim($(":text[name='BuyerName']").val());
    if (buyerName.length == 0) {
        alert("请输入买家名称!");
        $(":text[name='BuyerName']").focus();
        return "";
    }

    JsonDefault();
    var jsonString = JsonWriter("hfJsonAttr");
    jsonString = "{" + jsonString + "}";
    return jsonString;
}
/*-------------------------------- /RateDefend/RateDefendBuyerWhiteDialog.aspx 结束------------------------------*/

/*-------------------------------- /RateDefend/RateDefendFastBlack.aspx 开始------------------------------*/
function RateDefendFastBlackList(pageIndex) {
    var buyerName = $.trim($("#txtBuyerName").val());
    var badCount = $.trim($("#txtBadCount").val());
    var neutralCount = $.trim($("#txtNeutralCount").val());
    var goodCount = $.trim($("#txtGoodCount").val());
    var blackBuyer = $.trim($("#ddlBlackBuyer").val());

    var pageSize = 10;
    var para = "FuncName=RateDefendFastBlackList&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&buyerName=" + escape(buyerName) + "&badCount=" + badCount + "&neutralCount=" + neutralCount + "&goodCount=" + goodCount + "&blackBuyer=" + blackBuyer;
    LoadApI("mainContent", para, function (result) {
        totalCount = result.totalCount;
        htmlContent = result.htmlContent;
        $('#dataList').html(htmlContent);
        $("#divPager").pagination(totalCount, {
            current_page: pageIndex,
            callback: pageselectCallback22,
            items_per_page: pageSize
        });
    });
}
function pageselectCallback22(pageIndex) {
    RateDefendFastBlackList(pageIndex);
    return false;
}
function SyncFastBlack() {
    var para = "FuncName=SyncFastBlack";
    LoadApI("mainContent", para, function (result) {
        if (result != "-1") {
            alert("同步数据成功!");
            RateDefendFastBlackList(0);
        } else {
            alert("同步数据失败!");
        }
    });
}
//批量导入
function MoreImport() {
    var len = $(":checkbox[id*='chkItem']").length;
    if (len == 0) {
        alert("暂无数据...");
        return;
    }
    var ck = $(":checkbox[id*='chkItem'][checked]");
    if (ck.length == 0) {
        alert("请选择要导入黑名单的买家!");
        return;
    }
    var theData = "";
    for (var i = 0; i < ck.length; i++) {
        var item = ck.eq(i).attr("buyerName");
        theData += "'" + item + "',";
    }
    theData = theData.substring(0, theData.length - 1);
    var para = "FuncName=MoreImport&theData=" + escape(theData);
    LoadApI("mainContent", para, function (result) {
        if (result == "-1") {
            alert("操作失败!");
        } else {
            alert("操作成功!");
            RateDefendFastBlackList(0);
        }
    });
}
//快速导入
function FastImport() {
    var rateCount = $.trim($("#txtRateCount").val());
    var level = $.trim($("#ddlLevel").val());
    if (rateCount.length == 0) {
        alert("请填写评价次数!");
        return;
    }

    var para = "FuncName=FastImport&rateCount=" + rateCount + "&level=" + level;
    LoadApI("mainContent", para, function (result) {
        if (result == "-1") {
            alert("操作失败!");
        } else {
            alert("操作成功!");
            RateDefendFastBlackList(0);
        }
    });
}
function InsertToBlack(buyerName) {
    var theData = "'" + buyerName + "'";
    var para = "FuncName=MoreImport&theData=" + escape(theData);
    LoadApI("mainContent", para, function (result) {
        if (result == "-1") {
            alert("加入黑名单失败!");
        } else {
            alert("加入黑名单成功!");
            RateDefendFastBlackList(0);
        }
    });
}
function CancleToBlack(buyerName) {
    var para = "FuncName=CancleToBlack&buyerName=" + escape(buyerName);
    LoadApI("mainContent", para, function (result) {
        if (result == "-1") {
            alert("取消黑名单失败!");
        } else {
            alert("取消黑名单成功!");
            RateDefendFastBlackList(0);
        }
    });
}
/*-------------------------------- /RateDefend/RateDefendFastBlack.aspx 结束------------------------------*/

/*-------------------------------- /RateDefend/RateDefendItem.aspx 结束------------------------------*/
function LoadItemData(pageIndex) {
    var itemTitle = $.trim($("#txtItemTitle").val());
    var pageSize = 15;
    var para = "FuncName=LoadItemData&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&itemTitle=" + escape(itemTitle);
    LoadApI("mainContent", para, function (result) {
        totalCount = result.totalCount;
        htmlContent = result.htmlContent;
        $('#dataList').html(htmlContent);
        $("#divPager").pagination(totalCount, {
            current_page: pageIndex,
            callback: pageselectCallback333,
            items_per_page: pageSize
        });
    });
}

function pageselectCallback333(pageIndex) {
    LoadItemData(pageIndex);
    return false;
}

//选择宝贝
function UserItemDialog() {
    var url = "/RateDefend/RateDefendItemDialog.aspx?rr=" + Math.random();
    ShowDialog("useritemlist", "宝贝选择", 700, 490, url);
}

function SelectUserItem2(numiid, itemtitle, itemId) {
    CloseDialog();
    var title = itemId == 0 ? "新增宝贝防拍" : "编辑宝贝防拍";
    var url = "/RateDefend/RateDefendItemDialog2.aspx?itemId=" + itemId + "&itemTitle=" + itemtitle + "&numiid=" + numiid + "&rr=" + Math.random();
    ShowDialog("useritemlist2", title, 500, 280, url);
    dg.addBtn("btnOk", "保存", SaveRateDefendItem2)
}
function SaveRateDefendItem2() {
    dg.dgWin.SaveRateDefendItem();
}
//保存
function SaveRateDefendItem() {
    JsonDefault();

    var MaxCount = parseFloat($.trim($(":text[name='MaxCount']").val()));
    var MinCount = parseFloat($.trim($(":text[name='MinCount']").val()));
    var MaxAccount = parseFloat($.trim($(":text[name='MaxAccount']").val()));
    var MinAccount = parseFloat($.trim($(":text[name='MinAccount']").val()));

    if (MaxCount < MinCount) {
        alert("数量上限不能小于数量下限!")
        return;
    }

    if (MaxAccount < MinAccount) {
        alert("金额上限不能小于金额下限!")
        return;
    }

    var closeReson = $.trim($(":text[name='CloseReson']").val());
    if (closeReson.length == 0) {
        alert("请输入关闭解释!");
        return;
    }

    var jsonString = JsonWriter("hfJsonAttr");
    jsonString = "{" + jsonString + "}";

    var para = "FuncName=SaveRateDefendItem&jsonString=" + escape(jsonString);
    LoadApI("mainContent", para, function (result) {
        if (result == "0") {
            alert("保存成功!");
            parent.LoadItemData(0);
            parent.CloseDialog();
        } else {
            alert("保存失败!");
        }
    });
}

//清空
function ClearContent() {
    $("#editPart").find("input").val("");
    $("#lblItemTitle").text("");
}

//读取
function ReadRateDefendItem(id) {
    ClearContent();
    var para = "FuncName=ReadRateDefendItem&RateDefendItemId=" + id;
    LoadApI("mainContent", para, function (json) {
        JsonReader(json, "mainContent", "hfJsonAttr");
        $("#lblItemTitle").text(json.ItemTitle);
    });
}

//删除
function DelRateDefendItem(id) {
    if (confirm("确定删除吗?")) {
        var para = "FuncName=DelRateDefendItem&RateDefendItemId=" + id;
        LoadApI("mainContent", para, function (result) {
            if (result == "0") {
                alert("删除成功!");
                ClearContent();
                LoadItemData(0);
            } else {
                alert("删除失败!");
            }
        });
    }
}

//启动|关闭
function OpenOrCloseStatus(id, status) {

    if (status == 0) {
        //todo:开启前验证是否超过开启个数
        var para = "FuncName=ItemCountReg";
        var rs = resultAjax(para);
        if (rs == "1") {
            alert("当前启用的宝贝个数已经上限，请续费差评师防御高级版！");
            return;
        }
    }

    if (status == 0) {
        status = 1;
    } else {
        status = 0;
    }

    var para = "FuncName=OpenOrCloseStatus&RateDefendItemId=" + id + "&status=" + status;
    LoadApI("mainContent", para, function (result) {
        if (result == "0") {
            ClearContent();
            LoadItemData(0);
        } else {
            alert("操作失败!");
        }
    });
}
/*-------------------------------- /RateDefend/RateDefendItem.aspx 结束------------------------------*/

/*-------------------------------- /RateDefend/RateDefendItemDialog.aspx 结束------------------------------*/
//加载列表
function LoadUserItemList(pageIndex) {
    var itemTitle = $.trim($("#txtItemTitle").val());
    var pageSize = 5;
    var para = "FuncName=LoadUserItemList&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&itemTitle=" + escape(itemTitle);
    LoadApI("mainContent", para, function (result) {
        totalCount = result.totalCount;
        htmlContent = result.htmlContent;
        $('#dataList').html(htmlContent);
        $("#divPager").pagination(totalCount, {
            current_page: pageIndex,
            callback: pageselectCallback777,
            items_per_page: pageSize
        });
    });
}
function pageselectCallback777(pageIndex) {
    LoadUserItemList(pageIndex);
    return false;
}

function SelectUserItem(numiid, itemtitle) {
    var itemId = request("id");
    parent.SelectUserItem2(numiid, itemtitle, itemId);
}

/*-------------------------------- /RateDefend/RateDefendItemDialog.aspx 结束------------------------------*/


/*-------------------------------- /RateDefend/RateDefendItemWhiteDialog.aspx 结束------------------------------*/
//加载列表
function LoadUserWhiteItemList(pageIndex) {
    var itemTitle = $.trim($("#txtItemTitle").val());
    var pageSize = 15;
    var para = "FuncName=LoadUserWhiteItemList&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&itemTitle=" + escape(itemTitle);
    LoadApI("mainContent", para, function (result) {
        totalCount = result.totalCount;
        htmlContent = result.htmlContent;
        $('#dataList').html(htmlContent);
        $("#divPager").pagination(totalCount, {
            current_page: pageIndex,
            callback: pageselectCallback123777,
            items_per_page: pageSize
        });
    });
}
function pageselectCallback123777(pageIndex) {
    LoadUserWhiteItemList(pageIndex);
    return false;
}

function SaveRateDefendItemWhite(obj) {
    var numiid = $(obj).attr("numiid");
    var itemtitle = $(obj).attr("itemtitle");
    var hascount = parseInt($(obj).attr("hascount"));
    var para = "FuncName=SaveRateDefendItemWhite&numiid=" + numiid + "&hascount=" + hascount + "&itemtitle=" + encodeURIComponent(itemtitle);
    LoadApI("mainContent", para, function (result) {
        if (result.IsOK) {
            if (hascount == 0) {
                $(obj).attr("hascount", 1);
                $(obj).text("取消白名单");
                $(obj).parents("tr:eq(0)").find("td").eq(2).html("<span style='color:green;'>已设置</span>");
            } else {
                $(obj).attr("hascount", 0);
                $(obj).text("设置白名单");
                $(obj).parents("tr:eq(0)").find("td").eq(2).html("未设置");
            }
        } else {
            alert(result.Message);
        }
    });
}


/*-------------------------------- /RateDefend/RateDefendItemWhiteDialog.aspx 结束------------------------------*/
