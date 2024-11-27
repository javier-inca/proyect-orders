import { createRouter, createWebHistory } from "vue-router"
import HomeStart from "../views/home/HomeStart.vue"
import HomeOrder from '../views/order/Home.vue'
import HomeProduct from '../views/product/Home.vue'
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
            component: UserHome,
            name: 'User Home',
        },
        {
            path : 'products',
            component : HomeProduct,
            name: 'Product Home',
        },
        {
            path : 'orders',
            component : HomeOrder,
            name: 'Order Home',
        },
        {
            path : 'orders/create',
            component : CreateOrder,
            name: 'New Order',
        }
      ],
    },
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  
  export default router