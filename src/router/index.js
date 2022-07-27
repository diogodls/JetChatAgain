import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import HomeChat from '@/components/HomeChat.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login,
  },
  {
    path: '/chatHome',
    name: 'HomeChat',
    component: HomeChat,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
