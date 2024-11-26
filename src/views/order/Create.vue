<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useOrderStore } from '../../stores/useOrderStore'
import { useUserStore } from '../../stores/useUserStore'
import { useProductStore } from '../../stores/useProductStore'
import { useToastStore } from '../../stores/useToastStore'
import { useOrderUserStore } from '../../stores/useOrderUserStore'
import { useOrderUserProduct } from '../../stores/useOrderUserProductStore'
import Title from '../../components/Title.vue'
import DetailsForm from './components/DetailsForm.vue'
import Select from '../../components/Select.vue'
import UserProductsForm from './components/UserProductsForm.vue'
import StatusLine from '../../components/StatusLine.vue'
import UserOrdersTable from './components/UserOrdersTable.vue'

const toastStore = useToastStore()
const userStore = useUserStore()
const productStore = useProductStore()
const orderStore = useOrderStore()
const orderUserStore = useOrderUserStore()
const orderUserProductStore = useOrderUserProduct()

const orderData = ref({
    delivery : '',
    description : '',
    date : new Date(),
    isShowForm : true,

    errorDelivery : '',
    errorDescription : '',
    errorDate : '',
})

const orderUserData = ref({
    order_id : 0,
    user_name : '',
    user_id : 0,
    amount_money : null,

    errorUser : '',
    errorAmountMoney:'',
})

const orderUserProductData = ref({
    order_user_id : 0,
    product : '',
    product_id: 0,
    quantity : 1,
    final_price : 0,
    totalPrice: 0,
    description: '',
    isButtonDisabled: true,

    errorProduct:'',
    errorPrice:'',
    errorDescription:'',
})

const userData = ref([])
const productData = ref([])

const stateSelectPerson = ref(false)
const isVisibleProductForm = ref(false)

const statusOrder = ref(false)
const timeoutIdOrder = ref(null)

const fetchOrderData = ref([])
const fetchUserData = ref([]) 

const fetchOrder = async () => {
    const response = await orderStore.fetchOrderById(orderUserData.value.order_id)
    fetchOrderData.value = response.data.data
}

const createOrder = async () => {
    let response = null

    const findUser = userData.value.find(
        user => user.name === orderData.value.delivery
    )

    const formattedDate = orderData.value.date.toISOString().slice(0, 19).replace('T', ' ')
    
    const data = {
        reason: orderData.value.description,
        order_date: formattedDate,
        d_user_name: orderData.value.delivery,
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

        orderData.value.errorDescription = errors.reason ? errors.reason[0] : ''
        orderData.value.errorDelivery = errors.delivery_user_id ? errors.delivery_user_id[0] : ''
        orderData.value.errorDate = errors.order_date ? errors.order_date[0] : ''

        stateSelectPerson.value = false
        statusOrder.value = false
    }

    if(response.status === 201 || response.status === 200) {
        orderData.value.errorDescription = ''
        orderData.value.errorDelivery = ''
        orderData.value.errorDate = ''

        stateSelectPerson.value = true
        statusOrder.value = true

        orderData.value.isShowForm = false

        fetchOrder()
    }
}

const fetchOrderUser = async () => {
    const user =  await fetchOrderData.value.order_users.find(user => user.id === orderUserProductData.value.order_user_id)
    
    if(user.products.length <= 0){
        await deleteOrderUser()
        fetchOrder()        

        showToast('info', 'Information', 'Person without products deleted.')
    }

    if(user.products.length > 0){
        fetchUserData.value = user.products        
    }
}

const createOrderUser = async () => {
    let response = null

    const data = {
        order_id : orderUserData.value.order_id,
        user_id : orderUserData.value.user_id,
        amount_money : orderUserData.value.amount_money,
        user_name: orderUserData.value.user_name,
    }

    response = await orderUserStore.createOrderUser(data)
        
    if(response.status === 422) {        
        orderUserData.value.errorUser =  response.response.data.errors.user_id[0]

        showToast('error' , 'Error' , response.response.data.errors.order_id[0])
    }

    if(response.status === 201 || response.status === 200 ){
        orderUserProductData.value.order_user_id = response.data.order_user_id
        orderUserData.value.errorUser = ''

        response.data

        isVisibleProductForm.value = true

        fetchOrder()
    }
}

const updateOrderUser = async () => {
    const data = {
        user_id: orderUserData.value.user_id,
        amount_money: orderUserData.value.amount_money,
    }    
    const response = await orderUserStore.updateOrderUser(orderUserProductData.value.order_user_id , data)
    
    if(response.status === 422){
        orderUserData.value.errorAmountMoney = response.response.data.errors.amount_money ? response.response.data.errors.amount_money[0] : ''
    }

    if(response.status === 200){
        showToast('success', 'Success', 'Order registered successfully.')

        fetchOrder()
        clearProductForm()

        productFormOptions('close')
    }
}

const deleteOrderUser = async () => {
    await orderUserStore.deleteOrderUser(orderUserProductData.value.order_user_id)
}

const clearProductForm = () => {
    orderUserProductData.value.product = ''
    orderUserProductData.value.quantity = 1
    orderUserProductData.value.description = ''
    orderUserProductData.value.final_price = 0
    orderUserData.value.amount_money = ''

    orderUserProductData.value.errorDescription = ''
    orderUserProductData.value.errorPrice = ''
    orderUserProductData.value.errorProduct = ''
    orderUserData.value.errorAmountMoney = ''
}

const createOrderUserProduct = async () => {
    let data = {
        order_user_id: orderUserProductData.value.order_user_id,
        product_id: orderUserProductData.value.product_id,
        product_name: orderUserProductData.value.product,
        quantity: orderUserProductData.value.quantity,
        final_price: orderUserProductData.value.final_price,
        description: orderUserProductData.value.description,
    }

    if(orderUserProductData.value.product_id === 0){        
        const response = await productStore.createProduct({
            name: data.product_name,
            reference_price: data.final_price,
        })
              
        if(response.status === 422){
            orderUserProductData.value.errorProduct = response.response.data.errors.name ? response.response.data.errors.name[0] : ''
            orderUserProductData.value.errorPrice = response.response.data.errors.reference_price ? response.response.data.errors.reference_price[0] : ''
            return
        }

        if(response.status === 201){
            showToast('success', 'Success', 'New product registered')
            
            orderUserProductData.value.errorProduct = ''
            orderUserProductData.value.errorPrice = ''

            data.product_id = response.data.product.id

            fetchProducts()
        }
    }

    const response = await orderUserProductStore.createOrderUserProduct(data)
        
    if(response.status === 200){
        showToast('info', 'Information', 'Product added to cart')
        
        clearProductForm()
    }

    if(response.status === 422){
        orderUserProductData.value.errorPrice = response.response.data.errors.final_price ? response.response.data.errors.final_price[0] : ''
        return
    }
    
    await fetchOrder()
    await fetchOrderUser()
}

const showToast = (severity, summary, detail) => {
    toastStore.showToast(severity, summary, detail)
}

const getUserIdByName = (userName) => {
    return userData.value.find( user => user.name === userName) ? userData.value.find( user => user.name === userName).id : 0
}

const productFormOptions = async (type) => {
    if(type === 'close') {
        orderUserData.value.user_name = ''

        isVisibleProductForm.value = false

        clearProductForm()
        await fetchOrderUser()
        
        fetchUserData.value = []
    }

    if(type === 'create') {
        createOrderUserProduct()
    }

    if(type === 'registerOrder'){
        updateOrderUser()
    }
}

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
    if(orderUserProductData.value.quantity > 0 && orderUserProductData.value.quantity < 100 ){
        orderUserProductData.value.totalPrice =  orderUserProductData.value.final_price * orderUserProductData.value.quantity
    }

    if(orderUserProductData.value.final_price < 0.5) {
        orderUserProductData.value.isButtonDisabled = false
        return
    }

    orderUserProductData.value.isButtonDisabled = false
    
}, { deep:true })

const saveOrder = (type) => {    
    if(type === 'save'){
        statusOrder.value = false
        
        createOrder()
        return
    }
    
    if(type === 'autosave'){
        statusOrder.value = false
        
    }   
}

const saveOrderUser = async () =>  {    
    orderUserData.value.user_id =  await( getUserIdByName(orderUserData.value.user_name) )
    
    createOrderUser()
}

const filterUser = computed(() => {     
    if(fetchOrderData.value.order_users){
        const filterUser = userData.value.filter(user => 
            !fetchOrderData.value.order_users.some(orderUser => orderUser.user_id === user.id)
        )
        return filterUser
    }
    return userData.value
})

const fetchProducts = async () =>{
    productData.value = await productStore.fetchProducts()
}

onMounted(async () => {
    userData.value = await userStore.fetchUsers()

    fetchProducts()
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
                    class="hidden sm:block"
                    title="New Order"/>

                <StatusLine
                    :status="statusOrder"
                    :statusType="fetchOrderData.state"/>

                <DetailsForm
                    @save="type => saveOrder(type)"
                    v-model:delivery="orderData.delivery"
                    v-model:reason="orderData.description"
                    v-model:date="orderData.date"
                    v-model:errorDelivery="orderData.errorDelivery"
                    v-model:errorDescription="orderData.errorDescription"
                    v-model:errorDate="orderData.errorDate"
                    v-model:isShowForm="orderData.isShowForm"
                    :userData="userData"
                    :statusOrder="statusOrder"/>

                <div 
                    :class="{
                        'bg-gray-200 text-gray-500' : !statusOrder
                    }"
                    class="border p-2 border-primary rounded">
                    <Title
                        title="Orders section."
                        aling="start"/>

                    <div class="mt-2">
                        <Select
                            v-if="filterUser.length > 0"
                            label="Select person"
                            placeholder="Select"
                            :errorMessage="orderUserData.errorUser"
                            :isShowingSelection="false"
                            :isDisabled="!statusOrder"
                            v-model:inputValue="orderUserData.user_name"
                            @blurInput="saveOrderUser"
                            :selectData="filterUser"/>
                    </div>

                    <UserOrdersTable
                        v-if="fetchOrderData.order_users? fetchOrderData.order_users.length > 0 : false"
                        :orderList="fetchOrderData.order_users"
                        :userList="userData"/>
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
                    v-model:description="orderUserProductData.description"
                    v-model:amountMoney="orderUserData.amount_money"
                    :errorSelectedProduct="orderUserProductData.errorProduct"
                    :errorUnitPrice="orderUserProductData.errorPrice"
                    :errorDescription="orderUserProductData.errorDescription"
                    :errorAmountMoney="orderUserData.errorAmountMoney"
                    :userName="orderUserData.user_name"
                    :productData="productData"
                    :productList="fetchUserData"
                    @clickButton="(type => productFormOptions(type))"/>
            </div>

            <div 
                v-if="isVisibleProductForm"
                class="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-md">
            </div> 

        </div>
    </div>
</template>