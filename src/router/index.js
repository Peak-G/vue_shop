import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)
const Login = () => import('../views/Login')
const Home = () => import('../views/Home')
const Welcome = () => import('../views/Welcome')
const Users = () => import('../views/user/Users')
const Rights = () => import('../views/power/Rights')
const Roles = () => import('../views/power/Roles')
const Categories = () => import('../views/goods/Categories')
const Params = () => import('../views/goods/Params')
const List = () => import('../views/goods/List')
const Add = () => import('../views/goods/Add')
const Order = () => import('../views/order/Order')
const Report = () => import('../views/report/Report')
const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Categories
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/goods',
        component: List
      },
      {
        path: '/goods/add',
        component: Add
      },
      {
        path: '/orders',
        component: Order
      },
      {
        path: '/reports',
        component: Report
      },
    ]
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // const tokenStr = store.state.token
  // if (!tokenStr) return next('/login')
  // next()
  // 方式二
  next(vm => {
    const tokenStr = this.$store.state.token
    if (!tokenStr) return next('/login')
  })
})
export default router
