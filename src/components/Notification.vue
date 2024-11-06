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
    'danger':'bg-secondary text-white',
    's':'bg-green-600 text-white',
    'success':'bg-primary text-black',
}

const type = computed(()=>{
    return types[props.type] ? types[props.type] : 'bg-blue-500 text-white'
})
</script>

<template>
    <div 
        class="w-3/5 md:w-2/5 lg:w-2/6 2xl:w-1/6">
        <div 
            class="my-4 p-4 rounded-xl text-center text-lg"
            :class="[
                type,
            ]">
            {{ message }}
        </div>
    </div>
</template>