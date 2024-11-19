<script setup>
import { onMounted, ref } from 'vue'
import { useOrderStore } from '../../stores/useOrderStore'
import Title from '../../components/Title.vue'
import Button from '../../components/Button.vue'
import Input from '../../components/Input.vue'
import DetailsForm from './components/DetailsForm.vue'
import { useUserStore } from '../../stores/useUserStore'

const orderStore = useOrderStore()
const userStore = useUserStore()

const isCreatingOrder = ref(false)
const orderData = ref({})

const userData = ref([])

const createOrder = async () => {
    isCreatingOrder.value = true
    const response = await orderStore.createOrder(orderData)
    isCreatingOrder.value = false
    console.log(response)
}

onMounted(async () => {
    userData.value = await userStore.fetchUsers()
})
</script>

<template>
    <div class="flex justify-center mx-2">
        <div class="relative max-w-3xl w-full">
            <div class="absolute z-0 w-full">
                <Title
                    title="New Order"/>

                <DetailsForm
                    :userData="userData"/>
            </div>
        </div>
    </div>
</template>