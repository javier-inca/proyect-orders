<script setup>
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import Input from '../../components/Input.vue'
import Button from '../../components/Button.vue'
import { computed } from 'vue'

const props =defineProps({
    name:{
        type:String,
        default:''
    },

    nameError:{
        type:String,
        default:''
    },

    price:{
        type:Number,
        default:null
    },

    priceError:{
        type:String,
        default:''
    },

    actionType:{
        type:String,
        default:'Register'
    }
})
const emit= defineEmits()

const inputName = computed({
    get: ()=>props.name,
    set: (newValue) =>{
        emit('update:name',newValue)
    }
})

const inputPrice = computed({
    get: () => props.price,
    set: (newValue) => {
        emit('update:price', newValue)
    }
})

const clickButton = (type) => {
    emit('clickButton',type)
}
</script>

<template>
    <div 
        class="w-3/5 md:w-2/5 lg:w-2/6 2xl:w-1/6 h-2/5 bg-white rounded-xl border border-black-custom shadow-2xl ">
        <div class="w-full h-10 bg-black-custom rounded-t-xl flex justify-end">
            <button
                @click="clickButton('cancel')"
                class="mx-3">
                <XMarkIcon
                    class="size-6 text-white hover:text-secondary"/>
            </button>
        </div>

        <div class=" flex flex-col items-center mt-10 w-full h-full">
            <div class="p-2">
                <p
                    class="uppercase text-black">
                    {{ actionType }} product
                </p>
            </div>
            
            <ShoppingCartIcon
                class=" size-2/6 text-black-custom"/>

            <Input
                :messageError="nameError"
                v-model="inputName"
                placeholder="Product Name"/>

            <Input
                type="number"
                :messageError="priceError"
                v-model="inputPrice"
                class=" mt-2"
                placeholder="Product Price"/>

            <Button
                @click="clickButton('create')"
                class="mt-5"
                :name="actionType"/>
        </div>
    </div>
</template>