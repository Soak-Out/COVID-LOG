<template>
  <div>
    <div>
      フィルタリング：
      <button @click="allShowButton">全て表示</button>
      <button @click="showTags">タグで絞り込み</button>
      <div v-if="isShowTags">
        <button>熱</button>
        <button>喉の痛み</button>
        <button>呼吸器障害</button>
        <button>下痢</button>
        <button>頭痛</button>
        <button>味覚・嗅覚障害</button>
        <button>その他</button>
      </div>
    </div>
    <div>
      <table
        border="1"
        v-for="(post, index) in posts"
        v-bind:key="(post, index)"
      >
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
          <button v-on:click="usefulButton(post.id)">役に立った</button> +
          {{ post.fav.length }}
          <!-- </div> -->
        </th>
      </table>
    </div>
  </div>
</template>
<script>
// import InfiniteLoading from "vue-infinite-loading"
import firebase from "firebase"

export default {
  data() {
    return {
      posts: [],
      isShowTags: false,
    }
  },
  methods: {
    showTags: function () {
      this.isShowTags = !this.isShowTags
    },
    // usefulButton: async (index) => {
    //   // [START firestore_data_set_array_operations]
    //   const admin = require("firebase-admin")
    //   const db = admin.firestore()
    //   const usefulRef = db.collection("posts").doc(this.posts[index].fav)
    //   const unionRes = await usefulRef.update({
    //     regions: admin.firestore.FieldValue.arrayUnion(
    //       this.posts[index].handleName
    //     ),
    //   })
    //   console.log(unionRes)
    // },
    usefulButton: function (postId) {
      if (this.$auth.uid) {
        firebase
          .firestore()
          .collection("posts")
          .doc(postId)
          .update({
            starCount: firebase.firestore.FieldValue.increment(1),
          })

        firebase
          .firestore()
          .collection(`users`)
          .doc(this.$auth.uid)
          .set(
            {
              star_post_id: firebase.firestore.FieldValue.arrayUnion(postId),
            },
            { merge: true }
          )
      }
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
