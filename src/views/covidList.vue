<template>
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
        <li v-show="post.tasteOrDisappearance">#味覚などの異常</li>
        <li v-show="post.diarrhea">#下痢</li>
        <li v-show="post.other">#その他</li>
      </ul>

      <div class="text">{{ post.uploadText }}</div>
      <div class="post-btns">
        <div
          v-if="isActive[index]"
          @click="NOTusefulButton(index)"
          class="star-btn"
        >
          💖{{ post.starCount }}
        </div>
        <div
          v-if="!isActive[index]"
          @click="usefulButton(index)"
          class="star-btn"
        >
          🤍{{ post.starCount }}
        </div>
        <!-- <div @click="deletePost(index)" class="post-btn">🗑</div>
        <div @click="editPost(index)" class="post-btn">🖋</div> -->
      </div>
    </div>
  </div>
</template>
<script>
// import InfiniteLoading from "vue-infinite-loading"
import firebase from "firebase"
import Vue from "vue"
const db = firebase.firestore()

export default {
  data() {
    return {
      posts: [],
      isActive: [],
      // starCount: 0,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      const userDoc = await db.collection("users").doc(user.uid).get()
      if (userDoc.exists) {
        const docRef = db.collection("users").doc(user.uid)

        docRef.get().then(async (doc) => {
          const postRef = await db.collection("posts").orderBy("post_at").get()
          this.starpost = doc.data().star_post_id

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
            //以前にいいねしたか判定
            this.isActive.unshift(false)
            for (let i = 0; i < this.starpost.length; i++) {
              if (post.postId === this.starpost[i]) {
                this.isActive[0] = true
              }
            }
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
    showTags: function () {
      this.isShowTags = !this.isShowTags
    },

    usefulButton(index) {
      const docPath = this.posts[index].postId
      if (this.user.uid) {
        db.collection("posts")
          .doc(`${docPath}`)
          .update({
            starCount: firebase.firestore.FieldValue.increment(1),
          })
        this.posts[index].starCount += 1

        db.collection(`users`)
          .doc(this.user.uid)
          .set(
            {
              star_post_id: firebase.firestore.FieldValue.arrayUnion(
                `${docPath}`
              ),
            },
            { merge: true }
          )
      }
      Vue.set(this.isActive, index, true)
    },
    NOTusefulButton(index) {
      const docPath = this.posts[index].postId
      if (this.user.uid) {
        db.collection("posts")
          .doc(`${docPath}`)
          .update({
            starCount: firebase.firestore.FieldValue.increment(-1),
          })
        this.posts[index].starCount -= 1

        db.collection(`users`)
          .doc(this.user.uid)
          .set(
            {
              star_post_id: firebase.firestore.FieldValue.arrayRemove(
                `${docPath}`
              ),
            },
            { merge: true }
          )
        Vue.set(this.isActive, index, false)
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
      .star-btn {
        width: 5rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        // background-color: rgb(162, 255, 243);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.24);
        border-radius: 50%;
        cursor: pointer;
        user-select: none;
        margin-right: 0.5rem;
        transition: 0.3s;
        // &:hover {
        //   transform: scale(1.3) translateY(-5px);
        // }
      }
    }
  }
}
</style>
