<template>
    <div class="goods">
        <!-- 遍历后，再发送数据给子组件进行展示        -->
        <goods-list-item v-for="(item,index) in goods" :goods-item="item" :key="index"/>
    </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    // 接收父组件Home.vue发送过来的数据
    props: {
     goods: {
       type: Array,
       default() {
         return []
       }
     }
    }
  }
</script>

<style scoped>
    .goods {
        display: flex;
        flex-wrap: wrap;
        /* 均等分   */
        justify-content: space-around;

        padding: 2px;
    }
</style>