<script setup>
import { computed } from 'vue';

const props = defineProps({
    size : {
        type:String,
        default:''
    },

    disabled:{
        type:Boolean,
        default:false
    },

    modelValue:{
        type:String,
        default:''
    }
})

const sizes = {
    'sm':'w-1/4',
    'md':'w-1/2',
    'lg':'w-full',
}

const size = computed (()=>{
    return sizes[props.size] ? sizes[props.size] : 'w-full'
})

const emit = defineEmits('update:modelValue')

const modelSelect = computed({
    get: ()=> props.modelValue,
    set: (newValue) => {emit ('update:modelValue', newValue)}
})
</script>

<template>
    <select
        v-model="modelSelect"
        :class="[
            size
        ]"
        class="border-2 border-blue-500 rounded w-1/2 p-2"
        :disabled="disabled">
        <slot></slot>
    </select>
</template>