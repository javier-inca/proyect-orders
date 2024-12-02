<script setup>
import { computed, onMounted, ref } from 'vue';
import Title from '../../components/Title.vue';
import { useUserStore } from '../../stores/useUserStore';
import DetailsForm from './components/DetailsForm.vue';
import { useOrderManager } from './composables/OrderManager';
import { useOrderStore } from '../../stores/useOrderStore';
import { useToastStore } from '../../stores/useToastStore';
import { useProductStore } from '../../stores/useProductStore'
import Select from '../../components/Select.vue';
import UserProductsForm from './components/UserProductsForm.vue'

/* Stores  */
const userStore = useUserStore()
const productStore = useProductStore()
const orderStore = useOrderStore()
const toastStore = useToastStore()
const orderManager = useOrderManager(orderStore, toastStore)

/* Array de usuarios */
const userData = ref([])
const productData = ref([])

/* Obtener el dia actual */
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];

/* Ocultar o ver fondo borroso */
const isBlurryBackground = ref(false)

/* Ocultar o ver formulario de productos */
const isShowProductForm = ref(false)

/* obteto de detalles del formulario */
const orderFormDetails = ref({
    reason:'',
    buyer:'',
    date: formattedDate,
    errors:{
        reason:'',
        buyer:'',
        date:'',
    },
    statusOrderFormDetails: false,
})

/* Objeto de pedido de usuario */
const orderUserFormDetails = ref({
    orderId: null,
    userId: null,
    userName: '',
    amountMoney: null,
})

const orderUserProductFormDetails = ref({
    orderUserId: null,
    productName: '',
    quantity: 1,
    finalPrice: (0).toFixed(2),
    description: '',

    errors:{
        productName: '',
        quantity: '',
        finalPrice: '',
        description: '',
    }
})

/* Crear detalle de pedido */
const createOrder = async () => {
    const response = await orderManager.createOrder(orderFormDetails.value, userData.value)

    /* Asignar id de pedido y estado de guardado */
    if(response.order_id){
        orderUserFormDetails.value.orderId = response.order_id
        orderFormDetails.value.statusOrderFormDetails = true

        cleanOrderFormDetails()

        return
    }

    /* Mostrar errores de formulario de detalles de pedidos */
    orderFormDetails.value.errors = {
        reason: response.reason,
        buyer: response.buyer,
        date: response.date,
    }
}

/* Actualizar detalle de pedido */
const updateOrder = async () => {
    const response = await orderManager.updateOrder(orderFormDetails.value, userData.value, orderUserFormDetails.value.orderId)

    if(response){
        orderFormDetails.value.errors = {
            reason: response.reason,
            buyer: response.buyer,
            date: response.date,
        }

        orderFormDetails.value.statusOrderFormDetails= false
        return  
    }

    orderFormDetails.value.statusOrderFormDetails = true
    cleanOrderFormDetails()
}

/* Limpiar errores del formulario detalles de pedido */
const cleanOrderFormDetails = () =>{
    orderFormDetails.value.errors = {
        reason: '',
        buyer: '',
        date: '',
    }
}

/* opciones del formulario de detalles de pedido */
const detailsFormOptions = async (option) => {    
    if(option === 'save' && orderUserFormDetails.value.orderId === null){
        createOrder()
    }

    if(option === 'save' && orderUserFormDetails.value.orderId !== null){
        updateOrder()
    }
}

/* seleccionar usuario a tomar pedidos */
const selectUserOption = async (option) => {
    const userId = await orderManager.findIdByName(userData.value, option)

    orderUserFormDetails.value = {
        orderId: orderUserFormDetails.value.orderId,
        userId: userId.id,
        userName: option,
        amountMoney: null,
    }

    showFormProduct()
}

/* Mostrar formulario de producto */
const showFormProduct = () => {
    isBlurryBackground.value = true
    isShowProductForm.value = true
}

/* Obtener todos los usuarios */
const fetchUsers = async () => {
    userData.value = await userStore.fetchUsers()
}

/* Obtener todos los productos */
const fetchProducts = async () => {
    productData.value = await productStore.fetchProducts()
}

/* Calcular el total del precio  */
const totalPrice = computed(()=> {
    if(orderUserProductFormDetails.value.quantity > 0 && orderUserProductFormDetails.value.finalPrice > 0) {
        const totalPrice = orderUserProductFormDetails.value.quantity * orderUserProductFormDetails.value.finalPrice
        return (totalPrice).toFixed(2)
    }
    return (0).toFixed(2)
})

/* Cargar todos los usuarios */
onMounted( () => {
    fetchUsers()
    fetchProducts()
})
</script>

<template>
    <div class="flex justify-center mx-5">
        <div class="relative max-w-3xl w-full">
            <div class="absolute z-0 w-full">
                <!-- Titulo -->
                <Title
                    title="Create new order"/>

                <!-- componente detalles del pedido -->
                <DetailsForm
                    :userList="userData"
                    :errors="orderFormDetails.errors"
                    :status="orderFormDetails.statusOrderFormDetails"
                    v-model:reason="orderFormDetails.reason"
                    v-model:buyer="orderFormDetails.buyer"
                    v-model:date="orderFormDetails.date"
                    @clickSave="(option => detailsFormOptions(option))"/>

                <!-- Seleccionar para pedido de usuario -->
                <div 
                    v-if="orderFormDetails.statusOrderFormDetails"
                    class=" border border-primary rounded p-2">
                    <Title
                        class=" mb-2"
                        title="Orders section"
                        aling="start"/>

                    <Select
                        label="Register orders from"
                        :selectData="userData"
                        @clickOption="(option => selectUserOption(option))"/>
                </div>
            </div>

            <!-- Formulario de producto -->
            <div 
                v-if="isShowProductForm"
                class="absolute z-20 w-full">
                <UserProductsForm
                    :userName="orderUserFormDetails.userName"
                    :productData="productData"
                    :totalPrice="totalPrice"
                    v-model:productName="orderUserProductFormDetails.productName"
                    v-model:quantity="orderUserProductFormDetails.quantity"
                    v-model:unitPrice="orderUserProductFormDetails.finalPrice"
                    v-model:description="orderUserProductFormDetails.description"/>

                <pre>
                    {{ orderUserProductFormDetails }}
                </pre>
            </div>

            <div 
                v-if="isBlurryBackground"
                class=" fixed z-10 w-full h-full top-0 right-0 backdrop-blur">
            </div>
        </div>
    </div>
</template>