<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll">
            <detail-swiper :top-image="topImage"/>
            <detail-bace-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="param" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>

        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <dateil-bottom-bar @addCart="addToCart"/>
    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaceInfo from "./childComps/DetailBaceInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DateilBottomBar from "./childComps/DateilBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import {itemListenerMixin, backTopMixin} from "common/mixin"
  import {debounce} from "../../common/utils";

  import { mapActions } from 'vuex'
   //import BackTop from "components/content/backTop/BackTop";
  //import {store} from "../../store/index"

  export default {
    name: "Detail",
    components: {
      DetailParamInfo,
      DetailNavBar,
      DetailSwiper,
      DetailBaceInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailCommentInfo,
      GoodsList,
      DateilBottomBar,

      Scroll,

    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImage: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    // 由于keep-alive了，所以不会销毁，再进来不会执行created方法了，但会执行active方法
    created() {
      // 1.保存传入的iid
      // $route代表当前活跃的对象
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {

        // 1.获取数据, 获取顶部图片轮播数据
        const data = res.result
        // console.log(res)

        // 2.获取顶部图片轮播数据
        this.topImage = data.itemInfo.topImages

        // 3.获取商品信息
        // 把数据请求下来，传到类的构造函数里面，整合起来。
        // 使goods直接获得了多个需要用到的属性，里面数据存储的数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 4.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 5.获取商品的详细信息
        this.detailInfo = data.detailInfo

        // 6.获取商品的参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 7.取出参数的信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // 1.第一次获取，值不对，
        // 原因：$refs.param.$el没有渲染
        // this.themeTopYs = []
        //
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)

        // 渲染结束回调这个函数
        //this.$nextTick(() => {
        // 2.第二次获取：值不对
        // 值不对的原因： 图片没有计算在内
        // 根据最新的数据， 对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完（目前获取到的offsetTop不包含其中的图片）
        // offsetTop值不对，都是因为图片的问题
        //   this.themeTopYs = []
        //
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs)
        // })
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.list
      })

      // 无法调用防抖，原因未知
      // this.getThemeTopY = debounce(this._getOffsetTops(), 200)

    },
    updated() {
      //this._getOffsetTops()
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
      // console.log('详情页已被销毁!')
    },

    activated() {
    },

    methods: {
      // 把vuex下actions里的addCart映射到methods里
      ...mapActions(['addCart']),
      imageLoad() {
        this.newRefresh()


        // 4.给getThemeTopY赋值
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        // 给上一个最大值
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs)
      },
      titleClick(index) {
        // console.log(index,this.$refs.params.$el.offsetTop)
        // 传入的各个y值，正好和下标index一一对应
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },

      contentScroll(position) {
         // console.log(position)
        // 1.获取y值
        const positionY = -position.y

        // 2.positoinY和主题中值进行对比
        // [0, 7938, 9120, 9452, Number.MAX_VALUE]

        // positoinY 在 0 和 7938 之间， index = 0
        // positoinY 在 =7938 和 9120 之间， index = 1
        // positoinY 在 =9120 和 9452 之间， index = 2
        // positoinY 在 =9452 和 Number.MAX_VALUE 之间， index = 3
        let length = this.themeTopYs.length
        for (let i = 0; i < length-1 ; i++) {

          // (技巧方法) 添加一个js中最大的值，用来减少if中的条件
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i]
            && positionY < this.themeTopYs[i+1])) {
                this.currentIndex = i
                this.$refs.nav.currentIndex = this.currentIndex
            // console.log(this.currentIndex)
          }

          // 普通方法
          // if ( this.currentIndex !== i && i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]
          //   || (this.currentIndex !== i && i === length - 1 && positionY >= this.themeTopYs[i])){
          //   this.currentIndex = i
          //   console.log(this.currentIndex)
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }

          // 判断BackTop是否显示
          this.listenShowBackTop(position)

        }
      },

      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.imgage = this.topImage[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 2.将商品添加到购物车里(1.Promise 2.mapActions)
        this.addCart(product).then(res => {
          this.$toast.show(res, 2000)
        })
        // this.$store.dispatch("addCart", product).then(res => {
        //   console.log(res)
        // })

      },
      _getOffsetTops() {
        this.getThemeTopY = debounce(() => {
          this.themeTopYs = []

          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
          console.log(this.themeTopYs)
        })

      }
    }
  }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: white;
        height: 100vh;

    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: white;
    }

    .content {
        height: calc(100% - 44px - 50px);
        /* 固定长，让滚轮无效 */
        overflow: hidden;
    }
</style>