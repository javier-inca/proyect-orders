<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
    <div class="flex justify-center bg-primary">
        <nav class="p-3 flex justify-end gap-10 text-white w-full max-w-3xl">
            <router-link 
                to="/"
                :class="{
                    'text-secondary':(route.path === '/')
                }"
                class="hover:text-secondary hover:scale-125 transition-transform">
                Home
            </router-link>

            <router-link 
                to="/users"
                :class="{
                    'text-secondary':(route.path === '/users')
                }"
                class="hover:text-secondary hover:scale-125 transition-transform duration-100">
                Users
            </router-link>

            <router-link 
                to="/products"
                :class="{
                    'text-secondary':(route.path === '/products')
                }"
                class="hover:text-secondary hover:scale-125 transition-transform duration-100">
                Products
            </router-link>

            <router-link 
                to="/orders"
                :class="{
                    'text-secondary':(route.path === '/orders' || route.path === 'NewOrder' || route.path === 'ShowOrder')
                }"
                class="hover:text-secondary hover:scale-125 transition-transform duration-100">
                Orders
            </router-link>
        </nav>
    </div>
</template>
