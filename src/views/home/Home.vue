<template>
    <div id="home">
        <!-- 可复用的导航（顶部）      -->
        <nav-bar class="home-nav">
            <div slot="center">购物街</div></nav-bar>
        <!--    吸顶效果    -->
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl1"
                     class="top-content" v-show="isTabFixed"/>

        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadmore">

        <!-- 轮播图      -->
        <home-swiper :banners="banners"
                     @swiperImageLoad="swiperImageLoad"/>
        <!-- 推荐部分      -->
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <!-- 三个选项以及下面的商品展示        -->
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl2"/>
        <goods-list :goods="showgoods"/>
        </scroll>
        <!--  返回顶部的按钮   .native:监听组件根元素的原生事件   -->
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
  // 引入首页各个封装好的子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  // 引入公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  // 引入数据
  import {getHomeMultidata, getHomeGoodes} from "network/home";
  // import {debounce} from "common/utils";
   import {itemListenerMixin} from "common/mixin"

  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  export default {
    name: 'Home',
    components: {
      RecommendView,
      HomeSwiper,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
     mixins: [itemListenerMixin],
    data() {
      return {
        banners: [], // 存储轮播图数据
        recommends: [], // 存储推荐信息的数据
        goods: { // 存储商品展示的数据
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
      }
    },
    computed: {
      showgoods() {
        return this.goods[this.currentType].list
      }
    },
    // 销毁
    destroyed() {
      // console.log('home已经被销毁')
    },
    activated() {
      // console.log('home已经开始活跃了')
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)

    },
    deactivated() {
      // console.log('home已经无效了')
      // 1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 2.取消全局事件的监听
       // this.$bus.$off('itemImageLoad', this.itemImgListener)
    },


    created() {
      // 1.请求多个数据，res拿到请求的结果
      this.getHomeMultidata()

      // 2.请求商品数据,将goods数组里的对象依次传入
      this.getHomeGoodes('pop')
      this.getHomeGoodes('new')
      this.getHomeGoodes('sell')

    },

    mounted() {

   },
    methods: {
      /*
      * 事件监听的相关方法
      * */
        // 点击事件->加载相应的数据
        tabClick(index) {
          //console.log(index)
          switch (index) {
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
          // 使两个选项保持一致
          this.$refs.tabControl1.currentIndex = index
          this.$refs.tabControl2.currentIndex = index
        },
        // 上拉返回
         backClick() {
        this.$refs.scroll.scrollTo(0, 0,1000)
           //console.log(this.$refs.scroll.scrollTo)
      },
        // 上拉返回键的隐藏事件
        contentScroll(position) {
          // 1.判断BackTop是否显示
          this.isShowBackTop = (-position.y) > 1000

          // 2.决定tabControl是否吸顶（position: fixed）
          this.isTabFixed = (-position.y) > this.tabOffsetTop
        },


        // 上拉加载更多
      loadmore() {
        console.log('下拉加载更多')
        this.getHomeGoodes(this.currentType)
      },
      // 2.获取tabControl的offsetTop
       // 轮播图加载后才会执行此函数
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /*
      * 网络请求相关的方法
      * */
      // 把请求包在函数里，更加简洁
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
          //console.log(res)
        })
      },
      getHomeGoodes(type) {
        const page = this.goods[type].page + 1

        getHomeGoodes(type, page).then(res => {
          // console.log(res)
          // 根据名字和页码， 动态的拿到对应的数据，并存储到goods数组中的对应的对象，的list数组中
          this.goods[type].list.push(...res.data.list)
          // 请求到一页page+1
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
    },
  }
</script>

<style scoped>
    #home {
        /*padding-top: 44px;*/
        height: 100vh;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        /* 原生滚动时， 为了让导航不跟随滚动 */
        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        z-index: 9;
    }

    .content {
        overflow: hidden;
        /*height: calc(100% - 93px);*/
        /*margin-top: 88px;*/

        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    .top-content {
        position: relative;
        z-index: 9;
        /*background-color: aquamarine;*/
    }
</style>