<script setup>
import { ChevronDownIcon, UserPlusIcon } from '@heroicons/vue/24/outline'
import Button from '../components/Button.vue'
import Title from '../components/Title.vue'
import Navbar from './Navbar.vue'
import Select from '../components/Select.vue'
import { onMounted, ref, watch } from 'vue'
import axios from '../connection/axiosConfig'
import TableNewOrder from './components/TableNewOrder.vue'
import ModalRegisterProduct from './components/ModalRegisterProduct.vue'
import Input from '../components/Input.vue'
import TextArea from '../components/TextArea.vue'

const props = defineProps({
    titleName:{
        type:String,
        default:'New Order'
    }
})

const order = ref({
    order: {
        description: '',
        delivery_user_id: null,
        order_date: null,
        order_users: []
    }
})

const dataUsers = ref([])
const dataUsersFilter = ref([])
const selectedPerson = ref(null)
const orderArray = ref([])
const totalPayment = ref([])
const totalPrice = ref([])
const totalChange = ref([])

const isLoadingUserData = ref(false)
const isViewSelect = ref(false)

onMounted( async () =>{
    getUserData()
})

const getUserData = async () =>{
    isLoadingUserData.value = true

    try {
        const response = await axios.get('/api/users')
        if(response.status === 200) {
            dataUsers.value = response.data.data
            dataUsersFilter.value = response.data.data
        }
        isLoadingUserData.value = false
    } catch (error) {
        console.error(error)
        isLoadingUserData.value = false
    }
}

const selectedOptionPerson = (option) =>{
    isViewSelect.value = false
    selectedPerson.value = option
}

const modalAccion= (type)=>{
    selectedPerson.value = null    
}

const registerProduct = (type) => {
    orderArray.value.push(type)
    selectedPerson.value = null  
}

watch(orderArray, () =>{
    const userIdsInOrder = orderArray.value.map(order => order.user_id)
    dataUsersFilter.value = dataUsers.value.filter(user => !userIdsInOrder.includes(user.id));
    
}, { deep: true })
</script>

<template>
    <div class="relative">
        <div class=" fixed z-0 w-full">
            <Navbar/>
            
            <Title
                class="m-4 font-bold"
                :title="titleName"
                size="sm"/> 

            <div class="flex justify-center">
                <div class="mx-6 my-4 w-full md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12">
                    <div class="flex justify-between mb-6">
                        <p  
                            class=" font-bold">
                            Assign order manager
                        </p>

                        <select 
                            name=""
                            class=" w-36 border-b border-b-black-custom focus:outline-none">
                            <option value="0" selected disabled>
                                Select Person
                            </option>
                            <option 
                                value="" 
                                v-for="user in dataUsers" 
                                :key="user.id">
                                {{ user.name }}
                            </option>
                        </select>
                    </div>

                    <Input
                        class="mb-6"
                        label="Date"
                        type="date"
                        xSize="xl"
                        textAlignment="end"/>
    
                    <p
                        class=" font-bold my-2">
                        Order description
                    </p>
    
                    <div>
                        <TextArea
                            rowSize="2"
                            placeholder="Example (breakfast, bet, ...)"/>
                    </div>
                </div>
            </div>

            <div class="flex justify-center">
                <div class="flex justify-between w-full mx-6 md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12 items-center ">
                    <Title 
                        class="font-bold"
                        size="sm"
                        title="List of orders"/>

                    <!-- Wrapper -->
                    <div 
                        class="relative">

                        <!-- Dropdown -->
                        <button
                            @click="isViewSelect = true"
                            :class="{
                                'rounded-b-none border-b-white':isViewSelect
                            }"
                            class="p-2 rounded-md bg-white border-2 border-black flex">
                            <p class=" text-sm px-2 font-bold">
                                Add person
                            </p>

                            <ChevronDownIcon
                                class="size-5 text-black-custom transition-transform"/>
                        </button>

                        <!-- Dropdown -->
                        <Select
                            @selectOption="(option => selectedOptionPerson(option))"
                            class="z-20"
                            :options="dataUsersFilter"
                            v-if="isViewSelect" />
                    </div>

                    <!-- Backdrop -->
                    <div
                        @click="isViewSelect = false"
                        v-if="isViewSelect" 
                        class="fixed top-0 left-0 w-full h-full -z-0">
                    </div>
                </div>
            </div>

            <div class="flex justify-center">
                <div class="w-full mx-6 md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12 my-3">
                    <TableNewOrder
                        :users="orderArray"/>
                </div>
            </div>

            <div class="flex justify-center">
                <div class="w-full mx-6 md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12 my-3 flex justify-between">
                    <Button
                        type="danger"
                        name="Cancel Order"/>
                    
                    <Button
                        :disabled="orderArray.length === 0"
                        name="Register Order"/>
                </div>
            </div>
        </div>

        <div
            v-if="selectedPerson" 
            class="fixed z-10 backdrop-blur-sm w-full h-full flex justify-center items-center">
            <ModalRegisterProduct
                @registerProduct="type => registerProduct(type)"
                @clickButton="(type => modalAccion(type))"
                :person="selectedPerson"/>
        </div>
    </div>
</template>