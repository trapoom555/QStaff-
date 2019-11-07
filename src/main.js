import Vue from 'vue'
import App from './App.vue'
import Routes from './routes'
import VueRouter from 'vue-router'
import './firebase';
import {firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)
Vue.config.productionTip = false


Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routes
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,
}).$mount('#app')
