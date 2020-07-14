<template>
  <div id="pc_login">
    <div class="close_box"><div class="close_switch" @click="closeButton"></div></div>
    <!--视图0-->
    <div class="find_view_zero" v-show="view_login_show">
      <p class="title">&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;录&nbsp;</p>
      <div class="icon_gongshe" ></div>
      <input type="text" class="phone_no" placeholder="手机号或邮箱号" v-model="userName" autocomplete="off">
      <input type="password" class="phone_no" placeholder="请输入登录密码" v-model="password" @keyup.enter="closeFrom" autocomplete="off">
      <p class="reminder">{{loginMsg}}</p>
      <button class="find" @click.prevent="closeFrom">登录</button>
      <div class="forget" ><span @click="enter_view_one">忘记密码？</span></div>
      <div class="container2" v-show="imgcode2">
        <div id="captcha2" style="position: relative;"></div>
        <div id="msg2"></div>
      </div>
    </div>
    <!--视图1-->
    <div class="find_view_one" v-show="view_getPassword_show">
      <p class="title">找回密码</p>
      <div class="icon_gongshe" ></div>
      <input type="text" class="phone_no" placeholder="手机号或邮箱号" v-model="userName" autocomplete="off" @focus="yzm(1)">
      <!-- <div class="verification_code_wrapper"><input type="text" class="phone_no" placeholder="填写验证码" v-model="verifyCode" @focus="yzm(2)"  @keyup.enter="getBackPassword" autocomplete="off"><img :src="verifyImg"  class="verification_code verification_code_background " @click="getVerifyImg"/></div> -->
      <div class="container" v-show="imgcode">
        <div id="captcha" style="position: relative;"></div>
        <div id="msg"></div>
      </div>
      <p class="reminder">{{backPasswordMsg}}</p>
      <button class="find"  @click="getBackPassword" :disabled="isDisabled">找回</button>
    </div>
    <!--视图2-->
    <div class="find_view_two" v-show="view_smsCode_show">
      <p class="title">找回密码</p>
      <div class="icon_gongshe" ></div>
      <p class="hint">已发送验证码至<span>{{userName2}}</span></p>
      <input type="text" class="phone_no" placeholder="填写验证码" v-model="smsCode" @keyup.enter="checkSmsCode" autocomplete="off">
      <p class="reminder">{{checkSmsMsg}}</p>
      <Button class="find" @click="checkSmsCode">确定</Button>
    </div>
    <!--视图3-->
    <div class="find_view_three" v-show="view_retrievePassword_show">
      <p class="title">重置密码</p>
      <div class="icon_gongshe" ></div>
      <input type="password" class="phone_no" placeholder="输入新的密码" v-model="newPassword" v-on:blur="pw" autocomplete="off">
      <input type="password" class="phone_no" placeholder="再次输入新的密码" v-model="newPassword2" @keyup.enter="retrieveSuccess" v-on:blur="ensurePassword" autocomplete="off">
      <p class="reminder">{{retrieveMsg}}</p>
      <Button class="find" @click="retrieveSuccess">确定</Button>
    </div>
    <!--视图4-->
    <div class="find_view_four" v-show="view_retrieveSuccess_show">
      <p class="title">重置密码</p>
      <div><span></span><p>修改成功</p></div>
      <Button class="find" @click="ensureSuccess">确定</Button>
    </div>
  </div>
</template>

<script>
import {login,getVerifyCode,checkVerifyCode,retrievePw,sendSmsCode,checkSmsCode,checkEmailCode,sendMailCode} from '@/service/userApi'
import retrieve_passwordVue from '../phone/retrieve_password.vue';
    export default {
        name: "pc_login",
        data() {
          return {
            view_login_show:true,
            view_getPassword_show:false,
            view_smsCode_show:false,
            view_retrievePassword_show:false,
            view_retrieveSuccess_show:false,
            isLoging:false,
            userName:"",
            userName2:"",
            password:"",
            newPassword:"",
            newPassword2:"",
            verifyImg:"",
            verifyCode:"",
            smsCode:"",
            loginMsg:"",
            backPasswordMsg:"",
            checkSmsMsg:"",
            retrieveMsg:"",
            captchaToken:"",
            emailToken:"",
            isDisabled:false,
            imgcode:false,
            imgcode2:false,
            xint:"",
            blockToken:"",
            uuid:"",
            content:"获取验证码",
            totalTime: 60,     
            canClick: true,
            type:"",
            token:""
          }
        },
      methods:{
        enter_view_one:function () {
          this.view_login_show=false
          this.view_getPassword_show=true;
          this.backPasswordMsg = ''
          this.userName = ""
          // this.getVerifyImg()
        },


        //关闭弹出框
        closeButton(){
          this.view_getPassword_show=false
          this.view_smsCode_show=false
          this.view_retrievePassword_show=false
          this.view_retrieveSuccess_show=false
          this.$emit("changeDialogFormVisible")
          this.view_login_show=true
          this.userName = ""
          this.password = ""
          this.smsCode = ""
          this.verifyCode = ""
          this.loginMsg = ""
          this.backPasswordMsg = ""
          this.checkSmsMsg = ""
          this.retrieveMsg = ""
          this.emailToken=""
          this.isDisabled = false 
          // this.imgcode = false,
          this.imgcode2 = false
          this.imgcode = false
          this.newPassword = ''
          this.newPassword2 = ''
        },
  

            //   getVerifyCode().then(res => {
            //   if (res.status === 200) {
            //     this.verifyImg = "data:image/png;base64," + res.data.data.captcha
            //     return this.captchaToken =res.data.data.captchaToken
            //   }else{
            //     console.log(res.message)
            //   }
            // }).catch( err => {
            //   console.log("网络异常")
            // })

        //登录
        closeFrom:function () {
          this.loginMsg = ""
          this.view_login_show=true
          this.view_getPassword_show=false
          this.view_smsCode_show=false
          this.view_retrievePassword_show=false
          this.view_retrieveSuccess_show=false
          if (!this.userName || !this.password) {
              this.loginMsg = "账号或密码不能为空"
              return;
            }
          let s = '34qrefefgwrtg24534245gwefgvsdfwrt24@**&%$!ytfthn'
          let form = new FormData()
          form.append('loginName',this.userName)
          form.append('password',this.$md5(s+this.password))
          form.append('clientId',this.uuid)
          form.append('clientType','PC')
          
          login(form).then(res => {
              this.isLoging = true
              if (res.data.status == 200) {
              // this.isLoging = false
              this.$emit("changeDialogFormVisible")
              // this.$store.state.token = res.data.data.token;
              this.userName = res.data.data.loginName||res.data.data.email
              this.$emit("name",this.userName);
              }else{
                this.loginMsg = res.data.message
                // this.isLoging = false
              }
            }).catch(err => {
              console.log(err);
            })
            this.loginMsg = ""
          // let self = this;
          //   let div = document.getElementById("captcha2");
          //   var childs = div.childNodes; 
          //   for(var i = childs .length - 1; i >= 0; i--) {
          //      div.removeChild(childs[i]);
          //   }
          //   this.imgcode = true
          //   this.jigsawPC.init(
          //     document.getElementById('captcha2'), function (xint,blockToken) {
          //       self.xint = xint;
          //       self.blockToken = blockToken
          //       console.log('====================================');
          //       console.log(self.xint,self.blockToken);
          //       console.log('====================================');
          //       self.imgcode = false;
               
              // });
             
            // this.isLoging = false
        },
        //获取验证码图片
        // getVerifyImg(){
        //     getVerifyCode().then(res => {

        //       if (res.data.status === 200) {

        //         this.verifyImg = "data:image/png;base64," + res.data.data.captcha
        //         return this.captchaToken =res.data.data.captchaToken
        //       }else{
        //         console.log(res.message)
        //       }
        //     }).catch( err => {
        //         console.log("网络异常")
        //     })
        //   },
          
          //获取手机或邮箱验证码
          getBackPassword:function () {
            let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
            let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            if (this.userName == '') {
              this.backPasswordMsg = "请输入手机号或邮箱"
              return
            }
            if(this.userName.length != 11&&!emailReg.test(this.userName)){
              this.backPasswordMsg ='请输入正确的手机号或邮箱'
              return
            }
            if(!phoneReg.test(this.userName)&&!emailReg.test(this.userName)){
              this.backPasswordMsg ='请输入有效的手机号邮箱'
              return
            }
            this.imgcode = true
            let self = this;
            let div = document.getElementById("captcha");
            var childs = div.childNodes; 
            for(var i = childs .length - 1; i >= 0; i--) {
               div.removeChild(childs[i]);
            }

            this.jigsawPC.init(
              document.getElementById('captcha'), function (xint,blockToken) {
                self.xint = xint;
                self.blockToken = blockToken
                console.log('====================================');
                console.log(self.xint,self.blockToken);
                console.log('====================================');
                self.imgcode2 = false;
                  let smscode = new FormData()
                  if(phoneReg.test(self.userName)){
                    smscode.append('mobile',self.userName)
                    smscode.append('BlockToken',self.blockToken)
                    smscode.append('xint',self.xint)
                    smscode.append('smsTypeEnum','FORGET_PSW')
                    this.isDisabled = true
                    sendSmsCode(smscode).then(res => {
                      
                      if (res.data.status == 200) {
                        self.view_getPassword_show=false;
                        self.view_smsCode_show=true
                        self.userName2 = self.userName.substr(0,3)+"****"+self.userName.substr(7)
                        self.backPasswordMsg = res.data.message;
                      }else{
                        self.backPasswordMsg = res.data.message
                      }
                    }).catch(err =>{
                      self.backPasswordMsg = "网络异常";
                    })
                  }else if(emailReg.test(self.userName)){
                    smscode.append('email',self.userName)
                    smscode.append('BlockToken',self.BlockToken)
                    smscode.append('xint',self.xint)
                    self.isDisabled = true
                    sendMailCode(smscode).then(res => {
                      
                      if (res.data.status == 200) {
                        self.emailToken = res.data.data.token;
                        self.view_getPassword_show=false;
                        self.view_smsCode_show=true
                        self.userName2 = self.userName.substr(0,3)+"****"+self.userName.substr(7)
                        self.backPasswordMsg = res.data.message;
                      }else{
                        self.backPasswordMsg = res.data.message
                      }
                    }).catch(err =>{
                      self.backPasswordMsg = "网络异常";
                    })
                  }
              })
          },
        // //检查手机验证码
        // checkSmsCode () {
        //   let checksms = new FormData()
        //   checksms.append('loginName',this.userName)
        //   checksms.append('smsCode',this.smsCode)
        //   checkSmsCode(checksms).then( res=> {
        //     if (res.data.status == 200) {
        //       this.view_smsCode_show=false;
        //       this.view_retrievePassword_show=true;
        //     }else{
        //       this.checkSmsMsg = res.data.message
        //     }
        //   })
        // },

        //检查手机或邮箱验证码
        checkSmsCode(){
          let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
          let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
          let phoneCode = new FormData();
          if(phoneReg.test(this.userName)){
            this.type="phone";
            phoneCode.append('loginName',this.userName)
            phoneCode.append('smsCode',this.smsCode)
            checkSmsCode(phoneCode).then(res => {
              if (res.data.status == 200) {
                      this.view_smsCode_show=false;
                      this.view_retrievePassword_show=true;
              }else{
                this.checkSmsMsg = res.data.message
              }
            }).catch(err => {
              this.checkSmsMsg = "网络异常";
            })
          }else if(emailReg.test(this.userName)){
            this.type="mail";
            phoneCode.append('email',this.userName)
            phoneCode.append('emailToken',this.emailToken)
            phoneCode.append('mailCode',this.smsCode)
            checkEmailCode(phoneCode).then(res => {
              if (res.data.status == 200) {
                this.view_smsCode_show=false;
                this.view_retrievePassword_show=true;
              }else{
                this.checkSmsMsg = res.data.message
              }
            }).catch(err => {
              this.checkSmsMsg = "网络异常";
            })
          }
        },



        // //重置密码
        // retrieveSuccess () {
        //   if (this.newPassword ==  '') {
        //   this.retrieveMsg = '请输入密码'
        //   return
        //   }
        //   if (this.newPassword < 6) {
        //     this.retrieveMsg = '密码长度不能小于6位数'
        //     return
        //   }
        //   if(this.newPassword2 == ''){
        //     this.retrieveMsg = '请再次输入密码'
        //     return
        //   }
        //   if(this.newPassword != this.newPassword2){
        //     this.retrieveMsg = '密码输入不一致'
        //     return
        //   }
        //   let s = '34qrefefgwrtg24534245gwefgvsdfwrt24@**&%$!ytfthn'
        //   let pw = new FormData()
        //   pw.append('loginName',this.userName)
        //   pw.append('password',this.$md5(s+this.newPassword))
        //   retrievePw(pw).then( res=> {
        //     if (res.data.status == 200) {
        //       this.view_retrievePassword_show=false
        //       this.view_retrieveSuccess_show=true
        //       this.retrieveMsg = ""
        //     }else{
        //       this.retrieveMsg = res.data.message
        //     }
        //   }).catch(err => {
        //     console.log(err);
        //   })
        // },


        retrieveSuccess(){
          if (this.newPassword ==  '') {
            this.retrieveMsg = '请输入密码'
            return
          }
          if(this.newPassword2 == ''){
            this.retrieveMsg = '请再次输入密码'
            return
          }
          if (this.newPassword.length < 6 ) {
              this.retrieveMsg = '密码长度不能小于6位数'
              return
          }
          if(this.newPassword != this.newPassword2){
                this.retrieveMsg = '密码输入不一致'
                return
          }
          let s = '34qrefefgwrtg24534245gwefgvsdfwrt24@**&%$!ytfthn'
          let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
          let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
          let pw = new FormData()
          if(phoneReg.test(this.userName)){
            pw.append('loginName',this.userName)
            pw.append('password',this.$md5(s+this.newPassword))
            pw.append('smsCode',this.smsCode)
            pw.append('Regtype',this.type)
            console.log(this.$md5(s+this.newPassword))
            retrievePw(pw).then(res => {
              if (res.data.status == 200) {
                    this.view_retrievePassword_show=false
                    this.view_retrieveSuccess_show=true
                    this.retrieveMsg = ""
              }else{
                this.retrieveMsg = res.data.message
              }
            }).catch(err => {
              this.retrieveMsg = "网络异常";
            })
          }else if(emailReg.test(this.userName)){
            pw.append('loginName',this.userName)
            pw.append('password',this.$md5(s+this.newPassword))
            pw.append('smsCode',this.smsCode)
            pw.append('Regtype',this.type)
            pw.append('emailToken',this.emailToken)
            console.log(this.$md5(s+this.newPassword))
            retrievePw(pw).then(res => {
              if (res.data.status == 200) {
                this.view_retrievePassword_show=false
                this.view_retrieveSuccess_show=true
                this.retrieveMsg = ""
              }else{
                this.retrieveMsg = res.data.message
              }
            }).catch(err => {
              this.retrieveMsg = "网络异常";
            })
          }
        },
        yzm(num){
          if (num == 1) {
            this.backPasswordMsg = ''
          }else if( num == 2){
            this.verifyCode = ''
            this.backPasswordMsg = ''
          }
          
        },



        pw(){
        if (this.newPassword.length < 6) {
          this.retrieveMsg = '密码长度不能小于6位数'
          }
        },
        ensurePassword(){
          if(this.newPassword != this.newPassword2){
            this.retrieveMsg ='密码输入不一致'
            return
          }
        },
        //修改密码成功
        ensureSuccess(){
          this.view_getPassword_show=false
          this.view_smsCode_show=false
          this.view_retrievePassword_show=false
          this.view_retrieveSuccess_show=false
          this.$emit("changeDialogFormVisible")
          this.view_login_show=true
          this.userName = ""
          this.password = ""
          this.smsCode = ""
          this.verifyCode = ""
          this.loginMsg = ""
          this.backPasswordMsg = ""
          this.checkSmsMsg = ""
          this.retrieveMsg = ""
          this.newPassword = ""
          this.newPassword2 = ""
          this.isDisabled = false
        }
      },
      created() {
        this.uuid = localStorage.getItem('uuid')
        
        // getVerifyCode().then(res => {

        //       if (res.status === 200) {

        //         this.verifyImg = "data:image/png;base64," + res.data.data.captcha
        //         this.token =res.data.data.token
        //       }else{
        //         console.log(res.message)
        //       }
        //     }).catch( err => {
        //         console.log("网络异常")
        //     })
        
      },
    }
</script>

<style lang="less">
#pc_login{
    width: 100%;

.container {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translateX(-50%) translateY(-50%);
  width: 400px;
  height: 320px;
  z-index: 111122;
  background:rgba(242,243,255,1);
    border:1px solid rgba(164,170,218,1);
    border-radius:6px;
    box-shadow:0px 0px 13px rgba(152,159,203,1);
    #captcha{
      width: 360px;
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
.container2 {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translateX(-50%) translateY(-50%);
  width: 400px;
  height: 320px;
  z-index: 111122;
  background:rgba(242,243,255,1);
    border:1px solid rgba(164,170,218,1);
    border-radius:6px;
    box-shadow:0px 0px 13px rgba(152,159,203,1);
    #captcha2{
      width: 360px;
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
  #msg2 {
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

.el-loading-mask{
    background-color: #A3AAD8!important;
  }
.circular .path{
  background: #000!important;
}
.el-loading-spinner .path{
  stroke:#000!important;
}
  
  .close_box{
    width: 100%;
    /*width: 23px;*/
    height: 1px;
    /*background-color: #f0c78a;*/
    position: relative;
    /*top: 97px;*/
    /*left: 165%;*/
    /*border: #f0c78a solid 2px;*/
    display: flex;
    flex-direction: row;
    /*justify-content: right;*/
    justify-content: flex-end;

  }
  .close_switch{
    width: 23px;
    height: 23px;
    background:url("../../../src/assets/pc/close_normal@2x.png") no-repeat center;
    background-size: cover;
    /*background-color: red;*/
    position: absolute;
    top: 91px;
    right: 105px;
    cursor: pointer;
  }
  .close_switch:hover{
    background:url("../../../src/assets/pc/close_hover@2x.png") no-repeat center;
    background-size: cover;
  }
  .close_switch:active{
    background:url("../../../src/assets/pc/close_click@2x.png") no-repeat center;
    background-size: cover;
  }

  //五个视图共用的公共类
  .reminder{
    width: 405px;
    height: 16px;
    line-height: 16px;
    font-size:16px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(245,110,126,1)
  }


  .find_view_one{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /*border: red solid 1px;*/

  }
  .find{
      margin-top: 20px;
      outline: none;
      border:0
    }

  .find_view_zero{
    display: flex;
    flex-direction: column;
    align-items: center;
    /*border: red solid 1px;*/
    .reminder{
      width: 405px;
      height: 16px;
      line-height: 16px;
      font-size:16px;
      font-family:SourceHanSansCN-Regular;
      font-weight:400;
      color:rgba(245,110,126,1)
    }

    .forget{
      width: 405px;
      height:16px;
      line-height: 16px;
      margin-top: 34px;
      font-size:16px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(173,179,219,1);
      span{
        cursor: pointer;
      }
    }
  }
  .find_view_one{
    display: flex;
    flex-direction: column;
    align-items: center;
    /*border: red solid 1px;*/
  }
  input{
    box-sizing: border-box;
    border:1px solid rgba(116,134,255,1);
    padding-left: 12px;
    outline:none;
    border-radius: 6px;
  }

  input:focus{
    border-color: rgba(116,134,255,1);

  }
  input::-webkit-input-placeholder {
    color: #aab2bd;
  }
  .title{
    width:97px;
    height:24px;
    line-height: 24px;
    font-size:23px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    color:rgba(88,96,150,1);
    margin-top: 89px;
    text-align:center;
  }
  .icon_gongshe{
    width: 124px;
    height: 28px;
    margin-top: 69px;
    margin-bottom: 59px;
    /*background-color: red;*/
    // background: url("../../assets/pc/logo@2x.png") no-repeat center;
    background-size: cover;
  }
  .phone_no{
    width:405px;
    height:50px;
    background:rgba(242,243,255,1);
    border:1px solid rgba(164,170,218,1);
    border-radius:6px;
    padding-left: 15px;
    /*margin-top: 59px;*/
    margin-bottom: 24px;
  }
  .verification_code_wrapper{
    /*border: solid 1px red;*/
    position: relative;
    left: 37px;
  }
  .verification_code{
    display: inline-block;
    width: 70px;
    height: 20px;
    line-height: 20px;
    padding-left: 3px;
    /*padding-right: 12px;*/
    text-align: center;
    border-left:solid 2px rgba(164,170,218,1);;
    position: relative;
    left: -80px;
    top: 2px;
    color:rgba(116,134,255,1);
    z-index: 20;
  }
  .verification_code_background{
    border-left:none;
    width: 72px;
    height: 37px;
    line-height: 37px;
    background-color: #fff;

  }
  .find{
    width:405px;
    height:50px;
    background:rgba(173,179,219,1);
    border-radius:6px;
    margin-top: 10px;
    border: none;
    font-size:16px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .find:hover{
    background:rgba(195,200,234,1);
  }
  .find:active{
    background: #A3AAD8;
  }
  /*.find:active{*/
  /*background:rgba(163,170,216,1);*/
  /*}*/
  .find_view_two{
    display: flex;
    flex-direction: column;
    align-items: center;
    /*border: red solid 1px;*/
    .hint{
      margin-top: 18px;
      width:405px;
      height:50px;
      font-size:16px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(181,186,219,1);
      margin-left: 0px;
      margin-bottom: 40px;
    }
  }

  /*进入视图3*/
  .find_view_three{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .find_view_four{
    display: flex;
    flex-direction: column;
    align-items: center;
    /*border: red solid 1px;*/
    div{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-top: 175px;
      margin-bottom: 140px;
      span{
        display: inline-block;
        width: 33px;
        height: 33px;
        /*background-color: rebeccapurple;*/
        background: url("../../assets/pc/icon_finish@2x.png") no-repeat center;
        background-size: cover;
      }
      p{
        display: inline-block;
        margin-left: 13px;
      }

    }

  }
  }
</style>
