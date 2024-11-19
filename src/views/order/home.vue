<script setup>
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
import Button from '../../components/Button.vue'
import Title from '../../components/Title.vue'
import { useUserStore } from '../../stores/useUserStore';
import { onMounted, ref } from 'vue';
import OrderTable from './components/OrderTable.vue';
import { useOrderStore } from '../../stores/useOrderStore';

const userStore = useUserStore()
const orderStore = useOrderStore()

const orderData = ref([])
const isLoadingOrderData = ref(true)

const userData = ref([])
const isLoadingUserData = ref(true)

onMounted( async () => {
    orderData.value = await orderStore.fetchOrders()
    isLoadingOrderData.value = false

    userData.value = await userStore.fetchUsers()
    isLoadingUserData.value = false
})
</script>

<template>
    <div class="flex justify-center mx-2">
        <div class="relative max-w-3xl w-full">
            <div class="absolute z-0 w-full">
                <div class="flex justify-between items-center mb-2">
                    <Title
                        title="Order list"/>

                    <router-link
                        to="/orders/create">
                        <Button
                            buttonName="New Order"
                            :rightIcon="ShoppingCartIcon"
                            class=" w-[150px]"/>
                    </router-link>
                </div>  

                <div class="my-2">
                    <OrderTable
                        :orderData="orderData"
                        :userData="userData"/>
                </div>
            </div>
        </div>
    </div>
</template>