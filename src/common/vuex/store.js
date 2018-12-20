import Vue from 'vue';
import Vuex from 'vuex';
import register from './register.js'
import GetBackPassword from './GetBackPassword.js'
import UserInfo from './UserInfo.js'
Vue.use(Vuex);

const state = {
   token:"",
   userName:""
};

export default new Vuex.Store({
  state:state,
  mutations:{

  },
  actions:{

  },

  modules:{
    register:register,
    GetBackPassword:GetBackPassword,
    userInfo:UserInfo,
  }
});