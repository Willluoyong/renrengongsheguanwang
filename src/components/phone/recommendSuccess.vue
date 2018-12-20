<template >
  <div class="success" id="recommendSuccess">
    <div class="banner"></div>
    <div class="content">
      <div class="title">
        <div class="reg_success"></div>
      </div>
      <div class="app_download" @click="download">

      </div>
      <div class="process">
      </div>
    </div>
    <div class="loading" v-show="showLoading">
      <div class="loading_area">
        <span>{{loadingText}}</span>
      </div>
    </div>
    <toast v-model="noneTip" width="100%" type="text" position="top">{{toastText}}</toast>
  </div>
</template>

<script>
import {Toast} from 'vux'
import {getDownloadUrl} from "@/service/userApi"
    export default {
        name: "recommendSuccess",
        
        data(){
          return{
            downloadUrl:'',
            toastText:"",
            loadingText:"",
            noneTip:false,
            showLoading:false,
          }
        },
        methods:{
          download(){
            location.href = this.downloadUrl
          }
        },
        created () {
          getDownloadUrl().then(res=>{
              if (res.data.status == 200) {
                this.downloadUrl = res.data.data.apkUrl
                console.log(this.downloadUrl);
                
              }else{
                console.log(res.data.messsage);
              }
            }).catch(err=>{
              console.log(err);
            })
        }
    }
</script>

<style lang="less">
 #recommendSuccess{
    background:#D2383C;
    width: 10rem;
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
          .reg_success{
            width: 2.64rem;
            height: 0.64rem;
            background: url(../../assets/phone/recommend/font_successful.png) no-repeat;
            background-size: cover;
            margin:0 auto;
          }
        }
        .app_download{
          width: 9.46rem;
          height: 4.94rem;
          background: url(../../assets/phone/recommend/btn_download.png) no-repeat;
          background-size: cover;
          margin: 2.65rem auto;
        }
        .process{
          width: 9.46rem;
          height: 3.15rem;
          background: url(../../assets/phone/recommend/process_pic.png) no-repeat;
          background-size: cover;
          margin: 3rem auto;
        }
      }
    }
</style>
