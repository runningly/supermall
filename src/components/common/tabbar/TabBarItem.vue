<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 使用插槽 -->
    <div v-if="!isActive">
    <slot  name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
    <slot name="item-text"></slot>
    </div>
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    // 父传子，限制类型, 设置默认值
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
     // isActive: true
    }
  },
  computed: {
    isActive() {
      // $route代表当前活跃的对象
      return this.$route.path.indexOf(this.path) !== -1
      // 如果活跃对象的path和当前父组件传过来的path相等的话，返回true 
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)

      //console.log(this.path);
      //console.log(this.isActive);
    }
    
  },
}  
</script>

<style>
.tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /* 取消图片间隔 */
    vertical-align: middle
  }

  /* .active {
    color: red;
  } */
</style>