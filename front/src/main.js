import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'

Vue.use(Notifications);
Vue.use(Croppa)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
