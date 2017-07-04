$(function() {
    //一级菜单点击事件
    $(".zz-menu-ul>.zz-menu-item").click(function() {
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


    });

    //二级菜单点击事件 
    $('.J_menuItem').on('click', menuItem);

});


//判断浏览器是否支持html5本地存储
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}

//点击菜单打开页面
function menuItem() {
    var dataIndex = $(this).attr("data-index");
    var dataUrl = $(this).attr("href");
    var flag = true;

    //增加激活样式
    $(".J_menuItem.active").removeClass("active");
    $(this).addClass("active");

    //页面存在时重新加载
    $('.J_mainContent .J_iframe').each(function() {
        if ($(this).data('id').toString() == dataIndex) {

            $(this).show().siblings('.J_iframe').hide();
            //重新加载
            $(this).attr('src', dataUrl).load(function() {});
            flag = false;
        }
    });

    // 添加选项卡对应的iframe
    if (flag) {
        var new_iframe = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataIndex + '" seamless></iframe>';
        $('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(new_iframe);
    }




    return false;
}