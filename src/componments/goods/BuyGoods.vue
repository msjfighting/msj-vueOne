<template>
    <div class="goods-list">
        <!-- 在页面中.有两种跳转方式 -->
        <!-- 方式1 使用a标签的形式叫做标签跳转
             方式2 使用window.location.href 的形式,叫做编程式跳转 -->
        <div class="goods-item card" v-for="item in goodslist" :key="item.goods_id" @click="goDetail(item)">
            <div class="goods-img">
                <img :src="item.goods_pic" >
            </div>
            <div class="goods-title"> 
                <!-- <span class="tianmao" v-show="item.is_tmall == 1 ?true : false">天猫</span> -->
                <span class="title">{{ item.goods_short_title }}</span>
            </div> 
            <div class="info">
                <div class="price">
                    <span class="price-icon">券后
                        <i class="num-font">¥</i>
                    </span>
                    <span class="price-num" v-html="accSub(item.goods_price,item.coupon_price)"></span>
                    <span class="price-old-num">¥{{ item.goods_price }}</span>
                </div>
                <div class="sell">
                    <div class="fl-item">佣比:
                        <span class="percent">{{ parseInt(item.commission) }}%</span> 
                        <span class="fl-item">({{ accMul(item.goods_price,item.coupon_price,item.commission)  | keepTwoNum }}元)</span>
                    </div>
                    <span class="goosd-sales">月销:{{item.goods_sales | numFormat}}</span>
                </div>

                <div class="image">
                    <div class="coupon">
                        <span class="coupon-icon"></span>
                        <span class="quan">{{ item.coupon_price }}</span>
                    </div>
                    <div class="icon-group">
                        <img src="../../images/cat.png" v-show="item.is_tmall ==1 ?true:false">
                        <img src="../../images/ju.png" v-show="item.is_ju ==1 ?true:false" >
                        <img src="../../images/xian.png" v-show="item.is_ju ==1 ?true:false" >
                    </div>
                </div>
            </div>
        </div>
         <mt-button type="danger" size="large" plain @click.native="loadMore" v-show="loading">加载更多</mt-button>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
    data () {
        return {
            goodslist:[],
            loading:false,
            pageindex:1
        }
    },
    created() {
        this.getGoodList();
    },
    methods: {
        getGoodList(){
             Indicator.open('加载中...');
            var url = 'qingtaoke/qingsoulist'
            this.$http.get(url,{params:{
                app_key:this.common.QiangTaoKeKey,
                v:'1.0',
                page:this.pageindex
            }})
            .then((res) => {
                Indicator.close();
                this.goodslist = this.goodslist.concat(res.body.data.list);
                this.loading = true;
            })
            .catch((err) => {
                Indicator.close();
                console.log(res);
            })
        },
        loadMore() {
            this.loading = true;
            this.pageindex++;
            if(this.pageindex >100 ){
                   this.loading = false;
                   return;
                }
                this.getGoodList();
       },
        
      accSub(arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }catch (e) {
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
            }catch (e) {}
            try {
                m += s2.split(".")[1].length;
            }catch (e) {}
            return Math.round(Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)*100 ) /100;
      },
    //   使用js形式进行路由导航
    /** this.$route 是路由[参数队象],所有路由中的参数params,query 都属于它
     *  this.$router 是路由[导航队象],用它可以方便的使用JS代码,实现路由的前进,后退,跳转到新的URL地址
     */
      goDetail(goods){
           this.$router.push({name:"GoodsDetail",query:{data:JSON.stringify(goods)}});
      }

    }
}
</script>

<style scoped lang="scss">
.goods-list{
     display: flex; 
     flex-wrap: wrap; // flex-wrap 属性规定flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。。
     padding: 3px;
     // justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。
     // space-between: 项目位于各行之间留有空白的容器内。
     // space-around 项目位于各行之前、之间、之后都留有空白的容器内
     justify-content: space-between;
     .goods-item{
         width: 49%;
         margin: 4px 0 ;
         padding: 1px;
         display: flex;
         //flex-direction 属性规定灵活项目的方向。
         // row 默认值。灵活的项目将水平显示，正如一个行一样
         // column 灵活的项目将垂直显示，正如一个列一样。
         flex-direction: column;
         justify-content: space-between;
         min-height: 280px;

          border-radius:5px 5px 0 0;
          overflow: hidden;

         .goods-img{
             height: 172px;
             border-bottom: 0.5px solid #dbdbdb;
             border-radius:5px 5px 0 0;
             overflow: hidden;
             img{
                width: 100%; 
             }
         }
         .goods-title{
               line-height: 17px;
                margin: 5px 0;
                .title{
                    font-size: 10px;
                    color: #515151;
                    display:inline-block;
                }        
         }
         
         .info{
             background-color: #eee;
             height: 78px;
             p{
                 margin: 0;
                 padding: 5px;
             }
             .price{
                 height: 28px;
                 .price-icon{
                     color: #a8a5a5;
                     font-size: 12px;
                     .num-font{
                             color: #ff6600;
                             font-size: 14px;
                     }
                 }
                .price-num{
                    color: #ff6600;
                    font-size: 18px;
                    margin-left: -4px;
                }
                 .price-old-num{
                     color: #a8a5a5;
                     text-decoration: line-through;
                     font-size: 13px;
                     margin-left: 10px;
                 }
             }
             .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    height: 23px;
                    .fl-item{
                         color: #a8a5a5;
                         font-size: 12px;
                    }
                    .percent{
                        color: #48aade;
                        font-weight: bold;
                        margin-left: -2px;
                    }
                    .goosd-sales{
                         color: #a8a5a5;
                         line-height: 23px;
                    }
             }
             .image{
                 display: flex;
                 justify-content:space-between;
                 height: 25px;
                 width: 100%;
                 .coupon{
                        margin-left: 3px;
                        width: 50%;
                    .coupon-icon{
                        display: inline-block;
                        height: 23px;
                        width: 23px;
                        background: url('../../images/quan.png');
                    }
                    .quan{
                         height: 23px;
                         line-height: 23px;
                         color: #d81e06;
                         font-size: 12px;
                         border: 1px solid #d81e06;
                         border-left: none;
                         margin-left: -8px;
                         vertical-align: top; 
                         padding-left: 2px;
                    }
                 }
                 .icon-group{
                     margin-right: 3px;
                 }
                 
             }
         }
     }
}
</style>