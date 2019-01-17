<template>
    <div>
         <mt-swipe :auto="4000">
            <!-- 在组件中如果使用v-for绑定属性,必须添加v-bind:key -->
            <!-- 谁使用次组件,就传递lunbotuList
                  lunbotuList 父组件向子组件传值
             -->
			<mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" alt="" :class="{full:isfull}">
            </mt-swipe-item>
		</mt-swipe>
    </div>
</template>
<script>
export default {
    props:["lunbotuList","isfull"],
    data () {
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
.mint-swipe {
    height: 200px;
    .mint-swipe-item {
        text-align: center;
        img{  
            height: 100%;
        }
    }
    // isfull 图片宽度是否需要100% 或者自适应
    .full{
         width: 100%;
    }
}
</style>
