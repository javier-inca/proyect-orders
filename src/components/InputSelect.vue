<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, toRef } from 'vue'
import Input from './Input.vue'
/* 
vue autocomplete 
prime vue 
vuetify

solicitudes axios 
*/
const viewOptions = ref(false)
const name = ref()
const filteredOptions = ref([])

const props = defineProps({
    options: {
        type: Array,
        default: []
    },
})

const inputClick = () =>{
    viewOptions.value = true
    name.value = ''
}

const selectOption = (productName) => {
    name.value = productName
    viewOptions.value = false
}

watch(name, () => {
    if (!name.value) {
        viewOptions.value = true
        filteredOptions.value = [...props.options]
    } 
    else {
        filteredOptions.value = props.options.filter(option => option.name.toLowerCase().includes(name.value.toLowerCase()))
        const exactMatch = props.options.some(product => product.name.toLowerCase() === name.value.toLowerCase())
        viewOptions.value = !exactMatch && filteredOptions.value.length > 0
    }
})

const handleClickOutside = (event) => {
    const dropdown = document.querySelector('.dropdown')
    if (dropdown && !dropdown.contains(event.target)) {
        viewOptions.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div class="relative dropdown">
        <Input 
            @click="inputClick"
            v-model="name"
            placeholder="Insert product"/>

        <div
            v-if="viewOptions"
            class="absolute bg-white p-2 w-full rounded-b border-2">
            <button 
                class="flex my-1 w-full"
                v-for="option in filteredOptions"
                :key="option.id"
                @click="selectOption(option.name)">
                {{ option.name }}
            </button>
        </div>
    </div>
</template>
