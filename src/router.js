// 引入包
import VueRouter from 'vue-router'

import HomeContainer from './componments/tabbar/HomeContainer.vue'
import MemberContainer from './componments/tabbar/MemberContainer.vue'
import ShopCarContainer from './componments/tabbar/ShopCarContainer.vue'
import SearchContainer from './componments/tabbar/SearchContainer.vue'

import NewsList from './componments/news/NewsList.vue'
import NewsDetail from './componments/news/NewsDetail.vue'

import PhotoList from './componments/photos/PhotoList.vue'
import PhotoInfo from './componments/photos/PhotoInfo.vue'

import BuyGoods from './componments/goods/BuyGoods.vue'
import GoodsDetail from './componments/goods/GoodsDetail.vue'

import comment from './componments/subComponments/Comment.vue'

import vedio from './componments/Vedio/vedio.vue'

import sellGoods from './componments/sell/goods/goods.vue'
import ratings from './componments/sell/ratings/ratings.vue'
import seller from './componments/sell/seller/seller.vue'

VueRouter.prototype.goBack = function () {
    this.isBack = true
    window.history.go(-1)
  }

// 创建路由对象
var router = new VueRouter({
    routes:[
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer ,children:[
            // 使用children 属性,实现子路由,同时,子路由的path前面 不要带/.否则永远以根路径开始请求,这样不方便我们用户去理解url地址
                {path: '/member', redirect: 'sellgoods' },   
                {path: 'sellgoods',name: 'sellGoods',component: sellGoods},
                {path: 'ratings',name: 'ratings',component: ratings},
                {path: 'seller',name: 'seller',component: seller},
              ]
            },
        { path: '/shopcar', component: ShopCarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newslist', component: NewsList },
        {path: '/home/detail/',name: 'NewsDetail',component: NewsDetail}, 
        {path: '/home/photolist/',name: 'PhotoList',component: PhotoList}, 
        {path: '/home/photoinfo/',name: 'PhotoInfo',component: PhotoInfo}, 
        {path: '/home/buygoods/',name: 'BuyGoods',component: BuyGoods}, 
        {path: '/home/goodsdetail/',name: 'GoodsDetail',component: GoodsDetail},
        {path: '/home/comment/',name: 'comment',component: comment},
        {path: '/home/vedio/',name: 'vedio',component: vedio},
       
    ],
   scrollBehavior(to, from, savedPosition) {//解决拖动时多个页面互相影响的问题，当切换到新路由时，想要页面滚到顶部
    // scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用
        if(savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
    linkActiveClass:'bar-active' // 覆盖路由高亮的类  router-link-active
})
export default router
