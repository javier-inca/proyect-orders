<script setup>
import { ref, watch } from 'vue'
import Select from '../../components/Select.vue'
import ProductSelect from './ProductSelect.vue'
import { AdjustmentsVerticalIcon, EyeIcon, PlusCircleIcon, TrashIcon, UserIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { PencilIcon } from '@heroicons/vue/24/outline'
import Button from '../../components/Button.vue'
import Modal from '../../components/Modal.vue'
import EditProduct from './EditProduct.vue'
import Title from '../../components/Title.vue'
import View from './View.vue'


const idUserSelect = ref('0')
const nameUser = ref()
const findOrder =ref()
const products = ref([])
const product = ref({})
const users = ref([])
const usersFilter = ref(JSON.parse(localStorage.getItem('userArray')))
const getUsers = ref(JSON.parse(localStorage.getItem('userArray')))
const idDelete = ref()
const productName = ref()

const viewProductSection = ref(false)
const viewAddProductButton = ref (false)
const viewTable = ref(false)
const viewOrderDetails = ref(false)
const viewEditProduct = ref(false)
const viewButtonOrders = ref(false)
const viewNotification = ref(false)

if (!localStorage.getItem('orderArray')) {
    localStorage.setItem('orderArray', JSON.stringify([]))
}

const productRegister = (product) => {
    const newId = products.value.length > 0 ? products.value[products.value.length - 1].id + 1 : 1
    const productWithId = { ...product, id: newId }
    products.value.push(productWithId)
    viewTable.value = products.value.length > 0 
    viewProductSection.value = false
    viewAddProductButton.value = true
    viewButtonOrders.value = true
}

const viewOrder = (id) => {
    viewOrderDetails.value = true
    findOrder.value = products.value.find(product => product.id === id)
}

const editProduct = (getId)=>{
    product.value = products.value.find(product => product.id === getId)
    viewEditProduct.value = true
}

watch(idUserSelect,() => {
    viewProductSection.value = idUserSelect.value > 0 && !viewTable.value ? true : false
    nameUser.value = idUserSelect.value > 0 ? (getUsers.value.find(user => user.id === idUserSelect.value).name ): ''
})

const emit = defineEmits('orderRegister')

const registerOrder =()=>{    
    users.value.push(getUsers.value.find(user => user.id === idUserSelect.value).name)
    usersFilter.value = getUsers.value.filter(user => !users.value.includes(user.name))

    const order = {
        idUser : getUsers.value.find(user => user.id === idUserSelect.value).id,
        userName: getUsers.value.find(user => user.id === idUserSelect.value).name,
        products: products.value
    }

    emit('orderRegister', order)  
    idUserSelect.value = 0 
    products.value=[]
    viewTable.value=false
    viewAddProductButton.value = false
    viewButtonOrders.value = false 
}

const viewDelete = (getId) =>{
    productName.value = products.value.find(product => product.id === getId).name
    viewNotification.value = true
    idDelete.value = getId
}

const deleteProduct = (type)=>{
    if(type === 'delete'){
        const index = products.value.findIndex(product => product.id === idDelete.value)
        products.value.splice(index,1)
        viewTable.value = (products.value.length > 0) ? true : false  

        viewProductSection.value = products.value.length === 0 ? true : false
        viewAddProductButton.value = products.value.length === 0 ? false : true
        viewButtonOrders.value = products.value.length === 0 ? false : true
    }
    viewNotification.value = false
}

const editAction =(action)=>{
    if(action.type === 'update'){
        const index = products.value.findIndex(product => product.id === action.order.id)
        products.value.splice(index,1,action.order)
    }
    viewEditProduct.value = false
}

const cancelOrder = ()=>{
    idUserSelect.value=0
    products.value = []
    viewTable.value = false
    viewAddProductButton.value = false
    viewButtonOrders.value = false
}

const addProduct = ()=> {
    viewAddProductButton.value = false
    viewProductSection.value = true
    viewButtonOrders.value = false
}

const onProductCancel = (state)=>{
    viewAddProductButton.value = true
    viewProductSection.value = false
    viewButtonOrders.value = true
}
</script>

<template>
    <div class="relative">
        <div class="my-5 border-2 border-blue-800 rounded p-2">
            <div class="flex justify-between">
                <Select
                    v-if="idUserSelect == 0"
                    v-model="idUserSelect" 
                    size="md" 
                    :disabled="viewProductSection">
                    <option 
                        value="0" 
                        disabled>
                        Select User
                    </option>

                    <option 
                        v-for="user in usersFilter" 
                        :value="user.id" 
                        :key="user.id">
                        {{ user.name }}
                    </option>
                </Select>

                <div 
                    v-if="idUserSelect > 0"
                    class="flex flex-row items-center px-2">
                    <UserIcon 
                        class="size-6"/>

                    <Title 
                        :title="nameUser"
                        size="sm"/>
                </div>
                
                <button 
                    v-if="viewProductSection && !viewTable"
                    @click="cancelOrder">
                    <TrashIcon 
                        class="size-6 text-blue-800 hover:text-red-800" />
                </button>
            </div>

            <div 
                :class="{
                    'h-52 overflow-y-auto' : products.length > 3
                }"
                class="my-2 border-2 border-blue-600 rounded"
                v-if="viewTable">
                <table class="w-full text-sm text-left rtl:text-right">
                    <thead class="text-xs uppercase bg-gray-200 sticky top-0 z-10">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product
                            </th>

                            <th scope="col" class="px-6 py-3">
                                Amount
                            </th>

                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>

                            <th scope="col" class="px-6 py-3 text-center">
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b"
                            v-for="product in products"
                            :key="product.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                                {{ product.name }}
                            </th>

                            <td class="px-6 py-4">
                                {{ product.amount }}
                            </td>

                            <td class="px-6 py-4">
                                {{ product.price }} Bs.
                            </td>

                            <td class="px-6 py-4 flex justify-center gap-3">
                                <button
                                    @click="viewOrder(product.id)">
                                    <EyeIcon
                                        class="size-6 text-blue-700"/>
                                </button>

                                <button
                                    @click="editProduct(product.id)">
                                    <PencilIcon
                                        class="size-6 text-blue-700"/>
                                </button>

                                <button
                                    @click="viewDelete(product.id)">
                                    <TrashIcon
                                        class="size-6 text-blue-700"/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button
                @click="addProduct"
                v-if="viewAddProductButton"
                class="flex flex-row items-center text-blue-800 mb-2">
                <PlusCircleIcon 
                    class="size-8"/>New Product
            </button>

            <div 
                v-if="viewProductSection"
                class="border-2 border-blue-800 my-2 p-2 rounded bg-white">
                <ProductSelect 
                    @productCancel = "state => onProductCancel(state)"
                    @productRegister="(product => productRegister(product))" />
            </div>

            <div 
                v-if="viewButtonOrders"
                class="flex flex-row gap-3">
                <Button
                    @click="cancelOrder"
                    type="danger"
                    xSize="md"
                    name="Cancel Order"/>

                <Button
                    @click="registerOrder"
                    xSize="md"
                    name="Order"/>
            </div>
        </div>

        <div 
            class=" absolute z-20 inset-0 flex justify-center items-center m-2"
            v-if="viewOrderDetails">
            <div class="bg-white rounded w-full h-full border-2 border-blue-800 overflow-y-auto">
                <View
                    @buttonClosed="(viewOrderDetails = false)"
                    :content="findOrder"
                    type="product"/>
            </div>
        </div>
        
        <div 
            v-if="viewEditProduct"
            class="absolute z-20 inset-0 flex justify-center items-center m-2">
            <EditProduct 
                @buttonClick="(action => editAction (action))"
                :product="product"/>
        </div>
    </div>
    
    <div 
        v-if="viewNotification"
        class="absolute z-20 inset-0 w-full h-full">
        <Modal
            :message="'Delete '+ productName "
            @buttonClick="(type => deleteProduct(type))"/>
    </div>
</template>