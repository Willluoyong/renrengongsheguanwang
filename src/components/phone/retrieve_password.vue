<template>
  <div class="retrieve">
    <div class ="logo"><img src="../../assets/phone/logo_h5.png" alt=""></div>
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
        <!-- <div class="input-group">
          <span>验证码</span>
          <input type="text" id="verification" v-model="inputCaptcha"  autocomplete="off">
          <img :src="verifyImg" alt="" @click.prevent="getVerifyImg">
        </div> -->
        <div class="input-group">
          <router-link :to="{path:''}"><input type="button" id="getButton" value="找回" @click.prevent="getBackPassword"></router-link>
        </div>
      </form>
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
import{getVerifyCode,checkVerifyCode,sendSmsCode,sendMailCode} from '@/service/userApi'
import { log } from 'util';
    export default {
        name: "retrieve_password",
        components: {
          Toast
        },
        data(){
          return{
            userName:"",
            verifyImg:"",
            inputCaptcha:"",
            showLoading:false,
            noneTip:false,
            toastText:"",
            loadingText:"",
            captchaToken:"",
            emailToken:"",
            imgcode:false,
            xint:"",
            blockToken:""
            
          }
        },
        methods: {
          // getVerifyImg(){
          //   getVerifyCode().then(res => {
          //     if (res.status === 200) {
          //       this.verifyImg = "data:image/png;base64," + res.data.data.captcha
          //       return this.captchaToken =res.data.data.captchaToken
          //     }else{
          //       this.toast(res.message)
          //     }
          //   }).catch( err => {
          //       this.toast(err);
          //   })
          // },
          getBackPassword(){
            
            let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
            let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            if (this.userName == '') {
              this.toast("请输入手机号或邮箱")
            }else if(this.userName.length != 11&&!emailReg.test(this.userName)){
              this.toast('请输入正确的手机号或邮箱')
            }else if(!phoneReg.test(this.userName)&&!emailReg.test(this.userName)){
              this.toast('请输入有效的手机号或邮箱')
            }else{
              let verifycode = new FormData()
              verifycode.append('captcha',this.inputCaptcha)
              verifycode.append('captchaToken',this.captchaToken)
              if (this.verifycode ='') {
                this.toast('请输入验证码')
              }else{
                // this.loading("正在提交数据...");
                this.imgcode = true
                let self = this;
                this.jigsawM.init(
              document.getElementById('captcha'), function (xint,blockToken) {
                self.xint = xint;
                self.blockToken = blockToken
                console.log('====================================');
                console.log(self.xint,self.blockToken);
                console.log('====================================');
                self.imgcode = false;
                console.log(111);
                
                let smscode = new FormData()
                console.log(222);
                    if(phoneReg.test(self.userName)){
                      smscode.append('mobile',self.userName)
                      smscode.append('BlockToken',self.blockToken)
                      smscode.append('xint',self.xint)
                      smscode.append('smsTypeEnum','FORGET_PSW')
                      sendSmsCode(smscode).then(res => {
                        self.showLoading = false;

                        
                        
                        if (res.data.status == 200) {
              
                          sessionStorage.setItem("userName", self.userName);
                          let userName = sessionStorage.getItem("userName")
                          // console.log(userName)
                          self.$router.push({path:'/password_codeM'})
                          // console.log(userName);
                          self.toast(res.data.message);
                        }else{
                          self.toast(res.data.message)
                        }
                      }).catch(err =>{
                        self.showLoading = false;
                        self.toast("网络异常");
                      })
                    }else if(emailReg.test(self.userName)){
                      smscode.append('email',self.userName)
                      smscode.append('BlockToken',self.blockToken)
                      smscode.append('xint',self.xint)
                      sendMailCode(smscode).then(res => {
                        self.showLoading = false;
                        if (res.data.status == 200) {
                          self.emailToken = res.data.data.token;
                          sessionStorage.setItem("userName", self.userName);
                          sessionStorage.setItem("emailToken", self.emailToken);
                          self.$router.push({path:'/password_codeM'})
                          // console.log(userName);
                          self.toast(res.data.message);
                        }else{
                          self.toast(res.data.message)
                        }
                      }).catch(err =>{
                        self.showLoading = false;
                        self.toast("网络异常");
                      })
                    }
              });
                
                    
                  
              }
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
        
        // created(){
        //   this.getVerifyImg();
        // },

    }
</script>

<style lang="less">
  body{
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
    background: rgba(242,243,255,1);
    .retrieve{
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
          input::-webkit-input-placeholder{
            color:rgba(181,186,219,1);
            text-indent: 0.3rem;
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
        .input-group:nth-child(2){
          position: relative;
          img{
            display: block;
            width: 195/108rem;
            height: 91/108rem;
            position: absolute;
            // background: #fff;
            top:68%;
            right: 5%;
            transform: translateX(-10%) translateY(-50%);
          }
        }
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

