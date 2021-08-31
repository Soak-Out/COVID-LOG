<template>
  <div>
    <table border="1" v-for="(post, index) in posts" v-bind:key="(post, index)">
      <tr>
        <th>HN</th>
        <td>
          {{ post.handleName }}
        </td>
      </tr>
      <tr>
        <th>タイトル</th>
        <td>
          {{ post.title }}
        </td>
      </tr>
      <tr>
        <th>重症度レベル</th>
        <td>
          {{ post.illLevel }}
        </td>
      </tr>
      <tr>
        <th>本文</th>
        <td>
          {{ post.text }}
        </td>
      </tr>
      <tr>
        <th>タグ</th>
        <!-- タグがtrueのものだけ表示されるようになっています -->
        <td>
          <p v-if="post.fever">熱</p>
          <p v-if="post.soreThroat">喉の痛み</p>
          <p v-if="post.respiratoryOrgan">呼吸器障害</p>
          <p v-if="post.diarrhea">下痢</p>
          <p v-if="post.headache">頭痛</p>
          <p v-if="post.tasteOrDisappearance">味覚・嗅覚障害</p>
          <p v-if="post.other">その他</p>
        </td>
      </tr>
      <th colspan="2">
        <!-- <div v-for="(post, index) in posts" :key="index"> -->
        <button v-on:click="usefulButton(index)">役に立った</button> +
        {{ post.usefulLevel }}
        <!-- </div> -->
      </th>
    </table>
  </div>
</template>
<script>
// import InfiniteLoading from "vue-infinite-loading"
import firebase from "firebase"
export default {
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    // 役に立つボタンのカウント
    usefulButton: function (index) {
      this.posts[index].usefulLevel++
    },
  },
  created() {
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((element) => {
          console.log(element.id, "=>", element.data())
          this.posts.unshift({
            id: element.id,
            ...element.data(),
          })
          console.log(this.posts)
        })
      })
  },
}

// v-for="HN in posts" v-bind:key="HN"
//  v-for="title in posts" v-bind:key="title"
//  v-for="illLevel in posts" v-bind:key="illLevel"
// v-for="body in posts" v-bind:key="body"
</script>
