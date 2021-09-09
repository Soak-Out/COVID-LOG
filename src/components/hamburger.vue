<template>
  <div class="hamburger__container" v-if="isAuth">
    <!--ハンバーガーメニューのボタン-->
    <div class="hamburger__btn" @click="ActiveBtn = !ActiveBtn">
      <span class="line line_01" :class="{ btn_line01: ActiveBtn }"></span>
      <span class="line line_02" :class="{ btn_line02: ActiveBtn }"></span>
      <span class="line line_03" :class="{ btn_line03: ActiveBtn }"></span>
    </div>
    <!--サイドメニュー-->
    <transition name="hamburger__menu">
      <div class="hamburger__menu" v-show="ActiveBtn">
        <div>logo</div>
        <ul class="scroll">
          <li><router-link to="/top">トップ</router-link></li>
          <li><router-link to="/covidList">投稿を見る</router-link></li>
          <li><router-link to="/post-page">投稿する</router-link></li>
          <li><router-link to="/mypage">マイページ</router-link></li>

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
    </transition>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  name: "hamburger",
  data() {
    return {
      ActiveBtn: false,
      isAuth: true,
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

<style lang="scss">
$main-color: #9ad5ff;

@media screen and (max-width: 1024px) {
  .hamburger__btn {
    position: fixed;
    top: 2rem;
    right: 2rem;
    width: 75px;
    height: 46px;
    cursor: pointer;
    z-index: 50;
    background-color: transparent;

    .line {
      position: absolute;
      top: 0;
      left: 15px;
      width: 70px;
      height: 4px;
      background: $main-color;
      text-align: left;
    }

    .line_01 {
      top: 0;
      transition: 0.4s ease;
    }

    .line_02 {
      top: 23px;
      transition: 0.4s ease;
    }

    .line_03 {
      top: 46px;
      transition: 0.4s ease;
    }
  }

  .btn_line01 {
    transform: translateY(22.75px) rotate(-45deg);
    transition: 0.4s ease;
  }
  .btn_line02 {
    transition: 0.4s ease;
    opacity: 0;
  }
  .btn_line03 {
    transform: translateY(-22.5px) rotate(45deg);
    transition: 0.4s ease;
  }

  // サイドメニュー
  .hamburger__menu-enter-active,
  .hamburger__menu-leave-active {
    transition: opacity 0.4s;
  }
  .hamburger__menu-enter,
  .hamburger__menu-leave-to {
    opacity: 0;
  }
  .hamburger__menu-leave,
  .hamburger__menu-enter-to {
    opacity: 1;
  }

  .hamburger__menu {
    border-left: 1px solid #000;
    box-shadow: -1px 0 10px #333;
    background-color: #fff;
    z-index: 30;
    padding: 2rem 0;
    position: fixed;
    width: 100%;
    height: 80rem;
    top: 0;
    right: 0;

    ul {
      padding: 0;
      padding-top: 40px;
    }

    li {
      border-top: 1px solid #000;
      &:last-child {
        border-bottom: 1px solid #000;
      }
      text-align: left;
      padding: 20px 0;
      list-style: none;
      line-height: 1;
    }

    a {
      color: rgb(66, 66, 66);
      text-decoration: none;
      font-size: 25px;
      margin: 0 4vw;
      padding-bottom: 8px;
    }
  }
  .scroll {
    height: 75vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
