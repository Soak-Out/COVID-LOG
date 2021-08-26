<template>
  <div>
    <table
      border="1"
      v-for="(postContent, index) in postContents"
      v-bind:key="(postContent, index)"
    >
      <tr>
        <th>HN</th>
        <td>
          {{ postContent.HN }}
        </td>
      </tr>
      <tr>
        <th>タイトル</th>
        <td>
          {{ postContent.title }}
        </td>
      </tr>
      <tr>
        <th>重症度レベル</th>
        <td>
          {{ postContent.illLevel }}
        </td>
      </tr>
      <tr>
        <th>本文</th>
        <td>
          {{ postContent.body }}
        </td>
      </tr>
      <tr>
        <th>タグ</th>
        <!-- タグがtrueのものだけ表示されるようになっています -->
        <td>
          <p v-if="postContent.fever">熱</p>
          <p v-if="postContent.soreThroat">喉の痛み</p>
          <p v-if="postContent.respiratoryOrgan">呼吸器障害</p>
          <p v-if="postContent.diarrhea">下痢</p>
          <p v-if="postContent.headache">頭痛</p>
          <p v-if="postContent.tasteOrDisappearance">味覚・嗅覚障害</p>
          <p v-if="postContent.other">その他</p>
        </td>
      </tr>
      <th colspan="2">
        <!-- <div v-for="(postContent, index) in postContents" :key="index"> -->
        <button v-on:click="usefulButton(index)">役に立った</button> +
        {{ postContent.usefulLevel }}
        <!-- </div> -->
      </th>
    </table>
  </div>
</template>
<script>
// import InfiniteLoading from "vue-infinite-loading"

export default {
  data: () => ({
    postContents: [
      {
        title: "つらぴえん",
        vaccine: false, //登録されたデータが感染者かワクチンかを判別するフラグ
        infection: true,
        HN: "都民",
        body: "２０代です。まじで辛かった。咳が止まらん。酸素吸入した。",
        illLevel: 5,
        fever: true, //otherまで全てタグ
        soreThroat: true,
        respiratoryOrgan: false,
        diarrhea: false,
        headache: true,
        tasteOrDisappearance: false,
        other: true,
        usefulLevel: 0, //「役に立った」ボタンを押された回数を表示したい
      },
      {
        title: "無症状マン",
        vaccine: false,
        infection: true,
        HN: "元気な若者",
        body: "陽性だったけど何もなかった。暇だった",
        illLevel: 1,
        fever: false,
        soreThroat: false,
        respiratoryOrgan: false,
        diarrhea: false,
        headache: false,
        tasteOrDisappearance: false,
        other: false,
        usefulLevel: 0,
      },
    ],
  }),
  methods: {
    // 役に立つボタンのカウント
    usefulButton: function (index) {
      this.postContents[index].usefulLevel++
    },
  },
}

// v-for="HN in postContents" v-bind:key="HN"
//  v-for="title in postContents" v-bind:key="title"
//  v-for="illLevel in postContents" v-bind:key="illLevel"
// v-for="body in postContents" v-bind:key="body"
</script>
