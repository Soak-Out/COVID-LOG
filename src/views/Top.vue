<template>
  <div class="top">
    <div class="topheader">
    <h1>COVID-LOG</h1>
    <ul>
     <li><router-link to="/post-page">投稿ページ</router-link></li>
     <li>人気商品</li>
     <li><router-link to="/login">ログイン</router-link></li>
    </ul>
    </div>
    
    <div class="middlebox">
    <div class="middlebox-left">
      ここらへんにロゴ画像
    </div>
    <div class="middlebox-right">
      <h3>このサイトで<br>１人でも<br>多くの人に情報を。</h3>
      <p>新型コロナウイルス感染症や<br>ワクチン接種の経験、<br>その予防策を投稿して共有しましょう。</p>
          <router-link to="/login">ログイン</router-link>
    </div>
    </div>
  
    <div class="postbox">
      <div>ここに最新の投稿が入ります。いいね実装後</div>
    </div>

    <div class="covidbox">
     <h1>本日の陽性患者数です。</h1>
     <button v-on:click="getcovidPatient">陽性患者を更新する。</button>
     <div v-for="(npatients, index) in reverseItems" v-bind:key="index">
        <h1 v-if="index === 0">{{  npatients.adpatients  }} </h1>
     </div>
    </div>

    <!-- <div class="wordbox">
      <div>ねぎらいの言葉</div>
      <div v-for="word of words ">{{  word  }}</div>
    </div> -->

  <!-- ここが最下層 -->
  </div>



</template>

<script>
export default {
  data() {
    return {
      dates: [0],
      npatients: {},
      // word: [今日もごくろうさま,いつもありがとう,体に気をつけて],
    }
  },
  methods: {
    getcovidPatient: function (){
      fetch(
        `https://data.corona.go.jp/converted-json/covid19japan-npatients.json`
      )
      .then((res) => {
        return res.json()
      })
      .then((value) => {
        this.dates = value
        // const months = this.dates
        // months.sort();
        console.log(value)
      })
    },
  },
  computed: {
    reverseItems(){
      return this.dates.slice().reverse();
    },
  }
}

</script>

<style scoped>

.topheader{
  display: flex;
  justify-content: space-between;

}

ul{
  display: flex;
  list-style: none;
}

li{
  margin-left: 50px;
}

.middlebox{
  display: flex;
  justify-content: space-between;
  background-color: antiquewhite;
  height: 400px;
}


.postbox{
  background-color: azure;
  height: 300px;
 text-align: center;

}

.covidbox{
  background-color: azure;
  height: 300px;
 text-align: center;
}

.covidbox h1{
}

.wordbox{
  background-color: darkkhaki;
  height: 300px;
}
</style>