<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useOrderStore } from '../../stores/useOrderStore'
import { useUserStore } from '../../stores/useUserStore'
import { useProductStore } from '../../stores/useProductStore'
import { useToastStore } from '../../stores/useToastStore'
import { useOrderUserStore } from '../../stores/useOrderUserStore'
import Title from '../../components/Title.vue'
import DetailsForm from './components/DetailsForm.vue'
import Select from '../../components/Select.vue'
import UserProductsForm from './components/UserProductsForm.vue'

const toastStore = useToastStore()
const orderStore = useOrderStore()
const userStore = useUserStore()
const productStore = useProductStore()
const orderUserStore = useOrderUserStore()

const orderData = ref({
    delivery : 'Select',
    description : '',
    date : new Date(),

    errorDelivery : '',
    errorDescription : '',
    errorDate : '',
})

const orderUserData = ref({
    order_id : 0,
    user_name : 'Select the person',
    user_id : 0,
    amount_money : null,

    errorUser : ''
})

const orderUserProductData = ref({
    status : 'create',
    order_user_id : 0,
    product : '',
    product_id: 0,
    quantity : 1,
    final_price : 0,
    totalPrice: 0,
    description: '',
    isButtonDisabled: true
})

const userData = ref([])
const productData = ref([])

const stateSelectPerson = ref(false)
const isVisibleProductForm = ref(false)

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

        stateSelectPerson.value = false
    }

    if(response.status === 201 || response.status === 200) {
        orderData.value.errorDescription = ''
        orderData.value.errorDelivery = ''
        orderData.value.errorDate = ''

        stateSelectPerson.value = true
    }
}

const createOrderUser = async () => {
    let response = null

    const data = {
        order_id : orderUserData.value.order_id,
        user_id : orderUserData.value.user_id,
        amount_money : orderUserData.value.amount_money,
    }

    response = await orderUserStore.createOrderUser(data)

    if(response.status !== 201) {        
        orderUserData.value.errorUser =  response.response.data.errors.user_id[0]

        showToast('error' , 'Error' , response.response.data.errors.order_id[0])
    }

    if(response.status === 201 || response.status === 200 ){
        orderUserProductData.value.order_user_id = response.data.order_user_id

        isVisibleProductForm.value = true
    }
}

const showToast = (severity, summary, detail) => {
    toastStore.showToast(severity, summary, detail)
}

const getUserIdByName = (userName) => {
    return userData.value.find( user => user.name === userName) ? userData.value.find( user => user.name === userName).id : 0
}

watch(()=> orderUserData.value.user_name , ()=> {
    if(orderUserData.value.order_id > 0){
        orderUserData.value.user_id = getUserIdByName(orderUserData.value.user_name)
    }    
})

watch(() => orderUserProductData.value.product, () => {
    const findProduct = productData.value.find(product => product.name.toLowerCase() === orderUserProductData.value.product.toLocaleLowerCase() )
    
    if(findProduct) {
        orderUserProductData.value.product_id = findProduct.id
        orderUserProductData.value.final_price = findProduct.reference_price
    }

    if(!findProduct) {
        orderUserProductData.value.product_id = 0
        orderUserProductData.value.final_price = 0
    }
})

watch(orderUserProductData, () => {    
    orderUserProductData.value.totalPrice =  orderUserProductData.value.final_price * orderUserProductData.value.quantity

    if(orderUserProductData.value.final_price < 0.5) {
        orderUserProductData.value.isButtonDisabled = true
        return
    }

    orderUserProductData.value.isButtonDisabled = false
    
}, { deep:true })

onMounted(async () => {
    userData.value = await userStore.fetchUsers()

    productData.value = await productStore.fetchProducts()
})
</script>

<template>
    <div class="flex justify-center mx-2">
        <div class="relative max-w-3xl w-full">
            <div 
                :class="{
                    'absolute' : !isVisibleProductForm,
                    'fixed' : isVisibleProductForm,
                }"
                class="z-0 w-full">
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

                <button
                    @click="createOrder"
                    class="p-2 bg-light-danger rounded">
                    Agregar order
                </button>

                <div class="border p-2 border-primary rounded">
                    <Title
                        title="List of people’s orders."
                        :isUppercase="false"
                        aling="start"/>

                    <Select
                        :errorMessage="orderUserData.errorUser"
                        :isShowingSelection="true"
                        :isDisabled="!stateSelectPerson"
                        v-model:inputValue="orderUserData.user_name"
                        :selectData="userData"/>

                    <button
                        class=" bg-light-danger p-2 rounded"
                        @click="createOrderUser">
                        Agregar persona
                    </button>
                </div>
            </div>

            <div 
                v-if="isVisibleProductForm"
                class="absolute z-20 w-full h-full">
                <UserProductsForm
                    v-model:selectedProduct="orderUserProductData.product"
                    v-model:quantity="orderUserProductData.quantity"
                    v-model:unitPrice="orderUserProductData.final_price"
                    v-model:totalPrice="orderUserProductData.totalPrice"
                    v-model:isButtonDisabled="orderUserProductData.isButtonDisabled"
                    :nameUser="orderUserData.user_name"
                    :productData="productData"/>
            </div>

            <div 
                v-if="isVisibleProductForm"
                class="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-md">
            </div> 
        </div>
    </div>
</template>