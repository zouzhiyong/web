$(function() {
    //*************侧栏部分*************

    //菜单顶部点击折叠
    $(".top_nav").on('click', baseFun.collapse);

    //一级菜单点击事件
    $(".side_bar>.menu>ul>li").on('click', baseFun.menuItem);

    //一级菜单折叠时移动事件
    $(".side_bar>.menu>ul>li").hover(baseFun.menuItemHover);

    //二级菜单点击事件 
    $('.menu_item').on('click', baseFun.menuItemSub);


    //*************工具栏部分*************

    //展开关闭操作
    $(".J_tabClose").on('click', baseFun.closeOpration);

    //点击TAB关闭相对应页面
    $('.J_menuTabs').on('click', '.J_menuTab i', baseFun.closeTab);

    //激活页面
    $('.J_menuTabs').on('click', '.J_menuTab', baseFun.activeTab);
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
    //二级菜单点击事件 
    menuItemSub: function() {
        var dataIndex = $(this).attr("data-index");
        var menuName = $.trim($(this).text());
        var dataUrl = $(this).attr("href");
        var flag = true;

        //增加激活样式
        $(".menu_item.active").removeClass("active");
        $(this).addClass("active");

        //页面存在时重新加载
        $('.J_menuTab').each(function() {
            if ($(this).data('id') == dataIndex) {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                    //scrollToTab(this);                  
                }
            }
        });

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

            var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataIndex + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
            $('.J_menuTab').removeClass('active');
            $('.J_menuTabs .page-tabs-content').append(str);
        }
        return false;
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

    //展开关闭操作
    closeOpration: function() {
        $(".dropdown-menu.dropdown-menu-right").toggle();
    },
    //点击TAB关闭相对应页面
    closeTab: function() {
        var closeTabId = $(this).parents('.J_menuTab').data('id');

        // 当前元素处于活动状态
        if ($(this).parents('.J_menuTab').hasClass('active')) {
            // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
            if ($(this).parents('.J_menuTab').next('.J_menuTab').size()) {
                var activeId = $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').data('id');
                $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').addClass('active');
                $('.J_mainContent .J_iframe').each(function() {
                    if ($(this).data('id') == activeId) {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });

                //  移除当前选项卡
                $(this).parents('.J_menuTab').remove();
                // 移除tab对应的内容区
                $('.J_mainContent .J_iframe').each(function() {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
            }

            // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
            if ($(this).parents('.J_menuTab').prev('.J_menuTab').size()) {
                var activeId = $(this).parents('.J_menuTab').prev('.J_menuTab:last').data('id');
                $(this).parents('.J_menuTab').prev('.J_menuTab:last').addClass('active');
                $('.J_mainContent .J_iframe').each(function() {
                    if ($(this).data('id') == activeId) {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });

                //  移除当前选项卡
                $(this).parents('.J_menuTab').remove();

                // 移除tab对应的内容区
                $('.J_mainContent .J_iframe').each(function() {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
            }
        } else {
            //  移除当前选项卡
            $(this).parents('.J_menuTab').remove();

            // 移除相应tab对应的内容区
            $('.J_mainContent .J_iframe').each(function() {
                if ($(this).data('id') == closeTabId) {
                    $(this).remove();
                    return false;
                }
            });
            //scrollToTab($('.J_menuTab.active'));
        }
        return false;
    },
    //激活页面
    activeTab: function() {
        if (!$(this).hasClass('active')) {
            var currentId = $(this).data('id');
            // 显示tab对应的内容区
            $('.J_mainContent .J_iframe').each(function() {
                if ($(this).data('id') == currentId) {
                    $(this).show().siblings('.J_iframe').hide();
                    return false;
                }
            });
            $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
            //scrollToTab(this);
        }
    }
}