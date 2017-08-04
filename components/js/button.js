import Button from './../vue/button.vue';

Button.install = function(Vue) {
    Vue.component(Button.name, Button);
};

const components = [
    Button
]
const install = function(Vue, opts = {}) {
    /* istanbul ignore if */
    if (install.installed) return;
    components.map(component => {
        Vue.component(component.name, component);
    });

};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

export default Button;