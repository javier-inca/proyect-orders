<script setup>
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'


const props = defineProps({
    type:{
        type:String,
        default:'view'
    },
})
</script>

<template>
    <button
        v-if="type === 'view'">
        <EyeIcon
            class="size-6 text-blue-600"/>
    </button>  

    <button
        v-if="type === 'edit'">
        <PencilIcon
            class="size-6 text-blue-600"/>
    </button>  

    <button
        v-if="type === 'delete'">
        <TrashIcon
            class="size-6 text-blue-600"/>
    </button>  
</template>