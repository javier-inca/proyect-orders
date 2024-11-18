<script setup>
import { computed } from 'vue'


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

    buttonColor: {
        type: String,
        default: 'primary'
    },

    buttonType: {
        type: String,
        default: 'solid'
    },

    isDisabled : {
        type: Boolean,
        default: false
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

const solidButtonColors = {
    'primary' : 'bg-primary text-white border-primary',
    'secondary' : 'bg-secondary text-white border-secondary',
    'danger' : 'bg-danger text-white border-danger',
    'warning' : 'bg-warning text-white border-warning',
    'information' : 'bg-information text-white border-information',
    'success' : 'bg-success text-white border-success',
}

const lightButtonColors = {
    'primary' : 'bg-light-primary text-primary border-primary',
    'secondary' : 'bg-light-secondary text-secondary border-secondary',
    'danger' : 'bg-light-danger text-danger border-danger',
    'warning' : 'bg-light-warning text-warning border-warning',
    'information' : 'bg-light-information text-information border-information',
    'success' : 'bg-light-success text-success border-success',
}

const ghostButtons = {
    'primary' : 'bg-white text-primary border-primary',
    'secondary' : 'bg-white text-secondary border-secondary',
    'danger' : 'bg-white text-danger border-danger',
    'warning' : 'bg-white text-warning border-warning',
    'information' : 'bg-white text-information border-information',
    'success' : 'bg-white text-success border-success',
}

const buttonSize = computed(() => {
    return buttonSizes[props.buttonSize] ? buttonSizes[props.buttonSize] : 'w-full'
})

const buttonAlignment = computed(() => {
    return buttonAlignments[props.buttonAlignment] ? buttonAlignments[props.buttonAlignment] : 'justify-center'
})

const buttonColor = computed(() => {
    if(props.buttonType === 'solid'){
        return solidButtonColors[props.buttonColor] ? solidButtonColors[props.buttonColor] : 'bg-danger'
    }

    if(props.buttonType === 'light'){
        return lightButtonColors[props.buttonColor] ? lightButtonColors[props.buttonColor] : 'bg-danger'
    }

    if(props.buttonType === 'ghost'){
        return ghostButtons[props.buttonColor] ? ghostButtons[props.buttonColor] : 'bg-danger'
    }
})
</script>

<template>
    <div 
        :class="[
            buttonSize,
            buttonAlignment,
            buttonColor,
            {
                '!bg-gray-100 !text-gray-500 !border-gray-500 !border !cursor-not-allowed' : isDisabled
            }
        ]"
        class="flex gap-2 cursor-pointer min-w-[150px] items-center p-2 rounded-md border-2 font-bold">
        <component
            :is="leftIcon"
            class="size-5"/>

        <p>
            {{ buttonName }}
        </p>

        <component
            :is="rightIcon"
            class="size-5" />
    </div>
</template>