import Vue from "vue"
import VueRouter from "vue-router"
import firebase from "firebase"
import Home from "../views/Home.vue"
import Top from "../views/Top.vue"
import Login from "../views/Login.vue"
import Post from "../views/Post.vue"
import Mypage from "../views/Mypage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/top",
    name: "Top",
    component: Top,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/mypage",
    name: "Mypage",
    component: Mypage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/post-page",
    name: "Post-Page",
    component: Post,
  },
  {
    path: "/covidList",
    name: "covidList",
    component: () =>
      import(/* webpackChunkName: "covidList" */ "../views/covidList.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

const isSignedIn = async () => {
  // Promise を使って、onAuthStateChanged が完了するまで待つ
  return await new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          unsubscribe()
          resolve(true)
        } else {
          unsubscribe()
          resolve(false)
        }
      },
      (error) => {
        unsubscribe()
        reject(error)
      }
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const auth = await isSignedIn()
  if (to.name !== "Top" && !auth) {
    next("/top")
  } else {
    next()
  }
})
export default router
