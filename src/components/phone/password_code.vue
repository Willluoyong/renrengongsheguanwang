<template>
  <div class="code">
    <div class ="logo"><img src="../../assets/phone/logo_h5.png" alt=""></div>
    <div class="content">
      <span>已向{{userName2}}发送验证码</span>
      <form action="" id="form">
        <div class="input-group">
          <span>验证码</span>
          <input type="text" id="verification" v-model="Code"  autocomplete="off">
        </div>
        <div class="input-group">
          <input type="button" @click="show()" id="getButton" value="确定">
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
  import {checkSmsCode,checkEmailCode} from '@/service/userApi.js'
  export default {
    name: "password_code",
    data(){
      return{
        pop_up_box:false,
        userName:"",
        userName2:"",
        Code:"",
        toastText:"",
        noneTip:false,
        showLoading:false,
        loadingText:"",
        emailToken:"",
        type:"",
      }
    },
    components:{
      Toast
    },
    methods:{
      show(){
        this.loading("正在提交数据...");
        let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
        let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        let phoneCode = new FormData();
        if(phoneReg.test(this.userName)){
          this.type="phone";
          phoneCode.append('loginName',this.userName)
          phoneCode.append('smsCode',this.Code)
          checkSmsCode(phoneCode).then(res => {
            this.showLoading = false;
            if (res.data.status == 200) {
              sessionStorage.setItem("Code",this.Code);
              sessionStorage.setItem("type",this.type);
              this.$router.push({path:'/reset_pwdM'})
            }else{
              this.toast(res.data.message)
            }
          }).catch(err => {
            this.showLoading = false;
            this.toast("网络异常")
          })
        }else if(emailReg.test(this.userName)){
          this.type="mail";
          phoneCode.append('email',this.userName)
          phoneCode.append('emailToken',this.emailToken)
          phoneCode.append('mailCode',this.Code)
          checkEmailCode(phoneCode).then(res => {
            this.showLoading = false;
            if (res.data.status == 200) {
              sessionStorage.setItem("Code",this.Code);
              sessionStorage.setItem("type",this.type);
              this.$router.push({path:'/reset_pwdM'})
            }else{
              this.toast(res.data.message)
            }
          }).catch(err => {
            this.showLoading = false;
            this.toast("网络异常")
          })
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
      this.userName = sessionStorage.getItem('userName')
      this.emailToken = sessionStorage.getItem('emailToken')
      let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
      let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (emailReg.test(this.userName)) {
        this.userName2 = "邮箱地址"+this.userName.substr(0,3)+"****"+this.userName.substr(7)
      }else if(phoneReg.test(this.userName)){
        this.userName2 = "手机号"+this.userName.substr(0,3)+"****"+this.userName.substr(7)
      }
      
    }
  }
</script>

<style lang="less">
  body{
    background: rgba(242,243,255,1);
    .code{
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
        span{
          display: block;
          font-size: 0.3rem;
          color:rgba(181,186,219,1);
          margin-bottom: 67/108rem;
          font-family:MicrosoftYaHei;
        }
        .input-group{
          margin-bottom: 107/108rem;
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
