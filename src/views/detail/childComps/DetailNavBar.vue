<template>
    <div>
        <NavBar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div class="title-item"
                     v-for="(item,index) in titles"
                     :key="index"
                     :class="{active:index === currentIndex }" @click="titleClick(index)">
                    {{item}}
                </div>
            </div>
        </NavBar>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DateilNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        // -1表示返回多少级，两种方法都可用
        //this.$router.go(-1)
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
    .title {
        display: flex;
        font-size: 15px;
    }

    .title-item {
        flex: 1;
    }
    .active {
        color: var(--color-high-text);
    }
    .back img {
        margin-top: 12px;
    }
</style>