<template>
    <div id="machine_home">
        <div class="top"></div>
        <div class="header"><span class="back"></span ><span class="title">我的算力</span></div>
        <div class="poster"><input type="text" class="serach" placeholder="搜索" @keyup.enter="getMarketTag" v-model="filters.name"></div>
        <div class="goods" v-for="(item,index) in machineList" :key="index">
            <div class="goods_name">
                <span class="montant"></span>
                <span class="title">{{item.coinTypeId}}-{{item.title}}</span>
                <saleRate :percent='item.percent'></saleRate>
            </div>
            <div class="goods_arg" @click="goMachineDetail(item.machineId,item.title)">
                <div class="left">
                    <div class="sale_price">{{item.price}}<span class="unit"></span></div>
                    <p>每83GH/s算力价格</p>
                </div>
                <div class="right">
                    <div class="sale_price">{{item.currencyPrice}}<span class="unit">BTM/份</span></div>
                    <p>当前预估日收益</p>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import saleRate from '@/components/phone/machineMallM/saleRate.vue'
import {getMachineList} from '@/service/machineApi.js'
export default {
    data(){
        return{
            machineList:[{
            title:'BTC神级一号',
            percent:'0.2',
            wait:'0.2',
            price:'10',
            currencyPrice:'10',
            machineId:"",
            machinePhontoUrl:''
            }],
            filters: {
            name: ''
            },
            page:1,
        }

    },
    methods:{
        //获取矿机列表方法
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
        goMachineDetail(machineId,title){
            // console.log(title);
            // if (/抵押/.test(title)) {
            //      this.$router.push({path:'/machinePledge',query:{"machineId":machineId}})
            // } else {
            //     this.$router.push({path:'/machineDetailM',query:{"machineId":machineId}})
            // }
            // this.$router.push({path:'/machinePledge',query:{"machineId":machineId}})
            this.$router.push({path:'/machineDetailM',query:{"machineId":machineId}})
           
        }
    },
    computed: {

    },
    created(){
        this.getMarketTag();
    },

    components:{
        saleRate,
    }
}
</script>
<style lang="less" scoped>
*{
    padding:0,0;
    margin: 0,0;
}
body{
    #machine_home{
    width:10rem;
    background:#F5F5F5;
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
            width:1.6rem;
            height:0.39rem;
            line-height: 0.39rem;
            font-size:0.39rem;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            position: absolute;
            margin-left: 8rem;
            
        }
    }
    .poster{
        width: 10rem;
        height: 4.31rem;
        background:url("../../../assets/phone/banner_power_4.png") no-repeat center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        .serach{
            box-sizing: border-box;
            width:9.1rem;
            height:1.06rem;
            border:0px solid rgba(245,245,245,1);
            border-radius:1rem;
            margin-top: 3rem;
            padding-left: 1.14rem;
            font-size:0.33rem;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            background-color: rgba(255,255,255,1) !important;
            background:url("../../../assets/phone/icon_search.png") no-repeat 0.5rem;
            background-size: 0.44rem 0.43rem;
            outline: none;
        }
    }
    .goods{
        box-sizing: border-box;
        width:10rem;
        height:3.72rem;
        background:rgba(255,255,255,1);
        border:0.5px solid rgba(230,230,230,1);
        // border:  saddlebrown solid 1px;
        margin-bottom: 0.33rem;
        .goods_name{
            box-sizing: border-box;
            height: 1.39rem;
            border-bottom: 0.5px solid rgba(218,218,218,1);
            display: flex;
            flex-direction: row;
            align-content: space-between;
            align-items: center;
            .montant{
                display: inline-block;
                margin-left: 0.44rem;
                width:0.11rem;
                height:0.67rem;
                background:rgba(244,153,38,1);
                border-radius:0rem;
            }
            .title{
                width:14rem;
                height:0.42rem;
                line-height: 0.42rem;
                margin-left: 0.36rem;
                font-size:0.44rem;
                font-family:SourceHanSansCN-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);
            }
        }
        .goods_arg{
            box-sizing: border-box;
            height: 2.2rem;
            display: flex;
            flex-direction: row;
            .left{
                width: 40%;
                margin-left: 0.46rem;
                // border: orange 1px solid;
                display: flex;
                flex-direction: column;
                .sale_price{
                    height: 0.34rem;
                    line-height: 0.34rem;
                    font-size:0.44rem;
                    font-family:SourceHanSansCN-Regular;
                    font-weight:400;
                    margin-top: 0.67rem;
                    margin-bottom: 0.28rem;
                    color:rgba(244,153,38,1);
                    // border: blue 1px solid;
                    .unit{
                        width:0.52rem;
                        height:0.22rem;
                        font-size:0.28rem;
                        font-family:SourceHanSansCN-Regular;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                    }
                }
                p{
                    // border: rebeccapurple 1px solid;
                    display: block;
                    height:0.3rem;
                    line-height: 0.3rem;
                    font-size:0.28rem;
                    font-family:SourceHanSansCN-Regular;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                
            }
            .right{
                width: 40%;
                position: absolute;
                left: 5rem;
                margin-left: 0.46rem;
                // border: orange 1px solid;
                display: flex;
                flex-direction: column;
                .sale_price{
                    height: 0.34rem;
                    line-height: 0.34rem;
                    font-size:0.44rem;
                    font-family:SourceHanSansCN-Regular;
                    font-weight:400;
                    margin-top: 0.67rem;
                    margin-bottom: 0.28rem;
                    color:rgba(51,51,51,1);
                    // border: blue 1px solid;
                    .unit{
                        width:0.52rem;
                        height:0.22rem;
                        font-size:0.28rem;
                        font-family:SourceHanSansCN-Regular;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                    }
                }
                p{
                    // border: rebeccapurple 1px solid;
                    display: block;
                    width:2.7rem;
                    height:0.3rem;
                    line-height: 0.3rem;
                    font-size:0.28rem;
                    font-family:SourceHanSansCN-Regular;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                
            }
            
        }
    }



}

}


</style>


