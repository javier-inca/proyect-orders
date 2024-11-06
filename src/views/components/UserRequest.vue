<script setup>
import { computed, ref, watch } from 'vue'
import InputSelect from '../../components/InputSelect.vue'
import ProductForm from './ProductForm.vue'
import Button from '../../components/Button.vue'
import OrdersTableByUser from './OrdersTableByUser.vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import Input from '../../components/Input.vue';
import Select from '../../components/Select.vue';
import Title from '../../components/Title.vue';
import View from './View.vue';

const getUsers = ref(JSON.parse(localStorage.getItem('userArray')) || [])
const getProducts = ref(JSON.parse(localStorage.getItem('productArray')))
const selectedUser = ref(0)
const saveProducts = ref([])
const payment = ref()
const totalPrice = ref()
const change = ref(null)
const editProduct = ref({})
const indexProduct = ref()

const isButtonRegisterProduct = ref(false)
const isViewProductForm = ref(false)
const isViewOrderDetails = ref(false)
const isViewProductTable = ref(false)
const isViewProduct = ref(false)
const isViewEditProduct = ref(false)

const productSelect = ref({
    name:'',
    quantity:'',
    unitPrice:'',
    totalPrice:'',
    description:''
})

const filterProduct = computed(()=>{
    if(!productSelect.value.name){
        return getProducts.value
    }
    return getProducts.value.filter(product=>
    product.name.toLowerCase().includes(productSelect.value.name.toLocaleLowerCase())
    )
})

const registerProduct=(type)=>{
    if(type !== 'cancel'){
        saveProducts.value.push({...productSelect.value})
        productSelect.value={}
        totalPrice.value = saveProducts.value.reduce((sum, product) => {
            return sum + (product.totalPrice || 0);
        }, 0);
    }
    isViewProductTable.value = true
    isViewOrderDetails.value = true
    isViewProductForm.value=false
    productSelect.value.name = ''
    productSelect.value.description=''
}

const updateProduct = (type)=>{
    if(type !== 'cancel'){
        saveProducts.value.splice(indexProduct.value,1,editProduct.value)
        totalPrice.value = saveProducts.value.reduce((sum, product) => {
            return sum + (product.totalPrice || 0);
        }, 0);
    }
    isViewOrderDetails.value=true
    isViewProductTable.value=true
    isViewEditProduct.value=false

}

watch(()=>productSelect.value.name , ()=>{
    productSelect.value.unitPrice = getProducts.value.find(product => product.name === productSelect.value.name ) ? (getProducts.value.find(product => product.name === productSelect.value.name ).price ):''
    productSelect.value.quantity = (productSelect.value.name.length > 0)? 1:''
})

watch(editProduct, ()=>{
    editProduct.value.totalPrice = (editProduct.value.quantity > 0 && editProduct.value.unitPrice > 0) ? editProduct.value.quantity*editProduct.value.unitPrice : ''
    isButtonRegisterProduct.value = editProduct.value.totalPrice > 0
},{deep:true})

watch(productSelect, ()=>{
    productSelect.value.totalPrice = (productSelect.value.quantity > 0 && productSelect.value.unitPrice > 0) ? productSelect.value.quantity*productSelect.value.unitPrice : ''
    isButtonRegisterProduct.value = productSelect.value.totalPrice > 0 && productSelect.value.name.length > 0
},{deep:true})

watch([payment, saveProducts] , ()=>{
    change.value = (totalPrice.value>0 && payment.value>0) ? ((totalPrice.value <= payment.value)? payment.value-totalPrice.value: null ):null
},{deep:true})

watch(selectedUser,()=>{
    isViewProductForm.value = selectedUser.value!==0
})

const tableOptions = (details)=>{
    editProduct.value = details.product
    if(details.type === 'view'){
        isViewProduct.value = true
    }
    if(details.type === 'edit'){
        indexProduct.value = details.index
        isViewEditProduct.value = true
    }    
    isViewProductForm.value = false
    isViewOrderDetails.value = false
    isViewProductTable.value = false
}

const optionsClosed = ()=>{
    isViewProduct.value = false
    isViewProductForm.value = false
    isViewOrderDetails.value = true
    isViewProductTable.value = true
}
</script>

<template>
    <div class="relative">
        <div class="my-5 border-2 border-blue-800 rounded p-2">
            <Select
                size="md"
                v-if="selectedUser === 0"
                v-model="selectedUser"
                :options="getUsers"
                optionPlaceholder="Select User"/>

            <Title
                class=" pb-3"
                v-if="selectedUser !== 0"
                :title="selectedUser"
                size="sm"/>

            <OrdersTableByUser
                @buttonClick="(details => tableOptions(details))"
                v-if="isViewProductTable"
                :products="saveProducts"/>

            <ProductForm
                v-if="isViewProductForm"
                @clickButton="(type => registerProduct(type))"
                v-model:productName="productSelect.name"
                v-model:quantity="productSelect.quantity"
                v-model:unitPrice="productSelect.unitPrice"
                v-model:totalPrice="productSelect.totalPrice"
                v-model:description="productSelect.description"
                :isViewButton="isButtonRegisterProduct"
                :products="filterProduct"/>

            <button
                class=" rounded-full bg-blue-800"
                v-if="isViewOrderDetails"
                @click="[isViewProductForm = true, isViewOrderDetails = false, isViewProductTable = false]">
                <PlusIcon
                    class="size-7 text-white"/>
            </button>

            <div
                v-if="isViewOrderDetails" 
                class="flex gap-2 w-full">
                <Input
                    v-model="payment"
                    type="number"
                    label="Payment"/>

                <Input
                    v-model="totalPrice"
                    :disabled="true"
                    label="Total Price"/>

                <Input
                    v-model="change"
                    :disabled="true"
                    label="Change"/>
            </div>

            <div
                v-if="isViewOrderDetails" 
                class="flex gap-4 mt-5">
                <Button
                    name="Cancel"
                    type="danger"
                    xSize="lg"/>

                <Button
                    :disabled="(change == null)"
                    name="Order"
                    xSize="lg"/>
            </div>

            <View
                @buttonClosed="optionsClosed"
                v-if="isViewProduct"
                :content="editProduct"/>

            <ProductForm
                @clickButton="(type => updateProduct(type))"
                :isViewButton="isButtonRegisterProduct"
                nameButton="Update"
                type="edit"
                v-model:productName="editProduct.name"
                v-model:quantity="editProduct.quantity"
                v-model:unitPrice="editProduct.unitPrice"
                v-model:totalPrice="editProduct.totalPrice"
                v-model:description="editProduct.description"
                v-if="isViewEditProduct"/>
        </div>
    </div>
</template>