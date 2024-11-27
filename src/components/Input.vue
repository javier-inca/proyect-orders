<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    placeholder: {
        type: String,
        default: ''
    },

    type: {
        type: String,
        default: 'text'
    },

    desing:{
        type: String,
        default: '' 
    },

    inputType:{
        type: String,
        default: ''
    },

    isRounded: {
        type: Boolean,
        default: true
    },

    textAlignment: {
        type: String,
        default: 'start'
    },

    errorMessage: {
        type: String,
        default: ''
    },

    isPadding: {
        type: Boolean,
        default : true
    },

    inputSize: {
        type: String,
        default: 'xl'
    },

    inputAlignment: {
        type: String,
        default: ''
    },

    label: {
        type: String,
        default: ''
    },

    optionText: {
        type: String,
        default: ''
    },

    modelValue:{
        type: [String , Number , Date],
        default: ''
    },

    isDisabled: {
        type: Boolean,
        default : false
    }
})

const desingOptions = {
    'complete' : 'border-2',
    'lineBelow' : 'border-b-2',
}

const inputTypes = {
    'primary' : 'border-primary',
    'secondary' : 'border-secondary',
    'warning' : 'border-warning',
}

const textAlignments = {
    'start' : 'text-start',
    'center' : 'text-center',
    'end' : 'text-end',
}

const inputSizes = {
    'sm' : 'w-1/4',    
    'md' : 'w-2/4',
    'lg' : 'w-3/4',
    'xl' : 'w-full',
}

const inputAlignments = {
    'start' : 'justify-start',
    'center' : 'justify-center',
    'end' : 'justify-end',
}

const desing = computed(() => {    
    return desingOptions[props.desing] ? desingOptions[props.desing] : 'border-2'
})

const inputType = computed(() => {
    return inputTypes[props.inputType] ? inputTypes[props.inputType] : 'border-primary'
})

const textAlignment = computed(() => {
    return textAlignments[props.textAlignment] ? textAlignments[props.textAlignment] : 'text-start'
})

const inputSize = computed(() => {
    return inputSizes[props.inputSize] ? inputSizes[props.inputSize] : 'w-full'
})

const inputAlignment = computed(() => {
    return inputAlignments[props.inputAlignment] ? inputAlignments[props.inputAlignment] : 'justify-start'
})

const emit = defineEmits(['blurInput', 'update:modelValue'])

const modelInput = computed({
    get: ()=>props.modelValue,
    set: (newValue) => {
        emit ('update:modelValue', newValue)
        emit('blurInput')
    }
})

const today = computed(() => {
    if (props.type === 'date') {
        const date = new Date()
        const yyyy = date.getFullYear()
        const mm = (date.getMonth() + 1).toString().padStart(2, '0')
        const dd = date.getDate().toString().padStart(2, '0')
        return `${yyyy}-${mm}-${dd}`
    }    
})

const maxDate = computed(() => {
    if(props.type === 'date'){
        const date = new Date()
        date.setMonth(date.getMonth() + 3)
        const yyyy = date.getFullYear()
        const mm = (date.getMonth() + 1).toString().padStart(2, '0')
        const dd = date.getDate().toString().padStart(2, '0')
        return `${yyyy}-${mm}-${dd}`
    }
})

const handleBlur = () => {
    if (props.type === 'number') {
        emit('update:modelValue', (parseFloat(props.modelValue)).toFixed(2))
    }
}

const handleKeydown = (event) => {
    if (props.type === 'date' && event.key !== 'Tab') {
        event.preventDefault()
    }
}
</script>

<template>
    <div class="flex flex-col">
        <label
            v-if="label"
            :class="{
                'text-danger' : errorMessage
            }">
            {{ label }}
        </label>

        <div
            :class="[
                inputAlignment,
                {
                    'bg-gray-200' : isDisabled
                }
            ]"
            class="flex w-full">
            <div :class="inputSize">
                <div 
                    :class="[
                        desing,
                        inputType,
                        {
                            'rounded-md ': isRounded,
                            '!border-danger bg-light-danger' : errorMessage,
                            'p-2' : isPadding,
                            'px-2' : !isPadding
                        }
                    ]"
                    class="flex items-center">
                    <input
                        @blur="handleBlur"
                        :class="[ textAlignment, ]"
                        :min="today"
                        :max="maxDate"
                        :placeholder="placeholder" 
                        :type="type" 
                        :disabled="isDisabled"
                        v-model="modelInput"
                        class="focus:outline-none w-full bg-transparent"
                        @keydown="handleKeydown">

                    <p
                        :class="{
                            'pl-2' : type !== 'number'
                        }"
                        class="pl-2"
                        v-if="optionText">
                        {{ optionText }}
                    </p>
                </div>

                <p
                    v-if="errorMessage"
                    class="text-danger text-sm text-justify leading-4">
                    {{ errorMessage }}
                </p>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
input[type="date"]:not([readonly]) {
    pointer-events: auto
}

input[type="date"][readonly] {
    pointer-events: none
}

input[type="number"]::-webkit-outer-spin-button,

input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>