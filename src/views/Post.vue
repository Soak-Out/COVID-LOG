<template>
  <div>
    <div class="flex-cl">
      お名前<input type="text" v-model="handleName" />タイトル<input
        type="text"
        v-model="postTitle"
      />
      投稿内容<textarea type="text" v-model="postText" />
      <input type="checkbox" v-model="infection" id="infection" /><label
        for="infection"
        >コロナに感染している/したことがある</label
      >
      <input type="checkbox" v-model="vaccine" id="vaccine" /><label
        for="vaccine"
        >ワクチン接種</label
      >
      <label for="illLevel">重症度</label>
      <input
        type="range"
        v-model="illLevel"
        min="1"
        max="5"
        step="1"
        id="illLevel"
      />
      <div class="symptoms">
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

      <button v-on:click="post" @click="openModal">投稿</button>

      <!-- <button v-on:click="getPost">投稿を取得</button> -->
      <modal v-show="showContent" @close="closeModal" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import Modal from "../components/Modal.vue"

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

  methods: {
    post() {
      if (this.postTitle !== "" && this.postText !== "") {
        const kaigyou = this.postText.replace(/\n/g, "\\n")
        firebase.firestore().collection("posts").add({
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
    },
  },
}
</script>

<style scoped>
.flex-cl {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 500px;
  margin-bottom: 100px;
}
input {
  height: 1rem;
  margin-bottom: 20px;
}
.symptoms {
  padding: 30px;
}
</style>
