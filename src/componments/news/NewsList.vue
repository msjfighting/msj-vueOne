<template>
    <div>
         <ul class="mui-table-view">
             <!-- :key 只接收字符串或者num值 -->
				<li class="mui-table-view-cell mui-media" v-for="(item,i) in newslist" :key="item.plid">
					<!-- 表达式使用v-bind -->
                    <!--  
                      特别注意：params 命名路由这种方式传递的参数，如果在目标页面刷新是会出错的 url中不会显示,刷新页面时,参数消失,页面报错
                              和name配对的是params，和path配对的是query:URL中会显示参数
                    -->
                    <router-link :to="{path:'/home/detail/',query:{items:JSON.stringify(item),id:item.plid}}">
                        <img class="mui-media-object mui-pull-left"  :src="imgurls[i][0]">
						<div class="mui-media-body">
							 <h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间: {{item.makedate | dateFormat}}</span>
                                <span>点击:{{item.click}}次</span>    
                                </p>
						</div>
                    </router-link>
				</li>
			</ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';


export default {
    data () {
        return {
            newslist:[],
            imgurls:[],
            msg:'123'
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList(){
             Indicator.open('加载中...');
            var url = 'api/index.php/Home/interface5/jrj_gjsjd'
            this.$http.get(url,{params:{
                  channel:"jgjd"
            }})
            .then(function (res) {
                Indicator.close();
                this.newslist = res.body.data;
                this.newslist.forEach(elem => {
                   var imgs = elem.imgurl.split(",");
                   this.imgurls.push(imgs)
                });
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
.mui-table-view{
    li{
        h1{font-size: 12px;}
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            // 左右对齐
            display: flex;
            justify-content:space-between; 
        }
    }
}
</style>
