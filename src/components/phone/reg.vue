<template>
  <div class="reg">
    <div class ="logo" @click="back"><img src="../../assets/phone/logo_h5.png" alt=""></div>
    <div class="content">
      <form action="" id="form">
        <div class="input-group">
          <input type="text" id="phone" placeholder="手机号或邮箱" v-model="phone"  autocomplete="off">
        </div>
        <div class="input-group">
          <input type="text" id="verification" placeholder="请输入验证码" v-model="smsCode"  autocomplete="off">
          <span></span>
          <button @click.prevent="getVerifyImg">{{content}}</button>
        </div>
        <div class="input-group">
          <input type="password" id="pwd1" placeholder="请输入密码" v-model="password" v-on:blur="pw"  autocomplete="off">
        </div>
        <div class="input-group">
          <input type="password" id="pwd2" placeholder="请输入确认密码" v-model="password2" v-on:blur="ensurePassword"  autocomplete="off">
        </div>
        <div class="input-group">
          <input type="text" id="referral" placeholder="请输入推荐码"  v-model="recommendCode" :disabled="isDisabled"  autocomplete="off">
          <span v-show="ref_code_show"></span>
          <button @click.prevent="ref_code" :disabled="isDisabledCode" v-show="ref_code_show">{{context}}</button>  
        </div>
        <div class="input-group treaty">
          <img :src="isRead?img.checkPre:img.checkNor" @click="readProtocol">
          <span>阅读并同意</span>
          <a style="margin-left:0">用户协议</a>
        </div>
        <div class="input-group">
          <router-link :to="{path:''}"><input type="submit" id="getButton" @click.prevent="registerButton()" value="注册"></router-link>
        </div>
        <!-- <div class="pop-up" v-show="dialogVisible">
          <div class="code">
            <input type="text" v-model="inputCaptcha" placeholder="输入图形验证码">
            <img :src="verifyImg" alt="" @click.prevent="getVerifyImg">
            <input type="submit" id="confirm" @click.prevent="Verify_graphics" value="确定">
          </div>
        </div> -->
        <div class="container" v-show="imgcode">
          <div id="captcha" style="position: relative;"></div>
          <div id="msg"></div>
        </div>
      </form>
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
import{sendSmsCode,sendMailCode,register,getVerifyCode,checkVerifyCode} from "@/service/userApi"
import checkNor from "../../assets/phone/check_normal_h5@2x.png"
import checkPre from "../../assets/phone/check_pressed_h5@2x.png"
import { rejects } from 'assert';
import { watch } from 'fs';
  export default {
    name: "reg",
    components: {
      Toast,
      checkNor,
      checkPre
    },
    data () {
      return {
        content: '发送验证码',  // 按钮里显示的内容
        totalTime: 60,     //记录具体倒计时时间
        canClick: true, //添加canClick
        context:"获取推荐码",
        toastText:"",
        loadingText:"",
        noneTip:false,
        showLoading:false,
        isDisabled:false,
        isDisabledCode:false,
        phone:"",
        password:"",
        password2:"",
        smsCode:"",
        recommendCode:"",
        isRead: true,
        type:"",
        token:"",
        dialogVisible:false,
        ref_code_show:true,
        verifyImg:"",
        img: {
          checkNor: checkNor,
          checkPre: checkPre
        },
        inputCaptcha:"",
        captchaToken:"",
        xint:"",
        blockToken:"",
        imgcode:false,
        uuid:""
      }
    },
    methods: {
      getVerifyImg(){
        let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
        let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        
        if (this.phone == '') {
          this.toast("请输入手机号或邮箱")
        }else if(this.phone.length != 11&&!emailReg.test(this.phone)){
          this.toast('请输入正确的手机号或邮箱')
        }else if(!phoneReg.test(this.phone)&&!emailReg.test(this.phone)){
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
          // this.dialogVisible=true;
          // getVerifyCode().then(res => {
          //   if (res.status === 200) {
          //     this.verifyImg = "data:image/png;base64," + res.data.data.captcha
          //     return this.captchaToken =res.data.data.captchaToken
          //   }else{
          //     this.toast(res.message)
          //   }
          // }).catch( err => {
          //   this.toast(err);
          // })
        }
      },
      back(){
        this.$router.push({path:'/',query:{"recommendCode":this.recommendCode}});
      },
      countDown () {
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
            }
          },1000)
          let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
          let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
          let smscode = new FormData()
          if(phoneReg.test(this.phone)){
            smscode.append('mobile',this.phone)
            smscode.append('BlockToken',this.blockToken)
            smscode.append('xint',this.xint)
            smscode.append('smsTypeEnum','REGISTERED')

            sendSmsCode(smscode).then(res => {
              if (res.data.status == 200) {
                this.toast(res.data.message);
              }else{
                this.toast(res.data.message)
              }
            }).catch(err =>{
              this.toast("网络异常");
            })
            return this.type="phone";
          }else if(emailReg.test(this.phone)){
            smscode.append('email',this.phone)
              smscode.append('BlockToken',this.blockToken)
              smscode.append('xint',this.xint)
            sendMailCode(smscode).then(res => {
              if (res.data.status == 200) {
                this.toast("发送邮件成功");
                return this.token = res.data.data.token;
              }else{
                this.toast(res.data.message)
              }
            }).catch(err =>{
              this.toast("网络异常");
            })
            return this.type="mail";
          }
      },
      // Verify_graphics(){
      //   let verifycode = new FormData();
      //   verifycode.append('captcha',this.inputCaptcha)
      //   verifycode.append('captchaToken',this.captchaToken)
        
      //   if(this.verifycode=''){
      //     this.toast('请输入验证码')
      //   }else{
      //     this.loading("正在提交数据...");
      //     checkVerifyCode(verifycode).then(res =>{
      //       this.showLoading = false;
      //       if(res.data.status==200){
      //         this.countDown();
      //         this.dialogVisible=false;
      //       }else{
      //         this.toast(res.data.message)
      //       }
      //     }).catch(err => {
      //       this.showLoading = false;
      //       this.toast(err)
      //     })
      //   }
      // },
      //获取推荐码
      ref_code(){

        if(this.recommendCode == ''){
          this.isDisabledCode = false
          this.recommendCode="666666";
        }
        
      },
      //注册
      registerButton(){
        let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
        let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        
        if (this.phone == '') {
          this.toast("请输入手机号或邮箱")
          return
        }
        if(this.phone.length != 11&&!emailReg.test(this.phone)){
          this.toast('请输入正确的手机号或邮箱')
          return
        }
        if(!phoneReg.test(this.phone)&&!emailReg.test(this.phone)){
          this.toast('请输入有效的手机号或邮箱')
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
        if (this.password <6) {
          this.toast('密码长度不能小于6位数')
        }
        if(this.password2 == ''){
          this.toast('请再次输入密码')
          return
        }
        if (this.password.length < 6) {
          this.toast('密码长度不能小于6位数')
        }
        if(this.password != this.password2){
          this.toast('密码输入不一致')
          return
        }
        if (!this.isRead) {
          this.toast('请勾选协议')
          return
        }
        if(this.recommendCode==''){
          this.toast('请输入推荐码')
          return
        }
         let s = '34qrefefgwrtg24534245gwefgvsdfwrt24@**&%$!ytfthn'
        let reg = new FormData()
        this.loading("正在提交数据...");
        reg.append('loginName',this.phone)
        reg.append('password',this.$md5(s+this.password))
        reg.append('smsCode',this.smsCode)
        reg.append('recommendedCode',this.recommendCode)
        reg.append('Regtype',this.type)
        reg.append('clientId',this.uuid)
        reg.append('clientType','PC')
        if(this.type=="mail"){
          reg.append('emailToken',this.token)
          register(reg).then(res => {
            this.showLoading = false;
            // console.log(res.data);
            if (res.data.status == 200) {

              this.toast("注册成功")
              this.$router.push('/succeedM')
            }else{
              this.toast(res.data.message)
            }
          }).catch(err =>{
            this.showLoading = false;
            this.toast("网络异常")
          })
        }else if(this.type=="phone"){
          console.log(1111);         
          register(reg).then(res => {
            this.showLoading = false;
            // console.log(res.data);
            if (res.data.status == 200) {
              this.toast("注册成功")
              this.$router.push('/succeedM')
            }else{
              this.toast(res.data.message)
            }
          }).catch(err =>{
            this.toast("网络异常")
          })
        }
        },

      pw(){
        if (this.password.length < 6) {
          this.toast('密码长度不能小于6位数')
        }
      },
      ensurePassword(){
        if(this.password != this.password2){
          this.toast('密码输入不一致')
          return
        }
      },
      
      readProtocol() {
        this.isRead = !this.isRead
      },
      loading(msg) {
        this.loadingText = msg;
        this.showLoading = true
      },
      toast(msg) {
        this.toastText = msg;
        this.noneTip = true;
      },
      // GetQueryString(name){ 
      //   return decodeURIComponent((new RegExp('[?|&]'+name+ '='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[''])[1].replace(/\+/g,'%20')) || null
      // } 
      
    },
    created(){
      this.uuid = localStorage.getItem('uuid')
      console.log(this.uuid);
      
    },
    mounted () {
      // this.recommendCode = this.GetQueryString('recommendCode')
      this.recommendCode = this.$route.query.recommendCode ||this.recommendCode ||''
      if(this.recommendCode != ''){
          this.isDisabled = true;
          this.isDisabledCode = true
          this.ref_code_show = false
      }else{
        this.isDisabled = false;
        this.recommendCode = ''
        this.isDisabledCode = false
        this.ref_code_show = true
      }
      this.recommendCode = localStorage.setItem("recommendCode",this.recommendCode)
      this.recommendCode = localStorage.recommendCode
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

    .reg{
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
        .input-group:nth-child(5){
          margin-bottom: 20/108rem;

        }
        .input-group:nth-child(6){
          height: 50/108rem;
        }
        .treaty{
          line-height: 50/108rem;
          margin-bottom: 10/108rem;
          img{
            width: 43/108rem;
            height: 43/108rem;
            vertical-align: middle;
          }
          span{
            font-size: 0.3rem;
            vertical-align: middle;
            color: #586096;
            font-family:SourceHanSansCN-Regular;
          }
          a{
            font-size: 0.27rem;
            color:#7486FF;
            vertical-align: middle;
            font-family:SourceHanSansCN-Regular;
          }
        }
        .input-group{
          margin-bottom: 53/108rem;
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
        .input-group:nth-child(2),.input-group:nth-child(5){
          position: relative;
          span{
            display: inline-block;
            position: absolute;
            top:50%;
            right: 30%;
            transform: translateX(-10%) translateY(-50%);
            height: 0.5rem;
            border: solid rgba(164,170,218,1) 0.01rem;
            background: rgba(164,170,218,1);
          }
          button{
            width: 2rem;
            position: absolute;
            top:50%;
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
        .pop-up{
          position: absolute;
          top: 0rem;
          left: 0px;
          width: 100%;
          height: 100%;
          .code{
            position: relative;
            top: 520/108rem;
            left: 134/108rem;
            width:807/108rem;
            height:460/108rem;
            background:rgba(242,243,255,1);
            border-radius:10px;
            box-shadow:0px 10px 49px 0px rgba(166,169,204,0.57);
            input{
              margin-left: 71/108rem;
              margin-top: 93/108rem;
              width:460/108rem;
              height:120/108rem;
              background:rgba(242,243,255,1);
              border:1px solid rgba(164,170,218,1);
              border-radius:6/108rem;
              text-indent: 0.3rem;
            }
            input::-webkit-input-placeholder{
              color:rgba(181,186,219,1);
              text-indent: 0.3rem;
            }
            img{
              width: 195/108rem;
              height: 91/108rem;
              position: absolute;
              top:33.5%;
              right: 5%;
              transform: translateX(-10%) translateY(-50%);
            }
            #confirm{
              text-indent: 0rem;
              margin-left: 71/108rem;
              margin-top: 47/108rem;
              width: 675/108rem;
              height: 120/108rem;
              background:rgba(173,179,219,1);
              color: #FFFFFF;
              font-size: 0.45rem;
              font-family:MicrosoftYaHei;
              outline: none;
              border: none;
            }
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
