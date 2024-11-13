<script setup>
import Navbar from './Navbar.vue'
import Title from '../components/Title.vue'
import { PlusIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref } from 'vue';
import TableOrder from './components/TableOrder.vue';
import axios from '../connection/axiosConfig'
import ViewOrder from './components/ViewOrder.vue';

const dataOrders = ref([])
const dataProducts = ref([])
const dataUsers = ref([])
const findOrder = ref()
const isViewOrder = ref(false)

const getDataOrders = async () => {
    try {
        const orders = await axios.get('/api/orders')
        const products = await axios.get('/api/products')
        const users = await axios.get('/api/users')
        
        if(orders.status === 200 && products.status === 200 && users.status === 200){
            dataOrders.value = orders.data.data
            dataProducts.value = products.data.data
            dataUsers.value = users.data.data
        }
    } catch (error) {
        console.error(error);
    }
}

const optionTable = async (type) => {
    if(type[0] === 'view'){
        await getOrder(type[1])
        
        isViewOrder.value = true
    } 
}

const getOrder = async (id) => {
    try {
        const response = await axios.get(`/api/orders/${id}`)
        if(response.status === 200){
            findOrder.value = response.data.data
        }
    } catch (error) {
        console.error('Error get order by ID' , error);
    }
}

onMounted(
    getDataOrders
)
</script>

<template>
    <div class="relative">
        <Navbar/>

        <div class="fixed z-0 w-full">
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

        <div
            v-if="isViewOrder" 
            class="fixed z-10 w-full bg-white h-full">
            <div class="flex justify-center">
                <div class="w-full md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12">
                    <ViewOrder
                        :users="dataUsers"
                        :products="dataProducts"
                        :order="findOrder"/>
                </div>
            </div>
        </div>
    </div>
</template>