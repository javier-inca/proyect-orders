<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, toRef } from 'vue'
import Input from './Input.vue'
/* 
vue autocomplete 
prime vue 
vuetify

solicitudes axios 

pictogrames // material desing icons 
*/
const isViewOptions = ref(false)

const props = defineProps({
    options: {
        type: Array,
        default:{}
    },

    textAlignment:{
        tyte:String,
        default:'start'
    },

    modelValue:{
        type:String,
        default:''
    },

    placeholder:{
        type:String,
        default:''
    }
})

const emit = defineEmits('update:modelValue')

const modelInput = computed({
    get: () => props.modelValue,
    set: (newValue) =>{
        emit('update:modelValue', newValue)
    }
})

const viewOptions = ()=>{
    isViewOptions.value = true
    emit('update:modelValue', '')
}

const selectOption = (name) => {
    emit('update:modelValue', name)

    isViewOptions.value = false 
}
</script>

<template>
    <div class="relative dropdown z-10 pb-2">
        <Input 
            :textAlignment="textAlignment"
            @click="viewOptions"
            v-model="modelInput"
            :placeholder="placeholder"/>

        <div
            v-if="isViewOptions && options.length > 0"
            class="absolute bg-white p-2 w-full rounded-b border-2 overflow-y-auto">
            <button 
                class="flex my-1 w-full"
                v-for="option in options"
                :key="option.id"
                @click="selectOption(option.name)">
                {{ option.name }}
            </button>
        </div>
    </div>

    <!-- Backdrop -->
    <div 
        v-if="isViewOptions"
        @click="isViewOptions = false" 
        class="fixed top-0 left-0 w-full h-full" />
</template>
