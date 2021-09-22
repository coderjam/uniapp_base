import App from './App'
import Vue from 'vue'
import uView from "uview-ui"
import store from '@/store';
Vue.use(uView);

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
