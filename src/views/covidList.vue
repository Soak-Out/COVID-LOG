<template>
  <div class="wrapper">
    <div class="side-wrapper">
      <aside class="sidebar">
        <div>
          <div>
            <div class="searchIcon">並び替え</div>
            <div class="check-block">
              <ul class="attribute">
                <li>
                  <input
                    type="checkbox"
                    v-model="newarray"
                    id="newarray"
                  /><label for="newarray">新着</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    v-model="usefularray"
                    id="usefularray"
                  /><label for="usefularray">「役に立った」順</label>
                </li>
              </ul>
            </div>
          </div>
          <div class="check-list">
            <div>
              <div class="searchIcon">詳細検索</div>
              <div class="block-ttl">属性</div>
              <div class="check-block">
                <ul class="attribute">
                  <li>
                    <input
                      type="checkbox"
                      v-model="infection"
                      id="infection"
                    /><label for="infection">感染記録</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      v-model="vaccine"
                      id="vaccine"
                    /><label for="vaccine">ワクチン接種記録</label>
                  </li>
                </ul>
              </div>
              <div class="block-ttl">重症度</div>
              <div class="check-block">
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
            </div>
            <div>
              <div class="block-ttl">症状</div>
              <div class="check-block">
                <ul class="tag">
                  <li>
                    <input type="checkbox" v-model="fever" id="fever" /><label
                      for="fever"
                      >発熱</label
                    >
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      v-model="headache"
                      id="headache"
                    /><label for="headache">頭痛</label>
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
                    <input
                      type="checkbox"
                      v-model="diarrhea"
                      id="diarrhea"
                    /><label for="diarrhea">下痢</label>
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
          </div>
        </div>
      </aside>
    </div>
    <div class="post-list">
      <div class="inner">
        <div class="list-ttl">投稿一覧</div>
        <div v-for="(post, index) in posts" v-bind:key="index" class="post">
          <div class="time">{{ post.postedTime }}</div>
          <div class="post-info">
            <img :src="post.photo" />

            <div class="post-status">
              <div class="ttl">{{ post.title }}</div>
              <div class="post-detail">
                <div>
                  重症度<span>{{ post.illLevel }}</span>
                </div>
                <span>｜</span>
                <div v-show="post.infection">感染記録</div>
                <span v-show="post.infection">｜</span>
                <div v-show="post.vaccine">ワクチン接種記録</div>
                <span v-show="post.vaccine">｜</span>
                <div class="handle-name">{{ post.handleName }} さん</div>
              </div>
            </div>
          </div>

          <div class="text">{{ post.uploadText }}</div>

          <div class="sub-info">
            <div class="tags">
              <ul>
                <p>症状：</p>
                <li v-show="post.headache">#頭痛</li>
                <li v-show="post.fever">#発熱</li>
                <li v-show="post.respiratoryOrgan">#呼吸困難</li>
                <li v-show="post.soreThroat">#喉の渇き</li>
                <li v-show="post.tasteOrDisappearance">#味覚などの異常</li>
                <li v-show="post.diarrhea">#下痢</li>
                <li v-show="post.other">#その他</li>
              </ul>
            </div>

            <div class="btns">
              <vue-star
                animate="animated rubberBand"
                color="#F05654"
                :ref="`${index}`"
                class="like"
              >
                <font-awesome-icon
                  slot="icon"
                  icon="heart"
                  @click="StarButton(index)"
                />
              </vue-star>
              {{ post.starCount }}
            </div>
          </div>
        </div>
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
$main-color: #9ad5ff;
$sub-color: #4986e1;

$btn-color: linear-gradient(to right, #7dbaf3, #386de0);
.sidebar {
  margin: 2rem;
}
.side-wrapper {
  width: calc(100% / 3);
  border-right: 1px solid #c4c4c4;
}
.wrapper {
  max-width: 1420px;
  display: flex;
}
.inner {
  margin: 61px 10% 91px;
}

.post-list {
  width: calc(200% / 3);
}
.list-ttl {
  width: 100px;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
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
.post {
  border: 3px solid $main-color;
  border-radius: 10px;
  margin-top: 3rem;
  position: relative;
  margin: 3rem;

  .time {
    position: absolute;
    height: 20px;
    top: 1%;
    right: 1%;
  }
  .post-info {
    display: flex;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 3%;
    }
    .post-status {
      margin: 3% 10% 1.45rem 0%;
      width: 100%;
      .ttl {
        font-size: 1rem;
        padding-left: 0.5rem;
        padding-bottom: 0.875rem;
        margin-bottom: 0.875rem;
        border-bottom: 3px solid $main-color;
      }
      .post-detail {
        display: flex;
        flex-wrap: wrap;
        font-size: 0.875rem;
        padding-left: 0.5rem;
        span,
        div {
          margin-left: 0.5rem;
        }
        span:first-of-type {
          font-weight: bold;
        }
      }
    }
  }
  .text {
    font-size: 0.875rem;
    margin: 0 8% 1rem;
  }
  .sub-info {
    margin: 1rem 8% 1rem 5%;
    display: flex;
    .tags {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      font-size: 14px;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding-right: 3rem;
        li {
          margin-left: 0.5rem;
          color: $sub-color;
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
    .btns {
      display: flex;
      position: relative;
      width: 10px;
      height: 10px;

      .like {
        margin: 0.1rem 0.5rem 0 4rem;
        position: absolute;
        bottom: -490%;
        right: -350%;
      }
      .delete-btn,
      .edit-btn {
        margin-top: 0.05rem;
        margin-left: 1rem;
        color: $main-color;
        cursor: pointer;
      }
    }
  }
}
.check-list {
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
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #53aeff;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  }
  &::-moz-range-thumb {
    background: #53aeff;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
    border: none;
  }
  &::-moz-focus-outer {
    border: 0;
  }
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
.searchIcon {
  width: 230px;
  height: 49px;
  line-height: 49px;
  font-size: 1.125rem;
  display: block;
  text-align: center;
  margin: 2rem;
  color: #fff;
  background-color: $main-color;

  user-select: none;
  cursor: pointer;
}

.check-block {
  margin: 2rem 3rem 2rem 3rem;
  line-height: 2;
}
</style>
