<script setup>
import { useRoute } from 'vue-router'
import Navbar from './Navbar.vue'
import { onMounted, ref } from 'vue';
import axios from '../connection/axiosConfig';
import Title from '../components/Title.vue';
import TextArea from '../components/TextArea.vue';
import moment from 'moment';
import OrderShowDetails from './components/OrderShowDetails.vue';
import ListProduct from './components/ListProduct.vue';

const route = useRoute();
const orderId = route.params.id; 
const orderDetails = ref()
const dataUser = ref()
const dataProducts = ref()

const isLoading = ref(true)

const getOrderDetails = async () => {
    try {
        const findOrder = await axios.get(`/api/orders/${orderId}`)
        const users = await axios.get('/api/users')
        const products = await axios.get('/api/products')


        if(findOrder.status === 200 && users.status === 200 && products.status === 200){
            orderDetails.value = findOrder.data.data
            dataUser.value = users.data.data
            dataProducts.value = products.data.data

            isLoading.value = false
        }
    } catch (error) {
        console.error(error);

        isLoading.value = false
    }
}

onMounted(
    getOrderDetails
)

const getNameUser = (userId) => {
    const user = dataUser.value.find(findUser => findUser.id === userId)
    return user.name
}
</script>

<template>
  <div class="relative">
    <Navbar />

    <div 
        v-if="isLoading" 
        class="flex justify-center items-center h-screen">
        <p>
            Loading...
        </p>
    </div>

    <div
        v-if="!isLoading" 
        class="flex justify-center">
        <div class="w-full md:w-3/4 lg:w-2/3 2xl:w-3/6 3xl:w-4/12">
            <div 
                class=" m-3">
                <Title 
                    class="font-bold" 
                    size="sm" 
                    title="Order details"/>

                <div class="flex justify-between mb-3">
                    <p 
                        class=" font-bold">
                        Order manager
                    </p>

                    <p>
                        {{ getNameUser(orderDetails.delivery_user_id) }}
                    </p>
                </div>

                <div class="flex justify-between mb-3">
                    <p 
                        class=" font-bold">
                        Date
                    </p>

                    <p>
                        {{ moment(orderDetails.order_date).format('DD - MMM - YYYY') }}
                    </p>
                </div>

                <div class="flex flex-col mb-3">
                    <p
                        class=" font-bold">
                        Description
                    </p>

                    <TextArea
                        :disabled="true"
                        v-model="orderDetails.description"/>
                </div>

                <Title
                    class=" font-bold mb-3"
                    size="sm"
                    title="User orders"/>     
                    
                <OrderShowDetails
                    :orderUsers = "orderDetails.order_users"
                    :dataUsers = "dataUser"
                    :dataProducts = "dataProducts"/>

                <Title
                    class=" font-bold mt-5"
                    size="sm"
                    title="List of all the products"/>  

                <ListProduct
                    :dataProducts="dataProducts"
                    :orderUsers="orderDetails.order_users"/>
            </div>
        </div>
    </div>
  </div>
</template>