<template>
  <div id="overlay">
    <div id="content">
      <div class="post-content">
        タイトル<input type="text" class="small-input" v-model="newtitle" />
        投稿内容<textarea type="text" v-model="newtext" />

        <ul class="exp">
          <li>
            <label>
              <input
                type="checkbox"
                v-model="newinfection"
              />コロナに感染している/したことがある</label
            >
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                v-model="newvaccine"
              />ワクチンを接種</label
            >
          </li>
        </ul>

        <div class="range">
          <label for="illLevel">重症度(0 〜 5)</label>
          <input type="range" v-model="newillLevel" min="0" max="5" step="1" />
        </div>

        <div class="symptoms">
          症状：
          <label> <input type="checkbox" v-model="newfever" />発熱</label>
          <label>
            <input
              type="checkbox"
              v-model="newsoreThroat"
            />空咳・喉の痛み</label
          >
          <label>
            <input
              type="checkbox"
              v-model="newrespiratoryOrgan"
            />呼吸器障害</label
          >
          <label> <input type="checkbox" v-model="newdiarrhea" />下痢</label>
          <label><input type="checkbox" v-model="newheadache" />頭痛</label>
          <label>
            <input
              type="checkbox"
              v-model="newtasteOrDisappearance"
            />味覚嗅覚の消失</label
          >
          <label> <input type="checkbox" v-model="newother" />その他</label>
        </div>
        <div class="btns">
          <div @click="enterPost" class="btn">変更</div>
          <div @click="$emit('close')" class="btn close">閉じる</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
const db = firebase.firestore()

export default {
  name: "Modal",

  props: [
    "title",
    "text",
    "infection",
    "vaccine",
    "illLevel",
    "fever",
    "soreThroat",
    "respiratoryOrgan",
    "diarrhea",
    "headache",
    "tasteOrDisappearance",
    "other",
    "screen_name",
    "handleName",
    "post_at",
    "photo",
    "postId",
  ],
  data() {
    return {
      newtitle: this.title,
      newtext: this.text,
      newinfection: this.infection,
      newvaccine: this.vaccine,
      newillLevel: this.illLevel,
      newfever: this.fever,
      newsoreThroat: this.soreThroat,
      newrespiratoryOrgan: this.respiratoryOrgan,
      newdiarrhea: this.diarrhea,
      newheadache: this.headache,
      newtasteOrDisappearance: this.tasteOrDisappearance,
      newother: this.other,
    }
  },
  methods: {
    enterPost() {
      db.collection("posts")
        .doc(`${this.postId}`)
        .set({
          title: this.newtitle,
          text: this.newtext,
          infection: this.newinfection,
          vaccine: this.newvaccine,
          illLevel: this.newillLevel,
          fever: this.newfever,
          soreThroat: this.newsoreThroat,
          respiratoryOrgan: this.newrespiratoryOrgan,
          diarrhea: this.newdiarrhea,
          headache: this.newheadache,
          tasteOrDisappearance: this.newtasteOrDisappearance,
          other: this.newother,
          screen_name: this.screen_name,
          handleName: this.handleName,
          photo: this.photo,
          post_at: this.post_at,
        })
        .then(() => {
          this.$router.go({ path: this.$router.currentRoute.path, force: true })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
// @import "../assets/css/_reset.scss";
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  z-index: 2;
  width: 70%;
  padding: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.post-content {
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  text-align: left;
  font-weight: bold;
  padding: 1rem;
  label {
    cursor: pointer;
  }
  .small-input {
    width: 40%;
    margin: 0.5rem 0;
  }
  textarea {
    margin: 0.5rem 0;
    height: 200px;
  }
  .exp {
    display: flex;
    flex-direction: column;
    margin-left: -40px;
    li {
      list-style: none;
      margin: 0.5rem 0;
    }
  }
  .range {
    margin-bottom: 1rem;
    #illLevel {
      width: 30%;
    }
  }
  .symptoms {
    margin-bottom: 1rem;
    display: flex;

    flex-wrap: wrap;
    label {
      margin-right: 20px;
    }
  }

  .handle-name {
    color: rgb(0, 174, 255);
  }
  .nickname {
    margin: 1rem 0;
    display: flex;
  }

  .btns {
    $btn-color: linear-gradient(to right, #7dbaf3, #386de0);
    display: flex;
    .btn {
      margin: 1rem auto;
      width: 155px;
      height: 47px;
      background: $btn-color;
      color: #fff;
      border-radius: 10px;
      display: block;
      text-align: center;
      line-height: 47px;
      font-size: 1rem;
      font-weight: bold;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
      user-select: none;
      cursor: pointer;
    }
    .close {
      background: linear-gradient(to right, #ff8a8a, #ff0000);
    }
  }
}
</style>
