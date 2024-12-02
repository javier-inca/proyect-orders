<script setup>
import { UserIcon } from '@heroicons/vue/24/solid';
import Title from './Title.vue';
import Spinner from './Spinner.vue';

 
const props = defineProps({
    quantity: {
        type: Number,
        default: null,
    },

    title: {
        type: String,
        default: ''
    },

    icon: {
        type: [Object , Function],
        default: null,
    },

    loading: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <div class="size-32 border-4 border-primary rounded-md flex items-center flex-col justify-center hover:scale-110 transition-all duration-300 cursor-pointer">
        <component
            v-if="!loading"
            :is="icon"
            class=" text-primary size-10"/>

        <Title
            v-if="!loading">
            {{ quantity }} {{ title }} registered.
        </Title>

        <div 
            v-if="loading"
            class=" w-full h-full bg-gray-200 flex justify-center items-center bg-opacity-50">
            <Spinner/>
        </div>
    </div>
</template>