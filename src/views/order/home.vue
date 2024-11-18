<script setup>
import { useToastStore } from '../../stores/useToastStore';

const toastStore = useToastStore()

const showToast = (message , type) => {
    toastStore.showToast(message , type )
}
</script>

<template>
    <div class="flex justify-center bg-secondary gap-4 p-2">
        <button
            @click="showToast('Mostrar' , 'success')">
            click
        </button>

        <button
            @click="showToast('Mostrar' , 'information')">
            click
        </button>

        <button
            @click="showToast('Mostrar' , 'warning')">
            click
        </button>

        <button
            @click="showToast('Mostrar' , 'danger')">
            click
        </button>
    </div>
</template>