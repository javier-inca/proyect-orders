<script setup>
import Navbar from './Navbar.vue'
import Title from '../components/Title.vue'
import { PlusIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref } from 'vue';
import TableOrder from './components/TableOrder.vue';
import axios from '../connection/axiosConfig'
import router from '../router/router';

const dataOrders = ref([])

const getDataOrders = async () => {
    try {
        const orders = await axios.get('/api/orders')
        
        if(orders.status === 200){
            dataOrders.value = orders.data.data
        }
    } catch (error) {
        console.error(error);
    }
}

const optionTable = async (type) => {
    if(type[0] === 'view'){
        router.push({ name: 'ShowOrder' , params: { id:type[1] } })
    }
    
}

onMounted(
    getDataOrders
)
</script>

<template>
    <div class="relative">
        <div class="fixed z-0 w-full">
            <Navbar/>
            
            <div class="flex justify-center">
                <div class="flex justify-between w-full m-3 mx-6 md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12 items-center">
                    <Title 
                        class="font-bold"
                        size="sm"
                        title="Orders List"/>

                    <router-link
                        to="/orders/create"
                        class="p-2 rounded-full bg-primary flex hover:scale-105 transition-transform">
                        <p class=" text-sm px-2 text-white">
                            New Order
                        </p>

                        <PlusIcon
                            class="size-5 text-white"/>
                    </router-link>
                </div>
            </div>

            <div class="flex justify-center">
                <TableOrder
                    @clickButton="(type => optionTable(type))"
                    class=" w-full md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12"
                    :orders="dataOrders"/>
            </div>
        </div>
    </div>
</template>