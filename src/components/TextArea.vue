<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    placeholder :{
        type:String,
        default:''
    },

    ySize :{
        type:String,
        default:''
    },

    rowSize:{
        type:Number,
        default:2
    },

    disabled:{
        type:Boolean,
        default:false
    },

    modelValue:{
        type:String,
        default:''
    },

    label: {
        type: String,
        default: ''
    },

    errorMessage: {
        type: String,
        default: ''
    }
})

const emit = defineEmits('update:modelValue' , 'blurInput')

const timeoutId = ref(null)

const textValue = computed({
    get: () => props.modelValue,
    set: (newValue) => { 
        emit ('update:modelValue' , newValue) 
        emit('blurInput')
    }
})

const ySizes ={
    'sm':'w-1/3',
    'md':'w-1/2',
    'lg':'w-2/3',
    'xl':'w-full',
}

const ySize = computed(()=>{
    return ySizes[props.ySize] ? ySizes[props.ySize] : 'w-full'
})

const classDisabled = computed(()=>{
    return props.disabled ? 'bg-slate-200 border-2 border-slate-500':' bg-white border-2 border-primary focus:outline-none'
})
</script>

<template>
    <div class="flex flex-col">
        <label
            :class="{
                'text-danger' : errorMessage
            }">
            {{ label }}
        </label>

        <textarea
        :class="[
            ySize,
            classDisabled,
            {
                '!border-danger !bg-light-danger' : errorMessage
            }
        ]"
        :disabled="disabled"
        :rows="rowSize"
        :placeholder="placeholder" 
        class="p-2 h-full resize-none rounded" 
        v-model="textValue" />

        <p
            class="text-danger text-sm text-justify">
            {{ errorMessage }}
        </p>
    </div>
</template>