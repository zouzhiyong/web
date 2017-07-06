$(function() {
    //菜单顶部点击折叠
    $(".top_nav").on('click', baseFun.collapse);

    //一级菜单点击事件
    $(".side_bar>.menu>ul>li").on('click', baseFun.menuItem);

    //一级菜单折叠时移动事件
    $(".side_bar>.menu>ul>li").hover(baseFun.menuItemHover);

    //二级菜单点击事件 
    $('.menu_item').on('click', baseFun.menuItemSub);

});


var baseFun = {
    //菜单顶部点击折叠
    collapse: function() {
        $(".side_bar .menu").animate({ opacity: '0' }, 0);
        if ($("body").hasClass("mini-navbar")) {
            $(".side_bar").animate({ "width": "180px" }, 200);
            $(".main").animate({ marginLeft: "180px" }, 200);
        } else {
            $(".side_bar").animate({ "width": "60px" }, 200);
            $(".main").animate({ marginLeft: "60px" }, 200);
        }

        $(".side_bar .menu").animate({ opacity: '1' }, 500);
        $("body").toggleClass("mini-navbar");
    },
    //一级菜单点击事件
    menuItem: function() {
        var speed = 200;
        var liMenuNew = $(this); //第一级菜单项
        var ulMenuSubNew = liMenuNew.children("ul"); //第二级菜单项

        var liMenuOld = $(".side_bar>.menu>ul>li.active").not(liMenuNew);
        var ulMenuSubOld = liMenuOld.children("ul");

        ulMenuSubOld.animate({
            height: 'toggle',
            opacity: 'toggle'
        }, speed);
        liMenuOld.removeClass("active");
        ulMenuSubOld.attr("expanded", false);
        liMenuOld.find(".arrow").removeClass("fa-angle-down");

        ulMenuSubNew.animate({
            height: 'toggle',
            opacity: 'toggle'
        }, speed);
        liMenuNew.toggleClass("active");
        liMenuNew.find(".arrow").toggleClass("fa-angle-down");

        if (liMenuNew.hasClass('active')) {
            ulMenuSubNew.attr("expanded", true);

        } else {
            ulMenuSubNew.attr("expanded", false);

        }
    },
    //折叠时移动事件
    menuItemHover: function() {
        if (!$("body").hasClass("mini-navbar")) {
            return;
        }

        $("ul", this).css("top", $(this).offset().top + "px");
    },
    //判断浏览器是否支持html5本地存储    
    localStorageSupport: function() {
        return (('localStorage' in window) && window['localStorage'] !== null)
    },
    //二级菜单点击事件 
    menuItemSub: function() {
        var dataIndex = $(this).attr("data-index");
        var dataUrl = $(this).attr("href");
        var flag = true;

        //增加激活样式
        $(".menu_item.active").removeClass("active");
        $(this).addClass("active");

        //页面存在时重新加载
        $('.main_iframe .main_iframe_page').each(function() {
            if ($(this).data('id').toString() == dataIndex) {

                $(this).show().siblings('.main_iframe_page').hide();
                //重新加载
                $(this).attr('src', dataUrl).load(function() {});
                flag = false;
            }
        });

        // 添加选项卡对应的iframe
        if (flag) {
            var new_iframe = '<iframe class="main_iframe_page" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataIndex + '" seamless></iframe>';
            $('.main_iframe').find('iframe.main_iframe_page').hide().parents('.main_iframe').append(new_iframe);
        }
        return false;
    }

}