<template>
  <div id="overlay" @click.self="$emit('close')">
    <div id="content">
      <div class="post-content">
        <p class="block-ttl">タイトル</p>
        <input type="text" v-model="newtitle" class="inttl" />
        <div class="block-ttl">投稿内容</div>
        <textarea type="text" v-model="newtext" class="intext" />

        <div class="check-list">
          <div class="left-side">
            <div class="block-ttl">属性</div>
            <ul class="attribute">
              <li>
                <label
                  ><input
                    type="checkbox"
                    v-model="newinfection"
                    id="infection"
                  />感染記録</label
                >
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    v-model="newvaccine"
                    id="vaccine"
                  />ワクチン接種記録</label
                >
              </li>
            </ul>

            <div class="block-ttl">重症度</div>
            <div class="severity">
              <input
                type="range"
                v-model="newillLevel"
                min="1"
                max="5"
                step="1"
                id="illLevel"
              />
              <div class="numbers">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
            <div class="block-ttl">年齢</div>
            <select name="age" class="age" v-model="newage">
              <option value="10歳未満">10歳未満</option>
              <option value="10代">10代</option>
              <option value="20代">20代</option>
              <option value="30代">30代</option>
              <option value="40代">40代</option>
              <option value="50代">50代</option>
              <option value="60代">60代</option>
              <option value="70代">70歳以上</option>
            </select>
          </div>

          <div class="right-side">
            <div class="block-ttl">症状</div>
            <ul class="tag">
              <li>
                <label>
                  <input
                    type="checkbox"
                    v-model="newfever"
                    id="fever"
                  />発熱</label
                >
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    v-model="newheadache"
                    id="headache"
                  />頭痛</label
                >
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    v-model="newsoreThroat"
                    id="soreThroat"
                  />喉の渇き</label
                >
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    v-model="newrespiratoryOrgan"
                    id="respiratoryOrgan"
                  />呼吸困難</label
                >
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    v-model="newdiarrhea"
                    id="diarrhea"
                  />下痢</label
                >
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    v-model="newtasteOrDisappearance"
                    id="tasteOrDisappearance"
                  />味覚などの異常</label
                >
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    v-model="newother"
                    id="other"
                  />その他</label
                >
              </li>
            </ul>
          </div>
        </div>

        <div @click="enterPost" class="btn">変更</div>

        <div @click="$emit('close')" class="close-btn">
          <font-awesome-icon slot="icon" icon="times" />
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
    "starCount",
    "age",
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
      newage: this.age,
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
          starCount: this.starCount,
          age: this.newage,
        })
        .then(() => {
          this.$router.go({ path: this.$router.currentRoute.path, force: true })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/_reset.scss";

$main-color: #9ad5ff;
$btn-color: rgb(4, 163, 255);

#overlay {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
}

#content {
  z-index: 10000;
  width: 90%;
  height: 90%;
  text-align: center;
  padding: 2% 5%;
  background: #fff;
  position: relative;
  top: 5%;
  overflow-y: scroll;
}
.post-content {
  text-align: left;
  margin: 0 10%;
  label {
    cursor: pointer;
    user-select: none;
  }
  .block-ttl {
    width: 100px;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      height: 3px;
      background-color: $main-color;
      width: 93.26px;
      top: 100%;
      left: 5%;
    }
  }
  .inttl,
  .intext {
    width: 100%;
    border-radius: 10px;
    border: 3px solid $main-color;
    padding: 1%;
  }
  .inttl {
    height: 42px;
    margin-bottom: 1rem;
  }
  .intext {
    height: 198px;
    margin-bottom: 1rem;
  }
  .check-list {
    display: flex;
    margin-bottom: 1.5rem;
    .left-side {
      width: 60%;
      .attribute {
        padding: 1rem;
        li {
          margin-bottom: 0.5rem;
          input {
            margin-right: 0.5rem;
            margin-bottom: 0.3rem;
            cursor: pointer;
          }
        }
      }
      .severity {
        margin: 1rem;
        input {
          width: 235px;
          border-radius: 10px;
          background: #ceeaff;
          -webkit-appearance: none;
          border: solid 3px #aad0ee;
          appearance: none;
          cursor: pointer;
          outline: 0;
        }
        &:focus {
          box-shadow: 0 0 3px rgb(0, 161, 255);
        }
        // -webkit-向けのつまみ
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          background: #53aeff;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
        }
        // -moz-向けのつまみ
        &::-moz-range-thumb {
          background: #53aeff;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
          border: none;
        }
        // Firefoxで点線が周りに表示されてしまう問題の解消
        &::-moz-focus-outer {
          border: 0;
        }
        // つまみをドラッグしているときのスタイル
        &:active::-webkit-slider-thumb {
          box-shadow: 0px 5px 10px -2px rgba(0, 0, 0, 0.3);
        }
        .numbers {
          width: 235px;
          font-weight: bold;
          font-size: 1.25rem;
          display: flex;
          justify-content: space-between;
        }
      }
      .age {
        width: 10%;
        margin: 0.5rem 1rem;
        font-size: 1.25rem;
        font-weight: 540;
        cursor: pointer;
        border-bottom: 2px dotted $main-color;
      }
    }
  }

  .right-side {
    width: 40%;
    .tag {
      display: flex;
      flex-direction: column;
      margin: 1rem;
      li {
        margin-bottom: 0.875rem;
        input {
          margin-right: 0.5rem;
          cursor: pointer;
        }
      }
    }
  }
  .btn {
    width: 12rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.25rem;
    display: block;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    background-color: $btn-color;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
    margin-bottom: 1rem;
  }
  .close-btn {
    position: fixed;
    color: $main-color;
    font-size: 2rem;
    top: 5.5%;
    right: 6.5%;
    cursor: pointer;
    @media screen and (max-width: 1024px) {
      top: 5%;
      right: 4.5%;
    }
    @media screen and (max-width: 700px) {
      top: 5%;
      right: 6%;
    }
  }
}

@media screen and (max-width: 1024px) {
  #content {
    width: 95%;
    height: 97%;
  }

  .post-content {
    margin: 0;
    .block-ttl {
      font-size: 1.25rem;
      &::after {
        height: 2.5px;
        width: 90px;
      }
    }
    .inttl {
      height: 2.25rem;
      margin-bottom: 1.25rem;
    }
    .intext {
      height: 10rem;
      margin-bottom: 1.25rem;
      font-size: 0.9rem;
    }
    .check-list {
      flex-direction: column;
      margin-bottom: 1rem;
      .left-side {
        width: 100%;
        .attribute {
          display: flex;
          flex-wrap: wrap;
          padding: 0.5rem 1rem;
          li {
            margin-right: 1rem;
            input {
              margin-right: 0.325rem;
            }
          }
        }
      }
      .right-side {
        width: 100%;
        .tag {
          flex-direction: row;
          flex-wrap: wrap;
          margin-bottom: 0;
          li {
            margin-right: 1rem;
            m input {
              margin-right: 0.325rem;
            }
          }
        }
      }
    }
    .btn {
      width: 12rem;
      height: 3rem;
      line-height: 3rem;
    }
  }
}
</style>
