<script setup>
import { onMounted, ref, watch } from 'vue'
import { useOrderStore } from '../../stores/useOrderStore'
import { useUserStore } from '../../stores/useUserStore'
import { useToastStore } from '../../stores/useToastStore'
import Title from '../../components/Title.vue'
import DetailsForm from './components/DetailsForm.vue'
import Select from '../../components/Select.vue'

const toastStore = useToastStore()
const orderStore = useOrderStore()
const userStore = useUserStore()

const orderData = ref({
    delivery : 'Select',
    description : '',
    date : new Date(),

    errorDelivery : '',
    errorDescription : '',
    errorDate : '',
})

const orderUserData = ref({
    status : 422,
    order_id : 0,
    user_id : 0,
    amount_money : null
})

const orderUserProductData = ref({
    order_user_id : 0,
    product_id : 0,
    quantity : 0,
    final_price : 0,
    description: '',
})

const userData = ref([])

const stateSelectPerson = ref(true)

const createOrder = async () => {
    let response = null

    const findUser = userData.value.find(
        user => user.name === orderData.value.delivery
    )

    const formattedDate = orderData.value.date.toISOString().slice(0, 19).replace('T', ' ')
    
    const data = {
        description: orderData.value.description,
        order_date: formattedDate,
        delivery_user_id: findUser? findUser.id : 0
    }

    if(orderUserData.value.order_id > 0){
        response = await orderStore.updateOrder( orderUserData.value.order_id ,data)
    }  

    if(orderUserData.value.order_id === 0){
        response = await orderStore.createOrder(data)

        if(response.status === 201){
            orderUserData.value.order_id = response.data.order_id
        }
    }

    if(response.status === 422){
        showToast('error' , 'Error' , 'Error saving the order.')
        
        const errors = response.response.data.errors

        orderData.value.errorDescription = errors.description ? errors.description[0] : ''
        orderData.value.errorDelivery = errors.delivery_user_id ? errors.delivery_user_id[0] : ''
        orderData.value.errorDate = errors.order_date ? errors.order_date[0] : ''
    }

    if(response.status === 201 || response.status === 200) {
        orderData.value.errorDescription = ''
        orderData.value.errorDelivery = ''
        orderData.value.errorDate = ''
    }    
}

const showToast = (severity, summary, detail) => {
    toastStore.showToast(severity, summary, detail)
}

onMounted(async () => {
    userData.value = await userStore.fetchUsers()
})

watch(orderData, () => {
    createOrder()
}, {deep : true})
</script>

<template>
    <div class="flex justify-center mx-2">
        <div class="relative max-w-3xl w-full">
            <div class="absolute z-0 w-full">
                <Title
                    title="New Order"/>

                <DetailsForm
                    v-model:delivery="orderData.delivery"
                    v-model:description="orderData.description"
                    v-model:date="orderData.date"
                    v-model:errorDelivery="orderData.errorDelivery"
                    v-model:errorDescription="orderData.errorDescription"
                    v-model:errorDate="orderData.errorDate"
                    :userData="userData"/>

                <div class="border p-2 border-primary rounded">
                    <Title
                        title=""/>

                    <Select
                        :isDisabled="stateSelectPerson"
                        v-model="orderUserData.user_id"
                        :selectData="userData"/>
                </div>
            </div>
        </div>
    </div>
</template>