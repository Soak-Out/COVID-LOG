<template>
  <div>
    <div class="links">
      <div v-if="isAuth">
        <a @click="signOut">signOut</a>
      </div>
      <div v-else>
        <a @click="signInGoogle">signInGoogle</a>
        <!-- <a @click="signInTwitter">signInTwitter</a> -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      isAuth: false,
    }
  },
  created: function () {
    firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))
  },
  methods: {
    signInGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    // signInTwitter() {
    //   const provider = new firebase.auth.TwitterAuthProvider()
    //   firebase.auth().signInWithRedirect(provider)
    // },
    signOut() {
      firebase.auth().signOut()
    },
  },
}
</script>

<style scoped>
.links a {
  user-select: none;
  cursor: pointer;
  display: inline-block;
  padding: 1rem 2rem;
  color: #fff;
  background-color: #333;
  font-size: 1.5rem;
}
</style>
