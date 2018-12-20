<template>
    <div id="offLinePay" >
        <div class="top"></div>
        <div class="header"><span class="back"  @click="toggleChooseFace"></span ><span class="title">BTC-神级1号</span></div>
        <div class="timer">请扫描二维码付款订单于<span id="time"></span>分后关闭。</div>
        <div class="card_info">
            <div class="id">支付宝帐号：412641803@qq.com</div>
            <div class="erweima"></div>
            <div class="container"><span class="randomCode" id="randomCode">交易号:{{referenceNum}}</span><span class="copy" @click="copyNumber">复制</span></div>
            <p class="mark">汇款时请务必在备注里仅<span>填写以上六位数交易号</span>即可，否则无法识别购买，导致购买失败。</p>
        </div>
        <form class="form_info">
            <div class="bar"><span>收取人</span><span>{{phone}}</span></div>
            <div class="bar"><span>邀请码</span><span>{{recommendCode}}</span></div>
            <div class="bar"><span>购买数量</span><span>{{amount}}</span></div>
            <div class="line"></div>
            <div class="bar count_bar"><span>金额</span><span class="money">{{allPrice}}</span></div>
            <div class="orderDeal">
                <span @click="toggleCancleFace">取消订单</span>
                <span @click="toggleConfirmFace">我已付款</span>
            </div>
        </form>
        <!-- 返回 -->
        <div class="confirm_container" v-show="backFlag">
            <div class="box">
                <div class="title">支付确认</div>
                <p class="message">您还未付款，如已付款请点击我已付款按钮。如需返回请取消订单。</p>
                <div class="confirm_bar">
                    <span class="icon"></span><span class="confirm_button">我已付款</span>
                </div>
            </div>
            <div class="close_icon" @click="toggleChooseFace"></div>
        </div>
        <!-- 取消 -->
        <div class="confirm_container" v-show="cancelFlag">
            <div class="box">
                <div class="title">订单取消</div>
                <p class="message">您将取消该笔订单，如需继续购买请重新下单。</p>
                <div class="confirm_bar">
                    <span class="icon"></span><span class="confirm_button"  @click="backLastPage">取消订单</span>
                </div>
            </div>
            <div class="close_icon" @click="toggleCancleFace"></div>
        </div>
        <!-- 确认 -->
        <div class="confirm_container" v-show="confirmFlag">
            <div class="box">
                <div class="title">支付确认</div>
                <p class="message">您确定已经付款了吗？恶意操作将会被视为无效订单。</p>
                <div class="confirm_bar">
                    <span class="icon"></span><span class="confirm_button" @click="goPaySuccess">我已付款</span>
                </div>
            </div>
            <div class="close_icon" @click="toggleConfirmFace"></div>
        </div>
        
    </div>
</template>
<script>
import {offlinePaymentOrder} from '@/service/machineApi.js'
export default {
    data(){
        return{
            backFlag:false,
            cancelFlag:false,
            confirmFlag:false,
            clock:'',
            referenceNum:'',
            phone:'',
            recommendCode:'',
            amount:'',
            allPrice:'',
            orderNo:'',
        }

    },
    methods:{
         toggleChooseFace(){
            this.backFlag=!this.backFlag;
        },
         toggleCancleFace(){
            this.cancelFlag=!this.cancelFlag;
        },
        toggleConfirmFace(){
            this.confirmFlag=!this.confirmFlag;
            
        },
        //取消订单弹出框确认返回上一页。
        backLastPage(){
            this.$router.go(-1);
            clearInterval(this.clock);
        },
        goPaySuccess(){
            let order = new FormData();
            order.append('orderNo',this.orderNo)
            offlinePaymentOrder(order).then(res=>{
                if (res.data.status == 200) {
                    this.$router.push({path:'/paySuccess'})
                    clearInterval(this.clock);
                }else{
                    console.log(res.data.message);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        copyNumber(){
            let copyHttp = document.querySelector('#randomCode');
            let range = document.createRange();     //创建一个范围的对象
            range.selectNode(copyHttp);             //选择范围内容
            window.getSelection().removeAllRanges();  //移除剪切板中其他的东西
            window.getSelection().addRange(range); //把范围添加进剪切板
            document.execCommand('copy'); //执行复制的命令

        },
        timer(){
            var intDiff = parseInt(900);//倒计时总秒数量
            this.clock=setInterval(function(){
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
                // cancel();
            //    document.getElementById('time').innerText="超时";
            }
        }, 1000);
        }
    },
     created() {
        this.timer();
        this.referenceNum = this.$route.query.referenceNum
        this.phone = this.$route.query.phone
        this.recommendCode = this.$route.query.recommendCode
        this.amount = this.$route.query.amount
        this.allPrice = this.$route.query.allPrice
        this.orderNo = this.$route.query.orderNo
    },
    components:{
    }
}
</script>
<style lang="less" scoped>
*{
    padding:0,0;
    margin: 0,0;
    box-sizing: border-box;
}
body{
    #offLinePay{
    width:10rem;
    background:#FFF;
    .top{
        width:10rem;
        height:0.56rem;
        background:rgba(0,0,0,1);
    }
    .header{
        width:10rem;
        height:1.27rem;
        // background-color: red;
        display: flex;
        flex-direction: row;
        // justify-content: center;
        align-items: center;
        border-bottom:0.5px solid rgba(230,230,230,1);
        .back{
            display: inline-block;
            width:0.21rem;
            height:0.37rem;
            background:url("../../../assets/phone/back_black.png") no-repeat center;
            background-size: cover;
            margin-left: 0.37rem;
            // border: solid 1px red
        }
        .title{
            display: inline-block;
            // width:1.6rem;
            height:0.39rem;
            line-height: 0.39rem;
            font-size:0.39rem;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            position: absolute;
            margin-left:3.69rem;
            
        }
    }
    .timer{
        width:8rem;
        height:0.33rem;
        line-height: 0.33rem;
        font-size:0.33rem;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        margin-left: 0.43rem;
        margin-top: 0.6rem;
        span{
            color:rgba(244,153,38,1);
        }
    }
    .card_info{
        width: 100%;
        height: 8.08rem;
        // border: #FB4F04 solid 1px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .id{
            margin-top: 0.56rem;
            height:0.3rem;
            font-size:0.28rem;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:0.3rem;
        }
        .erweima{
            width: 3.89rem;
            height: 3.89rem;
            // border: #FB4F04 solid 1px;
            background:url("../../../assets/phone/erweima.png") no-repeat center;
            background-size: cover;
            margin-top: 0.16rem;
        }
        .container{
            height: 0.85rem;
            // border: seagreen solid 1px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            // align-items: center;
            margin-top: 0.49rem;
            .randomCode{
                display: inline-block;
                width:2.78rem;
                height:0.83rem;
                background:rgba(244,153,38,1);
                border-radius:0rem;
                font-size:0.33rem;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:0.83rem;
                // border: seagreen solid 1px;
                text-align: center;
            }
            .copy{
                display: inline-block;
                width:1.11rem;
                height:0.83rem;
                line-height: 0.83rem;
                text-align: center;
                background:rgba(244,153,38,1);
                border-radius:0rem;
                font-size:0.33rem;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(255,255,255,1);
                margin-left: 0.14rem;
                // border: seagreen solid 1px;
            }

        }
        .mark{
            width:8rem;
            height:0.62rem;
            line-height: 0.62rem;
            font-size:0.2rem;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(244,153,38,1);
            margin-top: 0.38rem;
            text-align: center;
            // border: #FB4F04 solid 1px;
            span{
                color: #FB4F04;
            }
        }

    }
    .form_info{
        font-size:0.39rem;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        margin-left: 0.48rem;
        margin-right: 0.46rem;
        margin-top: 0.1rem;
        // border: #FB4F04 solid 1px;
        .bar{
            height:0.37rem;
            font-size:0.39rem;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            margin-bottom: 0.6rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            // border: #FB4F04 solid 1px;
            span:fisrt-child{
                display: inline-block;
                width:1.55rem;
            }
            span:last-child{
                display: inline-block;
                // margin-right: 0.46rem;
                height:0.31rem;
                font-size:0.39rem;
                font-family:SourceHanSansCN-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:0.31rem;
            }
            .money{
                height:0.49rem !important;
                line-height:0.49rem !important;
                font-size:0.66rem !important;
                font-family:Roboto-Regular;
                font-weight:400;
                color:rgba(244,153,38,1) !important;
            }
    
        }
        .line{
            width:9.11rem;
            height:0.02rem;
            background:rgba(230,230,230,1);
            margin-bottom: 0.01rem;
        }
        .count_bar{
            height:0.6rem;
            line-height:0.6rem;
            margin-top: 0.3rem;
        }
        .orderDeal{
            width: 100%;
            direction: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-top: 1.52rem;
            // height: 1.11rem;
            // border: #FB4F04 solid 1px;
            span{
                display: inline-block;
                width:4.26rem;
                height:1.11rem;
                line-height: 1.11rem;
                background:rgba(199,199,199,1);
                border-radius:0.08rem;
                // border: #FB4F04 solid 1px;
                text-align: center;
                font-size:0.39rem;
                font-family:SourceHanSansCN-Regular;
                font-weight:400;
                color:rgba(245,245,245,1);
                // margin-right: 0.25rem;
            }
            span:last-child{
                background:linear-gradient(-90deg,rgba(251,75,4,1),rgba(255,115,3,1));
                margin-left: 0.25rem;
            }
        }
    }
    .confirm_container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        margin: 0 auto;
        background: rgba(0,0,0,0.6);
        display: flex;
        flex-direction: column;
        align-items: center;
        .box{
            width: 6.39rem;
            height: 5.72rem;
            background:url("../../../assets/phone/bg_miner_pop.png") no-repeat center;
            background-size: cover;
            margin-top: 6.03rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            .title{
                height:0.45rem;
                font-size:0.48rem;
                font-family:SourceHanSansCN-Bold;
                font-weight:bold;
                color:rgba(51,51,51,1);
                margin-top: 0.67rem;
            }
            .message{
                width:4.86rem;
                height:0.94rem;
                font-size:0.44rem;
                font-family:SourceHanSansCN-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);
                margin-top: 0.81rem;
            }
            .confirm_bar{
                width: 100%;
                height: 1rem;
                // border: saddlebrown solid 1px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                margin-top: 1.73rem;
                .icon{
                    display: inline-block;
                    width: 0.48rem;
                    height: 0.48rem;
                    background:url("../../../assets/phone/icon_miner_logo.png") no-repeat center;
                    background-size: cover;

                }
                .confirm_button{
                    // width:1.75rem;
                    height:0.41rem;
                    line-height: 0.41rem;
                    font-size:0.44rem;
                    font-family:SourceHanSansCN-Regular;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    margin-left: 0.19rem;
                }

            }
        }
        .close_icon{
            display: inline-block;
            width: 0.83rem;
            height: 0.83rem;
            background:url("../../../assets/phone/icon_pop_close.png") no-repeat center;
            background-size: cover;
            margin-top: 0.55rem;

        }
    }

}

}


</style>


