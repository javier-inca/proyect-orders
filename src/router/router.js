import { createRouter, createWebHistory } from "vue-router"
import Product from "../views/Product.vue"
import HomeStart from "../views/home/HomeStart.vue"
import HomeOrder from '../views/order/Home.vue'
import CreateOrder from "../views/order/Create.vue"
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
            component : HomeOrder,
        },
        {
            path : 'orders/create',
            component : CreateOrder,
        }
      ],
    },
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  
  export default router