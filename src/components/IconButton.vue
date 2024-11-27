<script setup>
import { computed } from 'vue'


const props = defineProps({
    size: {
        type: String,
        default: ''
    }, 

    color: {
        type: String,
        default: 'primary'
    },

    type: {
        type: String,
        default: 'solid'
    },

    isDisabled : {
        type: Boolean,
        default: true
    },

    number : {
        type: Number,
        default: 0
    },

    isButton: {
        type: Boolean,
        default: false
    },

    icon: {
        type:[Object , Function],
        default: null
    },
})  

const solidColors = {
    'primary' : 'bg-primary text-white border-primary',
    'secondary' : 'bg-secondary text-white border-secondary',
    'danger' : 'bg-danger text-white border-danger',
    'warning' : 'bg-warning text-white border-warning',
    'information' : 'bg-information text-white border-information',
    'success' : 'bg-success text-white border-success',
}

const lightColors = {
    'primary' : 'bg-light-primary text-primary border-primary',
    'secondary' : 'bg-light-secondary text-secondary border-secondary',
    'danger' : 'bg-light-danger text-danger border-danger',
    'warning' : 'bg-light-warning text-warning border-warning',
    'information' : 'bg-light-information text-information border-information',
    'success' : 'bg-light-success text-success border-success',
}

const ghost = {
    'primary' : 'bg-white text-primary border-primary',
    'secondary' : 'bg-white text-secondary border-secondary',
    'danger' : 'bg-white text-danger border-danger',
    'warning' : 'bg-white text-warning border-warning',
    'information' : 'bg-white text-information border-information',
    'success' : 'bg-white text-success border-success',
}

const color = computed(() => {
    if(props.type === 'solid'){
        return solidColors[props.color] ? solidColors[props.color] : 'bg-danger'
    }

    if(props.type === 'light'){
        return lightColors[props.color] ? lightColors[props.color] : 'bg-danger'
    }

    if(props.type === 'ghost'){
        return ghost[props.color] ? ghost[props.color] : 'bg-danger'
    }
})
</script>

<template>
    <div
        class="relative"
        :class="{
            ' cursor-pointer' : isButton
        }">
        <div 
            :class="[
                color,
            ]"
            class="p-1.5 border rounded-full relative">
            <component
                :is="icon"
                class="size-5"/>
        </div>
        
        <span
            v-if="number > 0"
            class="absolute -top-2 -right-2 text-[11px] bg-danger text-white rounded-full p-0.5 w-5 h-5 text-center">
            {{ number }}
        </span>
    </div>
</template>