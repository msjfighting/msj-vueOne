// 这个main.js 是我们项目的js入口
import $ from 'jquery'
import '../node_modules/amfe-flexible/index.js'
import './css/style.css'
import Vue from 'vue'
import Vuex from 'vuex'
import app from './App.vue'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]');
var store = new Vuex.Store({
  state: {
    // 大家可以把这个state想象成组件中的data,专门用来存储数据
    // 如果在组件想要访问store中数据,可以通过&store.state.car
    car: car,
  },
  mutations: {
    // 如果要操作store中的state值,只能通过mutations 提供的方法,才能操作对应的数据,不推荐直接操作state中的数据
    // this.$store.commit("方法名")  
    // 参数列表,只支持两个参数,其中参数1 : state状态 参数2 : 通过commit提交过来的参数
    addToCart(state, goodsinfo) {
      // 如果购物车中已有对应的商品,则更新数量
      var flag = false;
      state.car.forEach(element => {
        if (goodsinfo.id == element.id) {
          element.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      })
      // 如果没有,则直接push()
      if (!flag) {
        state.car.push(goodsinfo);
      }
      // 存储数据到localstoreage
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo){
       state.car.forEach(item => {
         if(item.id == goodsinfo.id){
            item.count = goodsinfo.count;
            return true;
         }
       })
       localStorage.setItem('car', JSON.stringify(state.car))
    },
    delGoods(state, id) {
      var index = state.car.findIndex(item => {
        if (item.id == id) {
              return true;
        }
      })
      state.car.splice(index, 1)      
      // 存储数据到localstoreage
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    changeFlag(state, id){
        state.car.forEach(item => {
           if(id == item.id){
             item.selected = !item.selected;
             return true;
           }
        })
        // 存储数据到localstoreage
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    // 只负责对外提供数据,不负责修改数据,想要修改数据就去 mutations   this.$store.getters.getAllCount
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      })
      return c;
    },
    getGoodsCount(state){
      var c = {};
      state.car.forEach(item => {
        c[item.id] = item.count;
      })
      return c;
    },
    getGoodsMoney(state){
      var obj = {
        money:0,
        total:0
      }
      state.car.forEach(item => {
        if (item.selected) {
           obj.total += item.count;
           var m = 0, s1 = item.count.toString(), s2 = item.price.toString();
           try {
               m += s1.split(".")[1].length;
           }catch (e) {}
           try {
               m += s2.split(".")[1].length;
           }catch (e) {}
           obj.money += Math.round(Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m) *100 ) /100;

        }
      })
      return obj;
    },
    getGoodsStatue(state){
      var c = {};
      state.car.forEach(item => {
        c[item.id] = item.selected;
      })
      return c;
    }
  }
})
Vue.config.devtools = true; // 插件的使用配置
// 引入mint-ui组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
//  引入轮播图组件
import { Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入自己的router路由模板
import router from './router.js'
// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 网络请求
import axios from 'axios';
Vue.prototype.$axios = axios;
// 时间插件
import moment from 'moment'
Vue.http.options.emulateJSON = true; // 设置全局表单数据格式
Vue.http.options.emulateHTTP = true;

import common from '../src/comm/Common.vue'
Vue.prototype.common = common

Vue.config.devtools = true

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 播放器
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer)

// 创建全局过滤器
Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD hh:mm:ss") {
  // return moment(dateStr).format(pattern)
  if (dateStr) {
    var newData = Date.parse(new Date());
    var dates = Date.parse(new Date(dateStr));
    var diffTime = Math.abs(newData - dates);
    if (diffTime > 360 * 24 * 3600 * 1000) {
      var date = new Date(dateStr);
      var y = date.getFullYear();
      var m = (date.getMonth() + 1).toString().padStart(2, '0');
      var d = date.getDate().toString().padStart(2, '0');

      var h = date.getHours().toString().padStart(2, '0');
      var minute = date.getMinutes().toString().padStart(2, '0');
      var second = date.getSeconds().toString().padStart(2, '0');

      return `${y}-${m}-${d} ${h}:${minute}:${second}`
    } else if ((diffTime >= 30 * 24 * 3600 * 1000)) {
      var mouthNum = Math.floor(diffTime / (30 * 24 * 60 * 60 * 1000));
      return `${mouthNum}月前`;
    } else if ((diffTime < 30 * 24 * 3600 * 1000 && diffTime > 7 * 24 * 3600 * 1000) || (diffTime < 31 * 24 * 3600 * 1000 && diffTime > 7 * 24 * 3600 * 1000)) {
      var mouthNum = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
      return `${mouthNum}周前`;
    }
    else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
      // //注释("一周之内");
      var dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
      return `${dayNum}天前`;

    } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
      // //注释("一天之内");
      var dayNum = Math.floor(diffTime / (60 * 60 * 1000));
      return `${dayNum}小时前`;

    } else if (diffTime < 3600 * 1000 && diffTime > 0) {
      // //注释("一小时之内");
      var dayNum = Math.floor(diffTime / (60 * 1000));
      return `${dayNum}分钟前`;

    }
  }
})
Vue.filter('keepTwoNum',function (value) {
  value = Number(value);
  return value.toFixed(2);
})
Vue.filter('numFormat',function (value) {
  if (value == null || value == '') {
      value = 0;
  }
  value = parseInt(value);

  if (value < 10000 || value == 10000) {
    return value
  }else if (value > 10000 || value <= 10000000) {
     return  parseInt(value/10000) +'万';
  }else if (value > 10000000) {
    return  parseInt(value/10000000) +'亿';
 }
 
})
var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})
