<template>
  <div>
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
    <footer id="footer">
        <div class="blackbox">
            <span>copyright c 2021 09/11 soakout</span>
        </div>
    </footer>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
@import "../assets/css/_reset.scss";

#footer{
    .blackbox{
    height: 50px;
    width: 100%;
    background-color: rgb(53, 51, 51);
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
}
}

</style>
