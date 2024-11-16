<script setup>
import Toast from '../components/Toast.vue';
import { useToastStore } from '../stores/useToastStore';
import Navbar from '../views/Navbar.vue';

const toastStore = useToastStore()

</script>

<template>
    <div>
        <Navbar />

        <main>
            <router-view />
        </main>

        <div class="absolute z-50 top-50 right-0 pr-4 w-80">
            <Toast
                :isVisible= "toastStore.isVisible"
                :message= "toastStore.message"
                :type= "toastStore.type"/>
        </div>
    </div>
</template>