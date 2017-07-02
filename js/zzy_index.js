var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                visible: false, radio: 2,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '选项2'
            }
        },
        mounted: function () {
            console.log(this.$refs.ff[0]);
        },
        methods: {
            selected: function (value) {
                alert("eeeee")
                //let obj = {};
                //obj = this.options.find(item => item.value === value);
                //alert(obj.label);
                //this.$message(obj.label);
            },
            checked: function (value) {

            }
        }
    })