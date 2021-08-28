<template>
  <div>
    <div class="post-content">
      ニックネーム
      <div class="nickname">
        <router-link to="/mypage" class="handle-name">{{
          handleName
        }}</router-link>
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
  mounted: function () {
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

<style lang="scss" scoped>
.post-content {
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  text-align: left;
  font-weight: bold;
  label {
    cursor: pointer;
    user-select: none;
  }
  .small-input {
    width: 40%;
    margin: 0.5rem 0;
  }
  textarea {
    margin: 0.5rem 0;
    height: 200px;
  }
  .exp {
    display: flex;
    flex-direction: column;
    margin-left: -40px;
    li {
      list-style: none;
      margin: 0.5rem 0;
    }
  }
  .range {
    margin-bottom: 1rem;
    #illLevel {
      width: 30%;
    }
  }
  .symptoms {
    margin-bottom: 1rem;
    display: flex;

    flex-wrap: wrap;
    label {
      margin-right: 20px;
    }
  }

  .handle-name {
    color: rgb(0, 174, 255);
  }
  .nickname {
    margin: 1rem 0;
    display: flex;
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
}
</style>
