<template>
  <div class="top">
    <div class="middlebox">
      <div class="middlebox-left">
        <img src="../assets/logo.png" class="imgcovid" />
      </div>
      <div class="middlebox-right">
        <div class="copyright">
          このサイトで<br />１人でも<br />多くの人に情報を。
        </div>
        <br />
        <div class="copyunder">
          新型コロナウイルス感染症や<br />ワクチン接種の経験、<br />その予防策を投稿して共有しましょう。<br />
          新型コロナウイルス感染症専門の投稿サイト
        </div>
      </div>
      <!-- <div v-if="isAuth">
          <router-link to="/post-page">投稿する</router-link>
          <router-link to="/covidList">投稿一覧</router-link>
        </div>
        <div v-else class="login-page">
          <a @click="signUp" class="btn">ログイン</a>
        </div> -->
    </div>

    <div class="wrapper">
      <div class="side-wrapper">
        <aside class="sidebar">
          <div class="covidbox">
            <div class="word-ttl">新型コロナウイルス<br />新着情報</div>
            <div class="word-subttl">累計感染者数（昨日時点）</div>
            <div class="patient">
              <div
                v-for="(npatients, index) in reverseItems"
                v-bind:key="index"
              >
                <p v-if="index === 0" class="total">
                  <br /><span>{{ npatients.npatients }}</span
                  >人
                </p>
                <p v-if="index === 0" class="yesterday">
                  昨日+<span>{{ npatients.adpatients }}</span
                  >人
                </p>
                <p v-if="index === 1">
                  一昨日+<span>{{ npatients.adpatients }}</span
                  >人
                </p>
              </div>
            </div>
          </div>

          <div class="mnlink">
            <span
              >※厚生労働省新型コロナウイルス 特設サイトは<a
                href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html"
                class="covidlink"
                >こちら</a
              ></span
            >
          </div>

          <div class="shuffleword">
            <div class="shufflems">{{ message }}</div>
          </div>

          <div class="hpinfo">このサイトについて</div>
        </aside>
      </div>

      <div class="post-list">
        <div class="inner">
          <div class="list-ttl">最近の投稿</div>
          <div v-for="(post, index) in posts" v-bind:key="index" class="post">
            <div class="time">{{ post.postedTime }}</div>
            <div class="post-info">
              <div class="img-age">
                <img :src="post.photo" />
                <div class="age">{{ post.age }}</div>
              </div>
              <div class="post-status">
                <div class="ttl">{{ post.title }}</div>
                <div class="post-detail">
                  <div class="level">
                    重症度<span>Lv.{{ post.illLevel }}</span>
                  </div>
                  <span>｜</span>
                  <div class="handle-name">{{ post.handleName }}</div>
                </div>
              </div>
              <div class="time">{{ post.postedTime }}</div>
            </div>

            <div class="text">{{ post.uploadText }}</div>
            <div class="sub-info">
              <div class="tags">
                <ul>
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
              <div class="btns">
                <font-awesome-icon slot="icon" icon="heart" class="like" />{{
                  post.starCount
                }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="isAuth == false">
          <a @click="signUp" class="btn">ログイン</a>
        </div>
      </div>
    </div>

    <!--  -->

    <!-- </div> -->

    <!-- <div v-else class="login-page">
        <a @click="signUp" class="btn">ログイン</a>
      </div> -->

    <!-- <div class="wordbox">
      <div>ねぎらいの言葉</div>
      <div v-for="word of words ">{{  word  }}</div>
    </div> -->
    <!-- ここが最下層 -->
  </div>
</template>

<script>
import firebase from "firebase"
import "firebase/auth"
const db = firebase.firestore()

export default {
  data() {
    return {
      dates: [0],
      npatients: {},
      words: [
        "「三密」防げましたか？",
        "不要不急の外出は避けましょう。",
        "「ワクチンを優先的に打てる」という新手の詐欺が発生しているようです。情報源には気をつけましょう。",
        "歯磨きも感染症予防に効果的だそうです。予防も兼ねて歯磨きをしましょう！",
        "マスクの上下はプリーツが下に来るようにするのが正解です。あなたは正しくマスクを着けられていますか？",
        "濃厚接触者の定義は「１ｍ以内」で「マスクを着けず」「15分以上」話した人です。人と会う時に意識しておくと良いかもしれません。",
        "あなたは、あなたであればいい。",
        "もっと自分を好きになってみましょう。すると、まだ見ぬ「私」を見つけることができるかもしれません。",
        "ゆっくりでもいいんです。ゆっくりでいいので、少しずつでも進んでいれば、前に進むことができます。",
      ],
      message: "",

      //ログイン関連
      isAuth: false,
      //投稿表示関連
      posts: [],
      isActive: [],
      // handleName: "",
    }
  },
  computed: {
    reverseItems() {
      return this.dates.slice().reverse()
    },
    user() {
      return this.$auth.currentUser
    },
  },
  created: function () {
    this.message = this.words[Math.floor(Math.random() * this.words.length)]
    //API取得
    fetch(
      `https://data.corona.go.jp/converted-json/covid19japan-npatients.json`
    )
      .then((res) => {
        return res.json()
      })
      .then((value) => {
        this.dates = value
      })

    //ログインしているかどうかでisAuthを変化
    firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))

    // 投稿をいいね順で表示させています。
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
              .limit(3)
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
              return this.posts.sort((a, b) => {
                return b.starCount - a.starCount
              })
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
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          location.href = "/top"
        })
    },
    signUp() {
      firebase.auth().onAuthStateChanged(async (user) => {
        // 未ログイン時
        if (!user) {
          const provider = new firebase.auth.GoogleAuthProvider()
          firebase.auth().signInWithPopup(provider)
        }
        // ログイン時
        else {
          // ログイン済みのユーザー情報があるかをチェック
          const userDoc = await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
          if (!userDoc.exists) {
            // Firestore にユーザー用のドキュメントが作られていなければ作る
            await userDoc.ref
              .set({
                screen_name: user.uid,
                handleName: this.handleName,
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
                star_post_id: firebase.firestore.FieldValue.arrayUnion(),
              })
              .then(() => {
                location.href = "/"
              })
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/_reset.scss";
$main-color: #9ad5ff;
$sub-color: #4986e1;
$btn-color: rgb(4, 163, 255);

.middlebox {
  display: flex;
  height: 400px;
  border-bottom: 1px solid #c4c4c4;
}

.middlebox-left {
  height: 266px;
  margin: 0.5rem 5rem;
}
.wrapper {
  max-width: 1420px;
  display: flex;
}

.side-wrapper {
  width: calc(100% / 3);
  border-right: 1px solid #c4c4c4;
}

.sidebar {
  margin: 2rem;
}

.middlebox-right {
  margin-left: 7rem;
  margin-top: 5rem;
  .copyright {
    font-weight: bold;
    font-size: 36px;
  }
  .copyunder {
    font-weight: bold;
  }
}

.btn {
  width: 12rem;
  height: 49px;
  line-height: 49px;
  font-size: 1.125rem;
  display: block;
  text-align: center;
  margin: 0 auto;
  color: #fff;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  margin-bottom: 2rem;
  background-color: $btn-color;
  &:hover {
    opacity: 0.7;
  }
}

.wrapper {
  max-width: 1420px;
}

.word-ttl {
  width: 300px;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 75px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    height: 3px;
    background-color: $main-color;
    width: 265px;
    top: 100%;
    left: 5%;
  }
}

.word-subttl {
  margin-bottom: 50px;
}

.patient {
  border: 3px solid #9ad5ff;
  border-radius: 10px;
  margin: 3rem;
}

.inner {
  margin: 61px 10% 91px;
}

//

.nav {
  display: flex;
  list-style: none;
  margin: 1rem 0;
  li {
    height: 47px;
    line-height: 47px;
    margin-left: 50px;
    .btn {
      margin: 0;
    }
  }
}

.covidbox {
  height: auto;
  text-align: center;
  margin: 3rem 0;
  letter-spacing: 0.5rem;
  .total {
    // margin: 0 8% 1rem;
    color: red;
    font-weight: bold;
    margin: 1rem 0;
    text-align: center;
    span {
      font-size: 3rem;
    }
  }
  .yesterday {
    font-size: 1.25rem;
    margin: 1rem 0;
    span {
      font-size: 1.5rem;
    }
  }
}

.mnlink {
  margin-top: 3rem;
  margin-bottom: 3rem;
  .covidlink {
    color: steelblue;
  }
}

.shuffleword {
  background: #def1ff;
  border-radius: 30px;
  height: 150px;
  width: 75%;
  margin-left: 50px;
  font-weight: lighter;
  font-size: 1rem;
  font-family: Roboto;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  .shufflems {
    margin: 0 8% 1rem;
  }
}

.hpinfo {
  width: 300px;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 75px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    height: 3px;
    background-color: $main-color;
    width: 265px;
    top: 100%;
    left: 5%;
  }
}

//最新の投稿を表示するスタイリング
// .postbox {
//   background-color: azure;
//   height: auto;
//   text-align: center;
//   padding: 2rem 0;
//   border-bottom: 1px dotted #000;
//   h2 {
//     font-size: 2rem;
//   }
//   .link {
//     text-decoration: none;
//   }
//   .post {
//     text-align: left;
//     border: 4px solid rgb(206, 242, 252);
//     border-radius: 20px;
//     box-shadow: 10px 10px 5px 0px rgba(100, 100, 100, 0.6);
//     margin: 35px;
//     padding: 15px;
//     background-color: #fff;
//     .photo {
//       width: 3rem;
//       height: 3rem;
//       border: #ddd 1px solid;
//       border-radius: 50%;
//     }
//     .status {
//       display: flex;
//       justify-content: space-between;
//       .flex {
//         display: flex;
//         position: relative;
//         .ttl {
//           height: 2rem;
//           line-height: 2rem;
//           font-weight: bold;
//           font-size: 1.25rem;
//           margin: 0 1rem;
//         }
//         .handle-name {
//           @extend .ttl;
//           font-weight: normal;
//           color: rgb(151, 151, 151);
//         }
//         .level {
//           @extend .handle-name;
//           color: #000;
//           span {
//             font-weight: bold;
//             color: red;
//             margin-left: 5px;
//           }
//         }
//       }
//       .time {
//         margin: 5px;
//         font-weight: 500;
//         color: rgb(151, 151, 151);
//       }
//     }
//     .text {
//       margin: 1rem 0;
//       padding: 0 0 10px;
//       line-height: 1.5;
//       letter-spacing: 2px;
//       font-size: 1rem;
//       white-space: pre-wrap;
//     }

//     .post-info {
//       display: flex;
//       .tag {
//         display: flex;
//         flex-wrap: wrap;
//         font-weight: 500;
//         color: rgb(0, 140, 255);
//         margin: 10px 0;
//         height: 2rem;
//         line-height: 2rem;
//         li {
//           margin-right: 10px;
//         }
//       }
//       .post-btns {
//         display: flex;
//         flex-direction: row-reverse;
//         .star-btn {
//           width: 4rem;
//           height: 2rem;
//           line-height: 2rem;
//           text-align: center;
//           border-radius: 50%;
//           cursor: pointer;
//           user-select: none;
//           margin: 10px;
//         }
//       }
//     }
//   }
// }

.wordbox {
  background-color: darkkhaki;
  height: 300px;
}

.post-list {
  width: calc(200% / 3);
}
.list-ttl {
  width: 130px;
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
    width: 115px;
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
    .img-age {
      position: relative;
      margin: 3%;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 3%;
      }
      .age {
        position: absolute;
        line-height: 1rem;
        top: 3.5rem;
        right: 0.45rem;
      }
    }
    .post-status {
      margin: 3% 10% 1.45rem 0%;
      width: 100%;
      .ttl {
        font-size: 1.25rem;
        padding-left: 0.5rem;
        padding-bottom: 0.5rem;
        margin-bottom: 0.5rem;
        border-bottom: 2px solid $main-color;
      }
      .post-detail {
        display: flex;
        flex-wrap: wrap;
        font-size: 1rem;
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
        bottom: -75%;
        right: 80%;
        color: #c4c4c4;
      }
    }
  }
}

.check-block {
  margin: 2rem 3rem 2rem 3rem;
  line-height: 2;
}

@media screen and (max-width: 860px) {
  .wrapper {
    flex-direction: column;
  }
  .side-wrapper {
    width: 100%;
  }

  .imgcovid {
    margin-top: 5rem;
    width: 100%;
  }

  .sidebar {
    width: 100%;
  }

  .middlebox {
    width: 100%;
    height: 400px;

    .middlebox-right {
      margin-left: 0.5rem;
      margin-right: 2.5rem;
      margin-top: 5rem;
      .copyright {
        font-weight: bold;
        font-size: 18px;
      }
      .copyunder {
        font-weight: bold;
        font-size: 12px;
      }
    }
  }

  .word-ttl {
    width: 300px;
    text-align: center;
    font-size: 1rem;
    margin-bottom: 75px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      height: 3px;
      background-color: $main-color;
      width: 265px;
      top: 100%;
      left: 5%;
    }
  }

  .word-subttl {
    margin-bottom: 50px;
  }

  .patient {
    border: 3px solid #9ad5ff;
    border-radius: 10px;
    margin: 3rem;
  }

  //
  .post-list {
    // width: calc(200% / 3);

    width: 100%;
    .post {
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
            font-size: 0.875rem;
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
    }
  }

  .nav {
    display: flex;
    list-style: none;
    margin: 1rem 0;
    li {
      height: 47px;
      line-height: 47px;
      margin-left: 50px;
      .btn {
        margin: 0;
      }
    }
  }

  .covidbox {
    height: auto;
    text-align: center;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.5rem;
    .total {
      // margin: 0 8% 1rem;
      color: red;
      font-weight: bold;
      margin: 1rem 0;
      text-align: center;
      span {
        font-size: 3rem;
      }
    }
    .yesterday {
      font-size: 1.25rem;
      margin: 1rem 0;
      span {
        font-size: 1.5rem;
      }
    }
  }

  .shuffleword {
    background: #def1ff;
    border-radius: 30px;
    height: 150px;
    width: 75%;
    align-items: center;
    text-align: center;
    font-weight: lighter;
    font-size: 1rem;
    font-family: Roboto;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;
    .shufflems {
      align-items: center;
      margin: 0 8% 1rem;
    }
  }

  .hpinfo {
    align-items: center;
    width: 300px;
    text-align: center;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 75px;
    margin-top: 100px;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      height: 3px;
      background-color: $main-color;
      width: 265px;
      top: 100%;
      left: 5%;
    }
  }
}
</style>
