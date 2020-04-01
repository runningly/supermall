import {debounce} from "./utils"
import BackTop from "components/content/backTop/BackTop";
// 要混入的内容
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
    mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 300)
    // 对监听的事件进行保存
    this.itemImgListener = () => {
      this.newRefresh()
      console.log('刷新一次')
    }
     //console.log('防抖启动成功')
    this.$bus.$on('itemImageLoad', this.itemImgListener)
      //console.log('我是混入的内容')
  }
}

// 返回顶部按钮
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0,1000)
      // console.log(this.$refs.scroll.scrollTo)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
