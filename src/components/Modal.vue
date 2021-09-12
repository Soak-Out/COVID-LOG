<template>
  <div id="overlay" @click.self="$emit('close')">
    <div id="content">
      <div class="inner">
        <h1>THANK YOU !!</h1>
        <font-awesome-icon slot="icon" icon="envelope" class="envelope" />
        <h2>ご投稿ありがとうございました</h2>
        <h3>この投稿がたくさんの方の<br />安心に繋がります。</h3>
        <div @click="$emit('close')" class="close-btn">閉じる</div>

        <div class="share">
          <p>Twitterでシェアしませんか？</p>
          <a
            href="http://twitter.com/share?&text=コロナウイルス感染者やワクチン接種者の症状や対策方法が投稿・閲覧できるサイトです！あなたの経験を投稿して一人でも多くの人を救いませんか？サイトはこちら👉https://soak-out.web.app/"
            class="to-twitter"
          >
            <font-awesome-icon
              slot="icon"
              :icon="['fab', 'twitter']"
              class="twitter"
            />Twitterでシェア
          </a>
        </div>
      </div>
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

<style lang="scss" scoped>
@import "../assets/css/_reset.scss";

$Msub-color: #ebf7ff;
$Mmain-color: #9ad5ff;
$Twitter-color: rgb(4, 163, 255);

#overlay {
  z-index: 51;
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
  z-index: 100;
  width: 40%;
  height: 75%;
  padding: 3rem 0;
  text-align: center;
  background: #fff;
  border-radius: 15px;
  h1 {
    font-size: 2.25rem;
    font-weight: 1000;
    color: $Mmain-color;
    margin-bottom: 1rem;
  }
  .envelope {
    font-size: 5rem;
    margin-bottom: 2rem;
    color: $Mmain-color;
  }
  h2 {
    font-weight: bold;
    margin-bottom: 1rem;
  }
  h3 {
    margin-bottom: 1.25rem;
  }
  .close-btn {
    display: block;
    margin: 0 auto;
    width: 11rem;
    color: #fff;
    background-color: $Mmain-color;
    padding: 0.625rem;
    border-radius: 10px;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 2rem;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .share {
    display: block;
    margin: 0 auto;
    width: 80%;
    background-color: $Msub-color;
    padding: 1.5rem 0;
    border-radius: 10px;
    font-weight: bold;
    letter-spacing: 0.1rem;

    .to-twitter {
      display: block;
      margin: 0.75rem auto 0;
      padding: 0.625rem 0.5rem;
      width: 12rem;
      color: #fff;
      background-color: $Twitter-color;
      border-radius: 10px;
      font-weight: 600;
      &:hover {
        opacity: 0.8;
      }
    }
    .twitter {
      font-size: 1.25rem;
      margin-right: 0.5rem;
      vertical-align: middle;
    }
  }
}

@media screen and (max-width: 1024px) {
  #content {
    height: 70%;
    width: 85%;
    padding: 1.5rem 0;
    @media screen and (max-width: 500px) {
      height: 90%;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 0.875rem;
    }
    .envelope {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    h2 {
      font-weight: bold;
      margin-bottom: 0.75rem;
    }
    h3 {
      margin-bottom: 1.25rem;
    }
    .close-btn {
      width: 9rem;
      padding: 0.5rem;
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }
    .share {
      padding: 1.5rem 0.5rem;
      letter-spacing: 0;
      .to-twitter {
        display: block;
        margin: 0.625rem auto 0;
        padding: 0.5rem;
        width: 10rem;
        color: #fff;
      }
    }
  }
}
</style>
