<template>
  <div>
    <div class="main">
      <div class="main-inner">
        <div class="main-img">
          <img src="../assets/logo-text.png" />
        </div>
        <div class="main-text">
          <div class="copyright">
            このサイトで<br />１人でも<br />多くの人に情報を。
          </div>
          <br />
          <div>
            <p>
              新型コロナウイルス感染症や<br />ワクチン接種の経験、<br />その対策などを共有しましょう。<br />
            </p>
            <br />
            <p class="br">新型コロナウイルス感染症専用<br />投稿サイト</p>
          </div>
          <div v-if="isAuth == false">
            <a @click="signUp" class="btn">ログイン</a>
            <p class="alert">※投稿・閲覧にはログインが必要です</p>
          </div>
          <div v-if="isAuth != false">
            <router-link to="/post-page" class="btn">投稿する</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="sub-wrapper">
        <aside class="sidebar">
          <div class="sidebar-inner">
            <div class="block-ttl br">新型コロナウイルス<br />新着情報</div>

            <div class="covidbox">
              <div class="sub-ttl">累計感染者数（昨日時点）</div>
              <div
                class="patientshow"
                v-for="(npatients, index) in reverseItems"
                v-bind:key="index"
              >
                <p v-if="index === 0" class="total">
                  <br /><span>{{ npatients.npatients }}</span
                  >人
                </p>
                <p v-if="index === 0" class="yesterday">
                  昨日 <span>+{{ npatients.adpatients }}</span
                  >人
                </p>
                <p v-if="index === 1" class="more-yesterday">
                  一昨日 <span>+{{ npatients.adpatients }}</span
                  >人
                </p>
              </div>
            </div>

            <div class="mnlink">
              <p class="br">
                ※厚生労働省新型コロナウイルス <br />特設サイトは<a
                  href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html"
                  class="covidlink"
                  >こちら</a
                >
              </p>
            </div>

            <div class="block-ttl">ちょこっと ひとこと</div>
            <div class="shuffleword">
              <div class="shufflems">{{ message }}</div>
            </div>
          </div>
        </aside>

        <div class="post-list">
          <div class="inner">
            <div class="list-ttl">いいねの多い投稿</div>
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
                      重症度<span>{{ post.illLevel }}</span>
                    </div>
                    <span>｜</span>
                    <div class="handle-name">{{ post.handleName }} さん</div>
                  </div>
                </div>
                <div class="time">{{ post.postedTime }}</div>
              </div>

              <div class="text">{{ post.uploadText }}</div>
              <div class="sub-info">
                <div class="tags">
                  <ul>
                    <li><p>症状：</p></li>
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
            <p class="alert">※投稿作成・閲覧にはログインが必要です</p>
          </div>
          <div v-if="isAuth != false">
            <router-link to="/covidList" class="btn">投稿を見る</router-link>
          </div>
        </div>
      </div>
    </div>
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
      handleName: "名無しさん",
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
    db.collection("posts")
      .orderBy("starCount", "desc")
      .limit(3)
      .get()
      .then((doc) => {
        doc.forEach((postdoc) => {
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
          this.isActive.push(false)
          //posts配列にいれる
          this.posts.push(post)
        })
      })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          location.href = "/"
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

.wrapper {
  max-width: 1420px;
  margin: 0 auto;
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
  margin-bottom: 1rem;
  background-color: $btn-color;
  &:hover {
    opacity: 0.7;
  }
}
.alert {
  text-align: center;
  margin-bottom: 2rem;
}
.main {
  border-bottom: 1px solid #c4c4c4;
  .main-inner {
    display: flex;
    max-width: 1420px;
    margin: 0 auto;
  }
  .main-img {
    // background-color: antiquewhite;
    width: 60%;
    padding: 3% 3% 3% 5%;

    img {
      width: 100%;
      margin-top: 0.5rem;
      padding-bottom: 1rem;
    }
  }
  .main-text {
    width: 40%;
    // background-color: aquamarine;
    padding: 7% 0 5% 3%;
    font-weight: bold;
    .copyright {
      font-size: 1.75rem;
      text-decoration: rgb(100, 224, 255) underline 0.25rem;
    }
    .btn {
      margin: 1rem 0 0 0;
      font-weight: normal;
    }
    .alert {
      margin-top: 0.25rem;
      font-weight: normal;
      text-align: left;
      margin-bottom: 0;
    }
    .br {
      br {
        display: none;
        @media screen and (max-width: 400px) {
          display: flex;
        }
      }
    }
  }
}
.sub-wrapper {
  width: 100%;
  display: flex;
}
.sidebar {
  width: calc(100% / 3);
  border-right: 1px solid #c4c4c4;
  text-align: center;
  .sidebar-inner {
    margin: 5rem 8%;
  }
  .block-ttl {
    display: block;
    width: 60%;
    text-align: center;
    margin: 0 auto;
    font-size: 1.1rem;
    margin-bottom: 3rem;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      height: 3px;
      background-color: $main-color;
      width: 100%;
      bottom: 0;
      left: 0;
    }
    @media screen and (max-width: 1024px) {
      width: 200px;
      font-size: 1.1rem;
      margin-bottom: 2rem;
      width: 70%;
    }
  }
  .covidbox {
    border: solid 3px $main-color;
    border-radius: 10px;
    padding: 1rem;
    .sub-ttl {
      font-size: 0.9rem;
    }
    .total {
      display: inline-block;
      color: #f00;
      margin-top: -2rem;
      margin-bottom: 1rem;
      @media screen and (max-width: 370px) {
        margin-bottom: 0.5rem;
      }
      span {
        display: inline-block;
        margin-top: 1.5rem;
        font-size: 3rem;
        font-weight: bold;
        letter-spacing: 0.375rem;
        @media screen and (max-width: 370px) {
          font-size: 2rem;
        }
      }
    }
    .yesterday {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      span {
        font-size: 1rem;
        font-weight: bold;
        letter-spacing: 0.375rem;
      }
    }
    .more-yesterday {
      font-size: 0.8rem;
      span {
        font-size: 0.9rem;
        font-weight: bold;
        letter-spacing: 0.375rem;
      }
    }
  }
  .mnlink {
    font-size: 0.8rem;
    margin: 2rem 0 7rem;
    .covidlink {
      color: $sub-color;
      text-decoration: underline;
    }
    .br {
      br {
        display: none;
        @media screen and (max-width: 370px) {
          display: flex;
        }
      }
    }
  }
  .shuffleword {
    border-radius: 30px;
    background-color: #def1ff;
    text-align: left;
    .shufflems {
      padding: 2rem 10%;
    }
  }
}
.post-list {
  width: calc(200% / 3);
  .inner {
    margin: 3rem 10% 1.5rem;
  }
  .list-ttl {
    //いいねの多い投稿
    width: 230px;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    @media screen and (max-width: 1024px) {
      font-size: 1.1rem;
    }
    &::after {
      position: absolute;
      content: "";
      height: 3px;
      background-color: $main-color;
      width: 100%;
      bottom: 0;
      left: 0;
    }
  }

  //-------------------
  //投稿
  //-------------------
  .post {
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
            p {
              color: #000;
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
  @media screen and (max-width: 1024px) {
    .post {
      margin-top: 1rem;
      padding-bottom: 0.5rem;
      .time {
        font-size: 0.75rem;
        top: auto;
        bottom: 0;
        right: 1%;
        display: none;
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
}

@media screen and (max-width: 1024px) {
  .main {
    .main-inner {
      flex-direction: column;
      padding: 0;
      position: relative;
    }
    .main-img {
      width: 100%;
      padding: 0;
      height: 450px;
      background-image: url(../assets/logo-text.png);
      background-position: center;
      background-size: cover;
      object-fit: cover;
      opacity: 0.2;
      img {
        display: none;
      }
    }
    .main-text {
      position: absolute;
      padding: 5% 3%;
      width: 100%;
      text-align: center;
      z-index: 5;
      .btn {
        margin: 1rem auto;
      }
      .alert {
        text-align: center;
      }
    }
  }
  .sub-wrapper {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    .sidebar-inner {
      margin: 2rem 8%;
    }
    .br {
      br {
        display: none;
        @media screen and (max-width: 400px) {
          display: flex;
        }
      }
    }
    .mnlink {
      margin: 2rem 0 3rem;
    }
  }
  .post-list {
    width: 100%;
    .inner {
      margin: 2rem 4%;
    }
  }
}
</style>
