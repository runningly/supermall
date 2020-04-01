<template>
    <!--拿到数据后，详细的商品展示以及布局    -->
    <div class="goods-item">
        <img v-lazy="showImage" alt=""
             @load="imageLoad"
             @click="itemClick">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      },
      data() {
        return {

        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() {
        // 发射出去这个事件
        // 通过路由来判断 首页和详情页谁启动防抖
        //  if (this.$route.path === ('/home')) {
        // this.$bus.$emit('itemImageLoad')
        // }else {
        //    this.$bus.$emit('itemImageLoad')
        //  }
        this.$bus.$emit('itemImageLoad')
      },

      // 点击后进入详情页面
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
    .goods-item {
        padding-bottom: 40px;
        position: relative;

        width: 48%;
    }

    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }

    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }

    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }

    .goods-info .collect {
        position: relative;
    }

    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>