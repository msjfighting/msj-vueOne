<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menu">
            <ul>
                <li v-for="(item, i) in goods" :key="item.type" class="menu-item" :class="{'current':currentIndex == i}" 
                  @click="selectMenu(i,$event)">
                   <div class="num-red" v-show="redNum(item.foods)">{{redNum(item.foods)}} </div>
                    <span class="text border-1px" >
                        <span v-show="item.type > 0" class="icon" :class="classMap"> </span>{{ item.name }}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foods">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook" :key="item.name">
                    <h1 class="title"> {{item.name }}</h1>
                    <ul>
                        <li v-for="food in item.foods" :key="food.item" class="food-item border-1px">
                                <div class="icon">
                                    <img :src="food.icon" alt="" width="57" height="57">
                                </div>
                                <div class="content">
                                    <h2 class="name"> {{ food.name}}</h2>
                                    <p class="desc"> {{ food.description}} </p>
                                    <div class="extra">
                                        <span class="sellCount">月售{{ food.sellCount}}份</span><span>好评率{{ food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">¥{{ food.price}}</span><span class="old" v-show="food.oldPrice > 0 ? true :false">¥{{ food.oldPrice}}</span>
                                    </div>
                                    <div class="cart-control"> 
                                        <carcontrol :food="food" v-on:cart-add="cartAdd" ></carcontrol>
                                    </div>
                                </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div> 
        <shaopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shaopcart>
    </div>
    
</template>

<script>
import data from '../../../../data.json'
import shaopcart from '../shopcar/shopcart.vue'
import carcontrol from '../carcontrol/carcontrol.vue'
import BScroll from 'better-scroll'
export default {
    props:{
        seller:{
            type:Object
        }
    },
    data() {
        return {
            goods:[],
            classMap:[],
            listHeigth:[],
            scrollY:0 
        }
    },
    created() {
        this.goods = data.goods;
        this.classMap = ['decrease_3','discount_3','special_3','invoice_3','guarantee_3'] 
        this.$nextTick(() => {
            this._initScroll();
            this.calculateHeigth();
        })
    },
    computed:{
        currentIndex(){
            for (let i = 0; i < this.listHeigth.length; i++) {
                let heigth1 = this.listHeigth[i];
                let heigth2 = this.listHeigth[i + 1];
                if (!heigth2 || (this.scrollY >= heigth1 && this.scrollY < heigth2)) {
                        let menu = this.$refs.menu.getElementsByClassName('menu-item');
                        let el = menu[i];
                        this.menuScroll.scrollToElement(el,300);                        
                        return i;
                }
            }
            return 0;
        },
        selectFoods(){
            let foods = [];
            this.goods.forEach(good => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food)
                    }
                })
            });
            return foods;
        }
    },
    methods: {
        _initScroll(){
            this.menuScroll = new BScroll(this.$refs.menu,{
                click:true   //结合BScroll的接口使用,是否将click事件传递,默认被拦截了
            });

            this.foodScroll = new BScroll(this.$refs.foods,{
                click:true,
                probeType: 3  //结合BScroll的接口使用,3实时派发scroll事件，探针的作用
            });
            this.foodScroll.on("scroll",(pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            })
        },
        calculateHeigth(){
                let foodlist = this.$refs.foods.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeigth.push(height);
                for (let i = 0; i < foodlist.length; i++) {
                      let item = foodlist[i];
                      height += item.clientHeight;                      
                      this.listHeigth.push(height);
                }
        },
        selectMenu(index,event){
            if (!event._constructed) {  //去掉自带的click事件点击，即pc端直接返回
                return;
            }
            let foodlist = this.$refs.foods.getElementsByClassName('food-list-hook');
            let el = foodlist[index];
            this.foodScroll.scrollToElement(el,300);
        },
        cartAdd(target) {
            //拿到traget(DOM对象)之后，将其传入shopcart组件中drop(target){}方法，
            //此处用this.$refs调用子组件,访问DOM时用的是ref="menuWrapper"
            this.$nextTick(() => { //回调函数异步执行，两个动画效果就不会卡顿了
                this.$refs.shopcart.drop(target);
            })
        },
        redNum(foods){
            var num = 0;
            if (foods) {
                foods.forEach(food => {
                    if (food.count) {
                        num += food.count
                    }
                });
                return num;
            } 
        }
     }, 
    components:{
        shaopcart,
        carcontrol
    },
}
</script>

<style scoped lang="scss">
.goods{
    position: absolute;
    top: 226px;
    width: 100%;
    bottom: 98px;
    display: flex;
    overflow: hidden;
     .menu-wrapper{
         flex: 0 0 80px;
         width: 80px;
         background: #f3f5f7;
         .menu-item{
             position: relative;
             display: table; 
             height: 54px;
             line-height: 14px;
             padding: 0 12px;
             .num-red{
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: red;
                color: #fff;
                font-size: 12px;
                line-height: 16px;
                text-align: center;
                position: absolute;
                right: 2px;
                top: 18px;
             }
             .text{
                 font-size: 12px;
                 display: table-cell;
                 width: 56px;
                 vertical-align: middle;
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 2px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                }
             }
         }
         .current{
             position: relative;
             z-index: 10;
             margin-top: -1px;
             font-weight: 700;
             background: #fff;
         }
         
     }
     .foods-wrapper{
         flex: 1;
         .title{
             padding-left: 14px;
             height: 26px;
             line-height: 26px;
             border-left: 2px solid #d9dde1;
             font-size: 12px;
             color: rgb(147,153,159);
             background: #f3f5f7;
         }
         .food-item{
             display: flex;
             margin: 18px;
             padding-bottom: 18px;
             &:last-child{
                 position:relative;
                 margin-bottom: 0;
                    &:after{
                        display:none;
                     }
             }
             .icon{
                 flex: 0 0 57px;
                 margin-right: 10px;
              }
            .content{
                flex: 1;
                .name{
                    font-size: 14px;
                    margin: 2px 0 8px 0;
                    height: 14px;
                    line-height: 14px;
                    color: rgb(7,17,27);
                }
                .desc{
                    margin-top: 8px;
                    line-height: 15px;
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
                .extra{
                    margin-bottom: 8px;
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147,153,159);
                    &.sellCount{
                        margin-right: 12px;
                    }
                }
                .price{
                    font-weight: 700;
                    line-height: 12px;
                    .now{
                        margin-right: 8px;
                        font-size: 14px;
                        color: rgb(240, 20, 20);
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
                .cart-control{
                    position: absolute;
                    right: 0;
                    bottom: -3px;
                }
            }
         }
     }
}
</style>