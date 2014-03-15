/*
License: New BSD License
Date: 2009/3/4
Author: Kim Wang
Email: wxnet2008@gmail.com
version: 1.1.1
*/
(function () {
    function progressBar(opt) {
        opt = opt || {};

        this.width = opt.width || 500;
        this.height = opt.height || 20;
        this.color = opt.color || "#B1D632";
        this.progress = opt.progress || 0;
        this.text = opt.text || "";
        this.contentId = opt.contentId;
    }

    progressBar.prototype = {
        toString: function () {
            var contentDiv = create("div"), mainDiv = create("div"), spanElem = create("span"),
	barDiv = create("div");

            append(barDiv, spanElem), append(mainDiv, barDiv),
	append(spanElem, !this.text ? range(this.progress, 100, 0) + "%" : this.text), append(contentDiv, mainDiv);

            setCSS([mainDiv], {
                position: "relative",
                width: this.width + "px",
                border: "1px solid #B1D632",
                padding: "1px",
                height: this.height + "px"
            });

            setCSS([barDiv], {
                display: "block",
                position: "relative",
                background: this.color,
                color: "#333333",
                height: this.height + "px",
                lineHeight: this.height + "px",
                width: range(this.progress, 100, 0) + "%"
            });

            setCSS([spanElem], {
                position: "absolute",
                width: this.width + "px",
                textAlign: "center",
                fontWeight: "bold"
            });

            return contentDiv.innerHTML.toLowerCase();
        },

        //刷新进度
        setProgress: function (value) {
            if (!this.contentId) return;
            this.show();

            setCSS([last(last(id(this.contentId)))], { width: range(value, 100, 0) + "%" });

            //更新显示值
            last(last(last(id(this.contentId)))).innerHTML = range(value, 100, 0) + "%";

            return value;

        },

        show: function () {
            if (!this.contentId) return;
            id(this.contentId).innerHTML = this.toString();
        }
    }

    function range(value, max, min) {
        return ((value > max) ? max : ((value < min) ? min : value));
    }

    nameSpace("progressBar", progressBar);
})();

//将文本转换为节点
function checkElem(elem) {
    return elem && elem.constructor == String ? document.createTextNode(elem) : elem;
}

function create(elem) {
    return document.createElementNS ?
        document.createElementNS('http://www.w3.org/1999/xhtml', elem) :
        document.createElement(elem);
}

function append(parent, elem) {
    parent.appendChild(checkElem(elem));
}

function last(elem) {

    elem = elem.lastChild;

    return elem && elem.nodeType != 1 ? prev(elem) : elem;
}

function id(name) {
    return typeof name == "string" ? document.getElementById(name) : name;
}



function setStyle(elements, prop, val) {

    for (var i = 0, len = elements.length; i < len; i++) {

        if (typeof elements[i] == "string")
            document.getElementById(elements[i]).style[prop] = val;
        else
            elements[i].style[prop] = val;

    }
}

function setCSS(el, styles) {
    for (var prop in styles) {
        if (!styles.hasOwnProperty(prop)) continue;

        setStyle(el, prop, styles[prop]);
    }
}

//注册命名空间
function nameSpace(a, b) {
    var c = a.split(/\./);
    var d = window;
    for (var e = 0; e < c.length - 1; e++) {


        if (!d[c[e]]) {

            d[c[e]] = {};
        }

        d = d[c[e]];
    }

    d[c[c.length - 1]] = b;
}