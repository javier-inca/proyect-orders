<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
import { ref, onMounted } from 'vue'
import Modal from '../components/Modal.vue'
import Notification from '../components/Notification.vue'
import Navbar from './Navbar.vue'
import axios from '../connection/axiosConfig'
import TableProduct from './components/TableProduct.vue'
import ProductRegister from './components/ProductRegister.vue'

/* layout */
const dataProducts = ref([])
const dataError = ref(null)
const actionType = ref('Register')

const product=ref({
    id:'',
    name:'',
    nameError:'',
    price:'',
    priceError:''
})

const message=ref({
    message:'',
    product:'',
})

const notification=ref({
    type:'',
    message:''
})

const isLoading = ref(false)
const isProductRegister = ref(false)
const isProductDelete = ref(false)
const isNotification = ref(false)

onMounted(async ()=>{
    getData()
})

const getData = async () => {
    isLoading.value =true
    try {
        const response = await axios.get('/api/products')
        if (response.status === 200) {
            dataProducts.value = response.data.data
        }
        isLoading.value = false
    } catch (error) {
        dataError.value = 'There was an error, please try again later.'
        isLoading.value = false
    }
}

const saveProduct = (type)=>{
    if(type === 'cancel'){
        cancelProductRegister()
    }

    if(type === 'create'){
        createProduct()
    }
}

const eventualProduct = ref()

const tableOptions = (data)=>{    
    if(data.type === 'edit'){
        getProductById(data.id)
        actionType.value='Update'
        isProductRegister.value = true
    }

    if(data.type === 'delete'){
        eventualProduct.value = data.product

        isProductDelete.value = true
    } 
}

const modelOptions = (type)=>{
    if(type === 'delete'){
        deleteProduct()
    }

    if(type === 'cancel'){
        cancelProductRegister()
    }
}

const createProduct = async () =>{
    if(product.value.id > 0 ){
        try {
            const response = await axios.put(`/api/products/${product.value.id}`,{
                name:product.value.name,
                reference_price:product.value.price,
            })

            if(response.status === 200){
                cancelProductRegister()
                getData()

                notification.value.type = 'success'

                notification.value.message = 'Product updated'

                viewNotification()
            }
        } catch (error) {
            if(error.status === 422){
                const errorBody = error.response.data.errors            
                product.value.nameError = errorBody.name? errorBody.name[0] : ''
                product.value.priceError = errorBody.reference_price? errorBody.reference_price[0] : ''
            }  

            notification.value.type = 'danger'

            notification.value.message = 'Error registering product'

            viewNotification()
        }
        return
    }

    if(product.value.id === ''){
        try {
            const response = await axios.post('/api/products',{
                name:product.value.name,
                reference_price:product.value.price,
            })

            if(response.status === 201){
                cancelProductRegister()
                getData()

                notification.value.type = 'success'

                notification.value.message = 'Product registered'

                viewNotification()
            }
        } catch (error) {
            if(error.status === 422){
                const errorBody = error.response.data.errors            
                product.value.nameError = errorBody.name? errorBody.name[0] : ''
                product.value.priceError = errorBody.reference_price? errorBody.reference_price[0] : ''
            }     
            notification.value.type = 'danger'

            notification.value.message = 'Error updating product'

            viewNotification()
        }
    }
}

const getProductById = async (id) =>{
    try {
        const response = await axios.get(`/api/products/${id}`)

        if(response.status === 200){
            product.value.id = response.data.id

            product.value.name=response.data.name

            product.value.price=response.data.reference_price
        }
        
    } catch (error) {
        
    }
}

const deleteProduct = async () =>{
    try {
        const response = await axios.delete(`/api/products/${eventualProduct.value.id}`)

        if(response.status === 204){
            cancelProductRegister()
            getData()

            notification.value.type = 'danger'

            notification.value.message = 'Product deleted'

            viewNotification()
        }
    } catch (error) {
        console.log(error);
    }
}

const cancelProductRegister = ()=>{
    isProductDelete.value = false
    isProductRegister.value = false   
    product.value={
        id:'',
        name:'',
        nameError:'',
        price:'',
        priceError:'',
    }
}

const viewNotification =()=>{
    isNotification.value = true

    setTimeout(() => {
        isNotification.value = false
    }, 2000);
}
</script>

<template>
    <div class="relative">
        <div class="fixed z-0 w-full h-full">    
            <TableProduct
                @clickOptions="(data=> tableOptions(data))"
                class=" my-1"
                :stateLoading="isLoading"
                :products="dataProducts"/>

            <div
                v-if="!isLoading"
                class="flex justify-center">
                <div class="w-full md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12 flex justify-end m-2 mr-10">
                    <button
                        @click="[isProductRegister = true , actionType = 'Register']"
                        class="p-2 rounded-full bg-primary hover:scale-110 transition-transform duration-100">
                        <PlusIcon
                            class="size-5 text-black-custom"/>
                    </button>
                </div>
            </div>
        </div>

        <div 
            v-if="isProductRegister"
            class="fixed z-10 w-full h-full backdrop-blur-sm flex justify-center items-center">
            <ProductRegister
                :actionType="actionType"
                v-model:name="product.name"
                v-model:nameError="product.nameError"
                v-model:price="product.price"
                v-model:priceError="product.priceError"
                @clickButton="(type => saveProduct(type))" />
        </div>

        <div
            v-if="isProductDelete"
            class=" fixed z-20 w-full h-full backdrop-blur-sm flex justify-center items-center">
            <Modal
                @clickOptions="(data =>modelOptions(data))">
                Do you want to delete this product {{ eventualProduct.name }}?
            </Modal>
        </div>

        <div 
            v-if="isNotification"
            class=" fixed z-30 w-full flex justify-center mt-14">
            <Notification
                :type="notification.type"
                :message="notification.message"/>
        </div>
    </div>
</template>