<template>
  <div id="pc_reg">
    <div class="close_box"><div class="close_switch" @click="closeRegistBox"></div></div>
    <!--注册视图1-->
    <div class="reg_view_one" v-show="reg_view_one_show">
      <p class="title">注册</p>
      <input type="text" class="public_input" placeholder="手机号或邮箱号" v-model="phone" autocomplete="off">
      <div class="verification_code_wrapper"><input type="text" class="public_input" placeholder="填写验证码" v-model="smsCode" autocomplete="off"><span class="verification_code" @click="getVerifyImg">{{content}}</span></div>
      <input type="password" class="public_input" placeholder="请输入密码" v-model="password" v-on:blur="pw" autocomplete="off">
      <input type="password" class="public_input" placeholder="请再次输入密码" v-model="password2" v-on:blur="ensurePassword" @keyup.enter="regButton" autocomplete="off">
      <div class="verification_code_wrapper"><input type="text" class="public_input" placeholder="请输入推荐码" v-model="recommendCode" :disabled="isDisabled" autocomplete="off"><span class="verification_code" :disabled="isDisabledCode" v-show="ref_code_show" @click="get_recommendCode">获取推荐码</span></div>
      <div class="agreement_box"><span class="chooce_item" :class="{check_click_state:check_state_switch}" @click="check_state"></span>阅读并同意<a href="#" style="color:#7486FF;margin-left:0">用户协议</a></div>
      <button class="find"  @click="regButton">注册</button>
      <p class="reminder">{{msg}}</p>
      <!-- <div id="myModal" class="modal" v-show="verification_box_visibile">
        <div><input type="text" class="img_verification" v-model="inputCaptcha"  placeholder="输入图形验证码"><img :src="verifyImg" class="sys_verification" @click="getVerifyImg"/></div>
        <button @click="Verify_graphics">确定</button>
      </div> -->
    </div>
    <div class="container" v-show="imgcode">
      <div id="captcha" style="position: relative;"></div>
      <div id="msg"></div>
    </div>
    <!--注册视图2-->
    <div class="reg_view_two" v-show="reg_view_two_show">
      <p class="title">注册</p>
      <div class="reg_success">
        <span class="success">下载APP实名认证后即可获得资产大礼</span>
      </div>
      
      <button class="find"  @click="closeRegistBox">我知道了</button>
    </div>
  </div>
</template>

<script>
import{sendMailCode,sendSmsCode,register,getVerifyCode,checkVerifyCode} from "@/service/userApi"
    export default {
        name: "pc_regist",
        data() {
          return {
            imgcode:false,
            reg_view_one_show:true,
            reg_view_two_show:false,
            content: '获取验证码',  // 按钮里显示的内容
            totalTime: 60,     //记录具体倒计时时间
            canClick: true ,//添加canClick
            load_state:false,  //默认情况下下载盒子是待点击状态
            check_state_switch:false, //默认情况下勾选状态
            isDisabled:false,
            isDisabledCode:false,
            ref_code_show:true,
            phone:"",
            smsCode:"",
            password:"",
            password2:"",
            recommendCode:"",
            msg:"",
            type:"",
            token:"",
            verification_box_visibile: false,
            verifyImg:'',
            inputCaptcha:"",
            captchaToken:"",
            clock:"",
            xint:"",
            blockToken:"",
            uuid:""
          }
        },
      methods:{
        //子组件关闭盒子方法
        closeRegistBox:function () {
          this.$emit("changeRegistBoxVisible")
          this.reg_view_one_show=true;
          this.reg_view_two_show=false;
            this.phone= "",
            this.smsCode= "",
            this.password= "",
            this.password2= "",
            this.msg= "",
            this.inputCaptcha='',
            this.content='获取验证码'
            // this.totalTime=0;
            window.clearInterval(this.clock)
            this.totalTime=60
            this.imgcode = false

            if (!this.$route.query.recommendCode) {

              this.recommendCode = ''
              return
            }
        },
        //获取手机验证码
        countDown () {
          // 时间
          this.content = this.totalTime + 's'
           this.clock = window.setInterval(() => {
            this.totalTime--
            this.content = this.totalTime + 's'
            if (this.totalTime < 0) {
              window.clearInterval(this.clock)
              this.content = '重新发送' 
              this.totalTime = 60
              this.canClick = true  //这里重新开启
            }
          },1000);

          let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
          let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
          if (this.phone == '') {
            this.msg = "请输入手机号或邮箱号！";
          }else if(this.phone.length != 11&&!emailReg.test(this.phone)){
            this.msg = "请输入正确的手机号或邮箱号！";
          }else if(!phoneReg.test(this.phone)&&!emailReg.test(this.phone)){
            this.msg = "请输入有效的手机号或邮箱号！";
          }else{
            if (!this.canClick) return  //改动的是这两行代码
            this.canClick = false

            let smscode = new FormData()
            if(phoneReg.test(this.phone)){
              smscode.append('mobile',this.phone)
              smscode.append('BlockToken',this.blockToken)
              smscode.append('xint',this.xint)
              smscode.append('smsTypeEnum','REGISTERED')
              sendSmsCode(smscode).then(res => {
                if (res.data.status == 200) {
                  this.msg = res.data.message
                }else{
                  this.msg = res.data.message
                }
              }).catch(err =>{
                this.msg = "网络异常！";
              })
              return this.type="phone";
            }else if(emailReg.test(this.phone)){
              smscode.append('email',this.phone)
              smscode.append('BlockToken',this.blockToken)
              smscode.append('xint',this.xint)
              sendMailCode(smscode).then(res => {
                if (res.data.status == 200) {
                  this.msg = "发送邮件成功！"
                  return this.token = res.data.data.token;
                }else{
                  this.msg = res.data.message
                }
              }).catch(err =>{
                this.msg = "网络异常！";
              })
              return this.type="mail";
            }


          }
        },
        // 获取推荐码
        get_recommendCode(){
          if (this.recommendCode == '') {
            
            this.recommendCode="666666"
          }
          

        },
        //注册
        regButton () {
          let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
          let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
          if (this.phone == '') {
            this.msg = "请输入手机号或邮箱号！";
            return
          }
          if(this.phone.length != 11&&!emailReg.test(this.phone)){
            this.msg = '请输入正确的手机号或邮箱';
            return
          }
          if(!phoneReg.test(this.phone)&&!emailReg.test(this.phone)){
            this.msg = '请输入有效的手机号或邮箱号!';
            return
          }
          if (this.smsCode == '') {
            this.msg = "请输入验证码"
            return
          }
          if (this.password ==  '') {
            this.msg = '请输入密码'
            return
          }
          if(this.password.length <6){
            this.msg = '密码长度不能小于6位数'
            return
          }
          if(this.password2 == ''){
            this.msg = '请再次输入密码'
            return
          }
          if(this.password != this.password2){
            this.msg = '密码输入不一致'
            return
          }
          if (!this.check_state_switch) {
            this.msg = '请勾选协议'
            return
          }
          let s = '34qrefefgwrtg24534245gwefgvsdfwrt24@**&%$!ytfthn'
          let reg = new FormData()
          reg.append('loginName',this.phone)
          reg.append('password',this.$md5(s+this.password))
          reg.append('smsCode',this.smsCode)
          reg.append('recommendedCode',this.recommendCode)
          reg.append('Regtype',this.type)
          reg.append('clientId',this.uuid)
          reg.append('clientType','PC')
          if (this.type=="mail"){
            reg.append('emailToken',this.token)
            register(reg).then(res => {
              console.log(res.data);
              if (res.data.status == 200) {
                this.reg_view_one_show=false;
                this.reg_view_two_show=true;
              }else{
                this.msg = res.data.message
              }
            }).catch(err =>{
              this.msg = "网络异常"
            })
          }else{
            register(reg).then(res => {
              console.log(res.data);
              if (res.data.status == 200) {
                this.reg_view_one_show=false;
                this.reg_view_two_show=true;
              }else{
                this.msg = res.data.message
              }
            }).catch(err =>{
              this.msg = "网络异常"
            })
          }

        },
        
        //获取验证码图片
        getVerifyImg(){
          let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
          let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
          if (this.phone == '') {
            this.msg = "请输入手机号或邮箱号！";
          }else if(this.phone.length != 11&&!emailReg.test(this.phone)){
            this.msg = "请输入正确的手机号或邮箱号！";
          }else if(!phoneReg.test(this.phone)&&!emailReg.test(this.phone)){
            this.msg = "请输入有效的手机号或邮箱号！"; 
          }else {
            this.verification_box_visibile=false;
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
                
                self.countDown()
                self.imgcode = false;

              });
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
          }

        },

        // Verify_graphics(){
        //   let verifycode = new FormData();
        //   verifycode.append('captcha',this.inputCaptcha);
        //   verifycode.append('captchaToken',this.captchaToken);
        //   if (this.verifycode==''){
        //     this.msg = '请输入验证码';
        //   } else {
        //     checkVerifyCode(verifycode).then(res=>{
        //         if(res.data.status==200){
        //           this.countDown();
        //           this.verification_box_visibile=false;
        //           this.inputCaptcha='';
        //         }else{
        //           this.msg = res.data.message;

        //         }
        //     }).catch(
        //       err=>{
        //         console.log(err)
        //       }
        //     )
        //   }
        // },

        // created() {
        //   this.getVerifyImg();

        // },


        //
        pw(){
          if(this.password.length <6){
            this.msg = '密码长度不能小于6位数';
            return
          }
        },
        //判断密码是否一致
        ensurePassword(){
        if(this.password != this.password2){
          this.msg = '密码输入不一致';
          return
        }
      },
        //勾选协议
        check_state(){
          this.check_state_switch=!this.check_state_switch;
        }
      },
      created(){
        this.uuid = localStorage.getItem('uuid')
          

      },
      mounted () {
      // this.recommendCode = this.GetQueryString('recommendCode')
      this.recommendCode = this.$route.query.recommendCode || ''
      if(this.recommendCode != ''){
          this.reg_view_one_show = true
          this.isDisabled = true
          this.isDisabledCode = true
          this.ref_code_show = false
      }else{
        this. isDisabled = false
        this.recommendCode = ''
        this.isDisabledCode = false
        this.ref_code_show = true
      }
    }
    }
</script>

<style lang="less">
#pc_reg{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

.container {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translateX(-50%) translateY(-50%);
  width: 400px;
  height: 320px;
  z-index: 1111;
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

  /* 弹窗 (background) */
  .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative; /* 固定定位 */
    z-index: 3000; /* 设置在顶层 */
    left: 0;
    top: -350px;
    overflow: auto;
    width:324px;
    height:180px;
    background:rgba(242,243,255,1);
    border:1px solid rgba(164,170,218,1);
    border-radius:6px;
    box-shadow:0px 0px 13px rgba(152,159,203,1);
    div{
       /*height: 52px;*/
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .img_verification{
        width:180px;
        height:45px;
        background:rgba(242,243,255,1);
        border:1px solid rgba(164,170,218,1);
        border-radius:6px;
      }
      .sys_verification{
        display: inline-block;
        margin-left: 9px;
        width: 75px;
        height: 45px;
        line-height: 50px;
      }
    }

    button{
      margin-top: 14px;
      width:284px;
      height:45px;
      background:rgba(173,179,219,1);
      border-radius:6px;
      border: none;
      font-size:16px;
      color:rgba(255,255,255,1);
      outline: none;
    }
    button:hover{
      background:rgba(195,200,234,1);
    }
  }


  //----


  
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
  .reg_view_one{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    /*height: 900px;*/
    /*border:seagreen solid 1px;*/
    box-sizing: border-box;

    .reminder{
      width: 405px;
      height: 16px;
      line-height: 16px;
      font-size:16px;
      font-family:SourceHanSansCN-Regular;
      font-weight:400;
      color:rgba(245,110,126,1)
    }
  }

  .public_input{
    box-sizing: border-box;
    width:405px;
    height:50px;
    background:rgba(242,243,255,1);
    border:1px solid rgba(164,170,218,1);
    border-radius:6px;
    /*position: relative;*/
    /*bottom: 34px;*/
    margin-bottom: 24px;
  }
  .agreement_box{
    width: 405px;
    height: 20px;
    /*margin-bottom: 24px;*/
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    .chooce_item{
       display: inline-block;
       width: 20px;
       height: 20px;
       /*background-color: red;*/
       background: url("../../assets/pc/check_normal@2x.png") no-repeat center;
       background-size: cover;
       margin-right: 12px;
     }


    .check_click_state{
      /*background-color: red;*/
      background: url("../../assets/pc/check_click@2x.png") no-repeat center;
      background-size: cover;
    }
  }

  .find{
      width:405px;
      height:50px;
      background:rgba(173,179,219,1);
      border-radius:6px;
      margin-top: 24px;
      margin-bottom: 14px;
      border: none;
      font-size:16px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      outline: none
    }
    .find:hover{
      background:rgba(195,200,234,1);
    }
    .find:active{
      background: #A3AAD8;
    }

  .reg_view_two{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    /*height: 700px;*/
    /*border:seagreen solid 1px;*/
    box-sizing: border-box;
    /*box-sizing: content-box;*/
    .title{
      /*margin-bottom: 50px;*/
      /*margin-top: 40px;*/
      /*background-color: rosybrown;*/
    }
    .reg_success{
      width: 363px;
      height: 313px;
      /*background-color: red;*/
      background: url("../../assets/pc/success_pic.png") no-repeat center;
      background-size: cover;
      position: relative;
      .success{
        position: absolute;
        bottom: 0;
        left: 75px;
        font-family:SourceHanSansCN-Regular;
        font-weight:bold;
        color:rgba(255,255,255,1);
        font-size: 12px;
      }
    }
    .find{
      width:380px;
      height:90px;
      background:rgba(192,198,237,1);
      border-radius:6px;
      margin-top: 2px;
      border: none;
      font-size:20px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:26px;

    }
    .find:hover{
      background:rgba(195,200,234,1);
    }
    .find:active{
      background: #A3AAD8;
    }
  }

  input{
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
    margin-bottom: 50px;
    text-align:center;
  }

  .phone_no{
    width:405px;
    height:50px;
    background:rgba(242,243,255,1);
    border:1px solid rgba(164,170,218,1);
    border-radius:6px;
    padding-left: 15px;
    margin-top: 59px;
  }
  .verification_code_wrapper{
    /*border: solid 1px red;*/
    position: relative;
    cursor: pointer;
  }
  .verification_code{
    display: inline-block;
    width: 90px;
    height: 20px;
    line-height: 20px;
    padding-left: 3px;
    /*padding-right: 12px;*/
    text-align: center;
    border-left:solid 2px rgba(164,170,218,1);;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-100%);
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
  }
</style>
