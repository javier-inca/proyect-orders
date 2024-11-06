<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
    <div class="flex justify-center bg-black-custom">
        <nav class="p-5 flex justify-end gap-10 text-white w-full md:w-2/3 lg:w-1/2 2xl:w-2/5">
            <router-link 
                to="/"
                :class="{
                    'text-primary':(route.name === 'Home')
                }"
                class="hover:text-primary hover:scale-125 transition-transform duration-100">
                Home
            </router-link>

            <router-link 
                to="/users"
                :class="{
                    'text-primary':(route.name === 'User')
                }"
                class="hover:text-primary hover:scale-125 transition-transform duration-100">
                Users
            </router-link>

            <router-link 
                to="/products"
                :class="{
                    'text-primary':(route.name === 'Product')
                }"
                class="hover:text-primary hover:scale-125 transition-transform duration-100">
                Products
            </router-link>

            <router-link 
                to="/orders"
                :class="{
                    'text-primary':(route.name === 'Order')
                }"
                class="hover:text-primary hover:scale-125 transition-transform duration-100">
                Orders
            </router-link>
        </nav>
    </div>
</template>
