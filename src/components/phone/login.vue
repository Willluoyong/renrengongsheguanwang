<template>
    <div class="login">
      <div class ="logo" @click="back"><img src="../../assets/phone/logo_h5.png" alt=""></div>
      <div class="content">
        <form action="" id="form">
          <div class="input-group">
            <span>手机号或邮箱</span>
            <input type="text" id="phone" v-model="userName"  autocomplete="off">
          </div>
          
        <div class="container" v-show="imgcode">
          <div id="captcha" style="position: relative;"></div>
          <div id="msg"></div>
        </div>
          <div class="input-group">
            <span>密码</span>
            <input type="password" id="pwd" v-model="password"  autocomplete="off">
          </div>
          <div class="input-group">
            <input type="submit" id="getButton" @click.prevent = "loginButton" value="登录">
          </div>
        </form>
        <div class="link">
          <span ><router-link :to="{path:'/retrieveM'}" style="margin-left:0">忘记密码？</router-link></span>
          <span><router-link :to="{path:'/regM'}">注册</router-link></span>
        </div>
      </div>
      
      <div class="loading" v-show="showLoading">
      <div class="loading_area">
        <img src="../../assets/phone/hearts.svg">
        <span>{{loadingText}}</span>
      </div>
    </div>
      <toast v-model="noneTip" width="15em" type="text" position="top">{{toastText}}</toast>
    </div>
    
</template>

<script>
import {Toast} from 'vux'
import {login,sendSmsCode,sendMailCode} from "@/service/userApi"
    export default {
        name: "login",
        components: {Toast},
        data(){
          return{
            userName:"",
            password:"",
            loadingText: "",
            noneTip: false,
            showLoading:false,
            toastText: "",
            uuid:"",
            content:'获取验证码',
            canClick:true,
            totalTime:60,
            token:'',
            smsCode:'',
            imgcode:false,
            emailToken:"",
            type:""
          }
        },
        methods: {
         

          back(){
            this.$router.push('/');
          },
          loginButton(){
            
            if (!this.userName || !this.password) {
              this.toast("账号或密码不能为空")
              return;
            }
            let s = '34qrefefgwrtg24534245gwefgvsdfwrt24@**&%$!ytfthn'
          let form = new FormData()
          this.loading("正在提交数据...");
          form.append('loginName',this.userName)
          form.append('password',this.$md5(s+this.password))
          form.append('clientId',this.uuid)
          form.append('clientType','PC')
          login(form).then(res => {
              this.showLoading = false;
              if (res.data.status == 200) {
              
                this.$store.state.token = res.data.data.token;
                this.toast("登录成功");
                this.$router.push({path:'/indexM',query:{"loginName":this.userName}})
              }else{
                this.toast(res.data.message);
              }
            }).catch(err => {
              this.showLoading = false;
              console.log(err);
              this.toast("网络异常")
            })
            
          },
          loading(msg) {
            this.loadingText = msg;
            this.showLoading = true
          },
          toast(msg) {
            this.toastText = msg;
            this.noneTip = true;
          },
        },
        created(){
          this.uuid = localStorage.getItem('uuid')

        }
        


    }
</script>

<style lang="less">

  body{
    background: rgba(242,243,255,1);
    .container {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translateX(-50%) translateY(-50%);
        width: 340px;
        height: auto;
        z-index: 1111;
        background:rgba(242,243,255,1);
        border:1px solid rgba(164,170,218,1);
        border-radius:6px;
        box-shadow:0px 0px 13px rgba(152,159,203,1);
        #captcha{
          width: 320px;
          margin: 22px auto;
        }

      input {
        display: block;
        width: 410px;
        line-height: 40px;
        padding: 0 10px;
        outline: none;
        border:1px solid #c8cccf;
        border-radius: 4px;
        color:#6a6f77;
      }
      #msg {
        width: 100%;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
      }
      a:link,a:visited,a:hover,a:active {
        margin-left: 100px;
        color: #0366D6;
      }
    }
    .login{
      width: 10rem;
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
      .logo{
        margin-left: 55/108rem;
        margin-bottom: 99/108rem;
        img{
          margin-top: 43/108rem;
          width: 265/108rem;
        }
      }
      .content{
        margin-left: 55/108rem;
          .input-group{
            margin-bottom: 53/108rem;
            span{
              display: block;
              font-size: 0.3rem;
              color:rgba(181,186,219,1);
              margin-bottom: 16/108rem;
              font-family:MicrosoftYaHei;
            }
            input{
              display:block;
              width:970/108rem;
              height:105/108rem;
              background:rgba(242,243,255,1);
              border:1px solid rgba(181,186,219,0.5);
              border-radius:6/108rem;
              outline:none;
              font-size:0.3rem;
              text-indent: 0.3rem;
              font-family:MicrosoftYaHei;
            }
            #getButton{
              text-indent: 0rem;
              background:rgba(173,179,219,1);
              color: #FFFFFF;
              font-size: 0.45rem;
              font-family:MicrosoftYaHei;
              outline: none
            }
            input:focus{
              border:1px solid #7486FF;
            }
            
        }
        .link{
          width: 10rem;
          span{
            display: inline-block;
            width: 4.5rem;
            font-size: 0.3rem;
            float: left;
            font-family:MicrosoftYaHei;
            router-link{
              color:rgba(181,186,219,1);
            }
            a{
              color: #B5BADB;
            }
            a:hover{
              color:#7486FF
            }
          }
          span:nth-child(2){
            text-align: right;
          }
        }
      }
    }
    
    .input-group:nth-child(2){
        position: relative;
          p{
            font-size: 0.3rem;
            color:rgba(181,186,219,1);
              margin-bottom: 16/108rem;
              font-family:MicrosoftYaHei;
          }
          span{
            display: inline-block;
            position: absolute;
            top:67%;
            right: 30%;
            transform: translateX(-10%) translateY(-50%);
            height: 0.5rem;
            border: solid rgba(164,170,218,1) 0.01rem;
            background: rgba(164,170,218,1);
          }
          button{
            width: 2rem;
            position: absolute;
            top:67%;
            right: 4%;
            transform: translateX(-10%) translateY(-50%);
            font-size: 0.3rem;
            border: none;
            outline:none;
            background: rgba(242,243,255,1);
            color:rgba(116,134,255,1);
            font-family:MicrosoftYaHei;
          }
          
        }
     .loading {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1001;
      width: 100%;
      height: 100%;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      background: transparent;

      .loading_area {
        width: 3rem;
        height: 150/75rem;
        display: flex;
        display: -webkit-flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 10/75rem;

        img {
          width: 80/75rem;
          height: 80/75rem;
        }
        span {
          font-size: 10/75rem;
          color: white;
        }
      }
    }
  }

</style>
