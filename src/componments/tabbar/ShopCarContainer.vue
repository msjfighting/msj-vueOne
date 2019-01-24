<template>
  <div class="detail-container">
      <div class="goods-wrapper">
        <div class="goods-detail card-list" v-for="(item, i) in car" :key="item.id">
          <img :src="$store.getters.getGoodsStatue[item.id] ? '../../images/selected.png' :'../../images/noselect.png'" class="goods-statue" @click="chageSelectImg(item.id)">
          <img :src="item.img" alt>
          <div class="goods-contain">
              <p>{{ item.title }}</p>
              <p class="goods-detail-price">
                  ¥{{ item.price }}&nbsp;&nbsp;
                  <numberbox :count="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numberbox>&nbsp;&nbsp;
                  <span class="del" @click="delGoods(item.id,i)">删除</span>
              </p>
          </div>
        </div>
      </div> 
    <div class="goods-total card-list">
      <div>
        <p>总计(不含运费)</p>
        <p>
          已勾选商品
          <span class="count">{{ $store.getters.getGoodsMoney.total}}</span>&nbsp;件 ,总价:
          <span class="pricetotal">¥&nbsp;{{ $store.getters.getGoodsMoney.money | keepTwoNum}}</span>
        </p>
      </div>

      <p class="goods-btn">
        <mt-button type="danger" size="small" @click.native="buyNow">去结算</mt-button>
      </p>
    </div>
  </div>
</template>

<script>
import numberbox from "../../comm/shopcar_numberBox.vue";
export default {
  inject: ["reload"],
  data() {
    return {
      car: [],
    };
  },
  created() {
    this.car = JSON.parse(localStorage.getItem("car") || "[]");
  },
  methods: {
    delGoods(id,index) {      
      this.car.splice(index,1);  
      this.$store.commit("delGoods", id);
    },
    chageSelectImg(id){
        this.$store.commit("changeFlag", id);
    }
  },
  components: {
    numberbox
  }
};
</script>

<style scoped lang="scss">
.detail-container {
  background: #eee;
  overflow: hidden;
  width: 100%;
  p {
    color: #515151;
  }
  .goods-wrapper{
    padding-bottom: 92px;
  }
  .goods-detail {
    img {
      height: 80px;
    }
    .goods-statue{
          height: 30px;
          margin: 8% 2px 0 -3px;
      }
    .goods-detail-price {
      color: red;
      .del {
        color: #007aff;
      }
    }
    .goods-contain {
      margin-left: 10px;
    }
  }
  .goods-total {
    position: fixed;
    width: 100%;
    bottom: 50px;

    .pricetotal {
      color: red;
      font-size: 16px;
    }
    .count {
      color: red;
      font-size: 16px;
    }
    .goods-btn {
      text-align: center;
      margin: 0 auto;
    }
  }
}
.card-list{
    background: white;
    border: 5px solid #e6e6e6;
    box-shadow: 0 0 8px #e6e6e6;
    padding: 10px;
    display: flex;
}
</style>