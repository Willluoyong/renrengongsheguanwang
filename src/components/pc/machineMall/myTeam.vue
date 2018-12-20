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
        <el-col :span="24"><div class="grid-content bg-purple-dark banner" style="height:200px;">
          <div class="download_app">
            <img src="../../../assets/machineMall/btn_download.png" alt="">
           <p>二维码下载</p>
          </div>  
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark content">
            <div class="content1">
              <div class="rule"><span></span>查看团队福利<a href="#">规则</a></div>
              <div class="team">
                <div class="team_num">
                  <b>100</b>
                  <p>团队人数(人)</p>
                </div>
                <div class="team_total">
                  <b>156425</b>
                  <p>团队销售邀请总额(CNY)</p>
                </div>
              </div>
              <div class="team_rank">
                <p>邀请我的人：<span>185****2511</span></p>
                <p>我的等级：<span>城市合伙人</span></p>
              </div>
            </div>
            <p class="join_team">根据邀请码/手机号推介朋友购买即可加入团队</p>
            <div class="content2">
              <div class="team_award">
                <div class="exchange">
                  <span></span>
                  <b>75</b>
                  <p>兑换券奖励</p>
                </div>
                <div class="assets_award">
                  <b>150000</b>
                  <p>资产奖励(BCT)</p>
                </div>
              </div>
            </div>
            <div class="search"><input type="text" placeholder="输入用户名查找"><span></span></div>
            <div class="content3">
               <el-table
                :data="tableData"
                style="width: 100%;border:1px solid rgba(230,230,230,1)">
                <el-table-column
                  prop="user"
                  label="用户名"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="lever"
                  label="等级"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="team_num"
                  label="团队人数"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="team_total"
                  label="销售金额"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="late_login"
                  label="最后登录"
                  width="200">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="200"
                  align="center">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">联系方式</el-button>
                    <br>
                    <el-button type="text" size="small">举荐城市经理人</el-button>
                  </template>
                  <template>
                    <a href="#"></a>
                  <a href="#"></a>
                  </template>
                  
                </el-table-column>
              </el-table>
            </div>
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
    name:'myTeam',
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
            tableData: [{
              user: '18575565872',
              lever: '成员',
              team_num: '10',
              team_total:'10000',
              late_login:'2018-06-01 20:20',
            }, {
              user: '18575565872',
              lever: '成员',
              team_num: '10',
              team_total:'10000',
              late_login:'2018-06-01 20:20',
            }, {
              user: '18575565872',
              lever: '成员',
              team_num: '10',
              team_total:'10000',
              late_login:'2018-06-01 20:20',
            }, {
              user: '18575565872',
              lever: '成员',
              team_num: '10',
              team_total:'10000',
              late_login:'2018-06-01 20:20',
            }]
        }
    },
    
    methods:{
      // 下载方法
      handleClick(row) {
        console.log(row);
      },
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
    position: relative;
    .download_app{
      position: absolute;
      top: 118px;
      left: 62%;
    }
  }
  .content{
    width: 1200px;
    height: 1500px;
    margin: 45px  auto;
    .content1{
      width: 1200px;
      height: 260px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(230,230,230,1);
      .rule{
        margin-left: 10px;
        margin-top: 20px;
        font-size:14px;
        color: #333333;
        span{
          display: inline-block;
          width: 17px;
          height: 17px;
          background: url(../../../assets/machineMall/power_pinformation.png);
          position: relative;
          top: 4px;
          margin-right: 6px;
        }
        a{
          color:#F49C27
        }
      }
      .team{
        width: 1100px;
        height: 130px;
        margin: 17px auto 0;
        border-bottom: 1px solid rgba(230,230,230,1);
        .team_num{
          float: left;
          width: 550px;
          text-align: center;
          border-right: 1px solid rgba(230,230,230,1);
          b{
            font-size:40px;
            font-family:Roboto-Regular;
            font-weight:400;
            color:rgba(244,156,39,1);
            
          }
          p{
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(153,153,153,1);
            margin-top: 10px;
          }
        }
        .team_total{
          float: left;
          width: 549px;
          text-align: center;
          b{
            font-size:40px;
            font-family:Roboto-Regular;
            font-weight:400;
            color:rgba(244,156,39,1);
            
          }
          p{
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(153,153,153,1);
            margin-top: 10px;
          }
        }
        
      }
      .team_rank{
        width: 1100px;
        height: 50px;
        line-height: 50px;
        padding: 0 50px; 
        margin-top: 10px;
        font-size:14px;
        span{
          color: #F49C27;
        }
        p:nth-child(1){
          width: 549px;
          float: left;
          text-align: center;
        }
        p:nth-child(2){
          width: 548px;
          float: left;
          text-align: center; 
        }
      }
    }
    .join_team{
      margin-top: 17px;
      margin-bottom: 35px;
      color:rgba(193,193,193,1);
    }
    .content2{
      width: 1200px;
      height: 160px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(230,230,230,1);
      .team_award{
        width: 1100px;
        height: 130px;
        margin: 40px auto 0;
        .exchange{
          float: left;
          width: 550px;
          text-align: center;
          border-right: 1px solid #F49926;
          span{
            float: left;
            position: relative;
            left: 56px;
            top: -19px;
            width: 92px;
            height: 104px;
            background: url(../../../assets/machineMall/btn_put_forward.png) no-repeat;
            cursor: pointer;
          }
          b{
            font-size:40px;
            font-family:Roboto-Regular;
            font-weight:400;
            color:rgba(244,156,39,1);
            
          }
          p{
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(153,153,153,1);
            margin-top: 10px;
          }
        }
        .assets_award{
          float: left;
          width: 549px;
          text-align: center;
          b{
            font-size:40px;
            font-family:Roboto-Regular;
            font-weight:400;
            color:rgba(244,156,39,1);
            
          }
          p{
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(153,153,153,1);
            margin-top: 10px;
          }
        }
        
      }
    }
    .search{
      width: 330px;
      height: 40px;
      background: #fff;
       float: right;
       margin: 40px 0 15px 0;
       position: relative;
      input{
        width: 320px;
        height: 38px;
        border: 0;
        padding-left: 10px; 
        border:1px solid rgba(230,230,230,1);
        outline: none;
      }
      ::-webkit-input-placeholder{
        color:rgba(204,204,204,1);
      }
      span{
        position: absolute;
        right: -2px;
        top: 0;
        width: 70px;
        height: 40px;
        background: url(../../../assets/machineMall/btn_search_nor.png);
      }
    }
    .content3{
      width: 1202px;
      th{
        background:rgba(248,248,248,1);
      }
      .el-button{
        span{
          color: #F49926
        }
      }
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
