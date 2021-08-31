<template>
  <div class="html">
    <div class="wrapper">
      <div class="prof">
        <div class="img">
          <img :src="user.photoURL" class="photo" />
        </div>
        <div class="text">
          <div class="ttl">ニックネーム</div>
          <label for="change">
            <div class="nickname">{{ gethandleName }}</div></label
          >
          <div class="inputbtn">
            <input
              type="text"
              v-model="handleName"
              id="change"
              placeholder="ニックネーム変更"
              class="change-nickname"
            />
            <div v-show="error" class="error">
              ニックネームを入力してください！
            </div>
            <a @click="newName" class="btn">変更</a>
          </div>
        </div>
      </div>

      <div class="mypost">
        <div v-for="(post, index) in posts" v-bind:key="index" class="post">
          <div class="status">
            <div class="flex">
              <div class="ttl">{{ post.title }}</div>
              <div class="level">
                重症度<span>Lv.{{ post.illLevel }}</span>
              </div>
            </div>
            <div class="time">{{ post.postedTime }}</div>
          </div>
          <ul class="tag">
            <li v-show="post.infection">#感染経験あり</li>
            <li v-show="post.vaccine">#ワクチン接種</li>
            <li v-show="post.headache">#頭痛</li>
            <li v-show="post.fever">#発熱</li>
            <li v-show="post.respiratoryOrgan">#呼吸困難</li>
            <li v-show="post.soreThroat">#喉の渇き</li>
            <li v-show="post.tasteOrDisappearance">#味覚異常</li>
            <li v-show="post.diarrhea">#下痢</li>
            <li v-show="post.other">#その他</li>
          </ul>

          <div class="text">{{ post.uploadText }}</div>
          <div class="post-btns">
            <div @click="deletePost(index)" class="post-btn">🗑</div>
            <div @click="editPost(index)" class="post-btn">🖋</div>
          </div>
          <modal
            v-if="showContent"
            @close="closeModal"
            @enter="enterPost"
            :title="postData.title"
            :text="postData.text"
            :infection="postData.infection"
            :vaccine="postData.vaccine"
            :illLevel="postData.illLevel"
            :fever="postData.fever"
            :soreThroat="postData.soreThroat"
            :respiratoryOrgan="postData.respiratoryOrgan"
            :diarrhea="postData.diarrhea"
            :headache="postData.headache"
            :tasteOrDisappearance="postData.tasteOrDisappearance"
            :other="postData.other"
            :screen_name="postData.screen_name"
            :handleName="postData.handleName"
            :post_at="postData.post_at"
            :photo="postData.photo"
            :postId="postData.postId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import Modal from "../components/EditModal.vue"
const db = firebase.firestore()

export default {
  data() {
    return {
      handleName: "",
      gethandleName: "",
      error: false,
      getScreenName: "",
      isEditing: false,
      //-------投稿を配列にする-----
      posts: [],
      index: 0,
      postId: "",

      postData: {
        title: "",
        text: "",
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
      },
      showContent: false,
    }
  },
  components: {
    Modal,
  },
  created: function () {
    firebase.auth().onAuthStateChanged(async (user) => {
      const userDoc = await db.collection("users").doc(user.uid).get()
      if (userDoc.exists) {
        const docRef = db.collection("users").doc(user.uid)
        docRef.get().then(async (doc) => {
          this.gethandleName = doc.data().handleName
          const postRef = await db
            .collection("posts")
            .where("screen_name", "==", `${doc.data().screen_name}`)
            .orderBy("post_at")
            .get()
          this.index = postRef.size
          postRef.forEach((postdoc) => {
            const post = postdoc.data()
            //ドキュメントID取得
            post.postId = postdoc.id
            // 投稿時間を取得し文字列にし、不必要な部分をカット
            const getpostedTime = post.post_at.toDate()
            const strigTime = String(getpostedTime)
            post.postedTime = strigTime.slice(0, -20)
            //post.textを改行
            post.uploadText = post.text.replaceAll("\\n", "\n")

            //posts配列にいれる
            this.posts.unshift(post)
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
    deletePost(index) {
      const result = window.confirm("この投稿を削除しますか？")
      if (result) {
        const docPath = this.posts[index].postId
        db.collection("posts")
          .doc(`${docPath}`)
          .delete()
          .then(() => {
            this.posts.splice(index, 1)
          })
      }
    },
    editPost(index) {
      const PD = this.postData
      const p = this.posts[index]
      // データを子に送るために変換
      PD.title = p.title
      PD.text = p.uploadText
      PD.infection = p.infection
      console.log(this.postData.infection)
      PD.vaccine = p.vaccine
      PD.illLevel = p.illLevel
      PD.fever = p.fever
      PD.soreThroat = p.soreThroat
      PD.respiratoryOrgan = p.respiratoryOrgan
      PD.diarrhea = p.diarrhea
      PD.headache = p.headache
      PD.tasteOrDisappearance = p.tasteOrDisappearance
      PD.other = p.other
      PD.postId = p.postId
      PD.screen_name = p.screen_name
      PD.handleName = p.handleName
      PD.post_at = p.post_at
      PD.photo = p.photo
      this.showContent = true
    },
    closeModal() {
      this.showContent = false
    },
    enterPost() {
      // const docPath = this.posts[index].postId
      // console.log(docPath)
      // db.collection("posts").set({
      //   title: "oatethaotheoaeothaeotoehtahtoetehtahetoh",
      // })
      // this.showContent = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/_reset.scss";

$btn-color: linear-gradient(to right, #7dbaf3, #386de0);

.wrapper {
  max-width: 1024px;
  margin: 0 auto;
}
.prof {
  padding: 10% 10% 5%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1.5px #000 solid;
  user-select: none;
  .img {
    width: 30%;
    .photo {
      margin-left: 5%;
      width: 170px;
      height: 170px;
      border: 1px solid rgb(151, 151, 151);
      border-radius: 50%;
    }
  }
  .text {
    width: 65%;
    .ttl {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .nickname {
      margin: 10px 0;
      font-size: 2.5rem;
      font-weight: bold;
      // color: rgb(0, 140, 255);
    }
    .inputbtn {
      display: flex;
      .change-nickname {
        border: 1px solid rgb(0, 110, 255);
        border-radius: 30px;
        font-size: 1.75rem;
        width: 70%;
        height: 50px;
        padding: 5px;
      }

      .btn {
        margin-left: 2.5%;
        width: 25%;
        height: 47px;
        background: $btn-color;
        color: #fff;
        border-radius: 10px;
        display: block;
        text-align: center;
        line-height: 47px;
        font-size: 1.25rem;
        font-weight: bold;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        user-select: none;
        cursor: pointer;
      }
    }
  }
}
.mypost {
  .post {
    border: 4px solid rgb(206, 242, 252);
    border-radius: 20px;
    box-shadow: 10px 10px 5px 0px rgba(100, 100, 100, 0.6);
    margin: 35px;
    padding: 15px;
    background-color: #fff;
    .status {
      display: flex;
      justify-content: space-between;
      .flex {
        display: flex;
        position: relative;
        .ttl {
          font-weight: bold;
          font-size: 1.25rem;
          margin: 5px;
        }
        .level {
          font-size: 1.25rem;
          margin: 5px;
          span {
            font-weight: bold;
            color: red;
            margin-left: 5px;
          }
        }
      }
      .time {
        margin: 5px;
        font-weight: 500;
        color: rgb(151, 151, 151);
      }
    }
    .text {
      padding: 0 0 10px;
      line-height: 1.5;
      letter-spacing: 2px;
      font-size: 1rem;
      white-space: pre-wrap;
    }
    .tag {
      display: flex;
      flex-wrap: wrap;
      font-weight: 500;
      color: rgb(0, 140, 255);
      margin: 10px 0;
      li {
        margin-right: 10px;
      }
    }
    .post-btns {
      display: flex;
      flex-direction: row-reverse;
      .post-btn {
        width: 2rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        background-color: rgb(162, 255, 243);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.24);
        border-radius: 50%;
        cursor: pointer;
        user-select: none;
        margin-right: 0.5rem;
        transition: 0.3s;
        &:hover {
          transform: scale(1.3) translateY(-5px);
        }
      }
    }
  }
}
</style>
