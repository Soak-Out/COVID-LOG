<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"
import firebase from "firebase"

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // サインインしていない状態
        // サインイン画面に遷移する等
        // 例:
        location.href = "/Login"
      } else {
        // サインイン済み
      }
    })
  },
}
</script>
