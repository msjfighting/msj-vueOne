<template>
    <div >
     <sell-header :seller="seller" ></sell-header>
      <div class="item border-1px">
          <router-link to="/member/sellgoods" class=""> 商品 </router-link>
          <router-link to="/member/ratings"> 评论</router-link>
          <router-link to="/member/seller"> 商家 </router-link>
      </div>
      <router-view ></router-view>
    </div>
</template>

<script>
import sellHeader from '../sell/header/header.vue'
import data from '../../../data.json'

export default {
    data() {
        return {
            seller:[]
        }
    },
    created() {
        this.getSeller();
    },
    methods: {
        getSeller(){
            console.log(data.seller);
            this.seller = data.seller;
        }
    },
    components: {
         'sell-header': sellHeader
    }
}
</script>

<style lang="scss" scoped>
.item{
    width: 100%;
    height: 40px;
    background: #f4f5f6;
    display: flex;
    border-spacing: 10px;
      a{
        font-size: 14px;
        height: 100%;
        line-height: 40px;
        color: rgb(77,85,93);
        flex: 1;
        text-align: center;
      }
     .cur{
            color: rgb(240,20,20);
     }
        
}
</style>
