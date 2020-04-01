<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button
                    :is-checked="isSelectAll"
                    class="check-button" @click.native="checkClick"/>
            <span>全选</span>
        </div>

        <div class="price">
            合计：{{totalPrice}}
        </div>

        <div class="calculate" @click="calcClick">
            结算({{checkLength}})
        </div>
    </div>
</template>

<script>
    import CheckButton from "components/content/checkButton/CheckButton";
    import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),

      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          // 筛选出checked为true的
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
          //  保留两位小数
        }, 0).toFixed(2)
      },
      checkLength() {
        // 过滤出选中的商品，并且得到数量
        return this.cartList.filter(item => item.checked).length
      },

      isSelectAll() {
        if (this.cartList.length === 0) return  false

        // 1.使用filter，过滤出没有选中的商品，并得到数量。若存在，则全选按钮不选中
        // return  !(this.cartList.filter(item => !item.checked).length)

        // 2.或者使用find方法，当找到有一个商品未选中，则全选按钮未选中
        // return !this.cartList.find(item => !item.checked)

        // 3.普通的遍历方法
        for (let item of this.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //当全部被选中，（isSelectAll（）返回的为true时）
          this.cartList.forEach(item => item.checked = false) // 点击后把商品都改成不选中
        } else { // 当部分或全部不选中
          this.cartList.forEach(item => item.checked = true) // 把商品改成选中
        }
      },
      calcClick() {
        if (!this.isSelectAll){ // 当全选按钮没有被点亮时
          this.$toast.show('请选择购买的商品', 2000)
        }
      }
    }
  }
</script>

<style scoped>
    .bottom-bar {
        position: relative;
        display: flex;

        height: 40px;
        line-height: 40px;
        background-color: #eeeeee;
        font-size: 16px;
    }
    .check-content {
        display: flex;
        align-items: center;
        position: relative;

    }
    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-left: 20px;
        margin-right: 5px;
    }
    .price {
        margin-left: 20px;
        flex: 1;
    }
    .calculate {
        width: 90px;
        background: #ff8198;
        color: #ffffff;
        text-align: center;
    }

</style>