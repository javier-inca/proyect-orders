<script setup>
import { computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        default: 'name'
    },

    type: {
        type: String,
        default: "default",
    },

    disabled:{
        type:Boolean,
        default:false
    },

    rounded: {
        type: Boolean,
        default: true
    },

    roundedSize: {
        type: String,
        default: ''
    },

    ringSize: {
        type: String,
        default: ''
    },

    xSize:{
        type:String,
        default: ''
    },
});

const ringSizes = {
    'sm' : 'ring-1',
    'md' : 'ring-4',
    'lg' : 'ring-8',
}

const roundedSizes = {
    'sm' : 'rounded-md',
    'md' : 'rounded-lg',
    'lg' : 'rounded-3xl',
}
const xSizes = {
    'sm' : 'w-1/4',
    'md' : 'w-2/3',
    'lg' : 'w-full',
}

const ringSize = computed(() => {
    return ringSizes[props.ringSize] ? ringSizes[props.ringSize] : 'ring-2'
})

const sizeRounded = computed(() => {
    return roundedSizes[props.roundedSize] ? roundedSizes[props.roundedSize] : 'rounded'
})

const xSize = computed(() => {
    return xSizes[props.xSize] ? xSizes[props.xSize] : 'w-auto'
})
</script>

<template>
    <button :class="[,
        transition,
        time,
        xSize,
        sizeRounded,
        ringSize,
        {
            'hover:bg-secondary ring-secondary hover:ring-secondary text-black hover:text-white': type === 'danger',

            'hover:bg-green-600 ring-green-600 hover:ring-green-800': type === 'accept',

            'hover:bg-yellow-400 ring-yellow-400 hover:ring-yellow-600': type === 'warning',

            'bg-secondary hover:bg-transparent ring-secondary text-white': type === 'default',

            'ring-slate-500 bg-slate-100 !text-slate-500 hover:!bg-slate-100 cursor-not-allowed':disabled,

            'hover:text-black':!disabled,
            
            'rounded': rounded,
        }]" 
        class="py-2 px-4"
        :disabled="disabled">
        {{ name }}
    </button>
</template>