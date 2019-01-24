<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-for="item in goods" :key="item.type" class="menu-item">
                    <span class="text border-1px" >
                        <span v-show="item.type > 0" class="icon" :class="classMap"> </span>{{ item.name }}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
            <ul>
                <li v-for="item in goods" class="food-list" :key="item.name">
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
                                        <span class="sellCount">月售{{ food.sellCount}}份</span>
                                        <span>好评率{{ food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">¥{{ food.price}}</span>
                                        <span class="old" v-show="food.oldPrice.length > 0 ? true :false">¥{{ food.oldPrice}}</span>
                                    </div>
                                </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div> 
        <shaopcart></shaopcart>
    </div>
    
</template>

<script>
import data from '../../../../data.json'
import shaopcart from '../shopcar/shopcart.vue'
export default {
    props:{
        seller:{
            type:Object
        }
    },
    data() {
        return {
            goods:[],
            classMap:[] 
        }
    },
    created() {
        this.goods = data.goods;
        this.classMap = ['decrease_3','discount_3','special_3','invoice_3','guarantee_3'] 
    },
    components:{
        shaopcart
    }
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
         overflow-y: auto;
         .menu-item{
             display: table; 
             height: 54px;
             line-height: 14px;
             padding: 0 12px;
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
         
     }
     .foods-wrapper{
         flex: 1;
         overflow-y: auto;
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
                    line-height: 10px;
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
                    line-height: 24px;
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
            }
         }
     }
}
</style>