<template>
  <div id="machine_home">
    <div>
      <div class="top"></div>
      <div class="header">
        <span class="back" @click="backLastPage"></span>
        <span class="title">BTC-神级1号</span>
      </div>
      <!-- <div class="poster"><input type="text" class="serach" placeholder="搜索"></div> -->
      <mt-swipe :auto="4000" class="swipe_box">
        <mt-swipe-item class="first">1</mt-swipe-item>
        <mt-swipe-item class="middle">2</mt-swipe-item>
        <mt-swipe-item class="last">3</mt-swipe-item>
      </mt-swipe>
      <div class="goods">
        <div class="goods_name">
          <span class="montant"></span>
          <span class="title">BTM-大象B9矿机</span>
          <saleRate></saleRate>
        </div>
        <div class="goods_arg">
          <div class="left">
            <div class="sale_price">
              100
              <span class="unit">CNY</span>
            </div>
            <p>每83GH/s算力价格</p>
          </div>
          <div class="right">
            <div class="sale_price">
              0.1
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
            <span style="margin-left:0.42rem">B9</span>
          </td>
          <td>
            <span>功耗</span>
            <span>7.5W/份</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>电费</span>
            <span>0.40CNY/KWH</span>
          </td>
          <td>
            <span>管理费</span>
            <span>0%</span>
          </td>
        </tr>
      </table>
      <div class="agreement">
        <span>合约周期</span>
        <span>永久，每日结算至连续30天不产生收益为止</span>
      </div>
      <div class="agreement_title">
        <span></span>
        <span>合约详情</span>
        <span></span>
      </div>
      <div class="agreement_detail"></div>
      <div class="buy_bar">
        <span class="price">单价</span>
        <span class="price_number">100</span>
        <span class="unit">CNY/份</span>
        <span class="friend" @click="togglePopupBuy"></span>
        <span class="self" @click="togglePopupBuy"></span>
      </div>
    </div>
    <!-- 购买弹出框 -->
    <div class="shade_container" v-show="popupBuySee">
      <div class="popupBuy" >
        <div class="mainImgBox">
          <img src alt>
          <span class="container">
            <span class="price">
              100
              <span>CNY</span>
            </span>
            <p>每83GH/s算力价格</p>
          </span>
          <span class="close_icon" @click="togglePopupBuy"></span>
        </div>
        <form class="form_info">
          <div class="bar">
            <span>收取人</span>
            <input type="text" placeholder="请输入手机号">
          </div>
          <div class="bar">
            <span>推荐人</span>
            <input type="text" placeholder="请输入信息">
          </div>
          <div class="bar">
            <span class="buyNumber">购买数量</span>
            <button class="reduce"></button>
            <button class="middle">100</button>
            <button class="add"></button>
          </div>
          <div class="bar">
            <span>算力余量</span>
            <span class="buymark">1234567份</span>
          </div>
          <div class="bar pledge">
            <span>抵押(BHD)</span>
            <span class="money">10000</span>
          </div>
          <div class="buySubmit" @click="goPledgeFace"></div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "mint-ui";
import saleRate from "@/components/phone/machineMallM/saleRate.vue";
export default {
  data() {
    return {
      flag: false, //线下支付初始值为关闭。即支付宝
      popupBuySee: false
    };
  },
  methods: {
    backLastPage() {
      this.$router.go(-1);
    },
    togglePopupBuy() {
      this.popupBuySee = !this.popupBuySee;
    },
    toggle() {
      this.flag = !this.flag;
    },
    //进入抵押页面。
    goPledgeFace(){
       this.$router.push({path:'/PledgeBuy'})  
    }
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
        img {
          display: inline-block;
          width: 2.78rem;
          height: 2.78rem;
          border: saddlebrown solid 1px;
          margin-left: 0.44rem;
          margin-top: 0.41rem;
        }
        .container {
          position: relative;
          top: -10px;
          display: inline-block;
          height: 1rem;
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
            position: relative;
            left: 3.34rem;
            font-size: 0.39rem;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(204, 204, 204, 1);
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
            margin-left: 0.05rem;
            margin-right: 0.05rem;
          }
          .buymark {
            position: relative;
            left: 5.5rem;
          }
          .money {
            width: 1.76rem;
            height: 0.49rem;
            line-height: 0.49rem;
            font-size: 0.66rem;
            font-family: Roboto-Regular;
            font-weight: 400;
            color: rgba(244, 153, 38, 1);
            position: relative;
            left: 5.2rem;
          }
        }
        .pledge{
            border-top: 0.5px solid rgba(230,230,230,1);
            padding-top:0.65rem;
            height: 1rem;
            margin-bottom: 2.81rem;
            // display:flex;
            // flex-direction:row;
            // just-content:space-between;
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
        background-color: green;
      }
      .middle {
        background-color: goldenrod;
      }
      .last {
        background-color: greenyellow;
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
          width: 11rem;
          height: 0.42rem;
          line-height: 0.42rem;
          margin-left: 0.36rem;
          // margin-right: 2.52rem;
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
      width: 100%;
      height: 8rem;
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(230, 230, 230, 1);
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


