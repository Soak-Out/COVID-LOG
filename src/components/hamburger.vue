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
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/top">Top</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/post-page">Post-Page</router-link></li>
          <li><router-link to="/covidList">CovidList</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/mypage">Mypage</router-link></li>
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
}
</script>

<style lang="scss">
.hamburger__btn {
  position: fixed;
  top: 0;
  right: 0;
  width: 75px;
  height: 75px;
  cursor: pointer;
  z-index: 50;
  background-color: #fff;

  .line {
    position: absolute;
    top: 0;
    left: 15px;
    width: 45px;
    height: 3.75px;
    background: #333;
    text-align: left;
  }

  .line_01 {
    top: 17.5px;
    transition: 0.4s ease;
  }

  .line_02 {
    top: 32.5px;
    transition: 0.4s ease;
  }

  .line_03 {
    top: 47.5px;
    transition: 0.4s ease;
  }
}

.btn_line01 {
  transform: translateY(15px) rotate(-45deg);
  transition: 0.4s ease;
}
.btn_line02 {
  transition: 0.4s ease;
  opacity: 0;
}
.btn_line03 {
  transform: translateY(-15px) rotate(45deg);
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
  width: 300px;
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
</style>
