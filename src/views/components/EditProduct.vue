<script setup>
import Title from '../../components/Title.vue'
import Input from '../../components/Input.vue'
import Button from '../../components/Button.vue'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
    product:{
        type:Object,
        default:{}
    }
})

const getProducts = ref(JSON.parse(localStorage.getItem('productArray')))

const viewButton = ref(true)
const unitPrice = ref(getProducts.value.find(product => product.name === props.product.name).price)
const amount =ref(props.product.amount)
const description =ref(props.product.description)
const cash =ref(props.product.cash)
const price =ref(props.product.price)
const change =ref(props.product.change)

watch ([amount,cash,price],()=>{
    viewButton.value = (amount.value > 0 && cash.value >= price.value) ? true: false
    price.value = unitPrice.value * amount.value
    change.value = (cash.value >= price.value)? (cash.value - price.value) : ''
})

const emit =defineEmits()

const buttonClick = (action)=>{
    if(action === 'cancel'){
        emit('buttonClick', {
            type: action
        })
    }
    if(action === 'update'){
        emit('buttonClick', {
            type: action,
            order : {
                id:props.product.id,
                name:props.product.name,
                amount:amount.value,
                description:description.value,
                cash:cash.value,
                price:price.value,
                change:change.value,
            }
        })
    }
}
</script>

<template>
    <div class=" w-full h-full bg-white p-2 overflow-y-auto">
        <Title 
            :title="product.name"
            size="sm"/>

        <div class="grid grid-cols-3 gap-2">
            <Input 
                class="col-span-3"
                placeholder="Amount"
                v-model="amount"/>

            <Input 
                class="col-span-3"
                placeholder="Description"
                v-model="description"/>

            <Input 
                placeholder="Cash"
                v-model="cash"/>

            <Input 
                :disabled="true"
                placeholder="Price"
                v-model="price"/>

            <Input 
                :disabled="true"
                placeholder="Change"
                v-model="change"/>
        </div>

        <div class="flex flex-row gap-2 my-4">
            <Button 
                @click="buttonClick('cancel')"
                v-if="viewButton"
                xSize="lg"
                name="Cancel"
                type="danger"/>

            <Button 
                @click="buttonClick('update')"
                v-if="viewButton"
                xSize="lg"
                name="Update"/>
        </div>
    </div>
</template>