<script setup>
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { computed, normalizeClass, ref } from 'vue'
import { parse } from 'vue/compiler-sfc';

const props = defineProps({
    valueNumber:{
        type: Number,
        default: 1
    }
})

const emit = defineEmits()

const modelNumber = computed({
    get: () => props.valueNumber,
    set: (newValue) =>{
        emit('update:valueNumber' , newValue)
    }
})

const validateNumber = () =>{
    emit('update:valueNumber' , Math.floor(modelNumber.value))
    
    if(modelNumber.value > 99 ) {
        emit('update:valueNumber' , 99)
    } 

    if(modelNumber.value < 1 ) {
        emit('update:valueNumber' , 1) 
    }

}
</script>

<template>
    <div class="flex items-center border rounded-xl border-primary">
        <button
            :class="{
                '!bg-light-primary !rounded-l-xl':modelNumber <= 1,
                'text-white': modelNumber > 1
            }"
            :disabled="modelNumber <= 1"
            @click="modelNumber = modelNumber - 1"
            class="bg-primary p-1 rounded-l-lg">
            <MinusIcon
                class="size-5"/>
        </button>

        <input
            @blur="validateNumber"
            type="number"
            class=" w-10 text-center"
            v-model="modelNumber"/>

        <button
            :class="{
                '!bg-light-primary !rounded-r-xl':modelNumber >= 99,
                'text-white': modelNumber < 99
            }"
            :disabled="modelNumber >= 99"
            @click="modelNumber = parseInt(modelNumber) + 1"
            class="bg-primary p-1 rounded-r-lg">
            <PlusIcon
                class="size-5"/>
        </button>
    </div>    
</template>

<style scoped>
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
</style>