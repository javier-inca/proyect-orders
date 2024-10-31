<script setup>
import { ref } from 'vue';
import InputSelect from '../../components/InputSelect.vue'

const products = ref(JSON.parse(localStorage.getItem('productArray')))

</script>

<template>
    <div 
        class="border-2 border-blue-800 p-2 bg-white rounded">
        <div class="flex justify-between items-center">
            <strong
                class="text-sm">
                Select Product:
            </strong>

            <InputSelect
                :options="products"/>
        </div>
    </div>
</template>