<template>
  <div class="top">
    <div class="topheader">
      <h1>COVID-LOG</h1>
      <ul class="nav">
        <li><router-link to="/post-page">投稿ページ</router-link></li>
        <li>人気商品</li>
        <li>
          <div v-if="isAuth">
            <a @click="signOut" class="btn log-out">ログアウト</a>
          </div>
          <div v-else class="login-page">
            <a @click="signUp" class="btn">ログイン</a>
          </div>
        </li>
      </ul>
    </div>

    <div class="middlebox">
      <div class="middlebox-left">ここらへんにロゴ画像</div>
      <div class="middlebox-right">
        <h3>このサイトで<br />１人でも<br />多くの人に情報を。</h3>
        <p>
          新型コロナウイルス感染症や<br />ワクチン接種の経験、<br />その予防策を投稿して共有しましょう。
        </p>
        <div v-if="isAuth">
          <router-link to="/post-page">投稿する</router-link>
          <router-link to="/covidList">投稿一覧</router-link>
        </div>
        <div v-else class="login-page">
          <a @click="signUp" class="btn">ログイン</a>
        </div>
      </div>
    </div>

    <div class="covidbox">
      <!-- <button v-on:click="getcovidPatient">陽性患者を更新する。</button> -->
      <!-- <h2>本日の陽性患者数です。</h2> -->
      <div v-for="(npatients, index) in reverseItems" v-bind:key="index">
        <p v-if="index === 0" class="total">
          累計感染者数<br /><span>{{ npatients.npatients }}</span
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

    <div class="postbox">
      <h2>最近の投稿</h2>
      <!-- <div v-if="isAuth"> -->
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
            <!-- <div v-if="isActive[index]" class="star-btn">
              💖{{ post.starCount }}
            </div> -->
            <div v-if="!isActive[index]" class="star-btn">
              🤍{{ post.starCount }}
            </div>
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

      <div v-if="isAuth">
        <router-link to="/covidList" class="link"
          >投稿一覧ページへ
        </router-link>
      </div>
      <div v-else class="login-page">
        <a @click="signUp" class="btn">ログイン</a>
      </div>
      <!-- </div> -->

      <!-- <div v-else class="login-page">
        <a @click="signUp" class="btn">ログイン</a>
      </div> -->
    </div>

    <div class="shuffleword">
        <h3>配列の内容表示</h3>
          <div>{{ message }}</div>
    </div>

    <!-- ここが最下層 -->
  </div>
</template>

<script>
import firebase from "firebase"
const db = firebase.firestore()

export default {
  data() {
    return {
      dates: [0],
      npatients: {},
      words: ["今日もお疲れ様","元気になってね","仕事したい"],
      message: "",
      //ログイン関連
      isAuth: false,
      // gethandleName: "",//ようこそ、〇〇さんとかに使う用です。一旦コメントアウト
      //投稿表示関連
      posts: [],
      isActive: [],
      // handleName: "",
    }
  },
  created: function() {
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
        // const months = this.dates
        // months.sort();
        console.log(value)
      })
    //ログインしているかどうかでisAuthを変化
    firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))

    db.collection("posts")
      .orderBy("post_at", "desc")
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
          location.href = "/login"
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
  computed: {
    reverseItems() {
      return this.dates.slice().reverse()
    },
    // user() {
    //   return this.$auth.currentUser
    // },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/_reset.scss";

$btn-color: linear-gradient(to right, #7dbaf3, #386de0);
.btn {
  margin: 1rem auto;
  width: 155px;
  height: 47px;
  background: $btn-color;
  color: #fff;
  border-radius: 10px;
  display: block;
  text-align: center;
  line-height: 47px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  user-select: none;
  cursor: pointer;
}

.topheader {
  display: flex;
  justify-content: space-between;
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

.middlebox {
  display: flex;
  justify-content: space-between;
  background-color: antiquewhite;
  height: 400px;
}

.covidbox {
  background-color: azure;
  height: auto;
  text-align: center;
  margin: 3rem 0;
  letter-spacing: 0.5rem;
  .total {
    font-size: 2rem;
    span {
      font-size: 5rem;
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

//最新の投稿を表示するスタイリング
.postbox {
  background-color: azure;
  height: auto;
  text-align: center;
  padding: 2rem 0;
  border-bottom: 1px dotted #000;
  h2 {
    font-size: 2rem;
  }
  .link {
    text-decoration: none;
  }
  .post {
    text-align: left;
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

.covidbox h1 {
}

.wordbox {
  background-color: darkkhaki;
  height: 300px;
}

.shuffleword {
  text-align: center;
}
</style>
