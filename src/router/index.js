import Vue from "vue"
import VueRouter from "vue-router"
import firebase from "firebase"
import Top from "../views/Top.vue"
import Post from "../views/Post.vue"
import Mypage from "../views/Mypage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/top",
    name: "Top",
    component: Top,
  },
  {
    path: "/mypage",
    name: "Mypage",
    component: Mypage,
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
