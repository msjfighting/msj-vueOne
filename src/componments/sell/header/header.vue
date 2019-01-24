<template>
    <div class="seller-container">
        <div class="seller-body">
            <span class="seller-icon">
                    <img :src="seller.avatar" alt="">
            </span>
            <div class="seller-content">
                <span class="seller-title"> <i class="title-brand"></i> {{ seller.name }}</span>
                <span class="seller-desc">{{ seller.description }}</span>
                <div class="disp">
                    <span class="sub-desc"><i class="sub-desc-decrease"></i>{{ seller.supports[0].description }}</span>
                    <span class="supports right" @click="showDetail">{{ seller.supports.length }}个</span>
                </div>
            </div>
        </div>
        <div class="seller-notice">
          <span class="ellipsis-1 right" @click="showDetail"> {{ seller.bulletin }} </span>
      </div>
      <!-- 背景图 -->
      <div class="bg" >
          <img :src="seller.avatar" alt="" width="100%" height="100%">
      </div>
      <!-- 详情弹层 Sticky footers -->
      <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{ seller.name }}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"> </star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="item in seller.supports" :key="item.type">
                                <span class="icon" :class="classMap[item.type]"></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家信息</div>
                            <div class="line"></div>
                        </div>
                        <div class="seller-notice">
                            <p class="content">{{ seller.bulletin }}</p>
                        </div>
                    </div>
                </div>
            <div class="deail-close" >
                <i class="icon-close" @click="detailShow = !detailShow"></i>
            </div>
        </div>
      </transition>
      
    </div>
</template>

<script>
import star from '../star/star.vue'
export default {
    props:['seller'],
    data() {
        return {
            detailShow:false,
            classMap:[]
        }
    },
    created () {
      this.classMap = ['decrease_1','discount_1','special_1','invoice_1','guarantee_1']  
    },
    methods: {
        showDetail(){
            this.detailShow = true;
        }
    },
    components: {
        star
    }
}
</script>

<style scoped lang="scss">
.seller-container{
    background: rgba(7,17,27,0.5);
    position: relative;
    .seller-body{
        display: flex;
        padding-top: 24px;
        padding-bottom: 10px;
        .seller-icon{
            width: 17%;
            height: 64px;
            margin-left: 24px;
            display: inline-block;
            border-radius: 4px;
            img{
                    height: 100%;
                    border-radius: 4px;
                }
        }  
         .seller-content{
            margin-left: 16px;
            width: 83%;
            .seller-title{
                font-size: 16px;
                color: rgb(255,255,255);
                font-weight: bold;
                line-height: 18px;
                margin-top: 2px;
                display: flex;
                .title-brand{
                    margin-right: 6px;
                }
                .title-brand::before{
                    content: url('../../../images/brand.png')
                }
            }
            .seller-desc{
                font-size: 12px;
                color: rgb(255,255,255);
                font-weight: 200;
                line-height: 20px;
                display: flex;
                margin-top: 5px;
            }
            .sub-desc{
                font-size: 10px;
                color: rgb(255,255,255);
                font-weight: 200;
                display: flex;
                .sub-desc-decrease{
                    padding-top: 3px;
                    margin-right: 4px;
                }
                .sub-desc-decrease::before{
                    content: url('../../../images/decrease_2.png')
                }
            }
            .supports{
                color: rgb(255,255,255);
                font-weight: 200;
                background: rgba(0,0,0,0.2);
                font-size: 12px;
                width: 45px;
                margin-right: 12px;
                padding-left: 8px;
                border-radius: 14px;
                position: relative;
                }
            } 
    }
    .seller-notice{
        height: 28px;
        background: rgba(7,17,27,0.2);
        .right{
            font-size: 10px;
            color: rgb(255,255,255);
            font-weight: 200;
            line-height: 28px;
            height: 100%;
            width: 100%;
            background: rgba(0,0,0,0.2);
            position: relative;
            padding-right: 18px;
            padding-left: 36px;
        }
        .right::before{
            content: url('../../../images/bulletin.png');
            position: absolute;
            top: 3px;
            left: 4px;
        }
    }
    .right::after{
            content: url('../../../images/right.png');
            position: absolute;
            right: 3px;
            top: 2px;
    } 
    // 背景虚化
    .bg{
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(2.5px);
    }
    .detail{
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        color: rgb(255,255,255);
        background: rgba(1,17,27,0.8);
        .detail-wrapper{
            min-height: 100%;
            width: 100%;
            .detail-main{
                margin-top: 64px;
                padding-bottom: 64px;
                .name{
                    font-size: 16px;
                    line-height: 16px;
                    text-align: center;
                    font-weight: 700;
                }
                .star-wrapper{
                    margin-top: 18px;
                    padding: 2px 0;
                    text-align: center;
                }
                .title{
                    display: flex;
                    margin: 28px auto 24px auto;
                    width: 80%;
                    .line{
                        flex: 1;
                        position: relative;
                        top: -6px;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                    }
                    .text{
                        padding: 0 12px;
                        font-weight: 700;
                        font-size: 14px;
                    }
                }
                .supports{
                    width:80%;
                    margin: 0 auto;
                    .support-item{
                        padding: 0 12px;
                        margin-bottom: 12px;
                        font-size: 0;
                        .icon {
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            vertical-align: top;
                            margin-right: 6px;
                            background-size: 16px;
                         }
                        .text {
                            line-height: 16px;
                            font-size: 12px;
                          }
                        } 
                        .support-item:last-child{
                            margin-bottom: 0;
                        }
                        
                }
                .seller-notice{
                    width: 80%;
                    margin: 0 auto;
                    .content{
                        padding: 0 12px;
                        line-height:24px;
                        font-size: 12px;
                        font-weight: 200;
                        color: rgb(255,255,255); 
                    }
                }
            }
        }
        .deail-close{
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0 auto;
            clear: both;
            font-size: 16px;
            .icon-close{
                 content: url('../../../images/close.png');
            }
        }
    }
}
.fade-enter-active, .fade-leave-active {
        transition: all .5s;
        opacity: 1;
        background: rgba(1,17,27,0.8);
}
.fade-enter, .fade-leave-to{
        opacity: 0;
        background: rgba(1,17,27,0);
}
.disp {
  display: flex;
  margin-top: 5px;
  justify-content: space-between;
  height: 25px;
  line-height: 25px;
}
</style>