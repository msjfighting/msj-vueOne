<template>
    <div class="news-view">
        <div class="outer-container">
            <div class="inner-container">
                <a href="" class="cur">推荐</a>
                <a href="">热点</a>
                <a href="">推荐1</a>
                <a href="">热点2</a>
                <a href="">推荐3</a>
                <a href="">热点4</a>
                <a href="">推荐5</a>
                <a href="">热点6</a>
                <a href="">推荐7</a>
                <a href="">热点8</a>
                <a href="">推荐9</a>
                <a href="">热点10</a>
            </div>
        </div>
        
    </div>
    
</template>

<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';


export default {
    data () {
        return {
            newslist:[],
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList(){
             Indicator.open('加载中...');
            var url = '/toutiao/list/'
            this.$http.get(url,{params:{
                  tag:"__all__",
                  count:20,
                  ac:'wap',
                  format:'json_raw'
            }})
            .then(function (res) {
                Indicator.close();
                this.newslist = res.body.data;
                console.log(res.body.data);
            })
            .catch((err) => {
                Indicator.close();
                Toast('获取数据失败');
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.news-view{
    .outer-container{
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 45px;
    }
    .inner-container {
        position: absolute;
        left: 0;
        background: #f4f5f6;
        width: 100%;
        height: 45px;
        overflow-x: auto; // 单独设置无效 原因是当文字长度超出div宽度时，会自动换行
        white-space: nowrap;  // 强制文字在同一行显示
        -webkit-overflow-scrolling:auto;
        a{
            font-size: 18px;
            height: 100%;
            line-height: 45px;
            margin: 10px;
            color: #505050;
        }
        .cur{
            color: #f85959;
        }
     }
     .inner-container::-webkit-scrollbar {
             display: none;
    }
}

</style>
