<template>
    <div id="offLinePay" >
        <div class="top"></div>
        <div class="header"><span class="back" @click="backLastPage"></span ><span class="title">BTC-神级1号</span></div>
        <div class="main">
            <div class="first">
                <span class="success_icon"></span>
                <span class="success_info">
                    <span>购买成功</span>
                    <span>等待审核中</span>
                </span>
            </div>
            <div class="second">付款成功后，需一个工作日审核订单，可前往我的订单查看详情</div>
            <div class="three">查看订单</div>

        </div>
        <div class="footer"></div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            shadeFlag:false,
        }

    },
    methods:{
        toggleComfirmAffirm(){
            this.shadeFlag=!this.shadeFlag;
        },
        backLastPage() {
            this.$router.push({path:'/'});
        },
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
    .main{
        width: 100%;
        height: 11.93rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .first{
            width: 4.3rem;
            // border: saddlebrown solid 1px;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 2.06rem;
            .success_icon{
                display: inline-block;
                width: 1.11rem;
                height: 1.11rem;
                background:url("../../../assets/phone/icon_miner_success.png") no-repeat center;
                background-size: cover;
            }
            .success_info{
                width: 2.8rem;
                height: 1.11rem;
                font-size:0.28rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                // border:rebeccapurple solid 0.5px;
                margin-left: 0.4rem;
                span:first-child{
                    width:2.5rem;
                    height:0.52rem;
                    line-height: 0.52rem;
                    font-size:0.56rem;
                    font-family:SourceHanSansCN-Regular;
                    font-weight:400;
                    color:rgba(253,95,4,1);
                }
                span:last-child{
                    width:2rem;
                    height:0.27rem;
                    line-height: 0.27rem;
                    font-size:0.28rem;
                    font-family:SourceHanSansCN-Regular;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                    margin-top: 0.2rem;
            }

            }


        }
        .second{
            width:8.5rem;
            height:0.6rem;
            font-size:0.28rem;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            margin-top: 0.91rem;
        }
        .three{
            width:6.67rem;
            height:1.11rem;
            line-height: 1.11rem;
            background:linear-gradient(-90deg,rgba(251,75,4,1),rgba(255,115,3,1));
            border-radius:1rem;
            margin-top: 1.67rem;
            font-size:0.39rem;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(245,245,245,1);
            text-align: center;
        }

    }
    .footer{
        width: 100%;
        height: 4.03rem;
        background:url("../../../assets/phone/pic_miner.png") no-repeat center;
        background-size: cover;
    }
}

}


</style>


