<template>
  <div class="home_page">
    <div class="header">
      <div class="nav">
        <div class="nav_left"></div>
        <div class="nav_right">
          <ul>
            <!-- <li :class="{active:show==1}" @click="btn1"><img :src="show==1?img.home_Cli:img.home_Nor" alt=""><span></span></li> -->
            <li @click="btn2" v-show="loginReg">登录<span :class="{bg:show==2}"></span></li>
            <li v-show="loginReg"></li>
            <li  @click="btn3" v-show="loginReg">注册<span :class="{bg:show==3}"></span></li>
          </ul>
          <p class="user">{{userName}}</p>
        </div>
      </div>
      <div class="hd_content">
        <img src="../../assets/phone/font_title_h5.png" alt="">
        <img src="../../assets/phone/hont_pic1.png" alt="">
        <img src="../../assets/phone/font_pic2.png" alt="">
        <div @click="Modify_style"></div>
      </div>
    </div>
    <div class="main">
      <div class="main_title"></div>
    </div>
    <div class="footer">
      <div class="footer_title">
        <img src="../../assets/phone/sina.png" alt="">
        <img src="../../assets/phone/qq.png" alt="">
        <img src="../../assets/phone/wechat.png" alt="">
        <img src="../../assets/phone/baidu.png" alt="">
      </div>
      <div class="footer_content">
        <img src="../../assets/phone/icon_email_h5.png" alt="">
        <span>business@cococo.org</span>
      </div>
      <div class="footer_bottom">
        <span>© Everyone chain commune, 2018. All Rights Reserved.</span>
      </div>
    </div>
  </div>
</template>

<script>
  // import home_Cli from '../../assets/phone/icon_home.png'
  // import home_Nor from '../../assets/phone/icon_home_normal.png'
  import {getDownloadUrl} from '@/service/userApi'
    export default {
      name: "indexM",
      // comments:{
      //   home_Cli,
      //   home_Nor
      // },
      data(){
        return{
          isActive : false,
          show:1,
          // img: {
          //   home_Nor: home_Nor,
          //   home_Cli: home_Cli
          // },
          urlAdress:"",
          loginReg:true,
          userName:"",
          recommendCode:"",
          uuid:"",
        }
      },
      methods:{
        Modify_style(){
          this.isActive = true;
        },
        btn1(){
          this.show=1;
          this.userName = ''
          this.$router.push('/')
          this.loginReg = true
        },
        btn2(){
          this.show=2;
          this.$router.push('/loginM')
        },
        btn3(){
          this.show=3;
          this.$router.push({path:'/regM',query:{"recommendCode":this.recommendCode}})
        },
        Modify_style(){
          location.href = this.urlAdress
        }
      },
      created(){
        this.uuid = localStorage.getItem('uuid')

        if (this.uuid == '' || this.uuid == null) {
          var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = (d + Math.random()*16)%16 | 0;
              d = Math.floor(d/16);
              return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            this.uuid =  uuid
            localStorage.setItem('uuid',this.uuid)
        }
        //获取下载地址
        getDownloadUrl().then(res =>{
          if (res.data.status == 200) {
            this.urlAdress = res.data.data.apkUrl
          }else{
            console.log(res.data.messsage)
          }
        }).catch( err => {
          console.log(err);
          
        })
      
      this.userName = ''
      this.userName = this.$route.query.loginName

      if (this.userName != '' && this.userName != undefined) {
        this.loginReg = false
      }
      this.recommendCode = this.$route.query.recommendCode
    },
    }
</script>

<style lang="less">
  body{
    background: #F3F3FF;
    padding: 0rem;
    margin: 0rem;
  }
  .home_page{
    display: flex;
    flex-direction:column;
    height: 100vh;
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
  }
  .header{
    width: 1080/108rem;
    min-height: 823/108rem;
    background: url("../../assets/phone/h5_banner@2x.png") no-repeat;
    background-size: cover;
    .nav{
      padding-top: 48/108rem;
      margin-bottom: 148/108rem;
      .nav_left{
        margin-left: 37/108rem;
        width: 124/108rem;
        height: 28/108rem;
        float: left;
        background: url("../../assets/phone/logo_h5.png") no-repeat;
        background-size: cover;
      }
      .nav_right{
        float: right;
        margin-right: 38/108rem;
        p{font-size: 36/108rem;float: left}
        ul{
          float: left;
          position: relative;
          .active{
            background:rgba(224,225,247,1);
          }
          .active span{
            display: inline-block;
            width: 29/108rem;
            height: 2/108rem;
            position: absolute;
            top: 47/108rem;
            left: 0.33rem;
            background:rgba(178,172,209,1);
          }
          li{
            position: relative;
            float: left;
            font-size: 36/108rem;
            width: 98/108rem;
            height: 40/108rem;
            border-radius:20/108rem;
            text-align: center;
            line-height: 43/108rem;
            font-family:FZLTHJW--GB1-0;
            font-weight:400;
            color:rgba(88,96,150,1);
            .bg{
              display: inline-block;
              width: 70/108rem;
              height: 2/108rem;
              position: absolute;
              top: 47/108rem;
              left: 0.13rem;
              background:rgba(178,172,209,1);
            }
          }
          li:nth-child(2){
            width: 0.03rem;
            height: 0.3rem;
            background:rgba(234,236,253,1);
            margin:5/108rem 5/108rem 0rem 5/108rem;
          }
          li:nth-child(0){
            margin-right: 45/108rem;
            //background:rgba(224,225,247,1);
            img{
              width: 30/108rem;
              height: 29/108rem;
              padding: 0.05rem;
            }
          }
        }
      }
    }
    .hd_content{
      clear: both;
      img:nth-child(1){
         display: block;
         margin-left: 39/108rem;
         width: 483/108rem;
         height: 54/108rem;
         margin-bottom: 39/108rem;
       }
      img:nth-child(2){
        display: block;
        margin-left: 43/108rem;
        width: 392/108rem;
        height: 24/108rem;
        margin-bottom: 83/108rem;
      }
      img:nth-child(3){
        display: block;
        margin-left: 41/108rem;
        margin-bottom: 80/108rem;
        width: 550/108rem;
        height: 73/108rem;
      }
      div{
        display: block;
        margin-left: 8/108rem;
        width: 359/108rem;
        height: 166/108rem;
        background: url("../../assets/phone/btn_download_normal.png");
        background-size: cover;
      }
      @keyframes rotate {
        0%{
          transform: rotateZ(0deg);
        }
        100%{
          transform: rotateZ(360deg);
        }
      }

      .active{
        background: url("../../assets/phone/btn_download_refresh@2x.png");
        background-size: cover;
        span{
          display: inline-block;
          position: relative;
          top: -0.1rem;
          left: 43%;
          width: 43/108rem;
          height: 43/108rem;
          background: url("../../assets/phone/loading@2x.png");
          background-size: cover;
          animation: rotate 2s linear infinite;
        }
      }
    }
  }
  .main{
    width: 1080/108rem;
    min-height: (715/108rem)-(387/108/2rem);
    flex-grow: 1;
    background: url("../../assets/phone/company_h5.png") no-repeat 95/108rem 61/108rem;
    background-size: 901/108rem;
    margin-top: 80/108rem;
    position: relative;
    .main_title{
      position: absolute;
      left: 50%;
      top: -2%;
      transform: translateX(-50%) translateY(-50%);
      width: 626/108rem;
      height: 80/108rem;
      background: url(../../assets/phone/title.png) no-repeat;
      background-size: cover;
    }
  }
  .footer{
    width: 1080/108rem;
    min-height: 387/108rem;
    background: url("../../assets/phone/bottom_bg_h5.png") no-repeat;
    background-size: 1080/108rem 388/108rem;
    text-align: center;
    font-size: 0.2rem;
    .footer_title{
      margin-top: 170/108rem;
      margin-bottom: 24/108rem;
      img:nth-child(1){
        width: 51/108rem;
        height: 40/108rem;
        margin-right: 69/108rem;
      }
      img:nth-child(2){
        width: 39/108rem;
        height: 40/108rem;
        margin-right: 69/108rem;
      }
      img:nth-child(3){
        width: 49/108rem;
        height: 40/108rem;
        margin-right: 69/108rem;
      }
      img:nth-child(4){
        width: 37/108rem;
        height: 40/108rem;
      }
    }
    .footer_content{
      font-family:FZLTHJW--GB1-0;
      font-weight:400;
      margin-bottom: 24/108rem;
      color:rgba(242,243,255,1);
      img{
        width: 32/108rem;
        height: 33/108rem;
      }
      span{
        font-size: 26/108rem;
      }
    }
    .footer_bottom{
      font-size: 20/108rem;
      font-family:Roboto-Light;
      font-weight:300;
      color:rgba(242,243,255,1);
      opacity:0.63;
    }
  }
</style>
