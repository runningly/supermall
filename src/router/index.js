import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const cart = () => import('../views/cart/cart.vue')
const category = () => import('../views/category/category.vue')
const profile = () => import('../views/profile/profile.vue')
const Detail = () => import('../views/detail/Detail.vue')
// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes =[
  {
    path: '',
    // 重定向
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
