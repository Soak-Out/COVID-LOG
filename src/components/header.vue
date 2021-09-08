<template>
  <div>
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
    <header id="header">
      <div class="inner">
        <router-link to="/top">
          <img src="../assets/logo.png" alt="COVID-LOG"
        /></router-link>
        <nav>
          <ul>
            <li><router-link to="/top">トップ</router-link></li>
            |
            <li><router-link to="/covidList">投稿を見る</router-link></li>
            |
            <li><router-link to="/post-page">投稿する</router-link></li>
            |
            <li><router-link to="/mypage">マイページ</router-link></li>
            |
            <li>
              <div v-if="isAuth">
                <a @click="signOut" class="btn log-out">ログアウト</a>
              </div>
              <div v-else class="login-page">
                <a @click="signUp" class="btn">ログイン</a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  name: "headerNav",
  data() {
    return {
      isAuth: false,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))
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
      console.log("heo")
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

$active-color: #4986e1;
$main-color: #9ad5ff;

#header {
  height: 100px;
  border-bottom: 1px solid #c4c4c4;
  background-color: #fff;
  .inner {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1420px;
    img {
      height: 87px;
      margin: 0.5rem 1rem;
    }
    nav {
      ul {
        display: flex;
        line-height: 100px;

        li {
          font-size: 1.125rem;
          letter-spacing: 0.25rem;
          margin: 0 1.125rem;
          text-align: center;
          position: relative;
        }

        a.router-link-exact-active {
          color: $active-color;
          &::after {
            position: absolute;
            bottom: 30%;
            left: 0;
            content: "";
            width: 100%;
            height: 3px;
            background: $main-color;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  #header {
    width: 100%;
  }
  nav {
    display: none;
  }
}
</style>
