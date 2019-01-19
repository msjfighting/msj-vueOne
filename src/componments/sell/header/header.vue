<template>
    <div class="seller-container">
        <div class="seller-body">
            <span class="seller-icon">
                    <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" alt="">
            </span>
            <div class="seller-content">
                <span class="seller-title"> <i class="title-brand"></i> 粥品相仿</span>
                <span class="seller-desc">蜂鸟转送</span>
                <div class="disp">
                    <span class="sub-desc"><i class="sub-desc-decrease"></i>在线支付满28减28</span>
                    <span class="supports">5个</span>
                </div>
            </div>
        </div>
      
      <div class="seller-notice">
          <span class="ellipsis"><i class="bulletin-icon"></i> 在线支付满28减28在线支付满28减28在线支付满28减28在线支付满28减28 </span>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style scoped lang="scss">
.seller-container{
    background: rgba(7,17,27,0.5);
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
            .supports::after{
                    content: url('../../../images/right.png');
                    position: absolute;
                    right: 3px;
                    top: 2px;
                }
            } 
    }
    .seller-notice{
        height: 28px;
        background: rgba(7,17,27,0.2);
        span{
            font-size: 10px;
            color: rgb(255,255,255);
            font-weight: 200;
            line-height: 28px;
            background: rgba(0,0,0,0.2);
        }
        .bulletin-icon{
            content: url('../../../images/bulletin.png')
        }
    }
    
}
.disp {
  display: flex;
  margin-top: 5px;
  justify-content: space-between;
  height: 25px;
  line-height: 25px;
}
</style>