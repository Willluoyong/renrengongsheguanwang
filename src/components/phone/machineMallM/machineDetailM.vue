<template>
  <div id="machine_home">
    <div>
      <div class="top"></div>
      <div class="header">
        <span class="back" @click="backLastPage"></span>
        <span class="title">{{coinTypeId}}-{{title}}</span>
      </div>
      <mt-swipe :auto="4000" class="swipe_box">
        <mt-swipe-item class="first" :style="{backgroundImage: 'url(' +'https://cococo.org/commune/'+this.mainImage + ')' }"></mt-swipe-item>
        <mt-swipe-item class="middle" :style="{backgroundImage: 'url(' +'https://cococo.org/commune/'+this.subImages[0] + ')' }"></mt-swipe-item>
        <mt-swipe-item class="last" :style="{backgroundImage: 'url(' +'https://cococo.org/commune/'+this.subImages[0] + ')' }"></mt-swipe-item>
      </mt-swipe>
      <div class="goods">
        <div class="goods_name">
          <span class="montant"></span>
          <span class="title">{{coinTypeId}}-{{title}}</span>
          <saleRate :percent='this.percent'></saleRate>
        </div>
        <div class="goods_arg">
          <div class="left">
            <div class="sale_price">
              {{this.price}}<span class="unit">CNY</span>
            </div>
            <p>每83GH/s算力价格</p>
          </div>
          <div class="right">
            <div class="sale_price">
              {{this.currencyPrice}}
              <span class="unit">BTM/份</span>
            </div>
            <p>当前预估日收益</p>
          </div>
        </div>
      </div>
      <table>
        <tr>
          <td>
            <span>矿机类型</span>
            <span style="margin-left:0.42rem">{{this.machineTypeId}}</span>
          </td>
          <td>
            <span>功耗</span>
            <span>{{this.power}}W/份</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>电费</span>
            <span>{{this.electricity}}CNY/KWH</span>
          </td>
          <td>
            <span>管理费</span>
            <span>{{this.managementFee}}%</span>
          </td>
        </tr>
      </table>
      <div class="agreement">
        <span>合约周期</span>
        <span>{{this.contractCycle}}</span>
      </div>
      <div class="agreement_title">
        <span></span>
        <span>合约详情</span>
        <span></span>
      </div>   
      <div class="agreement_detail">
        <pre>{{contractDetail}}</pre>
      </div>

      <div class="buy_bar">
        <span class="price">单价</span>
        <span class="price_number">{{this.price}}</span>
        <span class="unit">CNY/份</span>
        <span class="friend" @click="togglePopupBuy"></span>
        <span class="self" @click="togglePopupBuy"></span>
      </div>
    </div>
    <!-- 购买弹出框 -->
    <div class="shade_container" v-show="popupBuySee">
      <div class="popupBuy" >
        <div class="mainImgBox">
          <img :src="'https://cococo.org/commune/'+this.mainImage">
          <span class="container">
            <span class="price">
              {{this.price}}
              <span>CNY</span>
            </span>
            <p>每83GH/s算力价格</p>
          </span>
          <span class="close_icon" @click="togglePopupBuy"></span>
        </div>
        <form class="form_info">
          <div class="bar">
            <span>收取人</span>
            <input type="text" v-model="phone" placeholder="请输入手机号">
          </div>
          <div class="bar">
            <span>推荐人</span>
            <input type="text" v-model="recommendUser"  @focus="getRecommendUser" placeholder="请输入信息">
          </div>
          <div class="bar">
            <span class="buyNumber">购买数量</span>
            <button class="reduce" @click.stop.prevent="reduce"></button>
            <input type="text"  class="middle" v-model="num1" @input="changNumber">
            <button class="add" @click.stop.prevent="add"></button>
          </div>
          <div class="bar">
            <span>算力余量</span>
            <span>{{saleStock}}份</span>
          </div>
          <div class="bar">
            <span>金额</span>
            <span class="money">{{allPrice}}</span>
          </div>
          <div class="bar">
            <span>支付方式</span>
          </div>
          <div class="bar payment_container">
            <span class="payment" :class="{activated:flag}" @click="toggle"><span class="lineOff"></span><span>线下支付</span></span>
            <span class="payment" :class="{activated:!flag}" @click="toggle"><span class="zhifubao"></span><span>支付宝</span></span>
          </div>
          <div class="buySubmit" @click="goPayface"></div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem,Toast } from "mint-ui";
import saleRate from "@/components/phone/machineMallM/saleRate.vue";
import {getMachineInfo,getSuperior,insertOrder} from '@/service/machineApi.js'
export default {
  data() {
    return {
      flag: false, //支付方式初始值为关闭。即支付宝
      popupBuySee: false,
      urlAdress:'',
      urlCode:'',
      userName:'',//用户名-登陆的
      recommendCode:'',
      num1: 1,
      coinTypeId:'',
      machineId:'',
      popup:false,
      title:'',
      price:'',
      currencyPrice:'',
      machineTypeId:'',
      contractDetail:"",
      power:'',
      electricity:'',
      limitShop:'',
      contractCycle:'',
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
      mainImage:'',
      subImages:[],//子图
      recommendUser:'',
      bank:true,
      aliy:false,
      isDisabled2:false,
      referenceNum:'', //随机码
      amount:'', //数量
      payAway:'OFFLINE_PAYMENT'
    };
  },
  methods: {
    backLastPage() {
      this.$router.go(-1);
    },
    togglePopupBuy() {
      this.popupBuySee = !this.popupBuySee;
      this.phone='';
      this.recommendUser='';
      this.num1=1;
      this.allPrice=100;
    },
    toggle() {
      this.flag = !this.flag;
      if (this.flag) {
        this.payAway = 'OFFLINE_PAYMENT'
      } else {
        this.payAway = 'ALIPAY'
      }
    },
    add(){
      if (this.num1<this.limitShop) {
        this.num1++;
        this.handleChange()
      }

    },
    reduce(){
      if (this.num1>1) {
        this.num1--;
        this.handleChange()
      }
    },
    changNumber(e){
      let temp=Number(e.target.value);
      // console.log(typeof temp)
      if (1<=temp&&temp<=this.limitShop) {
          this.num1 =temp;
          this.handleChange();
          // setTimeout(this.handleChange(), 3000)
      }else{
          Toast({
            message: "输入数据不在限购内！",
            position: 'middle',
            duration: 2000
          });
      }

    },
    handleChange() {
      this.acount = this.num1 //获取数量保存给下订单用。
      this.allPrice = this.num1 * this.price
    },
    getRecommendUser(){
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
          this.referenceNum=res.data.data.referenceNum
          let orderNo=res.data.data.orderNo
          let bankName=res.data.data.cards.bankName
          let cardholder=res.data.data.cards.cardholder
          let bankCardNo=res.data.data.cards.bankCardNo
          let address=res.data.data.cards.address
          if (this.flag==false) {
              // console.log("这是支付宝付款");
              this.$router.push({path:'/zhifubaoPay',query:{"orderNo":orderNo,"coinTypeId":this.coinTypeId,"title":this.title,"referenceNum":this.referenceNum,"phone":this.phone,"recommendCode":this.recommendUser,"amount":this.acount,"allPrice":this.allPrice}})
              
          } else {
              this.$router.push({path:'/offLinePay',query:{"orderNo":orderNo,"bankName":bankName,"cardholder":cardholder,"bankCardNo":bankCardNo,"address":address,"coinTypeId":this.coinTypeId,"title":this.title,"referenceNum":this.referenceNum,"phone":this.phone,"recommendCode":this.recommendUser,"amount":this.acount,"allPrice":this.allPrice}})
          }

        }else{
          // Toast(res.data.message);
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 2000
          });
          console.log(res.data.message);
        }
      }).catch(err=>{
        console.log(err);
        
      });
    },

    //进入支付页面。
    goPayface(){
      if (1<=Number(this.num1)&&Number(this.num1)<=this.limitShop) {
         this.machineBuy();    
      } else {
        Toast({
            message: "输入数据不在限购内！",
            position: 'middle',
            duration: 2000
          });
      }
     
    }
  },
  created(){
    this.machineId = this.$route.query.machineId
    let para = new FormData()
    para.append('cloudMachineId',this.machineId)
    getMachineInfo(para).then(res => {
      if (res.data.status == 200) {
        this.coinTypeId = res.data.data.coinTypeId
        this.title = res.data.data.title
        this.price = res.data.data.price
        this.currencyPrice = res.data.data.currencyPrice
        this.contractCycle = res.data.data.contractCycle
        this.limitShop = res.data.data.limitShop
        this.contractDetail = res.data.data.contractDetail
        this.machineTypeId = res.data.data.machineTypeId
        this.power = res.data.data.power
        this.electricity = res.data.data.electricity
        this.managementFee = res.data.data.managementFee
        this.saleStock = res.data.data.saleStock
        this.totalStock = res.data.data.totalStock
        
        this.percent = (Number(this.totalStock) - Number(this.saleStock))/Number(this.totalStock);
        // console.log("占比："+this.percent);
        this.stockPower = res.data.data.stockPower
        this.totalPower = res.data.data.totalPower
        this.mainImage =res.data.data.mainImage
        let temp =res.data.data.subImages;
        this.subImages=temp.split(',');// 将字符串转化为字符串数组。
        }
      })
  },
  components: {
  Swipe,
  SwipeItem,
  saleRate
  }
};
</script>
<style lang="less" scoped>
* {
  padding: 0, 0;
  margin: 0, 0;
  box-sizing: border-box;
}
body {
  .shade_container {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.6);
    z-index: 100;
    .popupBuy {
      position: fixed;
      bottom: 0;
      z-index: 100;
      box-sizing: border-box;
      width: 10rem;
      height: 15rem;
      background: rgba(255, 255, 255, 1);
      // border:1px solid saddlebrown;
      border-radius: 0.3rem 0.3rem 0rem 0rem;
      .mainImgBox {
        // border: blue solid 1px;
        border-radius: 0.3rem 0.3rem 0rem 0rem;
        height: 3.79rem;
        display: flex;
        flex-direction: row;

        img {
          display: inline-block;
          width: 2.78rem;
          height: 2.78rem;
          // border: saddlebrown solid 1px;
          margin-left: 0.44rem;
          margin-top: 0.41rem;
        }
        .container {
          position: relative;
          top: 2.27rem;
          display: inline-block;
          width: 4rem;
          height: 1.4rem;
          font-size: 0.28rem;
          // border: sandybrown solid 1px;
          margin-left: 0.47rem;
          .price {
            width: 0.69rem;
            height: 0.33rem;
            font-size: 0.44rem;
            font-family: Roboto-Regular;
            font-weight: 400;
            color: rgba(244, 153, 38, 1);
            span {
              height: 0.21rem;
              font-size: 0.28rem;
              font-family: Roboto-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              margin-left: 0.08rem;
            }
          }
          p {
            margin-top: 0.28rem;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.28rem;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
        //关闭图标
        .close_icon {
          display: inline-block;
          width: 0.56rem;
          height: 0.56rem;
          background: url("../../../assets/phone/btn_miner_close.png") no-repeat;
          background-size: cover;
          position: absolute;
          top: 0.3rem;
          right: 0.3rem;
        }
      }
      .form_info {
        width: 9.11rem;
        height: 11rem;
        margin-left: 0.44rem;
        // background:rgba(245,245,245,1);
        border-top: 0.5px solid rgba(230, 230, 230, 1);

        padding-top: 0.73rem;
        .bar {
          box-sizing: border-box;
          // border:0.5px solid rebeccapurple;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.33rem;
          height: 0.83rem;
          span {
            height: 0.37rem;
            line-height: 0.37rem;
            font-size: 0.39rem;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          input {
            box-sizing: border-box;
            width: 4.56rem;
            height: 0.83rem;
            line-height: 0.83rem;
            background: rgba(255, 255, 255, 1);
            border: 0.5px solid rgba(190, 190, 190, 1);
            border-radius: 0.1rem;
            font-size: 0.39rem;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color:rgba(51,51,51,1);
            padding-left: 0.27rem;
          }
          input:hover{
            border:0.5px solid rgba(246,167,68,1);
          }
          .buyNumber {
            width: 1.7rem;
          }
          button {
            width: 0.83rem;
            height: 0.67rem;
            line-height: 0.67rem;
            background: rgba(245, 245, 245, 1);
            border: 0.5px solid rgba(230, 230, 230, 1);
            font-size: 0.39rem;
            font-family: Roboto-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            text-align: center;
          }
          .reduce {
            margin-left: 4.84rem;
            background: url("../../../assets/phone/icon_power_reduce.png") no-repeat;
            background-size: cover;
          }
          .add{
            background: url("../../../assets/phone/icon_power_add.png") no-repeat;
            background-size: cover;
          }
          .middle {
            width: 0.94rem;
            height: 0.67rem;
            line-height: 0.67rem;
            text-align:center;
            margin-left: 0.05rem;
            margin-right: 0.05rem;
            padding-left: 0;
            // border: saddlebrown 1px  solid;
            background:rgba(238,238,238,1);
          }
          .money {
            width: 1.76rem;
            height: 0.49rem;
            line-height: 0.49rem;
            font-size: 0.66rem;
            font-family: Roboto-Regular;
            font-weight: 400;
            color: rgba(244, 153, 38, 1);
            // position: relative;
            // left: 6.35rem;
          }
        }
        .payment_container {
          box-sizing: border-box;
          height: 1.12rem;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          .payment {
            box-sizing: border-box;
            width: 2.89rem;
            height: 1.11rem;
            background: rgba(255, 255, 255, 1);
            // border:1px solid red;
            border: 0.5px solid rgba(190, 190, 190, 1);
            border-radius: 0rem;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-right: 0.24rem;
            .lineOff {
              display: inline-block;
              width: 0.39rem;
              height: 0.39rem;
              background: url("../../../assets/phone/icon_payment_bankcard.png")
                no-repeat;
              background-size: cover;
              margin-right: 0.2rem;
            }
            .zhifubao {
              display: inline-block;
              width: 0.39rem;
              height: 0.39rem;
              background: url("../../../assets/phone/icon_alipay.png") no-repeat;
              background-size: cover;
              margin-right: 0.2rem;
            }
          }
          .activated {
            border: 0.5px solid rgba(246, 167, 68, 1);
          }
        }
        .buySubmit {
          margin-top: 0.72rem;
          width: 9.11rem;
          height: 1.11rem;
          border-radius: 1rem;
          background: url("../../../assets/phone/btn_buynow.png") no-repeat;
          background-size: 9.11rem 1.11rem;
        }
      }
    }
  }
  #machine_home {
    width: 10rem;
    background: #fff;
    .top {
      width: 10rem;
      height: 0.56rem;
      background: rgba(0, 0, 0, 1);
    }
    .header {
      width: 10rem;
      height: 1.27rem;
      // background-color: red;
      display: flex;
      flex-direction: row;
      // justify-content: center;
      align-items: center;
      .back {
        display: inline-block;
        width: 0.21rem;
        height: 0.37rem;
        background: url("../../../assets/phone/back_black.png") no-repeat center;
        background-size: cover;
        margin-left: 0.37rem;
        // border: solid 1px red
      }
      .title {
        display: inline-block;
        // width:1.6rem;
        height: 0.39rem;
        line-height: 0.39rem;
        font-size: 0.39rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        position: absolute;
        margin-left: 3.69rem;
      }
    }
    .swipe_box {
      width: 100%;
      height: 7.78rem;
      background-color: blue;
      .first {
        background-size: cover;
      }
      .middle {
        // background-color: goldenrod;
        background-size: cover;
      }
      .last {
        // background-color: greenyellow;
        background-size: cover;
      }
    }

    .goods {
      box-sizing: border-box;
      width: 10rem;
      height: 3.72rem;
      background: rgba(255, 255, 255, 1);
      border: 0.5px solid rgba(230, 230, 230, 1);
      // border:  saddlebrown solid 1px;
      margin-bottom: 0.33rem;
      .goods_name {
        box-sizing: border-box;
        height: 1.39rem;
        border-bottom: 0.01rem solid rgba(218, 218, 218, 1);
        display: flex;
        flex-direction: row;
        align-items: center;
        .montant {
          display: inline-block;
          margin-left: 0.44rem;
          width: 0.11rem;
          height: 0.67rem;
          background: rgba(244, 153, 38, 1);
          border-radius: 0rem;
        }
        .title {
          width: 12rem;
          height: 0.42rem;
          line-height: 0.42rem;
          margin-left: 0.36rem;
          font-size: 0.44rem;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
      .goods_arg {
        box-sizing: border-box;
        height: 2.2rem;
        display: flex;
        flex-direction: row;
        .left {
          width: 40%;
          margin-left: 0.46rem;
          // border: orange 1px solid;
          display: flex;
          flex-direction: column;
          .sale_price {
            height: 0.34rem;
            line-height: 0.34rem;
            font-size: 0.44rem;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            margin-top: 0.67rem;
            margin-bottom: 0.28rem;
            color: rgba(244, 153, 38, 1);
            // border: blue 1px solid;
            .unit {
              width: 0.52rem;
              height: 0.22rem;
              font-size: 0.28rem;
              font-family: SourceHanSansCN-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }
          }
          p {
            // border: rebeccapurple 1px solid;
            display: block;
            width: 3.5rem;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.28rem;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
        .right {
          width: 40%;
          position: absolute;
          left: 5rem;
          margin-left: 0.46rem;
          // border: orange 1px solid;
          display: flex;
          flex-direction: column;
          .sale_price {
            height: 0.34rem;
            line-height: 0.34rem;
            font-size: 0.44rem;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            margin-top: 0.67rem;
            margin-bottom: 0.28rem;
            color: rgba(51, 51, 51, 1);
            // border: blue 1px solid;
            .unit {
              width: 0.52rem;
              height: 0.22rem;
              font-size: 0.28rem;
              font-family: SourceHanSansCN-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }
          }
          p {
            // border: rebeccapurple 1px solid;
            display: block;
            width: 2.7rem;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.28rem;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
    }
    table {
      width: 100%;
      tr {
        width: 100%;
        td {
          width: 50%;
          // width:5.01rem;
          height: 1.25rem;
          background: rgba(255, 255, 255, 1);
          border: 0.5px solid rgba(230, 230, 230, 1);
          font-size: 0.33rem;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          span:first-child {
            display: inline-block;
            width: 1.5rem;
            margin-left: 0.6rem;
          }
          span:last-child {
            // margin-left: 0.42rem;
            height: 0.34rem;
            font-size: 0.33rem;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
        }
      }
    }
    .agreement {
      width: 100%;
      height: 1.39rem;
      background: rgba(255, 255, 255, 1);
      border: 0.5px solid rgba(230, 230, 230, 1);
      margin-top: 0.33rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      span:first-child {
        // width:1.5rem;
        height: 0.31rem;
        line-height: 0.31rem;
        font-size: 0.33rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(244, 153, 38, 1);
        margin-left: 0.45rem;
      }
      span:last-child {
        // width:6.34rem;
        height: 0.32rem;
        line-height: 0.32rem;
        font-size: 0.33rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-left: 0.3rem;
      }
    }
    .agreement_title {
      width: 100%;
      height: 0.97rem;
      background: rgba(255, 255, 255, 1);
      border: 0.5px solid rgba(230, 230, 230, 1);
      margin-top: 0.33rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      span:first-child {
        width: 1.39rem;
        height: 0.01rem;
        background: rgba(245, 245, 245, 1);
        border: 0.3px solid rgba(230, 230, 230, 1);
      }
      span:nth-child(2) {
        width: 1.5rem;
        height: 0.31rem;
        line-height: 0.31rem;
        font-size: 0.33rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-left: 0.29rem;
        margin-right: 0.29rem;
      }
      span:last-child {
        width: 1.39rem;
        height: 0.01rem;
        background: rgba(245, 245, 245, 1);
        border: 0.3px solid rgba(230, 230, 230, 1);
      }
    }
    .agreement_detail {
      width: 10rem;
      padding-left: 0.44rem;
      padding-top: 0.32rem;
      margin-bottom: 1.5rem;
      background: rgba(255, 255, 255, 1);
      // border: 1px solid red;
      font-size:0.33rem;
      font-family:SourceHanSansCN-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      // line-height:0.44rem;
      overflow: scroll;
      pre{
        // border: 1px solid peru;
        overflow: scroll;
        line-height: 0.5rem;
      }
    }
    .buy_bar {
      box-sizing: border-box;
      width: 100%;
      height: 1.25rem;
      background: rgba(255, 255, 255, 1);
      position: fixed;
      bottom: 0;
      z-index: 100;
      display: flex;
      flex-direction: row;
      align-items: center;
      .price {
        box-sizing: border-box;
        width: 0.78rem;
        height: 0.44rem;
        font-size: 0.39rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 0.44rem;
        margin-left: 0.48rem;
      }
      .price_number {
        width: 0.69rem;
        height: 0.34rem;
        line-height: 0.34rem;
        font-size: 0.44rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(244, 153, 38, 1);
        margin-left: 0.21rem;
      }
      .unit {
        box-sizing: border-box;
        width: 1.4rem;
        height: 0.29rem;
        font-size: 0.28rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-left: 0.2rem;
      }
      .friend {
        display: inline-block;
        width: 2.65rem;
        height: 0.97rem;
        margin-left: 0.8rem;
        background: url("../../../assets/phone/btn_forfriends.png") no-repeat
          center;
        background-size: cover;
      }
      .self {
        display: inline-block;
        width: 2.65rem;
        height: 0.97rem;
        background: url("../../../assets/phone/btn_buy.png") no-repeat center;
        background-size: cover;
      }
    }
  }
}
</style>


