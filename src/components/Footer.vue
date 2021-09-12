<template>
  <div>
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
    <footer id="footer">
      <div class="inner">
        <div class="img">
          <img src="../assets/logo-text.png" class="logo" />
        </div>
        <div class="links">
          <ul>
            <li :class="{ gray: !isAuth }">
              ▶︎<router-link to="/">トップ</router-link>
            </li>
            <li :class="{ gray: !isAuth }">
              ▶︎<router-link to="/covidList">投稿を見る</router-link>
            </li>
            <li :class="{ gray: !isAuth }">
              ▶︎<router-link to="/post-page">投稿する</router-link>
            </li>
          </ul>

          <ul>
            <li :class="{ gray: !isAuth }">
              ▶︎<router-link to="/mypage">マイページ</router-link>
            </li>
            <li>
              <div v-if="isAuth">
                ▶︎
                <a @click="signOut" class="sign">ログアウト</a>
              </div>
              <div v-else>
                ▶︎
                <a @click="signUp" class="sign">ログイン</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        <span>copyright c 2021 09/11 soakout</span>
      </div>
    </footer>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      isAuth: false,
      handleName: "名無さん",
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
          location.href = "/"
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

#footer {
  border-top: 1px solid #c4c4c4;
  .inner {
    max-width: 1420px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 4rem;
  }
  .img {
    width: 100%;
  }
  .links {
    display: flex;
    // background-color: orange;
    ul {
      width: 150px;
      li {
        margin: 1rem;
        cursor: pointer;
        user-select: none;
      }
    }
  }
  .copyright {
    text-align: center;
    background-color: #000;
    padding: 0.5rem;
    color: #fff;
  }
  .sign {
    color: rgb(4, 163, 255);
  }
  .gray {
    color: #aaa;
    cursor: default;
  }
}
@media screen and (max-width: 740px) {
  #footer {
    .inner {
      padding: 1rem 2rem;
      flex-direction: column-reverse;
    }
    .img {
      display: none;
    }
    .links {
      ul {
        li {
          margin: 1rem 0.5rem 1rem 1rem;
        }
      }
    }
  }
}
@media screen and (max-width: 315px) {
  #footer {
    li {
      font-size: 0.82rem;
    }
  }
}
</style>
