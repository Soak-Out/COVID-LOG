<template>
  <div id="app">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap"
      rel="stylesheet"
    />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/top">Top</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/post-page">Post-Page</router-link> |
      <router-link to="/covidList">CovidList</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/mypage">Mypage</router-link> |
    </div> -->
    <headerItem />
    <router-view />
    <hamburger></hamburger>
  <footerItem/>
  </div>
</template>

<script>
import hamburger from "../src/components/hamburger.vue"
import headerItem from "../src/components/header.vue"
import footerItem from "../src/components/Footer.vue"
export default {
  components: {
    hamburger,
    headerItem,
    footerItem,
  },
}
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  overflow-x: hidden;
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
