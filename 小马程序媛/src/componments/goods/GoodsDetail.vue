<template>
    <div class="goods-list">
        <!-- 加入购物车动画球 -->
        <!-- 半场动画需要钩子函数 -->
       <transition @before-enter="beforeEnter"
                 @enter="enter"
                 @after-enter="afterEnter">
         <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
       
        <!-- 商品轮播图区 -->
        <div class="goods-images card">
         <swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
        </div>
        <!-- 商品详情区 -->
        <div class="goods-ware card">
            <p class="goods-text">{{ goods.goods_title }}</p>
            <hr style="margin:0px">
            <p class="goods-price">
                市场价:<del>{{goods.goods_price}}</del>&nbsp;&nbsp;优惠价:<span class="now-price">¥&nbsp;&nbsp;{{accSub(goods.goods_price,goods.coupon_price)}}</span>
            </p>
            <p>购买数量:&nbsp;&nbsp;<numberbox @getGoodsNum="getNumBox" :max="goods.coupon_number"></numberbox></p> 
            <p>
                 <mt-button type="primary" size="small"  @click.native="buyNow" >立即购买</mt-button>
                 <mt-button type="danger" size="small"  @click.native="addToCart" :disabled="isDisable">加入购物车</mt-button>
            </p>
        </div>
        <!-- 商品优惠详情区 -->
        <div class="goods-detail card">
             <p class="goods-text">商品参数</p>
             <hr style="margin:0px">
             <p>商品号:{{ goods.goods_id }}</p>
             <p>优惠券剩余:{{ goods.coupon_number | numFormat }}张</p>
             <p>优惠券开始时间:{{ goods.coupon_start_time}}</p>
             <p>优惠券结束时间:{{ goods.coupon_end_time}}</p>
             <mt-button type="primary" size="large" plain @click.native="godesc">图文介绍</mt-button>
             <mt-button type="danger" size="large" plain @click.native="gocomment">商品评论</mt-button>
        </div>
    </div>
                
</template>
<script>
import swiper from '../../comm/Swiper.vue'
import numberbox from '../../comm/goodsNumberBox.vue'
export default {
   data() {
       return {
           goods:{},
           lunbotuList:[],
           ballFlag:false, // 控制小球的隐藏于显示标识
           goodsNum:1,  // 加入购物车的商品数,
           isDisable: false
       }
   },
   components: {
        swiper,
        numberbox
    },
   created () {
       this.goods = eval('(' + this.$route.query.data + ')');
       for (let index = 0; index < 5; index++) {
           this.lunbotuList.push( {img:this.goods.goods_pic,id:index} );
       }
   },
   methods: {
     accSub(arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
     },

      accMul(argO, argT ,arg3) {
          var arg1 = this.accSub(argO,argT);
          var arg2 = arg3 / 100;
                var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
                    try {
                        m += s1.split(".")[1].length;
                    }catch (e) {
                    }

                    try {
                        m += s2.split(".")[1].length;
                    }catch (e) {
                    }
                return Math.round(Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)*100 ) /100;
      },
      addToCart(){
          this.isDisable = true;
          this.ballFlag = !this.ballFlag; 
          setTimeout(() => {
              this.isDisable = false;
           }, 1000) 
          var goodsinfo = {
                    id:this.goods.goods_id,
                    count:this.goodsNum,
                    price:this.accSub(this.goods.goods_price,this.goods.coupon_price),
                    title:this.goods.goods_title,
                    img:this.goods.goods_pic,
                    max:this.goods.coupon_number,
                    selected:true
              }
         this.$store.commit("addToCart",goodsinfo);
      },
      godesc(){
           this.$router.push({name:"GoodsDetail"});
      },
      gocomment(){
           this.$router.push({path:"/home/comment/"});
      },
      getNumBox(num){
          this.goodsNum = num;
      },
      //动画钩子函数第一个参数el 表示动画要执行的那个DOM元素,是个原生的JS DOM对象
      // el 是通过  document.getE,ementById('')
        beforeEnter(el){
           //  动画入场之前,此时 动画尚未开始,可以在此函数中,设置动画开始之前的起始样式
            el.style.transform = 'translate(0,0)'
        },
        enter(el,done){
            // 这句话没有实际作用 但是如果不写出不来动画效果
            // offsetWidth会强制动画刷新
            el.offsetWidth
            // 小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 购物车 小球在页面中的位置
            const badgePosition = document.getElementById("badge").getBoundingClientRect();
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;
            // 动画开始之后的样式 这里可设置小球完成动画之后的结束状态
            el.style.transform = `translate(${xDist}px, ${yDist}px)`
            el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,.1,.68)'

            done()   // 其实就是 afterEnter 这个函数的引用
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
        }
   }
}
</script>

<style scoped lang="scss">
  .goods-list{
      background: #eee;
      overflow: hidden;
      width: 100%;
      .goods-text{
            color: #2c2c2c;
            font-size: 16px; 
            line-height: 20px;
            margin-top: 4px;
        }
      .goods-images{
          margin: 4px;
          padding-left: 5px;
      }
      .goods-ware{
         p{
              color: #2c2c2c;
         }
          margin: 4px;
          padding-left: 5px;
          .goods-price{
              margin-top: 2px;
              margin-bottom: 5px;
          }
          .now-price{
              font-size: 16px;
              color: #ff6600;
          }

      }
      .goods-detail{
          margin: 4px;
          padding-left: 5px;
          button{
            margin: 15px -2px;
          }
      }
      .ball{
          width: 20px;
          height: 20px;
          border-radius: 20px;
          background: red;
          position: absolute;
          z-index: 33;
          top: 345px;
          left: 131px;
      }
  }
</style>