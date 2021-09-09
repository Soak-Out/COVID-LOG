import Vue from "vue"
import App from "./App.vue"
import "./firebase.js"
import router from "./router"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faUserSecret } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import VueStar from "vue-star"

Vue.component("VueStar", VueStar)

library.add(faUserSecret, faHeart, faTrash, faPen)

Vue.component("font-awesome-icon", FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
