<template>
  <el-container>
    <el-header>
      <el-row>
          <el-col :span="10">
          <div class="grid-content grid-left" >
              <span class="logo"></span>
              <a href="#">公社主页</a>
              <a href="#">云算力商城</a>
          </div>
          </el-col>
          <el-col :span="8"><div class="grid-content"></div></el-col>
          <el-col :span="6">
          <div class="grid-content">
              <!--home包裹器-->
              <!-- <div class="wrapper" >
              <div  class="home_box" v-show="home_choosed" @click="home_change">
                  <div class="home_bc"><a class="icon_home"></a></div>
                  <div class="rail"></div>
              </div>
              <div class="home_choose" v-show="!home_choosed" @click="home_change"></div>
              </div> -->
              <!--登陆包裹器-->
              <!-- <div v-show="loginReg"> -->
              <div class="wrapper distance" v-show="loginReg">
                <span class="visitor">游客12345<span></span></span>
                
              </div>
              <div class="wrapper distance" v-show="loginReg">
              <el-button type="text" class="login" :class="{bc_state:login_choosed}" @click="dialogFormVisible=true">登录</el-button>
              <div class="rail" :class="{rail_colourless:!login_choosed}"></div>
              </div>
              <div class="distance" :class="{montant_state:montant_choosed}" v-show="loginReg"></div>
              <!--注册包裹器-->
              <div class="wrapper distance" v-show="loginReg">
              <el-button type="text"  class="register" :class="{bc_state:reg_choosed}" @click="dialogVisible = true">注册</el-button>
              <div class="rail" :class="{rail_colourless:!reg_choosed}"></div>
              </div>
              <!-- </div> -->
              <div class="user wrapper distance" v-show="user">{{userName}}</div>
          </div>
          </el-col>
      </el-row>
      <!--弹出登录对话框盒子-->
      <el-dialog :visible.sync="dialogFormVisible"  :close-on-click-modal = false>
          <pc_login @changeDialogFormVisible="changeDialogFormVisible" @name="name"></pc_login>
      </el-dialog>

      <!--弹出注册对话框盒子-->
      <el-dialog :visible.sync="dialogVisible" width="87%" :close-on-click-modal = false>
          <pc_regist @changeRegistBoxVisible="changeRegistBoxVisible" ></pc_regist>
      </el-dialog>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark banner" style="height:200px;"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark content">
            <p class="title">订单：<span>#115284461679319</span></p>
            <div class="order_content">
              <h4>机型名称<span>BTC-神级一号</span></h4>
              <p>购买单价<b>0.379</b><span> 每（GH/s）算力价格</span></p>
              <p>购买数量<span>10</span></p>
              <p>收取人<span>18575565872</span></p>
              <p>推荐人<span>-</span></p>
              <p>金额（￥）<b>456.56</b></p>
              <p>请往如下帐号汇款 订单于<b>14:59</b>分自动关闭。</p>
            </div>
            <div class="bank_content" v-show="bankContent">
              <div class="bank_name">
                <span></span>
                工商银行XX支行
              </div>
              <p>张建军 6222031207001270469 </p>
              <p>浙江省天台县赤诚街道工人东路229-235号</p>
              <p>交易号<span>123567</span></p>
              <p>汇款时请务必在备注里<span>仅填写以上六位数交易号</span>即可</p>
            </div>
            <div class="aliy_content" v-show="aliyContent">
              <img src="../../../assets/machineMall/erweima.png" alt="">
              <div class="trade">交易号:<span>123567</span></div>
              <p>支付宝帐号：412641803@qq.com</p>
              
            </div>
            <div class="buy">
              <button type="submit" class="buy_btn">我已付款</button>
              <div class="buy_success">
                付款成功后，请点击“已支付”按钮
              </div>
            </div>
            <div class="buy_treaty">
              <p>1、汇款成功后，订单进入审核状态，一旦确认收款立即开通矿机。</p>
              <p>2、游客购买后需注册登录才将正式开通。</p>
              <p>3、每人最大限购50份，且一天内如超时订单达到3次，将会被限制当日的买入功能。</p>
              <p>4、温馨提示：请您保留好汇款记录，以防止权利纠纷。</p>
              <p>5、赠送活动及算力租赁服务最终解释权归属于人人公社，感谢您的支持。</p>
            </div>
            <a class="cancel_order" href="#">取消订单</a>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark footer"></div></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import pc_login from '@/components/pc/pc_login.vue'
import pc_regist from '@/components/pc/pc_regist.vue'
export default {
    name:'orderConfirm',
    components: {
      pc_login: pc_login,
      pc_regist:pc_regist
    },
    data(){
        return{
            //对话框表格可见性默认值.
            dialogFormVisible: false,
            dialogVisible: false, //注册框可见性默认值.
            // 下载默认状态
            load_state:false,
            // 中间竖杆
            montant_choosed:true,
            //三种状态
            home_choosed:true,//home盒子是否处于选择状态。
            login_choosed:false,
            reg_choosed:false,
            erweima_state:false,
            userName:"",
            loginReg:true,
            user:false,
            msg1:"",
            urlAdress:"",
            urlCode:"",
            recommendCode:"",
            uuid:"",
            bankContent:false,
            aliyContent:true
        }
    },
    
    methods:{
      // 下载方法
      home_change(){
        this.home_choosed=!this.home_choosed;
        this.login_choosed=false
        this.reg_choosed=false
        if (this.home_choosed==true){
          location.reload();
        }

      },
      login_change(){
        this.home_choosed=false
        this.login_choosed=!this.login_choosed;
        this.reg_choosed=false
      },
      reg_change(){
        this.home_choosed=false
        this.login_choosed=false
        this.reg_choosed=!this.reg_choosed;
      },
      changeDialogFormVisible(){
        this.dialogFormVisible=false;
      },
      changeRegistBoxVisible(){
        this.dialogVisible=false;
        // this.reg_view_one_show=true,
        // this.reg_view_two_show=false
      },
      enter(){
        this.erweima_state=!this.erweima_state
      },
      leave(){
        this.erweima_state= !this.erweima_state
      },

      name(val){
        this.userName = val
        if (this.userName !== '' && this.userName !== undefined) {
          this.loginReg = false
          this.user = true
        }
      },
    },
    created(){
      this.uuid = localStorage.getItem('uuid')
      console.log('====================================');
      console.log(this.uuid);
      console.log('====================================');
      if (this.uuid == '' || this.uuid == null) {
         var d = new Date().getTime();
          var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
          });
          this.uuid =  uuid

          localStorage.setItem('uuid',this.uuid)
      }
         

      //获取下载地址
    //   getDownloadUrl().then(res =>{

    //     if (res.data.status == 200) {
    //       this.urlAdress = res.data.data.apkUrl
    //       this.urlCode = res.data.data.apkQrcode

    //     }else{
    //       console.log(res.data.messsage)
    //     }
    //   }).catch( err => {
    //     console.log(err);
        
    //   }),
      this.recommendCode = this.$route.query.recommendCode || ''
      if(this.recommendCode != ''){
        this.dialogVisible = true
      }else{
        this.dialogVisible = false
      }

    },
    watch: {
      //监听登陆弹出框的dialogFormVisible是否发生变化。
      dialogFormVisible: function () {
        this.login_change();
      },
      dialogVisible: function () {
        this.reg_change();
      },

    },
}
</script>
<style lang="less">
*{
    padding: 0 0;
    margin: 0 0;
  }
  ul{
    padding: 0 0;
    margin: 0 0;
  }
  li{
    list-style: none;
  }
  .el-dialog{
    border: 0;
  }
  .el-dialog__header{
      display: none;
  }
  .el-dialog{
    padding: 30px 20px!important;
    box-shadow:0px 10px 49px 0px rgba(166,169,204,0.57)!important;
    background:rgba(242,243,255,1)!important;
  }
  .el-dialog__body{
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    align-items: center;
    /*width:1600px;*/
    height:800px;
    
    padding:0 0!important;
    border: 1px dashed rgba(164,170,218,1);
    margin: 20px;
  }
  .v-modal{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0!important;
  }

  .el-dialog{
    position:relative;
    margin:0 auto 50px;
    /*background:#fff;*/
    border-radius:2px;
    -webkit-box-shadow:0 1px 3px rgba(0,0,0,.3);
    box-shadow:0 1px 3px rgba(0,0,0,.3);
    box-sizing:border-box;
    width:83.33%!important;
    height:auto;
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: center;*/
    /*!*align-items: center;*!*/
  }
.el-header{
    height: 60px;
    background: #fff;
    color:rgba(102,102,102,1);
    // line-height: 60px;
    /*border: solid 1px red;*/
    min-width: 1300px;
    border-bottom: 1px solid #ccc;
    .grid-content {
      height: 60px;
      border-radius: 4px;
      min-height: 36px;
      display: flex;
      /*flex-direction: row;*/
      align-items: center;
      /*border:seagreen solid 1px;*/
      .logo{
        margin-right: 20px;
      }
      a{
        font-size: 16px;
        float: left;
        padding: 10px 20px;
        color:rgba(102,102,102,1)
      }
      a:hover{
        border-radius:20px;
        background-color: #E0E1F7;
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

    .logo{
      display: inline-block;
      width: 124px;
      height: 28px;
      background: url("../../../assets/pc/logo@2x.png") no-repeat center;
      background-size: cover;
      /*border: 1px solid red;*/
      margin-left: 25px;
    }
    .wrapper{
      width: 90px;
      height: 50px;
      /*border: 1px solid orange;*/
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    }
    .home_bc{
      width: 90px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #E0E1F7;
      border-radius: 20px;
    }

    .rail{
      /*display: inline-block;*/
      width: 29px;
      height: 7px;
      border-bottom: #B2ACD1 solid 2px;
    }
    .home_box{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .rail_colourless{
      border-bottom: none;
    }
    .visitor{
      width: 110px;
      height: 90px;
      font-size: 16px;
      line-height: 43px;
      padding: 0!important;
      margin-right: 56px;
      cursor: pointer;
      color:rgba(102,102,102,1);
      span{
        display: inline-block;
        width: 17px;
        height: 16px;
        background: url("../../../assets/machineMall/icon_shopping_cart.png");
        margin-left: 10px;
        position: relative;
        top: 2px;
      }
    }

    .login{
      width: 90px;
      height: 40px;
      /*margin-left: 142px;*/
      /*border: 1px saddlebrown solid;*/
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      color:rgba(102,102,102,1)
    }

    .login:hover{
      border-radius:20px;
      background-color: #E0E1F7;
      color: #586096;
    }

    .distance{
      position: relative;
      left: 18%;
      /*margin-left: 80px;*/
    }

    .montant_state{
      /*display: inline-block;*/
      width:2px;
      height:15px;
      background:rgba(234,236,253,1);
      /*background:red;*/
      position: relative;
      top: -5px;
      margin-left: 4px;
      margin-right: 4px;
    }
    .register{
      width: 90px;
      height: 40px;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      color:rgba(102,102,102,1)
    }
    .bc_state{
      width: 90px;
      height: 40px;
      font-size: 16px;
      border-radius:20px;
      background:#E0E1F7!important;
      color:rgba(255,255,255,1)!important;

    }
    .register:hover{
      border-radius:20px;
      background-color: #E0E1F7;
      color: #586096;
    }
    .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
}
.el-main{
  padding: 0!important;
  min-width: 1300px;
  background: #F8F8F8;
  .banner{
    width: 100%;
    height: 200px;
    background: url(../../../assets/machineMall/add_bg_1.png) center center;
    background-size: cover;
  }
  .content{
    width: 1200px;
    height: 1500px;
    margin: 45px  auto;
    .title{
      color:rgba(153,153,153,1);
      font-size: 16px;
    }
    .order_content{
      width: 1200px;
      height: 460px;
      margin-top: 50px;
      
      h4{
        font-size: 20px;
        font-weight:400;
        color:rgba(51,51,51,1);
        span{
          margin-left: 64px;
        }
        margin-bottom: 27px;
      }
      p:nth-child(2){
        font-size:16px;
        margin-bottom: 27px;
        b{
          margin-left: 81px;
          font-weight: normal;
        }
        span{
          color:rgba(153,153,153,1);
        }
      }
      p:nth-child(3){
        font-size:16px;
        margin-bottom: 27px;
        span{
          margin-left: 81px;
        }
      }
      p:nth-child(4){
        font-size:16px;
        margin-bottom: 27px;
        span{
          margin-left: 98px;
        }
      }
      p:nth-child(5){
        font-size:16px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(230,230,230,1);
        span{
          margin-left: 100px;
        }
      }
      p:nth-child(6){
        font-size:16px;
        margin-top: 43px;
        b{
          margin-left: 70px;
          font-size:36px;
          font-family:Roboto-Regular;
          font-weight:400;
          color:rgba(244,153,38,1);
        }
      }
      p:nth-child(7){
        font-size:20px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        margin-top: 55px;
        b{
          color: #F3784E;
        }
      }
    }
    .bank_content{
      width:609px;
      height:196px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(230,230,230,1);
      border-radius:6px;
      padding: 20px 30px;
      font-size:16px;
      color:rgba(51,51,51,1);
      line-height:22px;
      .bank_name{
        span{
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url(../../../assets/machineMall/otc_icon_payment_bank_card.png) no-repeat;
          position: relative;
          top: 5px;
          margin-right:5px;
        }
        margin-bottom: 23px;
      }
      p{
        margin-left: 30px;
        font-size:20px;
      }
      p:nth-child(4){
        margin-top: 30px;
        span{
          display: inline-block;
          width:78px;
          height:33px;
          background:rgba(244,153,38,1);
          border-radius:6px;
          line-height: 33px;
          color: #fff;
          font-size: 16px;
          margin-left: 15px;
          text-align: center;
        }
      }
      p:nth-child(5){
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:22px;
        margin-top: 20px;
        span{
          color: #F49926
        }
      }
    }
    .aliy_content{
      width: 410px;
      height: 250px;
      img{
        float: left;
      }
      .trade{
        float: left;
        width: 180px;
        height: 60px;
        background: #F49926;
        text-align: center;
        line-height: 60px;
        font-size:20px;
        color:#fff;
        margin-top:140px;
        margin-left: 20px;
        border-radius: 6px;
      }
    }
    .buy{
      width: 1200px;
      height: 160px;
      .buy_btn{
        float: left;
        width:180px;
        height:48px;
        background:linear-gradient(-90deg,rgba(254,147,44,1),rgba(244,153,38,1),rgba(254,202,63,1));
        border-radius:24px;
        outline: none;
        border: 0;
        margin-top: 32px;

        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(245,245,245,1);
      }
      .buy_success{
        float: left;
        width: 241px;
        height: 56px;
        line-height: 56px;
        padding-left: 47px;
        margin-left: 15px;
        margin-top: 28px;
        background: url(../../../assets/machineMall/otc_bg2.png) no-repeat;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(243,120,78,1);
      }
    }
    .buy_treaty{
      p{
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(173,179,188,1);
        line-height: 30px;;
      }
    }
    .cancel_order{
      float: left;
      margin-top: 40px;
      font-size: 16px;
      color: #447ABB;
    }
  }
  .footer{
    width: 100%;
    min-width: 1300px;
    height: 380px !important;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url(../../../assets/machineMall/bottom.png) no-repeat center;
  }
}
</style>
