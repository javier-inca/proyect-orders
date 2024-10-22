<script setup>
import Navbar from './Navbar.vue';



if (!localStorage.getItem('orderArray')) {
    localStorage.setItem('orderArray', JSON.stringify([]))
}
</script>
<template>
    <Navbar/>
    
    <div class="relative">

    </div>
</template>