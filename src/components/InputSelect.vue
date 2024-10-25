<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import Input from './Input.vue'
/* 
vue autocomplete 
prime vue 
vuetify

solicitudes axios 
*/
const viewOptions = ref(false)
const viewPrice = ref(false)

const name = ref(null)
const price = ref(null)

const props = defineProps({
    options: {
        type: Array,
        default: []
    },
})

const handleClickOutside = (event) => {
    const dropdown = document.querySelector('.dropdown')
    if (dropdown && !dropdown.contains(event.target)) {
        viewOptions.value = false
    }
}

const selectOption = (productName)=>{
    name.value = productName
    viewOptions.value = false
}

const inputClick = () => {
    viewOptions.value = true
    name.value = null
}

watch(name,()=>{
    if (name.value !== null) {
        viewPrice.value = props.options.find(product => product.name === name.value) ? false : true 
        viewOptions.value = false
    }
    if(name.value === ''){
        viewOptions.value = true
    }
})

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
            <div 
                v-for="option in options"
                :key="option.id"
                @click="selectOption(option.name)">
                {{ option.name }}
            </div>
        </div>
    </div>

    <div 
        v-if="viewPrice"
        class="">
        <Input
            placeholder="Insert price"
            type="number"
            v-model="newPrice"/>
    </div>
</template>
