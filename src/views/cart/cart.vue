<template>
  <div class="cart">
      <nav-bar class="nav-bar">
          <div slot="center">购物车({{length}})</div>
      </nav-bar>
      <!-- 商品的列表 -->
      <cart-list/>

      <!-- 底部汇总 -->
        <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from 'vuex'

export default {
  name: 'cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // mapGetters 辅助函数仅仅是将store中的getter 映射到局部计算属性：
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>

<style scoped>
    .cart {
        height: 100vh;
    }

    .nav-bar {
        background-color: var(--color-tint);
        color: #ffffff;
    }
</style>