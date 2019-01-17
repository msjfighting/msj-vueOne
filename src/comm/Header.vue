<template>
    <div class="header-app">
        <div class="header-back" @click="goBack()" v-show="isShow">
            <span class="back-icon"></span>
            <span class="back-title">返回</span>
        </div>
        <h1 :style="styleobj">小马程序员---Vue项目</h1>
    </div>
                
</template>
<script>
export default {
    props:["styleobj","isShow"],
     data() {
         return {
             isShow:false,
             styleobj:{}
         }
     },
     methods: {
         goBack(){
             this.$router.goBack()
         }
     },
    created() {
         var path = this.$route.path
         if(path=="/home" || path=="/member" || path=="/shopcar" || path=="/search"){
                    this.isShow=false;
                    this.styleobj = {};
            } else{
                this.isShow=true;
                this.styleobj = {'margin-left': '-40px'}
            }
    },
     beforeRouteUpdate (to, from, next) {
        // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
        let isBack = this.$router.isBack
        if (isBack) {
            this.transitionName = 'slide-right'
        } else {
            this.transitionName = 'slide-left'
        }
        // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
        this.$router.isBack = false
            next()
    },
      watch:{
        $route(now,old){     //监控路由变换，控制返回按钮的显示
             
            if(now.path=="/home" || now.path=="/member" || now.path=="/shopcar" || now.path=="/search"){
                    this.isShow=false;
                    this.styleobj = {};
            } else{
                this.isShow=true;
                this.styleobj = {'margin-left': '-40px'}
            }
            }
    },
}
</script>

<style scoped lang="scss">
.header-app{
        position: fixed;
        top: 0px;
        z-index: 99;
        background-color: #26a2ff;
        width: 100%;
        height: 40px;

        display: flex;
        text-align: center;  // 与margin: 0 auto;搭配使用可以将内容水平居中 配合line-height:垂直居中
        h1{
            width: 80%;
            font-size: 16px;
            color: white;
            margin: 0 auto;
            line-height: 40px;
        }
     .header-back{
         height: 100%;
         width: 20%;
         .back-icon{
             background: url('../images/back.png');
             display: inline-block;
             width: 30px;
             height: 27px;
             margin-top: 5px;
         }
         .back-title{
             font-size: 16px;
             color: white;
             vertical-align: top;
             line-height: 40px;
             margin-left: -12px;
         }
     }
}
  
</style>
