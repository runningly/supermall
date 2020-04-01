<template>
  <div id="app">
      <keep-alive exclude="Detail">
          <router-view/>
      </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
    import MainTabBar from "components/content/mainTabbar/MainTabBar";

  export default {
    name: 'App',
    components: {
      // 来此处注册
      MainTabBar,


    }
  }
</script>

<style>
@import "assets/css/base.css";
</style>
