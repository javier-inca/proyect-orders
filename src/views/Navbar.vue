<script setup>
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import Title from '../components/Title.vue';

const route = useRoute()

const showMenu = ref(false)
</script>

<template>
    <div class="flex justify-center bg-primary border-b border-secondary">
        <!-- Direcciones vista de computadoras -->
        <nav class="p-3 sm:flex justify-end gap-10 text-white w-full max-w-3xl hidden">
            <router-link 
                to="/"
                :class="{
                    'text-secondary scale-125':(route.path === '/')
                }"
                class="hover:text-secondary hover:scale-125 transition-transform">
                Home
            </router-link>

            <router-link 
                to="/users"
                :class="{
                    'text-secondary scale-125':(route.path === '/users')
                }"
                class="hover:text-secondary hover:scale-125 transition-transform duration-100">
                Users
            </router-link>

            <router-link 
                to="/products"
                :class="{
                    'text-secondary scale-125':(route.path === '/products')
                }"
                class="hover:text-secondary hover:scale-125 transition-transform duration-100">
                Products
            </router-link>

            <router-link 
                to="/orders"
                :class="{
                    'text-secondary scale-125':(route.path === '/orders' || route.path === '/orders/create' || route.path === 'ShowOrder')
                }"
                class="hover:text-secondary hover:scale-125 transition-transform duration-100">
                Orders
            </router-link>
        </nav>

        <!-- Icono menu y titulo -->
        <nav class="p-3 sm:hidden w-full flex justify-between items-center">
            <router-link
                to="/">
                <Title
                    class="sm:hidden text-white"
                    title="Home"/>
            </router-link>

            <Bars3Icon
                @click="showMenu = !showMenu"
                :class="{
                    'rotate-180' : showMenu
                }"
            class="size-6 text-white transition-all duration-500"/>           
        </nav>
    </div>

    <!-- Menu desplegable --> 
    <div 
        v-if="showMenu"
        class=" absolute z-40 flex justify-between w-full bg-primary h-lvh bg-opacity-40">
        <div
            class="w-1/2"
            @click="showMenu = false">
        </div>

        <div class=" flex flex-col w-1/2 bg-primary border-secondary border-l">
            <div class=" flex justify-end w-full">
                <XMarkIcon
                    @click="showMenu = false"
                    class="size-6 text-white m-3"/>
            </div>

            <div class="flex flex-col gap-5">
                <router-link 
                    to="/"
                    @click="showMenu = false"
                    :class="{
                        '!text-secondary scale-110':(route.path === '/')
                    }"
                    class="text-white transition-all border-b-2 pl-8 border-light-secondary border-opacity-20">
                    Home
                </router-link>

                <router-link 
                    to="/users"
                    @click="showMenu = false"
                    :class="{
                        '!text-secondary scale-110':(route.path === '/users')
                    }"
                    class="text-white transition-all border-b-2 pl-8 border-light-secondary border-opacity-20">
                    Users
                </router-link>

                <router-link 
                    to="/products"
                    @click="showMenu = false"
                    :class="{
                        '!text-secondary scale-110':(route.path === '/products')
                    }"
                    class="text-white transition-all border-b-2 pl-8 border-light-secondary border-opacity-20">
                    Products
                </router-link>

                <router-link 
                    to="/orders"
                    @click="showMenu = false"
                    :class="{
                        '!text-secondary scale-110':(route.path === '/orders' || route.path === '/orders/create' || route.path === 'ShowOrder')
                    }"
                    class="text-white transition-all border-b-2 pl-8 border-light-secondary border-opacity-20">
                    Orders
                </router-link>
            </div>
        </div>
    </div>
</template>
