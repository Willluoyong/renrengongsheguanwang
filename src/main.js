// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './common/vuex/store'
import rem from '../static/js/rem.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './common/jigsaw/phone/jigsawM.css';
// import './common/jigsaw/phone/jsdaima.comM.css'
import './common/jigsaw/pc/jigsawPC.css';
// import './common/jigsaw/pc/jsdaima.comPC.css'
import flvjs from 'flvjs';
import md5 from 'js-md5';
import jigsawPC from './common/jigsaw/pc/jigsawPC'
import jigsawM from './common/jigsaw/phone/jigsawM'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vant from 'vant';
import 'vant/lib/index.css';



Vue.prototype.$md5 = md5;
Vue.use(ElementUI);
Vue.use(MintUI);
Vue.use(Vant);
Vue.use(flvjs);
Vue.config.productionTip = false
Vue.prototype.jigsawPC=window.jigsawPC
Vue.prototype.jigsawM = window.jigsawM
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
