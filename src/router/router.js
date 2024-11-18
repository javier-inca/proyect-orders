import { createRouter, createWebHistory } from "vue-router"
import Product from "../views/Product.vue"
import HomeStart from "../views/home/HomeStart.vue"
import OrderHome from '../views/order/home.vue'
import NewOrder from "../views/NewOrder.vue"
import MainLayout from "../layouts/MainLayout.vue"
import UserHome from "../views/user/Home.vue"

const routes = [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
            path: '', 
            component: HomeStart, 
        },
        {
            path: 'users',
            component: UserHome
        },
        {
            path : 'products',
            component : Product,
        },
        {
            path : 'orders',
            component : OrderHome,
        },
        {
            path : 'orders/create',
            component : NewOrder,
        }
      ],
    },
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  
  export default router