<template>
    <div class="succeed">
      <div class ="logo"><img src="../../assets/phone/logo_h5.png" alt=""></div>
      <div class="content">
        <img src="../../assets/phone/success_pic_h5.png" alt="">
        <!--<router-link>--><button @click.prevent="btn">我知道了</button><!--</router-link>-->
        <span>下载APP实名认证后即可获得资产大礼</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "succeed",
        methods:{
          btn(){
            this.$router.push('/')
          }
        }
    }
</script>

<style lang="less">
  body{
    background: rgba(242,243,255,1);
    .succeed{
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
      width: 10rem;
      .logo{
        margin-left: 55/108rem;
        margin-bottom: 148/108rem;
        img{
          margin-top: 43/108rem;
          width: 265/108rem;
        }
      }
      .content{
        img{
          margin-left: 55/108rem;
          width: 970/108rem;
          height: 467/108rem;
          margin-bottom: 56/108rem;
        }
        button{
          display:block;
          width:800/108rem;
          height:120/108rem;
          background:rgba(192,198,237,1);
          border-radius:6/108rem;
          border: none;
          outline: none;
          font-size: 42/108rem;
          font-weight:400;
          color:rgba(255,255,255,1);
          margin-left: 140/108rem;
          margin-bottom: 44/108rem;
          font-family:MicrosoftYaHei;
          outline: none
        }
        span{
          display: block;
          text-align: center;
          margin: 0 auto;
          font-size: 36/108rem;
          font-family:SourceHanSansCN-Regular;
          color:rgba(181,186,219,1);
        }
      }
    }
  }
</style>
