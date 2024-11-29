<script setup>
import { onMounted, ref } from 'vue';
import Title from '../../components/Title.vue';
import { useUserStore } from '../../stores/useUserStore';
import DetailsForm from './components/DetailsForm.vue';
import { useOrderManager } from './composables/OrderManager';
import { useOrderStore } from '../../stores/useOrderStore';
import { useToastStore } from '../../stores/useToastStore';

/* Stores  */
const userStore = useUserStore()
const orderStore = useOrderStore()
const toastStore = useToastStore()
const orderManager = useOrderManager(orderStore, toastStore)

/* Array de usuarios */
const userData = ref([])

/* Obtener el dia actual */
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];

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

const detailsFormOptions = (option) => {
    if(option === 'save'){
        orderManager.createOrder(orderFormDetails.value, userData.value)
    }
}

/* Obtener todos los usuarios */
const fetchUsers = async () => {
    userData.value = await userStore.fetchUsers()
}

/* Cargar todos los usuarios */
onMounted(
    fetchUsers
)
</script>

<template>
    <pre>
        {{ orderFormDetails }}
    </pre>

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
            </div>
        </div>
    </div>
</template>