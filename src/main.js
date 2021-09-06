import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false
new Vue({
  vuetify,
  router,
  VueApexCharts,
  render: h => h(App)
}).$mount('#app')

Vue.component('apexchart', VueApexCharts)
