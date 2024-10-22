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
    <div class="">
        <input :class="[
            xSize,
            {
                ' ring-blue-500 bg-slate-50 focus:bg-white focus:ring-blue-700 ': !error,
                
                ' ring-red-600 bg-red-100 focus:ring-red-600': error
            }
        ]"
        class="p-2 rounded ring-2 h-10"
        :placeholder="placeholder"
        :type="type"
        v-model="modelInput">
        <p 
            v-if="error" 
            class="text-red-500 px-2 ">
            {{ messageError }}
        </p>
    </div>
</template>