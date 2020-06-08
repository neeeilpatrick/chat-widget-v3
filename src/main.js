import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import BusinessHours from 'vue-business-hours';

Vue.use(BusinessHours);
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
