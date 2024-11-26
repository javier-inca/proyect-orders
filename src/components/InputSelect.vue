<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { computed, ref, watch } from 'vue'


const props= defineProps({
    selectData: {
        type:Array,
        default: []
    },

    selectColor: {
        type: String,
        default: 'primary'
    },

    isFiltered: {
        type: Boolean,
        default: true
    },

    dataName: {
        type: String,
        default: 'name'
    },

    inputValue: {
        type: String,
        default: ''
    },

    isReset: {
        type: Boolean,
        default: true
    },

    errorMessage: {
        type: String,
        default: ''
    },

    placeholder: {
        type: String,
        default: ''
    },

    label: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['blurInput'])

const filterData = ref()

const isEnabled = ref(false)

const selectColors= {
    'primary' : 'border-primary text-primary',
    'secondary' : 'border-secondary text-secondary',
    'danger' : 'border-danger text-danger',
    'warning' : 'border-warning text-warning',
    'information' : 'border-information text-information',
    'success' : 'border-success text-success',
}

const selectColor = computed(() =>{
    return selectColors[props.selectColor] ? selectColors[props.selectColor] : 'border-primary'
})

const valueInput = computed({
    get: () => props.inputValue,
    set: (newValue) => {
        emit('update:inputValue', newValue)
    }
})
 
const selectedOption = (option) =>{
    isEnabled.value = false

    emit('update:inputValue', option)
}

watch( valueInput, () => {    
    if (props.isFiltered) {
        const filtered = props.selectData.filter(
            option => option[props.dataName]?.toLowerCase().includes(props.inputValue.toLowerCase())
        )

        filterData.value = filtered

        if(filtered.length > 0){
            if(valueInput.value === filterData.value[0].name){
                isEnabled.value = false
                return
            }
        }
        
        if(filterData.value.length > 0 && filterData.value.length !== props.selectData.length){
            isEnabled.value = true
            return
        }

        isEnabled.value =false
    }
})

const resetInput = () => {
    filterData.value = props.selectData
    if (props.isReset) {
        emit('update:inputValue', '')
    }
    isEnabled.value = !isEnabled.value 
}

const blur = () => {
    emit ('blurInput')
}
</script>

<template>
    <div 
        class="w-full min-w-[200px] flex flex-col">
        <label
            :class="{'text-danger' : errorMessage}">
            {{ label }}
        </label>

        <div 
            :class="[
                selectColor,
                {'!border-danger bg-light-danger' : errorMessage}
            ]"
            class="relative z-10 border-2 rounded-md">
            <div 
                class="flex items-center px-2">
                <input
                    @blur="blur"
                    :placeholder="placeholder"
                    v-model="valueInput" 
                    @click="resetInput()"
                    class="focus:outline-none w-full !text-black bg-transparent"
                    type="text">

                <ChevronDownIcon
                    @click="resetInput"
                    :class="[
                        selectColor,
                        {
                            'rotate-180' : isEnabled
                        }
                    ]"
                    class="size-5 transition-all duration-300" />
            </div> 

            <div 
                v-if="isEnabled"
                :class="{'!border-danger' : errorMessage}"
                class="!text-black p-2 absolute bg-white w-full shadow-md shadow-primary border-2 border-primary rounded-b-md overflow-y-auto max-h-52">
                <p
                    v-for="data in filterData"
                    @click="selectedOption(data[props.dataName])"
                    :key="data.id"
                    class="cursor-pointer">
                    {{ data[props.dataName] }}
                </p>
            </div>
        </div>

        <p
            class=" leading-4 text-justify text-danger"
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