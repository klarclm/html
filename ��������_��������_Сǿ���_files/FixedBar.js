(function ($) {
    $.fn.FixedBar = function (scrollEle, s1, f1) { 
        if ($(this).offset() != null) {
            var offsetTop = $(this).offset().top;
            $.fn.FixedBar.positionContorl(this, scrollEle, offsetTop, s1, f1);
        } 
    }
    $.fn.FixedBar.positionContorl = function (obj, scrollEle, offsetTop, s1, f1) {
        var self = scrollEle,
        that = obj;
        self.scroll(function () {
            if (self.scrollTop() >= offsetTop)
            {
                if (that.attr("class").indexOf("fixed") < 0)
                {
                    var div = $("<div> </div>");
                    div.css("width", that.width() + "px");
                    div.css("height", that.innerHeight() + "px");
                    div.attr("style", that.attr("style"));
                    div.css("border", "");

                    $(div).insertBefore(that);
                    that.addClass('fixed');
                    if (s1 != undefined)
                    {
                        s1();
                    }
                }
            }
            else
            {
                if (that.attr("class").indexOf("fixed") >= 0)
                {
                    that.removeClass('fixed');
                    that.prev().remove();
                    if (f1 != undefined)
                    {
                        f1();
                    }
                }
            }
        });
    }
})(jQuery);
