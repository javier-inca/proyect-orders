<script setup>
import { computed } from 'vue';

const props = defineProps({
    type:{
        type:String,
        default:''
    },

    message:{
        type:String,
        default:'message'
    }
})

const types = {
    'danger':'bg-red-600 text-white',
    'success':'bg-green-600 text-white',
    'warning':'bg-yellow-400 text-black',
}

const type = computed(()=>{
    return types[props.type] ? types[props.type] : 'bg-blue-500 text-white'
})
</script>

<template>
    <div 
        class="flex justify-end">
        <div 
            class="absolute w-1/4 my-4 p-4 rounded-l-xl text-center text-lg"
            :class="[
                type,
            ]">
            {{ message }}
        </div>
    </div>
</template>