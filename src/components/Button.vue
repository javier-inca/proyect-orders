<script setup>
import { computed } from 'vue';


const props = defineProps({
    buttonName: {
        type:String,
        default: 'buttonName'
    },

    buttonSize: {
        type: String,
        default: ''
    }, 

    buttonAlignment: {
        type: String,
        default: ''
    },

    leftIcon: Object,

    rightIcon: Object,
})

const buttonSizes = {
    'sm' : 'w-1/4',
    'md' : 'w-2/4',
    'lg' : 'w-3/4',
    'xl' : 'w-full',
}

const buttonAlignments = {
    'start' : 'justify-start',
    'center' : 'justify-center',
    'end' : 'justify-end',
}

const buttonSize = computed(() => {
    return buttonSizes[props.buttonSize] ? buttonSizes[props.buttonSize] : 'w-full'
})

const buttonAlignment = computed(() => {
    return buttonAlignments[props.buttonAlignment] ? buttonAlignments[props.buttonAlignment] : 'justify-center'
})
</script>

<template>
    <div 
        :class="[
            buttonSize,
            buttonAlignment,

        ]"
        class="flex gap-2 cursor-pointer min-w-[200px] items-center">
        <component
            :is="leftIcon"
            class="size-5"/>

        <button>
            {{ buttonName }}
        </button>

        <component
            :is="rightIcon"
            class="size-5"/>
    </div>
</template>