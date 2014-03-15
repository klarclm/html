//jquery拓展
$.fn.extend({
    //整数
    MatchInt: function () {
        $(this).live("keyup", function (event) {
            var reg = /[^\-?\d+$]/g;
            TextBoxHandle($(this), event, reg);
        }).live("blur", function () {
            var txt = parseInt($(this).val()).toString();
            if (txt == "NaN") {
                $(this).val("");
            } else {
                $(this).val(txt);
            }
        });
    },
    //正整数
    MatchPInt: function () {
        $(this).live("keyup", function (event) {
            var reg = /[^\d+$]/g;
            TextBoxHandle($(this), event, reg);
        });
    },
    //负整数
    MatchNInt: function () {
        $(this).live("keyup", function (event) {
            var reg = /[^\-?\d+$]/g;
            TextBoxHandle($(this), event, reg);
        }).live("blur", function () {
            var txt = parseInt($(this).val()).toString();
            if (txt == "NaN") {
                $(this).val("");
            } else {
                if (txt.length != 0 && txt.indexOf("-") == -1) {
                    txt = "-" + txt;
                }
                $(this).val(txt);
            }
        });
    },
    //浮点数
    MatchFloat: function () {
        $(this).live("keyup", function (event) {
            var reg = /[^\-\d.]/g;
            TextBoxHandle($(this), event, reg);
        }).live("blur", function () {
            var txt = parseFloat($(this).val()).toString();
            if (txt == "NaN") {
                $(this).val("");
            } else {
                $(this).val(txt);
            }
        });
    },
    //正浮点数
    MatchPFloat: function () {
        $(this).live("keyup",function (event) {
            var reg = /[^\d.]/g;
            TextBoxHandle($(this), event, reg);
        }).live("blur",function () {
            var txt = parseFloat($(this).val()).toString();
            if (txt == "NaN") {
                $(this).val("");
            } else {
                $(this).val(txt);
            }
        });
    },
    //负浮点数
    MatchNFloat: function () {
        $(this).live("keyup", function (event) {
            var reg = /[^\d.]/g;
            TextBoxHandle($(this), event, reg);
        }).live("blur", function () {
            var txt = parseFloat($(this).val()).toString();
            if (txt == "NaN") {
                $(this).val("");
            } else {
                //$(this).val(txt);
                if (txt.length != 0 && txt.indexOf("-") == -1) {
                    txt = "-" + txt;
                }
                $(this).val(txt);
            }
        });
    },
    //匹配中文
    MatchChinese: function () {
        $(this).live("keyup", function (event) {
            var reg = /[^\u4E00-\u9FA5]/g;
            TextBoxHandle($(this), event, reg);
        });
    },
    //匹配英文
    MatchEnglish: function () {
        $(this).live("keyup", function (event) {
            var reg = /[^a-zA-Z]/g;
            TextBoxHandle($(this), event, reg);
        });
    },
    //匹配字母和数字
    MatchEnInt: function () {
        $(this).live("keyup", function (event) {
            var reg = /[^a-zA-Z0-9]/g;
            TextBoxHandle($(this), event, reg);
        });
    }
});
function TextBoxHandle(obj, e, reg) {
    var key = e.keyCode;
    if (!(key == 8 || key == 35 || key == 36 || key == 37 || key == 39 || key == 46)) {
        var txt = $(obj).val();
        txt = txt.replace(reg, '');
        $(obj).val(txt);
    }
}
//-------------------------------------------
//读取json字符串
function JsonReader(json, part, setting) {
    var jsonAttr = "";
    for (var attr in json) {
        if (typeof (json[attr]) == 'function') {
            continue;
        }
        var el = document.getElementsByName(attr);
        if (el.length != 0) {
            jsonAttr += attr + ",";
            var _jv = unescape(json[attr].toString());

            var tagName = $(el).attr("tagName");
            if (tagName == "INPUT") {
                var stype = $(el).attr("type");
                if (stype == "radio") {
                    $(el).each(function () {
                        var _v = $(this).val();
                        if (_v == _jv) {
                            $(this).attr("checked", "checked");
                        }
                    });
                } else if (stype == "checkbox") {
                    if ($(el).length == 1) {//只有一个的情况下按值选中
                        if (_jv == 1) {
                            $(el).attr("checked", "checked");
                        }
                    } else {
                        var _vs = _jv.split(",");
                        for (var i = 0; i < _vs.length; i++) {
                            $(el).each(function () {
                                var _v = $(this).val();
                                if (_v == _vs[i]) {
                                    $(this).attr("checked", "checked");
                                }
                            });
                        }
                    }
                } else {
                    $(el).val(_jv);
                }
            } else if (tagName == "SELECT") {
                $(el).val(_jv);
            }
        }
    }
    if (jsonAttr.length > 0) {
        jsonAttr = jsonAttr.substring(0, jsonAttr.length - 1);
        $("#" + setting).val(jsonAttr);
    }
}
//拼接json字符串
function JsonWriter(setting) {
    var jsonString = "";

    var jsonAttr = $("#" + setting).val();
    //alert(jsonAttr)
    var attrs = jsonAttr.split(',');
    for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];
        //alert(attr)
        var el = document.getElementsByName(attr);
        if (el.length != 0) {
            var tagName = $(el).attr("tagName");
            if (tagName == "INPUT") {
                var stype = $(el).attr("type");
                if (stype == "radio") {
                    $(el).each(function () {
                        if ($(this).attr("checked")) {
                            jsonString += JsonFormat(attr, $(this).val()) + ",";
                        }
                    });
                } else if (stype == "checkbox") {
                    if ($(el).length == 1) {
                        if ($(el).attr("checked")) {
                            jsonString += JsonFormat(attr, 1) + ",";
                        } else {
                            jsonString += JsonFormat(attr, 0) + ",";
                        }
                    } else {
                        var _v = "";
                        for (var j = 0; j < $(el).length; j++) {
                            var o = $(el).eq(j);
                            if ($(o).attr("checked")) {
                                _v += $(o).val() + ",";
                            }
                        }
                        _v = _v.length > 0 ? _v.substring(0, _v.length - 1) : _v;
                        jsonString += JsonFormat(attr, _v) + ",";
                    }
                } else {
                    jsonString += JsonFormat(attr, $(el).val()) + ",";
                }
            } else if (tagName == "SELECT") {
                jsonString += JsonFormat(attr, $(el).val()) + ",";
            }
        }
    }
    jsonString = jsonString.length > 0 ? jsonString.substring(0, jsonString.length - 1) : jsonString;
    return jsonString;
}
//json格式
function JsonFormat(n, v) {
    return "\"" + n + "\":\"" + v + "\"";
}
//json数据默认值
function JsonDefault() {
    $(".txtInt,.txtFloat").each(function () {
        var v = $.trim($(this).val());
        if (v.length == 0) {
            $(this).val(0);
        }
    });
    $(".txtDate").each(function () {
        var v = $.trim($(this).val());
        if (v.length == 0) {
            $(this).val(JsonCurDate());
        }
    });
}
//当前时间
function JsonCurDate() {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    if (m.toString().length == 1) {
        m = "0" + m;
    }
    var _d = d.getDate();
    if (_d.toString().length == 1) {
        _d = "0" + _d;
    }
    var h = d.getHours();
    if (h.toString().length == 1) {
        h = "0" + h;
    }
    var _m = d.getMinutes();
    if (_m.toString().length == 1) {
        _m = "0" + _m;
    }
    var s = d.getSeconds();
    if (s.toString().length == 1) {
        s = "0" + s;
    }

    return y + '-' + m + '-' + _d + ' ' + h + ':' + _m + ':' + s;
}
//----------------------------------------------------------


function go51la() {
    this.location = "http://www.51.la/?4367738";
}

//按比例自动缩放图片
function DrawImage(ImgD, maxWidth, maxHeight) {
    var image = new Image();
    image.src = ImgD.src;
    if (image.width > 0 && image.height > 0) {
        if (image.width / image.height >= maxWidth / maxHeight) {
            if (image.width > maxWidth) {
                ImgD.width = maxWidth;
                ImgD.height = (image.height * maxHeight) / image.width;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        }
        else {
            if (image.height > maxHeight) {
                ImgD.height = maxHeight;
                ImgD.width = (image.width * maxHeight) / image.height;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        }
    }
}

//打开对话框
function opdlg(id, url, title, isMax) {
    var dlg = new $.dialog({ id: id, iconTitle: false, title: title, cover: true, fixed: true, opacity: 0.1, width: 550, height: 450, autoPos: { left: 'center', top: 'center' }, page: url });
    dlg.ShowDialog();
    if (isMax) {
        dlg.maxSize();
    }
    return false;
}


//打开对话框
function opdlg(id, url, title, isMax, width, height, haveMaxBtn) {
    var dlg = new $.dialog({ id: id, iconTitle: false, title: title, cover: true, fixed: true, opacity: 0.1, width: width, height: height, autoPos: { left: 'center', top: 'center' }, page: url, maxBtn: haveMaxBtn });
    dlg.ShowDialog();
    if (isMax) {
        dlg.maxSize();
    }
    return false;
}


function opdlg(id, url, title, isMax, width, height, haveMaxBtn, opac, fd) {
    if (fd != false) {
        fd = true;
    }
    var dlg = new $.dialog({ id: id, iconTitle: false, title: title, fixed: fd, cover: true, opacity: opac, width: width, height: height, autoPos: { left: 'center', top: 'center' }, page: url, maxBtn: haveMaxBtn });
    dlg.ShowDialog();
    if (isMax) {
        dlg.maxSize();
    }
    return false;
}
/******************************** 加载内部活动弹窗-开始 *******************************************/
function LoadActiveDetail(code) {
    var url = "/InternalActive/InternalActiveDialog.aspx?code=" + code + "&rr=" + Math.random();
    ShowDialog1313(code + parseInt(Math.random() * 1000), 800, 270, url);
}
var dg121212;
function ShowDialog1313(id, width, height, url) {
    dg121212 = new $.dialog({
        id: id,
        title: "订购",
        iconTitle: false,
        maxBtn: false,
        resize: false,
        cover: true,
        width: width,
        height: height,
        page: url
    });
    dg121212.ShowDialog();
}
/******************************** 加载内部活动弹窗-结束 *******************************************/

function _in(obj) {
    obj.style.backgroundColor = '#21AAE8';
}
function _out(obj) {
    obj.style.backgroundColor = 'White';
}
