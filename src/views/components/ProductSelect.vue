<script setup>
import Select from '../../components/Select.vue'
import Input from '../../components/Input.vue'
import Button from '../../components/Button.vue'
import { ref, watch } from 'vue'

const idProduct = ref(0)
const price = ref()
const amount = ref()
const cash = ref()
const totalPrice = ref()
const change = ref()
const description = ref()

const viewProductDetails = ref(false)
const viewPrices = ref(false)
const viewButtons = ref(false)

const products = ref(JSON.parse(localStorage.getItem('productArray')))

const emit = defineEmits('productRegister')

watch([idProduct,amount,cash],()=>{
    viewProductDetails.value = idProduct.value > 0 ? true : false
    price.value = idProduct.value > 0 ? products.value.find(product => product.id === idProduct.value).price : 0 
    viewPrices.value = amount.value > 0 && viewProductDetails.value ? true : false
    totalPrice.value = (amount.value * price.value)
    change.value = cash.value >= totalPrice.value  && viewPrices.value ? (cash.value - totalPrice.value) : null
    viewButtons.value = change.value >= 0 && change.value != null ? true : false
})

const cancelClick =()=>{
    idProduct.value = 0
    amount.value = null
    cash.value = null
    description.value = ''
}

const registerProduct = () => {
    const product={
        product: products.value.find(product => product.id === idProduct.value).name,
        amount: amount.value,
        description:description.value,
        cash:cash.value,
        price:totalPrice.value,
        change:change.value,
    }
    emit('productRegister', product)
    cancelClick()
}
</script>

<template>
    <div class="grid grid-cols-2 gap-3">
        <Select
            v-model="idProduct">
            <option 
                value="0" 
                selected 
                disabled>
                Select Product
            </option>

            <option 
                :value="product.id"
                v-for="product in products"
                :key="product.id">
                {{ product.name }}
            </option>
        </Select>

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
            @click="cancelClick"
            v-if="viewButtons"
            name="Cancel"
            type="danger"/>

        <Button 
            @click="registerProduct"
            v-if="viewButtons"
            name="Register"/>
    </div>
</template>