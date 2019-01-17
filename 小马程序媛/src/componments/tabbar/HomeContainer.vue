<template>
    <div>
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
                <!-- mui的9宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                      <router-link to='/home/newslist'>
                            <img src="../../images/menu1.png" alt="">
                            <div class="mui-media-body">新闻资讯</div>
                      </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to='/home/photolist'>
                            <img src="../../images/menu2.png" alt="">
                            <div class="mui-media-body">图片分享</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to='/home/buygoods'>
                            <img src="../../images/menu3.png" alt="">
                            <div class="mui-media-body">商品购买</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to='/home/photolist'>
                            <img src="../../images/menu4.png" alt="">
                            <div class="mui-media-body">留言反馈</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to='/home/vedio'>
                            <img src="../../images/menu5.png" alt="">
                            <div class="mui-media-body">视频专区</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to='/home/photolist'>
                            <img src="../../images/menu6.png" alt="">
                            <div class="mui-media-body">联系我们</div>
                    </router-link></li>
		</ul> 
    </div>
</template>

<script >
import { Indicator } from 'mint-ui';
import swiper from '../../comm/Swiper.vue'
export default {
    data () {
        return {
            lunbotuList:[],
        }
    },
    created() {
        this.getLunbotu()
    },
    components: {
        swiper
    },
    methods: {
        getLunbotu(){
              Indicator.open();
            var url1 = '/api/index.php/Home/interface3/ths_turns_img';
            this.$http.get(url1)
                .then(function(res) {
                      Indicator.close();
                    this.lunbotuList = res.body.data;
                    res.body.data.forEach((element,index) => {
                        element.id = index;
                    });
                })
                .catch(function(err) {
                      Indicator.close();
                    console.log(err.message);
                });

        }
    },
}
</script>

<style scoped lang="less">


.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: none;
    img{
        width: 60px;
        height: 60px;
    }

    .mui-media-body{
        font-size: 13;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
}
</style>
