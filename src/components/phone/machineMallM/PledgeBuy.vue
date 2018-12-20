<template>
  <div id="pledgeBuy">
    <div>
      <div class="top"></div>
      <div class="header">
        <span class="back" @click="backLastPage"></span>
        <span class="title">BHD-硬盘挖矿</span>
      </div>
      <div class="shangbox">
        <p>请确认购买信息 订单于<span id="time"></span>分自动关闭。</p>
        <div class="mainImgBox">
          <img src alt>
          <span class="container">
            <span class="price">
              100
              <span>CNY</span>
            </span>
            <p>每83GH/s算力价格</p>
          </span>
        </div>
      </div>
      <div class="gap"></div>
      <form class="form_info">
        <div class="bar">
          <span>收取人</span>
          <span>13286685280</span>
        </div>
        <div class="bar">
          <span>推荐人</span>
          <span>123456</span>
        </div>
        <div class="bar">
          <span>购买数量</span>
          <span>10</span>
        </div>
        <div class="line"></div>
        <div class="bar count_bar">
          <span>抵押(BHD)</span>
          <span class="money">456.56</span>
        </div>
        <div class="orderDeal">
          <span @click="cancelOrder">取消订单</span>
          <span @click="togglePasswordFace">确认抵押</span>
        </div>
      </form>
      <!-- 弹出键盘盒子 -->
      <div class="shade_container" v-show="passwordSwitch">
        <main>
          <div class="first">
            <span class="back_icon" @click="togglePasswordFace"></span>
            <span class="title">请输入资金密码</span>
          </div>
          <table class="password">
              <tr v-for="item in dotArray">
                  <td><span></span></td>
              </tr>
          </table>
          <p>忘记密码？</p>
          <!-- <van-button @touchstart.native.stop="show = true">弹出默认键盘</van-button> -->
          <van-number-keyboard
            :show="show"
            extra-key="."
            close-button-text=""
            @blur="show = false"
            @input="onInput"
            @delete="onDelete"
            :hide-on-click-outside="false"
            />

        </main>
      </div>
    </div>
  </div>
</template>
<script>
import { NumberKeyboard } from 'vant';
export default {
  data() {
    return {
      passwordSwitch: false,
      show: true,//键盘用的。
      dotArray:[],//圆点数组
      clock:''
    };
  },
  methods: {
    backLastPage() {
      this.$router.go(-1);
      clearInterval(this.clock);
    },
    togglePasswordFace() {
      this.passwordSwitch = !this.passwordSwitch;
    },
    // toggle() {
    //   this.flag = !this.flag;
    // },
    //取消订单进入矿机抵押页面。
    cancelOrder(){
      this.$router.push({path:'/machinePledge'})
      clearInterval(this.clock);
    },
    onInput(value) {
      console.log(value);
      if (this.dotArray.length<6) {
            this.dotArray.push(value)
            // console.log("添加后长度："+this.dotArray.length);
      }
      //当输入6位密码后判断后进入成功界面。
      if (this.dotArray.length==6) {
        let temp=this.dotArray.toString().replace(/,/g,"");
        let passworrd=Number(temp)
        console.log(typeof passworrd);
        console.log(passworrd);
        clearInterval(this.clock);
        this.$router.push({path:'/paySuccess'});
      }

    },
    onDelete() {
       this.dotArray.pop();
    },
    timer(){
        var intDiff = parseInt(900);//倒计时总秒数量
        this.clock=window.setInterval(function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }else{//当时间耗尽，写处理代码！
        }
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        document.getElementById('time').innerText=minute+":"+second;
        intDiff--;
        //剩余时间为0时，取消订单！
        if (intDiff==0) {
        //    document.getElementById('time').innerText="超时";
        }
    }, 1000);
   }
  },
  created() {
      this.timer();
  },
  components: {NumberKeyboard}
};
</script>
<style lang="less" scoped>
* {
  padding: 0, 0;
  margin: 0, 0;
  box-sizing: border-box;
}
body {
  #pledgeBuy {
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
      border-bottom: 0.5px solid rgba(230, 230, 230, 1);
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
    .shangbox {
      box-sizing: border-box;
      width: 10rem;
      height: 5.4rem;
      background: rgba(255, 255, 255, 1);
      //   border:1px solid saddlebrown;
      z-index: 100;
      p {
        // width:6.07rem;
        margin-left: 0.43rem;
        margin-top: 0.6rem;
        height: 0.31rem;
        line-height: 0.31rem;
        font-size: 0.33rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        span{
          color:rgba(244,153,38,1);
        }
      }
      .mainImgBox {
        // border: blue solid 1px;
        height: 3.6rem;
        margin-top: 0.83rem;
        img {
          display: inline-block;
          width: 2.78rem;
          height: 2.78rem;
          border: saddlebrown solid 1px;
          margin-left: 0.44rem;
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
      }
    }
    .gap {
      width: 10rem;
      height: 0.33rem;
      background: rgba(245, 245, 245, 1);
    }
    .form_info {
      font-size: 0.39rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-left: 0.48rem;
      margin-right: 0.46rem;
      margin-top: 0.85rem;
      // border: #FB4F04 solid 1px;
      .bar {
        height: 0.37rem;
        font-size: 0.39rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-bottom: 0.6rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        // border: #FB4F04 solid 1px;
        span:fisrt-child {
          display: inline-block;
          width: 1.55rem;
        }
        span:last-child {
          display: inline-block;
          // margin-right: 0.46rem;
          height: 0.31rem;
          font-size: 0.39rem;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 0.31rem;
        }
        .money {
          height: 0.49rem !important;
          line-height: 0.49rem !important;
          font-size: 0.66rem !important;
          font-family: Roboto-Regular;
          font-weight: 400;
          color: rgba(244, 153, 38, 1) !important;
        }
      }
      .line {
        width: 9.11rem;
        height: 0.02rem;
        background: rgba(230, 230, 230, 1);
        margin-bottom: 0.01rem;
      }
      .count_bar {
        height: 0.6rem;
        line-height: 0.6rem;
        margin-top: 0.3rem;
        margin-bottom: 0;
      }
      .orderDeal {
        width: 100%;
        direction: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 3.3rem;
        // height: 1.11rem;
        // border: #FB4F04 solid 1px;
        span {
          display: inline-block;
          width: 4.26rem;
          height: 1.11rem;
          line-height: 1.11rem;
          background: rgba(199, 199, 199, 1);
          border-radius: 0.08rem;
          // border: #FB4F04 solid 1px;
          text-align: center;
          font-size: 0.39rem;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(245, 245, 245, 1);
          // margin-right: 0.25rem;
        }
        span:last-child {
          background: linear-gradient(
            -90deg,
            rgba(251, 75, 4, 1),
            rgba(255, 115, 3, 1)
          );
          margin-left: 0.25rem;
        }
      }
    }
    .shade_container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      margin: 0 auto;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      flex-direction: column;
      align-items: center;
      main {
        margin-top: 6.65rem;
        width:9.99rem;
        height:15rem;
        background:rgba(255,255,255,1);
        border:0px solid rgba(221,221,221,1);
        display: flex;
        flex-direction: column;
        align-items: center;
        .first {
          width: 100%;
          height: 1.3rem;
          background: rgba(255, 255, 255, 1);
          border-bottom: 1px solid rgba(221, 221, 221, 1);
          display: flex;
         flex-direction: row;
         align-items: center;
          .back_icon {
            display: inline-block;
            width: 0.28rem;
            height: 0.48rem;
            background: url("../../../assets/phone/back_grat.png") no-repeat;
            background-size: 0.28rem 0.48rem;
            margin-left: 0.43rem;
            // border: saddlebrown solid 1px;
          }
          .title {
            width: 2.8rem;
            height: 0.37rem;
            line-height: 0.37rem;
            font-size: 0.39rem;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(68, 68, 68, 1);
            margin-left: 2.98rem;
          }
        }
        .password {
          box-sizing: border-box;
          width: 7.85rem;
          height: 1.3rem;
          border:0.5px solid rgba(221,221,221,1);
          margin-top: 0.8rem;
         display: flex;
         flex-direction: row;
         align-items: center;
         tr{
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-items: center;
            border:0.5px solid rgba(221,221,221,1);
            border-left: 0;
            border-right: 0;
            td{
            box-sizing: border-box;
            width: 1.3rem;
            height:1.25rem;
            background:rgba(255,255,255,1);
            // border-right:0.5px solid rgba(221,221,221,1);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            span{
                display: inline-block;
                width:0.3rem;
                height:0.3rem;
                line-height: 0.3rem;
                background:rgba(68,68,68,1);
                border-radius:50%;
            }
           }
         }
        }
        p{
            width:2rem;
            height:0.36rem;
            line-height: 0.36rem;
            font-size:0.39rem;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(117,126,184,1);
            margin-top: 0.4rem;
            margin-left: 7rem;
        }
      }
    }
  }
}
</style>


