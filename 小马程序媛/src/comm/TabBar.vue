<template>
    <div class="bar-body">
            <hr style="margin:0px">
            <div class="nav-tab">
                <router-link class="bar-item" to="/home" tag="div">
                    <span class="icon bar-icon-home"></span>
                    <span class="bar-title">首页</span>
                </router-link>
                <router-link class="bar-item" to="/search" tag="div">
                    <span class="icon bar-icon-search"></span>
                    <span class="bar-title">搜索</span>
                </router-link>
                <router-link class="bar-item shopcar" to="/shopcar" tag="div">
                    <span class="icon bar-icon-shopcar"></span>
                    <span class="bar-badge" id="badge" v-show="$store.getters.getAllCount == 0 ? false:true ">{{ $store.getters.getAllCount }}</span>
                    <span class="bar-title">购物车</span>
                </router-link>
                <router-link class="bar-item" to="/member" tag="div">
                    <span class="icon bar-icon-member"></span>
                    <span class="bar-title">会员</span>
                </router-link>
            </div>
        </div>
</template>
<script>

export default {
    data () {
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
.bar-body{
        position: fixed; // 以浏览器窗口定位,固定在底部 并显示在上面
        bottom: 0px;
        z-index: 10;
        width: 100%;
        height: 50px;
        background-color: rgb(247, 247, 247);
        line-height: 0.7em;   // 用在一个标签里便是文字的之间的间距,用在标签之间 表示标签之间的间距
        .nav-tab{
            width: 100%;
            height: 100%;
            text-align: center;
            display: flex;     
            .shopcar{
                position: relative;
            }
            .bar-item{
                color: #929292;
                flex: 1;
                height: 100%;
                .icon {
                    width: 24px;
                    height: 24px;
                    display:inline-block;
                    overflow: hidden;  // 清除改变图片颜色带来的浮动
                }
                
                .bar-icon-home{
                    background: url('../images/home.png');
                }
                .bar-icon-member{
                    background: url('../images/member.png');
                }
                .bar-icon-shopcar{
                    background: url('../images/shopcar.png');
                }
                .bar-icon-search{
                    background: url('../images/search.png');
                }
                .bar-title{
                    display:block;
                    height: 21px;
                    width: 100%;
                    font-size: 11px;
                }
                .bar-badge{
                    position: absolute;
                    // top: 0px;
                    // right: 24px;
                    margin-left: -8px;
                    width: 20px;
                    height: 20px;
                    font-size: 11px;
                    background-color: red;
                    border-radius: 10px;
                    line-height: 20px;
                    color: #fff;
                }
            }
            .bar-active{
                color: #007aff;
                //改变图片颜色 单只针对于png
                .icon:after{
                    content: '';
                    display: block;
                    height: 100%;
                    transform: translateX(-100%);
                    background: inherit;
                    filter: drop-shadow(24px 0 0 #007aff); //需要修改的颜色值
                }
            }
     }
}
</style>


