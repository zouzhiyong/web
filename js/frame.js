$(function () {
    $(".zz-menu-ul>.zz-menu-item").on({
        click: function () {
            var el_new = $(this);
            var el_new_second = el_new.children(".zz-menu-second-level");

            var el_old = $(".zz-menu-item.active").not(el_new);
            var el_old_second = el_old.children(".zz-menu-second-level");

            el_old_second.animate({ height: 'toggle', opacity: 'toggle' }, 200);
            el_old.removeClass("active");
            el_old_second.attr("expanded", false);
            el_old.find(".arrow").removeClass("fa-angle-down");

            el_new_second.animate({ height: 'toggle', opacity: 'toggle' }, 200);
            el_new.toggleClass("active");
            el_new.find(".arrow").toggleClass("fa-angle-down");

            if (el_new.hasClass('active')) {
                el_new_second.attr("expanded", true);

            } else {
                el_new_second.attr("expanded", false);

            }


        }
    });

    $(".J_menuItem").on({
        click: function () {
            var index=$(this).attr("data-index");
            var iframe=$('<iframe class="J_iframe" name="iframe'+index+'" src="'+$(this).attr("href")+'" data-id="'+$(this).attr("href")+'" seamless="" style="display: block;" height="100%" frameborder="0" width="100%"></iframe>');
            $(".content").append(iframe);
            return false;
        }
    })

});