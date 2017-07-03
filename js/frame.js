$(function () {
    $(".zz-menu>.zz-menu-item").on({
        click: function () {
            $(this).toggleClass("active");

            var el = $(".zz-menu-second-level", this),
                curHeight = el.height(),
                autoHeight = el.css('height', 'auto').height();

            if ($(this).hasClass("active")) {
                el.height(curHeight).animate({ height: autoHeight }, 200, function () {
                    el.addClass("in");
                });

            } else {
                el.animate({ height: "0px" }, 200, function () {
                    el.removeClass("in");
                });

            }

        }
    });
});