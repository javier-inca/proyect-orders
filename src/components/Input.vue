<script setup>
import { computed } from 'vue'

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
        default: ''
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
        default: ''
    },

    inputAlignment: {
        type:String,
        default: ''
    },

    label: {
        type: String,
        default: ''
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
</script>

<template>
    <div class="flex justify-between max-w-96">
        <label
            v-if="label"
            :class="{
                'text-danger' : errorMessage
            }">
            {{ label }}
        </label>

        <div
            :class="inputAlignment"
            class="flex w-full">
            <div :class="inputSize">
                <input
                    :class="[
                        textAlignment,
                        inputType,
                        desing,
                        {
                            'rounded-md' : isRounded,
                            '!border-danger bg-danger bg-opacity-10' : errorMessage,
                            'p-2' : isPadding,
                        }
                    ]"
                    :placeholder="placeholder" 
                    :type="type" 
                    class="focus:outline-none w-full">
                    
                <p
                    v-if="errorMessage"
                    class="text-danger text-sm text-justify">
                    {{ errorMessage }}
                </p>
            </div>
        </div>
    </div>
    
</template>

<!-- <script setup>
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
        type:String,
        default:''
    },

    modelValue:{
        type:String,
        default:''
    },

    disabled :{
        type:Boolean,
        default: false
    },

    complementaryData :{
        type:String,
        default :''
    },

    textAlignment:{
        type:String,
        default:'start'
    },

    label:{
        type:String,
        default:''
    },

    complementText:{
        type:String,
        default:''
    }
})

const textAlignments = {
    'start' : 'text-start',
    'center' : 'text-center',
    'end' : 'text-end',
}

const xSizes ={
    'sm' : 'w-1/4',
    'md' : 'w-1/2',
    'lg' : 'w-2/3',
    'xl' : 'w-full',
}

const textAlignment = computed(()=>{
    return textAlignments[props.textAlignment] ? textAlignments[props.textAlignment] : 'text-start'
})

const xSize = computed(()=>{
    return xSizes[props.xSize] ? xSizes[props.xSize] : 'w-auto'
})

const emit = defineEmits('update:modelValue')

const modelInput = computed({
    get: () => props.modelValue,
    set: (newValue) => { 
        emit ('update:modelValue', newValue) }
})
</script>

<template>
    <div class="flex justify-between">
        <label
            v-if="label"
            :class="{
                '!text-red-500' : messageError
            }"
            class="font-bold flex-shrink-0 min-w-36">
            {{ label }}
        </label>

        <div class="flex justify-end">
            <div 
                :class="xSize">
                <input 
                    :class="[
                        textAlignment,
                        'border-b pl-2',
                        {
                            'border-black-custom bg-white focus:border-primary focus:outline-none': !messageError && !disabled,
                            'border-red-600 bg-red-100 focus:border-red-600 focus:outline-none': messageError && !disabled,
                            'border-black-custom bg-gray-100': disabled,
                        }
                    ]"
                    class="w-full"
                    :disabled="disabled"
                    :placeholder="placeholder"
                    :type="type"
                    v-model="modelInput"
                    @focus="isFocused = true"
                    @blur="isFocused = false">

                <div class="flex justify-end">
                    <p 
                        v-if="messageError" 
                        class="text-red-500 text-sm break-words">
                        {{ messageError }}
                    </p>
                </div>
            </div>

            <p  
                v-if="complementText"
                :class="{
                    'text-red-500' : messageError
                }">
                {{ complementText }}
            </p>
        </div>
    </div>
</template> -->