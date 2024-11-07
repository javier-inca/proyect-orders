<script setup>
import Navbar from './Navbar.vue'
import Title from '../components/Title.vue'
import { PlusIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import TableOrder from './components/TableOrder.vue';

</script>

<template>
    <div class="relative">
        <div class="fixed z-0 w-full">
            <Navbar/>

            <div class="flex justify-center">
                <div class="flex justify-between w-full m-3 mx-6 md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12 items-center">
                    <Title 
                        size="sm"
                        title="Orders List"/>

                    <router-link
                        to="/orders/create"
                        class="p-2 rounded-full bg-primary flex hover:scale-105 transition-transform">
                        <p class=" text-sm px-2">
                            New Order
                        </p>

                        <PlusIcon
                            class="size-5 text-black-custom"/>
                    </router-link>
                </div>
            </div>

            <div class="flex justify-center">
                <TableOrder
                    class=" w-full md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12"/>
            </div>
        </div>
    </div>
</template>