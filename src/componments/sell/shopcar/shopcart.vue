<template>
    <div class="shopcart">
       <div class="content">
           <div class="content-left">
               <div class="logo-warpper">
                   <div class="logo">
                       <i class="icon-shopping_cart"></i>
                   </div>
               </div>
               <div class="price">¥{{totalPrice}}</div>
               <div class="desc">另需配送费¥{{deliveryprice}}</div>
           </div>
           <div class="content-right">
               <div class="pay"> 
                   ¥{{minPrice}}
               </div>
           </div>
       </div>
    </div>
</template>

<script>
export default {
    props:{
        selectFoods:{
            type:Array,
            default(){
                return [];
            }
        },
        deliveryprice:{
            type:Number
        },
        minPrice:{
            type:Number,
            default:0
        }
    },
    computed:{
        totalPrice(){
            let total = 0;
            this.selectFoods.forEach(food => {
                total += food.price * food.count;
            });
            return total;
        }
    },
    data() {
        return {
            
        }
    },
}
</script>

<style scoped lang="scss">
.shopcart{
    position: fixed;
    bottom: 50px;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content{
        display: flex;
        background: #141d27;
        font-size: 0;
        color: rgba(255,255,255,0.4);
        .content-left{
            flex: 1;
            .logo-warpper{
                display: inline-block;
                vertical-align: top;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 48px;
                box-sizing: border-box;
                .logo{
                    background: #2b343c;
                    text-align: center;
                    border-radius: 50%;

                    .icon-shopping_cart{
                        line-height: 44px;
                        font-size: 24px;
                        color: #808588;
                    }
                }
            }
            .price{
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                line-height: 24px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255,255,255,0.1);
                font-size: 16px;
                font-weight: 700;
            }
            .desc{
                display: inline-block;
                vertical-align: top;
                margin: 12px 0 0 12px;
                line-height: 24px;
                color: rgba(255,255,255,0.4);
                font-size: 10px;
            }
        }
        .content-right{
            flex: 0 0 105px;
            width: 105px;
            .pay{
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 12px;
                color: rgba(255,255,255,0.4); 
                font-weight: 700;
                background: #2b333b;
            }
        }
    }
}
</style>