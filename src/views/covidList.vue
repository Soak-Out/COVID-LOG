<template>
  <table border="1">
    <tr>
      <th>HN</th>
      <td v-for="HN in postContents" v-bind:key="HN">
        {{ postContents.HN }}
      </td>
    </tr>
    <tr>
      <th>タイトル</th>
      <td v-for="title in postContents" v-bind:key="title">
        {{ postContents.title }}
      </td>
    </tr>
    <tr>
      <th>重症度レベル</th>
      <td v-for="illLevel in postContents" v-bind:key="illLevel">
        {{ postContents.illLevel }}
      </td>
    </tr>
    <tr>
      <th>本文</th>
      <td v-for="body in postContents" v-bind:key="body">
        {{ postContents.body }}
      </td>
    </tr>
    <tr>
      <th>タグ</th>
      <td>
        <p v-if="fever">熱</p>
        <p v-if="soreThroat">喉の痛み</p>
        <p v-if="respiratoryOrgan">呼吸器障害</p>
        <p v-if="diarrhea">下痢</p>
        <p v-if="headache">頭痛</p>
        <p v-if="tasteOrDisappearance">味覚・嗅覚障害</p>
        <p v-if="other">その他</p>
      </td>
    </tr>
  </table>
</template>
<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {},
  data: () => ({
    postContents: [
      {
        index: 0,
        title: "hoge",
        vaccine: false,
        infection: true,
        HN: "huga",
        body: "covicovi",
        illLevel: 5,
        fever: true,
        soreThroat: true,
        respiratoryOrgan: false,
        diarrhea: false,
        headache: true,
        tasteOrDisappearance: false,
        other: true,
      },
    ],
  }),
});
</script>
