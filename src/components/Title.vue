<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: ''
    },

    aling:{
        type: String,
        default: ''
    },

    size:{
        type:String,
        default:''
    },

    isBold: {
        type: Boolean,
        default: true
    },

    isUppercase: {
        type: Boolean,
        default: true
    }
})

const sizes ={
    'sm' : 'text-xl',
    'md' : 'text-2xl',
    'lg' : 'text-3xl',
}

const alings = {
    'start' : 'text-start',
    'center' : 'text-center',
    'end' : 'text-end'
}

const size = computed(()=>{
    return sizes[props.size] ? sizes[props.size] : 'text-base'
})

const aling = computed(() => {
    return alings[props.aling] ? alings[props.aling] : 'text-center'
})
</script>

<template>
    <div 
        :class="[
            size,
            aling,
            {
                'font-bold' : isBold,
                'uppercase' : isUppercase
            }
        ]">
        <p
            v-if="title">
            {{ title }}
        </p>
        
        <slot/>
    </div>
</template>