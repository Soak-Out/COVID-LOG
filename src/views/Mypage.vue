<template>
  <div>
    <h1>アカウント情報</h1>
    <div class="text">ニックネーム</div>
    <div class="name">{{ gethandleName }}<span>さん</span></div>
    <div class="text">ニックネーム変更</div>
    <input type="text" v-model="handleName" class="nick" />
    <a @click="newName" class="btn">変更</a>
  </div>
</template>

<script>
import firebase from "firebase"
const db = firebase.firestore()
export default {
  data() {
    return {
      handleName: "",
      gethandleName: "",
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
  methods: {
    newName() {
      this.gethandleName = this.handleName
      const user = firebase.auth().currentUser
      const docRef = db.collection("users").doc(user.uid)
      docRef.update({ handleName: this.gethandleName }).then(() => {
        this.handleName = ""
      })
    },
  },
}
</script>

<style scped>
.btn {
  margin: 1rem auto 4rem;
  padding: 1rem 2rem;
  width: 105px;
  height: 27px;
  background: linear-gradient(to right, #7dbaf3, #386de0);
  color: #fff;
  cursor: pointer;
  border-radius: 10px;
  display: block;
  text-align: center;
  line-height: 27px;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}
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
span {
  margin-left: 10px;
  font-weight: normal;
  color: #000;
}
.nick {
  width: 200px;
  height: 30px;
}
</style>
