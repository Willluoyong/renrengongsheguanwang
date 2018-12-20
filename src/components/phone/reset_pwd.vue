<template>
  <div class="reset_pwd">
    <div class ="logo"><img src="../../assets/phone/logo_h5.png" alt=""></div>
    <div class="content">
      <form action="" id="form">
        <div class="input-group">
          <input type="password" placeholder="请输入新密码" v-model="password" v-on:blur="pw"  autocomplete="off">
        </div>
        <div class="input-group">
          <input type="password" placeholder="请重复输入新密码" v-model="password2" v-on:blur="ensurePassword"  autocomplete="off">
        </div>
        <div class="input-group">
          <input type="button" @click.prevent="show" id="getButton" value="确定">
        </div>
      </form>
      <reset_pwd_succeed v-show="reset_pwd_succeed"></reset_pwd_succeed>
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
  import reset_pwd_succeed from './reset_pwd_succeed';
  import {retrievePw} from '@/service/userApi'
  export default {
    name: "reset_pwd",
    data(){
      return{
        reset_pwd_succeed:false,
        showLoading:false,
        noneTip:false,
        userName:"",
        password:"",
        password2:"",
        toastText:"",
        loadingText:"",
        emailToken:"",
        type:"",
      }
    },
    components:{
      reset_pwd_succeed,
      Toast
    },
    methods:{
      show(){
        
        // this.reset_pwd_succeed=true
        if (this.password ==  '') {
          this.toast('请输入密码')
          return
        }
        if(this.password2 == ''){
          this.toast('请再次输入密码')
          return
        }
        if (this.password.length < 6 ) {
          this.toast('密码长度不能小于6位数')
        }
        if(this.password != this.password2){
          this.toast('密码输入不一致')
          return
        }
        let s = '34qrefefgwrtg24534245gwefgvsdfwrt24@**&%$!ytfthn'
        let phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
        let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        let pw = new FormData()
        this.loading("正在提交数据...");
        if(phoneReg.test(this.userName)){
          pw.append('loginName',this.userName)
          pw.append('password',this.$md5(s+this.password))
          pw.append('smsCode',this.Code)
          pw.append('Regtype',this.type)
          // console.log(this.$md5(s+this.password))
          retrievePw(pw).then(res => {
            this.showLoading = false;
            if (res.data.status == 200) {
              this.reset_pwd_succeed = true
            }else{
              this.toast(res.data.message)
            }
          }).catch(err => {
            this.showLoading = false;
            this.toast("网络异常")
          })
        }else if(emailReg.test(this.userName)){
          pw.append('loginName',this.userName)
          pw.append('password',this.$md5(s+this.password))
          pw.append('smsCode',this.Code)
          pw.append('Regtype',this.type)
          pw.append('emailToken',this.emailToken)
          // console.log(this.$md5(s+this.password))
          retrievePw(pw).then(res => {
            this.showLoading = false;
            if (res.data.status == 200) {
              this.reset_pwd_succeed = true
            }else{
              this.toast(res.data.message)
            }
          }).catch(err => {
            this.showLoading = false;
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
      loading(msg) {
        this.loadingText = msg;
        this.showLoading = true
      },
      toast(msg) {
        this.toastText = msg;
        this.noneTip = true;
      },
    },
    created () {
      this.userName = sessionStorage.getItem('userName');
      this.emailToken = sessionStorage.getItem('emailToken');
      this.Code = sessionStorage.getItem('Code')
      this.type = sessionStorage.getItem('type');
      // console.log(this.userName,this.Code,this.emailToken,this.type);
      
    }
  }
</script>

<style lang="less">
  body{
    background: rgba(242,243,255,1);
    .reset_pwd{
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
            height:120/108rem;
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
            font-size: 0.3rem;
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
