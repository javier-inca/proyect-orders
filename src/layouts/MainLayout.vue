<script setup>
import { useToastStore } from '../stores/useToastStore'
import Navbar from '../views/Navbar.vue'
import Toast from 'primevue/toast'

const toastStore = useToastStore()
</script>

<template>
    <div>
        <Navbar />

        <main
            class="my-5">
            <router-view />
        </main>

        <Toast class=" max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"/>
    </div>
</template>