<template>
  <div>
    <div class="links">
      <div v-if="isAuth">
        <img :src="user.photoURL" class="photo" />
        <div @click="mypage" class="name">{{ gethandleName }}</div>
        <router-link to="/mypage">Mypageへ</router-link>
        <a @click="signOut" class="btn log-out">ログアウト</a>
      </div>
      <div v-else class="login-page">
        <a @click="signUp" class="btn">ログイン</a>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import "firebase/auth"
const db = firebase.firestore()

require("../assets/css/global.css")

export default {
  data() {
    return {
      isAuth: false,
      notNickName: false,
      handleName: "名無しさん",
      gethandleName: "",
    }
  },
  created: function () {
    firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))
    firebase.auth().onAuthStateChanged(async (user) => {
      const userDoc = await db.collection("users").doc(user.uid).get()
      if (userDoc.exists) {
        const docRef = db.collection("users").doc(user.uid)
        docRef.get().then((doc) => {
          if (doc.exists) {
            this.gethandleName = doc.data().handleName
          }
        })
      }
    })
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          location.href = "/Login"
        })
    },
    signUp() {
      firebase.auth().onAuthStateChanged(async (user) => {
        // 未ログイン時
        if (!user) {
          const provider = new firebase.auth.GoogleAuthProvider()
          firebase.auth().signInWithPopup(provider)
        }
        // ログイン時
        else {
          // ログイン済みのユーザー情報があるかをチェック
          const userDoc = await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
          if (!userDoc.exists) {
            // Firestore にユーザー用のドキュメントが作られていなければ作る
            await userDoc.ref
              .set({
                screen_name: user.uid,
                handleName: this.handleName,
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(() => {
                location.href = "/"
              })
          }
        }
      })
    },
    mypage() {
      location.href = "/mypage"
    },
  },
}
</script>

<style scoped>
.links {
  margin-top: 100px;
  font-size: 1.25rem;
  line-height: 4rem;
  font-weight: bold;
}
.links a {
  text-decoration: none;
}
.error {
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: red;
}
.login-page {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>
