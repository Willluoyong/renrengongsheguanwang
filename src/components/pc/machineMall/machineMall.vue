<template>
  <el-container id="machine_mall">
    <el-header>
      <el-row>
          <el-col :span="10">
          <div class="grid-content grid-left" >
              <span class="logo"></span>
              <router-link to="/">公社主页</router-link>
              <router-link to="machineMall">云算力商城</router-link>
          </div>
          </el-col>
          <el-col :span="8"><div class="grid-content"></div></el-col>
          <el-col :span="6">
          <div class="grid-content">
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
    <div class="main_out">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark main2">
            <h4><img src="../../../assets/machineMall/trump recommendationTrump recommendation.png" alt=""></h4>
            <div class="search"><input v-model="filters.name" type="text"><span v-on:click="getMarketTag"></span></div>
            <div class="main_machine" v-for="(item,index) in machineList" :key="index">
              <div class="machine">
                <div class="machine_header">
                  <h3><span></span>{{item.title}}</h3>
                  <div class="progress">
                    <el-progress :text-inside="true" :stroke-width="20" :percentage="Number(item.percent).toFixed(2)*100" color="linear-gradient(-90deg,rgba(254,147,44,1),rgba(244,153,38,1),rgba(254,202,63,1))"></el-progress>
                  </div>
                </div> 
                <div class="machine_content">
                  <div class="machine_image">
                    <img :src=item.machinePhontoUrl alt="" width="142px" height="142px">
                  </div>
                  <div class="machine_price">
                    <p>每（GH/s）算力价格</p>
                    <p><b>{{item.price}}</b>CNY</p>
                  </div>
                  <div class="machine_profit">
                    <p>当前预估日收益</p>
                    <p><b>{{item.currencyPrice}}</b>BTC/T</p>
                  </div>
                  <button class="machine_detail" @click="checkDetail(item.machineId)">查看详情</button>
                </div>
                <el-pagination
                background
                next-text ="下一页"
                layout="pager, next"
                :total="20"
                @current-change='handleCurrentChange'
                >
              </el-pagination>
              </div>

            </div>
          </div>
          <div class="pool_introduce">
            <div class="pool_introduce_in">
              <h4><img src="../../../assets/machineMall/pool photo.png" alt=""></h4>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="7"><div class="grid-content bg1"></div></el-col>
                <el-col :span="7"><div class="grid-content bg2"></div></el-col>
                <el-col :span="7"><div class="grid-content bg3"></div></el-col>
              </el-row>
              <div class="pool_photo">
                <div class="photo_top">
                  <div class="video">
                    <el-popover
                      placement="right"
                      trigger="click">
                      <video src="../../../assets/machineMall/2aae4ee0cb3682ceeaf7e024ed74d9c4.mp4" autoplay="autoplay" controls="controls" height='800px'></video>
                      <el-button slot="reference"></el-button>
                    </el-popover>
                  </div>
                  <div class="photo1"></div>
                  <div class="photo2"></div>
                  <div class="photo3"></div>
                </div>
                <div class="photo_bottom">
                  <div class="photo4"></div>
                  <div class="photo5"></div>
                  <div class="photo6"></div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row class="footer_out">
      <el-col :span="24"><div class="footer2"></div></el-col>
    </el-row>
  </el-container>
</template> 
<script>
  import pc_login from '@/components/pc/pc_login.vue'
  import pc_regist from '@/components/pc/pc_regist.vue'
  import {getMachineList} from '@/service/machineApi.js'
import { log } from 'util';
  export default{
    name:'machineMall',
    components: {
      pc_login: pc_login,
      pc_regist:pc_regist
    },
    data() {
      return {
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
        visitor:true,
        
        machineList:[{
          title:'BTC神级一号',
          percent:'0.2',
          price:'10',
          currencyPrice:'10',
          machineId:"",
          machinePhontoUrl:''
        }],
        filters: {
          name: ''
        },
        page:1,

      };
    },
    methods:{
      home_change(){
        this.home_choosed=!this.home_choosed;
        this.login_choosed=false
        this.reg_choosed=false
        if (this.home_choosed==true){
          location.reload();
        }
      },
      handleCurrentChange(val){
        this.page = val;
        this.getMarketTag();
        console.log('====================================');
        console.log(val);
        console.log('====================================');
        
      },
      // handleCurrentChange(val) {
      
      // },
      // //获取用户列表
      getMarketTag() {
        let para = new FormData()
        para.append('coinTypeOrtitle',this.filters.name)
        para.append('page',this.page-1)
        para.append('pageSize',3)
        getMachineList(para).then(res =>{
          if (res.data.status == 200) {
            this.machineList = res.data.data.machineList
          }else{
            console.log(res.data.messsage)
          }

        }).catch( err => {
          console.log(err);
        })
      },
      //查看详情
      checkDetail(machineId){
        this.$router.push({path:'/machineDetail',query:{"machineId":machineId}})
        console.log(machineId)
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
         
      //获取矿机列表
      let para = new FormData()
        para.append('page',0)
        para.append('pageSize',3)
        getMachineList(para).then(res =>{
          if (res.data.status == 200) {
            this.machineList = res.data.data.machineList
            console.log('====================================');
            console.log(res.data.data.machineList);
            console.log('====================================');

          }else{
            console.log(res.data.messsage)
          }
        }).catch( err => {
          console.log(err);
          
        })
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
#machine_mall{
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
    height: 0 !important;
    padding-bottom: 40.3%!important;
    background: url("../../../assets/machineMall/banner_miner.png") no-repeat;
    background-size: 100% 100%;
    min-height: 776px;
    color: #333;
    border: 0;
    // line-height: 60px;
    /*border: solid 1px red;*/
    min-width: 1300px;
    .grid-content {
      height: 96px;
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
        color: #DCDCDC
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
      color: #DCDCDC;
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
      color: #DCDCDC;
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
      color: #DCDCDC;
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

  



}
.main_out{
  padding: 0;
  background: #F8F8F8;
  min-width: 1300px;
  .main2{
    width: 1200px;
    height: 1340px;
    margin: 0 auto;
    padding-top:100px; 
    h4{
      width: 226px;
      height: 51px;
      margin: 0 auto;
    }
    .search{
      width: 330px;
      height: 40px;
      background: #fff;
       float: right;
       margin: 40px 0 15px 0;
       position: relative;
      input{
        width: 330px;
          height: 40px;
          border: 0;
      }
      span{
        position: absolute;
        right: 0;
        top: 0;
        width: 70px;
        height: 40px;
        background: url(../../../assets/machineMall/btn_search_nor.png);
      }
    }

    .machine{
      float: left;
      width: 1200px;
      height: 300px;
      background: #fff;
      border:1px solid rgba(230,230,230,1);
      box-shadow:0px 3px 8px 0px rgba(118,118,120,0.27);
      margin-bottom: 36px;
      .machine_header{
        width: 1200px;
        height: 100px;
        border-bottom: 1px solid rgba(230,230,230,1);
        line-height: 100px;
        h3{
        font-size: 24px;
        font-weight: normal;
        font-family:SourceHanSansCN-Regular;
        float: left;
          span{
            float: left;;
            width: 6px;
            height: 36px;
            background:rgba(244,153,38,1);
            border-radius:3px;
            margin: 32px 37px 0 52px;
          }
        }
        .progress{
          float: right;
          width: 400px;
          margin-top: 40px;
          margin-right: 36px;
          .el-progress-bar__outer{
            background:rgba(220,220,220,1);

          }
          .el-progress-bar__inner{
            background:linear-gradient(-90deg,rgba(254,147,44,1),rgba(244,153,38,1),rgba(254,202,63,1))!important;
            
          }
          .el-progress-bar__innerText{

            font-size:14px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
        }
      }
      .machine_content{
        height: 200px;
        .machine_image{
          float: left;
          width: 142px;
          height: 142px;
          background:rgba(248,248,248,1);
          margin-left: 48px;
          margin-top: 28px;
        }
        .machine_price{
          float: left;
          width: 155px;
          height: 142px;

          margin-left: 42px;
          margin-top: 28px;
          p{
            font-size:14px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            margin-top: 30px;
          }
          p:last-child{
            font-size:20px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            b{
              font-size:40px;
              font-family:SourceHanSansCN-Regular;
              font-weight:400;
              color:rgba(244,153,38,1);
              margin-right: 5px;
            }
            
          }
        }
        .machine_profit{
          float: left;
          width: 290px;
          height: 140px;
          margin-left: 200px;
          margin-top: 28px;
           p{
            font-size:14px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            margin-top: 30px;
          }
          p:last-child{
            font-size:20px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            b{
              font-size:40px;
              font-family:SourceHanSansCN-Regular;
              font-weight:400;
              color:rgba(51,51,51,1);
              margin-right: 5px;
            }
            
          }
        }
        .machine_detail{
          float: left;
          width: 150px;
          height: 52px;
          background:linear-gradient(-90deg,rgba(254,147,44,1),rgba(244,153,38,1),rgba(254,202,63,1));
          box-shadow:0px 3px 8px 0px rgba(244,158,40,0.6);
          border-radius:25px;
          border: 0;
          outline: none;
          font-size:20px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:#fff;
          margin-left: 150px;
          margin-top: 65px;
        }
        .machine_detail2{
          float: left;
          width: 150px;
          height: 50px;
          background:#E4E4E4;
          box-shadow:0px 3px 8px 0px RGBA(228, 228, 228, 1);
          border-radius:25px;
          border: 0;
          outline: none;
          font-size:20px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:#333;
          margin-left: 150px;
          margin-top: 65px;
        }
      }
      .el-pagination{
        width: 200px;
        margin: 60px auto;
        li{
          width: 46px;
          height: 46px;
          line-height: 46px;
          background: #F1F1F1;
          font-size: 20px;
          font-weight: normal;
        }
      .btn-next{
          span{
            width: 91px;
            height: 46px;
            line-height: 46px;
            background: #F1F1F1;
            font-size: 20px;
            font-weight: normal;
          }
      }
        
      }
      .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: #666666;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: #F49926;
          color: #ffff;
        }
    }
  }
  .pool_introduce{
    height: 1500px;
    background: #fff;
    .pool_introduce_in{
      width: 1200px;
      height: 1000px;
      margin: 0 auto;
      padding-top:110px; 
      h4{
        width: 226px;
        height: 51px;
        margin: 0 auto;
      }
      .el-row {
        width: 1200px;
        margin-bottom: 80px;
        &:last-child {
          margin-bottom: 0;
        }
      }

      .bg1 {
        background: url(../../../assets/machineMall/算力稳定.png);
      }
      .bg2 {

        background: url(../../../assets/machineMall/优质设备.png);
      }
      .bg3 {
  
        background: url(../../../assets/machineMall/人工维护.png) no-repeat;
      }
      .grid-content {
        width: 350px;
        height: 182px;
        margin-top: 93px;
      }
      .pool_photo{
        width: 1200px;
        height: 850px;
        .photo_top{
          height: 420px;
          margin-bottom: 10px;
          .video{
            float: left;
            width: 660px;
            height: 420px;
            background: url(../../../assets/machineMall/video.jpg);
            background-size: cover;
            margin-right: 10px;
            .el-button{
              width: 74px;
              height: 74px;
              background: url(../../../assets/machineMall/icon_play.png) no-repeat;
              border: 0;
              display: block;
              margin: 170px auto;
            }
            .el-popover{
              width: auto!important;
            }
          }
          .photo1{
            float: left;
            width: 530px;
            height: 166px;
            background: url(../../../assets/machineMall/pic_1.png) no-repeat;
            margin-bottom: 10px;
          }
          .photo2{
            float: left;
            width: 328px;
            height: 244px;
            background: url(../../../assets/machineMall/pic_2.png) no-repeat;
            margin-right: 10px;
          }
          .photo3{
            float: left;
            width: 192px;
            height: 244px;
            background: url(../../../assets/machineMall/pic_3.png) no-repeat;
          }
        }
        .photo_bottom{
          height: 420px;
          .photo4{
            float: left;
            width: 190px;
            height: 420px;
            background: url(../../../assets/machineMall/pic_4.png) no-repeat;
            margin-right: 10px;
          }
          .photo5{
            float: left;
            width: 330px;
            height: 420px;
            background: url(../../../assets/machineMall/pic_5.png) no-repeat;
            margin-right: 10px;
          }
          .photo6{
            float: left;
            width: 660px;
            height: 420px;
            background: url(../../../assets/machineMall/pic_6.png) no-repeat;
          }
        }
      }
        
    }
  }
 
}
.footer_out{
  background: #fff;
}
.footer2{
    width: 100%;
    min-width: 1300px;
    height: 380px !important;
    background-size: 100% 100%;

   background: url(../../../assets/machineMall/bottom.png) no-repeat center;
 }
}
</style>
