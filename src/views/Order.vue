<script setup>
import Navbar from './Navbar.vue'
import Title from '../components/Title.vue'
import Button from '../components/Button.vue'
import Input from '../components/Input.vue';
import { ref } from 'vue';
import UserRequest from './components/UserRequest.vue';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import OrdersTableByUser from './components/OrdersTableByUser.vue';

const viewCreate = ref(true)
const viewTable = ref(false)
const viewOrderTale = ref(false)
const viewSelectUser = ref(true)
const viewButtons = ref(false)
const sentOrder = ref({})
const orders = ref([])
const seeOrderTable = ref()

const orderRegister = (order)=> {
    const newId = orders.value.length > 0 ? orders.value[orders.value.length - 1].id + 1 : 1
    orders.value.push({...order , id:newId})
    viewTable.value = true
}

const viewProducts = (orderId)=>{
    seeOrderTable.value = orders.value.find(order => order.id === orderId)
    viewOrderTale.value = true
    viewTable.value =false
    viewSelectUser.value = false
}

const getResponseUserTable = (getType)=>{
    viewOrderTale.value = false
    viewTable.value =true
    viewSelectUser.value = true
}
</script>

<template>
    <div class="relative">
        <div
            v-if="viewCreate"
            class="fixed h-full z-20 w-full bg-black bg-opacity-75 flex justify-center items-center">
            <div class=" bg-blue-100 m-5 w-5/6 p-5 rounded-md">
                <Title 
                    class="mb-5"
                    title="New Orders"
                    size="md"/>

                <div class="grid grid-cols-2 gap-3">
                    <Input
                        placeholder="Name"/>

                    <Input
                        type="date"/>

                    <Input
                        class="col-span-2"
                        placeholder="Description"/>
                </div>
                
                <div 
                    :class="{
                        ' h-52 overflow-x-auto ':orders.length > 3
                    }"
                    class="my-2 border-2 border-blue-600 rounded"
                    v-if="viewTable">
                    <table class="w-full text-sm text-left rtl:text-right">
                        <thead class="text-xs uppercase bg-gray-200 sticky top-0 z-10">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>

                                <th scope="col" class="px-6 py-3 text-center">
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b"
                                v-for="order in orders"
                                :key="order.id">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                                    {{ order.userName }}
                                </th>

                                <td class="px-6 py-4 flex justify-center gap-3">
                                    <button
                                        @click="viewProducts(order.id)">
                                        <EyeIcon
                                            class="size-6 text-blue-700"/>
                                    </button>

                                    <button>
                                        <TrashIcon
                                            class="size-6 text-blue-700"/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <OrdersTableByUser
                    v-if="viewOrderTale"
                    @buttonClick="(type => getResponseUserTable(type))"
                    :order="seeOrderTable"/>
                
                <UserRequest
                    v-if="viewSelectUser"
                    @hideButton = "stateButtons"
                    @orderRegister="(order => orderRegister(order))"/>
            </div>
        </div>
        
        <div class=" fixed z-0 w-full">       
            <Navbar/>
            
            <div class=" mt-5">
                <div class="w-full bg-blue-50 p-5">
                    <div class="flex justify-between">
                        <Title 
                            title="Order List"
                            size="md"/>

                        <Button
                            xSize="sm"
                            name="New"
                            type="accept"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>