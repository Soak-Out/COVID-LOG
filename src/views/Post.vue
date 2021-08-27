<template>
  <div>
    <div class="post-content">
      ニックネーム
      <div class="nickname">
        <a href="/mypage" class="handle-name">{{ handleName }}</a>
        <span>さん</span>
      </div>

      タイトル<input type="text" v-model="postTitle" class="small-input" />
      投稿内容<textarea type="text" v-model="postText" />

      <ul class="exp">
        <li>
          <input type="checkbox" v-model="infection" id="infection" /><label
            for="infection"
            >コロナに感染している/したことがある</label
          >
        </li>
        <li>
          <input type="checkbox" v-model="vaccine" id="vaccine" /><label
            for="vaccine"
            >ワクチンを接種</label
          >
        </li>
      </ul>

      <div class="range">
        <label for="illLevel">重症度(5段階)</label>
        <input
          type="range"
          v-model="illLevel"
          min="1"
          max="5"
          step="1"
          id="illLevel"
        />
      </div>

      <div class="symptoms">
        症状：
        <input type="checkbox" v-model="fever" id="fever" /><label for="fever"
          >発熱</label
        >
        <input type="checkbox" v-model="soreThroat" id="soreThroat" /><label
          for="soreThroat"
          >空咳・喉の痛み</label
        >
        <input
          type="checkbox"
          v-model="respiratoryOrgan"
          id="respiratoryOrgan"
        /><label for="respiratoryOrgan">呼吸器障害</label>
        <input type="checkbox" v-model="diarrhea" id="diarrhea" /><label
          for="diarrhea"
          >下痢</label
        >
        <input type="checkbox" v-model="headache" id="headache" /><label
          for="headache"
          >頭痛</label
        >
        <input
          type="checkbox"
          v-model="tasteOrDisappearance"
          id="tasteOrDisappearance"
        /><label for="tasteOrDisappearance">味覚または嗅覚の消失</label>
        <input type="checkbox" v-model="other" id="other" /><label for="other"
          >その他</label
        >
      </div>

      <a v-on:click="post" @click="openModal" class="btn">投稿</a>

      <modal v-show="showContent" @close="closeModal" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import Modal from "../components/Modal.vue"
const db = firebase.firestore()

//css読み込み
require("../assets/css/post-page.css")

function initialState() {
  return {
    handleName: "",
    postTitle: "",
    postText: "",
    infection: false,
    vaccine: false,
    illLevel: 0,
    fever: false,
    soreThroat: false,
    respiratoryOrgan: false,
    diarrhea: false,
    headache: false,
    tasteOrDisappearance: false,
    other: false,
    showContent: false,
  }
}

export default {
  components: {
    Modal,
  },
  data() {
    return initialState()
  },
  created: function () {
    firebase.auth().onAuthStateChanged(async (user) => {
      const userDoc = await db.collection("users").doc(user.uid).get()
      if (userDoc.exists) {
        const docRef = db.collection("users").doc(user.uid)
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.handleName = doc.data().handleName
            } else {
              console.log("No such document!")
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error)
          })
      }
    })
  },
  methods: {
    post() {
      if (this.postTitle !== "" && this.postText !== "") {
        const kaigyou = this.postText.replace(/\n/g, "\\n")
        db.collection("posts").add({
          handleName: this.handleName,
          title: this.postTitle,
          text: kaigyou,
          infection: this.infection,
          vaccine: this.vaccine,
          illLevel: this.illLevel,
          fever: this.fever,
          soreThroat: this.soreThroat,
          respiratoryOrgan: this.respiratoryOrgan,
          diarrhea: this.diarrhea,
          headache: this.headache,
          tasteOrDisappearance: this.tasteOrDisappearance,
          other: this.other,
        })
        Object.assign(this.$data, initialState())
      }
    },
    openModal() {
      this.showContent = true
    },
    closeModal() {
      this.showContent = false
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
  },
}
</script>
