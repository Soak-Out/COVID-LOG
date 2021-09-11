<template>
  <div class="wrapper">
    <div class="side-wrapper">
      <aside class="sidebar">
        <div>
          <div class="pcarraybox">
            <div class="searchIcon">並び替え</div>
            <div class="check-block">
              <ul class="attribute">
                <li>
                  <label for="newarray">
                    <input
                      type="radio"
                      id="newarray"
                      name="pcarraypost"
                      v-on:change="pconChange"
                      value="新着"
                      checked="checked"
                    />新着</label
                  >
                </li>
                <li>
                  <label for="usefularray">
                    <input
                      type="radio"
                      id="usefularray"
                      name="pcarraypost"
                      v-on:change="pconChange"
                      value="役に立った"
                    />「役に立った」順</label
                  >
                </li>
              </ul>
            </div>

            <div class="check-list">
              <div>
                <div class="searchIcon">詳細検索</div>
                <div class="block-ttl">属性</div>
                <div class="check-block">
                  <ul class="attribute">
                    <li>
                      <input
                        type="radio"
                        id="infection"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="感染記録"
                      /><label for="infection">感染記録</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="vaccine"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="ワクチン接種記録"
                      /><label for="vaccine">ワクチン接種記録</label>
                    </li>
                  </ul>
                </div>
                <div class="block-ttl">重症度</div>

                <div class="illlevelbutton">
                  <ul class="tag">
                    <li>
                      <input
                        type="radio"
                        id="illLevel1"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="lv1"
                      /><label for="illLevel1">１</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="illLevel2"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="lv2"
                      /><label for="illLevel2">２</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="illLevel3"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="lv3"
                      /><label for="illLevel3">３</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="illLevel4"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="lv4"
                      /><label for="illLevel4">４</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="illLevel5"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="lv5"
                      /><label for="illLevel5">５</label>
                    </li>
                  </ul>
                </div>

                <div class="check-block"></div>
              </div>
              <div>
                <div class="block-ttl">症状</div>
                <div class="check-block">
                  <ul class="tag">
                    <li>
                      <input type="radio" id="fever" name="pcarraypost" /><label
                        for="fever"
                        v-on:change="pconChange"
                        value="発熱"
                        >発熱</label
                      >
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="headache"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="頭痛"
                      /><label for="headache">頭痛</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="soreThroat"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="喉の渇き"
                      /><label for="soreThroat">喉の渇き</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="respiratoryOrgan"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="呼吸困難"
                      /><label for="respiratoryOrgan">呼吸困難</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="diarrhea"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="下痢"
                      /><label for="diarrhea">下痢</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="tasteOrDisappearance"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="味覚などの異常"
                      /><label for="tasteOrDisappearance">味覚などの異常</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="other"
                        name="pcarraypost"
                        value="その他"
                        v-on:change="pconChange"
                      /><label for="other">その他</label>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div class="block-ttl">年齢</div>
                <div class="check-block">
                  <ul class="attribute">
                    <li>
                      <input type="radio" id="u10" name="pcarraypost" /><label
                        for="u10"
                        v-on:change="pconChange"
                        value="10歳未満"
                        >10歳未満</label
                      >
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a10"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="10代"
                      /><label for="a10">10代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a20"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="20代"
                      /><label for="a20">20代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a30"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="30代"
                      /><label for="a30">30代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a40"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="40代"
                      /><label for="a40">40代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a50"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="50代"
                      /><label for="a50">50代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a60"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="60代"
                      /><label for="a60">60代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a70"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="70代"
                      /><label for="a70">70代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a80"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="80代"
                      /><label for="a80">80代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a90"
                        name="pcarraypost"
                        v-on:change="pconChange"
                        value="90代"
                      /><label for="a90">90代</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="searchIcon pcnotshow" @click="showArray">
            並び替え・詳細検索
          </div>
          <div
            class="pharraybox"
            v-bind:class="arrayActive"
            v-if="showarraybox"
          >
            <div class="searchIcon">並び替え</div>
            <div class="check-block">
              <ul class="attribute">
                <li>
                  <label for="newarray">
                    <input
                      type="radio"
                      id="newarray"
                      name="pharraypost"
                      v-on:change="phonChange"
                      value="新着"
                    />新着</label
                  >
                </li>
                <li>
                  <label for="usefularray">
                    <input
                      type="radio"
                      id="usefularray"
                      name="pharraypost"
                      v-on:change="phonChange"
                      value="役に立った"
                    />「役に立った」順</label
                  >
                </li>
              </ul>
            </div>

            <div class="check-list">
              <div>
                <div class="searchIcon">詳細検索</div>
                <div class="block-ttl">属性</div>
                <div class="check-block">
                  <ul class="attribute">
                    <li>
                      <input
                        type="radio"
                        id="infection"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="感染記録"
                      /><label for="infection">感染記録</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="vaccine"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="ワクチン接種記録"
                      /><label for="vaccine">ワクチン接種記録</label>
                    </li>
                  </ul>
                </div>
                <div class="block-ttl">重症度</div>

                <div class="check-block">
                  <div class="illlevelbutton">
                    <ul class="attribute">
                      <li>
                        <input
                          type="radio"
                          id="illLevel1"
                          name="pharraypost"
                          v-on:change="phonChange"
                          value="lv1"
                        /><label for="illLevel1">１</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="illLevel2"
                          name="pharraypost"
                          v-on:change="phonChange"
                          value="lv2"
                        /><label for="illLevel2">２</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="illLevel3"
                          name="pharraypost"
                          v-on:change="phonChange"
                          value="lv3"
                        /><label for="illLevel3">３</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="illLevel4"
                          name="pharraypost"
                          v-on:change="phonChange"
                          value="lv4"
                        /><label for="illLevel4">４</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="illLevel5"
                          name="pharraypost"
                          v-on:change="phonChange"
                          value="lv5"
                        /><label for="illLevel5">５</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div class="block-ttl">症状</div>
                <div class="check-block">
                  <ul class="attribute">
                    <li>
                      <input type="radio" id="fever" name="pharraypost" /><label
                        for="fever"
                        v-on:change="phonChange"
                        value="発熱"
                        >発熱</label
                      >
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="headache"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="頭痛"
                      /><label for="headache">頭痛</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="soreThroat"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="喉の渇き"
                      /><label for="soreThroat">喉の渇き</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="respiratoryOrgan"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="呼吸困難"
                      /><label for="respiratoryOrgan">呼吸困難</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="diarrhea"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="下痢"
                      /><label for="diarrhea">下痢</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="tasteOrDisappearance"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="味覚などの異常"
                      /><label for="tasteOrDisappearance">味覚などの異常</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="other"
                        name="pharraypost"
                        value="その他"
                        v-on:change="phonChange"
                      /><label for="other">その他</label>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div class="block-ttl">年齢</div>
                <div class="check-block">
                  <ul class="attribute">
                    <li>
                      <input type="radio" id="u10" name="pharraypost" /><label
                        for="u10"
                        v-on:change="phonChange"
                        value="10歳未満"
                        >10歳未満</label
                      >
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a10"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="10代"
                      /><label for="a10">10代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a20"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="20代"
                      /><label for="a20">20代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a30"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="30代"
                      /><label for="a30">30代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a40"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="40代"
                      /><label for="a40">40代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a50"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="50代"
                      /><label for="a50">50代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a60"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="60代"
                      /><label for="a60">60代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a70"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="70代"
                      /><label for="a70">70代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a80"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="80代"
                      /><label for="a80">80代</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="a90"
                        name="pharraypost"
                        v-on:change="phonChange"
                        value="90代"
                      /><label for="a90">90代</label>
                    </li>
                  </ul>
                </div>
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
      arrayActive: "",
      handleName: "",
      illLevel: 1,
      showarraybox: false,
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

    this.arrayActive = ".pcnotshow"
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
  methods: {
    //詳細検索の表示非表示
    showArray() {
      this.showarraybox = !this.showarraybox
    },
    //いいね
    StarButton(index) {
      if (this.$refs[index][0].$data.active === false) {
        this.usefulButton(index)
      } else {
        this.NOTusefulButton(index)
      }
    },
    //役に立った
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
    //PC並び替え
    phonChange(event) {
      if (event.target.value === "新着") {
        this.posts = []
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
      } else if (event.target.value === "役に立った") {
        this.posts = []
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

                  this.posts.sort((a, b) => {
                    return b.starCount - a.starCount
                  })
                  //ソートの中身が正の数か負の数かで動きが変わる
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
      } else if (event.target.value === "感染記録") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("infection", "==", true)

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
      } else if (event.target.value === "ワクチン接種記録") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("vaccine", "==", true)

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
      } else if (event.target.value === "発熱") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("fever", "==", true)

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
      } else if (event.target.value === "頭痛") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("headache", "==", true)

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
      } else if (event.target.value === "喉の渇き") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("soreThroat", "==", true)

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
      } else if (event.target.value === "呼吸困難") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("respiratoryOrgan", "==", true)

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
      } else if (event.target.value === "下痢") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("diarrhea", "==", true)

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
      } else if (event.target.value === "味覚などの異常") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("tasteOrDisappearance", "==", true)

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
      } else if (event.target.value === "その他") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("other", "==", true)

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
      } else if (event.target.value === "lv1") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("illLevel", "==", "1")

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
      } else if (event.target.value === "lv2") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("illLevel", "==", "2")

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
      } else if (event.target.value === "lv3") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("illLevel", "==", "3")

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
      } else if (event.target.value === "lv4") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("illLevel", "==", "4")

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
      } else if (event.target.value === "lv5") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("illLevel", "==", "5")

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
      } else if (event.target.value === "10歳未満") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "10歳未満")

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
      } else if (event.target.value === "10代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "10代")

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
      } else if (event.target.value === "20代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "20代")

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
      } else if (event.target.value === "30代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "30代")

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
      } else if (event.target.value === "40代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "40代")

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
      } else if (event.target.value === "50代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "50代")

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
      } else if (event.target.value === "60代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "60代")

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
      } else if (event.target.value === "70代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "70代")

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
      } else if (event.target.value === "80代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "80代")

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
      } else if (event.target.value === "90代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "90代")

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
      }
    },
    //PH並び替え
    pconChange(event) {
      if (event.target.value === "新着") {
        this.posts = []
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
      } else if (event.target.value === "役に立った") {
        this.posts = []
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

                  this.posts.sort((a, b) => {
                    return b.starCount - a.starCount
                  })
                  //ソートの中身が正の数か負の数かで動きが変わる
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
      } else if (event.target.value === "感染記録") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("infection", "==", true)

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
      } else if (event.target.value === "ワクチン接種記録") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("vaccine", "==", true)

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
      } else if (event.target.value === "発熱") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("fever", "==", true)

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
      } else if (event.target.value === "頭痛") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("headache", "==", true)

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
      } else if (event.target.value === "喉の渇き") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("soreThroat", "==", true)

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
      } else if (event.target.value === "呼吸困難") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("respiratoryOrgan", "==", true)

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
      } else if (event.target.value === "下痢") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("diarrhea", "==", true)

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
      } else if (event.target.value === "味覚などの異常") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("tasteOrDisappearance", "==", true)

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
      } else if (event.target.value === "その他") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("other", "==", true)

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
      } else if (event.target.value === "lv1") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("illLevel", "==", "1")

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
      } else if (event.target.value === "lv2") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("illLevel", "==", "2")

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
      } else if (event.target.value === "lv3") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("illLevel", "==", "3")

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
      } else if (event.target.value === "lv4") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("illLevel", "==", "4")

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
      } else if (event.target.value === "lv5") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("illLevel", "==", "5")

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
      } else if (event.target.value === "10歳未満") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "10歳未満")

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
      } else if (event.target.value === "10代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "10代")

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
      } else if (event.target.value === "20代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "20代")

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
      } else if (event.target.value === "30代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "30代")

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
      } else if (event.target.value === "40代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "40代")

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
      } else if (event.target.value === "50代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "50代")

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
      } else if (event.target.value === "60代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "60代")

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
      } else if (event.target.value === "70代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "70代")

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
      } else if (event.target.value === "80代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "80代")

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
      } else if (event.target.value === "90代") {
        this.posts = []
        firebase.auth().onAuthStateChanged(async (user) => {
          const userDoc = await db.collection("users").doc(user.uid).get()
          if (userDoc.exists) {
            const docRef = db
              .collection("users")

              .doc(user.uid)

            docRef
              .get()

              .then(async (doc) => {
                const postRef = await db
                  .collection("posts")
                  .where("age", "==", "90代")

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
.illlevelbutton {
  margin-left: 3rem;
}
.pcnotshow {
  display: none;
}
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
      margin: auto;
      padding: 2rem 1rem;
      display: table;
      li {
        margin: auto;
        margin-bottom: 0.5rem;
        width: 50%;
        input {
          margin-right: 0.5rem;
          cursor: pointer;
        }
      }
    }
  }
}
.severity {
  margin: auto;
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
    margin: auto;
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
}
.pcnotshow {
  display: none;
}

.check-block {
  margin: 2rem 3rem 2rem 3rem;
  line-height: 2;
}

.pcarraybox {
  display: block;
}
.pharraybox {
  display: none;
}
@media screen and (max-width: 1024px) {
  .pcnotshow {
    display: block;
    cursor: pointer;
  }
  .wrapper {
    flex-direction: column;
  }
  .side-wrapper {
    width: 100%;
    border-right: none;
    margin-top: 1.5rem;
    text-align: center;
  }
  .post-list {
    margin: auto;
    width: 100%;
  }
  .post {
    border: 3px solid $main-color;
    border-radius: 10px;
    margin-top: 3rem;
    position: relative;
    margin: 2rem;
    text-align: center;
  }
  .block-ttl {
    margin: auto;
    margin-top: 2rem;
    margin-left: 8rem;
  }
  .severity {
    margin: auto;
  }
  .searchIcon {
    margin: auto;
    margin-top: 2rem;
  }
  li {
    text-align: left;
    margin: auto;
  }
  .pcarraybox {
    display: none;
  }
  .pharraybox {
    display: block;
    border: 3px solid $sub-color;
    border-radius: 10px;
    margin-top: 3rem;
  }

  .inner {
    margin: auto;
  }
  .time {
    display: none;
  }
  .post-detail {
    display: flex;
    flex-wrap: wrap;
    font-size: 0.3rem;
    padding-left: 0.3rem;
    span,
    div {
      margin-left: 0.5rem;
    }
    span:first-of-type {
      font-weight: bold;
    }
  }
  .attribute {
    margin: auto;
    padding: 2rem 1rem;
    display: table;
  }
  .illlevelbutton {
    margin-left: auto;
    padding-right: 6rem;
  }
}

@media screen and (max-width: 767px) {
  .illlevelbutton {
    margin-left: auto;
  }
  .attribute {
    margin: auto;
    padding: 2rem 1rem;
    display: table;
  }
  .post-detail {
    display: flex;
    flex-wrap: wrap;
    font-size: 0.3rem;
    padding-left: 0.3rem;
    span,
    div {
      margin-left: 0.5rem;
    }
    span:first-of-type {
      font-weight: bold;
    }
  }
  .inner {
    margin: auto;
  }
  .time {
    display: none;
  }
  .pcarraybox {
    display: none;
  }
  .pharraybox {
    display: block;
    border: 3px solid $sub-color;
    border-radius: 10px;
    margin-top: 3rem;
  }
  .pcnotshow {
    display: block;
    cursor: pointer;
  }
  .wrapper {
    flex-direction: column;
  }
  .side-wrapper {
    width: 100%;
    border-right: none;
    margin-top: 1.5rem;
    text-align: center;
  }
  .post-list {
    margin: auto;
    width: 100%;
  }
  .post {
    border: 3px solid $main-color;
    border-radius: 10px;
    margin-top: 3rem;
    position: relative;
    margin: 2rem;
    text-align: center;
  }
  .block-ttl {
    margin: auto;
    margin-top: 2rem;
    margin-left: 8rem;
  }
  .severity {
    margin: auto;
  }
  .searchIcon {
    margin: auto;
    margin-top: 2rem;
  }
  li {
    text-align: left;
    margin: auto;
  }
}
</style>
