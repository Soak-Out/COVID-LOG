<template>
  <div>
    <div class="links">
      <div v-if="isAuth">
        <a @click="signOut" class="btn log-out">ログアウト</a>
        <a href="/mypage">Mypageへ</a>
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
// import { use } from "vue/types/umd"

export default {
  data() {
    return {
      isAuth: false,
      notNickName: false,
      handleName: "名無しさん",
    }
  },
  created: function () {
    firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))
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
.btn {
  margin: 1rem auto 4rem;
  padding: 1rem 2rem;
  width: 155px;
  height: 37px;
  background: linear-gradient(to right, #7dbaf3, #386de0);
  color: #fff;
  cursor: pointer;
  border-radius: 10px;
  display: block;
  text-align: center;
  line-height: 37px;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}
</style>
