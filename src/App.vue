<template>
  <div class="app-container">
    <!-- 顶部 header -->
    <headervue :styleobj="styleobj" :isShow="isShow"></headervue>
    <!-- 中间路由 router-view-->
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <!-- 底部tabbar -->
    <tabbar></tabbar>
  </div>
</template>
<script>
import headervue from "../src/comm/Header.vue";
import tabbar from "../src/comm/TabBar.vue";
export default {
  data() {
    return {
      transitionName: "slide-left",
      styleobj: {},
      isShow: false
    };
  },
  components: {
    // 注册子组件
    headervue: headervue,
    tabbar: tabbar
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
}
.child-view {
  width: 100%;
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
  position: absolute;
}
</style>
