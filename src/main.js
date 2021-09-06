import Vue from "vue"
import App from "./App.vue"
import "./firebase.js"
import router from "./router"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueStar from 'vue-star'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('VueStar', VueStar);

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
