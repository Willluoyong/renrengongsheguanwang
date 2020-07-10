<template>
  <el-container style="min-width: 1300px" id="index">
    <el-header>
      <el-row>
        <el-col :span="10">
          <div style="margin-top:30px;margin-left:20px;">智慧教室直播室</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <!--home包裹器-->
            <!-- <div class="wrapper">
              <div  class="home_box" v-show="home_choosed" @click="home_change">
                <div class="home_bc"><a class="icon_home"></a></div>
                <div class="rail"></div>
              </div>
              <div class="home_choose" v-show="!home_choosed" @click="home_change"></div>
            </div>-->
            <!--登陆包裹器-->
            <!-- <div v-show="loginReg"> -->
            <div class="wrapper distance" v-show="loginReg">
              <el-button type="text" class="login" :class="{bc_state:login_choosed}" @click="dialogFormVisible=true">登录
              </el-button>
              <div class="rail" :class="{rail_colourless:!login_choosed}"></div>
            </div>
            <div class="distance" :class="{montant_state:montant_choosed}" v-show="loginReg"></div>
            <!--注册包裹器-->
            <div class="wrapper distance" v-show="loginReg">
              <el-button type="text" class="register" :class="{bc_state:reg_choosed}" @click="dialogVisible = true">注册</el-button>
              <div class="rail" :class="{rail_colourless:!reg_choosed}"></div>
            </div>
            <!-- </div> -->
            <div class="user wrapper distance" v-show="user">{{userName}}</div>
          </div>
        </el-col>
      </el-row>
      <!--弹出登录对话框盒子-->
      <el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal="false">
        <pc_login @changeDialogFormVisible="changeDialogFormVisible" @name="name"></pc_login>
      </el-dialog>

      <!--弹出注册对话框盒子-->
      <el-dialog :visible.sync="dialogVisible" width="87%" :close-on-click-modal="false">
        <pc_regist @changeRegistBoxVisible="changeRegistBoxVisible"></pc_regist>
      </el-dialog>
    </el-header>
    <!--主体-->
    <el-main>
      <div class="mainContainer">
        <video ref="videoElement" id="videoElement"  class="centeredVideo" @click="switchSize('big')" controls autoplay>Your browser is too old which
          doesn't support HTML5 video.</video>
        <video ref="videoElement1" id="videoElement1" class="centeredVideo1" @click="switchSize('small')" controls autoplay>Your browser is too old
          which doesn't support HTML5 video.</video>
      </div>
    </el-main>
    <!--尾部-->
    <el-footer></el-footer>
  </el-container>
</template>
<script>
import pc_login from "@/components/pc/pc_login.vue";
import pc_regist from "@/components/pc/pc_regist.vue";
import { getDownloadUrl } from "@/service/userApi";
export default {
  name: "index",
  components: {
    pc_login: pc_login,
    pc_regist: pc_regist
  },
  data() {
    return {
      //对话框表格可见性默认值.
      dialogFormVisible: false,
      videoShow: 'big', 
      dialogVisible: false, //注册框可见性默认值.
      // 下载默认状态
      load_state: false,
      // 中间竖杆
      montant_choosed: true,
      //三种状态
      home_choosed: true, //home盒子是否处于选择状态。
      login_choosed: false,
      reg_choosed: false,
      erweima_state: false,
      userName: "",
      loginReg: true,
      user: false,
      msg1: "",
      urlAdress: "",
      urlCode: "",
      recommendCode: "",
      uuid: "",
      player: null,
      player1: null
    };
  },
  methods: {
    // switchSize() {
    //   if (this.player.classList.contains('centeredVideo1')) {
    //     this.player.classList.add("centeredVideo");
    //     this.player.classList.remove("centeredVideo1");
    //   } else {
    //     this.player.classList.add("centeredVideo1");
    //     this.player.classList.remove("centeredVideo");
    //   }

    //   if (this.player1.classList.contains('centeredVideo1')) {
    //     this.player1.classList.add("centeredVideo");
    //     this.player1.classList.remove("centeredVideo1");
    //   } else {
    //     this.player1.classList.add("centeredVideo1");
    //     this.player1.classList.remove("centeredVideo");
    //   }

    // },
    switchSize(type) {
      if (type === 'big') {
        this.videoShow = 'small'
       
      }
      if (type === 'small') {
         this.videoShow = 'big'
      }

    },
    // 下载方法
    loading() {
      location.href = this.urlAdress;
    },
    home_change() {
      this.home_choosed = !this.home_choosed;
      this.login_choosed = false;
      this.reg_choosed = false;
      if (this.home_choosed == true) {
        location.reload();
      }
    },
    login_change() {
      this.home_choosed = false;
      this.login_choosed = !this.login_choosed;
      this.reg_choosed = false;
    },
    reg_change() {
      this.home_choosed = false;
      this.login_choosed = false;
      this.reg_choosed = !this.reg_choosed;
    },
    changeDialogFormVisible() {
      this.dialogFormVisible = false;
    },
    changeRegistBoxVisible() {
      this.dialogVisible = false;
      // this.reg_view_one_show=true,
      // this.reg_view_two_show=false
    },
    enter() {
      this.erweima_state = !this.erweima_state;
    },
    leave() {
      this.erweima_state = !this.erweima_state;
    },

    name(val) {
      this.userName = val;
      if (this.userName !== "" && this.userName !== undefined) {
        this.loginReg = false;
        this.user = true;
      }
    }
  },
  created() {
    this.uuid = localStorage.getItem("uuid");
    console.log("====================================");
    console.log(this.uuid);
    console.log("====================================");
    if (this.uuid == "" || this.uuid == null) {
      var d = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      this.uuid = uuid;

      localStorage.setItem("uuid", this.uuid);
    }

    //获取下载地址
    getDownloadUrl()
      .then(res => {
        if (res.data.status == 200) {
          this.urlAdress = res.data.data.apkUrl;
          this.urlCode = res.data.data.apkQrcode;
        } else {
          console.log(res.data.messsage);
        }
      })
      .catch(err => {
        console.log(err);
      }),
      (this.recommendCode = this.$route.query.recommendCode || "");
    if (this.recommendCode != "") {
      this.dialogVisible = true;
    } else {
      this.dialogVisible = false;
    }
  },
  mounted() {
    this.player =  document.getElementById('videoElement');
    if (flvjs.isSupported()) {
      var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: 'http://192.168.1.142:8080/live/livestream204.flv'
      });
      flvPlayer.attachMediaElement(this.player);
      flvPlayer.load(); //加载
    }

    this.player1 = this.$refs.videoElement1
    if (flvjs.isSupported()) {
      var flvPlayer1 = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        // url: 'http://192.168.1.142:8080/live/lives.flv'
        url: 'http://192.168.1.142:8080/live/livestream209.flv'
      });
      flvPlayer1.attachMediaElement(this.player1);
      flvPlayer1.load(); //加载
    }
  },
  watch: {
    //监听登陆弹出框的dialogFormVisible是否发生变化。
    dialogFormVisible: function () {
      this.login_change();
    },
    dialogVisible: function () {
      this.reg_change();
    }
  }
};
</script>

<style lang="less">
//样式初始化
#index {
  * {
    padding: 0 0;
    margin: 0 0;
  }
  ul {
    padding: 0 0;
    margin: 0 0;
  }
  li {
    list-style: none;
  }
  .el-dialog {
    border: 0;
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog {
    padding: 30px 20px !important;
    box-shadow: 0px 10px 49px 0px rgba(166, 169, 204, 0.57) !important;
    background: rgba(242, 243, 255, 1) !important;
  }
  .el-dialog__body {
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    align-items: center;
    /*width:1600px;*/
    height: 800px;

    padding: 0 0 !important;
    border: 1px dashed rgba(164, 170, 218, 1);
    margin: 20px;
  }
  .v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0 !important;
  }

  .el-dialog {
    position: relative;
    margin: 0 auto 50px;
    /*background:#fff;*/
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 83.33% !important;
    height: auto;
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: center;*/
    /*!*align-items: center;*!*/
  }

  //顶部栏
  .el-header {
    width: 100%;
    height: 0px !important;
    padding-bottom: 6% !important;
    // background: url("../../assets/pc/home_bg.jpg") no-repeat;
    background-size: 100% auto;
    color: #333;
    border: 0;
    // line-height: 60px;
    /*border: solid 1px red;*/
    .grid-content {
      height: 96px;
      border-radius: 4px;
      min-height: 36px;
      display: flex;
      /*flex-direction: row;*/
      align-items: center;
      /*border:seagreen solid 1px;*/
      .logo {
        margin-right: 20px;
      }
      a {
        font-size: 16px;
        float: left;
        padding: 10px 20px;
        color: #586096;
      }
      a:hover {
        border-radius: 20px;
        background-color: #e0e1f7;
        color: #586096;
      }
    }
    .grid-left {
      display: flex;
      align-items: center;
      /*border:seagreen solid 1px;*/
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .el-row {
      width: 100%;
      margin-bottom: 20px;
      /*&:last-child {*/
      /*margin-bottom: 0;*/
      /*}*/
    }
    .el-col {
      border-radius: 4px;
    }
    .icon {
      display: inline-block;
      width: 70px;
      height: 96px;
      background: url("../../assets/pc/title_pic@2x.png") no-repeat center;
      background-size: cover;
      /*border: 1px solid saddlebrown;*/
    }
    .logo {
      display: inline-block;
      width: 124px;
      height: 28px;
      background: url("../../assets/pc/logo@2x.png") no-repeat center;
      background-size: cover;
      /*border: 1px solid red;*/
      margin-left: 25px;
    }
    .wrapper {
      width: 90px;
      height: 50px;
      /*border: 1px solid orange;*/
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .home_bc {
      width: 90px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e0e1f7;
      border-radius: 20px;
    }
    .icon_home {
      display: inline-block;
      width: 30px;
      height: 28px;
      background: url("../../assets/pc/icon_home@2x.png") no-repeat center;
      background-size: cover;
      /*margin-left: 84px;*/
      /*border: red solid 1px;*/
    }
    .rail {
      /*display: inline-block;*/
      width: 29px;
      height: 7px;
      border-bottom: #b2acd1 solid 2px;
    }
    .home_box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .home_choose {
      width: 30px;
      height: 28px;
      background: url("../../assets/pc/icon_home_normal@2x.png") no-repeat
        center;
      background-size: cover;
    }
    .rail_colourless {
      border-bottom: none;
    }
    .login {
      width: 90px;
      height: 40px;
      /*margin-left: 142px;*/
      /*border: 1px saddlebrown solid;*/
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #586096 !important;
    }

    .login:hover {
      border-radius: 20px;
      background-color: #e0e1f7;
      color: #586096;
    }

    .distance {
      position: relative;
      left: 18%;
      /*margin-left: 80px;*/
    }

    .montant_state {
      /*display: inline-block;*/
      width: 2px;
      height: 15px;
      background: rgba(234, 236, 253, 1);
      /*background:red;*/
      position: relative;
      top: -5px;
      margin-left: 4px;
      margin-right: 4px;
    }
    .register {
      width: 90px;
      height: 40px;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #586096;
    }
    .bc_state {
      width: 90px;
      height: 40px;
      font-size: 16px;
      border-radius: 20px;
      background: #e0e1f7 !important;
      color: rgba(255, 255, 255, 1) !important;
    }
    .register:hover {
      border-radius: 20px;
      background-color: #e0e1f7;
      color: #586096;
    }

    .theme {
      /*width: 745px;*/
      width: 38.802%;
      height: 0;
      /*background-color:forestgreen;*/
      padding-bottom: 4.131%;
      position: relative;
      /*left:172px ;*/
      left: 8.958%;
      margin-top: 3%;
      background: url("../../assets/pc/font_title@2x.png") no-repeat center;
      background-size: 100% 100%;
    }
    .introduce {
      position: relative;
      /*left: 172px;*/
      left: 8.958%;
      margin-top: 0.5%;
      width: 392px;
      /*width:25%;*/
      height: 24px;
      line-height: 24px;
      font-size: 23px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(146, 160, 171, 1);
      /*background:linear-gradient(-90deg,rgba(69,104,232,1) 0%, rgba(207,113,241,1) 100%);*/
      background: linear-gradient(
        -90deg,
        rgba(207, 113, 241, 1) 0%,
        rgba(69, 104, 232, 1) 100%
      );
      // -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    //公社特点
    .characteristic {
      position: relative;
      /*left: 172px;*/
      left: 8.958%;
      width: 608px;
      height: 1px;
      background: rgba(242, 243, 255, 1);
      margin-top: 2%;
      margin-bottom: 2%;
    }
    .feature_box {
      position: relative;
      /*left: 172px;*/
      left: 8.958%;
      /*width: 608px;*/
      width: 31.66%;
      height: 66px;
      /*background-color: gray;*/
      border-left: #e4e6f8 solid 7px;
    }
    ul {
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: center;
    }
    li {
      width: 20%;
      height: 33px;
      line-height: 33px;
      padding-left: 12px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(181, 189, 219, 1);
      a {
        color: #586096;
      }
      a:hover {
        text-decoration: underline;
      }
    }
    //下载框
    .load_point {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      /*left: 146px;*/
      left: 7%;
      margin-top: 1%; //有改动
      /*width: 359px;*/
      width: 18.697%;
      height: 166px;
      /*line-height: 166px;*/
      background: url("../../assets/pc/btn_download_normal@2x.png") no-repeat
        center;
      background-size: 100% auto;
    }
    .load_point:hover {
      background: url("../../assets/pc/btn_download_hover@2x.png") no-repeat
        center;
      background-size: 100% auto;
    }
    /*.load_state{*/
    /*!*display: block;*!*/
    /*position: relative;*/
    /*!*left: 146px;*!*/
    /*left: 7%;*/
    /*margin-top: 72px;*/
    /*!*width: 359px;*!*/
    /*width: 18.697%;*/
    /*height: 166px;*/
    /*background: url("../../assets/pc/btn_download_refresh@2x.png")no-repeat center;*/
    /*background-size: 100% 100%;*/
    /*}*/
    /*.roundness{*/
    /*display: inline-block;*/
    /*width: 43px;*/
    /*height: 43px;*/
    /*background: url("../../assets/pc/loading.gif ")no-repeat center;*/
    /*!*margin-left: 44%;*!*/
    /*!*position: relative;*!*/
    /*!*top: 32%;*!*/
    /*}*/

    //二位码相关类
    .erweima_wrapper {
      position: relative;
      /*left: 505px;*/
      left: 26%;
      top: -90px;
      width: 200px;
      /*width: 10.416%;*/
      height: 224px;
      p {
        /*width: 200px;*/
        width: 100%;
        height: 24px;
        line-height: 24px;
        color: #837aed;
        margin-left: 18px;
      }
      .erweima {
        width: 180px;
        height: 180px;
      }
    }
  }

  //主体栏
  .el-main {
    .mainContainer {
      display: block;
      width: 1024px;
      height: 576px;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      border: solid 1px red;
      .centeredVideo {
        display: block;
        position: absolute;
        width: 100%;
        height: 576px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: auto;
        border: solid 1px red;
      }
      .centeredVideo1 {
        display: block;
        width: 220px;
        height: 128px;
        position: absolute;
        right: 0px;
        bottom: 0px;
        z-index: 999;
        border: solid 1px red;
      }
    }
  }

  //尾部栏
  .el-footer {
    width: 100%;
    height: 380px !important;
    // background: url("../../assets/pc/bottom_bg@2x.png") no-repeat center;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon_box {
      width: 420px;
      height: 40px;
      /*border: red solid 1px;*/
      margin-top: 190px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      a {
        display: inline-block;
        /*border: seagreen solid 1px;*/
        /*margin-left: 35px;*/
      }
      a:first-child {
        width: 51px;
        height: 40px;
        background: url("../../assets/pc/sina@2x.png") no-repeat center;
        background-size: cover;
      }
      a:nth-child(2) {
        width: 39px;
        height: 40px;
        background: url("../../assets/pc/qq@2x.png") no-repeat center;
        background-size: cover;
        margin-left: 70px;
        margin-right: 70px;
      }
      a:nth-child(3) {
        width: 49px;
        height: 40px;
        background: url("../../assets/pc/wechat@2x.png") no-repeat center;
        background-size: cover;
        margin-right: 70px;
      }
      a:nth-child(4) {
        width: 37px;
        height: 40px;
        background: url("../../assets/pc/baidu@2x.png") no-repeat center;
        background-size: cover;
      }
    }
    .email_box {
      width: 184px;
      height: 19px;
      /*border: rosybrown solid 1px;*/
      margin-top: 25px;
      display: flex;
      flex-direction: row;
      align-items: center;
      span {
        display: inline-block;
        width: 19px;
        height: 19px;
        background: url("../../assets/pc/e-mail@2x.png") no-repeat center;
        background-size: cover;
      }
      p {
        width: 153px;
        height: 15px;
        line-height: 15px;
        font-size: 14px;
        font-family: FZLTHJW--GB1-0;
        font-weight: 400;
        color: rgba(242, 243, 255, 1);
        margin-left: 12px;
        /*line-height:43px;*/
      }
    }
    .copyright {
      width: 291px;
      height: 13px;
      font-size: 12px;
      font-family: Roboto-Light;
      font-weight: 300;
      color: rgba(242, 243, 255, 1);
      line-height: 35px;
      opacity: 0.63;
      margin-top: 58px;
    }
  }
  .el-bc {
    background-color: #f2f3ff;
  }
}
</style>
