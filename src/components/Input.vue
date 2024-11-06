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
    },

    complementaryData :{
        type:String,
        default :''
    },

    textAlignment:{
        type:String,
        default:'start'
    },

    label:{
        type:String,
        default:''
    }
})

const textAlignments = {
    'start' : 'text-start',
    'center' : 'text-center',
    'end' : 'text-end',
}

const xSizes ={
    'sm' : 'w-1/4',
    'md' : 'w-1/2',
    'lg' : 'w-2/3',
    'xl' : 'w-full',
}

const textAlignment = computed(()=>{
    return textAlignments[props.textAlignment] ? textAlignments[props.textAlignment] : 'text-start'
})

const xSize = computed(()=>{
    return xSizes[props.xSize] ? xSizes[props.xSize] : 'w-full'
})

const emit = defineEmits('update:modelValue')

const modelInput = computed({
    get: () => props.modelValue,
    set: (newValue) => { 
        emit ('update:modelValue', newValue) }
})
</script>

<template>
    <div class="rounded-md">
        <label
            v-if="label.length>0"
            class="text-xs">
            {{ label }}
        </label>
        <input 
            :class="[
                textAlignment,
                xSize,
                'p-2 rounded border-2 h-10 ',
                {
                    'border-black-custom bg-white focus:border-primary focus:outline-none': !error && !disabled,
                    'border-red-600 bg-red-100 focus:border-red-600': error && !disabled,
                    'border-primary bg-gray-200': disabled,
                }
            ]"
            :disabled="disabled"
            :placeholder="placeholder"
            :type="type"
            v-model="modelInput"
            @focus="isFocused = true"
            @blur="isFocused = false">
        <p 
            v-if="error" 
            class="text-red-500 px-2">
            {{ messageError }}
        </p>
    </div>
</template>