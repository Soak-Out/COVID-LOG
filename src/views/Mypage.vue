<template>
  <div>
    <h1>アカウント情報</h1>
    <img :src="user.photoURL" class="photo" />
    <div class="text">ニックネーム</div>
    <div class="name">{{ gethandleName }}</div>
    <div class="text">ニックネーム変更</div>
    <input type="text" v-model="handleName" class="nick" />
    <div v-show="error" class="error">ニックネームを入力してください！</div>
    <a @click="newName" class="btn">変更</a>
  </div>
</template>

<script>
import firebase from "firebase"
const db = firebase.firestore()
require("../assets/css/global.css")
export default {
  data() {
    return {
      handleName: "",
      gethandleName: "",
      error: false,
    }
  },
  created: function () {
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
    newName() {
      if (this.handleName !== "") {
        this.gethandleName = this.handleName
        const user = firebase.auth().currentUser
        const docRef = db.collection("users").doc(user.uid)
        docRef.update({ handleName: this.gethandleName }).then(() => {
          this.handleName = ""
        })
      } else {
        this.error = true
      }
    },
  },
}
</script>

<style scped>
.text {
  margin: 1rem;
  font-weight: bold;
}
.name {
  margin-bottom: 3rem;
  font-weight: bold;
  font-size: 2rem;
  color: rgb(0, 174, 255);
}

.nick {
  width: 200px;
  height: 30px;
}
.error {
  margin: 0 auto;
  width: 40%;
  color: red;
  font-weight: bold;
}
</style>
