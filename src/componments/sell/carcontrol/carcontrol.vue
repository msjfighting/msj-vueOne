<template>
    <div class="carcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
                 <span class="inner"></span>
            </div>
        </transition>
      
      <div class="cart-content" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add" @click="addCart($event)"></div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    props:{
        food:{
            type:Object
        }
    },
    data() {
        return {
            
        }
    },
    methods:{
        addCart(event){
            if (!event._constructed) {  //去掉自带的click事件点击，即pc端直接返回
                return;
            }
            if (!this.food.count) {
                Vue.set(this.food,'count',1) // 添加count字段
            }else{
                this.food.count++;
            }
             this.$emit('cart-add', event.target);
        },
        decreaseCart(event){
            if (!event._constructed) {  //去掉自带的click事件点击，即pc端直接返回
                return;
            }
            if(this.food.count){
                this.food.count--;
            }
        }
    }
}
</script>

<style scoped lang="scss">
.carcontrol{
    font-size: 0;
    .cart-decrease{
        display: inline-block;
        padding: 6px;
        .inner{
            display: inline-block;
            font-size: 24px;
            line-height: 24px;
        }
    }
    .inner::before{
        content: url('../../../images/cart_dec.png')
    }
    .cart-content{
        display: inline-block;
        vertical-align: top;
        padding-top: 5px;
        text-align: center;
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 24px;
        width: 12px;
    }
    .cart-add{
        display: inline-block;
        padding: 6px;
    }
    .cart-add::before{
        content: url('../../../images/cart_add.png')
    }
}
.move-enter-active, .move-leave-active {
    transition: all 0.4s linear;
    opacity: 1;
    transform: translate3d(0,0,0);
    .inner{
        transition: all 0.4s linear;
        transform: rotate(0);
    }
}
.move-enter, .move-leave-to{
    opacity: 1;
    transform: translate3d(24px,0,0);
    .inner{
        transform: rotate(180deg);
    }
}
</style>