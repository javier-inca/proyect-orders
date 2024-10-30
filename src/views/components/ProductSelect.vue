<script setup>
import Select from '../../components/Select.vue'
import Input from '../../components/Input.vue'
import Button from '../../components/Button.vue'
import { ref, watch } from 'vue'
import InputSelect from '../../components/InputSelect.vue'

const price = ref()
const amount = ref()
const cash = ref()
const totalPrice = ref()
const change = ref()
const description = ref()
const nameProduct = ref()
const viewProductDetails = ref(false)
const viewPrices = ref(false)
const viewButtons = ref(false)
const resetInput = ref(false)
const filterProduct = ref(JSON.parse(localStorage.getItem('productArray')))
const selectedProducts = ref([])
const products = ref(JSON.parse(localStorage.getItem('productArray')))

const emit = defineEmits(['productRegister', 'hideButton'])

watch([nameProduct,amount,cash],()=>{
    totalPrice.value =( amount.value > 0 && price.value > 0) ? (amount.value * price.value) : ''
    viewPrices.value = (amount.value > 0) ? true:false
    change.value = (cash.value >= totalPrice.value) ? (cash.value - totalPrice.value) : ''
    viewButtons.value = (cash.value >= totalPrice.value && amount.value > 0 )? true : false
})

const registerProduct = () => {
    selectedProducts.value.push(nameProduct.value)
    filterProduct.value = products.value.filter(product => !selectedProducts.value.includes(product.name))    
    if(!(products.value.find(product => product.name === nameProduct.value))){
        products.value.push({
            id : (products.value[products.value.length - 1].id) + 1,
            name : nameProduct.value,
            price : price.value 
        })
        localStorage.setItem('productArray', JSON.stringify(products.value))
    }
    const product={
        name:nameProduct.value,
        description:description.value,
        amount: amount.value,
        cash:cash.value,
        price:totalPrice.value,
        change:change.value,
    }
    emit ('productRegister',product)
    deleteInput()
}

const deleteInput = ()=>{
    resetInput.value = true
    amount.value = ''
    description.value = ''
    price.value = ''
    cash.value =''
    change.value =''
    viewProductDetails.value = false
    resetInput.value = false
    emit ('productCancel')
}

const getProduct = (product) =>{
    nameProduct.value = product.name
    price.value = product.price
    amount.value = ''
    viewProductDetails.value = (product.name.length > 0 && product.price > 0 ) ? true : false
}
</script>

<template>
    <div class="grid grid-cols-2 gap-3">
    
        <InputSelect 
            :options="filterProduct"
            :reset="resetInput"
            @sentProduct="product=> getProduct(product)"/>

        <Input
            v-if="viewProductDetails"
            v-model="amount"
            placeholder="Amount"
            type="number"/>

        <Input 
            class="col-span-2"
            v-if="viewProductDetails"
            v-model="description"
            placeholder="Descripcion"/>

        <div 
            v-if="viewPrices"
            class="flex justify-between col-span-2 gap-2" >
            <Input 
                v-model="cash"
                type="number"
                placeholder="Cash"/>

            <Input
                v-model="totalPrice"
                :disabled="true"
                placeholder="Price"/>

            <Input
                v-model="change"
                :disabled="true"
                placeholder="Change"/>
        </div>

        <Button 
            @click="deleteInput"
            v-if="viewButtons"
            name="Cancel"
            type="danger"/>

        <Button 
            @click="registerProduct"
            v-if="viewButtons"
            name="Register"/>
    </div>
</template>