import axios from 'axios';
import Vue from 'vue';

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'https://carros-app-example.herokuapp.com/'
        });
    }
});