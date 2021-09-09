<template>
  <div class="wrapper">
    <aside class="sidebar">
      <div class="prof">
        <img :src="user.photoURL" />
        <router-link to="/mypage" class="name"> {{ handleName }}</router-link
        ><br />
        <router-link to="/mypage" class="text"
          >マイページでで名前を変更</router-link
        >
      </div>
    </aside>

    <div class="make-post">
      <div class="inner">
        <p class="block-ttl">タイトル</p>
        <input type="text" v-model="postTitle" class="inttl" />
        <div class="block-ttl">投稿内容</div>
        <textarea type="text" v-model="postText" class="intext" />

        <div class="check-list">
          <div class="left-side">
            <div class="block-ttl">属性</div>
            <ul class="attribute">
              <li>
                <input
                  type="checkbox"
                  v-model="infection"
                  id="infection"
                /><label for="infection">感染記録</label>
              </li>
              <li>
                <input type="checkbox" v-model="vaccine" id="vaccine" /><label
                  for="vaccine"
                  >ワクチン接種記録</label
                >
              </li>
            </ul>

            <div class="block-ttl">重症度</div>
            <div class="severity">
              <input
                type="range"
                v-model="illLevel"
                min="1"
                max="5"
                step="1"
                id="illLevel"
              />
              <div class="numbers">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
          </div>

          <div class="right-side">
            <div class="block-ttl">症状</div>
            <ul class="tag">
              <li>
                <input type="checkbox" v-model="fever" id="fever" /><label
                  for="fever"
                  >発熱</label
                >
              </li>
              <li>
                <input type="checkbox" v-model="headache" id="headache" /><label
                  for="headache"
                  >頭痛</label
                >
              </li>
              <li>
                <input
                  type="checkbox"
                  v-model="soreThroat"
                  id="soreThroat"
                /><label for="soreThroat">喉の渇き</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  v-model="respiratoryOrgan"
                  id="respiratoryOrgan"
                /><label for="respiratoryOrgan">呼吸困難</label>
              </li>
              <li>
                <input type="checkbox" v-model="diarrhea" id="diarrhea" /><label
                  for="diarrhea"
                  >下痢</label
                >
              </li>
              <li>
                <input
                  type="checkbox"
                  v-model="tasteOrDisappearance"
                  id="tasteOrDisappearance"
                /><label for="tasteOrDisappearance">味覚などの異常</label>
              </li>
              <li>
                <input type="checkbox" v-model="other" id="other" /><label
                  for="other"
                  >その他</label
                >
              </li>
            </ul>
          </div>
        </div>

        <a v-on:click="post" @click="openModal" class="btn">投稿する</a>

        <modal v-show="showContent" @close="closeModal" />
      </div>
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
    screen_name: "",
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
  computed: {
    user() {
      return this.$auth.currentUser
    },
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
              this.screen_name = doc.data().screen_name
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
          screen_name: this.screen_name,
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
          photo: this.user.photoURL,
          post_at: firebase.firestore.FieldValue.serverTimestamp(),
          starCount: 0,
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
@import "../assets/css/_reset.scss";

$main-color: #9ad5ff;

.wrapper {
  max-width: 1420px;
  display: flex;
}
//----------------------------
//サイドバー
//----------------------------
.sidebar {
  width: calc(100% / 3);
  border-right: 1px solid #c4c4c4;
  .prof {
    width: 198px;
    text-align: center;
    margin: {
      top: 103px;
      left: 30%;
    }
    img {
      width: 198px;
      border-radius: 50%;
      margin-bottom: 43px;
    }
    .name {
      width: 100%;
      display: inline-block;
      color: #000;
      font-size: 1.5rem;
      border-bottom: 3px solid $main-color;
    }
    .text {
      display: inline-block;
      font-size: 0.75rem;
      color: #4986e1;
    }
  }
}
//----------------------------
//投稿作成欄
//----------------------------
.make-post {
  width: calc(200% / 3);
  margin: 0 auto;
  .inner {
    margin: 61px 119px 91px 10%;
  }
  .block-ttl {
    width: 100px;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 10px;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      height: 3px;
      background-color: $main-color;
      width: 93.26px;
      top: 100%;
      left: 5%;
    }
  }
  .inttl,
  .intext {
    width: 100%;
    border-radius: 10px;
    border: 3px solid $main-color;
  }
  .inttl {
    height: 42px;
    margin-bottom: 40px;
  }
  .intext {
    height: 198px;
    margin-bottom: 49px;
  }
  .check-list {
    display: flex;
    margin-bottom: 60px;
    .left-side {
      width: 60%;
      .attribute {
        padding: 2rem 1rem;
        li {
          margin-bottom: 0.5rem;
          input {
            margin-right: 0.5rem;
            cursor: pointer;
          }
        }
      }
      .severity {
        margin: 1rem;
        input {
          width: 235px;
          border-radius: 10px;
          background: #ceeaff;
          -webkit-appearance: none;
          border: solid 3px #aad0ee;
          appearance: none;
          cursor: pointer;
          outline: 0;
        }
        &:focus {
          box-shadow: 0 0 3px rgb(0, 161, 255);
        }
        // -webkit-向けのつまみ
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          background: #53aeff;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
        }
        // -moz-向けのつまみ
        &::-moz-range-thumb {
          background: #53aeff;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
          border: none;
        }
        // Firefoxで点線が周りに表示されてしまう問題の解消
        &::-moz-focus-outer {
          border: 0;
        }
        // つまみをドラッグしているときのスタイル
        &:active::-webkit-slider-thumb {
          box-shadow: 0px 5px 10px -2px rgba(0, 0, 0, 0.3);
        }
        .numbers {
          width: 235px;
          font-weight: bold;
          font-size: 1.25rem;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }

  .right-side {
    width: 40%;
    .tag {
      display: flex;
      flex-direction: column;
      margin: 1rem;
      input {
        margin-right: 0.5rem;
        cursor: pointer;
      }
      li {
        margin-bottom: 0.54rem;
      }
    }
  }

  .btn {
    width: 230px;
    height: 49px;
    line-height: 49px;
    font-size: 1.125rem;
    display: block;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    background-color: $main-color;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
  }
}
</style>
