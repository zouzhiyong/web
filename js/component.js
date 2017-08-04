(function($) {
    //表格初始化的默认参数
    var defaults = {
        method: 'get',
        toolbar: '#toolbar',
        striped: true,
        cache: false,
        pagination: true,
    };
    //注册bootstrapTable组件
    Vue.component('bootstrap-table', {
        template: '<table></table>',
        props: {
            'tableParam': {
                type: Object
            }
        },
        //组件渲染之前
        created: function() {
            //debugger;

        },
        //组件渲染之后
        mounted: function() {
            // debugger;
            var params = $.extend({}, defaults, this.tableParam || {});
            this.bootstraptable = $(this.$el).bootstrapTable(params);
        }
    });

})(jQuery);