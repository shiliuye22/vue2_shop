import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import List from '../components/goods/List.vue'
import Orders from '../components/order/Order.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'login' },
  { path: '/login', component: Login },
  {
    path: '/home', redirect: '/welcome', component: Home, children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path:'/users',
        component:Users
      },
      {
        path:'/rights',
        component:Rights
      },
      {
        path:'/roles',
        component:Roles
      },
      {
        path:'/categories',
        component:Cate
      },
      {
        path:'/params',
        component:Params
      },
      {
        path:'/goods',
        component:List
      },
      {
        path:'/orders',
        component:Orders
      }

    ]
  }
]
const router = new VueRouter({
  routes
})
// 导航守卫 
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数 表示放行
  // next（）放行 next（'/login'） 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const toKenStr = window.localStorage.getItem('token')
  if (!toKenStr) return next('/login')
  next()

})


export default router
