<template>
  <div class="reg" id="recommend_reg">
    <div class="banner"></div>
    <div class="content">
      <div class="title">
        <h3>共享公社 链接未来</h3>
        <p>新用户注册</p>
      </div>
      <form action="" id="form">
        <div class="input-group">
          <span class="phone_icon"></span>
          <input type="text" id="phone" placeholder="手机号" v-model="phone"  autocomplete="off">
        </div>
        <div class="input-group">
          <span class="password_icon"></span>
          <input type="password" id="pwd" placeholder="请设置登录密码" v-model="password" v-on:blur="pw"  autocomplete="off">
        </div>
        <div class="input-group">
          <span class="code_icon"></span>
            <input type="text" id="verification" placeholder="请输入验证码" v-model="smsCode"  autocomplete="off">
            <button @click.prevent="getVerifyImg" v-bind:class="{active: isActive}">{{content}}</button>
        </div>
        
        <div class="input-group">
          <span class="recommend_icon"></span>
          <input type="text" id="referral" placeholder="邀请码" v-model="recommendCode" :disabled="isDisabled"  autocomplete="off">
        </div>

        <div class="input-group">
          <router-link :to="{path:''}"><input type="submit" id="getButton" @click.prevent="registerButton" value="立即注册"></router-link>
        </div>
      </form>
      <div class="process">
      </div>
    </div>
    <div class="container" v-show="imgcode">
      <div id="captcha" style="position: relative;"></div>
      <div id="msg"></div>
    </div>
    <div class="loading" v-show="showLoading">
      <div class="loading_area">
        <img src="../../assets/phone/hearts.svg">
        <span>{{loadingText}}</span>
      </div>
    </div>
    <toast v-model="noneTip" width="100%" type="text" position="top">{{toastText}}</toast>
    
  </div>
</template>

<script>
import {Toast} from 'vux'
import{sendSmsCode,register,getVerifyCode,checkVerifyCode} from "@/service/userApi"
import { rejects } from 'assert';
import { watch } from 'fs';
  export default {
    name: "reg",
    components: {
      Toast,
    },
    data () {
      return {
        content: '发送验证码',  // 按钮里显示的内容
        totalTime: 60,     //记录具体倒计时时间
        canClick: true, //添加canClick
        toastText:"",
        loadingText:"",
        noneTip:false,
        showLoading:false,
        phone:"",
        password:"",
        password2:"",
        smsCode:"",
        recommendCode:"",
        isRead: true,
        uuid:'',
        recommendCode:'',
        imgcode:false,
        inputCaptcha:"",
        captchaToken:"",
        xint:"",
        blockToken:"",
        isActive: false,
        isDisabled:true

      }
    },
    methods: {
      getVerifyImg(){
        let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;

        
        if (this.phone == '') {
          this.toast("请输入手机号")
        }else if(this.phone.length != 11){
          this.toast('请输入正确的手机号或邮箱')
        }else if(!phoneReg.test(this.phone)){
          this.toast('请输入有效的手机号或邮箱')
        }else {
            this.imgcode = true
            let self = this;
            let div = document.getElementById("captcha");
            var childs = div.childNodes; 
            for(var i = childs .length - 1; i >= 0; i--) {
               div.removeChild(childs[i]);
            }
          this.jigsawM.init(
            document.getElementById('captcha'), function (xint,blockToken) {
              self.xint = xint;
              self.blockToken = blockToken
              console.log('====================================');
              console.log(self.xint,self.blockToken);
              console.log('====================================');
              
              self.countDown()
              self.imgcode = false;
            });
        }
      },
      countDown () {
        let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
        if (this.phone == '') {
          this.toast("请输入手机号")
        }else if(this.phone.length != 11){
          this.toast('请输入正确的手机号')
        }else if(!phoneReg.test(this.phone)){
          this.toast('请输入有效的手机号')
        }else{
          if (!this.canClick) return  //改动的是这两行代码
          this.canClick = false
          this.content = this.totalTime + 's'
          let clock = window.setInterval(() => {
            this.totalTime--
            this.content = this.totalTime + 's'
            if (this.totalTime < 0) {
              window.clearInterval(clock)
              this.content = '重新发送'
              this.totalTime = 60
              this.canClick = true  //这里重新开启
              this.isActive = false
            }
          },1000)
          let smscode = new FormData()
          smscode.append('mobile',this.phone)
          smscode.append('BlockToken',this.blockToken)
          smscode.append('xint',this.xint)
          smscode.append('smsTypeEnum','REGISTERED')
          sendSmsCode(smscode).then(res => {
            if (res.data.status == 200) {
              this.toast(res.data.message);
              this.isActive = true
            }else{
              this.toast(res.data.message)
              this.isActive = true
            }
          }).catch(err =>{
            this.toast("网络异常");
          })
        }
      },
      //注册
      registerButton(){
        let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
        if (this.phone == '') {
          this.toast("请输入手机号")
          return
        }
        if(this.phone.length != 11){
          this.toast('请输入正确的手机号')
          return
        if(!phoneReg.test(this.phone)){
        }
          this.toast('请输入有效的手机号')
          return
        }
        if (this.smsCode == '') {
          this.toast("请输入验证码")
          return
        }
        if (this.password ==  '') {
          this.toast('请输入密码')
          return
        }
        if (this.password.length < 6) {
          this.toast('密码长度不能小于6位数')
        }

         let s = '34qrefefgwrtg24534245gwefgvsdfwrt24@**&%$!ytfthn'
        let reg = new FormData()
        this.loading("正在提交数据...");
        reg.append('loginName',this.phone)
        reg.append('password',this.$md5(s+this.password))
        reg.append('smsCode',this.smsCode)
        reg.append('recommendedCode',this.recommendCode)
        reg.append('Regtype','phone')
        reg.append('clientId',this.uuid)
        reg.append('clientType','PC')
        register(reg).then(res => {
          this.showLoading = false;
          console.log(res.data);
          if (res.data.status == 200) {

            this.toast("注册成功")
            this.$router.push('/recommendSuccess')
          }else{
            this.toast(res.data.message)
          }
        }).catch(err =>{
          this.showLoading = false;
          this.toast("网络异常")
        })
      },
      pw(){
        if (this.password.length < 6) {
          this.toast('密码长度不能小于6位数')
        }
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
      console.log(this.uuid);
    },
    mounted () {
      this.recommendCode = this.$route.query.recommendCode
    }
  }

</script>

<style lang="less">
  #recommend_reg{
    width: 10rem;
    background:#D2383C;
    .container {
        position: absolute;
        left: 50%;
        top: 70%;
        transform: translateX(-50%) translateY(-50%);
        width: 340px;
        height: auto;
        z-index: 1111;
        background:#fff;
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
        margin-bottom: 99/108rem;
        img{
          margin-top: 43/108rem;
          width: 265/108rem;
        }
      }
      .banner{
          width:10rem;
          height: 1500/108rem;
          background: url(../../assets/phone/recommend/register_bg.png) no-repeat;
          background-size: cover;
        }
      .content{
        width: 10rem;
        height: 1163/108rem;
        background: url(../../assets/phone/recommend/form_bg.png) no-repeat;
        background-size: cover;
        position: relative;
        top: -650/108rem;
        padding-top: 0.81rem;
        margin: 0 auto;
        .title{
          width: 650/108rem;
          height: 75/108rem;
          background: url(../../assets/phone/recommend/title_pic.png) no-repeat;
          background-size: cover;
          margin:0 auto;
          text-align: center;
          
          h3{
            font-size:0.33rem;
            font-family:HYk1gj;
            font-weight:bold;
            color:rgba(255,106,103,1);
            position: relative;
            top: -5px;
          }
          p{
            font-size:0.39rem;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(255,106,103,1);
            line-height:0.47rem;
          }
        }
        #form{
          margin-top: 0.95rem;
          #referral{
            width:6.54rem;
            height:1.12rem;
            padding-left:1.7rem; 
          }
          .input-group{
            margin-bottom: 0.37rem;
            position: relative;
            span{
              display: inline-block;
              width: 0.56rem;
              height: 0.56rem;
              position: absolute;
              top: 0.3rem;
              left: 1.41rem;
            }
            .phone_icon{
              background: url(../../assets/phone/recommend/phone.png) no-repeat;
              background-size: cover;
            }
            .password_icon{
              background: url(../../assets/phone/recommend/password.png) no-repeat;
              background-size: cover;
              top: 0.57rem;
              border: 0;
            }
            .code_icon{
              background: url(../../assets/phone/recommend/verification_code.png) no-repeat;
              background-size: cover;
            }
            .recommend_icon{
              position: absolute;
              top: 0.33rem;
              left: 1.23rem;
              display: inline-block;
              width: 1.25rem;
              height: 0.46rem;
              background: url(../../assets/phone/recommend/invitation_code.png) no-repeat;
              background-size: cover;
            }

            input{
              margin: 0 auto;
              display:block;
              width:7.01rem;
              height:1.12rem;
              background:rgba(245,245,245,1);
              border: 0;
              border-radius:1rem;
              outline:none;
              font-size:0.42rem;
              text-indent: 0.3rem;
              font-family:MicrosoftYaHei;
              color:#333;
              padding-left: 1.23rem;
            }
            input::-webkit-input-placeholder{
              color:rgba(204,204,204,1);
              text-indent: 0.3rem;
            }
            
            #getButton{
              padding: 0;
              width:8.25rem;
              height:1.3rem;
              background:linear-gradient(180deg,rgba(255,134,117,1) 0%,rgba(250,92,93,1) 100%);
              border-radius:1rem;
              font-size:0.42rem;
              font-family:SourceHanSansCN-Regular;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:0.28rem;
            
            }
          }
          .input-group:nth-child(4){
            input{
              color:rgba(204,204,204,1);
              background:rgba(245,245,245,1);
            }
            input:disabled, textarea:diabled {
                -webkit-text-fill-color: rgba(245,245,245,1);
                -webkit-opacity: 1;
                color: #333;
            }
          }
          .input-group:nth-child(3){
            height:1.12rem;
            input{
              float: left;
              width: 4rem;
              height: 1.12rem;
              margin-left: 0.89rem;
              margin-bottom: 0.36rem;
            }
            button{
              margin-left: 0.43rem;
              width: 2.59rem;
              height: 1.12rem;
              position: absolute;
              background:linear-gradient(180deg,rgba(255,134,117,1) 0%,rgba(250,92,93,1) 100%);
              border-radius:1rem;
              outline: none;
              border: 0;
              font-size:0.36rem;
              font-family:SourceHanSansCN-Regular;
              font-weight:400;
              color:rgba(255,255,255,1);
            }
            .active{
              margin-left: 0.43rem;
              width: 2.59rem;
              height: 1.12rem;
              position: absolute;
              background:linear-gradient(180deg,rgba(230,230,230,1) 0%,rgba(204,204,204,1) 100%);
              border-radius:1rem;
              outline: none;
              border: 0;
              font-size:0.36rem;
              font-family:SourceHanSansCN-Regular;
              font-weight:400;
              color:rgba(255,255,255,1);
            }
          }

        }
        .process{
          width: 9.46rem;
          height: 3.15rem;
          background: url(../../assets/phone/recommend/process_pic.png) no-repeat;
          background-size: cover;
          margin: 2.5rem auto;
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
