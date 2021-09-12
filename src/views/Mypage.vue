<template>
  <div class="wrapper">
    <aside class="sidebar">
      <div class="prof">
        <img :src="user.photoURL" />
        <router-link to="/mypage" class="name">
          {{ gethandleName }}</router-link
        >
      </div>
      <div class="change-name">
        <input
          type="text"
          v-model="handleName"
          id="change"
          placeholder="ニックネーム変更"
          class="inname"
        />

        <div @click="newName" class="btn">変更</div>
      </div>
    </aside>

    <div class="posts">
      <div class="inner">
        <div class="tabs">
          <div
            @click="MyPostTab"
            :class="{ tabActive: hiddenMyLiked }"
            class="tab"
          >
            あなたの投稿
          </div>
          <span class="solid">｜</span>
          <div
            @click="MyLikedTab"
            :class="{ tabActive: hiddenMyPost }"
            class="tab"
          >
            いいねした投稿
          </div>
        </div>

        <!-- あなたの投稿 -->
        <div class="mypost" :class="{ hidden: hiddenMyPost }">
          <div v-if="myposts.length">
            <div
              v-for="(post, index) in myposts"
              v-bind:key="index"
              class="post"
            >
              <div class="time">{{ post.postedTime }}</div>
              <div class="post-info">
                <div class="img-age">
                  <img :src="user.photoURL" />
                  <div class="age">{{ post.age }}</div>
                </div>
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
                  <font-awesome-icon slot="icon" icon="heart" class="like" />{{
                    post.starCount
                  }}
                  <div @click="deletePost(index)">
                    <font-awesome-icon
                      slot="icon"
                      icon="trash"
                      class="delete-btn"
                    />
                  </div>
                  <div @click="editPost(index)" class="edit-btn">
                    <font-awesome-icon slot="icon" icon="pen" />
                  </div>
                </div>
              </div>

              <modal
                v-if="showContent"
                @close="closeModal"
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
                :starCount="postData.starCount"
                :age="postData.age"
              />
            </div>
          </div>
          <div v-else class="nopost-msg">
            <p>投稿がありません</p>
            <router-link to="/post-page">投稿する</router-link>
          </div>
        </div>

        <!-- いいねした投稿 -->
        <div class="myliked" :class="{ hidden: hiddenMyLiked }">
          <div v-if="starPosts.length">
            <div
              v-for="(post, index) in starPosts"
              v-bind:key="index"
              class="post"
            >
              <div class="time">{{ post.postedTime }}</div>
              <div class="post-info">
                <div class="img-age">
                  <img :src="post.photo" />
                  <div class="age">{{ post.age }}</div>
                </div>

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
                      class="heart"
                    />
                  </vue-star>
                  {{ post.starCount }}
                </div>
              </div>
            </div>
          </div>
          <div v-else class="nopost-msg">
            <p>いいねした投稿がありません</p>
            <router-link to="/covidList">投稿一覧ページへ</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import Modal from "../components/EditModal.vue"
import Vue from "vue"

const db = firebase.firestore()

export default {
  data() {
    return {
      //-----nickname----------
      handleName: "",
      gethandleName: "",
      error: false,
      getScreenName: "",
      //-------投稿を配列にする-----
      myposts: [],
      //----いいね-----
      starPosts: [],
      isActive: [],

      //--------コンポーネントに渡すData----
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
      //---------modalを表示---------
      showContent: false,
      //--------tab--------
      hiddenMyPost: false,
      hiddenMyLiked: true,
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
        docRef
          .get()
          .then(async (doc) => {
            this.gethandleName = doc.data().handleName
            const postRef = await db
              .collection("posts")
              // .where("screen_name", "==", `${doc.data().screen_name}`)
              .orderBy("post_at")
              .get()
            this.starpost = doc.data().star_post_id
            this.mypost = doc.data().screen_name

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
              if (this.mypost === post.screen_name) {
                this.myposts.unshift(post)
              }
              for (let i = 0; i < this.starpost.length; i++) {
                if (post.postId === this.starpost[i]) {
                  this.starPosts.unshift(post)
                }
              }
            })
          })

          .then(() => {
            for (let i = 0; i < this.starpost.length; i++) {
              for (let j = 0; j < this.starPosts.length; j++) {
                if (this.starPosts[j].postId === this.starpost[i]) {
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
        const docPath = this.myposts[index].postId
        db.collection("posts")
          .doc(`${docPath}`)
          .delete()
          .then(() => {
            this.myposts.splice(index, 1)
          })
      }
    },
    editPost(index) {
      const PD = this.postData
      const p = this.myposts[index]
      // データを子に送るために変換
      PD.title = p.title
      PD.text = p.uploadText
      PD.infection = p.infection
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
      PD.starCount = p.starCount
      PD.age = p.age
      this.showContent = true
    },
    closeModal() {
      this.showContent = false
    },
    MyPostTab() {
      this.hiddenMyPost = false
      this.hiddenMyLiked = true
    },
    MyLikedTab() {
      this.hiddenMyPost = true
      this.hiddenMyLiked = false
    },
    StarButton(index) {
      if (this.$refs[index][0].$data.active === false) {
        this.usefulButton(index)
      } else {
        this.NOTusefulButton(index)
      }
    },
    usefulButton(index) {
      const docPath = this.starPosts[index].postId
      if (this.user.uid) {
        db.collection("posts")
          .doc(`${docPath}`)
          .update({
            starCount: firebase.firestore.FieldValue.increment(1),
          })
        this.starPosts[index].starCount += 1

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
      const docPath = this.starPosts[index].postId
      if (this.user.uid) {
        db.collection("posts")
          .doc(`${docPath}`)
          .update({
            starCount: firebase.firestore.FieldValue.increment(-1),
          })
        this.starPosts[index].starCount -= 1

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

$main-color: #9ad5ff;
$sub-color: #4986e1;
$btn-color: rgb(4, 163, 255);

.wrapper {
  max-width: 1420px;
  display: flex;
  margin: 0 auto;
}
.hidden {
  display: none;
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
      margin-bottom: 0.625rem;
    }
  }
  .change-name {
    text-align: left;
    display: flex;
    margin-bottom: 4rem;
    .inname {
      width: 169px;
      height: 27px;
      margin-left: 25%;
      border: 3px solid $main-color;
      border-radius: 10px;
      padding-left: 0.25rem;
    }
    .btn {
      width: 12%;
      height: 27px;
      line-height: 27px;
      text-align: center;
      margin-left: 0.625rem;
      background-color: $btn-color;
      color: #fff;
      border-radius: 10px;
      cursor: pointer;
      @media screen and (max-width: 400px) {
        min-width: 3rem;
        font-size: 0.9rem;
      }
    }
  }
}
.posts {
  width: calc(200% / 3);
  .inner {
    margin: 3rem 10% 91px;
  }
  .tabs {
    width: 100%;
    display: flex;
    justify-content: center;
    .tab {
      font-size: 1.5rem;
      text-align: center;
      width: 40%;
      cursor: pointer;
    }
    span {
      font-size: 1.5rem;
    }
    .tabActive {
      color: $sub-color;
      position: relative;
      &::after {
        position: absolute;
        bottom: -5%;
        left: 0;
        content: "";
        width: 100%;
        height: 2px;
        background: $main-color;
      }
    }
  }
}
//extend--------------------ここから
.extendpost {
  border: 3px solid $main-color;
  border-radius: 10px;
  margin-top: 3rem;
  position: relative;
  .time {
    position: absolute;
    height: 20px;
    top: 1%;
    right: 1%;
  }
  .post-info {
    display: flex;
    .img-age {
      position: relative;
      margin: 3%;
      img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
      .age {
        position: absolute;
        line-height: 1rem;
        top: 3.25rem;
        right: 0.5rem;
      }
    }
    .post-status {
      margin: 3% 10% 1.45rem 0%;
      width: 100%;
      .ttl {
        padding-left: 0.5rem;
        padding-bottom: 0.5rem;
        margin-bottom: 0.5rem;
        border-bottom: 2px solid $main-color;
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
    font-size: 1rem;
    // font-weight: bold;
    margin: 0 8% 1rem;
    white-space: pre-wrap;
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
        padding-right: 5%;
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

      .like {
        margin: 0.1rem 0.5rem 0 0;
        vertical-align: bottom;
        z-index: 2;
      }
      .delete-btn,
      .edit-btn {
        margin-top: 0.05rem;
        margin-left: 1rem;
        color: $btn-color;
        cursor: pointer;
      }
    }
  }
}
//-----------------------------ここまで

.mypost {
  .post {
    @extend .extendpost;
    .btns {
      .like {
        color: $btn-color;
      }
    }
  }
}

.myliked {
  .post {
    @extend .extendpost;

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
        color: #c4c4c4;
        .heart {
          cursor: pointer;
        }
      }
    }
  }
}

.nopost-msg {
  text-align: center;
  margin-top: 9rem;
  @media screen and (max-width: 1024px) {
    margin-bottom: 2rem;
    margin-top: 3rem;
  }
  p {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    @media screen and (max-width: 400px) {
      font-size: 1rem;
    }
  }
  a {
    display: block;
    padding: 0.5rem;
    background-color: $btn-color;
    width: 12rem;
    margin: 0 auto;
    border-radius: 10px;
    color: #fff;
  }
}
//----------------------------
//SP
//----------------------------

@media screen and (max-width: 1024px) {
  .wrapper {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    border-right: none;
    margin-top: 1.5rem;
    .prof {
      margin: 0 auto;
      img {
        width: 8rem;
        margin-bottom: 1rem;
      }
      .name {
        font-size: 1.25rem;
      }
    }
    .change-name {
      margin: 0 auto;
      justify-content: center;
      margin-bottom: 1rem;
      .inname {
        margin-left: 0;
      }
    }
  }
  //----------------------------
  //tab
  //----------------------------
  .posts {
    width: 100%;
    .inner {
      margin: 4%;
    }
    .tabs {
      .tab,
      span {
        font-size: 1.25rem;
        @media screen and (max-width: 400px) {
          font-size: 1rem;
        }
        @media screen and (max-width: 300px) {
          font-size: 0.9rem;
        }
      }
    }
  }
  .extendpost {
    margin-top: 1rem;
    padding-bottom: 0.5rem;
    .time {
      font-size: 0.75rem;
      top: auto;
      bottom: 0;
      right: 1%;
    }
    .post-info {
      .post-status {
        .ttl {
          font-size: 1rem;
          margin-top: 0.3rem;
          padding-bottom: 0.4rem;
          margin-bottom: 0.4rem;
        }
        .post-detail {
          font-size: 0.75rem;
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
      margin: 0 5%;
    }
  }
}
</style>
