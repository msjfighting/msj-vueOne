<template>
    <div>
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
                <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                    <div class="mui-scroll">
                        <a :class="['mui-control-item',i==0 ?'mui-active':'']" v-for="(item , i) in allCategory" :key="item.id" 
                            @click="getCategorysByID(item.id)">
                            {{ item.title }} 
                        </a>
                    </div>
                </div>
			</div>
            <!-- 图片列表区域 -->
            <ul class="photo-list">
                <router-link  v-for="item in categorys" :key="item.id" tag="li" :to="{path:'/home/photoinfo',query:{items:JSON.stringify(item)}}">
                        <img v-lazy="item.img">
                        <div class="info">
                            <h1 class="info-title">{{ item.title }}</h1>
                            <div class="info-body">{{ item.content }}</div>
                        </div>
                </router-link>
            </ul>
    </div>
</template>

<script>
// 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode
// 引用出错,webpack打包好的bundle.js中,默认是启用严格模式的,所以冲突了
// 解决方法:把webpack的严格模式禁用掉
import mui from '../../lib/mui/js/mui.min.js'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            allCategory:[],
            categorys:[],
            pageindex:0,
        }
    },
    methods: {
        getAllCategory(){
            this.allCategory = [
                {title:'最新',id:0},
                {title:'央行',id:1},
                {title:'财经要闻',id:2},
                {title:'原油',id:3},
                {title:'原油期货',id:4},
                {title:'国际原油',id:5},
                {title:'贵金属',id:6},
                {title:'国际黄金',id:7},
                {title:'国际白银',id:8},
                {title:'外汇',id:9},
                {title:'外汇资讯',id:10},
                {title:'美元',id:11},
                {title:'人民币',id:12},
                {title:'学院',id:13},
                {title:'原油学院',id:14},
                {title:'贵金属学院',id:15},
                {title:'外汇学院',id:16},
                {title:'投资技巧',id:17},
                {title:'理财攻略',id:18},
                {title:'专栏首页',id:19},
                {title:'原油名家',id:20},
                {title:'贵金属名家',id:21},
                {title:'外汇名家',id:22},
                ]
                this.getCategorysByID(0)
        },
        getCategorysByID(id){
                var url = this.common.api +'/api/public/'
                this.$http.get(url,{params:{
                    service:'App.Reptilian_Cnoil.Get_list',
                    page:'1',
                    perpage	:'5',
                    channel:id
                }})
                .then((res) => {
                    if (res.body.code == 200) {
                        this.categorys = res.body.data
                    }else{
                        Toast('获取数据失败'+res);
                    }
                })
                .catch((err) => {
                    Indicator.close();
                    Toast('获取数据失败'+err);
                })
        }
    },
    created() {
        this.getAllCategory()
    },
    mounted() {  // 当组件中的dom结构被渲染好并放到页面中后,会执行这个函数
        // 初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
}
</script>

<style scoped lang="scss">
*{
    touch-action: pan-y; 
}

.photo-list{
    list-style-type: none; 
    margin: 0;
    padding: 10px;
    padding-bottom:0; 
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative; // 相对定位
        img{
            width: 100%;
            vertical-align:middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
            }
        .info {
                color: white;
                text-align: left;
                position: absolute; // 绝对定位
                bottom: 0px;
                background-color: rgba(0,0,0,0.4);
                max-height: 84px;
                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 13px;
                    max-height: 60px;
                }
            }
    }
    

    
}
</style>