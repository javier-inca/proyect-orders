<script setup>
import { computed } from 'vue';

const props = defineProps({
    options:{
        type:Array,
        default:[]
    },
})

const emit = defineEmits()

const selectOption = (option) =>{
    emit('selectOption', option)    
}

</script>

<template>
    <div class="absolute top-auto left-0 w-full border-2 border-t-0 border-black bg-white rounded-b-md text-sm pb-2 shadow-xl -mt-1">
        <p
            @click="selectOption(option)"
            class="px-4 py-1 hover:scale-110 transition-transform hover:cursor-pointer"
            v-for="option in options"
            :key="option.id">
            {{ option.name }}
        </p>
    </div>
</template>