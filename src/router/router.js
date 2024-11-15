import { createRouter, createWebHistory } from "vue-router";
import CreateUser from "../views/CreateUser.vue";
import Product from "../views/Product.vue";
import HomeStart from "../views/home/HomeStart.vue";
import Order from "../views/Order.vue";
import NewOrder from "../views/NewOrder.vue";
import OrderShow from "../views/OrderShow.vue";
import MainLayout from "../layouts/MainLayout.vue";

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
            path : 'products',
            component : Product,
        }
      ],
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;

/*     {
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
    },
    {
        path: '/orders/create',
        name: 'NewOrder',
        component: NewOrder
    },
    {
        path: '/orders/:id/show',
        name: 'ShowOrder',
        component: OrderShow,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router; */