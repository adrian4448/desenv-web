import Vue from 'vue'
import App from './App.vue'
import router from './route'
import './plugins/axios';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
