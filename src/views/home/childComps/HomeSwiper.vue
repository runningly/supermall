<template>
    <div>
        <swiper>
            <swiper-item v-for="(item,index) in banners" :key="index">
                <a :href="item.link">
                    <img :src="item.image" alt="" @load="imageLoad">
                </a>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    // 父（Home.vue）传过来banners
    props: {
      banners: {
        type: Array,
        // 默认值是一个函数
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>