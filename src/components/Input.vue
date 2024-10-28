<script setup>
import { computed } from 'vue';

const props=defineProps({
    placeholder:{
        type:String,
        default:''
    },

    type:{
        type:String,
        default:'text'
    },

    error:{
        type:Boolean,
        default:false
    },

    xSize:{
        type:String,
        default:''
    },

    messageError:{
        tipe:String,
        default:''
    },

    modelValue:{
        type:String,
        default:''
    },

    disabled :{
        type:Boolean,
        default: false
    }
})

const xSizes ={
    'sm' : 'w-1/4',
    'md' : 'w-1/2',
    'lg' : 'w-2/3',
    'xl' : 'w-full',
}

const xSize = computed(()=>{
    return xSizes[props.xSize] ? xSizes[props.xSize] : 'w-full'
})

const emit = defineEmits('update:modelValue')

const modelInput = computed({
    get: () => props.modelValue,
    set: (newValue) => { emit ('update:modelValue', newValue) }
})
</script>

<template>
    <div class="relative mt-2">
        <input 
            :class="[
                xSize,
                'p-2 rounded border-2 h-10',
                {
                    'border-blue-500 bg-white focus:border-blue-700': !error && !disabled,
                    'border-red-600 bg-red-100 focus:border-red-600': error && !disabled,
                    'border-blue-500 bg-gray-200': disabled,
                }
            ]"
            :disabled="disabled"
            :placeholder="placeholder"
            :type="type"
            v-model="modelInput"
            @focus="isFocused = true"
            @blur="isFocused = false">

        <label 
            v-if="modelInput" 
            class="absolute left-2 -top-2 text-xs bg-white rounded">
            {{ placeholder }}
        </label>
        <p 
            v-if="error" 
            class="text-red-500 px-2">
            {{ messageError }}
        </p>
    </div>
</template>