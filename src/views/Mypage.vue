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
    <div v-for="(post, postnumber) in posts" v-bind:key="postnumber">
      <div>------------------------------------------</div>
      <div class="flex">
        <div class="ttl">「{{ post.title }}」</div>
        <div class="text">{{ post.text }}</div>
        <div>{{ post.infection }}</div>
        <div>{{ post.vaccine }}</div>
        <div>{{ post.illLevel }}</div>
        <div>{{ post.headache }}</div>
        <div>{{ post.fever }}</div>
        <div>{{ post.respiratoryOrgan }}</div>
        <div>{{ post.soreThroat }}</div>
        <div>{{ post.tasteOrDisappearance }}</div>
        <div>{{ post.diarrhea }}</div>
        <div>{{ post.other }}</div>
      </div>
    </div>
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
      error: false,
      getScreenName: "",
      //-------投稿を配列にする-----
      posts: [],
      postnumber: 0,
    }
  },
  created: function () {
    firebase.auth().onAuthStateChanged(async (user) => {
      const userDoc = await db.collection("users").doc(user.uid).get()
      if (userDoc.exists) {
        const docRef = db.collection("users").doc(user.uid)
        docRef.get().then(async (doc) => {
          this.gethandleName = doc.data().handleName
          this.getScreenName = doc.data().screen_name
          const userID = this.getScreenName
          const postRef = await db
            .collection("posts")
            .where("screen_name", "==", `${userID}`)
            .get()
          this.postnumber = postRef.size
          console.log(this.postnumber)
          postRef.forEach((postdoc) => {
            const post = postdoc.data()
            this.posts.push(post)
          })
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

<style lang="scss" scoped>
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
.flex {
  display: flex;
  .ttl {
    font-weight: bold;
  }
  .text {
    width: 40%;
    text-align: left;
  }
}
</style>
