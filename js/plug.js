(function() {
    Vue.directive('example', {
        bind: function(el, binding, vnode) {
            console.log(el.getAttribute("type"));
        },
        update: function(value, el) {

        }
    })

})()