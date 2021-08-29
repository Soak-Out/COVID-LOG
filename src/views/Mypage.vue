<template>
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
      <div
        v-for="(post, postnumber) in posts"
        v-bind:key="postnumber"
        class="post"
      >
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
        <div class="text">{{ post.text }}</div>
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
            const getpostedTime = post.post_at.toDate()
            const strigTime = String(getpostedTime)
            const postedTime = strigTime.slice(0, -20)
            console.log(postedTime)
            post.postedTime = postedTime
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
    background-color: rgb(241, 253, 255);
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
  }
}
</style>
