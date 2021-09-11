<template>
  <div class="hamburger__container">
    <!--ハンバーガーメニューのボタン-->
    <div class="hamburger__btn" @click="ActiveBtn = !ActiveBtn">
      <span class="line line_01" :class="{ btn_line01: ActiveBtn }"></span>
      <span class="line line_02" :class="{ btn_line02: ActiveBtn }"></span>
      <span class="line line_03" :class="{ btn_line03: ActiveBtn }"></span>
    </div>
    <!--サイドメニュー-->
    <transition name="hamburger__menu">
      <div class="hamburger__menu" v-show="ActiveBtn">
        <router-link to="/"
          ><img src="../assets/logo-text.png" alt="" @click="clickEvent"
        /></router-link>
        <ul class="scroll">
          <li v-if="isAuth" @click="clickEvent">
            <router-link to="/">トップ</router-link>
          </li>
          <li v-if="isAuth" @click="clickEvent">
            <router-link to="/covidList">投稿を見る</router-link>
          </li>
          <li v-if="isAuth" @click="clickEvent">
            <router-link to="/post-page">投稿する</router-link>
          </li>
          <li v-if="isAuth" @click="clickEvent">
            <router-link to="/mypage">マイページ</router-link>
          </li>

          <li>
            <div v-if="isAuth">
              <a @click="clickEvent" v-on:click="signOut" class="btn log-out"
                >ログアウト</a
              >
            </div>
            <div v-else class="login-page">
              <a @click="clickEvent" v-on:click="signUp" class="btn"
                >ログイン</a
              >
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
      handleName: "名無さん",
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))
  },
  methods: {
    clickEvent() {
      this.ActiveBtn = false
    },
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
                location.href = "/top"
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
$btn-color: rgb(4, 163, 255);

@media screen and (max-width: 1024px) {
  .hamburger__btn {
    position: fixed;
    top: 3%;
    right: 5%;
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
    background-color: rgba($color: #fff, $alpha: 0.9);
    z-index: 30;
    position: fixed;
    width: 280px;
    height: 80rem;
    top: 0;
    right: 0;

    img {
      max-width: 70%;
      padding: 1rem 1rem 0.25rem 1rem;
    }
    ul {
      padding: 0 0.25rem;
      width: 100%;
    }

    li {
      width: 100%;
      border-top: 1px solid $main-color;
      text-align: left;
      list-style: none;
      line-height: 1;
      cursor: pointer;

      a {
        padding: 1.25rem 4vw;
        display: block;
        width: 100%;
        color: rgb(66, 66, 66);
        text-decoration: none;
        font-size: 1.25rem;
      }
    }

    .btn {
      width: 12rem;
      text-align: center;
      font-size: 1.125rem;
      color: #fff;
      display: inline-block;
      border-radius: 10px;
      height: 3.25rem;
      line-height: 3.25rem;
      padding: 0 1.5rem;
      margin-left: 2.75rem;
      cursor: pointer;
      margin-top: 2rem;
      background-color: $btn-color;
      &:hover {
        opacity: 0.7;
      }
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
