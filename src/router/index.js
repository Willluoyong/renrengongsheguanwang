import Vue from 'vue'
import Router from 'vue-router'
import indexM from '@/components/phone/index.vue'
import loginM from '@/components/phone/login.vue'
import regM from '@/components/phone/reg.vue'
import retrieveM from '@/components/phone/retrieve_password.vue'
import password_codeM from '@/components/phone/password_code.vue'
import succeedM from '@/components/phone/succeed.vue'
import reset_pwdM from '@/components/phone/reset_pwd.vue'
import indexPC from '@/components/pc/index.vue'
import machineMall from '@/components/pc/machineMall/machineMall.vue'
import machineDetail from '@/components/pc/machineMall/machineDetail.vue'
import orderConfirm from '@/components/pc/machineMall/orderConfirm.vue'
import myTeam from '@/components/pc/machineMall/myTeam.vue'
import recommendReg from '@/components/phone/recommendReg.vue'
import recommendSuccess from '@/components/phone/recommendSuccess.vue'
import machineHome from '@/components/phone/machineMallM/machineHome.vue'
import machineDetailM from '@/components/phone/machineMallM/machineDetailM.vue'
import offLinePay from '@/components/phone/machineMallM/offLinePay.vue'
import zhifubaoPay from '@/components/phone/machineMallM/zhifubaoPay.vue'
import paySuccess from '@/components/phone/machineMallM/paySuccess.vue'
import saleRate from '@/components/phone/machineMallM/saleRate.vue'
import machinePledge from '@/components/phone/machineMallM/machinePledge.vue'
import PledgeBuy from '@/components/phone/machineMallM/PledgeBuy.vue'
Vue.use(Router)

let useRoutes = [{
  path: '/',
  name: 'machineHome',
  component: machineHome
}];

let width = document.documentElement.clientWidth;
let useMobilePage = /Android|iPhone|BlackBerry/i.test(window.navigator.userAgent);
if(useMobilePage)
{
  useRoutes = [
    {
      path: '/regM',
      name: 'regM',
      component: regM
    },
    {
      path: '/indexM',
      name: 'indexM',
      component: indexM
    },
    {
      path: '/loginM',
      name: 'loginM',
      component: loginM
    },
    {
      path: '/retrieveM',
      name:'retrieveM',
      component : retrieveM
    },
    {
      path: '/password_codeM',
      name: 'password_codeM',
      component: password_codeM
    },
    {
      path: '/succeedM',
      name: 'succeedM',
      component: succeedM
    },
    {
      path: '/reset_pwdM',
      name: 'reset_pwdM',
      component: reset_pwdM
    },
    {
      path: '/recommendReg',
      name: 'recommendReg',
      component: recommendReg
    },
    {
      path:'/recommendSuccess',
      name:'recommendSuccess',
      component:recommendSuccess
    },
    {
      path:'/',
      name:'machineHome',
      component:machineHome
    },
    {
      path:'/machineDetailM',
      name:'machineDetailM',
      component:machineDetailM
    },
    {
      path:'/offLinePay',
      name:'offLinePay',
      component:offLinePay
    },
    {
      path:'/zhifubaoPay',
      name:'zhifubaoPay',
      component:zhifubaoPay
    },
    {
      path:'/paySuccess',
      name:'paySuccess',
      component:paySuccess
    },
    {
      path:'/saleRate',
      name:'saleRate',
      component:saleRate
    },
    {
      path:'/machinePledge',
      name:'machinePledge',
      component:machinePledge
    },
    {
      path:'/PledgeBuy',
      name:'PledgeBuy',
      component:PledgeBuy
    },
    
  ];
}else{
  useRoutes = [
    {
      path: '/',
      name: 'indexPC',
      component: indexPC
    },
    {
      path:'/machineMall',
      name:'machineMall',
      component:machineMall
    },
    {
      path:'/machineDetail',
      name:'machineDetail',
      component:machineDetail
    },
    {
      path:'/orderConfirm',
      name:'orderConfirm',
      component:orderConfirm
    },
    {
      path:'/myTeam',
      name:'myTeam',
      component:myTeam
    }

  ];
}
export default new Router({
  routes:useRoutes
})