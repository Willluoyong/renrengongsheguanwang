<template>
  <div class="body">
    <div class="dialog-wrap">
      <div class="title"><img src="../../assets/phone/icon_finish_h5.png" alt="">设置成功</div>
      <router-link :to="{path:'/'}"><button class="button">知道了</button></router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "reset_pwd_succeed",

    }
</script>

<style lang="less">
  .body{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0rem;
    margin-left: -55/108rem;
    input[type="button"], input[type="submit"], input[type="reset"],input[type="text"],input[type="password"] {
      -webkit-appearance: none;
      -moz-appearance:none;
      outline:none
    }
    textarea {
      -webkit-appearance: none;
      -moz-appearance:button;
      outline:none
    }
    .dialog-wrap{
      position: absolute;
      top: 25%;
      left: 134/108rem;
      width: 807/108rem;
      height: 507/108rem;
      background:rgba(242,243,255,1);
      border-radius:10px;
      box-shadow:0px 10px 49px 0px rgba(166,169,204,0.57);
      font-size: 0.3rem;
      .title{
        padding-top: 125/108rem;
        margin-bottom: 106/108rem;
        text-align: center;
        font-size: 48/108rem;
        font-weight:bold;
        font-family:MicrosoftYaHei-Bold;
        color:rgba(181,186,219,1);
        img{
          width: 89/108rem;
          height: 89/108rem;
          vertical-align: middle;
          margin-right: 39/108rem;
        }
      }
      .button{
        width:540/108rem;
        height:105/108rem;
        background:rgba(173,179,219,1);
        border-radius:6px;
        outline: none;
        border: none;
        margin-left: 135/108rem;
        font-size: 42/108rem;
        color:rgba(242,243,255,1);
        font-family:MicrosoftYaHei;
        outline: none
      }
    }
  }
</style>
