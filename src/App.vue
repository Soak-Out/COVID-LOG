<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/top">Top</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/post-page">Post-Page</router-link> |
      <router-link to="/covidList">CovidList</router-link> |
      <router-link to="/Login">Login</router-link> |
      <router-link to="/mypage">Mypage</router-link> |
    </div>
    <router-view />

    <div v-show="isAuth" class="hamburger__container">
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
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/top">Top</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/post-page">Post-Page</router-link></li>
            <li><router-link to="/covidList">CovidList</router-link></li>
            <li><router-link to="/Login">Login</router-link></li>
            <li><router-link to="/mypage">Mypage</router-link></li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
require("../src/assets/css/global.css")

export default {
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
