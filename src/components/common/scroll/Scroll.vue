<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // 根据父组件传入的值决定如何侦测
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
          this.scroll.on('scroll', (position) => {
          // console.log(position)
          // 对外发送出去这个事件
            this.$emit('scroll', position)
          })
    }
    // 3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          //console.log('监听到滚动到底')
          this.$emit('pullingUp')
        })
      }
  },

    methods: {
      // 封装返回顶部这个方法， 并设置默认值
      scrollTo(x, y, time=300) {
        // 逻辑’与‘，只有当前面成立，后面才会继续执行
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 封装再次下拉的方法
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      // 封装刷新的这个方法
      refresh() {
        this.scroll && this.scroll.refresh()
         console.log('---刷一次---')
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>