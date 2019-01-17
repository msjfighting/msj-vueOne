<template>
    <div class="photoinfo-container">
        <h3>{{ item.title }}</h3>
        <p class="subtitle">
            <span>发布时间:{{ item.time }}</span>
            <span>来源:{{ item.author }}</span>
        </p>
        <hr>
        <!-- 内容 -->
        <img :src="item.img">

        <div class="content" v-html="item.content"></div>
        <!-- 评论子组件 -->
        <comment-box></comment-box>
    </div>
</template>

<script>
import comment from '../subComponments/Comment.vue'

export default {
    data() {
        return {
            item:{}
        }
    },
    created() {
         this.item = eval('(' + this.$route.query.items + ')');
    },
    components: {  // 注册子组件
        'comment-box':comment
    }
}
</script>

<style scoped lang="scss">
.photoinfo-container{
    padding: 3px;
    h3{
       text-align: center;
       margin: 15px 0px;
       font-size: 15px;
       color:#26a2ff;
    }
    .subtitle{
         display: flex;
         justify-content:space-between;
         font-size: 13px;
    }
    .content{
         font-size: 13px;
         line-height: 30px;
    }
    img{
        width: 100%;
    }
}



</style>