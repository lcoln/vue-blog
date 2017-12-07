// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Login from './Login'

Vue.config.productionTip = false
window.baseUrl = 'https://api.cncoders.me/'
/* eslint-disable no-new */
new Vue({
  el: '#login',
  template: '<Login/>',
  components: { Login }
})
