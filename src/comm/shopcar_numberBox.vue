<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:30px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" readonly :value='count' @change="countChange" ref="num"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from '../lib/mui/js/mui.min.js'
export default {
    props: ["count","goodsid"],
    data () {
        return {
            
        }
    },
     mounted() {
        mui(".mui-numbox").numbox()
    },
    methods: {
        countChange(){
            // 更新本地数据库中的商品个数            
            this.$store.commit("updateGoodsInfo",{id:this.goodsid,count:parseInt(this.$refs.num.value)})
        }
    },
}
</script>
<style lang="scss" scoped>

</style>
