<template>
  <div>
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
    <footer id="footer">
      <div class="bottombox">
        <div class="bottombox-left">
          <img src="../assets/logo.png" class="imgcovid" />
        </div>
        <div class="bottombox-right">
          <div class="leftli">
            <ul>
              <li><router-link to="/top">トップ</router-link></li>
              <li><router-link to="/covidList">投稿を見る</router-link></li>
              <li><router-link to="/post-page">投稿する</router-link></li>
            </ul>
          </div>
          <div class="rightli">
            <ul>
              <li><router-link to="/mypage">マイページ</router-link></li>
              <li>
                <div v-if="isAuth">
                  <a @click="signOut">ログアウト</a>
                </div>
                <div v-else class="login-page">
                  <a @click="signUp">ログイン</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="blackbox">
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

#footer {
  .blackbox {
    height: 50px;
    width: 100%;
    background-color: rgb(53, 51, 51);
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bottombox {
    border-top: 1px solid #c4c4c4;
    display: flex;
    justify-content: space-between;
    height: 200px;
  }

  .bottombox-left {
    img {
      height: 87px;
      margin: 2.5rem 3rem;
    }
  }

  .bottombox-right {
    display: flex;
    justify-content: center;
    margin: 2.5rem 1rem;
    .leftli {
      margin-right: 5rem;
      li {
        margin-top: 0.5rem;
        :hover {
          color: #f00;
          border-bottom: 1px solid #000000;
        }
      }
    }
    .rightli {
      margin-right: 5rem;
      li {
        margin-top: 0.5rem;
        :hover {
          color: #f00;
          border-bottom: 1px solid #000000;
        }
      }
    }
  }
}
</style>
