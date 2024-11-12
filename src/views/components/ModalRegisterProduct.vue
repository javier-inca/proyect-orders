<script setup>
import { ListBulletIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import Title from '../../components/Title.vue';
import ProductSelectionForm from './ProductSelectionForm.vue';

const props = defineProps({
    person:{
        type:Object,
        default:{}
    },
})

const emit = defineEmits()

const clickButton =(type)=>{
    emit('clickButton', type)
}
</script>

<template>
    <div 
        class="w-3/5 md:w-2/5 lg:w-2/6 2xl:w-1/6 h-1/2 bg-white rounded-xl border border-black-custom shadow-2xl">
        <div class="w-full h-10 bg-black-custom rounded-t-xl flex justify-end">
            <button
                @click="clickButton('cancel')"
                class="mx-3">
                <XMarkIcon
                    class="size-6 text-white hover:text-secondary"/>
            </button>
        </div>

        <div class="flex justify-between m-2 items-center">
            <Title
                class=" font-bold"
                size="sm">
                Order from {{ person.name }} 
            </Title>

            <button
                class=" bg-primary p-1 rounded-full">
                <ListBulletIcon
                    class="size-6 text-black"/>
            </button>
        </div>

        <div class="relative">
            <div class="absolute z-0 w-full">
                <ProductSelectionForm
                    type="create"/>
            </div>

            <div class="fixed z-10">
                
            </div>
        </div>
    </div>
</template>