import Vue from 'vue';
import App from './App.vue';
import {VueMasonryPlugin} from 'vue-masonry';

Vue.use(VueMasonryPlugin);

new Vue({
    el: '#app',
    render: h => h(App)
});
