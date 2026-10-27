import Vue from 'vue'
import VueRouter from 'vue-router'
import StockBaTemp from '@/views/StockBaTemp.vue'
import TrackingOrder from '@/views/trackingOrder.vue'
import InputOrder from '@/views/inputOrder.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'StockBaTemp',
    component: StockBaTemp
  }, {
    path: '/tracking',
    name: 'trackingOrder',
    component: TrackingOrder
  }, {
    path: '/input',
    name: 'inputOrder',
    component: InputOrder
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
