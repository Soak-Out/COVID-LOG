<template>
  <div>
    <div class="links">
      <div v-if="isAuth">
        <img :src="user.photoURL" class="photo" />
        <div class="name">{{ gethandleName }}</div>
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
          location.href = "/login"
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

<style lang="scss" scoped>
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

$btn-color: linear-gradient(to right, #7dbaf3, #386de0);
.btn {
  margin: 1rem auto;
  width: 155px;
  height: 47px;
  background: $btn-color;
  color: #fff;
  border-radius: 10px;
  display: block;
  text-align: center;
  line-height: 47px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  user-select: none;
  cursor: pointer;
}
.photo {
  width: 150px;
  border-radius: 50%;
  border: 1px #ccc solid;
}
.name {
  margin-bottom: 3rem;
  font-weight: bold;
  font-size: 2rem;
  color: rgb(0, 174, 255);
}
</style>
