<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="num"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from '../lib/mui/js/mui.min.js'
export default {
    props: ["max"],
    data () {
        return {
            
        }
    },
    mounted() {
        mui(".mui-numbox").numbox()
    },
    methods: {
        countChange(){
            // 每当文本的数据被修改的时候,立即将数据传递给父组件
            this.$emit('getGoodsNum',parseInt(this.$refs.num.value))
        }
    },
    watch: {
        max:function(newVal, oldVal){
            // 父组件获取后台数据时,由于异步,不知什么时候获取到值,所以通过监听属性设置最大值,由于我是跳转传值不需要次方法
            mui(".mui-numbox").numbox().setOption('max',newVal)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
