<script setup>
/* import Toast from '../components/Toast.vue' */
import { useToastStore } from '../stores/useToastStore'
import Navbar from '../views/Navbar.vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { Button } from 'primevue'
const toastStore = useToastStore()
</script>

<template>
    <div>
        <Navbar />

        <main
            class="my-5">
            <router-view />
        </main>

        <div class="absolute z-50 top-16 right-0 pr-4 w-80">
            <Toast
                :toggleToast= "toastStore.toggleToast"
                :message= "toastStore.message"
                :type= "toastStore.type" />
        </div>
    </div>
</template>