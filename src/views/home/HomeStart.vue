<script setup>
import { onMounted, ref } from 'vue';
import { useOrderStore } from '../../stores/useOrderStore';
import { useProductStore } from '../../stores/useProductStore';
import { useUserStore } from '../../stores/useUserStore';
import HomeCard from '../../components/HomeCard.vue';
import { ShoppingBagIcon, ShoppingCartIcon, UserIcon } from '@heroicons/vue/24/solid';

const userStore = useUserStore()
const productStore = useProductStore()
const orderStore = useOrderStore()

const isLoadingUser= ref(false)
const userData = ref([])

const isLoadingProduct= ref(false)
const productData = ref([])

const isLoadingOrder= ref(false)
const orderData = ref([])

const fetchUsers = async () => {
    isLoadingUser.value = true
    userData.value = await userStore.fetchUsers()
    isLoadingUser.value = false
}

const fetchProducts = async () => {
    isLoadingProduct.value = true
    productData.value = await productStore.fetchProducts()
    isLoadingProduct.value = false
}

const fetchOrders = async () => {    
    isLoadingOrder.value = true
    orderData.value = await orderStore.fetchOrders()
    isLoadingOrder.value = false
}

onMounted(() => {
    fetchUsers()
    fetchProducts()
    fetchOrders()
})
</script>

<template>
    <div class="flex justify-center mx-5">
        <div class="relative max-w-3xl w-full">
            <div class=" absolute z-0 w-full flex sm:justify-center sm:flex-row flex-col items-center gap-2">
                <router-link
                    to="/users">
                    <HomeCard
                        :quantity="userData.length"
                        :icon="UserIcon"
                        title="people"
                        :loading="isLoadingUser"/>
                </router-link>
                
                <router-link
                    to="/products">
                    <HomeCard
                        :quantity="productData.length"
                        :icon="ShoppingBagIcon"
                        title="products"
                        :loading="isLoadingProduct"/>
                </router-link>

                <router-link
                    to="/orders">
                    <HomeCard
                        :quantity="orderData.length"
                        :icon="ShoppingCartIcon"
                        title="orders"
                        :loading="isLoadingOrder"/>
                </router-link>
            </div>
        </div>
    </div>
</template>