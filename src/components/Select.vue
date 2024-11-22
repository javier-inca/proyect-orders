<script setup>
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'
import { computed, ref } from 'vue'


const props= defineProps({
    selectData: {
        type: Array,
        default: []
    },

    isShowingSelection: {
        type: Boolean,
        default: true,
    },

    selectColor: {
        type: String,
        default: ''
    },

    dataName: {
        type: String,
        default: 'name'
    },

    inputValue: {
        type: String,
        default: 'Select'
    },

    message: {
        type: String,
        default: ''
    },

    size: {
        type: String,
        default: 'xl'
    },

    isPadding: {
        type: Boolean,
        default: true
    },
    
    label: {
        type: String,
        default: ''
    },

    errorMessage: {
        type: String,
        default: ''
    },

    isDisabled : {
        type: Boolean,
        default : false
    },

    placeholder: {
        type : String,
        default: '',
    }
})

const emit = defineEmits(['blurInput'])

const isEnabled= ref(false)

const selectColors = {
    'primary' : 'border-primary text-primary',
    'danger' : 'border-danger text-danger',
}

const sizes = {
    'sm' : 'w-1/4',
    'md' : 'w-2/4',
    'lg' : 'w-3/4',
    'xl' : 'w-full',
}

const selectColor = computed (() => {
    return selectColors[props.selectColor]? selectColors[props.selectColor] : 'border-primary text-primary'
})

const size = computed(() => {
    return sizes[props.size] ? sizes[props.size] : 'w-full'
})

const valueSelect = computed({
    get: () => props.inputValue,
    
    set: (newValue) => {
        emit('update:inputValue', newValue)
    }
})

const selectedOption = (option) => {
    emit('update:inputValue' , option)
    emit('blurInput')
    isEnabled.value = false
}

const showData = () => {
    if(!props.isDisabled){
        isEnabled.value = !isEnabled.value
    }
}
</script>

<template>
    <div 
        :class="[size]"
        class=" min-w-[100px] flex flex-col relative">
        <label
            :class="{
                'text-danger' : errorMessage
            }"
            v-if="label">
            {{ label }}
        </label>

        <div 
            :class="[
                selectColor,
                {
                    '!border-danger' : errorMessage,
                    ' !border-gray-600 ' : isDisabled
                }
            ]"
            class="relative z-10 border-2 rounded-md cursor-pointer w-full">
            <div 
                @click="showData()"
                :class="{
                    'bg-light-danger' : errorMessage,
                    '!bg-gray-200 !text-gray-600' : isDisabled,
                    'p-2' : isPadding
                }"
                class="flex items-center px-2 text-black justify-between rounded">
                <input 
                    :placeholder="placeholder"
                    class=" bg-transparent w-full cursor-pointer outline-none"
                    v-model="valueSelect"
                    type="text"
                    readonly>

                <ChevronDownIcon
                    :class="[
                        selectColor,
                        {
                            'rotate-180' : isEnabled
                        }
                    ]"
                    class="size-5 transition-all duration-300"/>
            </div>

            <div 
                v-if="isEnabled"
                :class="[
                    selectColor
                ]"
                class="!text-black px-2 pb-2 absolute w-full z-20 bg-white shadow-lg max-h-32 overflow-y-scroll rounded-md border-2">
                <p
                    v-for="data in selectData"
                    @click="selectedOption(data[props.dataName])"
                    :key="data.id"
                    class=" cursor-pointer">
                        {{ data[props.dataName] }}
                </p>
            </div>
            
        </div>

        <p
            class=" leading-4"
            :class="[ 
                selectColor,
                {
                    '!text-danger' : errorMessage
                }
            ]"
            v-if="!isEnabled && errorMessage">
            {{ errorMessage }}
        </p>
    </div>
    
    <div 
        @click="isEnabled = false"
        v-if="isEnabled"
        class="fixed top-0 left-0 w-full h-full z-0">
    </div>
</template>