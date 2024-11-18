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
    }
})

const emit = defineEmits()

const isEnabled= ref(false)

const selectColors = {
    'primary' : 'border-primary text-primary',
    'danger' : 'border-danger text-danger',
}

const selectColor = computed (() => {
    return selectColors[props.selectColor]? selectColors[props.selectColor] : 'border-primary text-primary'
})

const valueSelect = computed({
    get: () => props.inputValue,
    set: (newValue) => {
        emit('update:inputValue', newValue)
    }
})

const selectedOption = (option) => {
    emit('update:inputValue' , option)
    isEnabled.value = false
}
</script>

<template>
    <div 
        class=" min-w-[200px] w-full flex flex-col">
        <div 
            :class="[selectColor]"
            class="relative z-10 border-2 rounded-md cursor-pointer w-full">
            <div 
                @click="isEnabled = !isEnabled"
                class="flex items-center px-2 text-black justify-between">
                <p>
                    {{ valueSelect }}
                </p>

                <ChevronDownIcon
                    v-if="!isEnabled"
                    :class="[
                        selectColor
                    ]"
                    class="size-5"/>

                <ChevronUpIcon
                    v-if="isEnabled"
                    :class="[
                        selectColor
                    ]"
                    class="size-5"/>
            </div>

            <div 
                v-if="isEnabled"
                class="!text-black p-2">
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
            :class="[ selectColor, ]"
            v-if="!isEnabled && message">
            {{ message }}
        </p>
    </div>
    
    <div 
        @click="isEnabled = false"
        v-if="isEnabled"
        class="fixed top-0 left-0 w-full h-full z-0">
    </div>
</template>