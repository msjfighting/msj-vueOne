<template>
    <div class="cmt-content">
        <h3>发表评论</h3>
        <textarea placeholder="请输入要评论的内容(最多评论120字)" maxlength="120" v-model="text"></textarea>
        <mt-button type="primary" size="large" @click.native="sendComment">发表评论</mt-button>
       <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in contentList" :key="item.id">
                 <h3 class="item-user">{{item.user}}</h3>
                 <div class="item-content">{{item.content}}</div>
                 <div class="item-ellipsis">
                        <span class="item-sendtime">{{item.time | dateFormat}}</span>
                        <p class="item-text">
                            <a href="" :style="{color:item.islaud == 0 ? '#c8c7cc' :'#007aff'}" @click.prevent="linkClick(item.id)"><span class="mui-icon-extra mui-icon-extra-heart-filled"></span></a>
                            <span class="item-count">评论数:{{item.laud}}</span>
                        </p>
                 </div>
                 <div class="reply-body">
                        <div class="cmt-body" v-for="reply in replyList[i]" :key="reply.user_id">
                            <div class="cmt-user">{{reply.user}}</div>
                            <div class="cmt-content1">{{reply.content}}</div>
                            <div class="item-ellipsis">
                                <span class="cmt-sendtime">{{reply.time | dateFormat}}</span>
                                <span class="cmt-love-count">点赞数:{{reply.laud}}</span>
                            </div>
                        </div>
                </div>   
                
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click.native="loadMoreData">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    data () {
        return {
            contentList:[],
             replyList:[],
             page:1,
             text:''
        }
    },
    created() {
        this.getReplyList()
    },
    // updated() {
    //     window.scroll(0, 0); // 解决父页面滚动时,导致此页面无法从顶部显示的问题
    // },
    methods: {
        getReplyList(){
            Indicator.open('加载中...');
            var url = this.common.api + '/api/public/'
            this.$http.post(url,
                {
                service:"App.Comment_CURD.Get_list",
                page:this.page,
                perpage:5,
                type:"app"
                })
                .then((res) => {
                    Indicator.close();
                    if (res.body.code == 200) {
                         this.contentList = this.contentList.concat(res.body.data)
                          res.body.data.forEach(elem => {
                                    var replyS = elem.reply;
                                    this.replyList.push(replyS)
                                });
                    }else{
                       Toast('获取评论失败');
                    } 
                })
                .catch((err) => {
                    Indicator.close();
                    console.log(err);
                })
        },
        // 点赞
    linkClick(id){
        Indicator.open()
       var url = this.common.api + '/api/public/'
       this.$http.post(url,
       {
           service:'App.Comment_CURD.New_laud',
           token:'2e2b2c2a8fcd937d97f38d26b49d6bd9',
           type:'app',
           userid:'1019',
           commentid:id
       })
       .then((res) => {
            Indicator.close();
            if (res.body.code == 200) {
                if(res.body.data == 0){
                    Toast('点赞成功');
                }else{
                    Toast('取消点赞成功');
                }
            this.getReplyList()
            }else{
                Toast('网络请求失败');
            } 
            })
        .catch((err) => {
            Indicator.close();
            console.log(err);
        })
      },
      loadMoreData(){
          this.page ++
          this.getReplyList()
      },
      sendComment(){
          if(this.text.trim().length == 0){
                return Toast('评论内容不可为空!')
          }
          Indicator.open();
        var url = this.common.api + '/api/public/'
            this.$http.post(url,
            {
                service:'App.Comment_CURD.Add',
                token:'2e2b2c2a8fcd937d97f38d26b49d6bd9',
                type:'app',
                userid:'1019',
                content:this.text.trim()
            })
            .then((res) => {
                Indicator.close();
                if (res.body.code == 200) {
                    if(res.body.data == 1){
                        Toast('发表评论成功');
                        // var cmt = {user:'用户113564',content:this.text.trim(),time:new Date(),laud:0,islaud:0}
                        this.contentList = [];
                        this.getReplyList()
                        // this.contentList.unshift(cmt);
                        this.text = ""
                    }else{
                        Toast('发表评论失败');
                    }
                }else{
                    Toast('网络请求失败');
                } 
                        })
            .catch((err) => {
                Indicator.close();
                console.log(err);
            })
      }
    },
}
</script>

<style scoped lang="scss">
.cmt-content {
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0
    }
    button{
        margin: 10px 0px;
    }
    .cmt-list {
        font-size: 14px;
        margin: 5px 0;
         .item-ellipsis {
                  margin-top: 5px;
                  padding-left: 5px;
                  padding-right: 10px;
                  color: #8f8f94;
                  display: flex;
                  height: 30px;
                  justify-content:space-between; 
              }
          .cmt-item {
              .item-user {
                    margin-left: 10px; 
                    font-size: 13px;  
              }
              .item-text {
                  span{
                      text-align: center;
                  }
              }
              input{
                  float: right;
              }
               .reply-body {
                    border: solid 1px #cccccc;
                    .cmt-body {
                        font-size: 13px;
                        text-indent: 2em;
                        color: #929292;
                        .cmt-content1 {
                            text-indent: 4em;
                        }
                }
              
          }
          } 
    }
}
</style>
					
					
					
					
					
					
					