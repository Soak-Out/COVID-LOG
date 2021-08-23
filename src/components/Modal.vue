<template>
  <div id="overlay">
    <div id="content">
      <a
        href="http://twitter.com/share?&text=コロナウイルス感染者やワクチン接種者の症状や対策方法が一覧で見れるサイトです！ぜひ参考にしてください！ #拡散希望"
        >Please share !
      </a>
      <button @click="$emit('close')">閉じる</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
}
!(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0],
    p = /^http:/.test(d.location) ? "http" : "https"
  if (!d.getElementById(id)) {
    js = d.createElement(s)
    js.id = id
    js.src = p + "://platform.twitter.com/widgets.js"
    fjs.parentNode.insertBefore(js, fjs)
  }
})(document, "script", "twitter-wjs")
</script>

<style>
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
  width: 60%;
  padding-top: 5em;
  padding-bottom: 5em;
  text-align: center;
  background: #fff;
}
</style>
