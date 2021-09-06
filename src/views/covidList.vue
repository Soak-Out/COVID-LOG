<template>
  <div class="post-list">
    <div v-for="(post, index) in posts" v-bind:key="index" class="post">
      <div class="status">
        <div class="flex">
          <img :src="post.photo" class="photo" />
          <div class="ttl">{{ post.title }}</div>
          <div class="level">
            重症度<span>Lv.{{ post.illLevel }}</span>
          </div>
          <div class="handle-name">{{ post.handleName }}</div>
        </div>
        <div class="time">{{ post.postedTime }}</div>
      </div>

      <div class="text">{{ post.uploadText }}</div>
      <div class="post-info">
        <div class="post-btns">
          <vue-star
            animate="animated rubberBand"
            color="#F05654"
            :ref="`${index}`"
          >
            <font-awesome-icon
              slot="icon"
              icon="heart"
              @click="StarButton(index)"
            />
          </vue-star>
          {{ post.starCount }}
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
      </div>
    </div>
  </div>
</template>

<script>
// import InfiniteLoading from "vue-infinite-loading"
import firebase from "firebase"

const db = firebase.firestore()

export default {
  data() {
    return {
      posts: [],

      handleName: "",
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      const userDoc = await db.collection("users").doc(user.uid).get()
      if (userDoc.exists) {
        const docRef = db.collection("users").doc(user.uid)

        docRef
          .get()
          .then(async (doc) => {
            const postRef = await db
              .collection("posts")
              .orderBy("post_at")
              .get()
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

              //posts配列にいれる
              this.posts.unshift(post)
            })
          })
          .then(() => {
            for (let i = 0; i < this.starpost.length; i++) {
              for (let j = 0; j < this.posts.length; j++) {
                if (this.posts[j].postId === this.starpost[i]) {
                  // console.log(this.$refs[j])
                  this.$refs[j][0].$data.active = true
                  this.$refs[j][0].$data.toggleAnimate = true
                  this.$refs[j][0].$data.toggleColor = true
                }
              }
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
    StarButton(index) {
      if (this.$refs[index][0].$data.active === false) {
        this.usefulButton(index)
      } else {
        this.NOTusefulButton(index)
      }
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

.post-list {
  .post {
    border: 4px solid rgb(206, 242, 252);
    border-radius: 20px;
    box-shadow: 10px 10px 5px 0px rgba(100, 100, 100, 0.6);
    margin: 35px;
    padding: 15px;
    background-color: #fff;
    .photo {
      width: 3rem;
      height: 3rem;
      border: #ddd 1px solid;
      border-radius: 50%;
    }
    .status {
      display: flex;
      justify-content: space-between;
      .flex {
        display: flex;
        position: relative;
        .ttl {
          height: 2rem;
          line-height: 2rem;
          font-weight: bold;
          font-size: 1.25rem;
          margin: 0 1rem;
        }
        .handle-name {
          @extend .ttl;
          font-weight: normal;
          color: rgb(151, 151, 151);
        }
        .level {
          @extend .handle-name;
          color: #000;
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
      margin: 1rem 0;
      padding: 0 0 10px;
      line-height: 1.5;
      letter-spacing: 2px;
      font-size: 1rem;
      white-space: pre-wrap;
    }

    .post-info {
      display: flex;
      .tag {
        display: flex;
        flex-wrap: wrap;
        font-weight: 500;
        color: rgb(0, 140, 255);
        margin: 10px 0;
        height: 2rem;
        line-height: 2rem;
        li {
          margin-right: 10px;
        }
      }
      .post-btns {
        display: flex;
        flex-direction: row-reverse;
        .star-btn {
          width: 4rem;
          height: 2rem;
          line-height: 2rem;
          text-align: center;
          border-radius: 50%;
          cursor: pointer;
          user-select: none;
          margin: 10px;
        }
      }
    }
  }
}
</style>
