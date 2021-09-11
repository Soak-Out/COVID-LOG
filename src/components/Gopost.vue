<template>
  <div>
    <router-link to="/post-page">
      <div v-if="isAuth" class="go-post">
        <font-awesome-icon slot="icon" icon="pen" />
      </div>
      /></router-link
    >
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  name: "goPost",
  data() {
    return {
      isAuth: false,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))
  },
}
</script>
<style lang="scss" scoped>
@import "../assets/css/_reset.scss";
$btn-color: rgb(4, 163, 255);

.go-post {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  color: #fff;
  background-color: $btn-color;
  font-size: 1.5rem;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
  &:hover {
    transform: scale(1.2);
  }
  @media screen and (max-width: 400px) {
    bottom: 0.5rem;
    right: 0.5rem;
  }
}
</style>
ｓ
