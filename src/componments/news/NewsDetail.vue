<template>
    <div>
        <!-- 头部 -->
        <div class="header">
            <h3>{{item.title}} </h3>
            <p class="subtitle">
                <span>发表时间: {{item.makedate | dateFormat}}</span>
                <span>点击:{{item.click}}次</span>
            </p>
        </div>
        <hr>
        <!-- 缩略图 -->
        <div class="subimg">
            <img class="preview-img" v-for="(item, index) in imgurls" :src="item.src" height="100" @click="$preview.open(index, imgurls)" :key="item.src"> 
        </div>
        <!-- 内容 -->
        <div class="content" v-html="item.detail"></div>
        <!-- 评论 -->
        <comment-box></comment-box>
    </div>
</template>

<script>
import comment from '../subComponments/Comment.vue'

export default {
    data () {
        return {
            id:"",
            item:{} ,
            imgurls:[]
        }
    },
    created() {
        this.item = eval('(' + this.$route.query.items + ')');
        this.id = this.$route.query.id;
        var imgs = this.item.imgurl.split(",");
        imgs.forEach(elem => {            
            if (elem.trim().length > 0) {
               var temp = {
                    msrc : elem,
                    alt:'picture1',
                    title:'Image Caption 1',
                    src:elem,
                    w:600,
                    h:400
                    }; 
                this.imgurls.push(temp);
                }
            });
    },
    components: {  // 注册子组件
        'comment-box':comment
    },
    methods: {
        handleClose () {
            console.log('close event')
        }
    }
}
</script>

<style scoped lang="scss">
.header{
    padding: 3px;
    h3{
       text-align: center;
       margin: 15px 0px;
       font-size: 15px;
       color:#26a2ff;
    }
    .subtitle {
         display: flex;
         justify-content:space-between;
         font-size: 13px;
    }
}
 .content{
         font-size: 13px;
         line-height: 30px;
    }
.subimg{
    img{
        margin: 5px;
        box-shadow: 0 0 8px #999;
    }
}
</style>