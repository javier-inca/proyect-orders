<script setup>
import Title from '../components/Title.vue'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import { PencilSquareIcon } from '@heroicons/vue/16/solid'
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { ref, onMounted } from 'vue'
import Modal from '../components/Modal.vue'
import Notification from '../components/Notification.vue'
import Navbar from './Navbar.vue'
import axios from 'axios'
import TableProduct from './components/TableProduct.vue'
import ProductRegister from './components/ProductRegister.vue'


const dataProducts = ref([])
const dataError = ref(null)

const isLoading = ref(false)
const isProductRegister = ref(false)

onMounted(async ()=>{
    /* isLoading.value = true
    setTimeout(async () => {
    await getData();
    }, 100); */
})

const getData = async () => {
    try {
        const response = await axios.get('http://192.168.50.187:8081/api/products')
        if (response.status === 200) {
            dataProducts.value = response.data.data
        }
        isLoading.value = false
    } catch (error) {
        dataError.value = 'There was an error, please try again later.'
        isLoading.value = false
    }
}
</script>

<template>
    <div class="relative">
        <div class="fixed z-0 w-full h-full">
            <Navbar/>
    
            <TableProduct
                class=" my-1"
                :stateLoading="isLoading"
                :products="dataProducts"/>

            <div
                v-if="!isLoading"
                class="flex justify-center">
                <div class="w-full md:w-2/3 lg:w-1/2 2xl:w-2/5 flex justify-end m-2 mr-10">
                    <button
                        @click="isProductRegister = true"
                        class="p-2 rounded-full bg-primary hover:scale-125 transition-transform duration-100">
                        <PlusIcon
                            class="size-5 text-black-custom hover:scale-125 transition-transform duration-100"/>
                    </button>
                </div>
            </div>
        </div>

        <div 
            v-if="isProductRegister"
            class="fixed z-10 w-full h-full backdrop-blur-sm flex justify-center items-center">
            <ProductRegister
                />
        </div>
    </div>
</template>