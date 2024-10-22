import { createRouter, createWebHistory } from "vue-router";
import CreateUser from "../views/CreateUser.vue";
import Product from "../views/Product.vue";
import HomeStart from "../views/HomeStart.vue";
import Order from "../views/Order.vue";

const routes =[
    {
        path: '/',
        name: 'Home',
        component: HomeStart
    },
    {
        path: '/users',
        name: 'User',
        component : CreateUser
    },
    {
        path: '/products',
        name: 'Product',
        component: Product
    },
    {
        path: '/orders',
        name: 'Order',
        component: Order
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;