<template>
<el-container id="machine_detail">
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
    <el-main>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark banner" style="height:200px;"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark content">
            <div class="machine_img">
              <img :src=machinePhontoUrl alt="" width="400px" height="400px">
            </div>
            <div class="machine_right">
              <div class="title">
                <h3><span></span>{{title}}</h3>
              </div>
              <div class="machine_price">
                <p>每（GH/s）算力价格<b>{{price}}</b><span> CNY</span></p>
              </div>
              <div class="machine_profit">
                <p>当前预估日收益<b>{{currencyPrice}}</b><span> BTC/C</span></p>
              </div>
              <div class="line"></div>
              <div class="machine_parameter">
              <div class="machine_type">
                <p>矿机类型<b>{{machineTypeId}}</b></p>
              </div>
              <div class="machine_power">
                <p>功耗<b>{{power}}<span> W/份</span></b></p>
              </div>
              <div class="machine_electric">
                <p>电费<b>{{electricity}}<span> CNY/KWH</span></b></p>
              </div>
              <div class="machine_manage">
                <p>管理费<b>{{managementFee}}<span>%</span></b></p>
              </div>
              <div class="progress">
                <el-progress :text-inside="true" :stroke-width="20" :percentage="Number(percent).toFixed(2)*100" color="linear-gradient(-90deg,rgba(254,147,44,1),rgba(244,153,38,1),rgba(254,202,63,1))"></el-progress>
              </div>
              <div class="power_rate">
                <p>{{stockPower}}Gh/{{totalPower}}Gh</p>
              </div>
              <div class="button">
                <button type="submit" class="send" v-show="send" @click="sendFriend"></button>
                <button type="submit" class="buy" @click="buy"></button>
                <p v-show="adressLogin">建议您<span @click="dialogFormVisible=true">登录</span>后再购买</p>
              </div>
              <button type="submit" class="contract"></button>
            </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark contract_detail">
            <div class="contract_titile">
              <span class="title_line1"></span><h3>合约详情</h3><span class="title_line2"></span>
            </div>
            <div class="contract_content">
              <p>云算力提供商：大象矿业</p>
              <p>总算力：5000000H/S</p>
              <p>购买单位 :83.3H/S/份</p>
              <p>定价：83.3H/S/份/100元</p>
              <p>单台机器算力：5000H/S</p>
              <p>单台B9理论收益 : ?6个BTM/天</p>
              <p>单台B9功耗：450W</p>
              <p>电费：0.42元/度</p>
              <p>单台每天电费计算：0.40元*0.45KW*24小时=4.32元/天</p>
              <p>管理费：0（管理费包含场地费用、人工费、通讯费、冷却费等）</p>
              <p>挖矿效率 : 100 %</p>
             
              <p>描述 :</p>
              <p>说明：用户购买成功后，无法主动退款撤销。</p>
              <br>
              <p>收益结算：</p>
              <p>收益模式：用户购买成功后，合约立即生效并即刻开始挖矿。本平台采用PPS模式进行收益的分配</p>
              <p>结算方式：每天将挖矿所得BTM按当天市价卖掉电费部分，剩下的BTM按比例平均付给客户。</p>
              <p>结算时间：用户成功购买算力成后立即享受挖矿收益，每天结算1次</p>
              <br>
              <p>故障与维护：</p>
              <p>正规化矿场运作，提供双备电力线路，保证7*24小时供电；</p>
              <p>确保矿机100%正常运转，本平台提供备用矿机用于替换；</p>
              <br>
              <p>合约期限</p>
              <p>周期：终身。</p>
              <p>休眠期：当币价下降，每天挖矿产出等于电费支出时，此合约进入休眠期，矿机关机休眠。</p>
              <p>激活期：当币价上涨，每天挖矿产出大于电费支出时，此合约当天激活，矿机开机生产</p>
              <p>合约终止：当本合约进入休眠期90天内币价无上涨，本合约终止。合约终止后本批机器硬件公开拍卖，所有用户均有受买资格，拍卖所得平均分给用户，本合约终止。</p>
              <br>
              <p>其它问题答疑：</p>
              <br>
              <p>1.云算力有哪些费用？</p>
              <p>除了购买云算力合约支付的费用，每天挖矿的收益先扣除电费剩下的BTM按比例平均付给客户</p>
              <p>云算力合约的管理成本可能由于国家政策、矿场运维成本变动、矿机磨损老化等原因而波动，大象矿业将保留调整管理费的权利。</p>
              <br>
              <p>2. 什麽是管理费？</p>
              <p>管理费是用于矿场运维、机器部署、矿及维修，人员支出，突发险情、风险基金等的费用。</p>
              <br>
              <p>3. 每批合约的价格为什么不一样？</p>
              <p>由于我们的挖矿机器是分批次上线的，每一批次合约价格由矿机采购成本和电价成本而定，另外也会參考当前的挖矿难道和币价，因此价格会偶有波动。</p>
              <br>
              <p>4. 你们的矿场在哪里？</p>
              <p>我们的矿场选址在贵州、四川、新疆、云南等富电区。</p>
              <br>
              <p>5.合约佣金?</p>
              
              <p>合约佣金是算力提供商为了打开销售的一种营销方式，每一批次合約佣金由矿机总利润而定，另外也会參考当前的挖矿难度和币价，因此佣金每一批次合约都不同。</p>
              <br>
              <p>免责声明：由于法律政策、战争、自然灾害（地震、雷电）等不可抗拒原因导致矿场无法继续运营，合约提前中止，本平台不承担赔偿责任。</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark footer2"></div></el-col>
      </el-row>
    </el-main>
    <div class="popup" v-show="popup">
      <div class="popup_title">购买算力<span class="close" @click="close"></span></div>
      <div class="popup_content">
        <p><span class="user">收取人</span><input type="text" placeholder="请输入手机号" v-model="phone" :disabled= "isDisabled" v-on:blur="otherPhone"></p>
        <p><span class="machine_code">推荐人</span><input type="text" placeholder="推荐人账号" v-model="recommendUser" :disabled="isDisabled2"></p>
        <p><span>购买数量</span><el-input-number size="mini" v-model="num1" @change="handleChange" :min="1" label="描述文字"></el-input-number></p>
        <p><span>剩余算力</span><b>{{saleStock}}</b>份</p>
        <p><span>金额（￥）</span><b>{{allPrice}}</b></p>
        <p><span>支付方式</span></p>
        <div class="bank_way" :class="{border:bank}" @click="back_way"><span></span>线下支付</div>
        <div class="aliy_pay" :class="{border:aliy}" @click="aliy_pay"><span></span>支付宝</div>
        <button type="submit" class="btn_buy" @click="machineBuy"></button>
      </div>
    </div>
    
</el-container>
</template>
<script>
import {getSuperior,getMachineInfo,insertOrder} from '@/service/machineApi.js'
import pc_login from '@/components/pc/pc_login.vue'
import pc_regist from '@/components/pc/pc_regist.vue'
import { log } from 'util';
import retrieve_passwordVue from '../../phone/retrieve_password.vue';
  export default {
      name:'machineDetail',
      components: {
        pc_login: pc_login,
        pc_regist:pc_regist,
        
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
              visitor:true,
              num1: 1,
              machineId:'',
              popup:false,
              title:'',
              price:'',
              currencyPrice:'',
              machineTypeId:'',
              power:'',
              electricity:'',
              managementFee:'',
              saleStock:'',
              totalStock:'',
              stockPower:'',
              totalPower:'',
              percent:'0.2',
              adressLogin:true,
              send:false,
              phone:'',
              isDisabled:false,
              acount:'1',
              allPrice:'100',
              machinePhontoUrl:'',
              recommendUser:'',
              bank:true,
              aliy:false,
              isDisabled2:false,
              payAway:'OFFLINE_PAYMENT'
          }
      },
      
      methods:{
        handleChange(value) {
          this.acount = value
          this.allPrice = value * this.price
        },
        home_change(){
          this.home_choosed=!this.home_choosed;
          this.login_choosed=false
          this.reg_choosed=false
          if (this.home_choosed==true){
            location.reload();
          }
        },
        //自己购买
        buy(){
          this.popup = true;
          this.phone = this.userName
          let phonePara = new FormData()
          phonePara.append('userName',this.phone)
          getSuperior(phonePara).then(res=>{
            if (res.data.status == 200) {
              this.recommendUser = res.data.data.userName
              if (this.recommendUser != '') {
                this.isDisabled2 = true
              }
            }else{
              console.log(res.data.message);
            }
          }).catch(err=>{
            console.log(err);
          })
          
          this.isDisabled = false
          if (this.userName != '') {
            this.isDisabled = true
            this.phone = this.userName
            return
          }

        },
        //送给朋友
        sendFriend(){
          this.popup = true;
          this.phone = ''
          this.recommendUser = ''
          this.isDisabled = false
        },
        otherPhone(){
          this.phone = this.phone;
          let phonePara = new FormData()
          phonePara.append('userName',this.phone)
          getSuperior(phonePara).then(res=>{
            if (res.data.status == 200) {
              this.recommendUser = res.data.data.userName
            }else{
              console.log(res.data.message);
            }
          }).catch(err=>{
            console.log(err);
          })
        },
        //关闭
        close(){
          this.popup = false;
        },
        //购买算力
        machineBuy(){
          let order = new FormData();
          order.append('buyerPhone',this.userName)
          order.append('machineId',this.machineId)
          order.append('recommendCode',this.recommendCode)
          order.append('phone',this.phone)
          order.append('amount',this.acount)
          order.append('paymentTypeEnum',this.payAway)
          insertOrder(order).then(res=>{
            if (res.data.status == 200) {
              console.log(res);
              this.$router.push({path:'/orderConfirm'})
            }else{
              console.log(res.data.message);
              
            }
          }).catch(err=>{
            console.log(err);
            
          });
        },
        //支付方式
        back_way(){
          this.bank = true,
          this.aliy = false
          return this.payAway = 'OFFLINE_PAYMENT'
        },
        aliy_pay(){
          this.bank = false,
          this.aliy = true
          return this.payAway = 'ALIPAY'
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
            this.send = true
            this.adressLogin = false
          }
        },
      },
      created(){
        this.machineId = this.$route.query.machineId
        this.uuid = localStorage.getItem('uuid')
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
        let para = new FormData()
        para.append('cloudMachineId',this.machineId)
        getMachineInfo(para).then(res => {
          if (res.data.status == 200) {
            this.title = res.data.data.title
            this.price = res.data.data.price
            this.currencyPrice = res.data.data.currencyPrice
            this.machineTypeId = res.data.data.machineTypeId
            this.power = res.data.data.power
            this.electricity = res.data.data.electricity
            this.managementFee = res.data.data.managementFee
            this.saleStock = res.data.data.saleStock
            this.totalStock = res.data.data.totalStock
            
            this.percent = (Number(this.totalStock) - Number(this.saleStock))/Number(this.totalStock);
            this.stockPower = res.data.data.stockPower
            this.totalPower = res.data.data.totalPower
            this.machinePhontoUrl = "https://cococo.org/commune-dev/"+res.data.data.mainImage
          }

        })

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
#machine_detail{
  

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
        overflow: hidden;
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
    margin-bottom: 20px;
  }
  .content{
    width: 1200px;
    height:580px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(230,230,230,1);
    margin: 0 auto;
    .machine_img{
      float: left;
      width: 400px;
      height: 400px;
      background: #000;
      margin-left: 40px;
      margin-top: 40px;
      background:rgba(219,219,219,1);
      margin-right: 50px;
      
    }
    .machine_right{
      width: 700px;
      height: 580px;
      float: left;
      position: relative;
      .title{
        float: left;
        margin-top: 40px;
        margin-right: 400px;
        h3{
          font-size: 24px;
          font-weight: normal;
          font-family:SourceHanSansCN-Regular;
          float: left;
          color: #333;
          span{
            float: left;
            width: 6px;
            height: 36px;
            background:rgba(244,153,38,1);
            border-radius:3px;
            margin: 0 37px 0 0px;
          }
        }
      }
      .machine_price{
        float: left;
        width: 500px;
        margin-right: 100px;
        margin-top: 28px;
        margin-left: 10px;
        p{
          font-size:16px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          margin-top: 30px;
          line-height: 24px;
          
          b{
            font-size:30px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(244,153,38,1);
            margin-right: 5px;
            margin-left: 44px;
            position: relative;
            top: 3px;
          }
          span{
            color:rgba(51,51,51,1);
          }
           
        }
      }
      .machine_profit{
        float: left;
        width: 500px;

        margin-left: 10px;
          p{
          font-size:16px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          float: left;
          margin-top: 15px;
        }

          b{
            font-size:16px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-right: 5px;
            margin-left: 88px;

          }
          span{
            color:rgba(51,51,51,1);
          }
          
      }
      .line{
        float: left;
        width:670px;
        height:1px;
        background:rgba(248,248,248,1);
        border:1px solid rgba(230,230,230,1);
        margin-top: 30px;
      }
      .machine_type{
        float: left;
        width: 500px;
        margin-left: 10px;
        p{
          font-size:16px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          float: left;
          margin-top: 15px;
          b{
            font-size:16px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-right: 5px;
            margin-left: 138px;
          }
        }
      }
      .machine_power{
        float: left;
        width: 500px;
        margin-left: 10px;
        p{
          font-size:16px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          float: left;
          margin-top: 15px;
          b{
            font-size:16px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-right: 5px;
            margin-left: 170px;
          }
        }
      }
      .machine_electric{
        float: left;
        width: 500px;
        margin-left: 10px;
        p{
          font-size:16px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          float: left;
          margin-top: 15px;
          b{
            font-size:16px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-right: 5px;
            margin-left: 170px;
          }
        }
      }
      .machine_manage{
        float: left;
        width: 500px;
        margin-left: 10px;
        p{
          font-size:16px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          float: left;
          margin-top: 15px;
          b{
            font-size:16px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-right: 5px;
            margin-left: 154px;
          }
        }
      }
      .progress{
        float: left;
        width: 377px;
        margin-top: 20px;
        margin-left: 10px;
        .el-progress-bar__outer{
          background:rgba(220,220,220,1);

        }
        .el-progress-bar__inner{
          background:linear-gradient(-90deg,rgba(254,147,44,1),rgba(244,153,38,1),rgba(254,202,63,1));
          
        }
        .el-progress-bar__innerText{

          font-size:14px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
      }
      .power_rate{
        float: left;
        width: 500px;
        margin-left: 10px;
        margin-top: 10px;
        p{
          font-size:12px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
        }
      }
      .button{
        float: left;
        outline: none;
        border: 0;
        margin-top: 30px;
        margin-left: 10px;
        .send{
          float: left;
          width: 120px;
          height: 38px;
          background: url(../../../assets/machineMall/btn_give.png) no-repeat;
          outline: none;
          border: 0;
          margin-right: 10px;
        }
        .buy{
          float: left;
          margin: 0 15px 0 0;
           width: 120px;
          height: 38px;
          background: url(../../../assets/machineMall/btn_purchase.png) no-repeat;
          outline: none;
          border: 0;
        }
        p{
          float: left;
          margin-top: 20px;
          font-size:16px;
          color:rgba(153,153,153,1);
          span{
            color:#F49926;
            cursor: pointer;
          }
        }
      }
      .contract{
        width: 143px;
        height: 55px;
        background: url(../../../assets/machineMall/btn_contract.png) no-repeat;
        outline: none;
        border: 0;
        position: absolute;
        right: -40px;
        top: 40px;
      }
    }
    
  }
  .contract_detail{
    width: 1200px;
    height: 1300px;
    margin: 37px auto;
    background:rgba(255,255,255,1);
    border:1px solid rgba(230,230,230,1);
    padding-bottom: 20px;
  
    .contract_titile{
      width:1200px;
      height:80px;
      background:rgba(253,253,253,1);
      border:1px solid rgba(230,230,230,1);
      border-top: 0;
      position: relative;

      
      h3{
        margin: 0 auto;
        padding-top: 20px; 
        font-size: 24px;
        font-weight: normal;
        color:rgba(25,17,79,1);
        background:rgba(253,253,253,1);
        text-align: center;
        
      }
      .title_line1{
        position: absolute;
        left: 347px;
        top: 35px;
          width: 190px;
          height: 2px;
          background:rgba(248,248,248,1);

          margin-right: 15px;
        }
        .title_line2{
          position: absolute;
          left: 662px;
          top: 35px;
          width: 190px;
          height: 2px;
          background:rgba(248,248,248,1);
          margin-right: 15px;
        }
    }
    .contract_content{
      font-size: 16px;
      color:#666;
      margin-top: 56px;
      p{
        margin-left: 63px;
      }
    }
  }
}
.footer2{
  width: 100%;
  min-width: 1300px;
  height: 380px !important;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
   background: url(../../../assets/machineMall/bottom.png) no-repeat center;
}
.popup{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-260px) translateY(-366px);
  width: 521px;
  height: 733px;
  background: url(../../../assets/machineMall/pop_bg.png);
  .popup_title{
    text-align: center;
    color:rgba(51,51,51,1);
    font-size: 20px;
    margin-top: 67px;
    .close{
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url(../../../assets/machineMall/btn_close.png) no-repeat;
      background-size: cover;
      position: relative;
      top: -20px;
      left: 250px;
      cursor: pointer;
    }
  }
  .popup_content{
    margin-top: 36px;
    margin-left: 56px;
    p:nth-child(1),p:nth-child(2){
      font-size:16px;
      height: 40px;
      color:rgba(51,51,51,1);
      margin-bottom: 35px;
      span{
        margin-right: 69px;
        font-size:16px;
      }
      input{
        width: 290px;
        height: 40px;
        background:rgba(248,248,248,1);
        border:1px solid rgba(230,230,230,1);
        padding-left: 10px;
      }
      input::-webkit-input-placeholder{
        color:rgba(192,192,192,1);
      }
    }
    p:nth-child(3){
      font-size:16px;
      
      span:nth-child(1){
        margin-right: 235px;
      }
    }
    p:nth-child(4){
      margin-top: 40px;
      font-size:16px;
      b{
        margin-left: 255px;
        font-size: 16px;
        font-weight: normal;
        color:rgba(51,51,51,1);
      }
    }
    p:nth-child(5){
      font-size: 16px;
      margin-top: 30px;
      b{
              font-size:36px;
              font-family:SourceHanSansCN-Regular;
              font-weight:400;
              color:rgba(244,153,38,1);
              margin-left: 235px;
            }
    }
    p:nth-child(6){
      margin-top:45px;
    }
    
    .bank_way{
      float: left;
      margin-top: 30px;
      margin-right: 10px;
      font-size: 16px;
      width: 125px;
      height: 48px;
      border:1px solid #E6E6E6;
      border-radius:3px;
      text-align: center;
      line-height: 48px;
      cursor: pointer;
      span{
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url(../../../assets/machineMall/otc_icon_payment_bank_card.png) no-repeat;
        position: relative;
        top: 2px;
        margin-right: 5px;
      }
    }
    .aliy_pay{
      float: left;
      margin-top: 30px;
      font-size: 16px;
      width: 125px;
      height: 48px;
      border:1px solid #E6E6E6;
      border-radius:3px;
      text-align: center;
      line-height: 48px;
      cursor: pointer;
      span{
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url(../../../assets/machineMall/otc_icon_payment_Alipay.png) no-repeat;
        position: relative;
        top: 2px;
        margin-right: 5px;
      }
    }
    .border{
      width: 125px;
      height: 48px;
      border:1px solid rgba(246,167,68,1);
    }
    .btn_buy{
      width: 380px;
      height: 48px;
      background: url(../../../assets/machineMall/btn_buy.png) no-repeat;
      border: 0;
      outline: none;
      margin-top: 50px;
      margin-left: 20px;
    }
  }
} 
}
</style>
