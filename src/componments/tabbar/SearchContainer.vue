<template>
  <div class="main-view">
    <div class=" topics">
      <div class="hot">
        <span class="hot-topics disp x">热门专题</span>
        <span class="collection-change disp" @click="getHotTopics">换一换</span>
      </div>
      <div class="category">
        <a  :href="'https://www.jianshu.com/c/'+item.slug+'?utm_source=mobile&utm_medium=collections'" v-for="item in hottopics" :key="item.id">{{ item.title }}</a>
      </div>
    </div>
    <div class=" hr"></div>
    <div class=" article">
      <span class="article-title disp x">热门文章</span>
      <ul class="article-content">
        <li v-for="item in list" :key="item.object.data.id" tag="li">
          <a :href="'https://www.jianshu.com/p/'+item.object.data.slug" :class=" item.object.data.list_image_url.length >0 ? ['disp','have-img']:['disp'] ">
              <span class="article-img" style="width: 80px; height: 80px;" v-show="item.object.data.list_image_url.length >0 ? true : false">
                <img :src="item.object.data.list_image_url + '?imageMogr2/auto-orient/strip|imageView2/1/w/160/h/160/format/webp'" alt>
            </span>
            <div class="content">
              <h1 class="ellipsis">{{ item.object.data.title }}</h1>
              <p class="ellipsis">{{ item.object.data.public_abbr }}</p>
            </div>
          </a>
          <div class="author">
            <span>
              <img class="author-img" :src="item.object.data.user.avatar" alt>
              {{ item.object.data.user.nickname }}
            </span>
            <span>
              <i class="comment-number"></i>
              {{ item.object.data.likes_count }}
            </span>
            <span>
              <i class="praise-number"></i>
              {{ item.object.data.public_comments_count }}
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div v-show="isShowLoadMore">
        <span class="load-more" @click="getList">展开更多文章</span>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      list: [],
      note_ids: [],
      hottopics: [],
      except_collection_ids: [],
      isShowLoadMore:false
    };
  },
  created() {
    this.getHotTopics();
    this.getList();
  },
  methods: {
    getHotTopics() {
      Indicator.open();
      var url = "/jianshu/asimov/subscriptions/recommended_collections";
      this.$http
        .get(url, {
          params: {
            except_collection_ids: this.except_collection_ids
          }
        })
        .then(res => {
          Indicator.close();
          this.hottopics = res.body;
          res.body.forEach(item => {
            this.except_collection_ids.push(item.id);
          });
        })
        .catch(err => {
          Indicator.close();
          console.log(err);
        });
    },
    getList() {
        Indicator.open();
      var url = "/jianshu/asimov/trending/now";
      this.$http
        .get(url, {
          params: {
            count: 15,
            note_ids: this.note_ids
          }
        })
        .then(res => {
          Indicator.close();
          this.list = this.list.concat(res.body);         
          if(res.body.length > 0 ) {
              this.isShowLoadMore = true;
          }
          res.body.forEach(item => {
            this.note_ids.push(item.object.data.id);
          });
        })
        .catch(err => {
          Indicator.close();
          console.log(err);
        });
    },
  }
};
</script>

<style scoped lang="scss">
.main-view {
  margin: 0px;
  padding: 0px;
  .topics {
    .hot {
      font-size: 15px;
      display: flex;
      justify-content: space-between;
      margin: 5px 15px;
      .collection-change {
        font-size: 13px;
        color: #888;
        right: 10px;
      }
      .collection-change::before {
        content: url("../../images/change.png");
        width: 14px;
        height: 14px;
        display: inline-block;
        line-height: 26px;
        margin-right: 5px;
      }
    }
  }
  .category {
    font-size: 14px;
    margin: 10px 17px;
    padding: 10px 0px;
    a {
      color: #ea6f5a;
      margin: 0px 12px 12px 0px;
      padding: 2px 10px;
      display: inline-block;
      border: 1px solid #ea6f5a;
      border-radius: 8px;


      
    }
  }
  .article {
    font-size: 14px;

    .article-title {
      margin: 5px 15px;
    }

    .article-content {
      width: 100%;
      margin: 0px;
      padding: 0px;
      list-style-type: none;
      li {
        padding: 0px 15px;
        margin: 0 2px;
        border-bottom: solid 1px #f0f0f0;
        position: relative;
        a{
            display: block;

        }
      }
      .content {
        h1 {
          font-size: 18px;
          color: #333;
          max-height: 50px;
          line-height: 22px;
        }
        p {
          max-height: 38px;
          line-height: 17px;
          font-size: 13px;
        }
      }
      .article-img {
        position: absolute;
        top: 50%;
        right: 15px;
        margin-top: -40px;
        width: min-content; 
        overflow: hidden;
        text-align: center;
        img{
            height: 100%;
            max-width: 100%;
        }
      }
      .author {
        display: flex;
        height: 30px;
        margin-bottom: 10px;
        span {
          font-size: 12px;
          color: #888;
          margin: 0px 25px 0px 0px;
          line-height: 30px;
          vertical-align: middle;
        }
        i {
          position: relative;
        }
        .comment-number::before {
          content: url("../../images/comment.png");
          position: absolute;
          right: 2px;
          top: -5px;
        }
        .praise-number::before {
          content: url("../../images/zan.png");
          position: absolute;
          right: 2px;
          top: -5px;
        }
        .author-img {
          height: 20px;
          width: 20px;
          border-radius: 20px;
          vertical-align: middle;
        }
      }
    }
  }
  .load-more{
      display: block;
      color: #969696;
      font-size:15px;
      text-align: center;
      line-height: 50px;
  }
  .load-more::after{
      content:  url("../../images/xiala.png");
  }
  .hr{
    margin-left: -18px;
    margin-right: -18px;
    border-width: 0;
    height: 10px;
    background-color: #f5f5f5;
  }
}
.disp {
  display: flex;
}
.have-img{
    padding-right: 90px;
}
.x::before {
  content: "";
  width: 2px;
  height: 13px;
  background: #ea6f5a;
  display: inline-block;
  margin-right: 5px;
  margin-top: 4px;
}
</style>