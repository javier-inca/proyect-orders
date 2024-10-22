<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: ''
    },

    aling:{
        type: String,
        default: 'center'
    },
    size:{
        type:String,
        default:''
    }
})

const sizes ={
    'sm' : 'text-xl',
    'md' : 'text-2xl',
    'lg' : 'text-3xl',
}

const size = computed(()=>{
    return sizes[props.size] ? sizes[props.size] : 'text-base'
})
</script>

<template>
    <div 
        :class="[
            size,
            {
                'text-center' : aling === 'center',

                'text-left' : aling === 'left',

                'text-right' : aling === 'right',
            }]">
        {{title}}
    </div>
</template>