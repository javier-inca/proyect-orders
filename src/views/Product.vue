<script setup>
import Title from '../components/Title.vue'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import { PencilSquareIcon } from '@heroicons/vue/16/solid'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import Modal from '../components/Modal.vue'
import Notification from '../components/Notification.vue'
import Navbar from './Navbar.vue'

const viewNotification = ref(false)
const viewRegister = ref(false)
const viewMessage = ref(false)
const clickUpdate = ref(false)
let globalId = null

const name = ref('')
const message = ref('')
const nameDelete = ref('')
const price = ref('')
const typeMessage = ref('')

if (!localStorage.getItem('productArray')) {
    localStorage.setItem('productArray', JSON.stringify([]))
}

const getProductArray = ref(JSON.parse(localStorage.getItem('productArray')))

const clickRegister = ()=>{
    viewRegister.value=true
}

const cancelUpdateProduct =()=>{
    name.value = ''
    price.value = ''
    viewRegister.value=false
    clickUpdate.value =false
} 

const create = ()=>{
    const productId = globalId !== null ? globalId : (getProductArray.value.length ? getProductArray.value[getProductArray.value.length - 1].id + 1 : 1);
    if (globalId !== null) {
        const productIndex = getProductArray.value.findIndex(product => product.id === globalId);
        getProductArray.value[productIndex].name = name.value
        getProductArray.value[productIndex].price= price.value
        clickUpdate.value = false
        message.value='Updated product'
    } else {
        getProductArray.value.push({ id: productId, name: name.value , price: price.value});
        message.value='Registered product'
    }
    localStorage.setItem('productArray', JSON.stringify(getProductArray.value));
    name.value = ''
    price.value=''
    globalId = null
    viewRegister.value=false
    typeMessage.value='success'
    viewMessage.value=true

    setTimeout(()=>{
        viewMessage.value = false
    }, 1500)
}



const findProduct=(id)=>{
    globalId = id
    const product = getProductArray.value.find(product => product.id === id)
    name.value=product.name
    price.value=product.price
    clickUpdate.value = true
    viewRegister.value= true
}

const clickDelete=(product)=>{
    globalId = product.id
    nameDelete.value = 'Delete '+product.name
    viewNotification.value=true
}

const notification = (type) =>{
    type === 'delete' ? deleteProduct() : cancelDelete()
}

const cancelDelete = ()=>{
    globalId = null
    nameDelete.value = ''
    viewNotification.value = false
}

const deleteProduct = ()=>{
    const index = getProductArray.value.findIndex(product => product.id === globalId)
    getProductArray.value.splice(index,1)
    localStorage.setItem('productArray', JSON.stringify(getProductArray.value));
    cancelDelete()
    message.value='Deleted product'
    typeMessage.value='danger'
    viewMessage.value=true

    setTimeout(()=>{
        viewMessage.value = false
    }, 1500)
} 
</script>

<template>
    <div class=" relative">
        <div
            v-if="viewNotification" 
            class="fixed z-30 w-full h-full">
            <Modal
                :message="nameDelete"
                @buttonClick="(type => notification(type))"/>
        </div>

        <div
            v-if="viewRegister"
            class="fixed z-20 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
            <div 
                class=" grid grid-cols-1 bg-blue-50 p-5 my-5 w-2/3 gap-2 rounded-lg shadow-md">
                <Title 
                    :title="clickUpdate ? 'Update Product' : 'Register Product'" 
                    size="md" />

                
                <Input 
                    v-model="name"
                    class="mt-5 flex justify-center" 
                    placeholder="Name" 
                    xSize="lg" />           
                    
                <Input 
                    v-model="price"
                    class="mt-5 flex justify-center" 
                    placeholder="Price"
                    type="number" 
                    xSize="lg" />  

                <div class="flex justify-center gap-6">
                    <Button 
                        @click="cancelUpdateProduct"
                        type="danger"
                        class="mt-5" 
                        name="Cancel"
                        xSize="md" />

                    <Button 
                        :name="clickUpdate ? 'Update' : 'Register'"
                        @click="create"
                        class="mt-5" 
                        xSize="md" />
                </div>
            </div>
        </div>

        <div 
            :class="{
                'fixed':viewNotification
            }"
            class="z-0 w-full">

            <Navbar/>

            <Notification
                v-if="viewMessage"
                :message="message"
                :type="typeMessage"/>

            <div class=" mt-5">
                <div class="w-full bg-blue-50 p-5">
                    <div class="flex justify-between">
                        <Title 
                            title="Product List"
                            size="md"/>

                        <Button
                            xSize="sm"
                            @click="clickRegister"
                            name="New"
                            type="accept"/>
                    </div>
                    
                    <div 
                        class="flex justify-center flex-grow border-b-2 border-blue-900 gap-6"
                        v-for="product in getProductArray" 
                        :key="product.id">
                        <div 
                            class="m-2 p-2 rounded w-1/3 lg:w-96">
                            {{ product.name }}
                        </div>

                        <div 
                            class="m-2 p-2 rounded w-1/3 lg:w-96">
                            price: {{ product.price }} Bs
                        </div>

                        <button
                            :disabled="clickUpdate"
                            @click="findProduct(product.id)">
                            <PencilSquareIcon
                                :class="{
                                    'text-black hover:text-black' :clickUpdate,
                                    'text-blue-900 hover:text-green-600': !clickUpdate,
                                }"
                                class="w-6" />
                        </button>
                            
                        <button
                            :disabled="clickUpdate"
                            @click="clickDelete(product)">
                            <TrashIcon
                                :class="{
                                    'text-black hover:text-black':clickUpdate,
                                    'text-blue-900 hover:text-red-600':!clickUpdate,
                                }"
                                class="w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>