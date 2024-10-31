<script setup>
import { computed, ref } from 'vue';

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

    value:{
        type:String,
        default:''
    }
})

const emit = defineEmits('update:value')

const textValue = computed({
    get : () => props.value,
    set: (newValue) => { emit ('update:value' , newValue) }
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
    return props.disabled ? 'bg-slate-200 border-2 border-slate-500':' bg-white border-2 border-blue-500'
})
</script>

<template>
    <textarea 
        :class="[
            ySize,
            classDisabled,
        ]"
        :disabled="disabled"
        :rows="rowSize"
        :placeholder="placeholder" 
        class="p-2 h-full resize-none rounded" 
        v-model="textValue"/>
</template>