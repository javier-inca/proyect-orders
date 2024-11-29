<script setup>
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
import Button from '../../components/Button.vue'
import Title from '../../components/Title.vue'
import { useUserStore } from '../../stores/useUserStore';
import { onMounted, ref } from 'vue';
import OrderTable from './components/OrderTable.vue';
import { useOrderStore } from '../../stores/useOrderStore';

/* Pinia stores */
const orderStore = useOrderStore()

/* datos y estado de carga de pedidos */
const loadingOrders = ref(true)
const orderData = ref([])

/* obtener todos los pedidos */
const fetchOrders = async () => {
    loadingOrders.value = true
    orderData.value = await orderStore.fetchOrders()
    loadingOrders.value = false
}

/* Obtener todos los pedidos al inicio */
onMounted(() => {
    setTimeout(() => {
        fetchOrders()
    }, 1)
})
</script>

<template>
    <div class="flex justify-center mx-5">
        <div class="relative max-w-3xl w-full">
            <div class="absolute z-0 w-full">
                <!-- Titulo y botton para crear nuevo pedido -->
                <div class="flex justify-between items-center mb-2">
                    <Title
                        title="list of orders"/>

                    <router-link
                        class="min-w-[150px]"
                        to="/orders/create">
                        <Button
                            buttonName="New Order"
                            :rightIcon="ShoppingCartIcon"
                            class="max-w-[150px]"/>
                    </router-link>
                </div>  
                
                <!-- componente tabla de pedidos -->
                <OrderTable
                    :orderList="orderData"
                    :dataStatus="loadingOrders"/>
            </div>
        </div>
    </div>
</template>